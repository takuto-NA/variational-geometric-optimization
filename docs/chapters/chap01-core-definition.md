---
title: "Chapter 1: Core Definition"
---

## 1.1 Definition

### Definition (variational geometric optimization)

**変分的幾何最適化（Variational Geometric Optimization; VGO）**とは、次のデータで記述される枠組みを指す。

- **対象**: 多様体または関数空間 $\mathcal M$
- **汎関数**: $\mathcal F:\mathcal M\to\mathbb R$
- **幾何**: 計量 $G$（対称正定値）および反対称構造 $J$（反対称）
- **目的**: $\mathcal F$ の停留構造（停留点とその近傍の局所力学）を、$G,J$ に基づいて記述・計算する

本書では「最適化」を狭義の極小化手続きに限定せず、
停留点の構造を数値的に扱う観点を含めて用いる。

本書は「多様体／関数空間」を扱うため、**一次変分は基本的に共ベクトル**として表す。
以後の章では、次を本書の規約として用いる：

- **微分（一次変分）**: $d\mathcal F(x)\in T_x^*\mathcal M$。双対積 $\langle\cdot,\cdot\rangle$ により
  $\delta \mathcal F(x)[v]=\langle d\mathcal F(x),v\rangle$ と書く。
- **$G$-勾配**: $\mathrm{grad}_G\mathcal F(x)\in T_x\mathcal M$（$d\mathcal F$ を計量で同一視した“ベクトル”）。
- **$\nabla\mathcal F$**: 基本的には **ユークリッド空間 $\mathbb R^n$ の座標表示**でのみ用いる（そこで $d\mathcal F$ と同一視できる）。

用語の最小定義は [Glossary](../glossary) にまとめる。

## 1.2 変分（一次・二次）と「勾配」の意味

### Definition (first variation)

$x\in\mathcal M$ における一次変分（first variation）を、接ベクトル $v\in T_x\mathcal M$ への線形作用として

$$
\delta \mathcal F(x)[v]
$$

と書く（$\delta \mathcal F(x)$ は共変ベクトル＝1-形式だと思えばよい）。

計量 $G(x)$ は「共変ベクトル（一次変分）を、どのベクトルとして表現するか」を決める。
すなわち、内積 $\langle\cdot,\cdot\rangle_{G(x)}$ を用いて

$$
\delta \mathcal F(x)[v] = \langle \mathrm{grad}_G \mathcal F(x),\, v\rangle_{G(x)}
$$

を満たす $\mathrm{grad}_G\mathcal F(x)\in T_x\mathcal M$ を **（$G$-）勾配**と呼ぶ。
有限次元ユークリッド空間で座標表示すると、よく見る形

$$
\mathrm{grad}_G \mathcal F(x) = G(x)^{-1}\,\nabla \mathcal F(x)
$$

として書ける（Chapter 3 の一般式の $G^{-1}\nabla\mathcal F$ がこれ）。

### Definition (second variation)

停留点近傍の力学を決めるのは二次変分（second variation）である。
有限次元では Hessian $\nabla^2\mathcal F(x)$、関数空間では線形化作用素（弱形式を含む）として現れる。

## 1.3 Remark

本枠組みが同時に扱う主題は次である。

- **停留点**: 必ずしも極小点に限らない
- **流れ**: 停留点へ“収束する”場合と、停留点の周りを“回転する”場合を含む
- **幾何**: 勾配・保存量・安定性が、選択した計量 $G$・構造 $J$ に依存して決まる

## 1.4 統一的な流れ（先取り）

### Proposition (general form; preview)

本書で中心となる一般形は

$$
\dot x
=
-K(x)\,d\mathcal F(x)
\;+\;
J(x)\,d\mathcal F(x)
$$

である（完全版は Chapter 3）。ここで $K:T_x^*\mathcal M\to T_x\mathcal M$ は対称（通常は半正定）な散逸写像、$J:T_x^*\mathcal M\to T_x\mathcal M$ は反対称（skew-adjoint）な保存構造である。

- $J=0$ なら散逸（勾配流）で、典型的に $\mathcal F$ は単調減少する。
- $G=0$ なら保存（Hamilton 型）で、典型的に $\mathcal F$ は保存量として振る舞う。
- 両方を入れると減衰振動のように「収束」と「回転」が混ざる。

ユークリッド空間で $d\mathcal F\simeq \nabla\mathcal F$ と同一視し、さらに $K=G^{-1}$ と書ける場合は

$$
\dot x = -G^{-1}(x)\,\nabla\mathcal F(x) + J(x)\,\nabla\mathcal F(x)
$$

となる。

## 1.5 Example（最小）

### Example (Euclidean space)

$\mathcal M=\mathbb R^n$、$\mathcal F(x)=\frac12\|x\|^2$、$G=I$、$J=0$ とすると

$$
\dot x = -x
$$

となり原点へ収束する。

### Example (rotation + dissipation)

$n=2$ で

$$
J=\begin{pmatrix}0&-1\\1&0\end{pmatrix}
$$

とすると

$$
\dot x = -x + Jx
$$

で、原点に向かって回転しながら収束する（減衰振動の最小モデル）。

## 1.6 Summary

本書の中心的主張は、勾配流・Newton 型条件・Hamilton 型保存流・制約付き（KKT）サドル点構造が、
同一の汎関数 $\mathcal F$ とその変分（一次・二次）から統一的に記述できる、という点にある。

次章以降で、最小構成要素（[Chapter 2](./chap02-minimal-ingredients)）と統一式（[Chapter 3](./chap03-general-equation)）を明示し、
停留点近傍の線形化（[Chapter 4](./chap04-stationary-points)）と手法地図（[Chapter 5](./chap05-methods-map)）へ接続する。

