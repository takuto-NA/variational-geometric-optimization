---
title: "Chapter 3: General Equation"
---

## 3.1 基本方程式（完全形）

### Proposition (general form)

本書で扱う一般形は次である：

$$
\dot x
=
-\underbrace{G^{-1}(x)\,\nabla \mathcal F(x)}_{\text{散逸・最適化}}
\;+\;
\underbrace{J(x)\,\nabla \mathcal F(x)}_{\text{保存・回転}}
$$

- $G(x)$: 対称正定値（計量）
- $J(x)$: 反対称（保存構造）

### Remark (interpretation)

この 1 行は、散逸項と保存項を加法分解して表す。
与えられた $\mathcal F$ に対し、$G$ と $J$ の選択が運動の性質（収束・回転）を規定する。

- 熱拡散（$J=0$）
- 自然勾配（$G$ を Fisher とみなす）
- Hamilton 系（$G=0$）
- 減衰振動（両方あり）

## 3.2 代表例（同じ形に落とす）

### 勾配流（gradient flow）

$J=0$ とすると

$$
\dot x = -G^{-1}(x)\,\nabla\mathcal F(x)
$$

特に $G=I$（ユークリッド計量）なら最急降下である。
関数空間では $G$ が $L^2$ や $H^1$ の内積に対応する演算子になり得る。

### Hamilton 系（conservative flow）

$G=0$ とすると

$$
\dot x = J(x)\,\nabla\mathcal F(x)
$$

$J$ の反対称性により、典型的には $\mathcal F$ が保存量として振る舞う（時間発展が“回る”）。

### 混合（散逸＋保存）

両方を入れると

- 収束（散逸）
- 周期（保存）

が同時に現れ、減衰振動のような挙動になります。

## 3.3 コメント（読み方）

同じ $\mathcal F$ が与えられても、
どの $G$ と $J$ を選ぶかで「降下（散逸）」と「回転（保存）」の割合が変わる。

