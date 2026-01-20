import { defineConfig } from "vitepress";
import katex from "markdown-it-katex";

export default defineConfig({
  lang: "ja",
  title: "Variational Geometric Optimization",
  description: "ドキュメント（VitePress）",

  // GitHub Pages 用: Actions から BASE_URL を注入（例: /repo-name/）
  base: process.env.BASE_URL || "/",

  markdown: {
    config(md) {
      md.use(katex, {
        // 数式が多い docs で「1つの数式ミスでビルド失敗」を避ける
        throwOnError: false,
        strict: "warn",
      });
    },
  },

  themeConfig: {
    nav: [
      { text: "Home", link: "/" },
      { text: "Math", link: "/math" },
    ],
    sidebar: [
      {
        text: "Docs",
        items: [
          { text: "はじめに", link: "/" },
          { text: "数式サンプル", link: "/math" },
        ],
      },
    ],
    socialLinks: [{ icon: "github", link: "https://github.com/" }],
  },
});

