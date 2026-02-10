---
title: "Physics: Thermodynamics (Free Energy, Dissipation, and Design)"
---

## Responsibility

このページの責務は、熱力学を自由エネルギーの変分問題として書き、散逸構造と最適化を同じ枠で扱うことである。

## Position In Unified Flow

- 本章は `app01` の散逸ブロックを熱過程へ拡張する章である。
- 受け取り: エネルギー関数と受動性条件。
- 受け渡し: 勾配流、制約付き緩和、設計最適化。

## Symbol Dictionary

- 状態変数: $x(t)\in\mathbb{R}^n$
- 自由エネルギー: $\mathcal{F}(x)$
- 計量行列: $G(x)=G(x)^\top\succeq 0$
- 保存制約: $c(x)=0$, ヤコビアン: $C(x):=\nabla c(x)$

## Problem

前提条件: 等温環境で、自由エネルギー減少が緩和方向を規定する。

## Functional

$$
\mathcal{F}(x)=U(x)-T S(x)
$$

制約付き平衡は

$$
\min_x \mathcal{F}(x)
\quad
\text{subject to}
\quad
c(x)=0
$$

で与えられる。

## Geometry (J, R, G)

前提条件: 回転成分より散逸成分が支配的なモデルを採用する。

$$
\dot{x}=-G(x)\nabla \mathcal{F}(x)
$$

制約付きでは

$$
\dot{x}=-G(x)\nabla \mathcal{F}(x)+C(x)^\top \lambda,\qquad c(x)=0
$$

となり、$\mathcal{F}$ は Lyapunov 関数として機能する。

## Discretization

陽的 Euler の最小形:

$$
x_{k+1}=x_k-\Delta t\,G(x_k)\nabla\mathcal{F}(x_k)
$$

前提条件: 時間刻みを十分小さく選ぶ。  
単調減少を強く要求する場合は陰的化または分割法を用いる。

## Algorithm

制約付き緩和の離散形は KKT 系に落ちる。

$$
\begin{pmatrix}
\widehat{G} & C^\top\\
C & 0
\end{pmatrix}
\begin{pmatrix}
\Delta x\\
\lambda
\end{pmatrix}
=
\begin{pmatrix}
-\nabla \mathcal{F}\\
-c
\end{pmatrix}
$$

この形は `app02` の拘束力学と同型である。

## Optimization Bridge

材料パラメータ $\theta$ が熱容量・伝導率へ入る場合:

$$
G(\theta),\ \mathcal{F}(x;\theta)
$$

設計問題:

$$
\min_\theta
\int_0^{T_{\mathrm{final}}}
\Phi(x(t),\theta)\,dt
\quad
\text{subject to}
\quad
\dot{x}=-G(\theta)\nabla\mathcal{F}(x;\theta)
$$

受動性条件 $G(\theta)\succeq 0$ を保つことで物理的一貫性を維持する。

## Notes

- 熱力学での「良いアルゴリズム」は、自由エネルギー減少と保存制約保持を同時に満たす。
- pH 観点では、熱過程は主に散逸ブロックとして解釈できる。
