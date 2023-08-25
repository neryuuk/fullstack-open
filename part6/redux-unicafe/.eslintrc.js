/* eslint-env node */

module.exports = {
  'env': {
    'browser': true,
    'es6': true,
    'jest/globals': true,
    'node': true,
  },
  'extends': [
    'eslint:recommended',
    'plugin:react/recommended',
  ],
  'parserOptions': {
    'ecmaFeatures': { 'jsx': true },
    'ecmaVersion': 2020,
    'sourceType': 'module',
  },
  'rules': {
    'indent': ['error', 2, { SwitchCase: 1 }],
    'linebreak-style': ['error', 'unix'],
    'quotes': ['error', 'single'],
    'semi': ['error', 'never'],
    'eqeqeq': 'error',
    'no-trailing-spaces': 'error',
    'comma-dangle': ['error', 'always-multiline'],
    'object-curly-spacing': ['error', 'always'],
    'arrow-spacing': ['error', { 'before': true, 'after': true }],
    'no-console': 0,
    'react/prop-types': 0,
    'react/react-in-jsx-scope': 0,
  },
  'plugins': ['react', 'jest'],
  'settings': { 'react': { 'version': 'detect' } },
}
