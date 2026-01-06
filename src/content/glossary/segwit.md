---
term: SegWit
termEn: Segregated Witness
short: 2017 年啟用的軟分叉升級，將簽名資料從交易結構分離。解決交易延展性問題，使閃電網路成為可能，並提升區塊容量。
aliases: [隔離見證, BIP-141]
category: protocol
difficulty: intermediate
relatedTerms: [transaction, block, taproot, script]
seeAlso: []
---

SegWit（Segregated Witness，隔離見證）是 2017 年 8 月在區塊高度 481,824 啟用的比特幣軟分叉升級。它將交易的簽名資料（「見證」）從交易主體結構中分離出來，解決了多年來困擾比特幣的交易延展性問題，為閃電網路等二層方案奠定基礎。

## 為什麼需要 SegWit？

### 交易延展性問題

升級前，簽名是 TXID 計算的一部分：

```
問題場景：
1. Alice 發送交易 TX1（TXID: abc123）
2. 惡意節點修改簽名格式（不影響有效性）
3. 產生新 TXID（xyz789），但功能相同
4. 如果 xyz789 先被確認，abc123 失效
5. Alice 的錢包以為 abc123 失敗，可能重複支付

影響：
- 無法可靠追蹤未確認交易
- 閃電網路等依賴 TXID 的協議無法運作
- 交易所等服務商處理困難
```

### SegWit 如何解決

```
升級後：
簽名（見證）不再計入 TXID
TXID = hash(版本 + 輸入 + 輸出 + locktime)
WTXID = hash(完整交易含見證)

結果：
- TXID 不可篡改
- 閃電網路可安全使用 TXID 建構通道
```

## 核心改進

### 1. 解決交易延展性

| 改進前 | 改進後 |
|-------|-------|
| 簽名格式可變 → TXID 可變 | 簽名獨立 → TXID 固定 |
| 閃電網路不可行 | 閃電網路成為可能 |
| 依賴 TXID 的協議不安全 | 可安全建構多層協議 |

### 2. 增加區塊容量

引入「區塊權重」取代「區塊大小」：

```
權重計算規則：
- 非見證資料：1 byte = 4 WU（權重單位）
- 見證資料：1 byte = 1 WU

區塊上限：4,000,000 WU（4 MW）

實際效果：
- 舊格式交易：約 1 MB
- 全 SegWit 交易：約 2-2.3 MB
- 混合情況：約 1.5-2 MB
```

### 3. 腳本版本化

為未來升級預留空間：

```
SegWit 輸出結構：
<version> <witness program>

version 0：P2WPKH、P2WSH
version 1：Taproot（BIP-341）
version 2-16：保留未來升級
```

## 地址格式

### 原生 SegWit（Bech32）

| 類型 | 格式 | 範例 |
|-----|------|------|
| P2WPKH | bc1q + 20 bytes | bc1qw508d6qejxtdg4y5r3zarvary0c5xw7kv8f3t4 |
| P2WSH | bc1q + 32 bytes | bc1qrp33g0q5c5txsp9arysrx4k6zdkfs4nce4xj0gdcccefvpysxf3qccfmv3 |

### 兼容包裝（P2SH-wrapped）

為了向後兼容，可將 SegWit 腳本包裝在 P2SH 內：

```
P2SH-P2WPKH：
- 地址以 3 開頭（看起來像傳統多簽）
- 內部是 SegWit 腳本
- 比純 SegWit 稍大，但兼容舊錢包

結構：
scriptPubKey: OP_HASH160 <hash(redeemScript)> OP_EQUAL
redeemScript: OP_0 <20-byte pubKeyHash>
witness: <signature> <pubKey>
```

### 地址比較

| 類型 | 前綴 | 大小（vbytes）| 手續費 |
|-----|------|-------------|-------|
| P2PKH | 1... | 最大 | 最高 |
| P2SH-P2WPKH | 3... | 中等 | 中等 |
| P2WPKH | bc1q... | 最小 | 最低 |
| P2TR | bc1p... | 較小 | 較低 |

## 交易結構變化

### 傳統交易

```
[version][input_count][inputs][output_count][outputs][locktime]
```

### SegWit 交易

```
[version][marker=0x00][flag=0x01][input_count][inputs][output_count][outputs][witnesses][locktime]

marker + flag：標識這是 SegWit 交易
witnesses：每個輸入的見證資料（簽名等）
```

### 見證資料結構

```
每個輸入的見證：
[witness_count][witness_item_1][witness_item_2]...

P2WPKH 見證（2 項）：
[2][<signature>][<pubKey>]

P2WSH 2-of-3 多簽見證：
[4][<>][<sig1>][<sig2>][<redeemScript>]
```

## 交易大小比較

### 單簽 1 輸入 2 輸出

| 類型 | 大小 | vsize | 節省 |
|-----|------|-------|------|
| P2PKH | 226 bytes | 226 vB | - |
| P2SH-P2WPKH | 167 bytes | 134 vB | 40% |
| P2WPKH | 141 bytes | 110 vB | 51% |

### 2-of-3 多簽

| 類型 | 大小 | vsize | 節省 |
|-----|------|-------|------|
| P2SH | 371 bytes | 371 vB | - |
| P2SH-P2WSH | 274 bytes | 167 vB | 55% |
| P2WSH | 249 bytes | 139 vB | 62% |

## 實施細節

### 軟分叉兼容性

```
SegWit 作為軟分叉的關鍵：

舊節點視角：
- SegWit 輸出看起來是「任何人可花費」
- 但礦工共識規則阻止無效花費
- 舊節點仍可驗證區塊（不驗證見證）

新節點視角：
- 完整驗證見證資料
- 強制執行新的共識規則
```

### WTXID 和 Merkle Tree

```
區塊結構變化：

傳統 Merkle Tree：
- 只包含 TXID

SegWit 區塊：
- 傳統 Merkle Tree（TXID）保持不變
- 新增 Witness Merkle Tree（WTXID）
- 根存在 coinbase 的 OP_RETURN 輸出中
```

## 簽名雜湊改進（BIP-143）

SegWit 改進了簽名時的雜湊計算方式：

```
舊方式問題：
- 簽名雜湊需要完整序列化交易
- 多輸入時重複計算，O(n²) 複雜度
- 大交易驗證很慢

BIP-143 改進：
- 預計算可重用的雜湊
- 每個輸入簽名 O(1) 複雜度
- 大幅提升多輸入交易驗證速度
```

### 簽名雜湊組成

```
BIP-143 sighash：
1. nVersion（4 bytes）
2. hashPrevouts（32 bytes）- 所有輸入的前序輸出 hash
3. hashSequence（32 bytes）- 所有輸入的 sequence hash
4. outpoint（36 bytes）- 當前輸入的前序輸出
5. scriptCode（變長）- 執行的腳本
6. amount（8 bytes）- 花費金額（新增！）
7. nSequence（4 bytes）- 當前輸入的 sequence
8. hashOutputs（32 bytes）- 所有輸出的 hash
9. nLocktime（4 bytes）
10. sighash type（4 bytes）
```

## 採用歷史

### 啟用過程

```
時間線：
2015：最初提案
2016：優化後的 BIP-141/143/144
2017.07：BIP-91 鎖定
2017.08.24：區塊 481,824 啟用
```

### 採用率成長

| 時期 | SegWit 交易佔比 |
|-----|----------------|
| 2017.09 | ~10% |
| 2018.06 | ~35% |
| 2020.01 | ~55% |
| 2022.01 | ~70% |
| 2024.01 | ~80%+ |

### 交易所支援

大多數主要交易所現已支援 SegWit 提款：

| 交易所 | 原生 SegWit | Taproot |
|-------|------------|---------|
| Coinbase | ✓ | ✓ |
| Kraken | ✓ | ✓ |
| Binance | ✓ | 部分 |

## 開發指南

### 判斷 SegWit 交易

```javascript
// 檢查原始交易是否為 SegWit
function isSegWit(rawTx) {
  // 第 5 個字節是 marker
  // SegWit 交易：version(4) + marker(1)=0x00 + flag(1)=0x01
  return rawTx[4] === 0x00 && rawTx[5] === 0x01;
}
```

### 創建 SegWit 地址

```javascript
const bitcoin = require('bitcoinjs-lib');

// P2WPKH 地址
const { address } = bitcoin.payments.p2wpkh({
  pubkey: publicKeyBuffer
});
// bc1q...

// P2WSH 多簽
const { address } = bitcoin.payments.p2wsh({
  redeem: bitcoin.payments.p2ms({
    m: 2,
    pubkeys: [pubkey1, pubkey2, pubkey3]
  })
});
// bc1q...（較長）
```

### 計算 vsize

```javascript
function calculateVsize(txHex) {
  const tx = bitcoin.Transaction.fromHex(txHex);

  // 基礎大小（不含見證）
  const baseSize = tx.byteLength(false);

  // 完整大小（含見證）
  const totalSize = tx.byteLength(true);

  // 權重
  const weight = baseSize * 3 + totalSize;

  // vsize（向上取整）
  const vsize = Math.ceil(weight / 4);

  return vsize;
}
```

## 常見問題

### 為什麼還有人用 P2PKH？

```
原因：
1. 舊錢包未升級
2. 交易所出金限制
3. 不了解 SegWit 好處
4. 某些特殊用途

建議：
- 盡量使用原生 SegWit（bc1q）或 Taproot（bc1p）
- 手續費更低，區塊空間更省
```

### SegWit 和 Taproot 的關係？

```
Taproot（BIP-341）是 SegWit version 1：
- SegWit v0：P2WPKH、P2WSH
- SegWit v1：P2TR（Taproot）

Taproot 建立在 SegWit 基礎上：
- 使用相同的見證結構
- 使用 Bech32m 編碼（改進版）
- 引入 Schnorr 簽名
```

## 相關 BIP

- **BIP-141**：SegWit 共識規則
- **BIP-143**：交易簽名驗證
- **BIP-144**：P2P 協議更新
- **BIP-145**：getblocktemplate 更新
- **BIP-173**：Bech32 地址編碼
