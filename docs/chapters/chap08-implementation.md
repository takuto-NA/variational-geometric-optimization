---
title: "Chapter 8: Implementation Benefits"
---

## 8.1 実装上の最大の利点

### 8.1.1 書くべきものは一つ

- **スカラー汎関数** $\mathcal F$

### 8.1.2 自動微分（AD）と整合する

この視点では、実装で必要なのは主に **一次変分と二次変分**です。
言語は将来変わり得ますが、共通言語としての AD が残ります。

- 勾配（一次）: `grad` / `VJP`
- 方向微分（一次）: `JVP`

擬似コード（言語非依存）：

```text
# given: scalar functional F(x)
g = grad(F)(x)          # first variation
dx = - solve(G(x), g)   # dissipative step (example)
```

（初版では Newton/Krylov/HVP には踏み込まず、将来章で拡張します。）

### 8.1.3 分野横断が自然

- FEM ↔ 制御 ↔ 推定 ↔ 物理 が同じ「汎関数 + 変分 + 構造」の形で接続されます。

