---
title: "Glossary"
---

## 用語

### 汎関数（functional）

入力が関数/場（あるいは多様体上の点）で、出力がスカラーの写像 $\\mathcal F$。
例：エネルギー、作用、損失、自由エネルギー。

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

### 制約正則性（constraint qualification）

KKT 乗数が存在し、KKT 条件が成立するための前提条件の総称。
代表例として、等式制約では LICQ（$DC(x^*)$ の行独立性）、凸の不等式制約では Slater 条件などがある。

### KKT

制約付き最適化の停留条件（一般にサドル点問題として現れる）。

### AD（自動微分）

一次変分（grad/VJP/JVP）や HVP を機械的に得る実装手段。言語は変わっても概念は共通言語になる。

