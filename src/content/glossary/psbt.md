---
term: PSBT
termEn: Partially Signed Bitcoin Transaction
short: 標準格式，用於在多個設備或參與者之間傳遞未完成簽名的交易。適用於硬體錢包、多重簽名和協作交易。
aliases: [部分簽名交易]
category: transaction
difficulty: advanced
relatedTerms: [transaction, multisig, wallet]
seeAlso: [/learn/intermediate/psbt, /bips/bip-0174]
---

PSBT（Partially Signed Bitcoin Transaction）是一種標準格式，用於在多個設備或參與者之間傳遞未完成簽名的交易。

## 使用場景

- **硬體錢包**：在線上電腦構建，離線設備簽名
- **多重簽名**：多方逐一簽署
- **協作交易**：CoinJoin、Payjoin

## PSBT 流程

```
1. Creator：創建未簽名交易
2. Updater：添加 UTXO 資訊
3. Signer：添加簽名
4. Combiner：合併多個簽名
5. Finalizer：完成交易
6. Extractor：提取可廣播的交易
```

## 格式

```
Base64 編碼：
cHNidP8BAFUCAAAAAY...

或 Hex 格式：
70736274ff0100...
```

## 錢包支持

主流錢包都支持 PSBT：

- Sparrow
- Electrum
- Coldcard
- Specter

## BIP-174 & BIP-370

- BIP-174：原始 PSBT 規範
- BIP-370：PSBT 版本 2，支持更多功能
