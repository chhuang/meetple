module.exports = {
  parser: 'babel-eslint',
  env: {
    browser: true,
    es6: true,
    node: true,
    jest: true
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:import/errors',
    'plugin:jsx-a11y/recommended',
    'plugin:prettier/recommended'
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  plugins: ['react'],
  rules: {
    'react/react-in-jsx-scope': 'off', // React is set as global variable by Next.js
    'react/prop-types': 'off',
    'no-console': 'off'
  },
  settings: {
    react: {
      version: 'detect'
    },
    'import/resolver': {
      'babel-module': {
        root: ['./'],
        alias: {
          '@components': './components'
        }
      }
    }
  }
};
