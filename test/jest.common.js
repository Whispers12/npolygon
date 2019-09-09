// common project configuration used by the other configs

const path = require('path');

module.exports = {
  rootDir: path.join(__dirname, '..'),
  moduleDirectories: ['node_modules', path.join(__dirname, '../src'), 'shared', __dirname],
  moduleFileExtensions: ['js', 'json', 'jsx', 'node', 'ts', 'tsx'],
  moduleNameMapper: {
    // module must come first
    // jest runtime is node, so it treat css as node_module
    '\\.module\\.css$': 'identity-obj-proxy',
    '\\.css$': require.resolve('./styleMock.js'),
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': require.resolve(
      './fileMock.js',
    ),
  },
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname',
    'jest-watch-select-projects',
  ],
};
