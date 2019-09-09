/* eslint-disable */
const isTest = String(process.env.NODE_ENV) === 'test';
const isProd = String(process.env.NODE_ENV) === 'production';

module.exports = {
  presets: [
    [
      '@babel/preset-env',
      isTest
        ? { modules: 'commonjs' }
        : {
            targets: { browsers: ['safari 7'] },
            useBuiltIns: 'entry',
            modules: false,
          },
    ],
  ],
  plugins: [
    'minify-mangle-names',
    'minify-dead-code-elimination',
    '@babel/plugin-proposal-async-generator-functions',
    '@babel/plugin-proposal-nullish-coalescing-operator',
    '@babel/plugin-proposal-optional-chaining',
    [
      '@babel/plugin-transform-for-of',
      {
        loose: true,
      },
    ],

    ['@babel/plugin-proposal-class-properties', { loose: true }],
    '@babel/plugin-transform-runtime',
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-transform-async-to-generator',
    '@babel/plugin-proposal-object-rest-spread',
    '@babel/plugin-proposal-export-default-from',
    '@babel/plugin-proposal-export-namespace-from',

    isTest ? 'babel-plugin-dynamic-import-node' : null,
  ].filter(Boolean),
};
