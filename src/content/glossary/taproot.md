---
term: Taproot
termEn: Taproot
short: 2021 年啟用的重大升級，結合 Schnorr 簽名和 MAST 技術。提升隱私性（所有交易看起來相同）、降低複雜合約的手續費。
aliases: [BIP-341]
category: protocol
difficulty: advanced
relatedTerms: [schnorr, segwit, script, signature]
seeAlso: []
---

Taproot 是比特幣自 2017 年 SegWit 以來最重大的升級，於 2021 年 11 月在區塊高度 709,632 啟用。它通過結合 Schnorr 簽名（BIP-340）、Taproot 輸出（BIP-341）和 Tapscript（BIP-342）三項改進，大幅提升比特幣的隱私性、效率和智能合約能力。

## 核心組成

### BIP-340：Schnorr 簽名

取代 ECDSA 的新簽名方案：

| 特性 | ECDSA | Schnorr |
|-----|-------|---------|
| 簽名大小 | 71-73 bytes | 64 bytes |
| 驗證速度 | 較慢 | 較快 |
| 金鑰聚合 | 不支援 | 原生支援 |
| 批次驗證 | 不支援 | 支援 |
| 數學證明 | 複雜 | 簡單 |

```
Schnorr 簽名結構：
(R, s) where:
- R = k*G (隨機點)
- s = k + e*x (e = hash(R, P, m))
- 總共 64 bytes（32 + 32）

驗證方程：
s*G = R + e*P
```

### BIP-341：Taproot 輸出

新的輸出類型，地址以 `bc1p` 開頭：

```
P2TR 輸出結構：
scriptPubKey: OP_1 <32-byte tweaked-pubkey>

tweaked-pubkey = P + hash(P, merkle_root)*G

其中：
- P：內部公鑰（internal key）
- merkle_root：腳本樹的根（可選）
```

### BIP-342：Tapscript

升級版的 Bitcoin Script：

| 改進 | 說明 |
|-----|------|
| OP_CHECKSIGADD | 替代 OP_CHECKMULTISIG |
| 無多簽限制 | 移除 20 金鑰限制 |
| OP_SUCCESS | 預留升級空間 |
| 簽名算法 | 使用 Schnorr |

## 花費方式

Taproot 提供兩種花費路徑：

### 金鑰路徑（Key Path）

最簡單、最常用的花費方式：

```
直接用 tweaked 金鑰簽名
外觀：單一 Schnorr 簽名（64 bytes）
隱私：與普通單簽交易無法區分

適用場景：
- 所有參與者同意
- 多簽的「快樂路徑」
- 普通單人花費
```

### 腳本路徑（Script Path）

揭露 MAST 中的特定腳本：

```
見證資料結構：
<witness stack>
<script>
<control block>

control block 包含：
- 葉版本（leaf version）
- 內部公鑰
- Merkle 證明（驗證腳本在樹中）
```

## MAST 結構

Merklized Alternative Script Tree：

```
                    根
                   /  \
                 /      \
               H1        H2
              /  \      /  \
            腳本A 腳本B 腳本C 腳本D

優勢：
- 只需揭露使用的腳本
- 未使用的腳本保持隱私
- 更小的見證資料
```

### 實際範例：2-of-3 多簽

```
傳統 P2SH 多簽：
輸入大小：~297 bytes
必須揭露：所有 3 個公鑰 + 2 個簽名

Taproot 方式：

金鑰路徑（MuSig2 聚合）：
- 3 人協作產生單一聚合簽名
- 輸入大小：~57 bytes
- 外觀：普通單簽交易

腳本路徑（fallback）：
        root
       /    \
   2-of-AB  2-of-BC
            2-of-AC

- 只揭露使用的那個 2-of-2 腳本
- 節省空間 + 保護隱私
```

## 隱私改進

### 交易同質性

```
升級前：
- 單簽交易：明顯是單簽
- 多簽交易：明顯是多簽（看到多個公鑰）
- 時間鎖：明顯有時間鎖條件
- 閃電通道：特徵明顯

升級後：
- 所有 Taproot 交易看起來一樣
- 無法區分單簽、多簽、複雜合約
- 除非使用腳本路徑（但也只揭露部分）
```

### 金鑰聚合

```
傳統 3-of-3 多簽：
公開 3 個公鑰，需要 3 個簽名

MuSig2 聚合簽名：
P_agg = P1 + P2 + P3（聚合公鑰）
s_agg = s1 + s2 + s3（聚合簽名）
外觀：單一公鑰 + 單一簽名
```

## 地址格式

### Bech32m 編碼

Taproot 使用 Bech32m（BIP-350）而非 Bech32：

```
SegWit v0（Bech32）：
bc1qw508d6qejxtdg4y5r3zarvary0c5xw7kv8f3t4

Taproot（Bech32m）：
bc1p5cyxnuxmeuwuvkwfem96lqzszd02n6xdcjrs20cac6yqjjwudpxqkedrcr

差異：
- 最後 6 字元校驗碼算法不同
- 防止 v0 和 v1+ 地址混淆
```

### 地址識別

| 類型 | 前綴 | 長度 |
|-----|------|------|
| P2PKH | 1... | 34 字元 |
| P2SH | 3... | 34 字元 |
| P2WPKH | bc1q... | 42 字元 |
| P2WSH | bc1q... | 62 字元 |
| P2TR | bc1p... | 62 字元 |

## 實際應用

### 閃電網路通道

```
升級前：
- 開關通道交易特徵明顯
- 2-of-2 多簽可識別

升級後（Taproot Channels）：
- 金鑰路徑：看起來像普通支付
- 只有強制關閉才揭露腳本
- 大幅改善閃電網路隱私
```

### 保險庫（Vault）

```
設計：
- 正常提款：需等待時間鎖
- 緊急取消：立即可用

Taproot 腳本樹：
        root
       /    \
  緊急取消   延遲提款
（立即簽名） （時間鎖後簽名）

好處：
- 正常使用看不出是 Vault
- 只在緊急情況揭露取消路徑
```

### DLC（離散對數合約）

```
場景：Alice 和 Bob 對未來事件下注

Taproot 優勢：
- 結算交易看起來像普通支付
- 減少鏈上數據
- 提高複雜合約的可行性
```

### Ordinals 和銘文

```
Taproot 被用於：
- 在見證資料中嵌入任意數據
- 創建 Bitcoin NFT（Ordinals）
- BRC-20 代幣

技術細節：
- 使用腳本路徑的見證資料
- envelope 格式嵌入數據
- 利用 Tapscript 的靈活性
```

## 開發指南

### 創建 Taproot 地址

```javascript
// 使用 bitcoinjs-lib
const { p2tr } = require('bitcoinjs-lib').payments;

// 單純金鑰路徑（無腳本）
const internalKey = Buffer.from(pubkey, 'hex');
const { address } = p2tr({ internalPubkey: internalKey });
// bc1p...

// 帶腳本樹
const scriptTree = {
  output: bitcoin.script.compile([...])
};
const { address } = p2tr({
  internalPubkey: internalKey,
  scriptTree
});
```

### 金鑰調整（Tweak）

```
計算 tweaked 公鑰：

import hashlib
from secp256k1 import ...

def taproot_tweak(internal_key, merkle_root=None):
    if merkle_root:
        t = tagged_hash("TapTweak", internal_key + merkle_root)
    else:
        t = tagged_hash("TapTweak", internal_key)

    tweaked_key = internal_key + t * G
    return tweaked_key
```

### 簽名 Taproot 交易

```python
# 金鑰路徑簽名
from bip340 import schnorr_sign

message = sighash_taproot(tx, input_index, ...)
signature = schnorr_sign(tweaked_private_key, message)
# 64 bytes 簽名
```

## 採用狀況（2024）

| 指標 | 數值 |
|-----|------|
| Taproot 輸出佔比 | ~15-20% |
| 支援的錢包 | 大多數主流錢包 |
| 交易所支援 | 逐漸增加中 |

### 錢包支援

| 錢包 | 發送 | 接收 |
|-----|------|------|
| Bitcoin Core | ✓ | ✓ |
| Sparrow | ✓ | ✓ |
| BlueWallet | ✓ | ✓ |
| Ledger | ✓ | ✓ |
| Trezor | ✓ | ✓ |

## 常見誤解

### 「Taproot 讓比特幣支援智能合約」

```
事實：
- 比特幣一直有 Script（有限的智能合約）
- Taproot 讓複雜合約更高效、更私密
- 但仍是圖靈不完備的
```

### 「Taproot 破壞隱私」

```
背景：Ordinals 使用 Taproot
事實：
- Taproot 設計是增強隱私
- 數據嵌入與 Taproot 本身無關
- OP_RETURN 也可以嵌入數據
```

## 延伸閱讀

- **BIP-340**：Schnorr Signatures
- **BIP-341**：Taproot: SegWit version 1
- **BIP-342**：Tapscript
- **BIP-350**：Bech32m 地址編碼

## 開發工具

- **Bitcoin Core 22.0+**：完整 Taproot 支援
- **bitcoinjs-lib 6.x**：JavaScript 庫
- **rust-bitcoin**：Rust 實現
- **bdk**：Bitcoin Dev Kit
