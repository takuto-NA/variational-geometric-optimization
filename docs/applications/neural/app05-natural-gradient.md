---
title: "Neural: Natural gradient as a choice of metric G"
---

> このページで主に触る knob: Geometry。計量 $G$。Algorithm。自然勾配。Space。パラメータ化の不変性

## Problem

パラメータ $\theta$ を持つ確率モデルを考える。
観測 $y$ に対して損失 $\mathcal F(\theta)$ を最小化したい。

$$
\theta^*=\arg\min_\theta\ \mathcal F(\theta)
$$

ニューラルネットは $p_\theta(y\mid x)$ のような条件付き分布を表現する器として出てくる。

## Functional

代表例は負の対数尤度である。

$$
\mathcal F(\theta)
:=
\mathbb E_{(x,y)\sim\mathcal D}\big[-\log p_\theta(y\mid x)\big].
$$

## Geometry (G, J)

- $J=0$。散逸側として扱う
- $G$: Euclid を既定にすると更新は $\theta_{k+1}=\theta_k-\eta\nabla\mathcal F$ になる

自然勾配は計量の選び方として導入する。
Fisher 情報を

$$
G(\theta)
:=
\mathbb E\big[\nabla_\theta \log p_\theta(y\mid x)\ \nabla_\theta \log p_\theta(y\mid x)^\top\big]
$$

と置くと、自然勾配の更新は

$$
\Delta\theta = -\eta\,G(\theta)^{-1}\nabla_\theta\mathcal F(\theta)
$$

になる。
この形は一次変分の共ベクトルを、計量でベクトルへ翻訳するという VGO の翻訳層そのものである。

## Discretization

実装では Fisher を厳密に構成せず、近似で運用することが多い。

- ミニバッチで期待値を近似する
- 低ランクや対角近似で計算量を下げる

これは Geometry の近似であり、Algorithm と一体で設計する。

## Algorithm

自然勾配は次の選択肢群として理解できる。

- Fisher を明示して線形方程式を解く
- 近似 Fisher を前処理として使う
- 実務上は Adam も近い役割を持つが、Fisher 由来の不変性を保証するものではない

## Notes

- **重要度**: 学習則は Algorithm だけでなく Geometry の選択として整理できる
- **実装難易度**: 中から高。Fisher の近似と線形ソルバが要る
- **実装リスク**: 近似が粗いと不安定になりやすい。スケールと正則化の設計が重要になる
