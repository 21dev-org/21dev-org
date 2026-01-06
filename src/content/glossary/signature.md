---
term: 數位簽名
termEn: Digital Signature
aliases: [簽名, Signature]
category: cryptography
difficulty: intermediate
relatedTerms: [private-key, public-key, transaction]
---

數位簽名是使用私鑰對交易數據進行加密簽署的過程，用於證明交易確實由私鑰持有者授權。任何人都可以用對應的公鑰驗證簽名。

## 簽名算法

比特幣使用兩種簽名算法：

| 算法    | 引入時間       | 特點             |
| ------- | -------------- | ---------------- |
| ECDSA   | 創世           | secp256k1 曲線   |
| Schnorr | Taproot (2021) | 更高效、支援聚合 |

## 簽名流程

```
1. 計算交易雜湊
2. 用私鑰對雜湊簽名
3. 將簽名附加到交易
4. 驗證者用公鑰驗證
```

## Schnorr 優勢

- **更小**：比 ECDSA 簽名小
- **批量驗證**：更快驗證多個簽名
- **簽名聚合**：多簽交易只需一個簽名
- **隱私**：多簽和單簽看起來相同

## SIGHASH 類型

簽名可以覆蓋交易的不同部分，允許靈活的交易結構。
