module.exports = {
  parserOptions: {
    allowImportExportEverywhere: true,
    ecmaVersion: 2018,
    ecmaFeatures: {
        jsx: true,
    },
    sourceType: 'module',
  },

  env: {
    es6: true,
    node: true,
  },
  extends: ['eslint:recommended', 'prettier'],
  plugins: ['prettier'],
  rules: {

    // Prettier overrides
    'prettier/prettier': [
      'error',
      {
        semi: false,
        singleQuote: true,
        arrowParens: 'always',
        printWidth: 100,
        trailingComma: 'es5',
      },
    ],

    eqeqeq: ['error', 'always']
  }
}
