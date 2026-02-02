---
title: "Neural: PINN as constrained variational optimization"
---

> このページで主に触る knob: Space。関数近似としてのネットワーク。Functional。残差と境界条件。Discretization。コロケーション点。Algorithm。制約の入れ方

## Problem

領域 $\Omega$ 上の PDE を解きたい。
代表形として

$$
\mathcal N[u](x)=0\quad \text{in } \Omega,
\qquad
\mathcal B[u](x)=0\quad \text{on } \partial\Omega
$$

を考える。
未知関数 $u$ をニューラルネットワーク $u_\theta$ で近似し、$\theta$ を学習する。

## Functional

PINN の基本形は残差の二乗を最小化する。

$$
\mathcal F(\theta)
:=
\mathbb E_{x\sim \rho_\Omega}\big[\|\mathcal N[u_\theta](x)\|^2\big]
\;+\;
\beta\,\mathbb E_{x\sim \rho_{\partial\Omega}}\big[\|\mathcal B[u_\theta](x)\|^2\big].
$$

ここで $\rho_\Omega,\rho_{\partial\Omega}$ はサンプリング分布であり、$\beta$ はスケール調整である。

## Geometry (G, J)

- $J=0$。散逸側として扱う
- $G$: 既定は Euclid だが、PDE ではスケール差が強いので前処理の影響が大きい  
  例として、点ごとの重みや損失の正規化は事実上の計量に相当する

## Discretization

PINN の離散化は「どこで PDE を満たすか」という選択になる。

- 領域内コロケーション点 $\{x_i\}_{i=1}^{N_\Omega}$
- 境界コロケーション点 $\{x_j\}_{j=1}^{N_{\partial\Omega}}$

期待値はこれらの点での平均で近似される。

## Algorithm

- 目的 $\mathcal F(\theta)$ を実装し、reverse-mode AD で勾配を得る
- SGD 系で更新する

制約の入れ方には複数の設計がある。

- **soft 制約**: 上のように罰則項で入れる
- **hard 制約**: 変数のパラメータ化で境界条件を常に満たす
- **KKT の導入**: 罰則ではなく未定乗数で制約を扱う

VGO の観点では、これは制約の扱い方と Geometry の設計問題である。

## Notes

- **重要度**: 「方程式を解く」を「汎関数最小化」として統一する例であり、FEM 章との比較がしやすい
- **実装難易度**: 中。問題によっては最適化が難しい
- **実装リスク**: スケール差で学習が停滞しやすい。サンプリング分布と損失の重み付けが破綻点になりやすい

