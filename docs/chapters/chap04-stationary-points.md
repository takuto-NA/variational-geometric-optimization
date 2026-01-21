---
title: "第4章　停留点"
---

> **この章で主に触るknob**: Algorithm（停留点近傍の読む/分類）＋ Geometry（$K,J$ と局所挙動）

## 4.1 停留点の役割

### Definition (stationary point)

停留点（stationary point, critical point）とは、次を満たす点 $x^*$ である：

$$
d\mathcal F(x^*) = 0
$$

これは一次変分（共ベクトル）がゼロであることを意味する。有限次元ユークリッド座標表示では $\nabla\mathcal F(x^*)=0$ となる。

停留点の解釈は分野によって異なるが、中心にある条件は同一である。

- 最適化：極小点
- 波動：平衡点（その周りを回る）
- 制御・推定：KKT 点
- 物理：静的解

相違は「停留点へ収束するか」または「停留点の周りを回転するか」にあり、第3章の一般形
$$
\dot x
=
-K(x)\,d\mathcal F(x)
\;+\;
J(x)\,d\mathcal F(x)
$$
における **散逸（$K$）と保存（$J$）** の選び方が挙動を分ける。

## 4.2 停留点まわりの線形化（最小限）

### Proposition (first-order linearization)

$x^*$ の近傍で（局所座標／離散化後のベクトル表現として）$x = x^* + \xi$ とおくと、一次近似として

$$
d\mathcal F(x^*+\xi)\approx H\,\xi
$$

ここで $H := \nabla^2\mathcal F(x^*)$（第2章 Definition 2.4 参照）は Hessian 作用素であり、$T_{x^*}\mathcal M\to T_{x^*}^*\mathcal M$ として $d\mathcal F$ の線形化を与える。

したがって、線形化されたダイナミクスは次のように書ける（$K, J$ を $x^*$ で固定）：

$$
\dot \xi \approx \underbrace{(-K+J)}_{\text{Operators on } T^*} \underbrace{H \xi}_{\text{Covector}}
$$

この行列 $A = (-K+J)H$ の固有値構造が、収束（安定）／発散（不安定）／振動（純虚）などの局所挙動を規定する。

## 4.3 二次の情報：極小・サドル・退化

### Proposition (second-order picture)

$\mathcal F$ が $C^2$ 級で、$x^*$ が停留点（$d\mathcal F(x^*)=0$）であるとする。
このとき Hessian 作用素 $H$ の符号構造が局所形状を決める：

- $H \succ 0$ （正定値）なら $x^*$ は（少なくとも局所的に）極小として振る舞う
- $H \prec 0$ （負定値）なら（局所的に）極大として振る舞う
- $H$ が不定（正負が混在）なら（典型的に）サドルとして振る舞う
- $H$ が退化（零固有値を持つ）なら、二次だけでは分類できない

本書では「最適化」を広義に捉えるため、極小だけでなく **サドルや退化** を重要な対象として扱う。
制約付きでは KKT 点がサドルとして現れるのが典型であり、第6章で詳述する。

## 4.4 一般形に沿った安定性：散逸項が必ず落とすもの

### Proposition (Lyapunov decrease)

時間発展が第3章の一般形に従うとき、軌道 $x(t)$ に沿って次が成り立つ：

$$
\frac{d}{dt}\mathcal F(x(t))
=
\langle d\mathcal F(x), \dot x\rangle
=
-\langle d\mathcal F, K d\mathcal F \rangle + \underbrace{\langle d\mathcal F, J d\mathcal F \rangle}_{0}
\le 0
$$

- $J$ の項は反対称性により消え、仕事をしない（回転成分）。
- **$\mathcal F$ を確実に減らすのは $K$ の散逸項だけ**である。

## 4.5 局所ダイナミクス：収束・発散・減衰振動

### Example (quadratic functional)

$\mathcal F(x)=\frac12 \langle x, H x \rangle$（$H$ は対称正定値）なら停留点は $x^*=0$ で、線形化は厳密に成り立つ：

$$
\dot x = (-K+J)H\,x
$$

- **純粋勾配流（$J=0$）**:
  $\dot x = -K H x$。$K, H$ が共に正定値なら、固有値はすべて負の実部を持ち、指数収束する。
- **混合（$J\ne 0$）**:
  $\dot x = (-K+J)H x$。固有値に虚部が生まれ、収束しながら回る（減衰振動）ことがある。

### Example (2D damped rotation)

ユークリッド空間で $K=I$、$J=\omega\begin{pmatrix}0&-1\\1&0\end{pmatrix}$、$H=kI$ とすると

$$
\dot x = (-I+J)k\,x = \begin{pmatrix} -k & -k\omega \\ k\omega & -k \end{pmatrix} x
$$

固有値は $-k \pm i\,k\omega$ となる。
軌道は **角速度 $k\omega$ で回転しながら、率 $k$ で減衰**する。

## 4.6 この章のまとめ

本章では、停留点近傍の局所挙動を **線形化ダイナミクス $A = (-K+J)H$** の固有値構造として読み解いた。

| 条件 | 固有値の性質 | 挙動 |
|------|-------------|------|
| $K > 0$, $J = 0$, $H > 0$ | 負の実固有値 | 指数収束 |
| $K = 0$, $J \ne 0$ | 純虚固有値 | 振動（保存） |
| $K > 0$, $J \ne 0$ | 負の実部 + 虚部 | 減衰振動 |
| $H$ 不定（サドル） | 正負混在 | 局所的に不安定 |
| $H$ 退化 | 零固有値あり | 二次情報だけでは分類不能 |

$H$ が退化する場合や、制約 $C(x)=0$ がある場合は、単純な線形化解析だけでは不十分である。制約付きの停留条件はラグランジアンの停留点（KKT 点）として記述され、第6章で詳述する。

次章以降では、この構造をどのように「実装可能なアルゴリズム」に落とし込むかを扱う。
