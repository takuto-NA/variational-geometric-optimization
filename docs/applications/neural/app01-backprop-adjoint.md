---
title: "Neural: Backprop = Adjoint = reverse-mode AD"
---

> このページで主に触る knob: Algorithm。reverse-mode AD / VJP。Discretization。計算グラフ。Geometry。スケーリング/前処理

## Problem

教師あり学習を最小の形で書く。
データ $(x,y)\sim \mathcal D$、モデル $f_\theta$、損失 $\ell$ に対して、パラメータ $\theta$ を学習する。

$$
\theta^*=\arg\min_\theta\ \mathcal F(\theta)
$$

## Functional

典型例は「経験損失 + 正則化」：

$$
\mathcal F(\theta)
:=
\mathbb E_{(x,y)\sim\mathcal D}\big[\ell(f_\theta(x),y)\big]
\;+\;\lambda\,\Omega(\theta).
$$

ミニバッチ学習は上の期待値の近似として読める。

## Geometry (G, J)

- $J=0$。通常の学習は散逸側として扱う
- $G$: 既定は Euclid。$G=I$。ただし実装上は
  - パラメータのスケーリング
  - Adam/RMSProp のような座標ごとの前処理  
  が **翻訳層**として効く。共ベクトルから更新ベクトルへの変換に相当する  
  参照: [第2章 2.3](../../chapters/chap02-minimal-ingredients#2-3-計量と勾配translation-layer), [第8章 8.1](../../chapters/chap08-implementation#8-1-抽象から実装へ翻訳のトレースtrace)

## Discretization

ニューラルネットワークの「深さ」は、変分計算の観点では **合成写像の離散化**として読める。
例えば $L$ 層のネットワークは

$$
h_{k+1}=\Phi_k(h_k;\theta_k),\qquad k=0,\dots,L-1
$$

という離散力学で、最終出力 $h_L$ から損失が定義される。計算グラフとして実装される

## Algorithm

Backprop は随伴法の離散版であり、reverse-mode AD と同型である。

- forward: 計算グラフを順に評価して中間状態 $h_k$ を得る
- backward: 末端から共変数を伝搬して、$\nabla_\theta \mathcal F$ を得る

VGO の言葉では、backward が計算しているのは

- 一次変分 $d\mathcal F$。共ベクトル
- その成分としての VJP。vector-Jacobian product

である。更新方向のベクトルにするには $G^{-1}$ による前処理が必要になる。

## Notes

- **重要度**: 「勾配をどう計算するか」は VGO の Algorithm の最小仕様に直結する。AD の読み替え
- **実装難易度**: 低。フレームワークが reverse-mode AD を提供する
- **実装リスク**: スケーリングと数値安定で破綻しやすい。学習率・初期化、勾配爆発/消失、混合精度など  
  ここは $G$。前処理の設計問題として整理できる

