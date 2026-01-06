---
term: CPFP
termEn: Child Pays for Parent
short: 交易加速技術，透過花費未確認交易的輸出並支付高手續費，讓礦工同時打包父子兩筆交易。收款方可用此加速。
aliases: [子付父]
category: transaction
difficulty: intermediate
relatedTerms: [transaction, fee, rbf]
seeAlso: [/learn/intermediate/rbf-cpfp, /tech/bitcoin-core/cpfp]
---

CPFP（Child Pays for Parent）是一種交易加速技術，透過花費未確認交易的輸出並支付足夠高的手續費，讓礦工同時打包父子兩筆交易。

## 運作原理

```
父交易（低手續費）→ 卡在 mempool
子交易（高手續費）→ 花費父交易輸出

礦工為了賺取子交易手續費，
必須先打包父交易。
```

## 使用場景

- 收款方加速確認（RBF 只能由發送方使用）
- 父交易無法 RBF 時
- 批量交易中某筆需要加速

## 費率計算

有效費率 = (父手續費 + 子手續費) / (父大小 + 子大小)

## 限制

- 需要消耗 UTXO 和區塊空間
- 父交易鏈深度限制（預設 25 筆）
- 比 RBF 成本更高

## Package Relay

Bitcoin Core 正在改進 Package Relay，讓 CPFP 更有效率。
