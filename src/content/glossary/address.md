---
term: 地址
termEn: Address
aliases: [比特幣地址, Bitcoin Address]
category: basic
difficulty: beginner
relatedTerms: [public-key, wallet, utxo]
seeAlso: [/learn/intermediate/address-types, /tech/bitcoin-core/addresses]
---

比特幣地址是接收比特幣的識別碼，類似於銀行帳號。地址由公鑰經過雜湊處理後產生，可以安全地公開分享。

## 地址類型

| 類型   | 開頭 | 名稱          | 說明               |
| ------ | ---- | ------------- | ------------------ |
| P2PKH  | 1    | Legacy        | 最早的地址格式     |
| P2SH   | 3    | Script Hash   | 支援多重簽名等腳本 |
| P2WPKH | bc1q | Native SegWit | 省手續費，推薦使用 |
| P2TR   | bc1p | Taproot       | 最新格式，更高隱私 |

## 地址範例

```
Legacy (P2PKH):
1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2

SegWit (P2WPKH):
bc1qw508d6qejxtdg4y5r3zarvary0c5xw7kv8f3t4

Taproot (P2TR):
bc1p5d7rjq7g6rdk2yhzks9smlaqtedr4dekq08ge8ztwac72sfr9rusxg3297
```

## 地址重用風險

每個地址應只使用一次：

- **隱私保護**：避免被追蹤交易關聯
- **安全考量**：減少私鑰暴露風險
- **最佳實踐**：每次收款使用新地址

## 驗證地址

地址包含校驗碼，輸入錯誤的地址會被錢包拒絕，防止發送到無效地址。
