---
title: "Physics: Constrained Mechanics (Variational + KKT)"
---

## Problem

ホロノミック拘束 $g(q)=0$ を持つ力学系を、**変分原理 + 制約付き最適化（KKT）**として書き下す。

- 一般化座標: $q(t)\in\mathbb R^n$
- 拘束: $g:\mathbb R^n\to\mathbb R^m,\; g(q)=0$
- ラグランジアン: $L(q,\dot q,t)$

## Functional

拘束をラグランジュ未定乗数 $\lambda(t)$ で入れた拡張作用

$$
\mathcal F[q,\lambda]
:=
\int_{t_0}^{t_1}
\Big(
L(q,\dot q,t) + \lambda^\top g(q)
\Big)\,dt
$$

の停留条件をとる（狭義の「最小化」ではなく、停留構造の同定）。

## Geometry (G, J)

- $G$: ここでは散逸を入れず $G=0$（純粋な保存系）
- $J$: Hamilton 形式に落とすとシンプレクティック構造（反対称）を持つ  
  拘束は「$J$ を変える」のではなく、**許容方向（接空間）への射影**として入るのが自然

Remark:
拘束付きの時間発展は、連続系では未定乗数が「反力」として現れ、離散系では KKT 系（鞍点問題）として現れる。

## Discretization

代表的には 2 通り。

- **変分積分（variational integrator）**: 離散作用 $S_d(q_0,\dots,q_N)$ を作り、離散オイラー・ラグランジュ + 拘束で更新  
  - 長時間のエネルギー挙動が安定しやすい（構造保存）
- **射影法 / KKT**: いったん拘束なしで更新し、その後に $g(q)=0$ を満たすように射影（未定乗数は射影の副産物）

## Algorithm

VGO の観点では「制約付き最適化を、力学の更新として読む」。

- **連続**: 変分 → 拘束力（$\lambda$）が決まる
- **離散**: 各ステップで
  - 更新量（例: $\Delta q, \Delta p$）と
  - 未定乗数（反力）$\lambda$
  
  を同時に解く **KKT 系**になる

（実装上の定石）  
拘束のヤコビアン $A:=\nabla g(q)$ を使うと、線形化した射影は

$$
\begin{aligned}
\Delta q &\leftarrow \Delta q - A^\top \Delta \lambda\\
A\,\Delta q &= -g(q)
\end{aligned}
$$

の形（鞍点／Schur 補）になり、数値線形代数（前処理）が効く。

## Notes

- このページの主眼は「拘束 = KKT」という VGO 的統一視点  
  詳細は制約章（[chap06-constraints](../../chapters/chap06-constraints)）と接続する。
- 非ホロノミック拘束は「許容変分」の定義が変わるため、同じ KKT でも扱いが一段難しくなる。

