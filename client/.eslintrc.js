module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 13,
    sourceType: 'module',
  },
  plugins: [
    'react',
    'only-warn',
  ],
  rules: {
    "arrow-parens": ["warn", "as-needed", { requireForBlockBody: true }],
    "comma-dangle": ["warn", "always-multiline"],
    "object-curly-newline": ["warn", { multiline: true }],
    "react/function-component-definition": [
      "warn",
      { namedComponents: "function-declaration",  }
    ],
    "react/jsx-filename-extension": "off",
    "react/jsx-one-expression-per-line": ["warn", { allow: "single-child" }],
    "react/jsx-uses-react": "off",
    "react/react-in-jsx-scope": "off",
  },
};
