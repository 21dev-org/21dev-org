---
term: 助記詞
termEn: Seed Phrase
aliases: [種子詞, 恢復詞組, Mnemonic, Recovery Phrase]
category: wallet
difficulty: beginner
relatedTerms: [private-key, wallet, bip39]
seeAlso: [/bips/bip-0039, /learn/basics/wallet-guide]
---

助記詞是一組 12 到 24 個英文單詞，用於備份和恢復加密貨幣錢包。它是 BIP-39 標準定義的人類可讀的私鑰表示方式。

## 工作原理

```
助記詞 → 種子 → 主私鑰 → 派生多個錢包地址
```

1. 助記詞通過 PBKDF2 函數生成 512 位元種子
2. 種子通過 BIP-32 派生出主私鑰
3. 主私鑰可派生出無限數量的子密鑰和地址

## 助記詞範例

```
abandon ability able about above absent
absorb abstract absurd abuse access accident
```

這些詞來自 BIP-39 定義的 2048 個單詞列表，每個詞代表 11 位元資訊。

## 安全守則

- **離線記錄**：用紙筆抄寫，不要拍照或數位儲存
- **多重備份**：存放在不同地點
- **保密存放**：不要告訴任何人
- **驗證備份**：確保能正確恢復錢包

## 可選密碼

BIP-39 支援額外的密碼（Passphrase），結合助記詞可產生完全不同的錢包，提供額外安全層。
