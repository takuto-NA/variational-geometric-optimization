---
title: "Physics: Electromagnetism (Action, Constraints, Gauge)"
---

## Problem

電磁気学（Maxwell 方程式）を、VGO の観点から

- **変分原理（作用）**
- **拘束（ガウス則）**
- **ゲージ自由度（冗長性）**

として整理する。

## Functional

ポテンシャル $(\phi, A)$ を用いると

$$
E = -\partial_t A - \nabla \phi,
\qquad
B = \nabla\times A
$$

で、電磁場の作用は（外部電荷・電流を含めて）

$$
\mathcal F[\phi,A]
:=
\int
\Big(
\frac{\varepsilon_0}{2}|E|^2
-
\frac{1}{2\mu_0}|B|^2
-
\rho\,\phi
+
J\cdot A
\Big)\,dx\,dt
$$

の停留条件として与えられる。

Remark:
ここでも「最小化」というより「停留構造の生成」が主眼である。

## Geometry (G, J)

- $J$: Maxwell は保存的（反対称）な構造を持ち、適切な変数では Hamilton 形式で書ける  
  （例: $(E,B)$ を状態とした回転型の更新）
- $G$: 伝導（Ohmic loss）や数値散逸を入れるなら $G\succeq 0$ として追加できる

VGO 的には「$J$ が回転を作り、$G$ が散逸を作る」という役割分担で理解するのが見通しがよい。

## Discretization

電磁気で重要なのは「拘束を壊さない離散化」。

- **ガウス則**: $\nabla\cdot B=0$, $\nabla\cdot E=\rho/\varepsilon_0$
- **ゲージ**: $(\phi,A)$ の表現には同値性があり、数値的には冗長（不適切だと特異）

代表的な方針は

- **拘束保持**: 離散発散・離散回転が厳密に整合するスキーム
- **DEC / Hodge**: 外微分 $\mathrm d$ と Hodge 作用素に沿って離散化し、構造を保つ
- **ゲージ固定**: 例として Coulomb ゲージ $\nabla\cdot A=0$ などを課し、KKT（鞍点）として解く

## Algorithm

実装上は「拘束（ガウス則）とゲージ（冗長性）をどう扱うか」が中心課題になる。

- **(A) $E,B$ 直接更新 + 拘束補正**: 更新後に $\nabla\cdot B=0$ を保つ補正（射影）
- **(B) $(\phi,A)$ で解く + ゲージ固定**: 未定乗数／Poisson 型方程式を解いて拘束を満たす

いずれも VGO 的には

- 拘束 = 未定乗数（KKT）
- ゲージ = 座標冗長性（良い計量/正則化の選択）

として統一的に見える。

## Notes

- 電磁気は「場の理論」の最小例で、FEM/DEC/最適化が自然に交差する領域。
- 本書の観点では、Maxwell を「方程式」として覚えるより、**作用・制約・ゲージ**の 3 点で再構成すると応用（数値法設計）に強くなる。

