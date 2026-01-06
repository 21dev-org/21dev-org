---
term: 輸出
termEn: Output
aliases: [交易輸出, TXO]
category: transaction
difficulty: beginner
relatedTerms: [utxo, transaction, input]
---

輸出是比特幣交易中指定接收金額和條件的部分。每個輸出包含金額和鎖定腳本（scriptPubKey）。

## 輸出結構

```
輸出 = {
  value: 金額（聰）,
  scriptPubKey: 鎖定腳本（花費條件）
}
```

## 輸出類型

| 類型   | 鎖定腳本     | 地址格式 |
| ------ | ------------ | -------- |
| P2PKH  | 公鑰雜湊     | 1...     |
| P2SH   | 腳本雜湊     | 3...     |
| P2WPKH | 見證公鑰雜湊 | bc1q...  |
| P2TR   | Taproot      | bc1p...  |

## UTXO 生命週期

```
創建：作為交易輸出誕生
存在：未花費（UTXO）
消亡：被新交易作為輸入花費
```

## 找零輸出

當輸入金額大於所需時，需要創建找零輸出：

```
輸入：1 BTC
輸出 1：0.3 BTC（支付）
輸出 2：0.6999 BTC（找零）
手續費：0.0001 BTC
```
