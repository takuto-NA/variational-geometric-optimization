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
背景の最小セットは [付録C](./chapters/appC-functional-analysis-minimum) を参照。

### Banach 空間（Banach space）

ノルムが入った線形空間で、Cauchy 列が必ず極限を持つ（完備）もの。関数空間では「収束先が空間の外へ逃げない」ための最低条件として現れる。

### Hilbert 空間（Hilbert space）

内積が入った線形空間で、その内積が誘導するノルムに関して完備なもの。Riesz 表現により $V\\simeq V^*$ を自然に同一視できるため、「共ベクトル（微分）→勾配（ベクトル）」の翻訳が素直に書ける（付録C）。

### Sobolev 空間（Sobolev space）

“弱い意味での微分”が $L^2$ に入る関数の空間。例：$H^1(\Omega)=\{u\in L^2\mid \nabla u\in L^2\}$。関数空間最適化で $H^1$ 勾配（Sobolev 勾配）が平滑化として現れる（第8章・付録C）。

### 弱形式（weak form）

方程式を「任意のテスト関数に対する積分等式」として定義する形式。微分を積分に逃がせるため、滑らかさが弱い解でも扱えることが多い（FEM の入口）。

### 有界線形作用素（bounded linear operator）

ノルム空間間の線形写像 $A$ が $\\|Av\\|\\le C\\|v\\|$ を満たすこと。連続性と同値で、無限次元では「行列に相当する対象」を扱う最低条件になる（付録C）。

### 随伴（adjoint）

Hilbert 空間の内積に関して $(Av,w)=(v,A^*w)$ を満たす作用素 $A^*$。有限次元の転置（共役転置）の一般化であり、KKT や随伴法で本質的に登場する（第6章・第8章）。

### Fréchet 微分／Gâteaux 微分

いずれも「関数（汎関数）の微分」の定義。Fréchet はノルムに関する一様な線形近似、Gâteaux は方向微分（線に沿った微分）に対応する。本文では“使える形”を優先し、厳密化は付録Cへ逃がす。

### coercive（強制性）

双線形形式 $a(u,u)\\ge c\\|u\\|^2$ のように、エネルギーがノルムを下から抑える性質。楕円型問題の解の一意性・安定性を保証する典型条件（付録C）。

### Lax–Milgram 定理

有界かつ coercive な双線形形式 $a(\\cdot,\\cdot)$ に対し、弱形式 $a(u,v)=\\ell(v)$ の解が一意に存在することを与える定理。$H^1$ 計量での“solve が入る”直感を支える（第8章・付録C）。

### inf-sup（LBB）条件

サドル点（制約付き／混合）問題が安定に解けるための条件。KKT 型ブロック系や混合有限要素で「解が暴れない」ための鍵として現れる（第6章・付録C）。

### 作用素方程式／非線形作用素方程式（operator equation）

未知 $x$ に対して、ある写像（残差） $A$ を満たす $A(x)=0$（または $A(x)=b$）という形の方程式。  
有限次元では「方程式 $F(x)=0$」の言い換えで、関数空間では $A$ が（有界）線形作用素や非線形作用素として現れる。

本書では、停留条件 $d\mathcal F(x)=0$ や KKT 条件を「残差を 0 にする」非線形作用素方程式として捉え、Newton/Krylov や流れ（第3章）へ接続する。

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

