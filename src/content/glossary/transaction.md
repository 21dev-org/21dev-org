---
term: 交易
termEn: Transaction
short: 將比特幣從輸入轉移到輸出的數據結構。包含版本號、輸入列表、輸出列表和鎖定時間，被區塊確認後不可逆。
aliases: [TX, 轉帳]
category: transaction
difficulty: beginner
relatedTerms: [utxo, fee, confirmation, input, output]
seeAlso: []
---

比特幣交易是一種數據結構，描述比特幣從輸入（來源）轉移到輸出（目的地）的過程。交易是比特幣系統的核心——所有比特幣的移動都通過交易完成。

## 交易結構

一筆典型的比特幣交易包含以下部分：

```
交易 = {
  version:    4 bytes    // 版本號（目前多為 1 或 2）
  marker:     1 byte     // SegWit 標記（0x00，僅限 SegWit）
  flag:       1 byte     // SegWit 標誌（0x01，僅限 SegWit）
  tx_in_count:           // 輸入數量（變長整數）
  tx_in:      []         // 輸入列表
  tx_out_count:          // 輸出數量（變長整數）
  tx_out:     []         // 輸出列表
  witness:    []         // 見證資料（僅限 SegWit）
  lock_time:  4 bytes    // 鎖定時間
}
```

### 輸入結構（tx_in）

每個輸入引用一個要花費的 UTXO：

| 欄位 | 大小 | 說明 |
|-----|------|------|
| prev_txid | 32 bytes | 前序交易的 ID（反序） |
| prev_vout | 4 bytes | 輸出索引（從 0 開始） |
| script_length | 變長 | 解鎖腳本長度 |
| scriptSig | 變長 | 解鎖腳本（簽名等） |
| sequence | 4 bytes | 序列號（用於 RBF、時間鎖） |

### 輸出結構（tx_out）

每個輸出創建一個新的 UTXO：

| 欄位 | 大小 | 說明 |
|-----|------|------|
| value | 8 bytes | 金額（satoshi，小端序） |
| script_length | 變長 | 鎖定腳本長度 |
| scriptPubKey | 變長 | 鎖定腳本（定義花費條件） |

## 交易範例解析

一筆簡單的 1 輸入 2 輸出交易：

```
原始交易 (hex):
0200000001a1b2c3...（輸入）...d4e5f6...（輸出）...00000000

解析後:
{
  "txid": "7f4a2b...",
  "version": 2,
  "size": 225,
  "vsize": 225,
  "weight": 900,
  "locktime": 0,

  "vin": [{
    "txid": "a1b2c3d4...",      // 花費哪筆交易
    "vout": 0,                   // 花費第幾個輸出
    "scriptSig": {
      "asm": "3044...01 02a1b2..."  // 簽名 + 公鑰
    },
    "sequence": 4294967295
  }],

  "vout": [
    {
      "value": 0.5,              // 支付給收款方
      "n": 0,
      "scriptPubKey": {
        "type": "witness_v0_keyhash",
        "address": "bc1q..."
      }
    },
    {
      "value": 0.4999,           // 找零
      "n": 1,
      "scriptPubKey": {
        "type": "witness_v0_keyhash",
        "address": "bc1q..."
      }
    }
  ]
}
```

## 交易類型

### 按功能分類

| 類型 | 說明 | 特點 |
|-----|------|------|
| Coinbase | 區塊獎勵交易 | 無輸入，由礦工創建 |
| 標準支付 | P2PKH/P2WPKH | 最常見的轉帳類型 |
| 多重簽名 | 需多個金鑰 | 用於共管資金 |
| 時間鎖 | 延遲可花費 | 用於遺產規劃等 |
| OP_RETURN | 資料嵌入 | 輸出不可花費 |

### 按地址格式分類

| 類型 | 地址前綴 | 說明 |
|-----|---------|------|
| P2PKH | 1... | 傳統地址 |
| P2SH | 3... | 腳本地址 |
| P2WPKH | bc1q... | 原生 SegWit |
| P2WSH | bc1q...（較長） | SegWit 腳本 |
| P2TR | bc1p... | Taproot |

## 交易 ID（TXID）

每筆交易都有唯一的識別碼：

```
TXID = SHA256(SHA256(raw_transaction))
     = reverse(32-byte result)

注意：
- TXID 是交易內容的雜湊，內容變 = TXID 變
- 在區塊瀏覽器顯示時是反序（大端序）
- SegWit 引入 WTXID（包含見證資料的雜湊）
```

### TXID vs WTXID

| 標識符 | 計算範圍 | 用途 |
|--------|---------|------|
| TXID | 不含 witness | 傳統交易識別 |
| WTXID | 含 witness | SegWit 交易完整識別 |

## 交易費用計算

手續費 = 輸入總額 - 輸出總額

```
費率計算（SegWit）：
費用 = vsize × sat/vB

vsize = (weight + 3) / 4
weight = (non-witness × 4) + witness

例如：
非見證資料：100 bytes → 400 WU
見證資料：50 bytes → 50 WU
總重量：450 WU
vsize：113 vB
費率 10 sat/vB → 費用 1130 sat
```

### 交易大小估算

| 交易類型 | 典型 vsize |
|---------|-----------|
| P2PKH 1→2 | ~226 vB |
| P2WPKH 1→2 | ~141 vB |
| P2WPKH 2→2 | ~208 vB |
| P2TR 1→2 | ~154 vB |

## 交易生命週期

```
1. 創建交易
   ├── 選擇輸入（UTXO）
   ├── 設定輸出（收款 + 找零）
   └── 計算手續費

2. 簽名
   ├── 對每個輸入簽名
   └── 產生 scriptSig / witness

3. 廣播
   ├── 發送到連接的節點
   └── 節點驗證並轉發

4. 記憶池等待
   ├── 交易進入 mempool
   └── 等待礦工選中

5. 區塊確認
   ├── 礦工打包到區塊
   ├── 區塊被網路接受
   └── 獲得確認（1, 2, 3...）

6. 深度確認
   └── 6+ 確認 = 高度安全
```

## 進階交易功能

### RBF（Replace-By-Fee）

允許用更高手續費替換未確認交易：

```
啟用條件：sequence < 0xfffffffe

原始交易：
  input sequence: 0xfffffffd (RBF 啟用)
  fee: 1000 sat

替換交易：
  相同輸入
  fee: 2000 sat (必須更高)
  輸出可以修改
```

### 時間鎖（Locktime）

```
nLocktime 欄位：
- 0：立即可確認
- < 500,000,000：區塊高度
- ≥ 500,000,000：Unix 時間戳

例如：
locktime: 800000 → 區塊 800000 後才能確認
locktime: 1704067200 → 2024-01-01 後才能確認
```

### 批量交易

將多筆支付合併成一筆交易：

```
一般交易（3 筆支付）：
交易1: 1輸入→2輸出 (141 vB)
交易2: 1輸入→2輸出 (141 vB)
交易3: 1輸入→2輸出 (141 vB)
總計: 423 vB

批量交易：
交易: 1輸入→4輸出 (175 vB)
節省: 約 60%
```

## 交易驗證

節點收到交易後進行以下驗證：

1. **格式驗證**
   - 交易大小 ≤ 400,000 WU
   - 輸入/輸出數量 > 0
   - 輸出金額 ≥ 0 且總和不溢位

2. **UTXO 驗證**
   - 所有輸入引用的 UTXO 存在
   - UTXO 未被花費

3. **腳本驗證**
   - scriptSig + scriptPubKey 執行成功
   - 簽名有效

4. **金額驗證**
   - 輸入總額 ≥ 輸出總額
   - 差額為手續費

5. **共識規則**
   - 符合當前啟用的 BIP
   - 時間鎖條件滿足

## 特殊交易

### Coinbase 交易

每個區塊的第一筆交易，創建新比特幣：

```
特點：
- 無輸入（prev_txid 全為 0）
- 可包含任意資料（最多 100 bytes）
- 輸出需等待 100 個區塊才能花費
- 金額 = 區塊獎勵 + 區塊內所有手續費
```

### OP_RETURN 交易

在區塊鏈上永久存儲資料：

```
輸出腳本：
OP_RETURN <data>

特點：
- 輸出金額通常為 0
- 不可花費（可證明銷毀）
- 最多 80 bytes 資料
- 用於時間戳、協議標記等
```

## 開發者資源

### Bitcoin Core RPC

```bash
# 解碼原始交易
bitcoin-cli decoderawtransaction <hex>

# 創建原始交易
bitcoin-cli createrawtransaction '[{"txid":"...","vout":0}]' '{"address":0.1}'

# 簽名交易
bitcoin-cli signrawtransactionwithwallet <hex>

# 廣播交易
bitcoin-cli sendrawtransaction <hex>
```

### 常用工具

- **區塊瀏覽器**：mempool.space, blockstream.info
- **交易構建**：bitcoinjs-lib, python-bitcoinlib
- **簽名工具**：硬體錢包, Bitcoin Core
