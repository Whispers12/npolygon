/* eslint-disable */
module.exports = {
  // eslint-disable-next-line
  ...require('./test/jest.common'),
  // where we tale coverage
  collectCoverageFrom: [
    '**/src/**/*.js',
    '**/src/**/*.jsx',
    '!**/__tests__/**',
    '!**/node_modules/**',
  ],
  coverageThreshold: {
    global: {
      statements: 10,
      branches: 5,
      functions: 15,
      lines: 8,
    },
    './test/utils.js': {
      statements: 100,
      branches: 80,
      functions: 100,
      lines: 100,
    },
  },
  projects: ['./test/jest.lint.js', './test/jest.client.js'],
};
