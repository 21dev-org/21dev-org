---
term: 支付通道
termEn: Payment Channel
aliases: [通道, Channel]
category: lightning
difficulty: intermediate
relatedTerms: [lightning-network, htlc]
seeAlso: [/learn/lightning/channels]
---

支付通道是閃電網路的基本構建塊，允許兩方在鏈下進行無限次交易，只需開啟和關閉時上鏈。

## 生命週期

1. **開通道**：雙方各鎖定資金到 2-of-2 多簽地址
2. **交易**：更新通道狀態，雙方簽署新的承諾交易
3. **關閉**：協作關閉或強制關閉，結算到鏈上

## 通道容量

```
總容量 = 你的餘額 + 對方餘額

例如：1,000,000 sats 容量
你：600,000 sats（出站）
對方：400,000 sats（入站）
```

## 通道類型

| 類型     | 說明           |
| -------- | -------------- |
| 公開通道 | 可被路由發現   |
| 私有通道 | 不廣播給網路   |
| 雙向注資 | 雙方都提供資金 |

## 流動性

- **入站流動性**：能接收的最大金額
- **出站流動性**：能發送的最大金額
