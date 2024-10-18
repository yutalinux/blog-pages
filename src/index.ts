import { mkdirSync, readdirSync, readFileSync, writeFileSync } from "fs";
import { markdownToHtml } from "./utils/markdown";
import { basename, resolve } from "path";

const page_dir = "./src/pages";
const dist_dir = "./md-dist";

const markdownFiles = readdirSync(page_dir);

mkdirSync(dist_dir, { recursive: true });

markdownFiles.forEach(async (file) => {
  const markdown = await markdownToHtml(
    readFileSync(resolve(page_dir, file), "utf-8")
  );

  writeFileSync(resolve(dist_dir, basename(file) + ".html"), markdown, "utf-8");
});
