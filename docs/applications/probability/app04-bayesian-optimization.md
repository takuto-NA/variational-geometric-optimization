---
title: "Probability: Bayesian Optimization (BO) as Coupled VGO"
---

## Problem

評価が高価なブラックボックス目的関数 $f:\mathcal X\to\mathbb R$ を、できるだけ少ない評価回数で最小化したい：

$$
x^*=\arg\min_{x\in\mathcal X} f(x).
$$

観測はノイズ付き $y=f(x)+\epsilon$ とする（実験・シミュレーション・探索）。

## Functional

BO は「推論（surrogate の事後更新）」と「設計（次点の選択）」が結合した手続きとして定式化できる。

### (A) 推論：surrogate の学習（MLE/MAP）

典型的にはガウス過程（GP）事前 $f\sim\mathcal{GP}(m_\eta,k_\eta)$ を置き、ハイパーパラメータ $\eta$ を

$$
\eta^*=\arg\min_\eta\ \mathcal F_{\mathrm{GP}}(\eta)
=\arg\min_\eta\ \big(-\log p(y_{1:t}\mid x_{1:t},\eta) - \log p(\eta)\big)
$$

として推定する（MLE/MAP）。

### (B) 設計：獲得関数の最適化

事後 $p(f\mid D_t)$（または予測分布）から獲得関数 $a_t(x)$（EI/UCB/TS 等）を構成し、

$$
x_{t+1}=\arg\max_{x\in\mathcal X} a_t(x)
$$

として次の評価点を決める。

Remark: BO は $\eta$ と $x$ の 2 つの最適化が「交互に」現れる。VGO ではそれぞれを別の箱（推論の VGO / 設計の VGO）として切り分けて扱える。

## Geometry (G, J)

- **$J$**: どちらの最適化も基本は散逸側なので $J=0$。
- **$G$**:
  - **推論側**: $\eta$ の更新は MLE/MAP と同様に、自然勾配（Fisher）や二次法（Newton/準 Newton）で前処理できる。
  - **設計側**: $\mathcal X$ が制約付き・多様体・混合離散なら、Space を $\mathcal M$ として取り直し、計量 $G$（スケーリング/単位系）で探索を安定化させる。

## Discretization

- **データの離散化**: $D_t=\{(x_i,y_i)\}_{i=1}^t$ は逐次に増える。
- **近似**:
  - 高次元では GP の計算が重いので、低ランク近似・ランダム特徴・局所モデル等が入る（Functional の近似）。
  - 獲得関数最適化は多峰性になりやすく、マルチスタート・バッチ化・信頼領域（TR）などの設計が実務上重要。

## Algorithm

BO の反復は概ね次の形になる。

- **(1) surrogate 更新**: GP の事後（＋必要なら $\eta$ の MLE/MAP）を更新
- **(2) acquisition 最適化**: $x_{t+1}=\arg\max a_t(x)$ を（制約つき）で解く
- **(3) 評価**: $y_{t+1}=f(x_{t+1})+\epsilon$ を得てデータ追加

獲得関数最適化も VGO として「汎関数 $a_t$ の（制約つき）最適化」なので、勾配（AD）・前処理（計量）・制約処理（射影/バリア/KKT）を通常の最適化と同様に設計できる。

## Notes

- **重要度**: 「推論（確率）と設計（最適化）が結合する」代表例で、VGO の4箱を二重に適用できるのがポイント。
- **実装難易度**: 中（GP の実装/ライブラリ依存 + acquisition 最適化）。
- **実装リスク**:
  - acquisition の局所解・スケール不整合で探索が偏る
  - ノイズ・外れ値で surrogate が崩れる
  - 制約（安全/実験条件）を後付けすると破綻しやすい  
  → ベストプラクティスは「$\mathcal X$ を Space として定義し直し、制約を最初から組み込む」。
