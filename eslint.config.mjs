import config from "@wunderwerk/eslint-config/typescript";

export default [
  ...config,
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parserOptions: {
        project: "./tsconfig.json",
      },
    },
  },
  {
    rules: {
      "no-console": "off",
      "@typescript-eslint/ban-ts-comment": "off",
    },
  },
];
