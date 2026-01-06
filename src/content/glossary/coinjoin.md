---
term: CoinJoin
termEn: CoinJoin
short: 隱私增強技術，讓多個用戶將交易合併成單一交易，使外部觀察者難以判斷輸入和輸出的對應關係。
aliases: [混幣]
category: security
difficulty: advanced
relatedTerms: [transaction, utxo]
seeAlso: [/learn/advanced/coinjoin]
---

CoinJoin 是一種隱私增強技術，讓多個用戶將交易合併成單一交易，使外部觀察者難以判斷輸入和輸出的對應關係。

## 運作原理

```
傳統交易：
Alice: 1 BTC → 0.5 + 0.5
Bob: 2 BTC → 1 + 1

CoinJoin：
輸入: Alice 1 BTC, Bob 2 BTC
輸出: 0.5, 0.5, 1, 1 BTC（打亂順序）
```

## 實現方式

| 名稱       | 特點                 |
| ---------- | -------------------- |
| Wasabi     | 協調者模式，ZeroLink |
| JoinMarket | 做市商模式，靈活     |
| Whirlpool  | 固定面額，完全混合   |

## 匿名集

匿名集表示你的 UTXO 可能是多少個輸入之一：

- 更大的匿名集 = 更好的隱私
- 多輪 CoinJoin 可增加匿名集

## 注意事項

- 使用後避免合併輸出
- 選擇信譽良好的實現
- 了解法律風險
