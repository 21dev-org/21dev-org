---
term: 共識
termEn: Consensus
aliases: [共識機制, Consensus Mechanism]
category: protocol
difficulty: intermediate
relatedTerms: [proof-of-work, node, blockchain]
seeAlso: [/tech/bitcoin-core/consensus]
---

共識是分散式網路中所有節點對區塊鏈狀態達成一致的過程和規則。比特幣使用工作量證明（PoW）作為共識機制。

## 共識規則

所有節點必須遵守的規則：

- 區塊大小限制
- 區塊獎勵金額
- 交易格式驗證
- 簽名驗證
- 時間戳規則

## 中本聰共識

比特幣的共識特點：

1. **最長鏈規則**：累積最多工作量的鏈為有效鏈
2. **概率最終性**：確認數越多，逆轉越不可能
3. **無需許可**：任何人都可以參與驗證

## 分叉

當節點對規則有分歧時：

- **軟分叉**：向後兼容的升級
- **硬分叉**：不向後兼容的變更

## 為什麼重要？

共識確保了比特幣網路的：

- 去中心化
- 抗審查
- 不可篡改
