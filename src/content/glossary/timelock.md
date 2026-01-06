---
term: 時間鎖
termEn: Timelock
short: 限制 UTXO 在特定時間或區塊高度之前不能花費的機制。是閃電網路和智能合約的基礎，支持絕對和相對時間鎖。
aliases: [時間鎖定, CLTV, CSV]
category: transaction
difficulty: advanced
relatedTerms: [script, transaction, lightning-network]
seeAlso: [/learn/intermediate/timelock]
---

時間鎖是限制 UTXO 在特定時間或區塊高度之前不能被花費的機制，是閃電網路和智能合約的基礎。

## 時間鎖類型

| 類型      | 級別   | 說明         |
| --------- | ------ | ------------ |
| nLocktime | 交易級 | 整筆交易延遲 |
| OP_CLTV   | 腳本級 | 絕對時間鎖   |
| OP_CSV    | 腳本級 | 相對時間鎖   |

## nLocktime

```
交易設定 nLocktime = 800000
在區塊 800000 之前無法被打包
```

## OP_CHECKLOCKTIMEVERIFY (CLTV)

```
<時間戳或區塊高度> OP_CLTV OP_DROP
```

在指定時間之後才能花費。

## OP_CHECKSEQUENCEVERIFY (CSV)

```
<相對區塊數> OP_CSV OP_DROP
```

自 UTXO 確認後經過指定區塊數才能花費。

## 應用

- 閃電網路通道
- 遺產規劃
- 託管合約
- 時間鎖定存款
