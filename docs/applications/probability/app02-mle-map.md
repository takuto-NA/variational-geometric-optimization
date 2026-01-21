---
title: "Probability: MLE / MAP as VGO"
---

## Problem

観測データ $y=\{y_i\}_{i=1}^N$ と確率モデル $p(y\mid\theta)$ が与えられたとき、未知パラメータ $\theta$ を推定したい。
加えて事前分布 $p(\theta)$ がある場合は、事後 $p(\theta\mid y)$ に基づく推定（MAP や分布推定）を行いたい。

## Functional

最尤推定（MLE）は **負の対数尤度** 最小化として

$$
\theta_{\mathrm{MLE}}
=\arg\min_\theta\ \mathcal F(\theta),
\qquad
\mathcal F(\theta):=-\sum_{i=1}^N\log p(y_i\mid\theta).
$$

事前分布を入れた MAP は **負の対数事後** 最小化として

$$
\theta_{\mathrm{MAP}}
=\arg\min_\theta\ \mathcal F_{\mathrm{MAP}}(\theta),
\qquad
\mathcal F_{\mathrm{MAP}}(\theta):=
-\sum_{i=1}^N\log p(y_i\mid\theta) - \log p(\theta).
$$

Remark: MAP は「データ項 + 正則化」と同型で、正則化の幾何（例えば $\ell_2$ か、$\mathrm{SPD}(n)$ 上のバリアか）は Space/Functional の設計に分離できる。

## Geometry (G, J)

- **$J$**: 推定は基本的に散逸側でよいので $J=0$ が標準。
- **$G$**: $\theta$ の座標化に依らない更新を狙うなら、Fisher 情報

$$
G(\theta)=\mathbb E_{y\sim p(\cdot\mid\theta)}\big[\nabla_\theta\log p(y\mid\theta)\,\nabla_\theta\log p(y\mid\theta)^\top\big]
$$

を計量として採用し、自然勾配

$$
\dot\theta = -G(\theta)^{-1}\nabla_\theta \mathcal F(\theta)
$$

を VGO の「幾何（前処理）」として読む。

Remark: Newton 法は Hessian を使う二次情報、自然勾配は計量（Riesz 写像）としての二次情報、という区別で整理できる。

## Discretization

- **データの離散化**: $\sum_{i=1}^N$ はそのまま有限和。大規模ならミニバッチで確率近似（SGD 系）に落とす。
- **制約/多様体**:
  - 分散・共分散のような制約（$\sigma^2>0$、$P\in\mathrm{SPD}(n)$）は、空間 $\mathcal M$ を最初から制約付きに取る（例：$\mathrm{SPD}(n)$）か、再パラメータ化で吸収する。

## Algorithm

代表的には次の「停留構造の満たし方」を選ぶ。

- **一次情報**: 勾配法、確率勾配法（SGD/Adam）。VGO 的には $G=I$ の勾配流。
- **幾何（前処理）**: 自然勾配（$G=$ Fisher）、準 Newton（L-BFGS など）。
- **二次情報**: Newton/Gauss-Newton（最小二乗構造が強いときに安定）。
- **分布推定（関連）**: 事後分布そのものが欲しい場合は、変分推論（VI）として
  $\mathrm{KL}(q_\phi(\theta)\,\|\,p(\theta\mid y))$ 最小化へ拡張する（`app01-variational-inference`）。

## Notes

- **重要度**: MLE/MAP は「確率推定を汎関数最小化へ落とす」最小例で、BO（ハイパーパラメータ推定）やカルマン（逐次 MAP）にも直結する。
- **実装難易度**: 低〜中（AD と最適化ライブラリが使える）。ただし Fisher（自然勾配）や制約多様体を真面目に扱うと一段上がる。
- **実装リスク**: 目的関数の曲率の悪さ（スケール差、識別不能）で収束が不安定になりやすい。VGO では $G$（前処理/計量）と Space（制約の置き方）で対処する。
