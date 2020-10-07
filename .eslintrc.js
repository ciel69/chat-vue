module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/recommended',
    '@vue/typescript',
    '@nuxtjs/eslint-config-typescript'
  ],
  rules: {
    semi: [2, 'always'],
    curly: ['error', 'multi-line'],
    'padded-blocks': ['error', {classes: 'always'}],
    'object-curly-spacing': ['error', 'never'],
    'space-before-function-paren': ['error', {
      anonymous: 'never',
      named: 'never',
      asyncArrow: 'never'
    }]
  },
  parserOptions: {
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
    ecmaVersion: 2018,
  },
};
