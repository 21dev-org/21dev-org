---
term: Taproot
termEn: Taproot
aliases: [BIP-341]
category: protocol
difficulty: advanced
relatedTerms: [schnorr, segwit, script]
seeAlso: [/bips/bip-0341, /learn/advanced/taproot]
---

Taproot 是 2021 年 11 月啟用的比特幣重大升級，結合 Schnorr 簽名和 MAST（Merklized Abstract Syntax Trees）技術，提升隱私性、擴展性和智能合約能力。

## 核心改進

### Schnorr 簽名（BIP-340）

- 更小的簽名尺寸
- 原生支援多重簽名聚合
- 更高效的批量驗證

### MAST 結構

- 只需揭露實際使用的腳本分支
- 複雜合約看起來像普通交易
- 降低交易費用

### 新地址格式

- P2TR（Pay-to-Taproot）地址
- bc1p 開頭（Bech32m 編碼）

## 隱私優勢

```
升級前：多重簽名交易明顯不同於普通交易
升級後：所有 Taproot 交易在鏈上看起來相同
```

## 應用場景

- 更高效的多重簽名
- 閃電網路通道（更小的鏈上足跡）
- DLC（離散對數合約）
- 複雜的時間鎖合約
