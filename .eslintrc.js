const path = require('path');

module.exports = {
  parser: 'babel-eslint',
  extends: [
    'airbnb',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:prettier/recommended',
    'plugin:jest/recommended',
  ],
  plugins: ['compat', 'import', 'prettier', 'jest'],
  rules: {
    'jest/no-disabled-tests': 'warn',
    'jest/no-focused-tests': 'error',
    'jest/no-identical-title': 'error',
    'jest/valid-expect': 'error',
    'jest/no-alias-methods': 'off',
    'jest/no-jest-import': 'error',
    'jest/no-large-snapshots': ['warn', { maxSize: 300 }],
    'jest/no-test-prefixes': 'error',
    'jest/prefer-to-contain': 'warn',
    'jest/prefer-to-have-length': 'warn',
    'jest/valid-describe': 'error',
    'jest/valid-expect-in-promise': 'error',
    'jest/consistent-test-it': 'off',
    'jest/lowercase-name': 'off',
    'jest/no-hooks': 'off',
    'jest/no-jasmine-globals': 'off',
    'jest/no-test-callback': 'off',
    'jest/prefer-expect-assertions': 'off',
    'jest/prefer-to-be-null': 'off',
    'jest/prefer-to-be-undefined': 'off',
    'jest/require-tothrow-message': 'off',
    'jest/expect-expect': 'off',
    'jest/no-test-return-statement': 'off',
    'jest/prefer-inline-snapshots': 'off',
    'jest/prefer-strict-equal': 'off',
    'jest/prefer-spy-on': 'off',
    'jest/prefer-todo': 'warn',
    'jest/prefer-called-with': 'error',
    'jest/no-truthy-falsy': 'off',
    'jest/no-empty-title': 'error',
    'jest/no-mocks-import': 'error',
    'jest/no-commented-out-tests': 'warn',
    'jest/no-duplicate-hooks': 'off',
    'jest/no-expect-resolves': 'off',
    'jest/no-export': 'error',
    'jest/no-if': 'error',
    'jest/no-standalone-expect': 'off',
    'jest/no-try-expect': 'error',
    'no-console': 'off',
    'no-bitwise': 'off',
    'no-unexpected-multiline': 'error',
    'import/prefer-default-export': 'off',

    'jsx-a11y/href-no-hash': 'off',
    'jsx-a11y/anchor-is-valid': ['warn', { aspects: ['invalidHref'] }],
    'jsx-a11y/label-has-for': [
      2,
      {
        components: ['Label'],
        required: { every: ['nesting', 'id'] },
        allowChildren: true,
      },
    ],
    'no-use-before-define': [
      'error',
      {
        functions: false,
        classes: true,
        variables: false,
      },
    ],
    'no-shadow': 'off',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
  env: {
    node: true,
    browser: true,
    jest: true,
    'cypress/globals': true,
  },
  settings: {
    compiler: 'babel',
    'import/resolver': {
      node: {
        paths: ['src', './src'],
        extensions: ['.js', '.jsx'],
      },
    },
  },

  plugins: ['eslint-plugin-cypress'],
  overrides: [
    {
      files: ['**/__tests__/**', '**/*.test.js'],
      settings: {
        'import/resolver': {
          jest: {
            jestConfigFile: path.join(__dirname, './jest.config.js'),
          },
        },
      },
    },
  ],
};
