---
term: 分叉
termEn: Fork
aliases: [分岔]
category: protocol
difficulty: intermediate
relatedTerms: [consensus, blockchain, block]
---

分叉是區塊鏈出現分支的情況，可能是暫時的網路現象，也可能是永久的協議變更。

## 分叉類型

### 臨時分叉

兩個礦工同時找到有效區塊，網路暫時分裂。最終較長的鏈會被接受，另一條成為孤塊。

### 軟分叉（Soft Fork）

- 向後兼容的規則變更
- 舊節點仍能驗證新區塊
- 例如：SegWit（BIP-141）

### 硬分叉（Hard Fork）

- 不向後兼容的規則變更
- 舊節點會拒絕新區塊
- 可能導致永久分裂
- 例如：Bitcoin Cash（2017）

## 重要分叉歷史

| 時間    | 名稱         | 類型   |
| ------- | ------------ | ------ |
| 2017-08 | Bitcoin Cash | 硬分叉 |
| 2017-08 | SegWit       | 軟分叉 |
| 2021-11 | Taproot      | 軟分叉 |

## 安全考量

分叉期間要注意重放攻擊和確認數要求。
