---
term: 區塊
termEn: Block
aliases: []
category: protocol
difficulty: beginner
relatedTerms: [blockchain, mining, transaction]
seeAlso: [/tech/bitcoin-core/block-structure]
---

區塊是比特幣區塊鏈的基本單位，包含一批交易和元數據。新區塊約每 10 分鐘產生一次，透過工作量證明機制添加到鏈上。

## 區塊結構

```
區塊 = 區塊頭 + 交易列表

區塊頭（80 位元組）：
- 版本號（4 bytes）
- 前區塊雜湊（32 bytes）
- Merkle 根（32 bytes）
- 時間戳（4 bytes）
- 難度目標（4 bytes）
- Nonce（4 bytes）
```

## 區塊大小

| 限制類型 | 數值        |
| -------- | ----------- |
| 傳統大小 | 1 MB        |
| 區塊權重 | 4 MWU       |
| 實際容量 | 約 1.5-2 MB |

## 區塊時間

- 目標：平均 10 分鐘
- 每 2016 個區塊（約 2 週）調整一次難度
- 保持出塊速度穩定

## 創世區塊

第一個區塊（區塊 0）於 2009 年 1 月 3 日由中本聰挖出，包含著名的標題引用。
