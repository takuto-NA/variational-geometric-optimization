---
title: "Chapter 6: Constraints"
---

## 6.1 制約の型

制約は「許される変化方向を削る」ために現れる。形は様々だが、基本的には次の 4 つに整理できる。

### Definition (constraint types)

- **等式制約**：$C(x)=0$
- **不等式制約**：$g(x)\le 0$
- **集合制約**：$x\in\mathcal K$（例：非負制約、単体、箱型制約）
- **作用素（PDE）制約**：$\mathcal A(u,m)=0$（例：状態方程式、制御・推定のダイナミクス）

（補足）**ゲージ制約**は同値な表現の冗長性（自由度）を固定する等式制約として理解できる。
また **多様体制約**（例：$x\in S^{n-1}$）も局所的には等式制約 $C(x)=0$ として扱える。

## 6.2 拡張汎関数（KKT）

制約付き問題の中心は「極小化」ではなく、**拡張汎関数（ラグランジアン）の停留条件**である。

### Definition (primal problem)

$$
\min_{x\in\mathcal M}\ \mathcal F(x)
\quad\text{s.t.}\quad
C(x)=0,\ \ g(x)\le 0
$$

ここで $C:\mathcal M\to\mathbb R^{m}$、$g:\mathcal M\to\mathbb R^{p}$ とする（有限次元での表記）。

### Definition (Lagrangian)

$$
\mathcal L(x,\lambda,\mu)
=
\mathcal F(x) + \langle \lambda,\, C(x)\rangle + \langle \mu,\, g(x)\rangle
$$

### Proposition (KKT conditions)

制約正則性（constraint qualification）の下で、解候補 $(x^*,\lambda^*,\mu^*)$ は次を満たす：

$$
\begin{aligned}
&d_x \mathcal L(x^*,\lambda^*,\mu^*) = 0 \\
&C(x^*)=0 \\
&g(x^*)\le 0,\qquad \mu^*\ge 0 \\
&\mu^*_i\, g_i(x^*) = 0 \quad (i=1,\dots,p)
\end{aligned}
$$

（読み方の補足）$d_x\mathcal L=0$ は **一次条件（共ベクトルがゼロ）**であり、計量の選択に依らない。
有限次元の直感では
\(\nabla \mathcal F(x^*) + (D C(x^*))^\top \lambda^* + (D g(x^*))^\top \mu^* = 0\)
を表す。\n
また「制約正則性」の代表例は、等式制約では **LICQ**（$DC(x^*)$ の行独立性）、不等式制約を含む凸問題では **Slater 条件**などである。
KKT は一般に **サドル点問題**（原始変数は極小、双対変数は極大）を与える（関連用語は [Glossary](../glossary)）。

## 6.3 幾何的解釈（見取り図）

等式制約だけに注目すると、2 つの同値な見方がある。

- **制約多様体上での停留点**：$\mathcal M_C := \{x\mid C(x)=0\}$ 上での停留（許される方向で一次変分が 0）
- **拡張空間上での停留点**：$(x,\lambda)$ に対する $\mathcal L(x,\lambda)$ の停留（KKT）

後者は「数値的に解くための形」、前者は「幾何的に何が起きているかの形」である。

### Definition (tangent space; finite-dimensional intuition)

等式制約 $C(x)=0$ に対し、微分（ヤコビアン）を $D C(x)$ と書くと、
制約多様体の接空間は（直感的に）

$$
T_x\mathcal M_C = \{\xi \mid D C(x)\,\xi = 0\}
$$

で与えられる。

### Example (sphere constraint)

単位球面 $S^{n-1}$ は $C(x)=\|x\|^2-1=0$ で表せる。このとき

$$
D C(x)\,\xi = 2x^\top \xi = 0
$$

より、接空間は「$x$ と直交する方向」である。

### Proposition (projection form via saddle system)

ユークリッド空間での最も単純な形として、「制約に沿う勾配（射影勾配）」は次のサドル点系で得られる：

$$
\begin{bmatrix}
I & (D C(x))^\top\\
D C(x) & 0
\end{bmatrix}
\begin{bmatrix}
v\\
\lambda
\end{bmatrix}
=
\begin{bmatrix}
\nabla \mathcal F(x)\\
0
\end{bmatrix}
$$

このとき $v$ が接空間方向の降下ベクトル（制約に整合する更新方向）である。

（補足）一般の計量 $G$ の下では、上の $I$ が $G$ に置き換わる（射影が「$G$-直交」になる）。
この「射影 = サドル点系を 1 回解く」という関係は、制約付き最適化と KKT サドル点構造の結びつきを最短で示す。

## 6.4 （最小）数値的視点：サドル点として解く

制約付き問題は「極小化」としてよりも、
ラグランジアンの停留条件（KKT）として扱う方が自然である。
したがって、数値計算上は **サドル点を解く問題**として定式化して扱う。

### Example (primal-dual flow; equality constraints)

等式制約だけなら、最小の反復モデルとして次がある：

$$
\dot x = -\mathrm{grad}_G \mathcal L_{\mathrm{eq}}(x,\lambda),\qquad
\dot \lambda = +C(x)
$$

これは「原始は降下・双対は上昇」というサドル点ダイナミクスである。

ここで

$$
\mathcal L_{\mathrm{eq}}(x,\lambda):=\mathcal F(x)+\langle \lambda, C(x)\rangle
$$

とした（不等式を含む場合は $\mu\ge 0$ の扱いが必要になる）。

不等式制約は $\mu\ge 0$ を保つ必要があるため、

- **射影付き上昇**：$\mu \leftarrow \Pi_{\mathbb R_+^p}\bigl(\mu + \alpha\, g(x)\bigr)$
- **バリア法**：$\mathcal F(x) - \tau \sum_i \log(-g_i(x))$

など、非負性を壊さない更新が基本になる。

### Definition (augmented Lagrangian; equality)

等式制約に対しては、数値安定化のために次の拡張がよく用いられる：

$$
\mathcal L_\rho(x,\lambda)
=
\mathcal F(x) + \langle \lambda, C(x)\rangle + \frac{\rho}{2}\|C(x)\|^2
$$

（補足）拡張ラグランジアンは「ペナルティの硬さ」と「双対更新」を両立させ、単純ペナルティの条件数悪化を緩和する。
実装では、ここで現れるサドル点線形系と線形ソルバ選択（前処理）が実効性能を支配することが多い（Chapter 8）。

## 6.5 PDE 制約と随伴（接続点だけ）

状態 $u$ と設計（制御）$m$ に対し、PDE/力学制約 $\mathcal A(u,m)=0$ の下で

$$
\min_{u,m}\ \mathcal F(u,m)\quad\text{s.t.}\quad \mathcal A(u,m)=0
$$

を考えると、ラグランジアンは（随伴変数 $p$ を用いて）

$$
\mathcal L(u,m,p) = \mathcal F(u,m) + \langle p,\mathcal A(u,m)\rangle
$$

となる。ここで $\langle\cdot,\cdot\rangle$ は関数空間の双対積であり、有限次元の内積と同じ役割を果たす。

数値的には「$u$ を消去して $m$ のみを更新したい」ことが多いが、
$\nabla_m \mathcal F(u(m),m)$ を直接計算すると高コストになる。
随伴 $p$ はこの計算を 1 回の随伴方程式で置き換えるための双対変数であり、
Chapter 6 の KKT を関数空間に拡張したものに他ならない。

## 6.6 Summary

- 制約は「許される方向（接空間）」を定め、停留条件を **射影**として読むことも、**KKT** として読むこともできる。
- 不等式制約は相補性（$\mu_i g_i=0$）を持ち、非負性を保つ更新（射影・バリア等）が本質になる。
- PDE 制約は随伴（双対）変数を導入した KKT として自然に理解でき、応用編（制御・FEM）へ直接つながる。

（将来の応用編では、最適制御・PDE 制約・随伴法がここに接続する。）

