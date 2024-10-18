import rehypeSlug from "rehype-slug";
import remarkToc from "remark-toc";
import remark2rehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import remarkFrontmatter from "remark-frontmatter";
import rehypeHighlight from "rehype-highlight";
import rehypeHighlightCodeLines from "rehype-highlight-code-lines";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import remarkDirective from "remark-directive";
import { remark } from "remark";
import remarkTitle from "remark-title";
import { load } from "js-yaml";

export interface Props {
  title?: string;
  description?: string;
  pubDate?: string;
  updatedDate?: string;
  tags?: string[];
}

const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms));

export async function markdownToHtml(markdown: string) {
  let yaml: Props | null = null;

  const result = await remark()
    .use(remarkFrontmatter, ["yaml"])
    ///@ts-ignore
    // .use(() => {
    //   return function (tree?: {
    //     children?: { type?: string; value?: string }[];
    //   }) {
    //     if (!tree || !tree.children) return;
    //     tree.children.forEach((child) => {
    //       if (child.type === "yaml" && child.value) {
    //         yaml = load(child.value) as Props;
    //         console.log(yaml);
    //         return;
    //       }
    //     });
    //   };
    // })
    // ///@ts-ignore
    // .use(remarkTitle, {
    //   title: (() => {
    //     while (true) {
    //       if (yaml) {
    //         return yaml.title || "";
    //       }
    //     }
    //   })(),
    // })
    .use(remarkDirective)
    .use(remarkToc)
    .use(remark2rehype)
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings)
    .use(rehypeHighlight)
    .use(rehypeHighlightCodeLines, {
      showLineNumbers: true,
      lineContainerTagName: "div",
    })
    .use(rehypeStringify)
    .process(markdown);
  return result.toString();
}
