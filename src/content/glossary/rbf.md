---
term: RBF
termEn: Replace-By-Fee
aliases: [費用替換]
category: transaction
difficulty: intermediate
relatedTerms: [transaction, fee, mempool]
seeAlso: [/learn/intermediate/rbf-cpfp, /tech/bitcoin-core/rbf]
---

RBF（Replace-By-Fee）允許未確認交易的發送者通過支付更高手續費來替換原交易，加速確認或修改輸出。

## 啟用條件

交易必須明確標記支持 RBF：

- nSequence < 0xfffffffe
- BIP-125 定義

## 使用場景

1. **加速確認**：手續費設太低時提高費率
2. **取消交易**：替換成發送給自己的交易
3. **合併交易**：減少總手續費

## RBF 類型

| 類型       | 說明                                   |
| ---------- | -------------------------------------- |
| Opt-in RBF | 交易標記可替換                         |
| Full RBF   | 任何交易都可替換（Bitcoin Core 24.0+） |

## 安全考量

- 商家應等待至少 1 確認
- 0 確認交易不安全
- 使用閃電網路處理即時支付

## 錢包支持

大多數現代錢包都支持 RBF，如 Sparrow、Electrum、BlueWallet。
