import { defineConfig } from "vitepress";
import texmath from "markdown-it-texmath";
import katex from "katex";

export default defineConfig({
  lang: "ja",
  title: "多重線型構造の微積分学",
  description: "変分的幾何最適化の統一枠組みと実装への道",

  // GitHub Pages 用: Actions から BASE_URL を注入（例: /repo-name/）
  base: process.env.BASE_URL || "/",

  markdown: {
    config(md) {
      md.use(texmath, {
        engine: katex,
        delimiters: "dollars",
        katexOptions: {
          // 数式が多い docs で「1つの数式ミスでビルド失敗」を避ける
          throwOnError: false,
          strict: "warn",
        },
      });
    },
  },

  themeConfig: {
    nav: [
      { text: "ホーム", link: "/" },
      { text: "理論編", link: "/chapters/chap00-preface" },
      { text: "応用編", link: "/applications/control/" },
    ],
    sidebar: [
      {
        text: "理論編",
        collapsed: false,
        items: [
          { text: "第0章　序文", link: "/chapters/chap00-preface" },
          { text: "第1章　問題設定と設計自由度", link: "/chapters/chap01-core-definition" },
          { text: "第2章　停留構造（一次・二次変分）", link: "/chapters/chap02-minimal-ingredients" },
          { text: "第3章　統一方程式", link: "/chapters/chap03-general-equation" },
          { text: "第4章　停留点", link: "/chapters/chap04-stationary-points" },
          { text: "第5章　手法マップ", link: "/chapters/chap05-methods-map" },
          { text: "第6章　制約", link: "/chapters/chap06-constraints" },
          { text: "第7章　分野横断表", link: "/chapters/chap07-cross-domain" },
          { text: "第8章　実装への接続", link: "/chapters/chap08-implementation" },
          { text: "付録A　レビューア対策メモ", link: "/chapters/appA-reviewer-playbook" },
        ],
      },
      {
        text: "応用編",
        collapsed: false,
        items: [
          { text: "制御", link: "/applications/control/" },
          { text: "物理", link: "/applications/physics/" },
          { text: "確率", link: "/applications/probability/" },
          { text: "FEM", link: "/applications/fem/" },
        ],
      },
      {
        text: "付録",
        collapsed: true,
        items: [
          { text: "文体・記法ガイド", link: "/style" },
          { text: "用語集", link: "/glossary" },
          { text: "数式（KaTeX）", link: "/math" },
        ],
      },
    ],
    socialLinks: [{ icon: "github", link: "https://github.com/" }],
  },
});

