module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.json",
  },
  extends: ["@wunderwerk/eslint-config/typescript"],
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
        "jsdoc/require-jsdoc": "off"
      },
    },
    {
      files: ["**/*.test.ts"],
      rules: {
        "@typescript-eslint/ban-ts-comment": "off",
      },
    },
  ],
};
