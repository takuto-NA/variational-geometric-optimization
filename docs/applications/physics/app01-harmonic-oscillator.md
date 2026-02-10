---
title: "Physics: Harmonic Oscillator (Variational to pH and Optimization)"
---

## Responsibility

このページの責務は、連続体力学を起点にして、変分原理・FEM・port-Hamiltonian・時間積分・安定条件・最適化を一本の数式列でつなぐことである。

## Position In Unified Flow

この章は基準章であり、`app02` 以降は本章の各ブロック（拘束、散逸、流体、電磁気）を個別に拡張する。

## Symbol Dictionary

- 連続体変位場: $u(x,t)\in\mathbb{R}^d$
- 離散自由度: $q(t)\in\mathbb{R}^n$, 共役運動量: $p(t)\in\mathbb{R}^n$
- 質量行列: $M\succ 0$, 減衰行列: $C\succeq 0$, 剛性行列: $K\succeq 0$
- 弾性テンソル: $\mathbb{C}$（減衰行列 $C$ と区別）
- ハミルトニアン: $H(q,p)$, 構造行列: $J=-J^\top$, 散逸行列: $R=R^\top\succeq 0$

## 0. Continuous Field As Action

前提条件: 小変形の線形弾性体を想定する。

$$
u=u(x,t),\qquad x\in\Omega\subset\mathbb{R}^d
$$

$$
T=\frac{1}{2}\rho |\dot{u}|^2,\qquad
\varepsilon(u)=\frac{1}{2}\left(\nabla u+\nabla u^\top\right),\qquad
W(\varepsilon)=\frac{1}{2}\varepsilon:\mathbb{C}:\varepsilon
$$

$$
S[u]
:=
\int_{t_0}^{t_1}
\left(
\int_\Omega
\left(
\frac{1}{2}\rho |\dot{u}|^2 - W(\varepsilon(u))
\right)d\Omega
+
\int_\Omega b\cdot u\,d\Omega
+
\int_{\Gamma_t}\tau\cdot u\,d\Gamma
\right)dt
$$

$$
\delta S[u]=0
$$

## 1. First Variation To Weak Form

前提条件: 許容変分 $v=\delta u$ は境界条件を満たす。

$$
\int_\Omega \rho \ddot{u}\cdot v\,d\Omega
+
\int_\Omega \sigma(u):\varepsilon(v)\,d\Omega
=
\int_\Omega b\cdot v\,d\Omega
+
\int_{\Gamma_t}\tau\cdot v\,d\Gamma,
\qquad \forall v
$$

$$
\sigma(u)=\frac{\partial W}{\partial \varepsilon}(u)=\mathbb{C}:\varepsilon(u)
$$

## 2. FEM As Finite-Dimensional Projection

前提条件: 空間のみ離散化し、時間は連続のまま残す。

$$
u(x,t)\approx N(x)q(t),\qquad v(x)=N(x)\delta q
$$

$$
M=\int_\Omega \rho N^\top N\,d\Omega,\qquad
B=\nabla_s N,\qquad
K=\int_\Omega B^\top \mathbb{C}B\,d\Omega
$$

$$
f(t)=\int_\Omega N^\top b\,d\Omega+\int_{\Gamma_t}N^\top \tau\,d\Gamma
$$

$$
M\ddot{q}+Kq=f(t)
$$

## 3. Dissipation In Same Variational Frame

前提条件: 線形粘性減衰を Rayleigh 散逸関数で与える。

$$
\mathcal{R}(\dot{q})=\frac{1}{2}\dot{q}^\top C\dot{q}
$$

$$
M\ddot{q}+C\dot{q}+Kq=f(t)
$$

## 4. Discrete Hamiltonian

前提条件: $M$ は正則。

$$
p:=\frac{\partial L}{\partial \dot{q}}=M\dot{q}
$$

$$
H(q,p)=\frac{1}{2}p^\top M^{-1}p+\frac{1}{2}q^\top Kq
$$

## 5. Hamiltonian Form (Conservative Part)

前提条件: まず保存系（$C=0$）を考える。

$$
\dot{q}=M^{-1}p,\qquad
\dot{p}=-Kq+f(t)
$$

$$
z=
\begin{pmatrix}
q\\
p
\end{pmatrix},
\qquad
\dot{z}=J\nabla H(z)+Gu
$$

$$
J=
\begin{pmatrix}
0&I\\
-I&0
\end{pmatrix},
\qquad
G=
\begin{pmatrix}
0\\
I
\end{pmatrix},
\qquad
u=f(t)
$$

## 6. Port-Hamiltonian Form (With Dissipation)

前提条件: $C\succeq 0$ を満たす受動的減衰を導入する。

$$
\dot{z}=(J-R)\nabla H(z)+Gu
$$

$$
R=
\begin{pmatrix}
0&0\\
0&C
\end{pmatrix},
\qquad
R\succeq 0
$$

$$
y=G^\top \nabla H(z),\qquad
\dot{H}=-(\nabla H)^\top R\nabla H+y^\top u
$$

## 7. Time Discretization (Explicit Central Difference)

前提条件: 線形系を時刻 $t_n=n\Delta t$ で離散化する。

$$
\ddot{q}_n\approx \frac{q_{n+1}-2q_n+q_{n-1}}{\Delta t^2},\qquad
\dot{q}_n\approx \frac{q_{n+1}-q_{n-1}}{2\Delta t}
$$

$$
\left(\frac{1}{\Delta t^2}M+\frac{1}{2\Delta t}C\right)q_{n+1}
=
f_n
-
\left(K-\frac{2}{\Delta t^2}M\right)q_n
-
\left(\frac{1}{\Delta t^2}M-\frac{1}{2\Delta t}C\right)q_{n-1}
$$

## 8. Why Mass Lumping Enables Explicit Update

前提条件: 毎ステップで逆行列作用を高速に評価したい。

$$
M\to M_{\mathrm{lumped}}\approx \mathrm{diag}(m_1,\dots,m_n)
$$

## 9. Stability Condition From Spectrum

前提条件: 無外力・無減衰の線形系 $M\ddot{q}+Kq=0$ を対象とする。

$$
K\phi=\lambda M\phi,\qquad
\omega_i=\sqrt{\lambda_i}
$$

$$
\Delta t\le \frac{2}{\omega_{\max}}
=
\frac{2}{\sqrt{\lambda_{\max}(M^{-1}K)}}
$$

## 10. Optimization Enters As Matrix Design

前提条件: 設計変数 $\theta$ によって離散モデルの行列が変化する。

$$
M(\theta),\ C(\theta),\ K(\theta)
$$

$$
\hat{q}(\omega)=
\left(K(\theta)+i\omega C(\theta)-\omega^2M(\theta)\right)^{-1}
\hat{f}(\omega)
$$

$$
\min_\theta J(\theta),\qquad
J(\theta)=\sup_{\omega\in\Omega_\omega}\left\|W\hat{q}(\omega)\right\|
$$

## 11. pH-Constrained Optimization (Passivity-Preserving)

前提条件: 受動性を設計制約として課す。

$$
R(\theta)\succeq 0
\Rightarrow
\dot{H}=-(\nabla H)^\top R(\theta)\nabla H+y^\top u
$$

## 12. One-Line Chain

$$
\text{Action}
\Rightarrow
\text{Weak Form}
\Rightarrow
\text{FEM }(M,C,K)
\Rightarrow
\text{port-Hamiltonian}
\Rightarrow
\text{Time Integrator}
\Rightarrow
\text{Stability Bound}
\Rightarrow
\text{Optimization}
$$

## Notes

- 変分原理は連続体モデルの一貫した導出規則を与える。
- FEM は変分問題の有限次元射影として $M,C,K$ を生成する。
- pH 形式はエネルギー収支を明示し、設計制約の形を与える。
- 陽解法の安定限界は固有値問題で決まり、解析と設計が同じ線形代数に集約される。
