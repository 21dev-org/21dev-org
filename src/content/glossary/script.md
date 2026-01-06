---
term: Script
termEn: Bitcoin Script
aliases: [比特幣腳本]
category: protocol
difficulty: advanced
relatedTerms: [transaction, utxo]
seeAlso: [/learn/intermediate/script-basics, /tech/bitcoin-core/script]
---

Bitcoin Script 是比特幣的堆疊式程式語言，定義了花費條件。每個 UTXO 都有鎖定腳本（scriptPubKey），需要解鎖腳本（scriptSig）來花費。

## 特性

- **圖靈不完備**：沒有迴圈，防止無限執行
- **堆疊式**：後進先出操作
- **確定性**：相同輸入產生相同結果

## 常見操作碼

| 操作碼           | 功能         |
| ---------------- | ------------ |
| OP_DUP           | 複製堆疊頂部 |
| OP_HASH160       | 雜湊運算     |
| OP_EQUALVERIFY   | 比較並驗證   |
| OP_CHECKSIG      | 驗證簽名     |
| OP_CHECKMULTISIG | 多簽驗證     |

## P2PKH 腳本

```
scriptPubKey:
OP_DUP OP_HASH160 <pubKeyHash> OP_EQUALVERIFY OP_CHECKSIG

scriptSig:
<signature> <publicKey>
```

## 進階腳本

- **時間鎖**：OP_CHECKLOCKTIMEVERIFY
- **多簽**：OP_CHECKMULTISIG
- **Tapscript**：Taproot 中的腳本
