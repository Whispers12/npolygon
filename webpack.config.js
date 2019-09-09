const webpackMerge = require("webpack-merge");
const webpack = require("webpack");

// eslint-disable-next-line
const modeConfig = env => require(`./build-utils/webpack.${env}`)(env);
const presetConfig = require("./build-utils/loadPresets");

module.exports = ({ mode, presets } = { mode: "development", presets: [] }) =>
  webpackMerge(
    {
      mode,
      plugins: [
        new webpack.DefinePlugin({
          "process.env": { NODE_ENV: JSON.stringify(mode) }
        })
      ]
    },
    modeConfig(mode),
    presetConfig({ mode, presets })
  );
