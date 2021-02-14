module.exports = {
  extends: ['react-app', 'plugin:prettier/recommended'],
  plugins: ['prettier'],
  rules: {
    quotes: ['error', 'single', { avoidEscape: true }],
    'prettier/prettier': 'error',
  },
}
