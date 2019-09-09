import * as THREE from 'three';

import * as dat from 'dat.gui';

import fragment from './shader/fragment.glsl';
import vertex from './shader/vertex.glsl';

// import * as BAS from 'three-bas';

const OrbitControls = require('three-orbit-controls')(THREE);

function lerp(value1, value2, progress) {
  return value1 * (1 - progress) + value2 * progress;
}

function drawLine({ numberOfPoints, x1, y1, x2, y2, instancesOfPoints }) {
  for (let i = 0; i < numberOfPoints; i++) {
    const prog = i / numberOfPoints;

    const xx = lerp(x1, x2, prog);
    const yy = lerp(y1, y2, prog);

    instancesOfPoints.push(xx, yy, prog);
  }
}

function paintDot({ center, k, amountOfVerticies }) {
  return [
    1 / 2 + Math.sin((2 * Math.PI * k) / amountOfVerticies),
    1 / 2 + Math.cos((2 * Math.PI * k) / amountOfVerticies),
  ];
}

export default class Sketch {
  constructor(selector) {
    this.scene = new THREE.Scene();

    this.renderer = new THREE.WebGLRenderer();

    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerWidth);
    this.renderer.setClearColor(0xeeeeee, 1);

    this.container = document.getElementById('container');
    this.container.appendChild(this.renderer.domElement);

    // camera с перспективой
    // this.camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.001, 1000);

    const frustumSize = 10;
    const aspect = window.innerWidth / window.innerHeight;
    this.camera = new THREE.OrthographicCamera(
      (frustumSize * aspect) / -2,
      (frustumSize * aspect) / 2,
      frustumSize / 2,
      frustumSize / -2,
      -1000,
      1000,
    );

    this.camera.position.set(0, 0, 1);
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.time = 0;

    this.colors = [
      new THREE.Color(0x588c73),
      new THREE.Color(0xf2e394),
      new THREE.Color(0xf2ae72),
      new THREE.Color(0xd96459),
      new THREE.Color(0x002109),
    ];

    this.setupResize();

    this.resize();
    this.addObjects();
    this.animate();
    // this.settings();
  }

  settings() {
    this.settings = {
      time: 0,
      amplitude: 1,
      diffAmplitude: 1,
      period1: 1,
      period2: 1,
      perlinAmplitude: 1,
      timeSpeed: 1,
      oneWave: 1000,
      size: 5,
      fly() {
        alert('fly');
      },
    };
    this.gui = new dat.GUI();
    this.gui.add(this.settings, 'time', 0, 100, 0.01);
    this.gui.add(this.settings, 'amplitude', 0, 10, 0.01);
    this.gui.add(this.settings, 'diffAmplitude', 0, 10, 0.01);
    this.gui.add(this.settings, 'period1', 0, 10, 0.01);
    this.gui.add(this.settings, 'period2', 0, 10, 0.01);
    this.gui.add(this.settings, 'timeSpeed', 0, 1, 0.001);
    this.gui.add(this.settings, 'perlinAmplitude', 0, 10, 0.01);
    this.gui.add(this.settings, 'oneWave', 1000, 100000, 100);
    this.gui.add(this.settings, 'size', 0.1, 200, 0.1);
    this.gui.add(this.settings, 'fly').name('Test fly');
  }

  setupResize() {
    window.addEventListener('resize', this.resize.bind(this));
  }

  resize() {
    const w = window.innerWidth;
    const h = window.innerHeight;
    this.renderer.setSize(w, h);
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
  }

  render() {
    this.renderer.render(this.scene, this.camera);
  }

  addObjects() {
    this.material = new THREE.ShaderMaterial({
      extensions: { derivatives: '#extension GL_OES_standard_derivatives : enable' },
      uniforms: {
        time: { type: 'f', value: 0 },
        offset: { type: 'f', value: 0 },
        color: { type: 'c', value: 0 },
        back: { type: 'i', value: 0 },
      },
      wireframe: false,
      vertexShader: vertex,
      fragmentShader: fragment,
    });

    // this.material = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true });

    this.geometry = new THREE.PlaneGeometry(10, 1, 1, 1);

    this.geometry = new THREE.CylinderBufferGeometry(2, 2, 1, 4, 1, true);

    this.instanceGeo = new THREE.InstancedBufferGeometry();

    const vertices = this.geometry.attributes.position.clone();
    this.instanceGeo.addAttribute('position', vertices);

    this.instanceGeo.attributes.uv = this.geometry.attributes.uv;
    this.instanceGeo.attributes.normal = this.geometry.attributes.normal;
    this.instanceGeo.index = this.geometry.index;

    const instances = 10;

    const instancePositions = [];

    for (let i = 0; i < instances; i++) {
      instancePositions.push(i, i, 0);
    }

    const amountOfVerticies = 10;

    const dots = [];
    for (let k = 0; k < 10; k++) {
      dots.push(paintDot({ center: 1, k, amountOfVerticies }));
    }

    console.log(dots);
    const instancesOfPoints = [];
    for (let i = 0; i < amountOfVerticies; i++) {
      for (let j = i + 1; j < amountOfVerticies; j++) {
        drawLine({
          numberOfPoints: 400,
          x1: dots[i][0],
          y1: dots[i][1],
          x2: dots[j][0],
          y2: dots[j][1],
          instancesOfPoints,
        });
      }
    }

    console.log(instancesOfPoints);

    this.instanceGeo.addAttribute(
      'instancePosition',
      new THREE.InstancedBufferAttribute(new Float32Array(instancesOfPoints), 3),
    );

    const particles = new THREE.Points(this.instanceGeo, this.material);
    this.scene.add(particles);
  }

  animate() {
    this.time = (this.time + 0.002) % 1;
    this.material.uniforms.time.value = this.time;

    requestAnimationFrame(this.animate.bind(this));
    this.render();
  }
}

new Sketch('container');
