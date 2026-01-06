---
term: 測試網路
termEn: Testnet
aliases: [測試網, Testnet3, Testnet4]
category: development
difficulty: beginner
relatedTerms: [mainnet, bitcoin, node]
---

測試網路是比特幣的替代區塊鏈，用於測試和開發目的。測試網的比特幣沒有實際價值，讓開發者可以安全地實驗而不冒財務風險。

## 測試網版本

| 版本     | 狀態   | 說明                 |
| -------- | ------ | -------------------- |
| Testnet3 | 使用中 | 2012 年啟動，最常用  |
| Testnet4 | 規劃中 | 解決 Testnet3 的問題 |
| Signet   | 使用中 | 受控的測試環境       |
| Regtest  | 本地   | 本地開發用           |

## 地址格式

測試網地址以不同前綴區分：

| 類型   | 主網前綴 | 測試網前綴 |
| ------ | -------- | ---------- |
| P2PKH  | 1        | m 或 n     |
| P2SH   | 3        | 2          |
| Bech32 | bc1      | tb1        |

## 取得測試幣

測試幣可從「水龍頭」（Faucet）免費取得：

- https://coinfaucet.eu/en/btc-testnet/
- https://bitcoinfaucet.uo1.net/

## 用途

- 測試錢包功能
- 開發智能合約
- 學習比特幣運作
- 測試新功能部署
