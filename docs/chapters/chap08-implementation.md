---
title: "Chapter 8: Implementation Benefits"
---

## 8.1 実装上の最大の利点

### 8.1.1 書くべきものは一つ

- **スカラー汎関数** $\mathcal F$

### 8.1.2 自動微分（AD）と整合する

この視点では、実装で必要なのは主に **一次変分と二次変分**である。
言語は将来変わり得るが、共通言語としての AD が残る。

- 勾配（一次）: `grad` / `VJP`
- 方向微分（一次）: `JVP`

擬似コード（言語非依存）：

```text
# given: scalar functional F(x)
g = grad(F)(x)          # first variation
dx = - solve(G(x), g)   # dissipative step (example)
```

Python/JAX での最小例（将来 Julia 等へ差し替え可能な例として）：

```python
# F: R^n -> R (scalar)
import jax

def step(x):
    g = jax.grad(F)(x)
    return x - eta * g
```

### Remark

勾配法・Newton・KKT・Hamilton などの“名前の違い”の背後にある実装上の共通点は、
**スカラー汎関数 $\mathcal F$ と、それに付随する線形演算（$G^{-1}$ や $J$）**である。
そのため本章では「何を実装すると、どの方法にも展開できるか」を最小仕様として整理する。

### 8.1.3 分野横断が自然

- FEM ↔ 制御 ↔ 推定 ↔ 物理 が同じ「汎関数 + 変分 + 構造」の形で接続されます。

## 8.2 実装の最小仕様（最小インターフェース）

### Definition (minimal implementation interface)

数値実装として最低限そろえる対象は、次の 3 点である：

- **Functional**: スカラー汎関数 $\mathcal F(x)$（$x$ はパラメータ・場・軌道などの「状態」）
- **Geometry**: 散逸（計量）$G$ と保存（反対称）$J$ に対応する線形作用
- **Constraints (optional)**: 制約 $C(x)=0$（必要ならラグランジアンへ）

実装では、$G$ や $J$ を「行列として明示」する必要はなく、**ベクトルへの作用（線形演算子）**として提供すれば十分である。

### Remark（“行列を作らない”が基準）

高次元では、密行列の Hessian や KKT 行列を作るよりも、

- $v \mapsto G^{-1}(x)\,v$
- $v \mapsto J(x)\,v$
- $v \mapsto \nabla^2 \mathcal F(x)\,v$

のような **線形作用**として実装し、反復法（CG/GMRES 等）と組み合わせる方が汎用的である。

## 8.3 AD で作る計算部品（一次・二次変分）

### 8.3.1 一次変分：`grad` と `VJP/JVP`

**一次変分**は、ほとんどの AD フレームワークで安定に計算できる：

- `grad`: $\nabla \mathcal F(x)$ を直接返す
- `VJP`: $v \mapsto (\nabla \phi(x))^\top v$（逆モード）
- `JVP`: $v \mapsto \nabla \phi(x)\,v$（順モード）

### 8.3.2 二次変分：HVP（Hessian-vector product）

Newton/Krylov や二次モデルでは、Hessian を作らずに

$$
v \mapsto \nabla^2 \mathcal F(x)\,v
$$

だけを使う（HVP）構成が実用的である。

JAX では例えば次で HVP を作れる：

```python
import jax

def hvp(F, x, v):
    # returns (H(x) v)
    return jax.jvp(jax.grad(F), (x,), (v,))[1]
```

### Remark（HVP が効く理由）

Newton 系のボトルネックは「線形方程式を解く」部分であり、そこで必要なのは
**Hessian の全要素ではなく HVP**であることが多い（特に Krylov 法）。

## 8.4 ソルバは $K$（あるいは $G$）と $J$ の組み合わせで統一できる

本書の一般式（Chapter 3）に対応して、離散時間の更新は概ね次の型になる：

まず座標自由形（Chapter 3）として

$$
x_{k+1} = x_k + \Delta t\left(-K(x_k)\,d\mathcal F(x_k) + J(x_k)\,d\mathcal F(x_k)\right)
$$

と書ける。有限次元ユークリッド座標では $d\mathcal F\simeq\nabla\mathcal F$、$K=G^{-1}$ と同一視して

$$
x_{k+1} = x_k + \Delta t\left(-G(x_k)^{-1}\nabla\mathcal F(x_k) + J(x_k)\nabla\mathcal F(x_k)\right)
$$

となる。

### 8.4.1 勾配流（散逸）: $x_{k+1}=x_k-\eta\,G^{-1}\nabla\mathcal F$

```text
g = grad(F)(x)
dx = - apply_Ginv(x, g)
x  = x + eta * dx
```

#### Remark（ステップサイズの役割）

勾配流は「流れ」なので、実装では $\eta$（離散化幅）が安定性を支配する。
まずは一定 $\eta$ で良いが、難しい問題ではラインサーチ/信頼領域へ拡張できる。

### 8.4.2 Newton / Newton-Krylov（停留条件を解く）

停留条件 $d\mathcal F(x)=0$ を反復で解く（有限次元ユークリッド座標では $\nabla\mathcal F(x)=0$）：

$$
\nabla^2\mathcal F(x_k)\,p_k = -\nabla\mathcal F(x_k),\qquad x_{k+1}=x_k+\alpha_k p_k.
$$

実装上は、線形方程式を **HVP を用いた反復法**で解く（Newton-CG の最小形）：

```text
g = grad(F)(x)

# define operator: v -> H(x) v
Hv(v) = hvp(F, x, v)

p = solve_linear(Hv, -g)     # e.g. CG / MINRES / GMRES
x = x + alpha * p            # alpha: line search / damping
```

### Remark（難易度・リスクの中心）

Newton 系の実装難易度とリスクは、主に次に集中する：

- **ill-conditioning**: $\nabla^2\mathcal F$ が悪条件で CG が遅い
- **非正定値**: サドル/制約では Hessian が不定で単純な CG が破綻する
- **グローバル化**: 近傍では速いが、初期値が遠いと崩れる

したがって実務では「ダンピング」「信頼領域」「前処理」「サドル用反復法（MINRES 等）」が重要になる。

### 8.4.3 Hamilton（保存）: シンプレクティック積分を使う

保存系では、単純な陽 Euler はエネルギーが人工的に増減しやすい。
そのため、可能なら **シンプレクティック積分（leapfrog 等）**を使う。

### 8.4.4 混合（散逸＋保存）: 分割法（splitting）が素直

$$
\dot x = X_\mathrm{diss}(x) + X_\mathrm{cons}(x)
$$

のとき、実装では

- 散逸ステップ
- 保存ステップ

を交互に適用する（Lie/Strang splitting）と、構造が保たれやすい。

## 8.5 離散化：連続対象をどう「計算可能」にするか

### 8.5.1 離散化の基本方針

連続問題（場・軌道・分布）を実装するには、$x$ を有限次元化する必要がある。
このとき本枠組みは、次の 2 段階に分けて考えると混乱しにくい：

- **Discretization**: $x \in \mathcal M$ を $x_h \in \mathbb R^n$ に落とす
- **Optimization / Stationary computation**: $\mathcal F_h(x_h)$ の停留構造を解く

### Remark（discretize-then-differentiate の実装上の利点）

AD を使う場合、要素ごとのエネルギー（積分近似）から $\mathcal F_h$ を組み立て、
そのまま `grad` を取る流れ（discretize-then-differentiate）が実装として素直である。
ただし PDE 制約では、随伴法（制約の構造を使った微分）が効く場面も多い（Chapter 6 の延長）。
Poisson/FEM の最小例（停留条件と勾配流の両方が同じエネルギーから出る）は [Chapter 7](./chap07-cross-domain) も参照。

## 8.6 制約の実装：KKT を“停留点”として扱う

Chapter 6 の通り、制約付き問題はラグランジアン

$$
\mathcal L(x,\lambda)=\mathcal F(x)+\langle\lambda,\,C(x)\rangle
$$

の停留条件 $d_x\mathcal L(x,\lambda)=0,\ C(x)=0$ として統一できる（Chapter 6）。

### 8.6.1 代表的な実装パターン

- **Projection（射影）**: 制約多様体への射影が安いときに有効
- **Penalty**: $\mathcal F(x)+\frac{\rho}{2}\|C(x)\|^2$（簡単だが条件数悪化に注意）
- **Augmented Lagrangian**: 収束性と実装容易性のバランスが良い
- **Saddle solver**: $(x,\lambda)$ をまとめて Newton/Krylov で解く

### Remark（“最小で強い”のは拡張ラグランジアン）

初版の実装ガイドとしては、汎用性と安定性の観点から
**Augmented Lagrangian + 反復線形解法**が最も扱いやすい落とし所になることが多い。

## 8.7 正しさのテスト（実装検証のチェックリスト）

### 8.7.1 変分のテスト

- **有限差分チェック**: $\mathcal F(x+\epsilon v)-\mathcal F(x)$ と $\langle\nabla\mathcal F(x),v\rangle$ の整合
- **HVP チェック**: 二次差分と $\langle v,\,\nabla^2\mathcal F(x)v\rangle$ の整合

### 8.7.2 構造のテスト（$G,J$）

- **SPD**: $v^\top G^{-1}v>0$（数値誤差を含めて成り立つか）
- **反対称**: $v^\top J w \approx -w^\top J v$
- **散逸/保存**: 勾配流で $\mathcal F$ が下がる、Hamilton で不変量が保たれる（積分法に依存）

## 8.8 性能と安定性：実装で効く“定石”

- **行列を作らない**: HVP と線形作用で Krylov 法へ
- **前処理**: 収束速度（反復回数）を決める主役は前処理である
- **スケーリング**: 変数スケールの不整合は最適化を壊す（無次元化/正規化）
- **ログと停止条件**: $\|\nabla\mathcal F\|$、制約残差、線形解法残差を分けて監視する

## 8.9 実装の落とし穴（典型的な失敗）

- **非微分演算の混入**: `where`/`clip`/分岐で勾配が壊れる（必要ならスムージング）
- **確率性の扱い**: ミニバッチや乱数で「停留点判定」が揺れる（seed・平均化・分散低減）
- **制約の数値破れ**: ペナルティ単独で $\rho$ を上げ続けると悪条件化しやすい

## 8.10 まとめ

- 本枠組みの実装は **$\mathcal F$（スカラー）**を中心に置くと最短距離になる。
- $G^{-1}$・$J$・HVP を **線形作用**として実装し、反復法と組み合わせると高次元でも戦える。
- 制約は **ラグランジアンの停留点**として統一でき、実装パターンも整理できる。

