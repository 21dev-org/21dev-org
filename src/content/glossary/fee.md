---
term: 手續費
termEn: Transaction Fee
aliases: [礦工費, Fee]
category: transaction
difficulty: beginner
relatedTerms: [transaction, mining, mempool]
seeAlso: [/tech/bitcoin-core/fees]
---

手續費是發送比特幣交易時支付給礦工的費用。它等於交易輸入總額減去輸出總額的差額。

## 手續費計算

```
手續費 = 輸入總額 - 輸出總額

例如：
輸入：1.0 BTC
輸出：0.9 BTC（給收款方）+ 0.0999 BTC（找零）
手續費：0.0001 BTC
```

## 費率單位

| 單位   | 說明                         |
| ------ | ---------------------------- |
| sat/vB | 每虛擬位元組的聰數（最常用） |
| sat/WU | 每權重單位的聰數             |
| BTC/kB | 每千位元組的 BTC             |

## 影響因素

- **交易大小**：輸入/輸出數量越多，交易越大
- **網路擁堵**：mempool 交易多時費率上升
- **優先級需求**：急需確認則需支付更高費用

## 費率估算

建議使用錢包的自動估算功能或參考 [mempool.space](https://mempool.space) 的即時費率。
