---
title: "Chapter 3: General Equation"
---

## 3.1 基本方程式（完全形）

最も一般的な形は次です：

$$
\dot x
=
-\underbrace{G^{-1}(x)\,\nabla \mathcal F(x)}_{\text{散逸・最適化}}
\;+\;
\underbrace{J(x)\,\nabla \mathcal F(x)}_{\text{保存・回転}}
$$

- $G(x)$: 対称正定値（計量）
- $J(x)$: 反対称（保存構造）

この 1 行で、たとえば次が同一の地図上に現れます。

- 熱拡散（$J=0$）
- 自然勾配（$G$ を Fisher とみなす）
- Hamilton 系（$G=0$）
- 減衰振動（両方あり）

## 3.2 コメント（読み方）

同じ $\mathcal F$ が与えられても、
どの $G$ と $J$ を選ぶかで **「降下」** と **「回転」** の割合が変わります。

