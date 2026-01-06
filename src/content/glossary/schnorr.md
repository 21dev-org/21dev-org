---
term: Schnorr 簽名
termEn: Schnorr Signature
aliases: [BIP-340]
category: cryptography
difficulty: advanced
relatedTerms: [signature, taproot]
seeAlso: [/bips/bip-0340, /learn/advanced/schnorr-signatures]
---

Schnorr 簽名是 Taproot 升級引入的新簽名算法，相比 ECDSA 具有更好的效率和隱私特性。

## 優勢

| 特性     | ECDSA       | Schnorr  |
| -------- | ----------- | -------- |
| 簽名大小 | 71-72 bytes | 64 bytes |
| 批量驗證 | 否          | 是       |
| 簽名聚合 | 否          | 是       |
| 線性數學 | 否          | 是       |

## 簽名聚合

多方可以合作產生單一簽名：

```
公鑰 P = P1 + P2 + P3
簽名 s = s1 + s2 + s3

多簽交易看起來像單簽交易
```

## MuSig2

安全的多方 Schnorr 簽名協議：

- 只需 2 輪通訊
- 防止惡意參與者
- 保護隱私

## 歷史

Schnorr 簽名在 1989 年發明，但因專利問題比特幣最初使用 ECDSA。專利過期後，透過 Taproot 正式採用。
