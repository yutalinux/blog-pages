import { unified } from "unified";
import slug from "rehype-slug";
import toc from "remark-toc";
import remarkParse from "remark-parse";
import remark2rehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import remarkYamlConfig from "remark-yaml-config";
import rehypeHighlight from "rehype-highlight";

export async function markdownToHtml(markdown: string) {
  const result = await unified()
    .use(remarkParse)
    .use(remarkYamlConfig)
    .use(toc, { heading: "目次", headings: ["h2", "h3", "h4"] })
    .use(remark2rehype)
    .use(slug)
    .use(rehypeHighlight)
    .use(rehypeStringify)
    .process(markdown);
  return result.toString();
}
