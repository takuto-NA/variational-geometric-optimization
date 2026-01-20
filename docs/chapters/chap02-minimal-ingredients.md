---
title: "Chapter 2: Minimal Ingredients"
---

## 2.1 最小構成要素（抽象骨格）

この枠組みは、次の 4 点（Space / Functional / Geometry / Flow）で定義される。
Chapter 3 の統一式は、この 4 点を 1 行に畳み込んだものである。

### 2.1.1 空間

- 有限次元多様体
- 無限次元関数空間（FEM, PDE）
- Lie 群・確率分布多様体
- 制約付き多様体

### 2.1.2 汎関数

$$
\mathcal F : \mathcal M \to \mathbb R
$$

例：

- エネルギー
- 作用
- 損失関数
- 自由エネルギー
- 尤度（負対数）

### Remark

汎関数はスカラー値を返すが、対象 $\mathcal M$ は有限次元ベクトル空間に限らず、
多様体や関数空間である場合が多い。
この場合、微分は変分（一次・二次）として自然に定式化される。

### 2.1.3 幾何構造

#### 計量（対称）

- $L^2$, $H^1$
- Hessian
- Fisher 情報

### Remark (metric and gradient)

計量は勾配の定義を規定する。
同じ一次変分（線形汎関数）から **どのベクトルを勾配と対応づけるか**は計量に依存する。
この対応は Riesz 表現（Riesz 写像）として理解できる。

#### 反対称構造（回転）

- シンプレクティック構造
- 複素構造（虚数）

### Remark (antisymmetric structure)

反対称構造は保存的な回転成分を与える。
代表例はシンプレクティック構造（Poisson 構造）であり、Hamilton 系の基盤をなす。

### 2.1.4 数値的流れ／条件

- 勾配流
- Newton 型条件
- Hamilton 流
- 混合流

### Remark

この 4 つは、同じ $\mathcal F$ を与えたときに、
選択した幾何（計量・反対称構造）に応じて異なる時間発展を得る分類である。
以降の章では、この分類が統一式の中でどのように現れるかを述べる。

## 2.2 一次変分（differential / first variation）

### Definition (first variation)

$x\in\mathcal M$ と方向（接ベクトル）$\eta\in T_x\mathcal M$ に対し、一次変分（微分）を

$$
\delta \mathcal F(x)[\eta]
:=
\left.\frac{d}{d\epsilon}\right|_{\epsilon=0}\mathcal F\bigl(\mathrm{Exp}_x(\epsilon \eta)\bigr)
$$

と書く（$\mathrm{Exp}_x$ は多様体の指数写像。$\mathcal M=\mathbb R^n$ なら $\mathrm{Exp}_x(\epsilon\eta)=x+\epsilon\eta$）。

### Remark (covector)

$\delta \mathcal F(x)[\cdot]$ は **方向に線形**な写像であり、幾何学的には
$T_x\mathcal M$ 上の線形汎関数、すなわち **共ベクトル（1-form）**である。
ユークリッド空間では内積により共ベクトルとベクトルを同一視できるため、普段の「勾配 $\nabla f$」と区別が曖昧になりやすい。

## 2.3 計量と勾配（Riesz 表現）

### Definition (metric)

各点 $x$ で接空間に内積 $G_x(\cdot,\cdot)$ を与えるものを（本書では）計量 $G$ と呼ぶ。
有限次元では行列 $G(x)$ として表現でき、関数空間では（典型的に）線形演算子として現れる。

### Definition (gradient induced by a metric)

計量 $G$ によって定まる勾配 $\operatorname{grad}_G\mathcal F(x)\in T_x\mathcal M$ を

$$
G_x\bigl(\operatorname{grad}_G\mathcal F(x),\,\eta\bigr)
=
\delta \mathcal F(x)[\eta]
\quad(\forall \eta\in T_x\mathcal M)
$$

で定義する（Riesz 表現）。

### Proposition (coordinate form)

局所座標で $\delta\mathcal F(x)[\eta]=\nabla\mathcal F(x)^\top \eta$ と表せる状況では、

$$
\operatorname{grad}_G\mathcal F(x)=G(x)^{-1}\nabla \mathcal F(x)
$$

が成り立つ（$\nabla \mathcal F(x)$ は「微分（共ベクトル）」を座標で表したもの、という立場）。

### Example (Euclidean / natural gradient)

- $G(x)=I$ なら $\operatorname{grad}_G\mathcal F=\nabla\mathcal F$（最急降下）
- $G(x)$ を Fisher 情報とすると $\operatorname{grad}_G$ は自然勾配（natural gradient）になる

### Example (function space: $L^2$ vs $H^1$)

関数 $u$ に対する汎関数 $\mathcal F(u)$ を考える。一次変分が

$$
\delta\mathcal F(u)[v] = \int_\Omega r(u)\,v\,dx
$$

と書けるとき、$L^2$ 計量では $\operatorname{grad}_{L^2}\mathcal F(u)=r(u)$ である。
一方 $H^1$ 計量（例えば $G_u(w,v)=\int_\Omega (\nabla w\cdot\nabla v + wv)\,dx$）を用いると、
勾配は「楕円型方程式（Poisson 型）の解」として与えられる。実装上は **質量行列/剛性行列で平滑化された勾配**になる。

## 2.4 二次変分と Hessian（Newton に必要な最小）

### Definition (second variation)

二次変分は一次変分（= 微分）の線形化として

$$
\delta^2\mathcal F(x)[\xi,\eta]
:=
\left\langle D(d\mathcal F)(x)[\xi],\,\eta\right\rangle
\qquad(\xi,\eta\in T_x\mathcal M)
$$

と捉えるのが自然である（$D(d\mathcal F)(x)[\xi]\in T_x^*\mathcal M$ は共ベクトル）。
有限次元ユークリッド空間では $D(d\mathcal F)(x)$ は Hessian $\nabla^2\mathcal F(x)$ に対応し、
$\delta^2\mathcal F(x)[\xi,\eta]=\xi^\top \nabla^2\mathcal F(x)\,\eta$ と書ける。

### Proposition (Hessian operator induced by $G$)

$G$ が与える同一視により、二次変分を線形演算子 $H_x:T_x\mathcal M\to T_x\mathcal M$ で表して

$$
\delta^2\mathcal F(x)[\xi,\eta] = G_x(H_x\xi,\eta)
$$

と書ける（有限次元なら $H_x$ は Hessian 行列に対応する）。

### Remark (indefinite Hessian)

停留点は極小点に限らないため、$H_x$ は一般に不定（indefinite）であり得る。
その場合 Newton 更新は下降方向にならず、安定化（ダンピング、信頼領域、正則化）が必要になる。

## 2.5 「流れ」と「条件」：何を解けばよいか

### Definition (gradient flow)

$J=0$ として

$$
\dot x = -\operatorname{grad}_G\mathcal F(x)
$$

を勾配流と呼ぶ（Chapter 3 の散逸項）。
有限次元ユークリッド空間で座標表示すると $\dot x=-G(x)^{-1}\nabla\mathcal F(x)$ となる。

### Definition (stationary condition)

停留条件は

$$
d\mathcal F(x^*) = 0
$$

である（Chapter 4）。有限次元ユークリッド空間では $d\mathcal F\simeq\nabla\mathcal F$ と同一視できるため、これは $\nabla\mathcal F(x^*)=0$ と書ける。
これは「流れが止まる点」であり、$K,J$（したがって $G$）の選択に依らない。

### Remark (what you must implement)

どの分野でも、最小限に必要なのは次である：

- **一次変分**（または $\nabla\mathcal F$ の計算）
- **$G^{-1}$ の適用**（行列の逆行列を作るのではなく、線形系を解く/前処理を設計することが多い）
- Newton をやるなら **二次変分（線形化）**または Hessian-vector 積

## 2.6 離散化：連続と実装をつなぐ

### Remark (metric becomes a matrix)

関数空間を離散化すると、計量は典型的に

- $L^2$ 計量 $\to$ 質量行列 $M$
- $H^1$ 計量 $\to$ 反応拡散型（質量＋剛性）$M+K$

のように行列化される。したがって「勾配の計算」は
**ベクトル（共ベクトル）$\nabla\mathcal F$ を作る**ことと、
**$M^{-1}$（または $(M+K)^{-1}$）を適用する**ことに分解される。

### Example (FEM template)

FEM による離散化では、一次変分から右辺ベクトル $g$（組み立て）を作り、

$$
M\,\dot x = -g
$$

のような形で時間発展を得る（これが「$G$ を入れた勾配流」の典型的な実装形）。

## 2.7 制約付き：最小の追加要素（KKT への入口）

### Definition (equality constraint and Lagrangian)

制約 $C(x)=0$ を入れるとき、ラグランジアンを

$$
\mathcal L(x,\lambda) := \mathcal F(x) + \langle \lambda,\,C(x)\rangle
$$

とおく（$\lambda$ はラグランジュ乗数）。

### Proposition (KKT stationarity: minimal form)

等式制約の最小形は

$$
d_x\mathcal L(x^*,\lambda^*)=0,\qquad C(x^*)=0
$$

である。有限次元では（ユークリッド座標で）$d_x\mathcal L=0$ は
$\nabla \mathcal F(x^*) + (DC(x^*))^\top \lambda^* = 0$ を意味する。
実装上は、$C$ の評価とヤコビアン（線形化）$DC(x)$ が追加で必要になる。

### Remark (saddle points)

制約を入れた停留点は一般にサドルであり、単純な「下降」だけでは扱えない。
以降（Chapter 6）では、この点を停留構造として統一的に扱う。

## 2.8 実装チェックリスト（最小）

この枠組みを「コードに落とす」ために必要な要素を、最小限の観点で並べる。

- **State**: $x$ の表現（座標/関数値/分布パラメータ）と境界条件
- **Functional**: $\mathcal F(x)$ の評価（単体テストしやすい形）
- **First variation**: $\nabla\mathcal F(x)$ または $\delta\mathcal F(x)[\cdot]$
- **Metric**: $G(x)$ と $G(x)^{-1}$ の適用（線形ソルバ・前処理）
- **(Optional) Structure**: $J(x)$ の適用（反対称性が壊れない実装）
- **(Optional) Second variation**: Hessian / Hessian-vector 積（Newton, 安定化）
- **Stopping**: $\|\nabla\mathcal F(x)\|_{G^{-1}}$ や残差など、空間に適した停止規準

### Remark (common failure modes)

- 「$\nabla\mathcal F$ と $\operatorname{grad}_G\mathcal F$ の取り違え」により収束性が崩れる
- $G$ の逆適用が不安定（境界条件、特異行列、スケーリング）で発散する
- Hessian が不定で Newton が暴れる（ダンピング等が必要）

## 2.9 Summary

本章の要点は次である：

- まず **$\mathcal M$ と $\mathcal F$** を定め、一次変分 $\delta\mathcal F$ を計算する
- **計量 $G$** によって「勾配（ベクトル）」が定まり、実装では $G^{-1}$ の適用が要となる
- Newton には **二次変分（線形化）**が必要で、停留点の不定性が本質的に現れる
- 離散化すると $G$ は行列（質量/剛性）になり、連続の議論がそのまま実装形に落ちる

次章では、これらを 1 行にまとめた統一方程式を提示する。
