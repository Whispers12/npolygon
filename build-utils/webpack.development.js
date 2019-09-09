const rules = require('./rules');
const path = require('path');
const webpack = require('webpack');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const HOST = 'localhost';
const PORT = '3000';

module.exports = () => ({
  devtool: 'source-map',
  entry: ['./src/index.js'],
  output: {
    filename: 'bundle.js',
    sourceMapFilename: '[name].js.map',
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx', '.js', '.jsx'],
  },
  devServer: {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
    },
    clientLogLevel: 'warning',
    noInfo: true,
    inline: true,
    historyApiFallback: true,
    compress: true,
    overlay: true,
    port: PORT,
    host: HOST,
  },
  module: {
    rules: [...rules],
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: 'styles.css',
    }),
    new webpack.HotModuleReplacementPlugin(),
    new ProgressBarPlugin({
      format: 'Build [:bar] :percent (:elapsed seconds)',
      clear: true,
    }),
    new HtmlWebpackPlugin({
      inject: true,
      template: './index.html',
    }),
    new FriendlyErrorsWebpackPlugin({
      compilationSuccessInfo: {
        messages: [`Your application is running here http://${HOST}:${PORT}`],
      },
    }),
  ],
});
