---
title: "Physics: Fluid Mechanics (Weak Form, KKT, and Stability)"
---

## Responsibility

このページの責務は、流体力学を弱形式から離散化し、非圧縮制約を KKT として解釈して安定条件と設計へつなぐことである。

## Position In Unified Flow

- 本章は `app01` の「弱形式と時間積分」を場の流体へ拡張する。
- 受け取り: 変分・離散化・安定の共通骨格。
- 受け渡し: 圧力拘束付き更新と設計可能な離散演算子。

## Symbol Dictionary

- 速度場: $v(x,t)$
- 圧力: $p(x,t)$
- 粘性係数: $\nu\ge 0$
- 離散速度・圧力: $v_h,\ p_h$
- 離散発散演算子: $D$

## Problem

前提条件: 非圧縮 Navier-Stokes を対象とし、密度は一定とする。

$$
\partial_t v + (v\cdot \nabla)v - \nu \Delta v + \nabla p = f,\qquad
\nabla\cdot v=0
$$

## Functional

弱形式では、試験関数 $w$ と $r$ に対して

$$
(\partial_t v,w)+((v\cdot\nabla)v,w)+\nu(\nabla v,\nabla w)-(p,\nabla\cdot w)=(f,w)
$$

$$
(\nabla\cdot v,r)=0
$$

となる。圧力は未定乗数として現れる。

## Geometry (J, R, G)

前提条件: 対流を保存ブロック、粘性を散逸ブロックとして分離する。

$$
\dot{z}=(J-R)\nabla H(z)+G u + G_p p
$$

ここで $G_p p$ が非圧縮拘束力を表す。  
構造保存の観点では、$J$ の離散化と $R\succeq 0$ の維持が鍵である。

## Discretization

空間離散後、半離散系は

$$
M\dot{v}_h + N(v_h)v_h + K v_h + D^\top p_h = f_h,\qquad
D v_h=0
$$

となる。  
$N(v_h)$ は対流項、$K$ は粘性項に対応する。

## Algorithm

前提条件: 各時刻で非圧縮制約を満たす。

射影法の代表形:

$$
v_h^\star = v_h^k + \Delta t\,M^{-1}\left(f_h-N(v_h^k)v_h^k-Kv_h^k\right)
$$

$$
D M^{-1}D^\top p_h^{k+1}
=
\frac{1}{\Delta t} D v_h^\star
$$

$$
v_h^{k+1}=v_h^\star-\Delta t\,M^{-1}D^\top p_h^{k+1}
$$

## Stability Condition

前提条件: 線形化モデルと陽的時間積分を考える。

$$
\Delta t \le \frac{2}{\sqrt{\lambda_{\max}(M^{-1}K_{\mathrm{effective}})}}
$$

対流優勢では CFL 条件（移流速度と格子幅に依存）を併用する。

## Optimization Bridge

設計変数 $\theta$ により粘性・形状・境界制御が変わるとする。

$$
M(\theta),\ K(\theta),\ D(\theta)
$$

例:

$$
\min_\theta
\int_0^{T_{\mathrm{final}}}
\|W v_h(t;\theta)\|^2 dt
\quad
\text{subject to}
\quad
M(\theta)\dot{v}_h+\cdots+D(\theta)^\top p_h=f_h
$$

## Notes

- 流体での圧力は、数値的には拘束を満たすための未定乗数として実装される。
- 安定な実装は、弱形式・拘束・時間積分の整合で決まる。
