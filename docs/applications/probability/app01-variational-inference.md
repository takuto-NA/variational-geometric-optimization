---
title: "Probability: Variational Inference (Sketch)"
---

## Problem

観測 $y$ のもとで潜在変数 $z$ の事後分布 $p(z\\mid y)$ を近似したい。
近似族 $q_\\theta(z)$（パラメータ $\\theta$）を用意する。

## Functional

典型的には ELBO 最大化（あるいは負の ELBO 最小化）として書ける：

$$
\\mathcal F(\\theta) = -\\mathrm{ELBO}(\\theta)
$$

## Geometry (G, J)

- $G$ を Fisher 情報（自然勾配）として取ると情報幾何が前面に出る
- まずは $J=0$ の散逸側で扱うことが多い

## Discretization

- 期待値はサンプリングで近似（reparameterization 等）
- モデルにより、確率微分方程式や PDE が背後にある場合もある

## Algorithm

- $\nabla_\\theta \\mathcal F$ を AD で計算して更新する
- 自然勾配は $G^{-1}\\nabla\\mathcal F$ の選択として統一式に含まれる

## Notes

このページは「確率分布多様体／Fisher 計量」が統一式に自然に入ることの最小例。

