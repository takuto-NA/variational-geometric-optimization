---
title: "Probability: Kalman Filter as Sequential VGO"
---

## Problem

状態空間モデルで、時系列観測 $y_{1:T}$ から状態 $x_{1:T}$ を推定したい（フィルタリング/スムージング）。
最小構成として線形ガウス

$$
x_{t+1}=Ax_t+w_t,\quad w_t\sim\mathcal N(0,Q),
\qquad
y_t=Hx_t+v_t,\quad v_t\sim\mathcal N(0,R)
$$

を考える。

## Functional

線形ガウスでは、各時刻のフィルタリング事後 $p(x_t\mid y_{1:t})$ はガウス $\mathcal N(m_t,P_t)$ に閉じる。
さらに、更新は「その時刻の負の対数事後（＝二次汎関数）」最小化として書ける。

予測分布 $x_t\mid y_{1:t-1}\sim\mathcal N(m_{t\mid t-1},P_{t\mid t-1})$ が得られているとすると、

$$
x_t^*
=\arg\min_{x_t}\ \mathcal F_t(x_t),
\qquad
\mathcal F_t(x_t)
=
\tfrac12\|y_t-Hx_t\|_{R^{-1}}^2
+
\tfrac12\|x_t-m_{t\mid t-1}\|_{P_{t\mid t-1}^{-1}}^2.
$$

ここで $\|a\|_M^2 := a^\top M a$。

Remark: スムージングは時刻全体の $\sum_t \mathcal F_t$（＋遷移整合）を同時に最小化する形になり、これは「時系列のバッチ MAP」と同型。

## Geometry (G, J)

- **$J$**: フィルタは散逸側でよいので $J=0$ が基本。
- **$G$**: 二次形式の重み $R^{-1}$、$P^{-1}$ は「自然な計量（前処理）」として機能する。
  情報フィルタ（precision 形式）では $\Lambda=P^{-1}$ が主役になり、VGO 的には「どの表現（座標）で持つか」という Space/Geometry の選択として理解できる。

## Discretization

時間離散 $t=1,\dots,T$ は問題設定そのもの。
非線形の場合

$$
x_{t+1}=f(x_t)+w_t,\qquad y_t=h(x_t)+v_t
$$

では、線形化（EKF）やサンプル近似（UKF/粒子）により「二次汎関数をどう近似するか」が Discretization の中核になる。

## Algorithm

- **Kalman filter**: 予測（time update）→ 観測更新（measurement update）の逐次構造で、各時刻の二次最小化を閉形式に解いていると見なせる。
- **EKF/UKF**: 「二次近似（線形化）をどの幾何で取るか」の違いとして整理できる。
- **Smoother**: 逐次ではなく、全時刻の KKT（正規方程式）を解く。数値線形代数（帯行列、因子分解）が実装の主戦場。

Remark: 制御の LQR が「二次最適制御」なら、カルマンは「二次推定」。両者が同じ二次構造（Riccati）を持つのは VGO 的には自然（同一の停留構造の別側面）である。

## Notes

- **重要度**: 「逐次ベイズ推論＝逐次最適化」という同型が見える代表例。VGO の枠で online/batch、推定/制御の橋渡しになる。
- **実装難易度**: 線形 KF は低（行列演算）。非線形（EKF/UKF）やスムージングは中〜高（線形化の安定性、数値条件、実装量）。
- **実装リスク**: 共分散の正定値性・対称性が崩れると破綻しやすい。表現（SPD 上での更新、平方根フィルタ等）を Space として選ぶのがベストプラクティス。
