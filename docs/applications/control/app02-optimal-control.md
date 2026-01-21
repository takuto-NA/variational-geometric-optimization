---
title: "Control: Optimal Control in the VGO Framework"
---

## Problem

最適制御は「時間関数としての制御入力 \(u(\cdot)\) を設計変数として、状態 \(x(\cdot)\) をダイナミクス制約の下で動かし、目的汎関数を最小化する」問題である。

連続時間の典型形は

$$
\min_{x(\cdot),\,u(\cdot)}\;
\mathcal J[x,u]
=
\phi(x(T))+\int_0^T \ell(x(t),u(t),t)\,dt
$$

subject to

$$
\dot x(t)=f(x(t),u(t),t),\qquad x(0)=x_0,
$$

および（必要なら）経路制約・終端制約

$$
g(x(t),u(t),t)\le 0,\qquad h(x(T))=0.
$$

この章では、これを **VGO（変分的幾何最適化）** の「汎関数 + 制約（Chapter 6）」として書き直し、PMP や MPC を同一骨格の上に置く。

## Functional（VGO の統一言語）

Chapter 6 の記法で、制約付き汎関数のラグランジアンを

$$
\mathcal L[x,u,\lambda,\mu,\nu]
=
\phi(x(T))+\int_0^T \Big(
\ell(x,u,t)
\lambda(t)^\top(\dot x-f(x,u,t))
\mu(t)^\top h_t(x,u,t)
\nu(t)^\top g_t(x,u,t)
\Big)\,dt
$$

のように置く（\(\lambda\) はダイナミクス制約のラグランジュ乗数、\(\mu,\nu\) は等式/不等式制約の乗数。終端制約は \(\phi\) に吸収するか、別途乗数を入れる）。

このとき「最適性条件」は

- \(x,u\) に関する停留条件（一次変分がゼロ）
- 制約の充足
- 不等式なら相補性

という **KKT（サドル点）** として統一される。

## Geometry (G, J)

VGO の一般形（散逸 + 保存）に対して、最適制御は大きく 2 つの見方を取れる。

- **散逸（最適化）として解く**: 変数 \(\theta=(x,u,\lambda,\dots)\) の上で \(J=0\) として、勾配流・Newton・SQP などで KKT を解く（Chapter 5 の「勾配流/ Newton / KKT」）。
- **保存（Hamilton）として読む**: ダイナミクス制約の乗数 \(\lambda\) を導入すると、停留条件が \((x,\lambda)\) の Hamilton 系（境界値問題）として現れる（後述の PMP、Chapter 5 の「Hamilton」）。

どちらを選ぶかは「何を未知量として持つか」「離散化と実装の都合（AD, 線形ソルバ, 安定性）」で決まる。

## Discretization

最適制御では、離散化が「実装上の主要な設計自由度」になる。

- **direct**（離散化してから最適化）: \(x_{k+1}=F(x_k,u_k)\) のように離散化し、有限次元 NLP として解く（shooting / multiple shooting / collocation）。
  - 実装は素直で、AD（`grad`/`VJP`/`JVP`）と相性が良い。
- **indirect**（最適性条件を立ててから解く）: 連続の停留条件（随伴方程式など）を立て、境界値問題として解く（PMP 系）。
  - 構造は美しいが、境界条件・安定性・数値解法が難しくなりやすい。

VGO 的には **「先に汎関数を決め、どのレベルで離散化し、どの停留条件を数値的に満たすか」** が設計の中心になる。

## Algorithm

同一の問題でも、目的に応じて複数の “解き方” を選べる。

- **KKT/SQP**: 離散化後の NLP を SQP / interior-point で解く（制約込みで堅牢）。MPC と相性が良い。
- **Newton / Gauss-Newton / iLQR**: 近似二次化で高速化（リアルタイム性が要るときに有効）。
- **随伴（adjoint）による勾配**: \(u\) のみに落とし、\(\nabla_u \mathcal J\) を随伴で計算して最適化する。
- **Hamilton（PMP）**: \((x,\lambda)\) の連立（境界値）を解くことで最適性を満たす。

VGO の視点では、これらは「停留構造（一次・二次変分）の満たし方」の違いにすぎない。

## Notes

- **重要度**: 最適制御は制御セクション全体の “共通骨格” になる（MPC も PMP もここから派生）。
- **実装難易度**: direct + SQP が実装しやすい（AD で Jacobian/Hessian 近似を得られる）。indirect（PMP）は数値安定性・境界値問題が難所。
- **実装リスク**: 「離散化の選び方」と「制約の扱い（不等式、終端条件、接触）」が破綻点になりやすい。まずは direct（離散化→NLP）を基準に置くのが安全。

