---
term: 難度
termEn: Difficulty
aliases: [挖礦難度, Mining Difficulty]
category: mining
difficulty: intermediate
relatedTerms: [mining, hash, block]
seeAlso: [/tech/bitcoin-core/difficulty]
---

難度是衡量找到有效區塊雜湊所需計算量的指標。比特幣網路每 2016 個區塊（約兩週）自動調整難度，以維持約 10 分鐘的出塊時間。

## 難度調整

```
新難度 = 舊難度 × (2016 × 10 分鐘 / 實際耗時)

調整上限：4 倍
調整下限：1/4
```

## 難度目標

礦工需要找到區塊頭雜湊小於目標值的 Nonce：

```
雜湊 < 目標值 = 有效區塊
目標值越小 = 難度越高
```

## 歷史趨勢

- 2009 年：難度 = 1
- 2024 年：難度 > 80 兆

## 為什麼需要難度調整？

- 適應算力變化
- 維持穩定出塊速度
- 確保網路安全性與經濟激勵平衡
