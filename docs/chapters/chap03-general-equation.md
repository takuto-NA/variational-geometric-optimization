---
title: "第3章　統一方程式"
---

> **この章で主に触るknob**: Geometry（散逸 $K$/計量、保存 $J$）＋ Algorithm（流れの型）

## 3.1 基本方程式（Coordinate-Free Formulation）

前章で定義した「一次変分（共ベクトル）」と「幾何構造（双対空間上の作用素）」を用いて、最適化と力学を統一する方程式を導く。

### 3.1.1 構成要素：双対空間上の作用素

- **状態**: $x \in \mathcal M$
- **駆動力**: $d\mathcal F(x) \in T_x^* \mathcal M$ （一次変分・共ベクトル）

ここで、共ベクトル $d\mathcal F$ を「速度ベクトル」$\dot x \in T_x \mathcal M$ に変換するために、双対空間から接空間への線形写像 $L: T_x^* \mathcal M \to T_x \mathcal M$ を考える。
任意の $L$ は、対称部分 $K$ と反対称部分 $J$ に分解できる（$\langle \alpha, L\beta \rangle = \langle \alpha, (-K+J)\beta \rangle$ の意味で）。

### Definition (Dissipation and Conservation Operators)

双対空間上の作用素として次を定義する：

1.  **散逸作用素 (Dissipation)** $K_x : T_x^* \mathcal M \to T_x \mathcal M$
    *   **Symmetry**: $\langle \alpha, K_x \beta \rangle = \langle \beta, K_x \alpha \rangle$
    *   **Positivity**: $\langle \alpha, K_x \alpha \rangle \ge 0$ （半正定値）
    *   典型例：計量の逆写像 $G^{-1}$（またはその一部）

> **Note: 用語の衝突（$K$）について**
> 本書で用いる **散逸作用素 $K$** は、双対空間（共ベクトル）から接空間（ベクトル）への写像である。一方で、有限要素法（FEM）などの分野では、剛性行列（Stiffness matrix）を慣習的に $K$ と書く。
> *   **VGOの $K$**: 共ベクトルを速度に変換する作用素（$T^* \to T$）。計量の逆（前処理）に相当。
> *   **FEMの $K$**: 変位を力に変換する作用素（$T \to T^*$）。二次変分（Hessian）$H$ に相当。
> したがって、$\dot x = -K d\mathcal F$ という式を見たときに、FEMの文脈が染み付いていると「剛性行列を掛けて平滑化している」と誤読するリスクがあるが、実際には **「剛性行列の逆（ソルバ）を掛けている」** のが正解である。

2.  **保存作用素 (Conservation)** $J_x : T_x^* \mathcal M \to T_x \mathcal M$
    *   **Skew-symmetry**: $\langle \alpha, J_x \beta \rangle = - \langle \beta, J_x \alpha \rangle$
    *   典型例：Poisson 構造、シンプレクティック構造の逆

### 3.1.2 統一方程式

これらを用いて、VGO の統一方程式を次のように定式化する：

$$
\dot x = -K_x(d\mathcal F(x)) + J_x(d\mathcal F(x))
$$

この式は「汎関数の傾き（$d\mathcal F$）」が、幾何構造（$K, J$）というレンズを通して「動き（$\dot x$）」に変換されるプロセスを表している。

*   第一項（$-K d\mathcal F$）はエネルギーを散逸させ、停留点へ向かわせる（最適化）。
*   第二項（$+J d\mathcal F$）はエネルギーを保存し、等高線上を動かす（力学）。

## 3.2 エネルギー散逸則

この形式の最大の利点は、エネルギー収支が代数的に確定することである。

### Proposition (Energy Dissipation)

$\mathcal F$ の時間変化率は次のように計算される：

$$
\begin{aligned}
\frac{d}{dt}\mathcal F(x(t)) 
&= \langle d\mathcal F(x), \dot x \rangle \quad (\text{Chain rule}) \\
&= \langle d\mathcal F, -K d\mathcal F + J d\mathcal F \rangle \\
&= -\underbrace{\langle d\mathcal F, K d\mathcal F \rangle}_{\ge 0} + \underbrace{\langle d\mathcal F, J d\mathcal F \rangle}_{0} \\
&\le 0
\end{aligned}
$$

*   $J$ の項は反対称性 $\langle \alpha, J \alpha \rangle = 0$ により消える（仕事・散逸をしない）。
*   $K$ の項のみがエネルギーを減少させる。

したがって、**収束させたいなら $K$ を設計し、振動/保存させたいなら $J$ を設計する** という指針が得られる。

## 3.3 座標表示と具体例

有限次元ユークリッド空間（$\mathcal M \simeq \mathbb R^n$, $T_x \mathcal M \simeq \mathbb R^n$）における行列表示と対応付ける。
ここでは $d\mathcal F$ を勾配ベクトル $\nabla \mathcal F$ と（標準内積で）同一視して表記する慣習に従う。

### 3.3.1 行列形式

$$
\dot x = (-K + J) \nabla \mathcal F(x)
$$

ここで $K, J$ は $n \times n$ 行列であり、$K$ は対称半正定値、$J$ は反対称行列である。

### 3.3.2 代表的な系

1.  **最急降下法 (Gradient Descent)**
    *   $K=I, J=0$
    *   $\dot x = -\nabla \mathcal F$

2.  **Newton 法 / 自然勾配法**
    *   $K=G(x)^{-1}$ ($G$ は Hessian や Fisher 行列), $J=0$
    *   $\dot x = -G^{-1} \nabla \mathcal F$
    *   これは「計量 $G$ に関する勾配流」に他ならない。

3.  **Hamilton 力学**
    *   $K=0, J = \begin{pmatrix} 0 & I \\ -I & 0 \end{pmatrix}$
    *   $\dot x = J \nabla \mathcal F$
    *   エネルギーは保存される（$\frac{d}{dt}\mathcal F = 0$）。

4.  **混合系（減衰振動）**
    *   $K \ne 0, J \ne 0$
    *   エネルギーを減らしながら回る。

## 3.4 まとめ

第2章の定義と合わせると、問題の記述は完全に以下の 3 つの選択に帰着された：

1.  **汎関数 $\mathcal F$**：何を減らしたいか/保存したいか。
2.  **散逸構造 $K$**：どの計量（Riesz 写像の逆）で降下するか。
3.  **保存構造 $J$**：どのような回転/振動を許容するか。

次章では、この方程式の停留点（$\dot x = 0$ となる点）近傍での挙動を解析する。
