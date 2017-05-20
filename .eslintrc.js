module.exports = {
  extends: 'airbnb-base',
  plugins: ['react'],

  env: { browser: true },
  globals: {
    ga: true,
    React: true,
    ReactDOM: true,
  },

  rules: { 'react/jsx-uses-vars': 'error' },

  parserOptions: {
    ecmaFeatures: { jsx: true },
  },
};
