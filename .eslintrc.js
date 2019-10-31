module.exports =  {
  parser:  '@typescript-eslint/parser',
  extends:  [
    'plugin:@typescript-eslint/recommended',
  ],
 parserOptions:  {
    ecmaVersion:  2018,
    sourceType:  'module',
  },
  rules:  {
      "quotes": "off",
      "@typescript-eslint/quotes": ["warn", "single"],
      "@typescript-eslint/no-use-before-define": ["error", { "classes": false }],
      "arrow-parens": "warn"
  },
};

