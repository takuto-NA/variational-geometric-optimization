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
      { text: "Part I", link: "/chapters/chap00-preface" },
      { text: "Part II", link: "/applications/control/" },
    ],
    sidebar: [
      {
        text: "Part I: Theory",
        collapsed: false,
        items: [
          { text: "Chapter 0: Preface", link: "/chapters/chap00-preface" },
          { text: "Chapter 1: Core Definition", link: "/chapters/chap01-core-definition" },
          { text: "Chapter 2: Minimal Ingredients", link: "/chapters/chap02-minimal-ingredients" },
          { text: "Chapter 3: General Equation", link: "/chapters/chap03-general-equation" },
          { text: "Chapter 4: Stationary Points", link: "/chapters/chap04-stationary-points" },
          { text: "Chapter 5: Methods Map", link: "/chapters/chap05-methods-map" },
          { text: "Chapter 6: Constraints", link: "/chapters/chap06-constraints" },
          { text: "Chapter 7: Cross-domain Table", link: "/chapters/chap07-cross-domain" },
          { text: "Chapter 8: Implementation Benefits", link: "/chapters/chap08-implementation" },
          { text: "Appendix A: Reviewer Playbook", link: "/chapters/appA-reviewer-playbook" },
        ],
      },
      {
        text: "Part II: Applications",
        collapsed: false,
        items: [
          { text: "Control", link: "/applications/control/" },
          { text: "Physics", link: "/applications/physics/" },
          { text: "Probability", link: "/applications/probability/" },
          { text: "FEM", link: "/applications/fem/" },
        ],
      },
      {
        text: "Appendix",
        collapsed: true,
        items: [{ text: "Math (KaTeX samples)", link: "/math" }],
      },
    ],
    socialLinks: [{ icon: "github", link: "https://github.com/" }],
  },
});

