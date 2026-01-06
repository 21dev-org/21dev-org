---
term: 創世區塊
termEn: Genesis Block
aliases: [區塊 0, Block 0]
category: protocol
difficulty: beginner
relatedTerms: [blockchain, block, coinbase]
---

創世區塊是比特幣區塊鏈的第一個區塊，由中本聰在 2009 年 1 月 3 日創建。區塊高度為 0，是所有後續區塊的起源。

## 區塊資訊

| 屬性   | 值                      |
| ------ | ----------------------- |
| 高度   | 0                       |
| 時間戳 | 2009-01-03 18:15:05 UTC |
| 難度   | 1                       |
| Nonce  | 2083236893              |
| 獎勵   | 50 BTC                  |

## 嵌入訊息

創世區塊的 coinbase 交易包含一段歷史性文字：

> The Times 03/Jan/2009 Chancellor on brink of second bailout for banks

這是當天《泰晤士報》的頭條，記錄了比特幣誕生的時代背景。

## 特殊之處

- 創世區塊的 50 BTC 獎勵**無法花費**
- 這是硬編碼在程式中，而非來自共識規則
- 可能是設計選擇或無意的程式行為

## 區塊雜湊

```
000000000019d6689c085ae165831e934ff763ae46a2a6c172b3f1b60a8ce26f
```
