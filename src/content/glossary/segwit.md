---
term: SegWit
termEn: Segregated Witness
aliases: [隔離見證, BIP-141]
category: protocol
difficulty: intermediate
relatedTerms: [transaction, block, taproot]
seeAlso: [/bips/bip-0141, /tech/bitcoin-core/segwit]
---

SegWit（Segregated Witness，隔離見證）是 2017 年啟用的比特幣軟分叉升級，將交易的簽名資料（見證）從交易結構中分離出來。

## 主要改進

### 解決交易延展性

- 簽名不再影響交易 ID
- 使閃電網路成為可能

### 增加區塊容量

- 引入「區塊權重」概念（4 MB 上限）
- 實際容量約提升 1.8-2 倍

### 新地址格式

| 類型        | 格式             | 開頭 |
| ----------- | ---------------- | ---- |
| P2WPKH      | 原生 SegWit      | bc1q |
| P2WSH       | 原生 SegWit 多簽 | bc1q |
| P2SH-P2WPKH | 兼容包裝         | 3    |

## 區塊權重計算

```
傳統資料：1 位元組 = 4 權重單位
見證資料：1 位元組 = 1 權重單位
區塊上限：4,000,000 權重單位
```

## 採用率

SegWit 交易佔比從 2017 年的 0% 增長到 2024 年的 80% 以上，節省了大量區塊空間和手續費。
