---
title: "Chapter 4: Stationary Points"
---

## 4.1 停留点の役割

### Definition (stationary point)

停留点（stationary point, critical point）とは、次を満たす点である：

$$
d\mathcal F(x^*) = 0
$$

### Remark

有限次元ユークリッド空間では $d\mathcal F\simeq\nabla\mathcal F$ と同一視できるため、これは $\nabla\mathcal F(x^*)=0$ と書ける。

停留点の解釈は分野によって異なるが、中心にある条件は同一である。

- 最適化：極小点
- 波動：平衡点（その周りを回る）
- 制御・推定：KKT 点
- 物理：静的解

相違は「停留点へ収束するか」または「停留点の周りを回転するか」にあり、Chapter 3 の一般形

$$
\dot x
=
-K(x)\,d\mathcal F(x)
\;+\;
J(x)\,d\mathcal F(x)
$$

における **散逸（$K$）と保存（$J$）** の選び方が挙動を分ける（ユークリッド座標では $K=G^{-1}$ と書ける）。

## 4.2 停留点まわりの線形化（最小限）

### Proposition (first-order linearization)

$x^*$ の近傍で（局所座標／離散化後のベクトル表現として）$x = x^* + \xi$ とおくと、一次近似として

$$
d\mathcal F(x^*+\xi)\approx H\,\xi
$$

ここで $H:T_{x^*}\mathcal M\to T_{x^*}^*\mathcal M$ は $d\mathcal F$ の線形化（ユークリッド空間では $H=\nabla^2\mathcal F(x^*)$）。
したがって（$K,J$ を $x^*$ で固定した最小モデルでは）

$$
\dot \xi \approx \left(-K+J\right)H\,\xi
$$

この線形系の固有値構造が、収束（安定）／発散（不安定）／振動（純虚）などの局所挙動を規定する。

### Remark (what is ignored)

ここでは最小限の読み方のために、$K(x)$（あるいはそれを与える計量 $G(x)$）と $J(x)$ の $x$ 依存による追加項（$\nabla K$, $\nabla J$ に由来する項）を無視した。
多様体・関数空間・拘束のある問題ではこの差が効く場合があるが、停留点の「地形（Hessian）」と「流れ（$K,J$）」の役割分担は変わらない。

## 4.3 二次の情報：極小・サドル・退化

### Proposition (second-order picture in Euclidean space)

$\mathcal F$ が $C^2$ 級で、$x^*$ が停留点（$d\mathcal F(x^*)=0$。ユークリッド座標では $\nabla\mathcal F(x^*)=0$）であるとする。
このとき Hessian $H := \nabla^2\mathcal F(x^*)$ の符号構造が局所形状を決める：

- $H \succ 0$ なら $x^*$ は（少なくとも局所的に）極小として振る舞う
- $H \prec 0$ なら（局所的に）極大として振る舞う
- $H$ が不定（正負が混在）なら（典型的に）サドルとして振る舞う
- $H$ が半正定値で零固有値を持つなら **退化（flat direction）** があり、二次だけでは分類できない

### Remark (why “minimum” is not the whole story)

本書では「最適化」を広義（停留構造を数値的に扱う）に捉えるため、極小だけでなく **サドルや退化** を重要な対象として扱う。
制約付きでは KKT 点がサドルとして現れるのが典型であり、Chapter 6 で詳述する。

## 4.4 一般形に沿った安定性：散逸項が必ず落とすもの

### Proposition (Lyapunov decrease of the functional)

時間発展が Chapter 3 の一般形

$$
\dot x = -K(x)\,d\mathcal F(x) \;+\; J(x)\,d\mathcal F(x)
$$

で与えられ、$\mathcal F$ が $C^1$ 級で $x(t)$ が微分可能、さらに $K(x)$ が対称半正定、$J(x)$ が反対称（skew-adjoint）であるとする。
このとき軌道 $x(t)$ に沿って

$$
\frac{d}{dt}\mathcal F(x(t))
=
\langle d\mathcal F(x), \dot x\rangle
=
-\langle d\mathcal F(x),\,K(x)\,d\mathcal F(x)\rangle
\le 0
$$

が成り立つ（反対称性より $\langle d\mathcal F, J\,d\mathcal F\rangle=0$）。

### Remark (Euclidean coordinate expression)

有限次元ユークリッド空間で $d\mathcal F\simeq\nabla\mathcal F$、かつ $K=G^{-1}$ と書ける場合は

$$
\frac{d}{dt}\mathcal F(x(t)) = -\nabla \mathcal F(x)^\top G^{-1}(x)\nabla \mathcal F(x)\le 0
$$

となる。

### Remark (interpretation)

- $J$ は（理想化すれば）$\mathcal F$ を保存する “回転” を作る。
- **$\mathcal F$ を確実に減らすのは $K$ の散逸項だけ**である（ユークリッド座標では $K=G^{-1}$）。

したがって「停留点への収束」を狙うなら、$K$（あるいはそれを与える計量 $G$）の設計が本質になる。

## 4.5 局所ダイナミクス：収束・発散・減衰振動

### Proposition (local stability for the minimal linear model)

$K,J$ を $x^*$ で固定し、$H$ を $d\mathcal F$ の線形化（ユークリッド空間では $H=\nabla^2\mathcal F(x^*)$）とおく。
線形化

$$
\dot \xi = A\,\xi,\qquad A := (-K+J)H
$$

において、$A$ の固有値の実部がすべて負なら $x^*$ は（線形モデルでは）局所漸近安定である。

### Example (quadratic functional)

$\mathcal F(x)=\frac12 x^\top H x$（$H$ は対称）なら停留点は $x^*=0$ で、線形化は厳密に成り立つ：

$$
\dot x = (-K+J)H\,x.
$$

- **純粋勾配流（$J=0$）**:
  $K\succeq 0$ かつ $H\succ 0$ なら指数収束（実固有値が負）になりやすい。
  $H$ が不定なら、負曲率方向が指数発散を生む（サドルの不安定性）。
- **混合（$J\ne 0$）**:
  固有値に虚部が生まれ、収束しながら回る（減衰振動）ことがある。

### Example (2D damped rotation)

$K=I$（ユークリッドで $G=I$ に対応）、$H=kI$（$k>0$）、$J=\omega\begin{pmatrix}0&-1\\1&0\end{pmatrix}$ とすると

$$
\dot x = (-I+J)k\,x
$$

であり、固有値は $-k \pm i\,k\omega$ となる。
したがって軌道は **角速度 $k\omega$ で回転しながら、率 $k$ で減衰**する。

### Remark (non-normality)

一般に $H$ は対称でも $(-K+J)H$（ユークリッド座標では $K=G^{-1}$）は対称にならず、固有値だけでは短時間の過渡増幅（non-normal effect）を完全には捉えられない。
ただし「収束するか／回るか／発散するか」という第一近似の判断には線形化が有効である。

## 4.6 退化・制約：停留条件はどう拡張されるか

### Remark (degenerate stationary points)

$H$ が零固有値を持つ場合、一次と二次だけでは停留点のタイプが決まらない。
このとき実際の挙動は

- 高次の項（3次・4次…）
- 幾何（多様体制約やゲージ自由度）
- 雑音や離散化誤差

により分岐し得る。数値法の設計では「退化をどう壊すか／どう保つか」が重要になる。

### Remark (constraints and KKT)

等式制約 $c(x)=0$ を入れると、停留条件は（典型的に）ラグランジアン

$$
\mathcal L(x,\lambda) = \mathcal F(x) + \lambda^\top c(x)
$$

の停留点

$$
d_x \mathcal L(x^*,\lambda^*)=0,\qquad c(x^*)=0
$$

として表される（KKT）。
制約付きでは停留点がサドルとして現れるのが自然であり、Chapter 6 でこの見方を統一的に扱う。

## 4.7 この章のまとめ

- 停留点は $d\mathcal F(x^*)=0$（ユークリッド座標では $\nabla\mathcal F(x^*)=0$）で定義され、分野横断で共通の中心概念である。
- 二次情報（$d\mathcal F$ の線形化）$H$ が「地形（極小・サドル・退化）」を決める（ユークリッド空間では $H=\nabla^2\mathcal F(x^*)$）。
- 一般形の流れでは、$\mathcal F$ を単調に下げるのは散逸項 $-K\,d\mathcal F$ であり、保存項 $J\,d\mathcal F$ は回転を与える。
- したがって局所挙動は「地形（$H$）」と「流れ（$K,J$）」の組で決まり、次章ではその設計（方法論）を地図として整理する。

