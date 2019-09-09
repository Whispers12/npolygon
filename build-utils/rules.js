const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = [
  {
    test: /\.js$/,
    exclude: /node_modules/,
    use: [{ loader: 'babel-loader' }],
  },
  {
    test: /\.(frag|vert|glsl)$/,
    use: [
      {
        loader: 'glsl-shader-loader',
        options: {},
      },
    ],
  },
  {
    test: /\.css$/,
    use: [
      {
        loader: MiniCssExtractPlugin.loader,
        options: {
          hmr: process.env.NODE_ENV !== 'production',
        },
      },
      {
        loader: 'css-loader',
        options: {
          sourceMap: process.env.NODE_ENV !== 'production',
        },
      },
    ],
  },
  {
    test: /\.(woff|woff2|eot|ttf|otf)$/,
    loader: 'file-loader',
  },
];
