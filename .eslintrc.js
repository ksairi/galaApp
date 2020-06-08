const rules = {
  camelcase: "warn",
  "global-require": "off",
  "new-cap": "off",
  "no-param-reassign": ["error", {props: false}],
  "no-restricted-syntax": [
    "error",
    "ForInStatement",
    "LabeledStatement",
    "WithStatement",
  ],
  "no-shadow": "off",
  "prefer-template": "warn",
  "no-underscore-dangle": "off",
  "no-unused-vars": "warn",
  "no-unused-expressions": ["error", {allowShortCircuit: true}],
  "no-use-before-define": "warn",
  "spaced-comment": ["error", "always", {exceptions: ["eslint"]}],
  "import/no-mutable-exports": "off",
  "prettier/prettier": ["error"],
  "react/destructuring-assignment": "off",
  "react/forbid-prop-types": "off",
  "react/jsx-filename-extension": "off",
  "react/no-unused-prop-types": "off",
  "react/prop-types": "off",
  "react/require-default-props": "warn",
  "react/sort-comp": "off",
  "react/state-in-constructor": "off",
  "no-return-assign": "off",
  "react/no-array-index-key": "off",
  "no-plusplus": "off",
  "react/jsx-props-no-spreading": "off",
  "array-callback-return": "off",
  "consistent-return": "off",
  "import/no-dynamic-require": "off",
  "no-prototype-builtins": "off",
  "react/display-name": "off",
  "@typescript-eslint/explicit-module-boundary-types": "off",
};
const parserOptions = {
  ecmaVersion: 2020,
  sourceType: "module",
  ecmaFeatures: {
    jsx: true,
    legacyDecorators: true,
  },
};

const settings = {
  react: {
    version: "detect", // Tells eslint-plugin-react to automatically detect the version of React to use
  },
};

const tsPlugins = [
  "eslint:recommended",
  "plugin:react/recommended", // Uses the recommended rules from @eslint-plugin-react
  "plugin:@typescript-eslint/recommended", // Uses the recommended rules from the @typescript-eslint/eslint-plugin
  "prettier/@typescript-eslint", // Uses eslint-config-prettier to disable ESLint rules from @typescript-eslint/eslint-plugin that would conflict with prettier
  "plugin:prettier/recommended", // Enables eslint-plugin-prettier and eslint-config-prettier. This will display prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
];

const jsPlugins = [
  "eslint:recommended",
  "plugin:react/recommended", // Uses the recommended rules from @eslint-plugin-react
  "plugin:prettier/recommended", // Enables eslint-plugin-prettier and eslint-config-prettier. This will display prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
];

const globals = {
  __DEV__: true,
  FormData: true,
  fetch: true,
  __dirname: true,
  process: true
};

module.exports = {
  parser: "babel-eslint",
  settings: settings,
  extends: jsPlugins,
  root: true,
  env: {
    browser: true,
    es6: true,
    jasmine: true,
    jest: true,
  },
  parserOptions: parserOptions,
  settings: settings,
  rules: rules,
  globals: globals,
  overrides: [
    {
      files: ["**/*.ts", "**/*.tsx"],
      parser: "@typescript-eslint/parser",
      extends: tsPlugins,
    },
  ],
};
