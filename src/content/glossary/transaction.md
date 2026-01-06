---
term: 交易
termEn: Transaction
aliases: [TX, 轉帳]
category: transaction
difficulty: beginner
relatedTerms: [utxo, fee, confirmation]
seeAlso: [/tech/bitcoin-core/transaction]
---

比特幣交易是將比特幣從一個或多個輸入轉移到一個或多個輸出的數據結構。交易一旦被包含在區塊中並獲得確認，就成為不可逆的。

## 交易結構

```
交易 = {
  版本號,
  輸入列表（花費的 UTXO）,
  輸出列表（新的 UTXO）,
  鎖定時間
}
```

## 交易類型

| 類型       | 說明                           |
| ---------- | ------------------------------ |
| 普通交易   | 用戶之間的轉帳                 |
| Coinbase   | 區塊獎勵交易，無輸入           |
| 多簽交易   | 需要多個簽名才能花費           |
| 時間鎖交易 | 在特定時間或區塊高度後才能花費 |

## 交易 ID（TXID）

每筆交易都有唯一的 TXID，是交易數據的雙重 SHA-256 雜湊值，用於在區塊鏈上追蹤交易。
