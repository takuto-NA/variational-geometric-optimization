---
title: "Chapter 3: General Equation"
---

## 3.1 基本方程式（完全形）

### Definition (objects)

- 状態: $x\in\mathcal M$（$\mathcal M$ はベクトル空間・多様体・関数空間でもよい）
- 汎関数: $\mathcal F:\mathcal M\to\mathbb R$
- 微分（共変な表現）: $d\mathcal F(x)\in T_x^*\mathcal M$

有限次元のユークリッド空間では $d\mathcal F$ を $\nabla\mathcal F$ と同一視できるが、
一般には **計量による同一視（Riesz 写像）** を介して「勾配」が定まる。

### Definition (pairing and adjointness)

以後、$\langle\cdot,\cdot\rangle$ は双対積（共ベクトルとベクトルの自然な組）を表す：
$\langle \alpha, v\rangle$（$\alpha\in T_x^*\mathcal M,\ v\in T_x\mathcal M$）。

このとき $K, J:T_x^*\mathcal M\to T_x\mathcal M$ に対し、

- **$K$ の対称性**: $\langle \alpha, K\beta\rangle = \langle \beta, K\alpha\rangle$
- **$K$ の半正定性**: $\langle \alpha, K\alpha\rangle \ge 0$
- **$J$ の反対称性（skew-adjoint）**: $\langle \alpha, J\beta\rangle = -\langle \beta, J\alpha\rangle$

を仮定として用いる（ユークリッド座標ではそれぞれ「対称行列」「PSD」「反対称行列」に対応する）。

関連用語は [Glossary](../glossary) も参照。

### Proposition (general form)

本書で扱う一般形は次である：

$$
\dot x
=
-\underbrace{K(x)\,d\mathcal F(x)}_{\text{散逸・最適化}}
\;+\;
\underbrace{J(x)\,d\mathcal F(x)}_{\text{保存・回転}}
$$

- $K(x):T_x^*\mathcal M\to T_x\mathcal M$: 対称（通常は半正定）な散逸写像
- $J(x):T_x^*\mathcal M\to T_x\mathcal M$: 反対称（より正確には skew-adjoint）な保存構造

有限次元ユークリッド空間では $d\mathcal F\simeq\nabla\mathcal F$ と同一視できる。
さらに $K=G^{-1}$（$G$ は SPD 行列）と書ける場合、上の式は

$$
\dot x
=
-G^{-1}(x)\,\nabla \mathcal F(x)
\;+\;
J(x)\,\nabla \mathcal F(x)
$$

と座標表示できる（本書ではこの座標表示も頻用するが、意味は座標自由形に還元される）。

### Proposition (energy dissipation)

$\mathcal F$ が $C^1$ 級で $x(t)$ が微分可能、かつ $K$ が（上の意味で）対称半正定、$J$ が反対称（skew-adjoint）であれば、解 $x(t)$ に沿って

$$
\frac{d}{dt}\mathcal F(x(t)) \le 0
$$

が成り立つ。

**Proof (one line)**:
連鎖律より
\(\frac{d}{dt}\mathcal F = \langle d\mathcal F,\dot x\rangle
= -\langle d\mathcal F,K\,d\mathcal F\rangle + \langle d\mathcal F,J\,d\mathcal F\rangle\)。
反対称性から \(\langle d\mathcal F,J\,d\mathcal F\rangle=0\)、半正定性から \(-\langle d\mathcal F,K\,d\mathcal F\rangle\le 0\)。
\(\square\)

この 1 行は、散逸項と保存項を加法分解して表す。
与えられた $\mathcal F$ に対し、散逸 $K$（あるいはそれを与える計量 $G$）と $J$ の選択が運動の性質（収束・回転）を規定する。

- 熱拡散（$J=0$）
- 自然勾配（$G$ を Fisher とみなす）
- Hamilton 系（$G=0$）
- 減衰振動（両方あり）

混合の「回りながら落ちる」最小モデルは [Chapter 4](./chap04-stationary-points) の 2D damped rotation を参照。

## 3.2 代表例（同じ形に落とす）

### 勾配流（gradient flow）

$J=0$ とすると

$$
\dot x = -K(x)\,d\mathcal F(x)
$$

有限次元ユークリッド空間で $K=G^{-1}$ と書けるなら、これは
$\dot x=-G^{-1}(x)\nabla\mathcal F(x)$ という前処理付き最急降下（自然勾配を含む）になる。
関数空間では $K$ が $L^2$ や $H^1$ の内積に対応する Riesz 写像の逆（あるいはその離散化）になり得る。

同じ汎関数から「停留条件（Poisson）」「勾配流（熱方程式型）」の両方が出る最小例は [Chapter 7](./chap07-cross-domain) を参照。

### Example (preconditioned / natural gradient)

有限次元で $G(x)$ を SPD 行列として選ぶと、更新方向は

$$
\dot x = -G^{-1}(x)\nabla\mathcal F(x)
$$

となり、これは「前処理付き最急降下」である。
確率分布多様体では $G$ を Fisher 情報計量とみなすと自然勾配（natural gradient）になる。

### Hamilton 系（conservative flow）

$G=0$ とすると

$$
\dot x = J(x)\,d\mathcal F(x)
$$

$J$ の反対称性により、典型的には $\mathcal F$ が保存量として振る舞う（時間発展が“回る”）。

### 混合（散逸＋保存）

両方を入れると

- 収束（散逸）
- 周期（保存）

が同時に現れ、減衰振動のような挙動になります。

物理・確率のモデルでは、散逸が一部の成分（例：運動量）にだけ作用するため、
$K$（あるいは $G^{-1}$）が **半正定**（退化あり）になることがある。
この場合でも上の散逸不等式は成立する（ただし “全成分が必ず減衰する” とは限らない）。

## 3.3 どこから来るか（対称・反対称分解）

### Proposition (operator decomposition)

（ユークリッド座標で）ある行列場 $A(x)$ により

$$
\dot x = A(x)\,\nabla\mathcal F(x)
$$

と書けるとする。このとき

$$
A = \underbrace{\frac{A+A^\mathsf T}{2}}_{\text{対称部}}
\;+\;
\underbrace{\frac{A-A^\mathsf T}{2}}_{\text{反対称部}}
$$

と一意に分解できる。
特に、対称部が $-K$（$K\succeq 0$）として書けるなら、式は

$$
\dot x = -K(x)\nabla\mathcal F(x) + J(x)\nabla\mathcal F(x)
$$

（ここではユークリッド座標で $d\mathcal F\simeq\nabla\mathcal F$ と同一視している。）

の形になり、$\mathcal F$ は Lyapunov 関数として単調減少する。

「同じ $\mathcal F$ なのに、なぜ系によって収束したり回転したりするか」は、
**エネルギー勾配 $\nabla\mathcal F$ に作用する演算子の対称部／反対称部**で説明できる。
この視点は、有限次元・無限次元の両方で共通である。

## 3.4 コメント（読み方：設計レシピ）

同じ $\mathcal F$ が与えられても、
どの $G$ と $J$ を選ぶかで「降下（散逸）」と「回転（保存）」の割合が変わる。

モデル（あるいはアルゴリズム）をこの枠に落とす最短手順は次である：

- **Functional**: まず $\mathcal F$（エネルギー／損失／自由エネルギー）を特定する
- **State space**: $x$ がどの空間に住むか（座標・制約・関数空間）を明確にする
- **Geometry**: $d\mathcal F$ をどの計量でベクトル化するか（$G$／Riesz 写像）を読む
- **Split**: 右辺を「散逸（対称）」＋「保存（反対称）」に分解する

次章では、この一般式の停留点 \(d\mathcal F(x^*)=0\) の近傍で何が起こるかを最小限の線形化で見る（ユークリッド座標では $\nabla\mathcal F(x^*)=0$）。

