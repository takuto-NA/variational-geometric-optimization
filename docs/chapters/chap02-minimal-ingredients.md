---

title: "第2章 停留構造（一次・二次変分）"
---

> この章で主に触るknob: Geometry（一次/二次変分とRiesz同一視）＋ Space（多様体/関数空間でも破綻しない定義）

> 本章の責務: 本書で「停留構造」とは、一次変分（停留条件 $d\mathcal F=0$ を定める）と二次変分（停留点近傍の局所形状 $H = \nabla^2\mathcal F$ を定める）の組を指す。本章はこれらの定義の唯一の置き場であり、以降の章は参照で回す。

## 2.1 停留構造を定める最小データ（抽象骨格）

### Remark（停留と収束は別物）

- **停留（stationarity）**: 点の性質であり、停留点は \(d\mathcal F(x^*)=0\) で定まる。  
- **収束（convergence）**: アルゴリズム／力学の性質であり、反復 \(x_k\to x^*\) や \(\|d\mathcal F(x_k)\|\to 0\) のような現象を指す。  

同じ \(\mathcal F\) を持っていても、選ぶダイナミクス（第3章の \(\dot x = (-K+J)d\mathcal F\)）によって「停留点へ落ちる（散逸）」にも「停留点の周りを回るだけ（保存）」にもなり得る。混乱を避けるため、本書ではまず停留点を定義し、収束は後続章で \(K,J\) と結びつけて扱う。

停留構造の定義は、第1章で導入した4箱（knobs）のうち、特に次の2つに依存する：

| knob | 本章での役割 |
|------|-------------|
| Space | 状態 $x$ が住む空間 $\mathcal M$ と接空間 $T_x\mathcal M$ の構造 |
| Geometry | 計量 $G$（Riesz 同一視）、反対称構造 $J$ の選択 |

### Remark（接空間とは何か）

接空間 \(T_x\mathcal M\) は、点 \(x\) における「許される微小変化方向（速度）」の線形空間である。  
例として、\(\mathcal M=\mathbb R^n\) なら \(T_x\mathbb R^n\cong \mathbb R^n\) で、いつもの“方向ベクトル”と同じである。関数空間なら「微小摂動 \(\eta\)（関数）」が方向になる。

残りの2つ（Discretization, Algorithm）は、定義そのものには入らず、後続の章で扱う。

> Remark（停留条件は「非線形作用素方程式」として読める）
> 停留条件 $d\mathcal F(x)=0$ は、「未知 $x$ に対して残差（共ベクトル）を 0 にする」という意味で、一般化された非線形作用素方程式 $A(x)=0$ とみなせる。
> 線形空間（Banach/Hilbert）の文脈での直感と、「何が明確になるか」は [付録C](./appC-functional-analysis-minimum) の C.10 を参照。

### 2.1.1 問題の入力：汎関数

$$
\mathcal F : \mathcal M \to \mathbb R
$$

（用語: [Glossary](../glossary)）

これが「何を停留させたいか」を決める。例：
- エネルギー / 作用
- 損失関数 / 尤度（負対数）
- 自由エネルギー

汎関数はスカラー値を返すが、対象 \(\mathcal M\) は有限次元ベクトル空間に限らない。  
もちろん \(\mathcal M=\mathbb R^n\) の最適化も重要だが、連続体や確率分布などでは、\(\mathcal M\) が多様体や関数空間（有限次元多様体、無限次元関数空間、Lie 群、確率分布多様体など）として自然に与えられることがある。さらに \(\mathcal M=\mathbb R^n\) に見える実装でも、その背後に離散化（基底選択）が潜む場合（FEM/NN など）があるため、本書では「空間の選択」を明示して整理する。

### 2.1.2 幾何構造（選択）

#### 計量（対称）：Riesz 写像
- $L^2$, $H^1$ 内積
- Hessian（正定値とみなす場合）
- Fisher 情報

計量 $G$ は、一次変分（共ベクトル）をどのベクトル（勾配）と対応づけるかを規定する（Riesz 写像）。
実装上は、対称正定値（SPD）の行列／作用素として現れ、「（質量行列などを用いて）一次変分を補正して更新方向に変換する」操作になる（例：\(v = G^{-1}g\)、あるいは \(Gv=g\) を解く）。  
ここでの「計量（metric）」は“重さ”の意味ではなく、**内積を与えて同一視（ベクトル \(\leftrightarrow\) 共ベクトル）を決める構造**である（用語: [Glossary](../glossary)）。

#### 反対称構造（回転）
- シンプレクティック構造
- 複素構造（虚数）

「反対称（antisymmetric）」とは、行列表現で \(J^\top=-J\) を満たす（より一般には \(\langle u,Jv\rangle = -\langle Ju,v\rangle\) となる）ことを指す。対称（symmetric）は \(A^\top=A\) であり、これと対比して覚えると良い。  
反対称構造 $J$ は保存的な回転成分を与える。第3章では、$K$（散逸）と $J$（保存）を統一方程式に組み込む。

## 2.2 一次変分（Definition: Coordinate-Free）

座標に依存しない「微分」の定義を与える。

### Definition (First Variation / Differential)

点 $x\in\mathcal M$ と方向（接ベクトル）$\eta\in T_x\mathcal M$ に対し、一次変分 $d\mathcal F(x)$ を次で定義する：

$$
d\mathcal F(x)[\eta]
:=
\left.\frac{d}{d\epsilon}\right|_{\epsilon=0}\mathcal F\bigl(\gamma(\epsilon)\bigr)
$$

ここで $\gamma(0)=x, \dot\gamma(0)=\eta$ である（例：$\gamma(\epsilon)=\mathrm{Exp}_x(\epsilon \eta)$）。

この $d\mathcal F(x)$ は方向に線形な写像であり、幾何学的には
$T_x\mathcal M$ 上の線形汎関数、すなわち共ベクトル（1-form）である。
共ベクトル空間を $T_x^*\mathcal M$ と書くとき、$d\mathcal F(x) \in T_x^*\mathcal M$ である。

> Note: 「共ベクトル（covector）」は、方向（ベクトル）\(\eta\) を入れると実数が返る線形写像である（用語: [Glossary](../glossary)）。

> Note: ここまでは「内積」も「勾配ベクトル」も登場していない。あるのは「方向 $\eta$ に進むと値がどう変わるか」という線形近似だけである。

> Remark（共ベクトル／双対の最小補足）
> $d\mathcal F(x)$ は「方向 $\eta$ を入れると実数が返る線形写像」であり、$T_x\mathcal M$ の双対空間 $T_x^*\mathcal M$ の元（共ベクトル）である。
> 直感と最小限の関数解析（双対・ペアリング）は [付録C](./appC-functional-analysis-minimum) の C.2 を参照。

### Example (Coordinate Representation)

有限次元ユークリッド空間 $\mathcal M=\mathbb R^n$ で座標 $x=(x^1,\dots,x^n)$ を取るとき、任意の方向 $\eta$ に対して
$d\mathcal F(x)[\eta] = \sum_i \frac{\partial \mathcal F}{\partial x^i}\eta^i$
と書ける。慣習的にこの係数ベクトルを $\nabla \mathcal F$ と書くが、本質的にはこれは共ベクトルの成分表示である。

## 2.3 計量と勾配（Translation Layer）

「微分（共ベクトル）」を「更新方向（ベクトル）」に変換するための装置が計量である。
これを翻訳（Translation）と捉えることが重要である。

### Definition (Riemannian Metric / Riesz Map)

計量 $G$ とは、各点 $x$ において接空間 $T_x\mathcal M$ に内積 $G_x(\cdot, \cdot)$ を与えるものである。
これは自然に、接ベクトルから共ベクトルへの線形同型写像（flat map / Riesz map）を誘導する：

$$
\flat_G : T_x\mathcal M \to T_x^*\mathcal M, \quad v \mapsto G_x(v, \cdot)
$$

> Remark（「Riemannian」と「Hilbert」の関係）
> - 多様体に点ごとの内積 $G_x$ を入れるとリーマン多様体になる（統計多様体では Fisher 計量が典型例）。
> - $\mathcal M$ が線形で、しかも Hilbert 空間（内積＋完備）なら、Riesz 表現により $T_x\mathcal M \simeq T_x^*\mathcal M$ を自然に同一視でき、$d\mathcal F$ を “勾配（ベクトル）” に翻訳できる。
> 直感の補足は [付録C](./appC-functional-analysis-minimum) の C.1 と C.6 を参照。

### Definition (Gradient)

計量 $G$ に関する勾配 $\operatorname{grad}_G\mathcal F(x) \in T_x\mathcal M$ とは、一次変分 $d\mathcal F(x)$ に対応するベクトル、すなわち Riesz 写像の逆像である：

$$
\operatorname{grad}_G\mathcal F(x) := \flat_G^{-1}\bigl( d\mathcal F(x) \bigr)
$$

定義より、任意の方向 $\eta$ に対して次が成り立つ：

$$
G_x\bigl(\operatorname{grad}_G\mathcal F(x),\,\eta\bigr) = d\mathcal F(x)[\eta]
$$

### Proposition (Matrix Form in Implementation)

有限次元座標系において、計量が正定値行列 $G(x)$ で表されるとする。
一次変分の成分ベクトルを $g = \nabla \mathcal F(x)$（列ベクトル）とすると、勾配ベクトル $v = \operatorname{grad}_G\mathcal F(x)$ は線形方程式

$$
G(x)\,v = g
$$

の解、すなわち $v = G(x)^{-1}g$ である。
「勾配を求める」とは、計量行列による線形方程式を解くことに他ならない。

### 2.3.4 Bridge: 抽象計量から質量行列へ（Discretization）

関数空間などの無限次元空間を扱う場合、計量 $G$ がどのように行列 $M$（質量行列）として現れるかを整理する。

1. 抽象レベル: 接空間 $T_x\mathcal M$ 上の内積 $G(\xi, \eta)$ が定義されている。
2. 離散化（基底選択）: 空間を有限個の基底関数 $\{\phi_i\}_{i=1}^n$ で張られる部分空間で近似する。
   $$v(x) \approx \sum_i v_i \phi_i(x)$$
3. 行列の出現: 基底どうしの内積を並べたものが行列 $M$（質量行列）となる。
   $$M_{ij} = G(\phi_i, \phi_j)$$

このとき、抽象的な Riesz 写像 $\flat_G(v) = g$ は、係数ベクトルに対して行列演算 $\mathbf{Mv} = \mathbf{g}$ となり、実装上は `v = solve(M, g)` という「前処理」の形を取る。
「どの計量（内積）を選ぶか」という幾何的選択は、実装上「どの行列で一次変分を補正するか」という選択に直結する。

- Euclidean: $G=I$ なら $v=g$。
- Function Space ($L^2$): $G$ が質量行列 $M$ に対応し、$v = M^{-1}g$。
- Natural Gradient: $G$ が Fisher 情報行列 $F$ に対応し、$v = F^{-1}g$。

## 2.4 二次変分（Connection & Linearization）

Newton 法などを考えるには、一次変分 $d\mathcal F$ の「変化率」が必要になる。

### Definition (Second Variation / Hessian)

一般の多様体で二階微分を定義するには「接続（平行移動の規則）」が必要だが、
最適化の文脈では通常、アフィン接続（または平坦な座標系）を固定して考えることが多い。
本書では実装可能性を優先し、必要な範囲では平坦な座標系／自然な接続が固定できる状況を主に扱う（詳細は参照文献に譲る）。
接続を固定したとき、二次変分（Hessian 作用素） $H := \nabla^2 \mathcal F(x)$ は $(0,2)$ テンソル（双線形形式）として定義される：

$$
H[\xi, \eta] := \left. \frac{d}{d\epsilon} \right|_{\epsilon=0} d\mathcal F(\gamma(\epsilon))[\tilde\eta(\epsilon)]
$$

ここで $\gamma$ は $\xi$ 方向の測地線、$\tilde\eta$ は $\eta$ の平行移動である。

ユークリッド空間や線形空間（関数空間）では、通常の二階微分として素直に定義できる：

$$
H[\xi, \eta] = \xi^\top H \eta
$$

（右辺の $H$ は行列表現）

> Note（記号の統一）: 本書では二次変分の作用素を一貫して $H$ と書く。これは有限次元での Hessian 行列 $\nabla^2\mathcal F$ に対応し、第4章以降でも同一記号を用いる。

### Linear Operator Representation

実装上、$H$ は行列そのものよりも、ベクトル $\xi$ を受け取って共ベクトル（あるいは計量同一視後のベクトル）を返す線形作用として扱うのが基本である。

$$
H : \xi \mapsto H\xi \quad (\text{Hessian-vector product})
$$

## 2.5 Summary: 構造の階層

| 階層 | 数学的対象 | 実装上の表現 |
| --- | --- | --- |
| Level 0 | 汎関数 $\mathcal F$ | `loss(x)` (scalar) |
| Level 1 | 一次変分 $d\mathcal F$ (Covector) | `g = grad(loss)(x)` (vector like) |
| Level 1' | 二次変分 $H = \nabla^2\mathcal F$ (Hessian) | `hvp(loss, x, v)` (Hessian-vector product) |
| Level 2 | 計量 $G$ (Riesz Map) | `M` (Mass matrix) or Preconditioner |
| Level 3 | 勾配 $\operatorname{grad}_G \mathcal F$ (Vector) | `v = solve(M, g)` |

次章の統一方程式は、この Level 1 (Covector) と Level 3 (Vector) の関係を動的な方程式として記述するものである。第4章では $H$ を用いて停留点近傍の局所挙動を解析する。
