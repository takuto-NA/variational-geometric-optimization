---
title: "第8章 実装への接続"
---

> この章で主に触るknob: Discretization（可計算化）＋ Algorithm（ソルバ/検証/安定化）＋ Geometry（線形作用としての $G^{-1},J$）

## 8.1 抽象から実装へ：翻訳のトレース（Trace）

理論編（Part I）の締めくくりとして、第2章の抽象定義が、実際のコード上の配列や行列にどう落ちるかを完全にトレースする。
ここでは最も単純な「1次元領域 $\Omega=[0,1]$ 上の関数 $u(x)$」を例に取る。
本書の “optimization” は極小化ではなく停留構造の数値的取り扱いを指す（保存系（$J$）も射程に含む；[序文 0.4](./chap00-preface#0-4-optimization-という言葉について)）。

### Step 1: Functional (Level 0)
汎関数を定義する。例えば Dirichlet エネルギーと外力ポテンシャル：
$$
\mathcal F(u) = \int_0^1 \left( \frac{1}{2} (\nabla u)^2 - f u \right) dx
$$

### Step 2: Discretization (Space Knob)
空間 $\mathcal M$（関数空間）を有限次元部分空間 $\mathcal M_h$ に落とす。
ここでは単純な線形要素（等分割幅 $h$ のノード $x_0, \dots, x_N$）と基底関数 $\phi_i$ を選ぶ：
$$
u(x) \approx u_h(x) = \sum_{i=0}^N u_i \phi_i(x)
$$
これにより、状態はベクトル $\mathbf{u} = [u_0, \dots, u_N]^\top \in \mathbb R^{N+1}$ になる。

### Step 3: First Variation (Level 1: Covector)
抽象的な一次変分 $d\mathcal F(u)[\eta]$ を離散化する。
テスト関数 $\eta = \phi_i$ を入れたときの値が、勾配ベクトルの $i$ 番目の成分 $g_i$ になる：
$$
g_i = d\mathcal F(u_h)[\phi_i] = \int_0^1 (\nabla u_h \cdot \nabla \phi_i - f \phi_i) dx
$$
これは「剛性行列 $\times \mathbf{u}$ － 外力ベクトル」に他ならない。
コード上では、これが `grad(loss)(u)` が返す配列 `g` そのものである。

### Step 4: Metric & Gradient (Level 2 & 3)
ここで計量 $G$（例えば $L^2$ 内積）を導入する。
$$
G_u(\xi, \eta) = \int_0^1 \xi(x) \eta(x) dx
$$
これを離散化すると、質量行列 $M$ が現れる：
$$
M_{ij} = \int_0^1 \phi_i \phi_j dx
$$
抽象的な勾配定義 $\operatorname{grad}_G \mathcal F = \flat_G^{-1}(d\mathcal F)$ は、線形方程式
$$
M \mathbf{v} = \mathbf{g}
$$
の解 $\mathbf{v} = M^{-1} \mathbf{g}$ として実装される。

> Critical Insight: AD（自動微分）が計算するのは Step 3 の $\mathbf{g}$（共ベクトル成分）までである。Step 4 の $M^{-1}$ による補正を通さない限り、それは「勾配（更新ベクトル）」として機能しない。この $M^{-1}$ の適用こそが、理論上の幾何構造を実装に注入するプロセスである。

## 8.2 実装マッピング表

| 理論上の対象 (Theory) | 離散化後の対象 (Discrete) | コード上の表現 (Implementation) | 備考（FEM読者への注意） |
| --- | --- | --- | --- |
| 状態 $u \in \mathcal M$ | 係数ベクトル $\mathbf{u} \in \mathbb R^n$ | `u: Array[float]` | |
| 汎関数 $\mathcal F(u)$ | スカラー関数 $F(\mathbf{u})$ | `loss_fn(u) -> float` | |
| 一次変分 $d\mathcal F(u)$ | 成分ベクトル $\mathbf{g} = \nabla F(\mathbf{u})$ | `g = jax.grad(loss_fn)(u)` | ADの出力は「共ベクトル」 |
| 計量 $G$ (Riesz Map) | 行列 $M$ (Mass Matrix) etc. | `M` (Matrix) or `mv(v)` | FEMの「剛性行列」はここでの $H$ に相当 |
| 散逸作用素 $K \approx G^{-1}$ | 逆行列適用 / 前処理 | `v = solve(M, g)` | FEMの $K$ と逆の役割（ソルバに相当） |
| 二次変分作用素 $H = \nabla^2 \mathcal F$ | Hessian-Vector Product | `Hv = jax.jvp(grad(f), (u,), (v,))` | FEMの剛性行列そのもの |

## 8.3 実装の最小仕様（最小インターフェース）

### 8.3.1 実装すべき関数

数値実装として最低限そろえる対象は、次の 3 点である：

1.  Functional: スカラー汎関数 $\mathcal F(x)$
2.  Geometry Operators: 線形作用 `apply_K(g)` (or `solve_M(g)`) と `apply_J(g)`
3.  Constraints (Optional): 制約 $C(x)$

### 8.3.2 Python/JAX での最小実装例

```python
import jax
import jax.numpy as jnp

# 1. Functional (Level 0)
def functional(u):
    # 例：離散化されたエネルギー
    # (実際のFEMではここで数値積分やアセンブリが入るが、ADはそれを透過的に微分する)
    return 0.5 * jnp.dot(u, u)  # ダミー

# 2. First Variation (Level 1)
def get_differential(u):
    # これは共ベクトル（成分）を返す
    return jax.grad(functional)(u)

# 3. Geometry (Level 2 -> 3)
def get_gradient(u, metric_matrix_inv):
    g = get_differential(u)
    # Riesz map の逆（計量の逆）を適用
    # 単純なユークリッド計量ならここは identity
    return metric_matrix_inv @ g 

# 4. Second Variation H (Hessian Operator)
def apply_H(u, v):
    # 行列を作らず作用 H*v のみ定義
    g_fun = jax.grad(functional)
    return jax.jvp(g_fun, (u,), (v,))[1]
```

## 8.4 ソルバの構成

統一方程式 $\dot x = (-K + J) d\mathcal F$ を離散時間で回す。

### 8.4.1 勾配流（散逸系）
$\mathbf{x}_{k+1} = \mathbf{x}_k - \eta K(\mathbf{g}_k)$

```text
g = grad(F)(x)
v = apply_K(g)  # e.g., solve(M, g)
x = x - eta * v
```

### 8.4.2 Newton-Krylov（停留条件）
$H \Delta \mathbf{x} = -\mathbf{g}$（$H = \nabla^2\mathcal F$）を解くが、左辺は純粋な Hessian ではなく $K H$ のような作用素になることもある。
基本は「Hessian-Vector Product（HVP）と Krylov ソルバ」の組み合わせである。

```text
g = grad(F)(x)
def matvec(v):
    return apply_H(x, v)

step = scipy.sparse.linalg.cg(A=LinearOperator(matvec), b=-g)
x = x + step
```

### 8.4.3 Saddle Point / Constrained Flow
第6章で扱った制約付き問題（KKT条件）は、次のブロック行列形式の線形系を解くことに帰着される。これを線形作用素として構成することで、大規模な制約付き問題も扱える。

```python
def apply_KKT_system(u, lmd, v_u, v_lmd):
    # 1. Hessian-Vector Product: H * v_u
    Hv = apply_H(u, v_u)
    
    # 2. Constraint Jacobian-Vector Product: DC * v_u
    # 3. Jacobian-Transpose-Vector Product: (DC)^T * v_lmd
    # これらは JAX の jvp / vjp で計算可能
    DC_v = jax.jvp(constraint_fn, (u,), (v_u,))[1]
    vjp_fun = jax.vjp(constraint_fn, u)[1]
    DCT_lmd = vjp_fun(v_lmd)[0]
    
    # KKT行列の作用を返す
    return (Hv + DCT_lmd, DC_v)

# ソルバ（MINRES など）で (v_u, v_lmd) を求める
# [H, DC^T; DC, 0] [v_u; v_lmd] = [-g; -C]
```

このように、第6章の「サドル点」という理論的要請は、実装上は「KKT行列というブロック線形作用素の構築と、それに対する対称不安定系ソルバの適用」という具体的なタスクに翻訳される。

## 8.5 離散化の注意点

### 8.5.1 $L^2$ vs $H^1$ 勾配の使い分け
関数空間での最適化（形状最適化やコントロール）では、$L^2$ 内積（単なるドット積に近い）による勾配は高周波ノイズを含みやすく、最適化が遅い・不安定になりがちである。
$H^1$ 内積（平滑化作用を持つ）を $G$ に選ぶこと（Sobolev 勾配法）は、実装上は「勾配ベクトルに対して $(I - \Delta)^{-1}$ のような平滑化フィルタを掛ける」ことに相当する。これは $K$ の設計自由度である。

### 8.5.2 AD との整合性：AD は「勾配」を返さない

「離散化してから微分（Discretize-then-Optimize）」のアプローチにおいて、最も注意すべき点は AD が返すのは一次変分の成分（共ベクトル）であり、勾配ベクトルではない、という事実である。

*   AD の出力: $\mathbf{g} = \frac{\partial F}{\partial \mathbf{u}}$ （これはユークリッド内積を前提とした勾配成分）
*   物理的な勾配: $\mathbf{v} = M^{-1} \mathbf{g}$ （質量行列や計量による補正が必要）

したがって、物理的な最適化（関数空間での降下など）を実装する際は、必ず適切な計量行列 $M^{-1}$ を手動で掛ける手順が必要になる。これを忘れると、メッシュを細かくするほど収束が悪化する（メッシュ依存性）などの問題に直面する。

## 8.6 まとめ

*   実装の中心は常にスカラー汎関数 $\mathcal F$ である。
*   AD が返すのは一次変分（共ベクトル）であり、これを更新量（ベクトル）にするには計量（$M^{-1}$）が必須である。
*   行列を明示せず、線形作用（HVP, Solver）として実装することで、大規模問題にもスケールする。
