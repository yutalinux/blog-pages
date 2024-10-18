import { readFileSync } from "fs";
import { markdownToHtml } from "./utils/markdown";

console.log(
  await markdownToHtml(readFileSync("./src/pages/style.md", "utf-8"))
);
