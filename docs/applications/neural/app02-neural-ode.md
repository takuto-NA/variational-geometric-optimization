---
title: "Neural: Neural ODE (continuous depth)"
---

> このページで主に触る knob: Space。関数空間としての軌道。Discretization。ODE ソルバ。Algorithm。随伴/最適制御。Geometry。剛性・安定性

## Problem

Neural ODE は「層の離散列」を「連続時間の力学系」で置き換える。
状態 $z(t)\in\mathbb R^n$ とパラメータ $\theta$ に対して

$$
\dot z(t)=f_\theta(z(t),t),\qquad z(0)=z_0(x)
$$

を解き、観測 $y$ に対する損失を最小化する。

## Functional

最小形は

$$
\mathcal F(\theta)
:=
\mathbb E_{(x,y)\sim\mathcal D}\Big[\ell\big(g(z(T)),y\big)\Big]
\;+\;\lambda\,\Omega(\theta).
$$

$g$ は読み出し、$\Omega$ は正則化である。

## Geometry (G, J)

- $J=0$。学習は散逸側として扱う
- $G$: 既定は Euclid だが、Neural ODE では
  - ソルバの誤差制御。相対/絶対許容誤差
  - 時間方向のスケーリング  
  が実質的な前処理として効く。同じ $\theta$ でも更新の見え方が変わる

## Discretization

連続時間モデルは、実装では必ず **時間離散**される：

$$
z_{k+1} = \Psi_{\Delta t}\big(z_k;\theta\big)
$$

ここで $\Psi_{\Delta t}$ は Euler / RK / implicit 法などの 1 ステップ写像。
この選択は「モデル」ではなく「離散化」という knob だが、学習の安定性・計算量・微分可能性を直接支配する。

## Algorithm

勾配計算は 2 通りに読める：

- **離散化してから reverse-mode AD**。計算グラフとして backprop
- **連続の随伴方程式**。adjoint method を立ててから離散化

どちらも制約付き最適化を解いているという点で、最適制御と同型になる。参照: [応用: 制御](../control/)

## Notes

- **重要度**: 「連続深さ」は VGO の Space/Discretization の違いがそのまま見える最小例。
- **実装難易度**: 中。ソルバ選択・感度解析・メモリ/計算のトレードオフ
- **実装リスク**: 剛性や誤差制御により勾配が不安定になりやすい。まずは「離散化→reverse-mode AD」を基準に置き、必要に応じて随伴法へ移るのが安全

