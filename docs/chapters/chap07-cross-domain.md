---
title: "第7章 分野横断表"
---

> この章で主に触るknob: Space/Discretization/Geometry/Algorithm を「翻訳キー」として並べ、分野差を見える化する

本書の “optimization” は極小化ではなく停留構造の数値的取り扱いを指す（保存系（$J$）も射程に含む；[序文 0.4](./chap00-preface#0-4-optimization-という言葉について)）。

## 7.1 分野ごとの位置づけ（統一表）

| 分野 | 空間（$x\in\mathcal M$） | 汎関数（$\mathcal F$） | 支配的な構造（$K/J$ と解法） |
| --- | --- | --- | --- |
| FEM | 変位場 $u$（関数空間） | ポテンシャル（エネルギー） | $J=0$（散逸）＋停留条件を Newton/Krylov で解く |
| 熱 | 温度場 $u$（関数空間） | Dirichlet エネルギー | 勾配流（$J=0$, $K \approx \Delta^{-1}$ etc.） |
| 波動 | 位相空間 $(q,p)$ | Hamiltonian / 作用 | Hamilton 流（$K=0$） |
| 制御 | 軌道 $x(\cdot)$, 入力 $u(\cdot)$ | 評価関数（積分コスト） | 制約（PDE/ODE）→ KKT/随伴（第6章） |
| 推定 | 分布 $q$（確率多様体） | 自由エネルギー / KL | Fisher 計量（自然勾配 $K=G_{\text{Fisher}}^{-1}$） |
| 量子 | Hilbert 状態 $|\psi\rangle$ | 作用 / 期待値 | 複素構造（回転）＋制約（正規化） |
| 相対論 | 計量場 $g$ | Einstein–Hilbert 作用 | “幾何が変数”＋ゲージ（制約） |

> Remark（空間の型の注意）
> この表の「空間」は一律に線形空間（Hilbert）だと仮定していない。
> たとえば「推定」の分布 $q$ は一般に足し算・スカラー倍で閉じず、自然な主語は「統計多様体」である（Geometry knob として Fisher 計量を選ぶと自然勾配が出る）。
> 背景は第2章と [付録C](./appC-functional-analysis-minimum) を参照。

## 7.2 読み方

この表は「分野の差異を消去する」ためではなく、同一の枠組みの下で差異を可視化するために置く（見取り図）。

- 同じ「汎関数」でも、空間が違えば変分の意味が変わる
- 同じ「停留点」でも、散逸なら収束し、保存なら回る
- 制約が入ればサドルが標準になる

### 7.2.1 境界例：非滑らか最適化（prox/subgradient）はこの地図の外側

本書の Part I は主に「一次変分 $d\mathcal F$ と二次変分 $H$ に基づく」滑らかな停留構造を扱う。
一方で、$L^1$ 正則化などの非滑らか項が本質になる場合、勾配・Hessian の議論はそのままでは走らず、subgradient や prox（近接写像）を基本部品として導入する必要がある。
ここは「同じ地図に無理に乗せない」代表的な境界である。

## 7.3 “翻訳キー”：本書の記号を各分野に写す

### Definition (translation key)

本書の統一言語は[第1章](./chap01-core-definition)で定義した 4 つの設計自由度（knobs）である：Space / Discretization / Geometry / Algorithm。
以下の表で、各knobが分野ごとにどう読み替わるかを示す。

| knob | 本書の記号 | 意味 | 代表的な読み替え |
| --- | --- | --- | --- |
| Space | $\mathcal M$ | 変数の空間 | ベクトル空間 / 関数空間 / 多様体 / 分布空間 |
| | $x\in\mathcal M$ | 状態（未知） | FEM の場 $u$、制御の軌道 $x(t)$、推定の分布 $q$ |
| | $\mathcal F:\mathcal M\to\mathbb R$ | スカラー汎関数 | エネルギー / 作用 / 損失 / 自由エネルギー |
| | $d\mathcal F$ | 一次変分（共ベクトル） | Euler–Lagrange 残差、随伴変数、スコア関数 |
| | $H = \nabla^2\mathcal F$ | 二次変分（Hessian） | 剛性行列、Fisher 情報、Gauss-Newton 近似 |
| Discretization | $\mathcal M_h$ | 有限次元部分空間 | FEM基底、スペクトル基底、NNパラメタ化 |
| Geometry | $G$ | 計量（Riesz 写像 $T\to T^*$） | $L^2/H^1$ 内積、質量行列、Hessian 近似、Fisher 情報 |
| | $K$ | 散逸作用素 ($T^*\to T$) | $G^{-1}$、前処理行列、逆ラプラシアン |
| | $J$ | 保存作用素 ($T^*\to T$) | シンプレクティック行列 ($J_{2n}$)、Poisson 構造 |

> Note: 作用素の方向と用語の衝突
> - 方向: $G$ と $H$ は「ベクトルから共ベクトルへ ($T\to T^*$)」の写像であるのに対し、$K$ と $J$ は「共ベクトルからベクトルへ ($T^*\to T$)」の写像（逆写像的）である。
> - 衝突: FEM の「剛性行列 $K$」は、本書の記号では $H$（$T\to T^*$）に相当する。実装において `solve(K, g)` と書くときの「ソルバの適用 ($K^{-1}$)」が、本書の散逸作用素 $K$ に対応することに注意せよ。
| Algorithm | $C(x)=0$ | 制約 | 境界条件・正規化・PDE/ODE 制約・ゲージ条件 |
| | 流れ/反復 | 解法の選択 | 勾配流、Newton、Hamilton、KKT（サドル） |

統一式（第3章）：
$$
\dot x
=
-K(x)\,d\mathcal F(x) + J(x)\,d\mathcal F(x)
$$

## 7.4 ミニ例：同じ骨格がどう見えるか

### Example (Poisson / FEM の最小モデル)

領域 $\Omega$ で（境界条件込みで）次のエネルギーを考える：
$$
\mathcal F(u)=\int_\Omega \left(\frac12|\nabla u|^2 - f u\right)\,dx
$$
停留条件 $d\mathcal F(u)=0$ は Poisson 方程式（弱形式）に対応し、
離散化すると $K \mathbf{u} = \mathbf{f}$ という線形方程式になる（ここでの $K$ は剛性行列）。
これは幾何的 $K$（散逸）とは異なる文脈だが、最適化としては「Newton ステップを一回踏む」ことに相当する。

### Example (変分推論：Fisher 計量が “$G$” になる)

近似分布 $q$ を変数として、KL ダイバージェンス $\mathcal F(q)=\mathrm{KL}(q\|p)$ を最小化する。
通常の $L^2$ 勾配ではなく、Fisher 情報計量 $G$ を用いた勾配流を考えると、
$$
\dot q = -G^{-1} d\mathcal F(q)
$$
となり、これが自然勾配法（Natural Gradient）である。

### Example (Hamilton 力学：同じ $\mathcal F$ でも “回る”)

位相空間 $x=(q,p)$、$\mathcal F(x)=H(q,p)$（Hamiltonian）とし、
反対称構造 $J$ を標準シンプレクティック行列に取ると
$$
\dot x = J d\mathcal F(x)
$$
が得られる。これはエネルギーを保存しながら等高線に沿って動く。

## 7.5 応用ページへ落とすときの最短手順

分野が違っても、実装でやることはほぼ同じである（[第8章](./chap08-implementation)と接続）：

| knob | やること |
|------|---------|
| Space | スカラー汎関数 $\mathcal F:\mathcal M\to\mathbb R$ を定義する |
| Discretization | 変数空間 $\mathcal M$ をどう有限次元化するか決める（FEM基底、NN等） |
| Geometry | 計量 $G$（および散逸 $K$・保存 $J$）を選ぶ |
| Algorithm | 勾配流／Newton／Hamilton／KKT（サドル）として解く |

一次・二次変分（$d\mathcal F$, $H$）はADを利用して計算できる形にする。
