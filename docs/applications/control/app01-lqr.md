---
title: "Control: LQR (Linear Quadratic Regulator)"
---

## Problem

線形系

$$
\dot x(t)=Ax(t)+Bu(t)
$$

に対して、二次コスト

$$
\mathcal F(u)=\int_0^T \left(x(t)^\top Q x(t)+u(t)^\top R u(t)\right)\,dt
$$

を最小にする制御 $u(t)$ を求める。

## Functional

本書の統一言語では「制御入力 $u(\cdot)$ に関する汎関数の最小化」として書ける。
制約（系のダイナミクス）は Chapter 6 の枠組みでラグランジアンに入る。

## Geometry (G, J)

典型的には散逸（最適化）側で扱い、$J=0$ とする。
（最適性条件を“解く”には Newton/KKT が自然。）

## Discretization

- 時間離散（例：shooting / collocation）
- 状態方程式を離散化して $x$ を $u$ の関数として消去するか、KKT として同時に解く

## Algorithm

- KKT（随伴）で一階最適条件を立てる
- AD を使うなら、離散化後のスカラー目的 $\mathcal F$ をコードとして書き、`grad`/`VJP` で必要量を得る

## Notes

LQR は古典的には Riccati 方程式で閉形式解を持つが、
ここでは「汎関数 + 制約（KKT）」という共通の型に落ちる例として置く。

