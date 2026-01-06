---
term: 記憶池
termEn: Mempool
aliases: [交易池, Memory Pool]
category: protocol
difficulty: intermediate
relatedTerms: [transaction, mining, fee]
seeAlso: [/tech/bitcoin-core/mempool]
---

記憶池（Mempool）是每個比特幣節點維護的待確認交易暫存區。當你發送交易後，它會先進入記憶池等待礦工打包進區塊。

## 運作流程

```
發送交易 → 廣播到網路 → 進入各節點 mempool → 礦工選取 → 打包進區塊
```

## 記憶池特性

- **非共識**：每個節點的 mempool 可能不同
- **有限容量**：預設 300 MB，超出時移除低手續費交易
- **動態變化**：新區塊產生後清除已確認交易
- **手續費市場**：交易競爭區塊空間

## 手續費優先級

礦工通常按「手續費率」（sat/vB）排序選取交易：

| 優先級 | 手續費率     | 確認時間   |
| ------ | ------------ | ---------- |
| 高     | 50+ sat/vB   | 下一區塊   |
| 中     | 20-50 sat/vB | 1-3 區塊   |
| 低     | 5-20 sat/vB  | 數小時     |
| 極低   | < 5 sat/vB   | 可能不確認 |

## 監控工具

- [mempool.space](https://mempool.space) - 即時視覺化
- Bitcoin Core RPC: `getmempoolinfo`
