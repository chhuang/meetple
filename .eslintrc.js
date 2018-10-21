module.exports = {
  "parser": "babel-eslint",
  "env": {
    "browser": true,
    "es6": true,
    "node": true,
    "jest": true
  },
  "plugins": [
    "react"
  ],
  "extends": "eslint:recommended",
  "parserOptions": {
    "sourceType": "module"
  },
  "rules": {
    "no-console": 0,
    "indent": "off",
    "indent-legacy": [2, 2, {
      "SwitchCase": 1
    }],
    "linebreak-style": [2, "unix"],
    "quotes": [2, "single"],
    "semi": [2, "always"],
    "object-curly-spacing": [2, "always"],
    "react/jsx-uses-react": 2,
    "react/jsx-uses-vars": 2,
    "react/jsx-curly-spacing": [2, {
      "when": "always",
      "children": true,
      "spacing": {
        "objectLiterals": "never"
      }
    }]
  }
};
