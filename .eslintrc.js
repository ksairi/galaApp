const moduleResolverConfig = require("./moduleResolver.config");
const tsExtends = [
  "plugin:react/recommended",
  "plugin:@typescript-eslint/recommended",
  "prettier/@typescript-eslint",
];
const jsExtends = ["plugin:react/recommended", "plugin:prettier/recommended"];
const envs = {
  browser: true,
  es6: true,
  jasmine: true,
  jest: true,
};
const globals = {
  __DEV__: true,
  FormData: true,
  fetch: true,
};

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
};

const settings = {
  "import/resolver": {
    // we need to do this because babel.config.js is not recognized
    "babel-module": moduleResolverConfig,
  },
  react: {
    version: "detect", // Tells eslint-plugin-react to automatically detect the version of React to use
  },
};

const parserOptions = {
  ecmaVersion: 2020,
  sourceType: "module",
  ecmaFeatures: {
    jsx: true,
    legacyDecorators: true,
  },
};

// eslint-disable-next-line no-undef
module.exports = {
  root: true,
  extends: ["eslint:recommended"],
  overrides: [
    {
      files: ["**/*.ts", "**/*.tsx"],
      env: envs,
      extends: [...tsExtends],
      globals: globals,
      parser: "@typescript-eslint/parser",
      parserOptions: parserOptions,
      plugins: ["@typescript-eslint"],
      rules: rules,
      settings: settings,
    },
    {
      files: "**/*.js",
      env: envs,
      extends: [...jsExtends],
      globals: globals,
      parser: "babel-eslint",
      parserOptions: parserOptions,
      plugins: ["@typescript-eslint"],
      rules: rules,
      settings: settings,
    },
  ],
};
