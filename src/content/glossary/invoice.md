---
term: 發票
termEn: Invoice
short: 閃電網路的支付請求，以 lnbc 開頭的字串編碼，包含金額、收款節點、付款雜湊和過期時間等資訊。
aliases: [閃電發票, Lightning Invoice, BOLT11]
category: lightning
difficulty: beginner
relatedTerms: [lightning-network, channel, htlc]
seeAlso: [/learn/lightning/invoices]
---

閃電網路發票是接收方生成的支付請求，包含金額、收款節點、付款雜湊等資訊，以 `lnbc` 開頭的字串編碼。

## 發票內容

```
lnbc10u1p3...（BOLT11 編碼）

解碼後包含：
- 金額：10 μBTC (1,000 sats)
- 付款雜湊：sha256(preimage)
- 收款節點公鑰
- 過期時間
- 描述/備註
```

## 發票類型

| 類型         | 說明           |
| ------------ | -------------- |
| 標準發票     | 一次性，有金額 |
| 無金額發票   | 付款者決定金額 |
| Hold Invoice | 延遲結算       |
| BOLT12 Offer | 可重複使用     |

## 使用流程

1. 收款方生成發票
2. 發送給付款方（掃碼/複製）
3. 付款方錢包解析並支付
4. 收款方收到即時確認

## 過期時間

發票通常設有過期時間（如 1 小時），過期後需重新生成。
