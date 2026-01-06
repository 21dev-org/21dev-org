---
term: 粉塵
termEn: Dust
aliases: [Dust UTXO, 微額]
category: transaction
difficulty: intermediate
relatedTerms: [utxo, fee, transaction]
seeAlso: [/tech/bitcoin-core/dust]
---

粉塵（Dust）是指價值太小，花費它所需的手續費超過其本身價值的 UTXO。比特幣協議有粉塵限制來防止 UTXO 集膨脹。

## 粉塵閾值

```
粉塵限制 ≈ 花費該 UTXO 所需的最低手續費

P2PKH: ~546 sats
P2WPKH: ~294 sats
P2TR: ~330 sats
```

## 影響

- **錢包**：顯示「無法發送」的餘額
- **UTXO 集**：永久佔用節點記憶體
- **隱私**：粉塵攻擊用於追蹤

## 粉塵攻擊

攻擊者向大量地址發送微額比特幣，當目標花費這些 UTXO 時，攻擊者可以追蹤資金流向。

## 處理方式

- **不要合併**：避免連結不同地址
- **捐贈手續費**：讓粉塵作為額外手續費
- **UTXO 整理**：低費率時期合併
- **忽略**：不使用來源不明的粉塵
