module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  globals: {},
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    useJSXTextNode: true,
    // "project": "./tsconfig.json",
  },
  extends: ['airbnb-base', 'plugin:@typescript-eslint/recommended'],
  plugins: ['@typescript-eslint'],
  rules: {
    semi: 0,
    'import/prefer-default-export': 0,
    '@typescript-eslint/indent': ['error', 2],
    'import/no-unresolved': 0,
  },
  overrides: [
    {
      files: ['build/*.js'],
      rules: {
        '@typescript-eslint/no-var-requires': 0,
        'import/no-extraneous-dependencies': 0,
      },
    },
  ],
}
