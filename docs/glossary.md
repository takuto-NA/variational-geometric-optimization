---
title: "Glossary"
---

## 用語

### 汎関数（functional）

入力が関数/場（あるいは多様体上の点）で、出力がスカラーの写像 $\\mathcal F$。
例：エネルギー、作用、損失、自由エネルギー。

### 多様体（manifold）

局所的には $\\mathbb R^n$ のように見える空間（座標でパッチワーク的に貼り合わさる）。最適化では「変数がベクトル空間以外に住む」状況を表すために使う。

### 接空間（tangent space）

$T_x\\mathcal M$ は点 $x$ における「許される微小変化方向」の線形空間（速度ベクトルが属する場所）。

### 双対空間（dual space）

$V^*$ は線形空間 $V$ から実数への線形写像全体。$T_x^*\\mathcal M$ は $T_x\\mathcal M$ の双対空間。

### 共ベクトル（covector）

「ベクトルを入れると数を返す線形な写像」。接空間 $T_x\\mathcal M$ に対し、その双対空間 $T_x^*\\mathcal M$ の元を共ベクトルと呼ぶ。

### 微分（dF）／一次変分（first variation）

$x\\in\\mathcal M$ における微分 $d\\mathcal F(x)\\in T_x^*\\mathcal M$ は共ベクトルであり、
双対積 $\\langle\\cdot,\\cdot\\rangle$ により $\\delta\\mathcal F(x)[v]=\\langle d\\mathcal F(x),v\\rangle$ と書ける。

有限次元ユークリッド空間では $d\\mathcal F\\simeq\\nabla\\mathcal F$ と同一視できる（本書では $\\nabla\\mathcal F$ はこの座標表示に限定して使う）。

### G-勾配（grad_G）／Riesz 同一視

計量 $G$ によって、共ベクトル $d\\mathcal F(x)$ をベクトル $\\mathrm{grad}_G\\mathcal F(x)\\in T_x\\mathcal M$ に同一視する。
有限次元では $\\mathrm{grad}_G\\mathcal F(x)=G(x)^{-1}\\nabla\\mathcal F(x)$。

### Riesz 写像（Riesz map）

計量（内積）により「共ベクトル $\\leftrightarrow$ ベクトル」を対応づける写像。
最適化の文脈では「同じ一次変分でも、どの計量を選ぶかで“勾配（ベクトル）”が変わる」ことを説明する鍵になる。

### 停留点（stationary point）

停留点は $d\\mathcal F(x^*)=0$ を満たす点（有限次元ユークリッド座標では $\\nabla\\mathcal F(x^*)=0$）。
極小点に限らず、サドルや極大も含む。

### 二次変分／Hessian

二次変分は $d\\mathcal F$ の線形化として現れ、有限次元では Hessian $\\nabla^2\\mathcal F(x)$ に対応する。
サドル点では Hessian が不定になり得るため、Newton 系はダンピング/信頼領域などの安定化が必要になる。

### HVP（Hessian-vector product）

Hessian を明示的に作らずに $v\\mapsto \\nabla^2\\mathcal F(x)\\,v$（HVP）だけを計算する手法。
Newton-Krylov などの反復線形解法と相性が良い。

### 計量（metric）

勾配や距離を定める構造。数値的には $G$（対称正定値）として現れる。

### 反対称構造（antisymmetric structure）

保存的な回転を生成する構造。数値的には $J$（反対称／skew-adjoint）として現れる。

### シンプレクティック構造（symplectic）／Poisson 構造

Hamilton 力学の「保存的な回転」を与える幾何構造。行列で表せる場合は反対称（skew）な形として現れる。

### Hamilton 系（Hamiltonian system）

$\\dot x = J\\,d\\mathcal F(x)$（ユークリッド座標では $\\dot x = J\\nabla \\mathcal F$）の形で表される保存系。$\\mathcal F$ は典型的に保存量になる。

### Lyapunov 関数

軌道に沿って単調に減少（または増加）する量。勾配流では $\\mathcal F$ 自身が Lyapunov 関数になることが多い。

### 悪条件（ill-conditioning）

同じ精度を得るのに反復回数が増えたり、数値誤差に敏感になったりする状況（例：Hessian の条件数が大きい）。

### Krylov 法（Krylov subspace methods）

線形方程式を「行列を作らずに、ベクトルへの作用（matvec）」だけで反復的に解く方法の総称（例：CG/GMRES/MINRES）。

### 前処理（preconditioning）

Krylov 法などの反復法を速くするための変換。実務では反復回数を左右する主要因になる。

### CG / GMRES / MINRES

いずれも Krylov 法。CG は対称正定値（SPD）向け、GMRES は一般の非対称向け、MINRES は対称不定（サドル）に使われることが多い。

### VJP / JVP

ヤコビアンの積を返す AD の基本演算。VJP は逆モード（$v^\\top J$）、JVP は順モード（$Jv$）に対応する。

### 随伴法（adjoint method）

制約（PDE/ODE）の下での微分を、随伴変数（双対変数）を導入して効率よく計算する方法。

### 相補性（complementarity）

不等式制約の KKT で現れる条件 $\\mu_i g_i=0$（制約が効くなら乗数が立ち、効かないなら乗数は 0）。

### 制約正則性（constraint qualification）

KKT 乗数が存在し、KKT 条件が成立するための前提条件の総称。
代表例として、等式制約では LICQ（$DC(x^*)$ の行独立性）、凸の不等式制約では Slater 条件などがある。

### KKT

制約付き最適化の停留条件（一般にサドル点問題として現れる）。

### AD（自動微分）

一次変分（grad/VJP/JVP）や HVP を機械的に得る実装手段。言語は変わっても概念は共通言語になる。

