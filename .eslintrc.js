module.exports = {
  'env': {
    'browser': true,
    'es2020': true,
  },
  'extends': [
    'google',
  ],
  'parser': '@typescript-eslint/parser',
  'parserOptions': {
    'ecmaVersion': 11,
    'sourceType': 'module',
  },
  'plugins': [
    '@typescript-eslint',
  ],
  'rules': {
    'comma-dangle': 0,
    'require-jsdoc': 0,
    'padded-blocks': 0,
    'object-curly-spacing': 0,
    'new-cap': 0
  },
};
