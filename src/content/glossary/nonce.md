---
term: Nonce
termEn: Nonce
short: 挖礦時不斷改變以尋找有效雜湊的數值
aliases: [隨機數]
category: mining
difficulty: intermediate
relatedTerms: [mining, hash, block, difficulty]
---

Nonce（Number used once）是區塊頭中的 32 位元欄位，礦工透過不斷改變 Nonce 值來尋找符合難度目標的區塊雜湊。

## 挖礦過程

```
while (true) {
  區塊雜湊 = SHA256(SHA256(區塊頭))
  if (區塊雜湊 < 目標值) {
    找到有效區塊！
    break
  }
  nonce++
}
```

## Nonce 範圍

- 32 位元 = 0 到 4,294,967,295
- 約 43 億種可能
- 現代 ASIC 每秒可嘗試數百兆次

## 額外 Nonce

當 Nonce 範圍用盡仍未找到有效區塊時，礦工會修改：

- Coinbase 交易的額外 Nonce 欄位
- 時間戳（在允許範圍內）

這會改變 Merkle 根，從而重置搜索空間。
