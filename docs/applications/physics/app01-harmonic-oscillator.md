---
title: "Physics: Harmonic Oscillator (Variational & Hamiltonian)"
---

## 1. Single DOF Harmonic Oscillator (Conservative)

### Variational Formulation (Lagrangian)
解析力学の視点では、運動は作用積分（Action Functional）の停留点として記述される。
簡単のため質量 $m=1$ とし、バネ定数を $k=\omega^2$ （$\omega$ は固有角振動数）と置く。
位置 $q(t)$ と速度 $\dot{q}(t)$ に対して Lagrangian $L$ を定義する。

$$
L(q, \dot{q}) = T(\dot{q}) - V(q) = \frac{1}{2}\dot{q}^2 - \frac{1}{2}\omega^2 q^2
$$

作用積分 $S[q]$ は以下の時間積分で与えられる。

$$
S[q] = \int_{t_0}^{t_1} L(q, \dot{q}) \, dt = \int_{t_0}^{t_1} \left( \frac{1}{2}\dot{q}^2 - \frac{1}{2}\omega^2 q^2 \right) dt
$$

Hamilton の原理（最小作用の原理）$\delta S = 0$ より、Euler-Lagrange 方程式が得られる。

$$
\frac{d}{dt}\left(\frac{\partial L}{\partial \dot{q}}\right) - \frac{\partial L}{\partial q} = 0 \implies \ddot{q} + \omega^2 q = 0
$$

### Geometric Formulation (Hamiltonian)
Legendre 変換 $p = \frac{\partial L}{\partial \dot{q}} = \dot{q}$ により Hamiltonian $H$ を導入すると、幾何学的な構造が明確になる。

$$
H(q,p) = p\dot{q} - L = \frac{1}{2}p^2 + \frac{1}{2}\omega^2 q^2
$$

シンプレクティック形式（Poisson 括弧）による発展方程式：

$$
\begin{pmatrix}\dot q\\ \dot p\end{pmatrix}
= J \nabla H 
= \begin{pmatrix} 0 & 1 \\ -1 & 0 \end{pmatrix} \begin{pmatrix} \omega^2 q \\ p \end{pmatrix}
$$

---

## 2. Damped Harmonic Oscillator (Dissipative)

### Variational Formulation (Lagrange-d'Alembert)
散逸系（非保存系）の場合、単純な作用積分の最小化では記述できないが、Lagrange-d'Alembert の原理（積分形式）を用いるときれいに記述できる。
仮想仕事 $\delta W$ を導入し、変分原理を拡張する。

$$
\delta \int_{t_0}^{t_1} L(q, \dot{q}) \, dt + \int_{t_0}^{t_1} \delta W \, dt = 0
$$

ここで、粘性抵抗による仮想仕事は $\delta W = -\gamma \dot{q} \delta q$ と表される。これを展開すると：

$$
\int_{t_0}^{t_1} \left( \frac{\partial L}{\partial q} \delta q + \frac{\partial L}{\partial \dot{q}} \delta \dot{q} - \gamma \dot{q} \delta q \right) dt = 0
$$

部分積分により $\delta \dot{q}$ を処理すると、以下の運動方程式が導かれる。

$$
\frac{d}{dt}\left(\frac{\partial L}{\partial \dot{q}}\right) - \frac{\partial L}{\partial q} = -\gamma \dot{q} \implies \ddot{q} + \gamma \dot{q} + \omega^2 q = 0
$$

### Geometric Formulation (Dissipative Metric)
この散逸構造は、幾何学的には計量 $G$ を用いて記述される。

$$
\dot{x} = (J - G)\nabla H, \quad 
G = \begin{pmatrix} 0 & 0 \\ 0 & \gamma \end{pmatrix}
$$

積分形式での「仮想仕事項」が、幾何学的形式での「散逸計量 $G$」に対応している。

---

## 3. Two-DOF Coupled Oscillator

### Variational Formulation
2自由度系 $q = (q_1, q_2)$ の場合も、作用積分 $S$ はスカラー量として簡潔に書ける。

$$
S[q] = \int_{t_0}^{t_1} \left[ \underbrace{\frac{1}{2}(\dot{q}_1^2 + \dot{q}_2^2)}_{T} - \underbrace{\left( \frac{1}{2}k_1 q_1^2 + \frac{1}{2}k_2 q_2^2 + \frac{1}{2}k_{12}(q_1 - q_2)^2 \right)}_{V} \right] dt
$$

変分 $\delta S = 0$ をとることで、連成された運動方程式が一挙に導かれる。解析力学的な記述の利点は、自由度が増えても $L$ (スカラ) の定義を変えるだけで済む点にある。

### Geometric Formulation
幾何学的には、状態空間が4次元になり、ブロック行列による構造を持つ。

$$
\dot{x} = (J_4 - G_4)\nabla H
$$

---

## 4. Vibration Control (Optimal Control View)

### Variational Formulation (Objective Functional)
制振制御は、ある評価汎関数 $J_{cost}$ の最小化問題として定式化できる（最適制御）。

$$
J_{cost} = \int_{0}^{\infty} \left( q^T Q q + \dot{q}^T R \dot{q} + u^T S u \right) dt
$$

これを最小化する制御入力 $u(t)$ を求めることは、変分法における Euler-Lagrange 方程式（あるいは Hamiltonian 系の随伴方程式）を解くことに帰着する。
幾何学的には、この最適制御によって閉ループ系に「望ましい散逸構造 $G_{opt}$」が埋め込まれると解釈できる。
