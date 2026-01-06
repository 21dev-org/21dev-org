---
term: Coinbase 交易
termEn: Coinbase Transaction
short: 每個區塊的第一筆交易，向礦工發放區塊獎勵和手續費。這是比特幣新幣發行的唯一方式，沒有輸入。
aliases: [區塊獎勵交易, 礦工獎勵]
category: mining
difficulty: intermediate
relatedTerms: [mining, block, halving]
---

Coinbase 交易是每個區塊的第一筆交易，用於向礦工發放區塊獎勵和交易手續費。這是比特幣新幣發行的唯一方式。

## 特殊性質

- **沒有輸入**：不引用任何先前的 UTXO
- **區塊唯一**：每個區塊只有一筆
- **必須是第一筆**：位於區塊交易列表的最前面
- **成熟期**：輸出需等待 100 個確認才能花費

## Coinbase 數據欄位

```
coinbase = {
  區塊高度（BIP34 要求）
  額外數據（最多 100 bytes）
  礦池標識
  任意訊息
}
```

## 獎勵計算

```
總獎勵 = 區塊補貼 + 交易手續費總和
```

2024 年區塊補貼為 3.125 BTC。

## 歷史趣聞

創世區塊的 coinbase 包含訊息：

> The Times 03/Jan/2009 Chancellor on brink of second bailout for banks
