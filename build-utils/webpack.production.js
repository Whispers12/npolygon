const path = require('path');

const rules = require('./rules');

module.exports = () => ({
  target: 'web',
  entry: {
    app: './src/index.js',
  },
  output: {
    publicPath: '/u/',
    path: path.join(__dirname, '../dist'),
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].js',
  },
  resolve: {
    extensions: ['.js', '.css', '.ts', '.tsx', '.json'],
  },
  module: {
    rules,
  },
});
