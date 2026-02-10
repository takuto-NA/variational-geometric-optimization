---
title: "Physics: Electromagnetism (Action, Gauge, and Port Structure)"
---

## Responsibility

このページの責務は、電磁気を作用原理・拘束・ゲージ自由度の統一視点で整理し、離散化と最適化へ接続することである。

## Position In Unified Flow

- 本章は `app01` の場の変分構造を電磁場へ適用する章である。
- 受け取り: 作用、弱形式、pH 的エネルギー収支。
- 受け渡し: 拘束保持離散化と設計最適化。

## Symbol Dictionary

- スカラー電位: $\phi(x,t)$
- ベクトルポテンシャル: $A(x,t)$
- 電場: $E=-\partial_t A-\nabla \phi$
- 磁場: $B=\nabla\times A$
- 電荷密度: $\rho_q$, 電流密度: $J_c$

## Problem

前提条件: 線形媒質を仮定し、外部ソース $(\rho_q,J_c)$ を与える。

## Functional

$$
\mathcal{F}[\phi,A]
=
\int
\left(
\frac{\varepsilon_0}{2}|E|^2
-
\frac{1}{2\mu_0}|B|^2
-
\rho_q\phi
+
J_c\cdot A
\right)\,dx\,dt
$$

停留条件 $\delta \mathcal{F}=0$ から Maxwell 方程式が導かれる。

## Geometry (J, R, G)

前提条件: 保存系を基準にし、導電損失は散逸として追加する。

$$
\dot{z}=(J-R)\nabla H(z)+Gu
$$

ここで $R=0$ なら保存系、$R\succeq 0$ を導入すれば Ohmic loss を表現できる。

## Discretization

重要条件は拘束保持である。

$$
\nabla\cdot B=0,\qquad
\nabla\cdot E=\frac{\rho_q}{\varepsilon_0}
$$

離散化では、離散外微分と離散 Hodge を整合させることで拘束破綻を防ぐ。  
ゲージ固定（例: $\nabla\cdot A=0$）を使う場合、鞍点系として解く。

## Algorithm

前提条件: 更新後にガウス拘束を満たす。

1. 主変数を時間更新する。  
2. 拘束残差を計算する。  
3. Poisson 型補正または KKT 補正で拘束を回復する。  

この手順は `app02` の拘束補正と同型である。

## Stability Condition

前提条件: 陽的時間積分を使う場合。

$$
\Delta t \le \frac{\alpha h_{\min}}{c_{\max}}
$$

ここで $h_{\min}$ は最小格子長、$c_{\max}$ は最大波速、$\alpha$ はスキーム依存の定数である。

## Optimization Bridge

設計変数 $\theta$ によって媒質パラメータを変える。

$$
\varepsilon(\theta),\ \mu(\theta),\ \sigma(\theta)
$$

周波数領域では

$$
\hat{x}(\omega)=\mathcal{A}(\theta,\omega)^{-1}\hat{u}(\omega)
$$

として、共振抑制や透過特性を目的関数にできる。  
受動性を維持するには散逸行列の半正定値条件を課す。

## Notes

- 電磁気では、拘束保持とゲージ処理の失敗が計算不安定の主因になりやすい。
- pH 観点を使うと、保存成分と散逸成分を統一的に管理できる。
