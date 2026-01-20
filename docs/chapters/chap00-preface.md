---
title: "Chapter 0: Preface"
---

## 0.1 この書籍の目的

本書は、**多様体／関数空間上の汎関数**を中心に据え、そこから導かれる

- 散逸（勾配流）
- Newton 型条件（停留条件）
- 保存（Hamilton 流）
- 制約（KKT / サドル点）

を **同一の“変分構造”の言葉**で整理し、分野横断で実装可能な形に再編成することを目的とします。

本書の立場は次です：

- 数学的には「厳密な公理化」よりも **見通し**を優先する
- ただし、各分野の標準的概念（変分、計量、Hamilton 構造、KKT）と矛盾する主張はしない
- 実装では「何を計算すればよいか」に落ちる形（一次・二次変分、線形化）を重視する

## 0.2 想定読者と前提

想定読者は **連続最適化に精通した学部生程度**である。
具体的には次を既知として話を進めます：

- 勾配降下法、Newton 法の基本
- 勾配・Hessian（少なくともユークリッド空間での意味）
- 制約付き最適化の基本（KKT 条件の存在と形）

一方で、多様体・関数空間・計量といった概念は扱うが、
最初は厳密な微分幾何の公理系を前提にしない。
必要な範囲で **「最適化で慣れている記号を空間一般へ拡張する」** という順に橋をかける。

## 0.3 “optimization” という言葉について

本書でいう最適化（optimization）は、狭義の「極小化アルゴリズム」に限定しない。
ここでの主語は常に **停留構造**です：

$$
d\mathcal F(x^*) = 0
$$

（有限次元ユークリッド空間では $d\mathcal F\simeq\nabla\mathcal F$ と同一視できるため、$\nabla\mathcal F(x^*)=0$ とも書ける。）

勾配流・Newton 条件・Hamilton 流は、同じ停留点を中心に「収束」または「回転」という異なる力学的挙動を示す。

## 0.4 記法（最小）

- 対象空間を $\mathcal M$、汎関数を $\mathcal F:\mathcal M\to\mathbb R$ と書く。
- 本書の数式は KaTeX を想定し、インラインは `$...$`、ブロックは `$$...$$` を基本とする。
- 計量（散逸）を $G$（対称正定値）、反対称構造（保存）を $J$（反対称）と書く。

### Remark

「勾配」$\nabla\mathcal F$ は空間と計量に依存して定まる（Riesz 表現）。
本書ではまずユークリッド空間の直感を出発点にし、必要なところで関数空間・多様体へ拡張する。

## 0.5 本書の読み方

- **理論（Part I）**では、まず統一式と停留点を地図として確立する。
  以後の分野別応用は、その地図上で座標を割り当てる作業として位置づける。
- **応用（Part II）**は分野別に増えるが、各ページは同一テンプレ（Problem / Functional / Geometry / Discretization / Algorithm）で記述する。
  これにより比較と実装移植が容易になる。

## 0.6 読み終えたときにできること

- 多様体／関数空間でも「勾配」「Newton」「制約（KKT）」がどう現れるかを、統一式の言葉で説明できる
- 分野別の問題を見たときに、まず **Functional / Geometry (G,J) / Discretization / Algorithm** の枠に落とせる

## 0.7 本書の構成（ロードマップ）

理論編（Part I）は、以降の応用を「同じ地図で読む」ための最小セットである。
各章の役割は次の通り：

- **Chapter 1**（[Core Definition](./chap01-core-definition)）: 本書で扱う対象・目的（停留構造）の定義
- **Chapter 2**（[Minimal Ingredients](./chap02-minimal-ingredients)）: $\mathcal M,\mathcal F,G,J$ の最小骨格
- **Chapter 3**（[General Equation](./chap03-general-equation)）: 散逸＋保存の統一式（$G,J$ が何を決めるか）
- **Chapter 4**（[Stationary Points](./chap04-stationary-points)）: 停留点の意味と、最小限の線形化
- **Chapter 5**（[Methods Map](./chap05-methods-map)）: 勾配流・Newton・Hamilton の位置づけ
- **Chapter 6**（[Constraints](./chap06-constraints)）: 制約をラグランジアン停留構造（KKT／サドル点）として統一
- **Chapter 7**（[Cross-domain Table](./chap07-cross-domain)）: 分野差を「空間・汎関数・構造」で見える化する表
- **Chapter 8**（[Implementation Benefits](./chap08-implementation)）: 実装で何を持てばよいか（一次・二次変分／AD）

## 0.8 読者別の最短経路

- **最適化（数値最適化）中心**: Chapter 1→3→4→5→6（停留点・線形化・KKT までを最短で接続）
- **物理（作用・Hamilton）中心**: Chapter 1→2→3→4（$J$ による保存成分と停留点近傍の挙動）
- **制御（最適制御・PDE 制約）中心**: Chapter 1→3→6→7（ラグランジアンとサドル点の見取り図）
- **確率（VI・情報幾何）中心**: Chapter 1→2→3→7→（[Probability](../applications/probability/)）
- **FEM / PDE 中心**: Chapter 2→3→8→（[FEM](../applications/fem/)）

## 0.9 応用編（Part II）の使い方：テンプレ運用

応用ページは原則として同一テンプレで書く（比較と移植のため）：

- Problem
- Functional
- Geometry (G, J)
- Discretization
- Algorithm
- Notes

### Remark

応用で分野固有に見える部分（境界条件、離散化、線形代数）は最後まで残る。
しかし「何を停留させるか（$\mathcal F$）」「どの構造で動かすか（$G,J$）」「何を計算するか（一次・二次変分）」を先に固定すると、差異は整理され、実装の再利用単位が見える。

## 0.10 参照先（最小）

- **用語**: [Glossary](../glossary)
- **記法・文体**: [Style Guide](../style)

### Remark（厳密性について）

本書は「厳密な公理化」を主目的としない。
ただし、境界項・正則性・関数空間の同一視など、厳密化で問題になりうる点は **仮定として分離**し、読者が必要に応じて標準的文献へ遡れる形で記述する方針を取る。
