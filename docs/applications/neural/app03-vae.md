---
title: "Neural: VAE as variational inference with neural parameterization"
---

> このページで主に触る knob: Space。分布族と推論ネットワーク。Functional。ELBO。Geometry。Fisher と自然勾配。Algorithm。SGD と reparameterization

## Problem

観測 $x$ に対して潜在変数 $z$ を導入した生成モデルを考える。

$$
p_\theta(x,z)=p_\theta(x\mid z)\,p(z)
$$

観測データ集合 $x\sim\mathcal D$ の下で、パラメータ $\theta$ を推定したい。
ただし事後分布 $p_\theta(z\mid x)$ は一般に扱いにくいので、近似分布 $q_\phi(z\mid x)$ を導入する。

## Functional

VAE は変分推論であり、目的は ELBO 最大化である。
本書の統一言語では負の ELBO を最小化する。

$$
\mathcal F(\theta,\phi)
:=
\mathbb E_{x\sim\mathcal D}\Big[
-\mathbb E_{z\sim q_\phi(\cdot\mid x)}\big[\log p_\theta(x\mid z)\big]
\;+\;\mathrm{KL}\big(q_\phi(z\mid x)\,\|\,p(z)\big)
\Big].
$$

## Geometry (G, J)

- $J=0$。散逸側として扱う
- $G$: 既定は Euclid だが、分布側を主役に置くなら Fisher 計量が自然に現れる  
  その結果、自然勾配は $G^{-1}\nabla \mathcal F$ として統一式に入る

## Discretization

- 期待値はミニバッチとサンプルで近似する
- $q_\phi(z\mid x)$ のサンプルは reparameterization trick を用いて勾配推定の分散を下げる

## Algorithm

最小構成は次である。

- 損失をスカラー $\mathcal F(\theta,\phi)$ として実装する
- reverse-mode AD で $\nabla_\theta\mathcal F,\nabla_\phi\mathcal F$ を得る
- SGD 系で更新する

VGO の読み替えでは、AD が返す一次変分は共ベクトルであり、最終的な更新方向は $G$ の選択で決まる。

## Notes

- **重要度**: ニューラルネットは Space の具体化であり、VAE は Probability 章の VI と Neural 章を直結する
- **実装難易度**: 中。生成モデルと推論モデルを同時に学習する
- **実装リスク**: 潜在変数が使われない問題や不安定な学習が起きやすい。損失のスケールと前処理の設計が効く

