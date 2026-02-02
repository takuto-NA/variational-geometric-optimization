---
title: "Neural Example Template"
---

## Problem

学習したい写像、データ、出力、評価指標を定義する。

## Functional

$$
\mathcal F(\theta)=
$$

## Geometry (G, J)

- $G$: 例として Euclid / Fisher / 前処理
- $J$: 必要なら導入する。通常の学習は $J=0$

## Discretization

- ミニバッチ。期待値の近似
- 連続時間モデルなら時間離散。Neural ODE 等
- 物理制約を入れるなら空間離散。FEM / 格子 / コロケーション等

## Algorithm

- SGD / Adam / 自然勾配 / Newton 近似 / 制約付き。KKT など
- AD。grad / VJP / JVP で必要量をどう取るか

## Notes

- 本書の “optimization” は極小化ではなく停留構造の数値的取り扱いを指す。保存系の $J$ も射程に含む
- 参照文献
- 実装の落とし穴。スケーリング、正則化、勾配爆発/消失など

