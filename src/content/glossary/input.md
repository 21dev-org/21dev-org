---
term: 輸入
termEn: Input
short: 比特幣交易中引用先前輸出（UTXO）的部分。每個輸入必須提供解鎖腳本來滿足被引用輸出的花費條件。
aliases: [交易輸入]
category: transaction
difficulty: beginner
relatedTerms: [utxo, transaction, output]
---

輸入是比特幣交易中引用先前輸出（UTXO）的部分。每個輸入必須提供解鎖腳本（scriptSig）來滿足被引用輸出的花費條件。

## 輸入結構

```
輸入 = {
  txid: 引用交易的雜湊,
  vout: 輸出索引,
  scriptSig: 解鎖腳本,
  sequence: 序列號
}
```

## 解鎖腳本類型

| 輸出類型 | 解鎖腳本內容         |
| -------- | -------------------- |
| P2PKH    | 簽名 + 公鑰          |
| P2SH     | 資料 + 贖回腳本      |
| P2WPKH   | 空（見證在 witness） |
| P2TR     | 空（見證在 witness） |

## 輸入與輸出關係

```
交易 A 輸出 0 ─→ 交易 B 輸入 0
                    │
交易 C 輸出 2 ─→ 交易 B 輸入 1
```

每個輸入消耗一個完整的 UTXO，無法部分消耗。
