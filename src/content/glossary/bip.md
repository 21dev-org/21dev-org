---
term: BIP
termEn: Bitcoin Improvement Proposal
short: 比特幣改進提案的正式文件格式
aliases: [比特幣改進提案]
category: development
difficulty: beginner
relatedTerms: [consensus, fork]
seeAlso: [/bips/, /bips/bip-0001]
---

BIP（Bitcoin Improvement Proposal）是提議比特幣新功能、改進或資訊標準的正式文件。任何人都可以提交 BIP。

## BIP 類型

| 類型            | 說明     | 範例             |
| --------------- | -------- | ---------------- |
| Standards Track | 協議變更 | BIP-141 (SegWit) |
| Informational   | 設計指南 | BIP-32 (HD 錢包) |
| Process         | 流程規範 | BIP-1 (BIP 流程) |

## 重要 BIPs

- **BIP-32**：HD 錢包
- **BIP-39**：助記詞
- **BIP-44**：派生路徑
- **BIP-141**：SegWit
- **BIP-340/341/342**：Taproot

## BIP 流程

1. **Draft**：草稿，徵求意見
2. **Proposed**：正式提案
3. **Final**：被廣泛採用
4. **Active/Replaced/Withdrawn**：最終狀態

## 如何貢獻

1. 在 bitcoin-dev 郵件列表討論想法
2. 編寫 BIP 文件
3. 提交 PR 到 bitcoin/bips 倉庫
