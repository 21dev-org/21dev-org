---
term: SPV
termEn: Simplified Payment Verification
aliases: [簡化支付驗證, 輕節點]
category: protocol
difficulty: intermediate
relatedTerms: [node, merkle-tree, block]
seeAlso: [/tech/bitcoin-core/spv]
---

SPV（Simplified Payment Verification）是一種不需要下載完整區塊鏈即可驗證交易的方法，由比特幣白皮書首次描述。

## 運作原理

1. 下載所有區塊頭（約 60 MB）
2. 向全節點請求交易的 Merkle 證明
3. 驗證交易確實在某個區塊中

## 與全節點比較

| 特性 | SPV        | 全節點   |
| ---- | ---------- | -------- |
| 儲存 | ~60 MB     | ~600 GB  |
| 驗證 | 依賴區塊頭 | 完全獨立 |
| 隱私 | 較低       | 較高     |
| 安全 | 較低       | 最高     |

## 安全假設

SPV 假設：

- 多數算力是誠實的
- 連接到至少一個誠實節點
- 不驗證交易規則，只驗證工作量

## 現代實現

- **BIP-157/158**：Compact Block Filters
- **Neutrino**：隱私增強的 SPV

手機錢包大多使用某種形式的 SPV 或託管服務。
