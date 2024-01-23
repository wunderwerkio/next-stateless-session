import { defineConfig } from "tsup";

export default defineConfig({
  entry: [
    "src/core/index.ts",
    "src/cookie/index.ts",
    "src/jwt/index.ts",
  ],
  clean: true,
  target: "es2020",
  format: "esm",
  dts: true,
  treeshake: true,
});

