---
title: "Applications: Probability"
---

本章は 確率・推定・情報幾何 の応用例を収録する。

## まず読む（VGO 枠組み）

- [app02-mle-map](./app02-mle-map)（MLE/MAP：負の対数尤度/事後を汎関数として最小化）
- [app01-variational-inference](./app01-variational-inference)（VI：分布多様体 + Fisher 計量の最小例）
- [app03-kalman-filter](./app03-kalman-filter)（カルマン：逐次 MAP と二次汎関数最小化の同型）
- [app04-bayesian-optimization](./app04-bayesian-optimization)（BO：推論と設計が結合した二重の VGO）

## VGO の見取り図：推定を「汎関数の停留構造」として書く

確率推論の多くは、パラメータ $x$（モデルパラメータ、状態、あるいは分布そのもの）に対して

$$
x^* = \arg\min_{x\in\mathcal M}\ \mathcal F(x)
$$

という形で統一できる。VGO では、このときの設計自由度（knobs）を次の 4 つに分けて扱う：

- **Space**: $x$ が住む空間 $\mathcal M$（例：$\mathbb R^n$、SPD 行列多様体、確率分布多様体）
- **Functional**: $\mathcal F$（典型例：負の対数尤度、負の対数事後、KL、二乗誤差）
- **Geometry**: 一次変分をどうベクトル化するか（例：Fisher 計量＝自然勾配、Wasserstein、Euclid）
- **Algorithm**: 何を回すか（例：Newton/Gauss-Newton、自然勾配、変分法、逐次更新）

以下では代表例をこの「同じ型」で眺める。

## 最尤推定（MLE）

観測 $y$ とモデル $p(y\mid \theta)$ があるとき、最尤推定は

$$
\theta_{\mathrm{MLE}}
= \arg\max_\theta\ p(y\mid\theta)
= \arg\min_\theta\ \underbrace{-\log p(y\mid\theta)}_{\mathcal F(\theta)}
$$

と書ける。

- **Space**: $\theta\in\mathbb R^d$ だけでなく、分散や共分散なら $\theta\in\mathrm{SPD}(n)$ など（制約＝空間の選び方）
- **Functional**: $\mathcal F(\theta)=-\log p(y\mid\theta)$（データ項）
- **Geometry**: Euclid 勾配でも良いが、統計モデルでは Fisher 情報 $G(\theta)$ による自然勾配 $G^{-1}\nabla\mathcal F$ が「再パラメータ化に強い」標準選択になりやすい
- **Algorithm**: 勾配法／Newton／（大規模なら）Gauss-Newton・準 Newton・確率近似

Remark: $\nabla^2\mathcal F$ は（正則条件下で）Fisher 情報に近く、Hessian/計量のどちらを使うかは「幾何（preconditioning）」の設計問題として整理できる。

## ベイズ推定（MAP / 事後推論 / 変分近似）

事前分布 $p(\theta)$ を入れると、事後は $p(\theta\mid y)\propto p(y\mid\theta)p(\theta)$。
MAP は

$$
\theta_{\mathrm{MAP}}
= \arg\max_\theta\ p(\theta\mid y)
= \arg\min_\theta\ \underbrace{-\log p(y\mid\theta) - \log p(\theta)}_{\mathcal F(\theta)}
$$

で、**データ項 + 正則化（事前）** の形になる。

一方、事後分布そのものを扱うなら、近似族 $q_\phi(\theta)$ 上で

$$
\phi^* = \arg\min_\phi\ \mathrm{KL}\!\left(q_\phi(\theta)\ \|\ p(\theta\mid y)\right)
$$

のように「分布を変数とする最適化（確率分布多様体上の問題）」になる。

- **Space**: $\theta$（点推定） or $q_\phi$（分布推定）
- **Functional**: 負の対数事後（MAP） or KL/ELBO（分布近似）
- **Geometry**: Fisher 計量（自然勾配）を入れると情報幾何がそのまま VGO の $G$ になる
- **Algorithm**: MAP は最適化、分布近似は VI（サンプリング＋AD、reparameterization など）

関連：VI を最小例としてまとめたページは `app01-variational-inference` を参照。

## カルマンフィルタ（線形ガウスの逐次ベイズ推論）

線形ガウス状態空間モデル

$$
x_{t+1}=Ax_t+w_t,\quad y_t=Hx_t+v_t,\quad w_t\sim\mathcal N(0,Q),\ v_t\sim\mathcal N(0,R)
$$

では、フィルタリング事後 $p(x_t\mid y_{1:t})$ はガウス $\mathcal N(m_t,P_t)$ に閉じる。
この更新は「逐次ベイズ」でもあり、同時に「毎時刻の二次汎関数の最小化」としても書ける：

$$
x_t^*=\arg\min_{x_t}\ 
\tfrac12\|y_t-Hx_t\|_{R^{-1}}^2
\;+\;
\tfrac12\|x_t-m_{t\mid t-1}\|_{P_{t\mid t-1}^{-1}}^2
$$

- **Space**: 状態 $x_t\in\mathbb R^n$（あるいはガウス族のパラメータ $(m_t,P_t)$）
- **Functional**: 二次（データ整合 + 予測整合）
- **Geometry**: $R^{-1},P^{-1}$ は「自然な重み（計量）」として現れ、情報フィルタでは精度行列が主役になる
- **Algorithm**: 逐次（online）更新。非線形拡張（EKF/UKF）やスムージングは、離散化と近似の設計問題として VGO の箱に入る

Remark: 「カルマン＝推論アルゴリズム」という見方に加えて、「逐次最小二乗（最適化）」として書けるのが VGO 的に重要。

## ベイズ最適化（BO）

高価なブラックボックス目的関数 $f(x)$ を最小化したい：

$$
x^*=\arg\min_{x\in\mathcal X} f(x)
$$

BO は $f$ に確率モデル（典型的には GP）を置き、データ $D_t=\{(x_i,f(x_i))\}_{i\le t}$ から事後 $p(f\mid D_t)$ を更新し、
獲得関数 $a_t(x)$ を最大化して次の評価点を決める：

$$
x_{t+1}=\arg\max_{x\in\mathcal X} a_t(x)\quad(\text{例：EI, UCB, TS})
$$

VGO の観点では、BO は少なくとも 2 つの最適化が結合した問題として見える：

- **（推論）**: $p(f\mid D_t)$ やハイパーパラメータを MLE/MAP で更新（上の MLE/ベイズ推定がそのまま入る）
- **（設計）**: $a_t(x)$ の（制約つき）最適化（$\mathcal X$ が多様体・混合離散・安全制約あり等）

Geometry の例：$\mathcal X$ が物理パラメータ空間（制約つき）なら、その制約を空間 $\mathcal M$ として吸収し、必要なら計量 $G$ による前処理（スケーリング不変性）を入れる。

## 追加テンプレ

- [app00-template](./app00-template)
- [app01-variational-inference](./app01-variational-inference)
- [app02-mle-map](./app02-mle-map)
- [app03-kalman-filter](./app03-kalman-filter)
- [app04-bayesian-optimization](./app04-bayesian-optimization)

