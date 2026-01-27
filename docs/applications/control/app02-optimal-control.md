---
title: "Control: Optimal Control in the VGO Framework"
---

> このページで主に触るknob: Space（軌道/入力/乗数）＋ Discretization（direct/indirect）＋ Algorithm（KKT/SQP vs BVP）＋ Geometry（散逸/保存の読み替え）

## Problem

最適制御は「時間関数としての制御入力 $u(\cdot)$ を設計変数として、状態 $x(\cdot)$ をダイナミクス制約の下で動かし、目的汎関数を**停留（最小化を含む）**させる」問題である。
本書の “optimization” は狭義の極小化に限らず、汎関数の停留構造を数値的に扱うことを指す（保存系（$J$）も射程に含む；[序文 0.4](../../chapters/chap00-preface#0-4-optimization-という言葉について)）。

このページの最小の絵（翻訳キー）：

- 入力: `Space 𝓜`（未知量の置き方）と `Functional 𝓕`
- 出力: `KKT / Stationary`（一次変分がゼロ）と（必要なら）`local shape H`
- 翻訳: `Geometry/Algorithm` により `d𝓕（共ベクトル）` を「更新／ダイナミクス」に落とす

連続時間の典型形は

$$
\min_{x(\cdot),\,u(\cdot)}\;
\mathcal J[x,u]
:=
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

このページでは、これを **VGO（変分的幾何最適化）** の言葉で

- `汎関数 𝓕`（何を停留させるか）
- `制約`（ODE/PDE も含む；[第6章](../../chapters/chap06-constraints)）
- `散逸/保存（K/J）`（どう動かす/解くか；[第3章](../../chapters/chap03-general-equation)）

に分解し、PMP と MPC（および SQP / iLQR）を**同一骨格**の上に置く。

## Functional（VGO の統一言語）

VGO の出発点は「停留条件」である（[第2章](../../chapters/chap02-minimal-ingredients)）。
最適制御では未知量（変数）をどう置くかで見え方は変わるが、どの場合も本質は

$$
d\mathcal F(\theta)=0
$$

（必要なら KKT / 相補性）に落ちる。

このページでは、$\theta$ の代表例を次のように読む：

- direct（離散化→NLP）: $\theta=(x_{0:N},u_{0:N-1})$（必要ならスラック変数・乗数も含む）
- indirect（PMP/BVP）: $\theta=(x(\cdot),u(\cdot),\lambda(\cdot))$

[第6章](../../chapters/chap06-constraints) の記法で、制約付き汎関数（ラグランジアン）を

$$
\mathcal L[x,u,\lambda,\mu,\nu]
:=
\phi(x(T))+\int_0^T \Big(
\ell(x,u,t)
+ \lambda(t)^\top(f(x,u,t)-\dot x)
+ \mu(t)^\top h(x,u,t)
+ \nu(t)^\top g(x,u,t)
\Big)\,dt
$$

のように置く（ここでは経路等式制約 $h(x,u,t)=0$、経路不等式制約 $g(x,u,t)\le 0$ をまとめて書いた。終端制約は $\phi$ に吸収するか、別途乗数を入れる）。
また $\lambda$ はダイナミクス制約のラグランジュ乗数（随伴変数）、$\mu,\nu$ は等式/不等式制約の乗数である。
終端制約は $\phi$ に吸収するか、別途乗数を入れる。

このとき「最適性条件」は

- $x,u$ に関する停留条件（一次変分がゼロ）
- 制約の充足
- 不等式なら相補性

という **KKT（サドル点）** として統一される。

## Geometry (G, J)

VGO の一般形（散逸 + 保存；[第3章](../../chapters/chap03-general-equation)）に対して、最適制御は大きく 2 つの見方を取れる。

- **散逸（“最適化として解く”）**: 変数 $\theta=(x,u,\lambda,\dots)$ の上で $J=0$ として、勾配流・Newton・SQP などで **KKT（停留条件）**を解く（[第5章](../../chapters/chap05-methods-map) の「勾配流 / Newton / KKT」）。
- **保存（Hamilton として読む）**: ダイナミクス制約の乗数 $\lambda$ を導入すると、停留条件が $(x,\lambda)$ の Hamilton 系（境界値問題）として現れる（後述の PMP、[第5章](../../chapters/chap05-methods-map) の「Hamilton」）。

どちらを選ぶかは「何を未知量として持つか」「離散化と実装の都合（AD, 線形ソルバ, 安定性）」で決まる。

補足：本書の $G$ は「共ベクトル→更新ベクトル」の翻訳（前処理）であり、実装ではスケーリングや重み付け（状態/入力重み、時間方向のスケール）が事実上の計量として効く。

（向きの注意）  
AD が返すのは基本的に一次変分の成分（共ベクトル）であり、更新方向（ベクトル）にするには計量（前処理）が要る（[第2章 2.3](../../chapters/chap02-minimal-ingredients#2-3-計量と勾配translation-layer), [第8章 8.1](../../chapters/chap08-implementation#8-1-抽象から実装へ翻訳のトレースtrace)）。

## Discretization

最適制御では、離散化が「実装上の主要な設計自由度」になる。

- **direct（離散化してから停留条件を解く）**: $x_{k+1}=F(x_k,u_k)$ のように離散化し、有限次元 NLP として KKT / SQP を回す（shooting / multiple shooting / collocation）。
  - 実装は素直で、AD（`grad`/`VJP`/`JVP`）と相性が良い。
  - MPC ではこの形が実務のデフォルトになりやすい（毎ステップ解き直す都合）。
- **indirect（停留条件を立ててから離散化して解く）**: 連続の停留条件（随伴方程式など）を立て、境界値問題として解く（PMP 系）。
  - 構造は美しいが、境界条件・安定性・数値解法が難しくなりやすい。

VGO 的には **「先に汎関数を決め、どのレベルで離散化し、どの停留条件を数値的に満たすか」** が設計の中心になる。

## Algorithm

同一の問題でも、目的に応じて複数の “解き方” を選べる。

- **KKT/SQP**（direct との親和性が高い）: 離散化後の NLP を SQP / interior-point で解く（制約込みで堅牢）。
- **Newton / Gauss-Newton / iLQR**: 二次近似と線形化で高速化（リアルタイム性が要るときに有効）。  
  Newton は Algorithm（方程式ソルバ）としても Geometry（$K=H^{-1}$）としても現れる（[第5章 5.3](../../chapters/chap05-methods-map#5-3-newton-法の二面性algorithm-か-geometry-か)）。
  iLQR は典型的に shooting の上での Gauss-Newton / SQP を、Riccati（構造化ソルバ）で高速に解く立場として理解できる（$H$ を明示構築しない）。
- **随伴（adjoint）による勾配**: 変数を $u$ のみに落とし、$\nabla_u \mathcal J$ を随伴で計算して最適化する。
- **Hamilton（PMP）**: $(x,\lambda)$ の連立（境界値）を解くことで最適性を満たす。

VGO の視点では、これらは「停留構造（一次・二次変分）の満たし方」の違いにすぎない。

### PMP の最小式（同一骨格の“保存側”）

Hamiltonian を

$$
\mathcal H(x,u,\lambda,t):=\ell(x,u,t)+\lambda^\top f(x,u,t)
$$

と置くと、（内点での）停留条件は最小限

$$
\dot x=\partial_\lambda \mathcal H,\qquad
\dot\lambda=-\partial_x \mathcal H,\qquad
0=\partial_u \mathcal H
$$

の形で書ける（詳細は [app03-pmp](./app03-pmp)）。

### 最小の実装単位（direct の目線）

最小仕様は「汎関数（スカラー）と制約（ベクトル）を実装し、AD と線形ソルバで KKT を回す」に集約できる（[第8章](../../chapters/chap08-implementation) と同型）：

- `J(theta)`（目的）
- `c(theta)=0, g(theta)≤0`（制約）
- `grad/VJP/JVP`（一次変分・ヤコビアン作用）
- （必要なら）`HVP`（二次情報）と前処理

## Notes

- **重要度**: 最適制御は制御セクション全体の “共通骨格” になる（MPC も PMP もここから派生）。
- **実装難易度**: direct + SQP が実装しやすい（AD で Jacobian/Hessian 近似を得られる）。indirect（PMP）は数値安定性・境界値問題が難所。
- **実装リスク**: 「離散化の選び方」と「制約の扱い（不等式、終端条件、接触）」が破綻点になりやすい。まずは direct（離散化→NLP）を基準に置くのが安全。
- **推奨デフォルト**: まず direct + SQP（必要なら iLQR/RTI で高速化）を基準にし、PMP は構造理解・検証・設計指針として使うとよい。