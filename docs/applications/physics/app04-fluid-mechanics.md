---
title: "Physics: Fluid Mechanics (Incompressibility as KKT)"
---

## Problem

流体を「保存則 + 制約 + 散逸」として捉え、特に **非圧縮条件**が VGO 的には「制約付き最適化（KKT）」として現れることを整理する。

- 速度場: $v(x,t)$
- 圧力: $p(x,t)$
- 非圧縮: $\nabla\cdot v = 0$

## Functional

最もミニマルには、運動エネルギーを

$$
\mathcal F(v) := \int_\Omega \frac{\rho}{2}\,|v|^2\,dx
$$

とみなし、非圧縮条件

$$
c(v):=\nabla\cdot v = 0
$$

を制約として扱う。

Remark:
Navier–Stokes の「粘性」は $\mathcal F$ そのものというより、散逸（$G$）として入るのが自然である。

## Geometry (G, J)

- $J$: 非粘性（Euler）の部分は Hamilton/Lie–Poisson 構造を持つが、このページでは実装上の要点（非圧縮制約）に集中する
- $G$: 粘性・数値粘性・フィルタは $G\succeq 0$ の散逸として入る

非圧縮は未定乗数（圧力）として

$$
\dot v = \text{(力学)} - G\,\nabla \mathcal F(v) + \nabla p,
\qquad
\nabla\cdot v=0
$$

の形で入る（$\nabla p$ が制約力）。

## Discretization

空間離散（FEM/FD/FV）をすると、非圧縮は離散発散 $D$ を使って

$$
D\,v = 0
$$

となり、時間 1 ステップは典型的に「速度と圧力の鞍点（KKT）」に落ちる。

## Algorithm

教科書的な **射影法（projection method）** は、VGO 的には「制約付き更新の分割」と見なせる。

- **(1) 制約なしで暫定速度**:

$$
v^\* = v^k + \Delta t \;(\text{対流・外力・粘性など})
$$

- **(2) 制約への射影**:

$$
v^{k+1} = v^\* - \Delta t\,\nabla p,
\qquad
\nabla\cdot v^{k+1}=0
$$

より、圧力は Poisson 型

$$
\Delta p = \frac{1}{\Delta t}\,\nabla\cdot v^\*
$$

として決まる（Schur 補）。

Remark:
「圧力は物理量」でもあるが、数値的には「制約の未定乗数」という見方が実装上の最短距離になる。

## Notes

- ここでの主役は **制約 = KKT = 圧力** という同一視。  
  これを押さえると、FEM の混合形式や前処理（ブロック系）とも自然に接続できる。
- さらに幾何（Lie–Poisson）まで含めると、Euler 系は「保存構造（$J$）」が本質になり、構造保存離散化が重要になる。

