---
title: "Physics Example Template"
---

## Responsibility

このページの責務を 1 文で書く（何を統一的に説明するか）。

## Position In Unified Flow

一本化ストーリーにおける章の位置を明記する。

- 入力: どの数理ブロックを前提にするか
- 出力: 次章へ何を受け渡すか

## Symbol Dictionary

- 状態変数:
- 入力変数:
- 行列・演算子:
- 制約:

## Problem

前提条件: 線形/非線形、保存/散逸、外力の有無を 1 行で明記する。

## Functional

$$
\mathcal{F}(\cdot)=
$$

停留条件または最小化条件:

$$
\delta \mathcal{F}=0
\quad \text{or} \quad
\min \mathcal{F}
$$

## Geometry (J, R, G)

- 構造行列: $J=-J^\top$
- 散逸行列: $R=R^\top \succeq 0$
- 計量: $G \succeq 0$

必要ならエネルギー収支を書く:

$$
\dot{H}=-(\nabla H)^\top R\nabla H + y^\top u
$$

## Discretization

空間離散・時間離散を分けて記述する。

$$
\text{continuous} \Rightarrow \text{discrete}
$$

## Algorithm

- 更新式を 1 つ明示する
- 制約があれば KKT 形を明示する
- 安定条件があれば前提条件付きで明示する

## Optimization Bridge

設計変数 $\theta$ を導入し、行列または演算子への写像を明示する。

$$
M(\theta),\ C(\theta),\ K(\theta)
\quad \text{or} \quad
\mathcal{A}(\theta)
$$

## Notes

- 物理的意味
- 実装上の注意
- 関連章へのリンク
