---
term: Script
termEn: Bitcoin Script
short: 比特幣的堆疊式程式語言，定義 UTXO 的花費條件。圖靈不完備以防止無限執行，確保交易驗證的確定性。
aliases: [比特幣腳本]
category: protocol
difficulty: advanced
relatedTerms: [transaction, utxo, signature, taproot]
seeAlso: []
---

Bitcoin Script 是比特幣交易中用於定義花費條件的堆疊式程式語言。每個 UTXO 都包含一個鎖定腳本（scriptPubKey），指定誰可以花費這筆資金；而花費時需要提供解鎖腳本（scriptSig）來滿足這些條件。

## 設計哲學

中本聰刻意將 Script 設計為**圖靈不完備**：

| 設計選擇   | 原因                        |
| ---------- | --------------------------- |
| 無迴圈     | 防止無限執行，避免 DoS 攻擊 |
| 無狀態     | 確保驗證結果的確定性        |
| 有限操作碼 | 減少攻擊面，提高安全性      |
| 堆疊式執行 | 簡單可預測，易於驗證        |

這種設計確保每個腳本執行都能在有限時間內完成，並且相同的輸入永遠產生相同的結果。

## 執行機制

Script 使用**後進先出（LIFO）堆疊**執行：

```
執行流程：scriptSig + scriptPubKey
         ↓
   從左到右依序執行
         ↓
   資料推入堆疊，操作碼處理堆疊
         ↓
   最終堆疊頂部為 TRUE (非零) = 有效
```

### 執行範例：P2PKH 驗證

```
scriptSig:    <sig> <pubKey>
scriptPubKey: OP_DUP OP_HASH160 <pubKeyHash> OP_EQUALVERIFY OP_CHECKSIG

執行過程：
1. <sig>           → 堆疊: [sig]
2. <pubKey>        → 堆疊: [sig, pubKey]
3. OP_DUP          → 堆疊: [sig, pubKey, pubKey]
4. OP_HASH160      → 堆疊: [sig, pubKey, hash(pubKey)]
5. <pubKeyHash>    → 堆疊: [sig, pubKey, hash(pubKey), pubKeyHash]
6. OP_EQUALVERIFY  → 驗證兩個 hash 相等，堆疊: [sig, pubKey]
7. OP_CHECKSIG     → 驗證簽名，堆疊: [TRUE]
```

## 常見操作碼分類

### 堆疊操作

| 操作碼  | 十六進制 | 功能             |
| ------- | -------- | ---------------- |
| OP_DUP  | 0x76     | 複製堆疊頂部元素 |
| OP_DROP | 0x75     | 移除堆疊頂部元素 |
| OP_SWAP | 0x7c     | 交換頂部兩個元素 |
| OP_ROT  | 0x7b     | 旋轉頂部三個元素 |

### 密碼學操作

| 操作碼           | 十六進制 | 功能                  |
| ---------------- | -------- | --------------------- |
| OP_SHA256        | 0xa8     | SHA-256 雜湊          |
| OP_HASH160       | 0xa9     | SHA-256 後 RIPEMD-160 |
| OP_HASH256       | 0xaa     | 雙重 SHA-256          |
| OP_CHECKSIG      | 0xac     | 驗證 ECDSA 簽名       |
| OP_CHECKMULTISIG | 0xae     | 驗證多重簽名          |

### 流程控制

| 操作碼    | 十六進制 | 功能                   |
| --------- | -------- | ---------------------- |
| OP_IF     | 0x63     | 條件執行開始           |
| OP_ELSE   | 0x67     | 條件分支               |
| OP_ENDIF  | 0x68     | 條件執行結束           |
| OP_VERIFY | 0x69     | 驗證頂部為真，否則失敗 |
| OP_RETURN | 0x6a     | 標記輸出不可花費       |

### 時間鎖操作

| 操作碼                 | 十六進制 | 功能                  |
| ---------------------- | -------- | --------------------- |
| OP_CHECKLOCKTIMEVERIFY | 0xb1     | 絕對時間鎖（BIP-65）  |
| OP_CHECKSEQUENCEVERIFY | 0xb2     | 相對時間鎖（BIP-112） |

## 標準腳本類型

### P2PKH（Pay-to-Public-Key-Hash）

最傳統的地址格式，以 `1` 開頭：

```
鎖定腳本（25 bytes）:
OP_DUP OP_HASH160 <20-byte pubKeyHash> OP_EQUALVERIFY OP_CHECKSIG

解鎖腳本:
<signature> <publicKey>
```

### P2SH（Pay-to-Script-Hash）

支援複雜腳本，地址以 `3` 開頭：

```
鎖定腳本（23 bytes）:
OP_HASH160 <20-byte scriptHash> OP_EQUAL

解鎖腳本:
<data> ... <redeemScript>
```

### P2WPKH（Pay-to-Witness-Public-Key-Hash）

SegWit 原生格式，地址以 `bc1q` 開頭：

```
鎖定腳本（22 bytes）:
OP_0 <20-byte pubKeyHash>

見證資料:
<signature> <publicKey>
```

### P2WSH（Pay-to-Witness-Script-Hash）

SegWit 腳本格式：

```
鎖定腳本（34 bytes）:
OP_0 <32-byte scriptHash>

見證資料:
<data> ... <witnessScript>
```

### P2TR（Pay-to-Taproot）

Taproot 格式，地址以 `bc1p` 開頭：

```
鎖定腳本（34 bytes）:
OP_1 <32-byte tweaked-pubKey>

花費方式:
- 金鑰路徑：直接 Schnorr 簽名
- 腳本路徑：揭示 Tapscript + 控制區塊
```

## 進階腳本應用

### 多重簽名（2-of-3）

```
鎖定腳本:
OP_2 <pubKey1> <pubKey2> <pubKey3> OP_3 OP_CHECKMULTISIG

解鎖腳本:
OP_0 <sig1> <sig2>
```

注意：`OP_0` 是由於 `OP_CHECKMULTISIG` 的歷史 bug，會多消耗一個堆疊元素。

### 時間鎖合約

```
# 2024年1月1日後才能花費
OP_CHECKLOCKTIMEVERIFY:
<locktime: 1704067200> OP_CHECKLOCKTIMEVERIFY OP_DROP
<pubKey> OP_CHECKSIG

# 100 個區塊後才能花費
OP_CHECKSEQUENCEVERIFY:
<sequence: 100> OP_CHECKSEQUENCEVERIFY OP_DROP
<pubKey> OP_CHECKSIG
```

### 雜湊時間鎖合約（HTLC）

閃電網路的核心機制：

```
OP_IF
    # 知道 preimage 的人可以花費
    OP_HASH160 <hash> OP_EQUALVERIFY
    <receiverPubKey> OP_CHECKSIG
OP_ELSE
    # 超時後發送者可以取回
    <timeout> OP_CHECKLOCKTIMEVERIFY OP_DROP
    <senderPubKey> OP_CHECKSIG
OP_ENDIF
```

## Script 大小限制

| 限制類型         | 數值                                |
| ---------------- | ----------------------------------- |
| 腳本最大長度     | 10,000 bytes                        |
| 堆疊元素最大數量 | 1,000                               |
| 單個元素最大長度 | 520 bytes                           |
| 操作碼執行上限   | 201（非推送操作）                   |
| 多簽金鑰上限     | 20 個（傳統） / 無限制（Tapscript） |

## Tapscript 改進

Taproot 引入的 Tapscript 對傳統 Script 做了多項改進：

1. **Schnorr 簽名**：使用 `OP_CHECKSIGADD` 替代 `OP_CHECKMULTISIG`
2. **移除限制**：無多簽金鑰數量限制
3. **批次驗證**：多個簽名可同時驗證，提高效率
4. **成功操作碼**：`OP_SUCCESSx` 預留未來升級空間

```
# Tapscript 多簽（更高效）
<pubKey1> OP_CHECKSIG
<pubKey2> OP_CHECKSIGADD
<pubKey3> OP_CHECKSIGADD
OP_2 OP_EQUAL
```

## 安全注意事項

1. **避免重複使用地址**：每個地址應只使用一次
2. **注意 OP_RETURN**：資料輸出不可花費
3. **時間鎖精度**：區塊時間可被礦工操控 ±2 小時
4. **腳本複雜度**：複雜腳本增加手續費和錯誤風險

## 開發工具

- **btcdeb**：Script 除錯器
- **miniscript**：高階 Script 編譯語言
- **Bitcoin Core**：`decodescript` RPC 命令
- **bdk/rust-bitcoin**：Rust Script 處理庫
