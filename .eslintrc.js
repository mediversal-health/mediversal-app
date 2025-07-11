module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  env: {
    'react-native/react-native': true,
    es6: true,
    node: true,
  },
  plugins: ['@typescript-eslint', 'react', 'react-native', 'prettier'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-native/all',
    'plugin:prettier/recommended',
    'prettier',
  ],
  rules: {
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-require-imports': 'off',
    'react/display-name': 'off',
    'react-native/sort-styles': 'off',
    'react-native/no-color-literals': 0,
    'react-native/no-inline-styles': 'off',
    'prettier/prettier': 'error',
    'react/react-in-jsx-scope': 'off',
    '@typescript-eslint/no-unused-vars': ['warn', {argsIgnorePattern: '^_'}],
    'react/jsx-key': 'off',
    'react/no-unescaped-entities': 'off',
    'object-curly-spacing': ['error', 'never'],
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
