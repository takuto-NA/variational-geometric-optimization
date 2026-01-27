---
title: "FEM: Large Deformation (Hyperelasticity) as Stationary Structure"
---

> このページで主に触るknob: Space（変形写像/変位場）＋ Discretization（形状関数・数値積分）＋ Geometry（二次変分=接線剛性）＋ Algorithm（Newton/線形ソルバ/安定化）

## Problem

参照配置の領域を $\Omega_0\subset\mathbb R^3$ とし、変形写像 $\chi:\Omega_0\to\mathbb R^3$ を未知量とする。
変位場は $u:=\chi-X$（$X\in\Omega_0$ は物質点の参照座標）で表す。

大変形の静的平衡（超弾性体）は「方程式を解く」だけでなく、**全ポテンシャルエネルギーの停留**として書ける。
本書の “optimization” は狭義の極小化に限らず、汎関数の停留構造を数値的に扱うことを指す（[序文 0.4](../../chapters/chap00-preface#0-4-optimization-という言葉について)）。

このページの最小の絵（翻訳キー）：

- 入力: `Space 𝓜`（変位場 $u\in V$）と `Functional 𝓕$（全ポテンシャル）`
- 出力: `Stationary`（一次変分がゼロ）と `local shape H`（二次変分=接線剛性）
- 翻訳: `Algorithm/Geometry` により `d𝓕（共ベクトル）` を「Newtonステップ（更新）」に落とす

## Functional（VGO の統一言語）

材料を履歴を持たない超弾性体とし、歪みエネルギー密度 $\Psi=\Psi(F)$（変形勾配 $F=\partial\chi/\partial X$ の関数）で記述する。
全ポテンシャルエネルギーを

$$
\Pi[u]
:=
\int_{\Omega_0}\Psi(F(u))\,dV
-\int_{\Omega_0} f_B\cdot u\,dV
-\int_{\Gamma_0^t} f_S\cdot u\,dA
$$

と置くと、静的平衡は

$$
\delta \Pi[u]=0\quad \forall\,\delta u
$$

という停留条件に一致する（仮想仕事の原理／弱形式）。
VGO の言葉では $d\Pi[u]=0$（一次変分がゼロ）である（[第2章](../../chapters/chap02-minimal-ingredients)）。

（制約）Dirichlet 境界条件は「許容空間の制限」または「等式制約」として入る（[第6章](../../chapters/chap06-constraints)）。
接触は不等式・相補性になるため、実装上はさらに難所になりやすい（制御側の例だが見取り図は [app05-contact-constraints](../control/app05-contact-constraints) を参照）。

## Geometry (G, J)

静的問題の典型は「保存/回転」ではなく「停留条件を解く」立場であり、$J=0$ として

$$
d\Pi[u]=0
$$

を満たす $u$ を探す問題になる。
大変形では $\Pi$ は一般に非凸になりうるため、最小化という直観だけでは扱えず、**停留構造（サドル/分岐）**として捉えるのが安全である。

### 二次変分（接線剛性）= Newton を支える “局所形状”

離散後の二次変分（Hessian）$H=\nabla^2\Phi$ は、連続体力学では「一貫接線剛性（consistent tangent）」として現れる。
本書の言葉ではこれが `local shape H` であり、Newton ステップの核になる（[第5章 5.3](../../chapters/chap05-methods-map#5-3-newton-法の二面性algorithm-か-geometry-か)）。

### 記号衝突の注意（FEM の剛性 $K$ と VGO の散逸 $K$）

FEM では慣習的に接線剛性行列を $K$ と書くが、本書では二次変分は $H$ と書く（[第2章 2.4](../../chapters/chap02-minimal-ingredients#2-4-二次変分connection--linearization)）。
本書の散逸作用素 $K$（$T^*\to T$）とは向きが逆であるため、誤読しやすい点は [第3章 3.1.1](../../chapters/chap03-general-equation#記号衝突注意散逸作用素-k-と-fem-の剛性行列-k) を参照。

## Discretization

### 形状関数による空間離散化

形状関数 $N_I(X)$ を用いて

$$
u_h(X)=\sum_{I=1}^{n_{\mathrm{dof}}} N_I(X)\,u_I,\qquad
u=\{u_I\}\in\mathbb R^{n_{\mathrm{dof}}}
$$

と近似する（$u_I$ は節点変位）。
このとき変形勾配は

$$
F(u)=I+\frac{\partial u}{\partial X}
=I+\sum_I \frac{\partial N_I}{\partial X}\otimes u_I
$$

で計算できる。

### 数値積分（ガウス積分）

要素積分はガウス点 $\xi_g$ と重み $w_g$ により

$$
\int_{\Omega_e} f\,dV\approx \sum_{g=1}^{n_g} w_g\, f(\xi_g)
$$

の形で評価する（高次要素・大変形では積分点数/選択積分が安定性に効く）。

### 離散スカラー関数（エネルギー）と停留条件

離散化により全ポテンシャルは有限次元のスカラー関数

$$
\Phi(u)
:=
\sum_e\sum_g w_g\,\Psi(F(\xi_g;u))
-u^\mathsf T f_{\mathrm{ext}}
$$

に落ちる。
停留条件は

$$
\nabla \Phi(u)=0
$$

であり、実装上は残差 $r(u):=\nabla\Phi(u)$ をゼロにする問題になる。

## Algorithm（Newton と大規模線形代数）

### Newton（方程式ソルバとしての側面）

Newton 法は停留条件（残差方程式）を解く：

$$
H(u_n)\,\Delta u = -r(u_n),\qquad u_{n+1}=u_n+\Delta u
$$

ここで $H(u)=\nabla^2\Phi(u)$ は接線剛性（consistent tangent）である。
大規模では $H$ を陽に作らず、`matvec` と Krylov（CG/MINRES/GMRES）＋前処理で解く設計が効く（[第8章](../../chapters/chap08-implementation)）。

### 収束安定化（非凸・分岐への対策）

大変形では非凸性や分岐により、素の Newton が発散しうる。
現場の定石は：

- damping / line search
- trust-region
- arc-length（分岐追跡）

などで「更新を制御する」こと。

## Notes

- **重要度**: 「連続体力学=最適化」の翻訳が最も強く刺さる代表例で、FEM の Newton 実装は VGO の骨格そのものになる。
- **実装難易度**: 中〜高（非線形材料・大変形・数値積分・接線剛性・大規模線形ソルバ）。
- **実装リスク**:
  - 非凸性で局所解/分岐が出る（安定化とロードステップ設計が必須）
  - 非圧縮に近い材料でロッキングが出る（混合法/選択積分など）
  - 接触/摩擦は不等式・相補性となり、ソルバ戦略が支配的になる

