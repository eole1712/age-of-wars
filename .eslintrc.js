module.exports = {
  parser: 'babel-eslint',
  extends: 'airbnb',
  env: {
    node: true,
    jest: true,
    jasmine: true,
  },
  rules: {
    'no-console': 'off',
    'no-plusplus': 'off',
    strict: 'off',
    'import/prefer-default-export': 'off',
    'jsx-a11y/anchor-is-valid': 'off',
    'jsx-a11y/href-no-hash': 'off',
    'react/jsx-filename-extension': 'off',
  },
};
