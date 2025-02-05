const eslint = require("@eslint/js");
const tseslint = require("typescript-eslint");
const angular = require("angular-eslint");

module.exports = tseslint.config(
  {
    files: ["**/*.ts"],
    extends: [
      eslint.configs.recommended,
      ...tseslint.configs.recommended,
      ...tseslint.configs.stylistic,
      ...angular.configs.tsRecommended,
    ],
    processor: angular.processInlineTemplates,
    rules: {
      "@angular-eslint/directive-selector": [
        "error",
        {
          type: "attribute",
          prefix: "app",
          style: "camelCase",
        },
      ],
      "@angular-eslint/component-selector": [
        "error",
        {
          type: "element",
          prefix: "app",
          style: "kebab-case",
        },
      ],
      // "@angular-eslint/prefer-standalone": ["warn|error"],
      "@typescript-eslint/no-unused-vars": ["warn"],
      "@typescript-eslint/explicit-module-boundary-types": ["warn"],
      "@typescript-eslint/no-explicit-any": ["warn"],
      "@typescript-eslint/explicit-member-accessibility": [
        "warn",
        { accessibility: "explicit" },
      ],
      "no-console": ["warn"],
      "no-var": ["warn"],
      "@typescript-eslint/no-empty-interface": ["warn"],
      "@typescript-eslint/no-dupe-class-members": ["warn"],
      "@typescript-eslint/explicit-function-return-type": ["warn"],
      "no-eval": ["warn"],
      // "@angular-eslint/prefer-on-push-component-change-detection": [
      //   "warn|error",
      // ],
    },
  },
  {
    files: ["**/*.html"],
    extends: [
      ...angular.configs.templateRecommended,
      ...angular.configs.templateAccessibility,
    ],
    rules: {
      // "@angular-eslint/template/prefer-self-closing-tags": ["warn|error"],
      // "@angular-eslint/template/prefer-ngsrc": ["warn|error"],
      // "@angular-eslint/template/prefer-control-flow": ["warn|error"],
    },
  },
  // {
  //   files: ["**/*.scss"],
  //   extends: ["stylelint-config-standard", "stylelint-config-recommended-scss"],
  //   rules: {},
  // },
);
