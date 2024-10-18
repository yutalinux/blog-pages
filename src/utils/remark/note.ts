/// <reference types="mdast-util-directive" />

import { visit } from "unist-util-visit";
import type { Root } from "mdast";

export default function remarkNotePlugin() {
  return function (tree: Root) {
    visit(tree, "textDirective", (node) => {
      if (!node.children) return;

      let classList: string[] = [];

      switch (node.name) {
        case "note":
          classList = ["note"];
          break;
        case "note-info":
          classList = ["note", "info"];
          break;
        case "note-warn":
          classList = ["note", "warn"];
          break;
        case "note-err":
          classList = ["note", "err"];
          break;
        default:
          return;
      }

      node.data = {
        hName: "div",
        hProperties: {
          class: ["note"],
        },
        hChildren: [
          {
            type: "element",
            tagName: "p",
            properties: {
              controls: true,
              preload: "metadata",
            },
            children: node.children
              .map((child) => {
                if (child.type !== "text") return null;

                return {
                  type: child.type,
                  value: child.value,
                };
              })
              .filter((c) => c !== null),
          },
        ],
      };
    });
  };
}
