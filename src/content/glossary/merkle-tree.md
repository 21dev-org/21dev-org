---
term: Merkle 樹
termEn: Merkle Tree
short: 用於高效彙總和驗證大量數據的樹狀結構。比特幣用它組織區塊內交易，輕節點可用 Merkle 證明驗證交易。
aliases: [默克爾樹, Hash Tree]
category: cryptography
difficulty: advanced
relatedTerms: [hash, block, transaction]
seeAlso: [/tech/bitcoin-core/merkle-tree]
---

Merkle 樹是一種樹狀數據結構，用於高效地彙總和驗證大量數據。在比特幣中用於組織區塊內的交易。

## 結構

```
        Merkle Root
           /    \
        H(AB)   H(CD)
        /  \    /   \
      H(A) H(B) H(C) H(D)
       |    |    |    |
      TxA  TxB  TxC  TxD
```

## 計算過程

1. 計算每筆交易的雜湊
2. 兩兩配對計算父節點雜湊
3. 重複直到只剩一個根節點

## 用途

- **區塊摘要**：Merkle 根包含在區塊頭中
- **SPV 驗證**：輕節點只需 Merkle 證明即可驗證交易
- **效率**：log(n) 複雜度驗證

## Merkle 證明

驗證交易 C 存在於區塊：

```
需要：H(D), H(AB), Merkle Root
計算：H(C) → H(CD) → Root
比對：計算結果 = 區塊頭中的 Root
```
