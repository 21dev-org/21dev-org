---
term: 區塊
termEn: Block
short: 區塊鏈的基本單位，包含一批交易和元數據（區塊頭）。新區塊約每 10 分鐘透過工作量證明機制產生。
aliases: []
category: protocol
difficulty: beginner
relatedTerms: [blockchain, mining, transaction]
seeAlso: [/tech/bitcoin-core/block-structure]
---

區塊是比特幣區塊鏈的基本構建單位，每個區塊包含一批經過驗證的交易和連接前後區塊的元數據。透過工作量證明機制，新區塊約每 10 分鐘被添加到鏈上，形成一個不斷增長的、不可篡改的交易記錄。

## 區塊的作用

### 為什麼需要區塊？

```
問題：如果每筆交易單獨處理
- 網路負載巨大
- 難以達成共識
- 順序難以確定

解決方案：批量處理
- 將多筆交易打包成區塊
- 區塊有明確順序
- 共識只需確認區塊
```

### 區塊提供的功能

| 功能 | 說明 |
|-----|------|
| 交易批處理 | 將數千筆交易打包處理 |
| 時間排序 | 確定交易的先後順序 |
| 工作量證明 | 保護網路安全 |
| 鏈式連接 | 確保歷史不可篡改 |
| 獎勵分發 | 激勵礦工參與 |

## 區塊結構詳解

### 完整區塊格式

```
區塊 = 區塊頭 + 交易計數 + 交易列表

┌─────────────────────────────────────┐
│            區塊頭（80 bytes）          │
├─────────────────────────────────────┤
│    交易計數（1-9 bytes, VarInt）       │
├─────────────────────────────────────┤
│    Coinbase 交易（第一筆）             │
├─────────────────────────────────────┤
│    交易 1                            │
├─────────────────────────────────────┤
│    交易 2                            │
├─────────────────────────────────────┤
│    ...                              │
├─────────────────────────────────────┤
│    交易 N                            │
└─────────────────────────────────────┘
```

### 區塊頭（Block Header）

區塊頭是區塊最重要的部分，包含所有元數據：

```
區塊頭結構（80 bytes）：

┌─────────────┬─────────┬──────────────────────────────┐
│    欄位      │ 大小     │ 說明                         │
├─────────────┼─────────┼──────────────────────────────┤
│ 版本        │ 4 bytes │ 區塊版本號，用於軟分叉信號      │
│ 前區塊雜湊   │ 32 bytes│ 前一區塊頭的 SHA256d 雜湊      │
│ Merkle 根   │ 32 bytes│ 所有交易的 Merkle 樹根         │
│ 時間戳      │ 4 bytes │ Unix 時間戳（秒）              │
│ 難度目標    │ 4 bytes │ nBits 格式的難度目標           │
│ Nonce       │ 4 bytes │ 工作量證明使用的隨機數          │
└─────────────┴─────────┴──────────────────────────────┘

總計：4 + 32 + 32 + 4 + 4 + 4 = 80 bytes
```

### 各欄位詳解

#### 版本（Version）

```
版本號的演進：

版本 1：原始版本（2009-2012）
版本 2：BIP-34，區塊高度在 coinbase（2012）
版本 3：BIP-66，嚴格 DER 簽名（2015）
版本 4：BIP-65，OP_CHECKLOCKTIMEVERIFY（2015）

BIP-9 版本位（Version Bits）：
- 版本 0x20000000 及以上
- 高 3 位必須是 001
- 剩餘 29 位用於軟分叉信號

範例：
0x20000002 = 支持某個軟分叉提案
0x2000000e = 支持多個軟分叉提案
```

#### 前區塊雜湊（Previous Block Hash）

```
連接區塊鏈的關鍵：

計算方式：
prev_hash = SHA256(SHA256(前區塊頭))

特點：
- 32 bytes（256 bits）
- 小端序存儲
- 創世區塊的此值為全零

作用：
- 確保區塊順序
- 一旦更改，所有後續區塊失效
- 這就是「鏈」的來源
```

#### Merkle 根（Merkle Root）

```
所有交易的摘要：

構建過程：
1. 計算每筆交易的 TXID
2. 兩兩配對，雜湊連接
3. 重複直到只剩一個值

範例（4 筆交易）：
       Merkle Root
          /    \
      H(AB)    H(CD)
      /   \    /   \
     A     B  C     D
   TXID0 TXID1 TXID2 TXID3

計算：
H(AB) = SHA256d(TXID0 + TXID1)
H(CD) = SHA256d(TXID2 + TXID3)
Root = SHA256d(H(AB) + H(CD))

奇數交易處理：
- 最後一個交易複製一份
- 與自己配對
```

#### 時間戳（Timestamp）

```
Unix 時間戳（秒）：

有效範圍：
- 必須大於前 11 個區塊的中位數時間
- 必須小於網路時間 + 2 小時

為什麼不要求精確？
- 去中心化網路難以同步時間
- 礦工可能在不同時區
- 只需要大致準確

用途：
- 難度調整計算
- 時間鎖交易驗證
- 減半時間估算
```

#### 難度目標（nBits）

```
壓縮格式的目標值：

格式：
nBits = 指數(1 byte) + 尾數(3 bytes)

解碼公式：
target = 尾數 × 256^(指數-3)

範例：
nBits = 0x1d00ffff（難度 1）
指數 = 0x1d = 29
尾數 = 0x00ffff
target = 0x00ffff × 256^(29-3)
       = 0x00000000ffff0000...（256 bits）

當前（2024）：
nBits ≈ 0x17...
表示更小的目標值（更難）
```

#### Nonce

```
工作量證明的「答案」：

範圍：0 到 2^32 - 1（約 43 億）

挖礦過程：
1. 設 nonce = 0
2. 計算 SHA256d(區塊頭)
3. 如果 < 目標值，成功！
4. 否則 nonce++，重複

問題：43 億不夠用怎麼辦？
解決方案：
- 修改 coinbase 的 extraNonce
- 這會改變 Merkle 根
- 重新開始嘗試 nonce
```

## 區塊大小與容量

### 傳統區塊大小限制

```
原始限制：1 MB

歷史：
2009：無限制（後來添加）
2010：中本聰添加 1 MB 限制
原因：防止垃圾交易攻擊

計算容量：
平均交易大小：~250 bytes
1 MB / 250 bytes ≈ 4,000 筆交易
每 10 分鐘 4,000 筆 ≈ 7 TPS
```

### SegWit 區塊權重

```
SegWit（2017）引入權重概念：

區塊權重 = (非見證資料 × 4) + 見證資料

限制：4,000,000 WU（Weight Units）

計算：
非見證資料：1 byte = 4 WU
見證資料：1 byte = 1 WU

效果：
- 實際區塊大小可達 ~2-4 MB
- 向後兼容 1 MB 限制
- 激勵使用見證折扣
```

### 實際區塊統計

```
當前（2024）平均：

區塊大小：1.5-2 MB
交易數量：2,000-4,000
區塊權重：~3.9 MWU（接近上限）

特殊情況（Ordinals/BRC-20）：
區塊大小：接近 4 MB
交易數量：可能較少（大交易）
```

## 區塊時間

### 10 分鐘設計

```
為什麼是 10 分鐘？

權衡考量：
太短：
- 區塊傳播不及時
- 分叉機率增加
- 礦工不公平（大礦池優勢）

太長：
- 確認時間太慢
- 用戶體驗差
- 資金週轉效率低

10 分鐘是平衡點：
- 足夠時間傳播到全網
- 對用戶來說可接受
- 經過多年驗證的選擇
```

### 實際區塊間隔

```
區塊間隔分布：

理論上服從指數分布：
P(T > t) = e^(-t/10)

統計數據：
- 平均：10 分鐘
- 中位數：~7 分鐘
- 有時幾秒就出塊
- 有時超過 1 小時

為什麼會波動？
- 挖礦是概率過程
- 算力波動
- 運氣成分
```

### 難度調整

```
每 2016 個區塊調整一次：

目標時間：2016 × 10 分鐘 = 20160 分鐘 = 2 週

調整公式：
新難度 = 舊難度 × (實際時間 / 目標時間)

限制：
最多增加 4 倍
最多減少到 1/4

範例：
如果 2016 區塊用了 1 週：
新難度 = 舊難度 × (10080 / 20160) = 舊難度 × 0.5
難度減半，出塊變快
```

## 特殊區塊

### 創世區塊（Genesis Block）

```
區塊 0，比特幣的起點：

時間：2009-01-03 18:15:05 UTC
雜湊：000000000019d6689c085ae165831e934ff763ae46a2a6c172b3f1b60a8ce26f

Coinbase 訊息：
"The Times 03/Jan/2009 Chancellor on brink of
second bailout for banks"

特點：
- 前區塊雜湊為全零
- 區塊獎勵不可花費（特殊設計）
- 包含時代背景的訊息
```

### 減半區塊

```
每 210,000 個區塊獎勵減半：

區塊 0：50 BTC
區塊 210,000：25 BTC（2012-11-28）
區塊 420,000：12.5 BTC（2016-07-09）
區塊 630,000：6.25 BTC（2020-05-11）
區塊 840,000：3.125 BTC（2024-04-20）
區塊 1,050,000：1.5625 BTC（~2028）
...
區塊 6,930,000：最後一個有獎勵區塊（~2140）
```

### 孤塊（Orphan Block）

```
未被納入主鏈的有效區塊：

發生原因：
1. 兩個礦工同時找到區塊
2. 網路暫時分叉
3. 一個分支最終被拋棄

處理方式：
- 孤塊的交易返回記憶池
- 礦工獎勵失效
- 需要等待更多確認
```

### 空塊（Empty Block）

```
只有 Coinbase 交易的區塊：

為什麼會有空塊？
1. 礦池策略優化
2. 區塊傳播延遲
3. 快速切換新區塊頭

過程：
- 收到新區塊時
- 還沒完成驗證
- 先開始挖空塊
- 驗證完成後再包含交易

影響：
- 減少網路吞吐量
- 用戶交易延遲
- 但符合協議規則
```

## 區塊驗證

### 驗證規則

```
節點驗證區塊的檢查項目：

1. 區塊頭驗證
   □ 區塊大小在限制內
   □ 時間戳合理
   □ 難度目標正確
   □ 工作量證明有效
   □ 版本號有效

2. 交易驗證
   □ 至少有一筆交易（Coinbase）
   □ 第一筆必須是 Coinbase
   □ 其他交易不能是 Coinbase
   □ 所有交易有效
   □ 無雙花
   □ 手續費正確

3. Merkle 樹驗證
   □ 計算 Merkle 根
   □ 與區塊頭中的值匹配

4. 總量驗證
   □ Coinbase 輸出 ≤ 區塊獎勵 + 手續費總和
```

### 驗證流程

```
收到新區塊：

1. 基本格式檢查
   ↓
2. 區塊頭驗證
   ↓
3. 檢查前區塊是否存在
   ↓
4. 驗證工作量證明
   ↓
5. 驗證所有交易
   ↓
6. 驗證 Merkle 根
   ↓
7. 更新 UTXO 集
   ↓
8. 儲存區塊
   ↓
9. 廣播給其他節點
```

## 區塊傳播

### 傳播機制

```
傳統傳播：
1. 礦工找到區塊
2. 發送完整區塊給相鄰節點
3. 節點驗證後繼續傳播
4. 約需幾秒到幾十秒

Compact Blocks（BIP-152）：
1. 發送區塊頭 + 短 TXID
2. 接收方從記憶池重建區塊
3. 只請求缺失的交易
4. 大幅減少資料傳輸

傳播時間：
傳統方式：10-60 秒
Compact Blocks：1-5 秒
```

### FIBRE 網路

```
Fast Internet Bitcoin Relay Engine：

特點：
- 礦池間的專用中繼網路
- UDP 協議減少延遲
- 前向糾錯減少重傳
- 全球分佈的中繼節點

效果：
- 傳播時間 < 1 秒
- 減少孤塊率
- 更公平的挖礦環境
```

## 開發者資源

### Bitcoin Core RPC

```bash
# 獲取區塊數量
bitcoin-cli getblockcount

# 獲取最佳區塊雜湊
bitcoin-cli getbestblockhash

# 獲取特定高度的區塊雜湊
bitcoin-cli getblockhash <height>

# 獲取區塊詳細資訊
bitcoin-cli getblock <blockhash>

# 獲取區塊詳細資訊（含交易）
bitcoin-cli getblock <blockhash> 2

# 獲取區塊頭
bitcoin-cli getblockheader <blockhash>

# 獲取區塊統計
bitcoin-cli getblockstats <height>
```

### 解析區塊頭（JavaScript）

```javascript
function parseBlockHeader(headerHex) {
  const header = Buffer.from(headerHex, 'hex');

  return {
    version: header.readInt32LE(0),
    prevHash: header.slice(4, 36).reverse().toString('hex'),
    merkleRoot: header.slice(36, 68).reverse().toString('hex'),
    timestamp: header.readUInt32LE(68),
    bits: header.readUInt32LE(72).toString(16),
    nonce: header.readUInt32LE(76)
  };
}

// 計算區塊雜湊
const crypto = require('crypto');

function blockHash(headerHex) {
  const header = Buffer.from(headerHex, 'hex');
  const hash1 = crypto.createHash('sha256').update(header).digest();
  const hash2 = crypto.createHash('sha256').update(hash1).digest();
  return hash2.reverse().toString('hex');
}
```

### 解析區塊頭（Python）

```python
import struct
import hashlib

def parse_block_header(header_hex):
    header = bytes.fromhex(header_hex)

    version = struct.unpack('<I', header[0:4])[0]
    prev_hash = header[4:36][::-1].hex()
    merkle_root = header[36:68][::-1].hex()
    timestamp = struct.unpack('<I', header[68:72])[0]
    bits = struct.unpack('<I', header[72:76])[0]
    nonce = struct.unpack('<I', header[76:80])[0]

    return {
        'version': version,
        'prev_hash': prev_hash,
        'merkle_root': merkle_root,
        'timestamp': timestamp,
        'bits': hex(bits),
        'nonce': nonce
    }

def block_hash(header_hex):
    header = bytes.fromhex(header_hex)
    hash1 = hashlib.sha256(header).digest()
    hash2 = hashlib.sha256(hash1).digest()
    return hash2[::-1].hex()
```

## 常見問題

### 區塊滿了怎麼辦？

```
當區塊空間不足：

短期效果：
- 手續費競價
- 低費率交易等待
- 記憶池堆積

用戶對策：
- 提高手續費
- 使用 RBF 加速
- 等待非擁堵時段

長期解決方案：
- SegWit（已實施）
- 閃電網路（Layer 2）
- 未來可能的擴容方案
```

### 區塊可以重組嗎？

```
區塊鏈重組（Reorg）：

發生情況：
- 發現更長的鏈
- 當前鏈被取代
- 交易可能「倒退」

深度重組的影響：
- 已確認交易可能失效
- 雙花攻擊的基礎
- 需要足夠確認數

安全建議：
- 小額：1-3 確認
- 一般：6 確認
- 大額：更多確認
```

### 為什麼確認數重要？

```
確認數 vs 安全性：

0 確認：交易未入塊，可被雙花
1 確認：入塊但可能被重組
3 確認：一般交易足夠安全
6 確認：傳統建議的安全閾值
100+ 確認：Coinbase 獎勵可用

逆轉成本：
1 確認：約 $200,000
3 確認：約 $600,000
6 確認：約 $1,200,000

（假設租用 50% 算力的成本）
```

### 區塊時間為何不穩定？

```
區塊間隔波動的原因：

1. 挖礦的隨機性
   - 找到 nonce 是概率事件
   - 有時快有時慢

2. 算力變化
   - 新礦機上線
   - 礦工離線
   - 電價變動影響

3. 難度調整滯後
   - 每 2016 區塊才調整
   - 中間可能偏離 10 分鐘

統計上：
- 約 5% 區塊 < 1 分鐘
- 約 5% 區塊 > 30 分鐘
- 平均仍是 10 分鐘
```
