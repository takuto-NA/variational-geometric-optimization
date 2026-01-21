---
title: "Physics: Thermodynamics (Free Energy + Dissipation)"
---

## Problem

熱力学を「平衡（最適化）」と「緩和（勾配流）」の 2 つに分け、VGO の枠組み（Functional と計量 $G$）で見直す。

- 平衡: 状態が自由エネルギー（またはエントロピー）で特徴づけられる
- 非平衡: 散逸により自由エネルギーが単調に減少する（緩和）

## Functional

典型は Helmholtz 自由エネルギー

$$
\mathcal F(x) := F(x)=U(x)-T\,S(x)
$$

で、保存制約（例: 質量、組成）

$$
c(x)=0
$$

の下で停留/最小化を考える。

Remark:
最大エントロピーは「$-S$ を最小化」する問題として同型に扱える。

## Geometry (G, J)

熱の緩和（散逸）は基本的に「回転（$J$）」より「降下（$G$）」が支配的である。

- $J$: ここでは $J=0$（保存的な回転を明示的に入れない）
- $G$: 物性（伝導率・抵抗など）を反映する対称正定値として選ぶ

すると VGO の最小形は

$$
\dot x = -G(x)\,\nabla \mathcal F(x)
$$

で、$\mathcal F$ が Lyapunov 関数として減少する（$G\succeq 0$）。

## Discretization

熱力学の「正しい離散化」は、しばしば

- 自由エネルギーの単調減少
- 制約（保存量）の保持

を満たすかどうかで評価される。

（例）時間離散で

$$
x_{k+1}\approx x_k - \Delta t\,G(x_k)\nabla \mathcal F(x_k)
$$

とすると、$\Delta t$ が大きいと単調性が崩れるので、陰的化・分割（operator splitting）・線形化が使われる。

## Algorithm

代表的な実装パターンは「制約付きの勾配流」。

- **制約なし**: $x \leftarrow x - \eta\,G\nabla \mathcal F$
- **制約あり**: 未定乗数 $\lambda$ を入れて

$$
\dot x = -G\nabla \mathcal F + C(x)^\top \lambda,
\qquad
c(x)=0
$$

（ここで $C=\nabla c$）の形にする  
→ 離散化すると KKT（鞍点）を解くことになる

## Notes

- 「何を $\mathcal F$ と置くか」だけでなく「$G$ をどう置くか」で緩和則が変わる  
  これは VGO の中心的なメッセージ（幾何＝計量がアルゴリズムを決める）と同じ構造。
- Onsager の最小散逸・GENERIC などは、この考え方を系統立てた枠組みとして理解できる。

