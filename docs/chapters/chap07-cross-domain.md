---
title: "Chapter 7: Cross-domain Table"
---

## 7.1 分野ごとの位置づけ（統一表）

| 分野 | 空間（$x\in\mathcal M$） | 汎関数（$\mathcal F$） | 支配的な構造（$K/J$ と解法） |
| --- | --- | --- | --- |
| FEM | 変位場 $u$（関数空間） | ポテンシャル（エネルギー） | $J=0$（散逸）＋停留条件を Newton/Krylov で解く |
| 熱 | 温度場 $u$（関数空間） | Dirichlet エネルギー | 勾配流（$J=0$） |
| 波動 | 位相空間 $(q,p)$ | Hamiltonian / 作用 | Hamilton 流（$K=0$） |
| 制御 | 軌道 $x(\cdot)$, 入力 $u(\cdot)$ | 評価関数（積分コスト） | 制約（PDE/ODE）→ KKT/随伴（Chapter 6） |
| 推定 | 分布 $q$（確率多様体） | 自由エネルギー / KL | Fisher 計量（自然勾配） |
| 量子 | Hilbert 状態 $|\psi\rangle$ | 作用 / 期待値 | 複素構造（回転）＋制約（正規化） |
| 相対論 | 計量場 $g$ | Einstein–Hilbert 作用 | “幾何が変数”＋ゲージ（制約） |

## 7.2 読み方

### Remark

この表は「分野の差異を消去する」ためではなく、
同一の枠組みの下で差異を可視化するために置く。

- 同じ「汎関数」でも、空間が違えば変分の意味が変わる
- 同じ「停留点」でも、散逸なら収束し、保存なら回る
- 制約が入ればサドルが標準になる

応用例を追加するときは、まずこの表の列（空間・汎関数・構造）に対応づけ、
次に各分野固有の要素（離散化、境界条件、数値線形代数）を追加する。

## 7.3 “翻訳キー”：本書の記号を各分野に写す

### Definition (translation key)

本書の統一言語は Chapter 2–3 の 4 要素（空間・汎関数・幾何・流れ/条件）である。
特に、次の対応を頭に置くと分野間の往復が容易になる。

| 本書の記号 | 意味 | 代表的な読み替え |
| --- | --- | --- |
| $\mathcal M$ | 変数の空間 | ベクトル空間 / 関数空間 / 多様体 / 分布空間 |
| $x\in\mathcal M$ | 状態（未知） | FEM の場 $u$、制御の軌道 $x(t)$、推定の分布 $q$ |
| $\mathcal F:\mathcal M\to\mathbb R$ | スカラー汎関数 | エネルギー / 作用 / 損失 / 自由エネルギー |
| $d\mathcal F$ | 一次変分（微分） | Euler–Lagrange、随伴方程式の残差、スコア関数等 |
| $G$ | 計量（Riesz 写像） | $L^2/H^1$ 内積、質量行列、Hessian 近似、Fisher 情報 |
| $K$ | 散逸写像 | $G^{-1}$（ユークリッド座標）、前処理、自然勾配 |
| $J$ | 反対称構造 | シンプレクティック（Hamilton）、複素構造、Poisson |
| $C(x)=0$ | 制約 | 境界条件・正規化・PDE/ODE 制約・ゲージ条件 |

### Remark (one line that connects domains)

統一式（Chapter 3）は

$$
\dot x
=
-G^{-1}(x)\nabla\mathcal F(x) + J(x)\nabla\mathcal F(x)
-K(x)\,d\mathcal F(x) + J(x)\,d\mathcal F(x)
$$

であり、制約がある場合は Chapter 6 のラグランジアン $\mathcal L$ の停留条件（KKT）として扱う。
（有限次元ユークリッド座標では $d\mathcal F\simeq\nabla\mathcal F$、かつ $K=G^{-1}$ と書ける。）

## 7.4 ミニ例：同じ骨格がどう見えるか

### Example (Poisson / FEM の最小モデル)

領域 $\Omega$ で（境界条件込みで）次のエネルギーを考える：

$$
\mathcal F(u)=\int_\Omega \left(\frac12|\nabla u|^2 - f u\right)\,dx
$$

停留条件 $\nabla\mathcal F(u)=0$ は Poisson 方程式（弱形式）に対応し、
数値的には「離散化して線形方程式を解く」ことになる。
一方で、同じ $\mathcal F$ から $J=0$ の勾配流を取れば“熱方程式型”の緩和（収束）が得られる。

この対応は [Chapter 3](./chap03-general-equation) の「同じ $\mathcal F$ から流れ/条件が出る」という読み方の最小例になっている。

### Example (最適制御：制約が主役になる)

典型的には、軌道 $x(t)$ と入力 $u(t)$ に対し

$$
\min_{x(\cdot),u(\cdot)}\ \int_0^T \ell(x(t),u(t))\,dt + \phi(x(T))
\quad \text{s.t.}\quad \dot x = f(x,u)
$$

のように **動力学が制約**として入る。
このとき自然な統一言語は、Chapter 6 のように
制約を含む拡張汎関数（ラグランジアン）$\mathcal L$ の停留条件（KKT）である。
（随伴変数は「制約に対応する双対変数」として現れる。）

### Example (変分推論：Fisher 計量が “$G$” になる)

近似分布 $q$ を変数として、例えば

$$
\mathcal F(q)=\mathrm{KL}(q\|p)\quad (\text{同値に自由エネルギー})
$$

を最小化する（あるいは停留構造を求める）問題を考える。
ここで $G$ を Fisher 情報と見なすと、更新は自然勾配（natural gradient）として解釈される。
重要なのは、同じ一次変分でも **どの $G$ を選ぶかで “勾配” が変わる**点である（Chapter 2）。

### Example (Hamilton 力学：同じ $\mathcal F$ でも “回る”)

位相空間 $x=(q,p)$、$\mathcal F(x)=H(q,p)$（Hamiltonian）とし、
反対称構造 $J$ を標準シンプレクティック行列に取ると

$$
\dot x = J\nabla H(x)
$$

が得られる（保存系）。ここに散逸 $-G^{-1}\nabla H$ を足すと、減衰振動（散逸＋保存の混合）になる。

減衰振動の最小例は [Chapter 4](./chap04-stationary-points) の 2D damped rotation も参照。

## 7.5 応用ページへ落とすときの最短手順

### Remark (implementation-oriented checklist)

分野が違っても、実装でやることはほぼ同じである（Chapter 8 と接続）：

- **Functional**: スカラー汎関数 $\mathcal F$ を定義する（まず 1 つ）
- **Variations**: 一次（必要なら二次）変分を計算できる形にする（AD を含む）
- **Geometry**: $G,J$（および制約の扱い）を選ぶ
- **Discretization**: 変数空間 $\mathcal M$ の表現（メッシュ、基底、パラメタ化）を固定する
- **Algorithm**: 勾配流／Newton／Hamilton／KKT（サドル）として解く

