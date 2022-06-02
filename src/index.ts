import {
  findUniqueClassnames,
  generateTsCode,
  kebabCaseToCamelCase,
} from "./utils";
import * as fs from "fs";

interface thisArg {
  resourcePath: string;
}

export default function (this: thisArg, source: string) {
  const uniqueClassnames = findUniqueClassnames(source);

  const tsCode = generateTsCode(uniqueClassnames);

  const targetTsFilePath = `${this.resourcePath}.d.ts`;

  console.log(`Generated ts type definition file at path: ${targetTsFilePath}`);

  fs.writeFileSync(
    targetTsFilePath,
    tsCode,
    "utf-8"
    // ,() => {
    //   console.log(`Generated ts type definition file at path: ${targetTsFilePath}`);

    // }
  );

  return source;
}
