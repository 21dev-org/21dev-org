---
term: HTLC
termEn: Hash Time-Locked Contract
short: 閃電網路支付的核心機制，結合雜湊鎖和時間鎖實現無需信任的多跳支付。知道原像可領取，超時則退回。
aliases: [雜湊時間鎖合約]
category: lightning
difficulty: advanced
relatedTerms: [lightning-network, channel, hash]
seeAlso: [/learn/lightning/htlc]
---

HTLC（Hash Time-Locked Contract）是閃電網路支付的核心機制，結合雜湊鎖和時間鎖，實現無需信任的多跳支付。

## 運作原理

```
條件 1：知道 preimage（原像）可立即領取
條件 2：超時後原發送者可取回資金

hash = SHA256(preimage)
```

## 支付流程

```
Alice → Bob → Carol

1. Carol 生成隨機數 R，給 Alice hash(R)
2. Alice 給 Bob：1000 sats，條件是知道 R
3. Bob 給 Carol：999 sats，條件是知道 R
4. Carol 揭露 R 領取 999 sats
5. Bob 用 R 向 Alice 領取 1000 sats
```

## 安全保障

- **原子性**：要嘛全成功，要嘛全失敗
- **無需信任**：中間節點無法盜取資金
- **時間保護**：超時自動退款

## 時間鎖遞減

每一跳的時間鎖必須遞減，確保下游有時間領取：

```
Alice→Bob: 100 區塊
Bob→Carol: 50 區塊
```
