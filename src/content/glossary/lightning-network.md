---
term: 閃電網路
termEn: Lightning Network
aliases: [LN, Layer 2]
category: lightning
difficulty: intermediate
relatedTerms: [channel, htlc, invoice]
seeAlso: [/tech/lightning/, /learn/lightning/basics]
---

閃電網路是建立在比特幣之上的第二層支付協議，透過支付通道實現即時、低成本的小額交易。

## 核心概念

- **支付通道**：兩方之間的鏈下交易通道
- **多跳路由**：透過中間節點連接不直接相連的用戶
- **HTLC**：雜湊時間鎖合約，保證原子性支付
- **發票（Invoice）**：接收方生成的支付請求

## 與鏈上交易比較

| 特性   | 鏈上交易      | 閃電網路         |
| ------ | ------------- | ---------------- |
| 速度   | 約 10-60 分鐘 | 毫秒級           |
| 手續費 | 較高          | 極低（< 1 sat）  |
| 容量   | 約 7 TPS      | 數百萬 TPS       |
| 隱私   | 區塊鏈公開    | 僅通道參與者知道 |
| 結算   | 最終性        | 需關閉通道結算   |

## 使用場景

- 小額支付和打賞
- 即時購物支付
- 串流支付（按秒計費）
- 跨境匯款

## 限制

- 需要線上才能接收支付
- 通道容量限制
- 路由可能失敗
- 流動性管理複雜
