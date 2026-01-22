---
title: "Control: Pontryagin (PMP) in the VGO Framework"
---

## Problem

最適制御

$$
\min_{x(\cdot),u(\cdot)}\;
\phi(x(T))+\int_0^T \ell(x(t),u(t),t)\,dt
\quad\text{s.t.}\quad
\dot x=f(x,u,t),\; x(0)=x_0
$$

に対して、**ポントリャーギン最大原理（PMP）** は「最適性条件（一次変分の停留）」を **Hamilton 形式**として与える。

VGO の視点では、PMP は

- [第6章](../../chapters/chap06-constraints) の **制約付き停留（KKT）** を連続時間に持ち上げたもの
- [第5章](../../chapters/chap05-methods-map) の「Hamilton（保存構造）」側の代表例

として位置づけられる。

## Functional → Hamiltonian

ダイナミクス制約に対するラグランジュ乗数（随伴変数） $\lambda(t)$ を導入し、Hamiltonian を

$$
H(x,u,\lambda,t)=\ell(x,u,t)+\lambda^\top f(x,u,t)
$$

と定義する。

（符号規約は流儀があるが、本書では「目的 $\ell$ + 乗数 $\lambda$ × 制約」の “KKT の見た目” に合わせる。）

## Geometry (G, J)

PMP では未知量を $(x(\cdot),\lambda(\cdot),u(\cdot))$ として持ち、最適性条件が

- $(x,\lambda)$ の **正準方程式**（保存構造）
- $u$ の **局所最適条件**（最大/最小条件）

という形に現れる。

VGO の一般形で言えば、最適性条件の主要部が $J\neq 0$ の “Hamilton 側” として現れる、という理解がしやすい。

## Optimality conditions（PMP）

終端コスト $\phi(x(T))$ を持つ場合の典型形（内点制約なし）は

$$
\dot x = \nabla_\lambda H(x,u,\lambda,t)=f(x,u,t),
$$

$$
\dot\lambda = -\nabla_x H(x,u,\lambda,t)
= -\nabla_x \ell(x,u,t) - \left(\nabla_x f(x,u,t)\right)^\top \lambda,
$$

および（内点での）制御の停留条件

$$
0=\nabla_u H(x,u,\lambda,t)
=\nabla_u \ell(x,u,t) + \left(\nabla_u f(x,u,t)\right)^\top \lambda.
$$

境界条件（横断条件）は、代表的には

$$
\lambda(T)=\nabla_x \phi(x(T)).
$$

不等式制約 $g(x,u,t)\le 0$ がある場合は、乗数 $\nu(t)\ge 0$ と相補性

$$
\nu(t)\ge 0,\qquad g(x,u,t)\le 0,\qquad \nu(t)^\top g(x,u,t)=0
$$

が付加され、Hamiltonian は拡張される。

## Discretization（なぜ難しいか）

PMP は連続時間の最適性条件を **境界値問題（BVP）** として与えるため、実装は次の難しさを持つ。

- 初期条件は $x(0)=x_0$ だが、$\lambda$ は終端条件 $\lambda(T)=\nabla\phi$ を持つ（両端条件）
- $\nabla_u H=0$ から $u$ を消去できない場合、BVP がさらに非線形になる
- 制約（特に不等式・スイッチング）で解の正則性が崩れやすい

実装上さらに“刺さりやすい”点は、shooting（単射撃）が **感度（ヤコビアン）が爆発/消失しやすい**ことである：

- 前進積分だけで $x(T)$ を合わせようとすると、初期随伴 $\lambda(0)$ の微小誤差が指数的に増幅/減衰して当たりが付かないことがある（数値的不安定）
- そのため実務では、**multiple shooting**（区間を分割して連続条件を追加）や **collocation**（離散化して NLS/NLP に落とす）へ寄せるのが定石になる
- 収束の“入口”を作るには **継続法（continuation / homotopy）**、スケーリング、安定な積分（硬い系）などの工夫が効く

そのため実務では、PMP は「解く」というより

- direct 法の解が満たしているべき条件をチェックする
- 構造（随伴・エネルギー・保存量）からアルゴリズムを設計する（iLQR/RTI など）

といった用途で “骨格” として参照されることが多い。

## Algorithm（VGO 的な使い方）

- **indirect（PMP を直接解く）**: shooting / multiple shooting で BVP を解く。
- **direct（NLP を解く）**: 離散化→KKT を解けば、離散随伴は “自動的に” 得られる（AD や KKT ソルバ）。
- **ハイブリッド**: PMP の随伴構造を使って勾配・Hessian 近似（Gauss-Newton 等）を設計する。

VGO の観点では「PMP は KKT の連続版」であり、**実装は direct（離散化→有限次元最適化）を主戦場にし、PMP は構造理解の背骨として使う**のがリスクが低い。

## Notes

- **重要度**: 制御の “保存構造” 側（Hamilton）を代表する概念で、[第5章](../../chapters/chap05-methods-map) の地図と直結する。
- **実装難易度**: 高い（BVP、スイッチング、不等式、数値安定性）。
- **実装リスク**: 解が存在しても数値的に不安定になりやすい。まずは direct + KKT を基準にし、PMP は随伴の意味づけと設計指針として使うのが安全。

