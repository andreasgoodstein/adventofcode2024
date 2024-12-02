import fs from "node:fs";

export const readFile = (path: string): string[] =>
  fs.readFileSync(`./src/${path}`, "utf-8").split("\n");
