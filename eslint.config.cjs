const config = require("@wunderwerk/eslint-config/typescript");

module.exports = [
  config,
  {
    languageOptions: {
      parser: "@typescript-eslint/parser",
      parserOptions: {
        project: "./tsconfig.json",
      },
    },
    rules: {
      "new-cap": "off",
      "no-console": "off",
      "jsdoc/tag-lines": [
        "error" | "warn",
        "never",
        { tags: { param: { lines: "always" } } },
      ],
    },
    overrides: [
      {
        files: ["**/test-utils/**/*"],
        rules: {
          "jsdoc/require-jsdoc": "off",
        },
      },
      {
        files: ["**/*.test.ts"],
        rules: {
          "@typescript-eslint/ban-ts-comment": "off",
        },
      },
    ],
  },
];

