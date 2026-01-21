---
title: "Control: MPC (Model Predictive Control) in the VGO Framework"
---

## Problem

**MPC（Model Predictive Control）** は、各時刻で「有限ホライズンの最適制御問題」を解き、先頭の入力だけ適用してホライズンをずらす（receding horizon）制御である。

基本形（離散時間）は

$$
\min_{x_{0:N},u_{0:N-1}}
\;\phi(x_N)+\sum_{k=0}^{N-1}\ell(x_k,u_k,k)
$$

subject to

$$
x_{k+1}=F(x_k,u_k,k),\qquad x_0=\hat x(t),
$$

および（必要なら）箱制約・ポリトープ制約など

$$
x_k\in \mathcal X,\qquad u_k\in \mathcal U,\qquad c(x_k,u_k)\le 0.
$$

ここで \(\hat x(t)\) は観測/推定（状態推定器）から得る現在状態である。

## Functional（VGO の統一言語）

MPC は「最適制御（`app02-optimal-control`）」を **有限次元に離散化**した上で、

- 汎関数（目的）\(\mathcal J\)
- 制約（ダイナミクス + 不等式/等式）

の KKT（[第6章](../../chapters/chap06-constraints)）を毎サンプルで解く、という構造になる。

VGO 的には

- **設計変数**: \(\theta=(x_{0:N},u_{0:N-1})\)（あるいは \(u\) のみ、など）
- **汎関数**: スカラー目的 \(\mathcal J(\theta)\)
- **制約**: \(C(\theta)=0\), \(G(\theta)\le 0\)

を明示して、「停留構造（一次・二次変分）をどう計算し、どう解くか」を選ぶ問題になる。

## Geometry (G, J)

MPC の実装は多くの場合「散逸（最適化）として解く」立場を取る。

- **典型**: \(J=0\) として、KKT を SQP / interior-point で解く（堅牢、制約に強い）。
- **高速化**: 近似 Hessian（Gauss-Newton / L-BFGS）や構造利用（帯行列、スパース KKT）でリアルタイム性を確保する。

（PMP のような “保存構造” は背後にあるが、MPC では direct（離散化→NLP）に落として計算するのが実務的。）

## Discretization（direct が主役）

MPC は基本的に direct 法：

- **状態方程式**: 離散時間モデル \(F\)（物理モデル、線形化モデル、学習モデルなど）
- **予測ホライズン**: \(N\)（長いほど性能↑だが計算コスト↑）
- **制約の表現**: \(\mathcal X,\mathcal U\) や \(c(\cdot)\)（不等式、軟制約など）

VGO 的に重要なのは「離散化が \(\mathcal J\) と制約の “形” を決め、したがって停留条件の線形代数構造（ヤコビアン、KKT 行列）を決める」点である。

## Algorithm（MPC を VGO で見る）

### KKT を毎回解く（基本形）

- **SQP / interior-point**: 制約付き最適化の標準。
- **線形 MPC**: QP に落ちるため、高速ソルバ（アクティブ集合、内点、OSQP 系）で回せる。

### リアルタイム反復（RTI）と warm start

MPC の現場的な鍵は「毎ステップで完全収束させない」こと：

- **warm start**: 直前解をシフトして初期解にする
- **RTI**: 1 回（あるいは少数回）の SQP ステップだけ回して入力を出す

VGO の観点では、これは「停留点を厳密に解く」から「停留点へ追従する（逐次追跡）」へのモード切替であり、
[第5章](../../chapters/chap05-methods-map) の “手法マップ” に沿って **Newton 系を時間発展に埋め込んだ**と見なせる。

### AD と実装

direct MPC では、離散化後のスカラー目的 \(\mathcal J(\theta)\) と制約 \(C(\theta)\) をコードとして書けば、

- 勾配（一次変分）: `grad` / VJP
- ヤコビアン作用: JVP/VJP
- 二次情報: Gauss-Newton 近似 or Hessian-vector product

が取得できる（[第8章](../../chapters/chap08-implementation) の実装方針）。

## Notes

- **重要度**: 制約付き最適化（[第6章](../../chapters/chap06-constraints)）と実装（[第8章](../../chapters/chap08-implementation)）を「制御の現場」に接続する最短ルート。
- **実装難易度**: 中〜高（ソルバ選定、スパース線形代数、リアルタイム制約）。
- **実装リスク**:
  - モデル誤差・外乱で制約が破れる（軟制約、ロバスト化、推定器との統合が必要）
  - 計算時間が間に合わない（warm start、RTI、構造利用が必須）

