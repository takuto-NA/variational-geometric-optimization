---
title: "Physics: Harmonic Oscillator (Hamiltonian)"
---

## Problem

調和振動子を Hamilton 系として記述する。

状態 $(q,p)$ に対して Hamiltonian

$$
\mathcal F(q,p) = H(q,p)=\frac{1}{2}p^2+\frac{1}{2}\omega^2 q^2
$$

## Functional

ここでは $\mathcal F$ を保存量（エネルギー）として用い、
狭義の「最小化」ではなく Hamilton 流を生成する。

## Geometry (G, J)

散逸を切って $G=0$、反対称構造を

$$
J=
\begin{pmatrix}
0 & 1\\
-1 & 0
\end{pmatrix}
$$

と取ると

$$
\begin{pmatrix}\dot q\\ \dot p\end{pmatrix}
=
J\nabla H
$$

が得られる。

## Discretization

- 時間積分（幾何学的にはシンプレクティック積分がよく使われる）

## Algorithm

- 本書の統一式の「保存・回転」側の典型例
- 停留点（$q=p=0$）の周りで回る

## Notes

同じ $H$ でも、散逸項を加えると減衰振動（混合流）になる。

