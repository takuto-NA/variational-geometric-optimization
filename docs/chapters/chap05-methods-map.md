---
title: "Chapter 5: Methods Map"
---

## 5.1 勾配流・Newton・Hamilton の位置づけ

| 分類 | 数式 | 解釈 |
| --- | --- | --- |
| 勾配流 | $\dot x = -\nabla \mathcal F$ | 最急降下（熱） |
| Newton | $\nabla \mathcal F = 0$ | 停留条件（解法としての Newton） |
| Hamilton | $\dot x = J\nabla \mathcal F$ | 保存・周期 |
| 混合 | 両方 | 減衰振動 |

最適化はこの中の一部であり、中心は停留構造である。

## 5.2 Newton を「流れ」として見る（直感）

Newton 法は「停留条件を解く」反復ですが、局所的には

$$
\Delta x = -\left(\nabla^2\mathcal F(x)\right)^{-1}\nabla\mathcal F(x)
$$

という **$G^{-1}\nabla\mathcal F$ 型**の更新だと見なせる。
（$G$ を Hessian に選ぶ、という理解。）

## 5.3 制約付き：KKT はサドル点の“地形”

制約を入れると停留点は一般にサドルになり、
「極小化」と同様の直観だけでは扱えない。
一方で Chapter 6 のように **ラグランジアン $\mathcal L$ の停留構造**として統一できる。

