---
title: "Physics: Constrained Mechanics (Variational, KKT, and pH)"
---

## Responsibility

このページの責務は、拘束付き力学を変分原理から KKT 系へ落とし、port-Hamiltonian 構造と最適化へ接続することである。

## Position In Unified Flow

- 本章は `app01` の「弱形式から離散化」の後段に位置する。
- 受け取り: $M, C, K$ と状態方程式。
- 受け渡し: 拘束付き時間積分と設計可能な KKT 構造。

## Symbol Dictionary

- 一般化座標: $q(t)\in\mathbb{R}^n$
- 拘束: $g(q)=0,\ g:\mathbb{R}^n\to\mathbb{R}^m$
- 拘束ヤコビアン: $A(q):=\nabla g(q)\in\mathbb{R}^{m\times n}$
- 未定乗数: $\lambda(t)\in\mathbb{R}^m$

## Problem

前提条件: ホロノミック拘束を持つ有限次元力学系を対象とし、拘束力は理想拘束として仕事をしない。

## Functional

$$
\mathcal{F}[q,\lambda]
:=
\int_{t_0}^{t_1}
\left(
L(q,\dot{q},t)+\lambda^\top g(q)
\right)\,dt
$$

停留条件:

$$
\delta \mathcal{F}=0
\Rightarrow
\frac{d}{dt}\left(\frac{\partial L}{\partial \dot{q}}\right)-\frac{\partial L}{\partial q}
=
A(q)^\top \lambda,\qquad
g(q)=0
$$

## Geometry (J, R, G)

前提条件: まず保存系を基準にし、必要なら散逸を追加する。

$$
\dot{z}=(J-R)\nabla H(z)+G u + G_\lambda \lambda
$$

$$
g(q)=0,\qquad A(q)\dot{q}=0
$$

ここで $G_\lambda \lambda$ が拘束反力を表し、離散化後に KKT の鞍点構造を作る。

## Discretization

時間離散した 1 ステップの線形化は、典型的に次の KKT 系となる。

$$
\begin{pmatrix}
\widehat{M} & A^\top\\
A & 0
\end{pmatrix}
\begin{pmatrix}
\Delta q\\
\Delta \lambda
\end{pmatrix}
=
\begin{pmatrix}
r_q\\
r_g
\end{pmatrix}
$$

ここで $\widehat{M}$ は質量・減衰・接線剛性を含む有効行列である。

## Algorithm

前提条件: 1 ステップ内で拘束残差をゼロに近づける。

1. 予測更新で $\Delta q_{\mathrm{free}}$ を計算する。  
2. KKT 系で $\Delta \lambda$ を解く。  
3. $\Delta q=\Delta q_{\mathrm{free}}-A^\top \Delta \lambda$ で補正する。  
4. $g(q^{k+1})$ と $A(q^{k+1})\dot{q}^{k+1}$ を再評価する。  

## Optimization Bridge

拘束設計を変数化すると、制約と応答を同時に最適化できる。

$$
\min_{\theta,\lambda}\ J(\theta,q)
\quad
\text{subject to}
\quad
M(\theta)\ddot{q}+C(\theta)\dot{q}+K(\theta)q=A(q)^\top\lambda+f
$$

拘束満足と応答性能を同時に扱うため、随伴法は KKT 構造をそのまま利用できる。

## Notes

- 拘束は追加項ではなく、状態空間を定める幾何条件として解釈すると見通しが良い。
- 数値実装では Schur 補と前処理が計算コストを支配する。
