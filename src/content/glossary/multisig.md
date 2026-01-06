---
term: 多重簽名
termEn: Multisig
aliases: [多簽, Multi-signature]
category: security
difficulty: intermediate
relatedTerms: [wallet, private-key, transaction]
seeAlso: [/learn/intermediate/multisig, /tech/bitcoin-core/multisig]
---

多重簽名（Multisig）是一種需要多把私鑰中的若干把才能花費比特幣的機制，常以 m-of-n 表示（n 把鑰匙中需要 m 把簽名）。

## 常見配置

| 配置   | 用途                             |
| ------ | -------------------------------- |
| 2-of-3 | 個人安全存儲（備份、日常、緊急） |
| 3-of-5 | 公司財務（多人審批）             |
| 2-of-2 | 共同帳戶                         |

## 使用場景

- **個人安全**：私鑰分散存放，防止單點故障
- **企業託管**：多人共同管理資金
- **託管服務**：用戶+服務商共同控制
- **繼承規劃**：分配給家人的備份鑰匙

## 地址類型

| 類型  | 格式          | 說明         |
| ----- | ------------- | ------------ |
| P2SH  | 3...          | 傳統多簽     |
| P2WSH | bc1q...（長） | SegWit 多簽  |
| P2TR  | bc1p...       | Taproot 多簽 |

## 注意事項

- 備份所有私鑰和贖回腳本（redeem script）
- 測試恢復流程
- 考慮密鑰持有者的地理分佈
