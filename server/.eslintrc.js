module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 13,
  },
  plugins: [
    'only-warn',
  ],
  rules: {
    "arrow-parens": ["warn", "as-needed", { requireForBlockBody: true }],
    "comma-dangle": ["warn", "always-multiline"],
    "object-curly-newline": ["warn", { multiline: true }],
  },
};
