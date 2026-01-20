---
title: "Chapter 4: Stationary Points"
---

## 4.1 停留点の役割

### Definition (stationary point)

停留点（stationary point）とは、次を満たす点である：

$$
\nabla \mathcal F(x^*) = 0
$$

### Remark

停留点の解釈は分野によって異なる。

- 最適化：極小点
- 波動：平衡点（その周りを回る）
- 制御・推定：KKT 点
- 物理：静的解

相違は「停留点へ収束するか」または「停留点の周りを回転するか」にあり、
中心にある条件は同一である。

## 4.2 停留点まわりの線形化（最小限）

### Proposition (first-order linearization)

$x^*$ の近傍で $x = x^* + \xi$ とおくと、一次近似として

$$
\nabla \mathcal F(x^*+\xi)\approx \nabla^2\mathcal F(x^*)\,\xi
$$

したがって（$G,J$ を $x^*$ で固定した最小モデルでは）

$$
\dot \xi \approx \left(-G^{-1}\nabla^2\mathcal F(x^*) + J\nabla^2\mathcal F(x^*)\right)\xi
$$

この線形系の固有値構造が、収束（安定）／発散（不安定）／振動（純虚）などの局所挙動を規定する。

