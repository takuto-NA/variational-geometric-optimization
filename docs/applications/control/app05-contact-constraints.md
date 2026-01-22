---
title: "Control: Inequality + Contact (Complementarity) in the VGO Framework"
---

> このページで主に触るknob: Algorithm（不等式/相補性の解き方）＋ Geometry（滑らかさの崩れ方）＋ Discretization（接触のモード化/緩和）

## Problem

接触を含む制御では、状態や入力の箱制約だけでなく

- 非貫通（gap）: $g(q)\ge 0$
- 反力（法線力）: $\lambda_n \ge 0$
- 相補性: $\lambda_n\, g(q)=0$

のような **不等式 + 相補性** が本質になる。
この種の制約は、最適制御/MPC において「一番痛いところ」（active set の切替、モード切替、非滑らか）として現れる。

## Functional

基本の骨格は `app02-optimal-control` と同じで、目的 $\mathcal J$ と制約から停留構造を作る：

$$
\min_{\theta}\;\mathcal J(\theta)
\quad\text{s.t.}\quad
C(\theta)=0,\;\;G(\theta)\le 0.
$$

接触の相補性は、たとえば

- $G(\theta)\le 0$（非貫通を不等式として置く）
- 乗数 $\nu\ge 0$ と $\nu^\top G(\theta)=0$

という KKT の形で入る（[第6章](../../chapters/chap06-constraints)）。

## Geometry (G, J)

連続の見方としては「制約付き停留（サドル点）」で統一できるが、相補性が入ると一般に

- active set が切り替わる
- 勾配・Hessian の滑らかさが崩れる（モード境界）

ため、数値的には “同じ地図の外縁” に近づく（境界例は [第7章 7.2.1](../../chapters/chap07-cross-domain#7-2-1-境界例非滑らか最適化proxsubgradientはこの地図の外側)）。

## Discretization

実装では、接触の扱いは離散化（モデル化）でほぼ決まる：

- **モードとして列挙**: 接触 on/off を離散モードとして扱う（混合整数/探索が入ることがある）
- **緩和（relaxation）**: 相補性を滑らかに近似する（ペナルティ、バリア、スムージング）
- **軟制約**: 破れを許してコストに入れる（現場の安定性を優先）

## Algorithm（MPC での定石）

MPC では通常、direct（離散化→有限次元問題）で回す（[app04-mpc](./app04-mpc)）。
相補性が入ると、支配的になるのは「微分の美しさ」より「ソルバ戦略」である：

- **active-set 系**: 有効制約集合を推定して切り替える（切替点で不安定化しやすい）
- **interior-point 系**: バリアで内点を保ちながら追い込む（実装は重いが堅牢になりやすい）
- **スムージング/緩和**: 相補性を連続近似して RTI/warm start と相性を取る

VGO 的な最小実装単位は結局変わらない（[第8章](../../chapters/chap08-implementation) と同型）：

- `J(theta)`（目的）
- `C(theta)=0, G(theta)≤0`（制約）
- `grad/VJP/JVP`（一次変分・ヤコビアン作用）
- （必要なら）`HVP` と前処理

ただし、相補性は「モデル化（Discretization）」と「ソルバ（Algorithm）」が支配的になりやすい点に注意。

## Notes

- **重要度**: “最適制御→MPC” を現場に持ち込むとき、最終的にぶつかることが多い論点。
- **実装難易度**: 高い（モード切替・非滑らか・数値安定性）。
- **実装リスク**: まずは「緩和/軟制約で回す」→「必要なら厳密な相補性に寄せる」の順が安全。

