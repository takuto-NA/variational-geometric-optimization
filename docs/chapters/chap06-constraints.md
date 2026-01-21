---
title: "第6章　制約"
---

> この章で主に触るknob: Space（制約で許される方向が変わる）＋ Algorithm（KKT/サドルとして解く）

## 6.1 制約の型

制約は「許される変化方向を削る」ために現れる。基本形は次の 4 つである。

### Definition (constraint types)

- 等式制約：$C(x)=0$
- 不等式制約：$g(x)\le 0$
- 集合制約：$x\in\mathcal K$（例：非負制約、単体、箱型制約）
- 作用素（PDE）制約：$\mathcal A(u,m)=0$（例：状態方程式）

## 6.2 拡張汎関数（KKT）

制約付き問題の中心は「極小化」ではなく、拡張汎関数（ラグランジアン）の停留条件である。

### Definition (Lagrangian)

$$
\mathcal L(x,\lambda,\mu)
=
\mathcal F(x) + \langle \lambda,\, C(x)\rangle + \langle \mu,\, g(x)\rangle
$$

### Proposition (KKT conditions)

解候補 $(x^*,\lambda^*,\mu^*)$ は次を満たす（KKT条件）：

$$
\begin{aligned}
&d_x \mathcal L(x^*,\lambda^*,\mu^*) = 0 \\
&C(x^*)=0 \\
&g(x^*)\le 0,\qquad \mu^*\ge 0 \\
&\mu^*_i\, g_i(x^*) = 0 \quad (i=1,\dots,p)
\end{aligned}
$$

第1式 $d_x\mathcal L=0$ は一次変分（共ベクトル）がゼロという条件であり、これは計量に依存しない。
有限次元座標表示では $\nabla \mathcal F(x^*) + (D C(x^*))^\top \lambda^* + \dots = 0$ となる。

## 6.3 幾何的解釈

### 制約多様体と接空間

等式制約 $C(x)=0$ の下で、許容される微小変化の集合（接空間）は
$$
T_x\mathcal M_C = \{\xi \in T_x\mathcal M \mid \langle dC(x), \xi \rangle = 0\}
$$
である。$d_x\mathcal L=0$ は、$d\mathcal F$ が制約の勾配 $dC$ と線形従属である（つまり接空間方向の成分を持たない）ことを意味する。

### 射影とサドル点系

計量 $G$ を導入すると、制約空間への「射影勾配」を定義できる。
これは次のサドル点線形系を解くことと等価である：

$$
\begin{bmatrix}
G(x) & (D C(x))^\top\\
D C(x) & 0
\end{bmatrix}
\begin{bmatrix}
v\\
\lambda
\end{bmatrix}
=
\begin{bmatrix}
-\nabla \mathcal F(x)\\
0
\end{bmatrix}
$$

ここで $v$ が求める更新ベクトルである。

### 6.3.3 統一方程式への統合：散逸の制限

第3章の統一方程式 $\dot x = (-K + J) d\mathcal F$ の視点で見ると、制約は作用素 $K$ および $J$ の像（range）を接空間 $T_x\mathcal M_C$ 内に制限することに相当する。

1. 射影された散逸: 
   制約を満たすように修正された散逸作用素を $K_{proj}$ とすると、これは「制約に直交する方向の動きを禁止（固有値 0）」した $K$ である。
2. 射影された保存:
   保存構造 $J$ も同様に、制約多様体の「外」へとはみ出す回転成分を削ぎ落とした $J_{proj}$ として再定義される。

このように、制約付き最適化は「自由な空間での降下」ではなく、幾何構造そのものが制約多様体に適合するように変形されたダイナミクスと解釈できる。

数値計算上は、制約付き問題をサドル点探索問題として扱うのが最も汎用的である。

### Example (primal-dual flow)

等式制約のみの場合、拡張ラグランジアン $\mathcal L(x,\lambda)$ に対して
$$
\dot x = -\operatorname{grad}_G^x \mathcal L,\qquad
\dot \lambda = +\operatorname{grad}_{G_\lambda}^\lambda \mathcal L
$$
という、原始変数は降下、双対変数は上昇させるダイナミクスが考えられる。

### Augmented Lagrangian

数値安定化のために拡張ラグランジアン法（Augmented Lagrangian）がよく用いられる：

$$
\mathcal L_\rho(x,\lambda)
=
\mathcal F(x) + \langle \lambda, C(x)\rangle + \frac{\rho}{2}\|C(x)\|^2
$$

これはサドル点の性質を保ちつつ、原始変数側を強凸化して解きやすくするテクニックである。

## 6.5 PDE 制約と随伴

PDE 制約 $\mathcal A(u,m)=0$ を持つ最適化問題は、無限次元空間における KKT 条件に他ならない。
ラグランジュ乗数 $p$ は随伴変数（Adjoint state）と呼ばれ、
$d_u \mathcal L = 0$ という条件が随伴方程式を与える。

## 6.6 Summary

- 制約はラグランジアンの停留点（KKT）として統一的に扱える。
- これは幾何学的にはサドル点問題であり、数値解法もサドル点ソルバ（Primal-Dual, Augmented Lagrangian）が基本となる。
- 実装においては、制約の線形化（$DC$）と、それを含むブロック行列（KKT行列）の処理が主要な課題となる。

実装の具体的な指針（ADによる一次変分の取得、線形作用としてのKKT行列処理、Krylovソルバとの接続）は[第8章](./chap08-implementation)を参照されたい。
