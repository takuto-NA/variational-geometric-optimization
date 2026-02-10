---
title: "Applications: Physics"
---

## Responsibility

このページの責務は、Physics 章全体を「現象別」ではなく「抽象構造別」に再編し、各アプリ文書を一本化ストーリーへ接続することである。

## Unified Story

Physics 章は次の連鎖を共通言語とする。

$$
\text{Action}
\Rightarrow
\text{Weak Form}
\Rightarrow
\text{FEM or Spatial Discretization}
\Rightarrow
\text{port-Hamiltonian or Gradient Structure}
\Rightarrow
\text{Time Integration}
\Rightarrow
\text{Stability Bound}
\Rightarrow
\text{Optimization}
$$

## Reading Order (Structure-First)

1. `app01-harmonic-oscillator`: 連続体から最適化までの基準フルチェーン  
2. `app02-constrained-mechanics`: 拘束、未定乗数、KKT の統一化  
3. `app03-thermodynamics`: 散逸、勾配流、自由エネルギー設計  
4. `app04-fluid-mechanics`: 弱形式、非圧縮拘束、安定条件  
5. `app05-electromagnetism`: 作用、ガウス拘束、ゲージ処理  

## Chapter Map

- `app01` は辞書章（記号と最小原理の基準）。
- `app02` は拘束付き発展の一般形。
- `app03` は散逸主導の緩和系。
- `app04` は場の力学と KKT 射影。
- `app05` は場の作用と拘束保持離散化。

## Cross-Chapter Rules

- 数式記法は `$ ... $` と `$$ ... $$` に統一する。
- 各章冒頭に `Responsibility` と `Position In Unified Flow` を置く。
- 各キーメッセージ式の直前に前提条件を明記する。
- 受動性を扱う章では半正定値条件（例: $R\succeq 0$）を明記する。
- 安定条件は固有値または CFL の形で書き、前提条件を添える。

## Files

- [app00-template](./app00-template)
- [app01-harmonic-oscillator](./app01-harmonic-oscillator)
- [app02-constrained-mechanics](./app02-constrained-mechanics)
- [app03-thermodynamics](./app03-thermodynamics)
- [app04-fluid-mechanics](./app04-fluid-mechanics)
- [app05-electromagnetism](./app05-electromagnetism)
