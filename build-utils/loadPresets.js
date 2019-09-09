// eslint-disable-next-line
const webpackMerge = require("webpack-merge");

const applyPresets = (env = { presets: [] }) => {
  const presets = env.presets || [];
  const mergedPresets = [].concat(...[presets]);
  const mergedConfigs = mergedPresets.map(presetName =>
    // eslint-disable-next-line
    require(`./presets/webpack.${presetName}`)(env)
  );

  return webpackMerge({}, ...mergedConfigs);
};

module.exports = applyPresets;
