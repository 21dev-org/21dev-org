---
term: 地址
termEn: Address
short: 接收比特幣的唯一識別碼，類似銀行帳號。有多種格式：Legacy（1開頭）、SegWit（bc1q開頭）、Taproot（bc1p開頭）。
aliases: [比特幣地址, Bitcoin Address]
category: basic
difficulty: beginner
relatedTerms: [public-key, wallet, utxo, script]
seeAlso: []
---

比特幣地址是接收比特幣的識別碼，類似於銀行帳號或電子郵件地址。地址由公鑰經過雜湊處理產生，可以安全地公開分享給任何想要付款給你的人。

## 地址的本質

### 地址 vs 公鑰

```
為什麼不直接用公鑰？

公鑰：
- 長度：33 或 65 bytes
- 暴露後有量子計算風險
- 難以人工核對

地址：
- 長度：26-62 字元
- 額外一層雜湊保護
- 包含校驗碼防止輸入錯誤
- 人類可讀格式
```

### 地址的用途

| 功能 | 說明 |
|-----|------|
| 收款 | 告訴付款方把錢發到哪裡 |
| 標識 UTXO | 鎖定在這個「條件」下的資金 |
| 驗證支付 | 確認支付到正確的地方 |

## 地址類型完整指南

### 1. P2PKH（Legacy）

```
特徵：
- 前綴：1
- 長度：26-34 字元
- 編碼：Base58Check
- 啟用：2009（創世）

範例：
1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2

生成過程：
私鑰
  → ECDSA 乘法
公鑰（33 bytes 壓縮）
  → SHA-256
  → RIPEMD-160
公鑰雜湊（20 bytes）
  → 添加版本前綴（0x00）
  → SHA-256 × 2 取前 4 bytes 作為校驗碼
  → Base58 編碼
地址

scriptPubKey：
OP_DUP OP_HASH160 <pubKeyHash> OP_EQUALVERIFY OP_CHECKSIG
```

### 2. P2SH（Script Hash）

```
特徵：
- 前綴：3
- 長度：34 字元
- 編碼：Base58Check
- 啟用：2012（BIP-16）

範例：
3J98t1WpEZ73CNmQviecrnyiWrnqRhWNLy

用途：
- 多重簽名
- 包裝 SegWit（兼容舊錢包）
- 複雜腳本

scriptPubKey：
OP_HASH160 <scriptHash> OP_EQUAL
```

### 3. P2WPKH（Native SegWit）

```
特徵：
- 前綴：bc1q
- 長度：42 字元
- 編碼：Bech32
- 啟用：2017（BIP-141/173）

範例：
bc1qw508d6qejxtdg4y5r3zarvary0c5xw7kv8f3t4

優勢：
- 手續費比 Legacy 低約 38%
- 更好的錯誤檢測
- 全小寫，易於輸入
- 支援二維碼

scriptPubKey：
OP_0 <20-byte pubKeyHash>
```

### 4. P2WSH（SegWit Script Hash）

```
特徵：
- 前綴：bc1q
- 長度：62 字元（比 P2WPKH 長）
- 編碼：Bech32
- 啟用：2017（BIP-141）

範例：
bc1qrp33g0q5c5txsp9arysrx4k6zdkfs4nce4xj0gdcccefvpysxf3qccfmv3

用途：
- SegWit 原生多簽
- 複雜腳本

scriptPubKey：
OP_0 <32-byte scriptHash>
```

### 5. P2TR（Taproot）

```
特徵：
- 前綴：bc1p
- 長度：62 字元
- 編碼：Bech32m
- 啟用：2021（BIP-341）

範例：
bc1p5d7rjq7g6rdk2yhzks9smlaqtedr4dekq08ge8ztwac72sfr9rusxg3297

優勢：
- 更好的隱私（所有交易看起來相同）
- Schnorr 簽名
- 更高效的多簽
- 支援複雜合約

scriptPubKey：
OP_1 <32-byte tweaked-pubkey>
```

## 地址格式比較

### 視覺比較

| 類型 | 前綴 | 長度 | 範例開頭 |
|-----|------|------|---------|
| P2PKH | 1 | 26-34 | 1BvBM... |
| P2SH | 3 | 34 | 3J98t... |
| P2SH-P2WPKH | 3 | 34 | 3CKX2... |
| P2WPKH | bc1q | 42 | bc1qw5... |
| P2WSH | bc1q | 62 | bc1qrp3... |
| P2TR | bc1p | 62 | bc1p5d7... |

### 手續費比較

以 1 輸入 2 輸出交易為例：

| 類型 | vsize | 相對成本 |
|-----|-------|---------|
| P2PKH | ~226 vB | 100% |
| P2SH-P2WPKH | ~134 vB | 59% |
| P2WPKH | ~110 vB | 49% |
| P2TR | ~111 vB | 49% |

### 功能比較

| 特性 | P2PKH | P2SH | P2WPKH | P2TR |
|-----|-------|------|--------|------|
| 年份 | 2009 | 2012 | 2017 | 2021 |
| 手續費 | 最高 | 較高 | 低 | 低 |
| 錯誤檢測 | 基本 | 基本 | 優秀 | 優秀 |
| 隱私 | 低 | 中 | 中 | 高 |
| 智能合約 | 有限 | 基本 | 基本 | 進階 |
| 推薦使用 | ❌ | ⚠️ | ✓ | ✓ |

## 編碼格式

### Base58Check

```
用於：P2PKH、P2SH

字符集（58 字元）：
123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz

排除的字元：
- 0（零）和 O（大寫 o）：易混淆
- I（大寫 i）和 l（小寫 L）：易混淆

校驗碼：
- SHA256(SHA256(data)) 的前 4 bytes
- 附加在數據末尾
```

### Bech32

```
用於：P2WPKH、P2WSH（SegWit v0）

字符集（32 字元）：
qpzry9x8gf2tvdw0s3jn54khce6mua7l

特點：
- 全小寫
- 排除易混淆字元：1, b, i, o
- 更強的錯誤檢測（BCH 碼）
- 可檢測最多 4 個錯誤

結構：
bc1q + witness_program + checksum
hrp  + separator + data + checksum

hrp（Human Readable Part）：
- 主網：bc
- 測試網：tb
```

### Bech32m

```
用於：P2TR（SegWit v1+）

與 Bech32 的區別：
- 校驗碼常數不同
- 修復了 Bech32 的一個缺陷
- 防止 v0 和 v1 地址混淆

結構：
bc1p + tweaked_pubkey + checksum
```

## 地址生成詳解

### P2WPKH 地址生成

```javascript
const bitcoin = require('bitcoinjs-lib');
const ecc = require('tiny-secp256k1');
const { BIP32Factory } = require('bip32');

const bip32 = BIP32Factory(ecc);

// 從私鑰生成 P2WPKH 地址
function generateP2WPKHAddress(privateKey) {
  // 1. 私鑰 → 公鑰
  const keyPair = ECPair.fromPrivateKey(privateKey);
  const publicKey = keyPair.publicKey; // 33 bytes 壓縮

  // 2. 公鑰 → 地址
  const { address } = bitcoin.payments.p2wpkh({
    pubkey: publicKey,
    network: bitcoin.networks.bitcoin
  });

  return address; // bc1q...
}
```

### P2TR 地址生成

```javascript
// Taproot 地址生成
function generateP2TRAddress(privateKey) {
  const keyPair = ECPair.fromPrivateKey(privateKey);

  // 內部公鑰（x-only，32 bytes）
  const internalPubkey = keyPair.publicKey.slice(1, 33);

  const { address } = bitcoin.payments.p2tr({
    internalPubkey: internalPubkey,
    network: bitcoin.networks.bitcoin
  });

  return address; // bc1p...
}
```

## 地址驗證

### 校驗碼驗證

```
每種地址格式都有內建校驗碼：

Base58Check 驗證：
1. 解碼 Base58
2. 分離數據和校驗碼（最後 4 bytes）
3. 計算數據的 SHA256(SHA256())
4. 比較前 4 bytes

Bech32/Bech32m 驗證：
1. 檢查 HRP（bc/tb）
2. 檢查分隔符（1）
3. 計算 BCH 校驗碼
4. 驗證校驗碼
```

### 驗證程式碼

```javascript
const bitcoin = require('bitcoinjs-lib');

function validateAddress(address) {
  try {
    // 嘗試解析地址
    const decoded = bitcoin.address.toOutputScript(
      address,
      bitcoin.networks.bitcoin
    );
    return {
      valid: true,
      type: getAddressType(decoded),
      network: 'mainnet'
    };
  } catch (e) {
    // 嘗試測試網
    try {
      bitcoin.address.toOutputScript(
        address,
        bitcoin.networks.testnet
      );
      return { valid: true, network: 'testnet' };
    } catch (e) {
      return { valid: false, error: e.message };
    }
  }
}

function getAddressType(script) {
  if (script.length === 25) return 'P2PKH';
  if (script.length === 23) return 'P2SH';
  if (script.length === 22) return 'P2WPKH';
  if (script.length === 34 && script[0] === 0x00) return 'P2WSH';
  if (script.length === 34 && script[0] === 0x51) return 'P2TR';
  return 'Unknown';
}
```

## 地址使用最佳實踐

### 地址重用的風險

```
為什麼不應該重用地址？

隱私風險：
- 所有交易可被關聯
- 收支記錄公開可查
- 第三方可追蹤你的資金流動

安全風險：
- 每次簽名都暴露公鑰
- 量子計算可能的風險
- 增加攻擊面

正確做法：
✓ 每次收款使用新地址
✓ HD 錢包自動派生新地址
✓ 使用自動找零功能
```

### 驗證地址的習慣

```
發送前必做：

1. 檢查前幾個字元
   - 主網：1, 3, bc1q, bc1p
   - 測試網：m, n, 2, tb1

2. 核對地址（至少 8 字元）
   - 開頭 4 字元
   - 結尾 4 字元

3. 小額測試
   - 先發送小額確認
   - 確認到帳後再發送大額

4. 防範剪貼板劫持
   - 複製後再次核對
   - 使用二維碼更安全
```

### 地址管理

```
標籤系統：
- 為每個地址添加標籤
- 記錄來源和用途
- 便於稅務和追蹤

範例標籤：
"2024-01 薪水"
"交易所提款 - Coinbase"
"給 Alice 的借款"
```

## 特殊地址類型

### 多簽地址

```
P2SH 多簽（3 開頭）：
- 傳統格式
- 例：3QJmV3qfvL9SuYo34YihAf3sRCW3qSinyC

P2WSH 多簽（bc1q 長地址）：
- SegWit 原生
- 更低手續費

辨識方式：
- P2WSH 地址比 P2WPKH 長（62 vs 42 字元）
```

### 時間鎖地址

```
包含時間條件的地址：
- 在特定時間/區塊高度後才能花費
- 用於遺產規劃、定期儲蓄

實現方式：
- P2SH 或 P2WSH 包裝時間鎖腳本
```

### OP_RETURN 輸出

```
不是真正的「地址」：
- 不可花費的輸出
- 用於在區塊鏈上嵌入數據
- 最多 80 bytes 數據

用途：
- 時間戳服務
- 協議標記
- Ordinals 銘文
```

## 測試網地址

### 格式對照

| 類型 | 主網 | 測試網/Signet |
|-----|------|---------------|
| P2PKH | 1... | m... 或 n... |
| P2SH | 3... | 2... |
| P2WPKH | bc1q... | tb1q... |
| P2TR | bc1p... | tb1p... |

### 測試網水龍頭

```
獲取測試幣：
- testnet: coinfaucet.eu/en/btc-testnet
- signet: signetfaucet.com
- regtest: 自己挖礦

注意：
- 測試網地址無法收取主網比特幣
- 發送前確認網路類型
```

## 常見問題

### 發送到錯誤類型的地址？

```
發送到錯誤地址類型：
- 交易會成功
- 收款方可以花費
- 只是可能需要不同錢包恢復

發送到錯誤網路（主網→測試網）：
- 地址校驗會失敗
- 錢包會拒絕發送
```

### 地址看起來很奇怪？

```
檢查清單：
1. 確認網路（主網/測試網）
2. 確認地址類型
3. 確認沒有多餘空格
4. 確認大小寫正確（Legacy 區分大小寫）

Bech32 地址：
- 全小寫是正確的
- 某些錢包顯示大寫僅為易讀
```

### 為什麼我的錢包不支援 bc1p？

```
可能原因：
- 錢包版本過舊
- 不支援 Taproot

解決方案：
- 更新錢包到最新版本
- 換用支援 Taproot 的錢包
- 暫時使用 bc1q 地址
```
