import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

(async function () {
  const packageFile = await readFile(resolve("./package.json"));
  const packageJson = JSON.parse(packageFile.toString('utf8'));

  const declarationFile = resolve("./dist/jwt/index.d.ts");

  const content = await readFile(declarationFile);

  const strContent = content.toString("utf8");
  const newString = strContent.replace(
    "../types.js",
    packageJson.name,
  );

  await writeFile(declarationFile, newString);
})();


