---
title: "FEM: Poisson Equation (Energy Minimization)"
---

## Problem

領域 $\Omega$ 上で Poisson 方程式

$$
-\Delta u = f
$$

（適切な境界条件の下で）解く。

## Functional

弱形式に対応するエネルギー汎関数の最小化として書ける：

$$
\mathcal F(u)=\int_\Omega \left(\frac{1}{2}\lVert\nabla u\rVert^2 - f u\right)\,dx
$$

停留条件 $\nabla \mathcal F(u^*)=0$ が弱形式に一致する。

## VGO の対応関係（この例で「何を最適化しているか」）

- **目的関数（汎関数）**: ここでは $\mathcal F(u)$
- **変数**: 連続場 $u\in V$（関数空間の点）
- **制約**: 境界条件（Dirichlet は $u|_{\partial\Omega}=g$ を満たす部分空間へ制限、または自由度の消去/拘束として実装）
- **幾何（計量 $G$）**: 例えば $L^2$ 計量なら、離散化後に質量行列 $M$ が現れ、勾配流は
  $M\dot q = -\nabla \mathcal F_h(q)$ の形（前処理/自然勾配の見取り図）になる

## Geometry (G, J)

典型的には $J=0$（散逸）で、
Newton（線形なら 1 回）または勾配系として解く。
関数空間では $G$ を $L^2$ や $H^1$ に対応させる視点がある。

## Discretization

- 有限要素空間 $V_h\subset V$ を選び $u_h\in V_h$
- 要素・基底・数値積分で離散化

基底展開 $u_h(x)=\sum_i q_i\phi_i(x)$ を $\mathcal F$ に代入すると、有限次元の目的関数
$\mathcal F_h(q)$ が得られ、最適性条件は
\[
\nabla \mathcal F_h(q)=0 \;\Longleftrightarrow\; Kq=b
\]
（剛性行列 $K$、荷重ベクトル $b$）として現れる。

## Algorithm

- 線形問題なので通常は線形方程式（剛性行列）を解く
- 非線形/連成になれば Newton/Krylov が自然に現れる

## Notes

本書の観点では「PDE を解く」ことが「汎関数の停留点を求める」に統一される代表例である。

