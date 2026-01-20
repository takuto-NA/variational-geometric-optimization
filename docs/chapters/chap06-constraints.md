---
title: "Chapter 6: Constraints"
---

## 6.1 制約の型

- 等式制約：$C(x)=0$
- 不等式制約
- PDE 制約（制御・推定）
- ゲージ制約

## 6.2 拡張汎関数（KKT）

$$
\mathcal L(x,\lambda)
=
\mathcal F(x) + \langle \lambda,\, C(x)\rangle
$$

停留条件：

$$
\nabla_x \mathcal L = 0,\qquad C(x)=0
$$

ポイント：これは一般に **サドル点問題**です。

## 6.3 幾何的解釈（見取り図）

- 制約多様体上での停留点
  または
- 双対変数を含む拡張空間上の停留点

