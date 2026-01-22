---
title: "FEM: Poisson Equation (Energy Minimization)"
---

> このページで主に触るknob: Space（関数空間）＋ Discretization（FEM基底）＋ Geometry（計量/前処理）＋ Algorithm（停留条件の解法）

## Problem

領域 $\Omega$ 上で Poisson 方程式

$$
-\Delta u = f
$$

（適切な境界条件の下で）解く。

本書の "optimization" は狭義の極小化に限らず、汎関数の停留構造を数値的に扱うことを指す（保存系（$J$）も射程に含む；[序文 0.4](../../chapters/chap00-preface#0-4-optimization-という言葉について)）。

このページの最小の絵（翻訳キー）：

- 入力: `Space 𝓜`（関数空間 $V$）と `Functional 𝓕`
- 出力: `Stationary`（一次変分がゼロ）と（必要なら）`local shape H`
- 翻訳: `Geometry/Algorithm` により `d𝓕（共ベクトル）` を「更新／ダイナミクス」に落とす

## Functional（VGO の統一言語）

VGO の出発点は「停留条件」である（[第2章](../../chapters/chap02-minimal-ingredients)）。
Poisson 方程式は弱形式に対応するエネルギー汎関数の**停留**として書ける：

$$
\mathcal F(u)=\int_\Omega \left(\frac{1}{2}\lVert\nabla u\rVert^2 - f u\right)\,dx
$$

停留条件 $d\mathcal F(u^*)=0$（一次変分がゼロ）が弱形式に一致する。
有限次元ユークリッド空間では $d\mathcal F \simeq \nabla \mathcal F$ と同一視できるため、$\nabla \mathcal F(u^*)=0$ とも書ける。

（制約の扱い）  
境界条件は制約として扱える：
- Dirichlet: $u|_{\partial\Omega}=g$（部分空間への制限、または自由度の消去/拘束として実装；[第6章](../../chapters/chap06-constraints)）
- Neumann: 自然境界条件として汎関数に自動的に含まれる

## Geometry (G, J)

典型的には $J=0$（散逸）で、Newton（線形なら 1 回）または勾配系として解く。

### 計量 $G$ の役割（前処理・スケーリング）

関数空間では $G$ を $L^2$ や $H^1$ に対応させる視点がある：
- $L^2$ 計量: 離散化後に質量行列 $M$ が現れ、勾配流は $M\dot q = -\nabla \mathcal F_h(q)$ の形（前処理/自然勾配の見取り図）になる
- $H^1$ 計量: Sobolev 勾配法として、高周波ノイズを抑制する平滑化が効く（[第8章 8.5.1](../../chapters/chap08-implementation#8-5-1-l2-vs-h1-勾配の使い分け)）

補足：本書の $G$ は「共ベクトル→更新ベクトル」の翻訳（前処理）であり、実装ではスケーリングや重み付けが事実上の計量として効く。

### 記号衝突の注意（剛性行列 $K$ vs 散逸作用素 $K$）

FEM では慣習的に「剛性行列 $K$」を使うが、本書の記号では：
- FEM の剛性行列 $K$: 二次変分（Hessian）$H$ に相当（$T\to T^*$）
- VGO の散逸作用素 $K$: 計量の逆 $G^{-1}$ に相当（$T^*\to T$）

したがって、$Kq=b$ という式を見たときに、VGO の文脈では「$Hq=b$（停留条件）」と読むのが正しい。
実装において `solve(K, g)` と書くときの「ソルバの適用（$K^{-1}$）」が、本書の散逸作用素 $K$ に対応することに注意せよ（[第3章 3.1.1](../../chapters/chap03-general-equation#記号衝突注意散逸作用素-k-と-fem-の剛性行列-k)）。

（向きの注意）  
AD が返すのは基本的に一次変分の成分（共ベクトル）であり、更新方向（ベクトル）にするには計量（前処理）が要る（[第2章 2.3](../../chapters/chap02-minimal-ingredients#2-3-計量と勾配translation-layer), [第8章 8.1](../../chapters/chap08-implementation#8-1-抽象から実装へ翻訳のトレースtrace)）。

## Discretization

最適制御と同様、FEM でも離散化が「実装上の主要な設計自由度」になる。

- **有限要素空間**: $V_h\subset V$ を選び $u_h\in V_h$
- **基底展開**: $u_h(x)=\sum_i q_i\phi_i(x)$ を $\mathcal F$ に代入すると、有限次元の目的関数 $\mathcal F_h(q)$ が得られる
- **要素・基底・数値積分**: 要素形状、基底関数の選び方、数値積分の精度が離散化の質を決める

最適性条件は

$$
\nabla \mathcal F_h(q)=0 \;\Longleftrightarrow\; Kq=b
$$

（剛性行列 $K$、荷重ベクトル $b$）として現れる。

VGO 的には **「先に汎関数を決め、どのレベルで離散化し、どの停留条件を数値的に満たすか」** が設計の中心になる。

## Algorithm

同一の問題でも、目的に応じて複数の "解き方" を選べる。

- **線形方程式ソルバ**（線形問題の典型）: 剛性行列 $K$ を直接解く（Cholesky、CG、前処理付き反復法など）
- **Newton / Krylov**（非線形/連成）: 非線形問題や連成問題では Newton-Krylov が自然に現れる
- **勾配流**（時間発展として解く）: $M\dot q = -\nabla \mathcal F_h(q)$ のような時間発展として解く（構造保存、長時間積分）

VGO の視点では、これらは「停留構造（一次・二次変分）の満たし方」の違いにすぎない。

### 最小の実装単位（direct の目線）

最小仕様は「汎関数（スカラー）と制約（ベクトル）を実装し、AD と線形ソルバで停留条件を回す」に集約できる（[第8章](../../chapters/chap08-implementation) と同型）：

- `F(q)`（目的）
- `c(q)=0`（制約、必要なら）
- `grad/VJP/JVP`（一次変分・ヤコビアン作用）
- （必要なら）`HVP`（二次情報）と前処理（質量行列 $M$ による補正）

## Notes

- **重要度**: FEM は PDE を「汎関数の停留点を求める」に統一する代表例であり、VGO の翻訳層の典型である。
- **実装難易度**: 線形問題なら中程度（要素・基底・数値積分の選び方が鍵）。非線形/連成になると難易度が上がる（Newton-Krylov、構造保存、ロッキング対策など）。
- **実装リスク**: 「離散化の選び方（要素・基底・積分）」と「境界条件の扱い（Dirichlet/Neumann/接触）」が破綻点になりやすい。まずは線形問題で要素・基底・数値積分の基本を固めるのが安全。
