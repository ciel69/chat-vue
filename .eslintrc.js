module.exports = {
  extends: [
    '@nuxtjs/eslint-config-typescript'
  ],
  rules: {
    semi: [2, 'always'],
    curly: ['error', 'multi'],
    'padded-blocks': ['error', {classes: 'always'}],
    'object-curly-spacing': ['error', 'never'],
    'space-before-function-paren': ['error', {
      anonymous: 'never',
      named: 'never',
      asyncArrow: 'never'
    }]
  }
};
