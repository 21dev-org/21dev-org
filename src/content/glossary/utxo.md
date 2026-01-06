---
term: UTXO
termEn: Unspent Transaction Output
aliases: [未花費交易輸出]
category: transaction
difficulty: intermediate
relatedTerms: [transaction, input, output]
seeAlso: [/learn/intermediate/utxo-model, /tech/bitcoin-core/utxo]
---

UTXO（Unspent Transaction Output，未花費交易輸出）是比特幣交易模型的核心概念。它代表可以被花費的比特幣數量，類似於現實中的紙幣或硬幣。

## 運作方式

當你收到比特幣時，實際上是收到了一個 UTXO。當你要花費時，必須將整個 UTXO 作為輸入，然後創建新的輸出（可能包括找零給自己）。

```
交易示例：
輸入：1 個 1.5 BTC 的 UTXO
輸出 1：1.0 BTC（支付給收款方）
輸出 2：0.4999 BTC（找零給自己）
手續費：0.0001 BTC（輸入減輸出的差額）
```

## UTXO vs 帳戶模型

| 特性     | UTXO 模型 | 帳戶模型 |
| -------- | --------- | -------- |
| 隱私性   | 較高      | 較低     |
| 平行處理 | 容易      | 困難     |
| 雙花檢測 | 簡單      | 複雜     |
| 智能合約 | 受限      | 靈活     |

## UTXO 集

所有未花費的 UTXO 構成「UTXO 集」，全節點必須追蹤這個集合以驗證新交易。
