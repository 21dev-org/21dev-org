---
term: 數位簽名
termEn: Digital Signature
short: 使用私鑰對交易數據進行加密簽署，證明交易由私鑰持有者授權。比特幣支持 ECDSA 和 Schnorr 兩種簽名算法。
aliases: [簽名, Signature]
category: cryptography
difficulty: intermediate
relatedTerms: [private-key, public-key, transaction]
---

數位簽名是比特幣安全性的核心機制，它使用私鑰對交易數據進行加密簽署，證明交易確實由私鑰持有者授權。任何人都可以用對應的公鑰驗證簽名的有效性，但只有私鑰持有者才能產生有效簽名。

## 數位簽名的本質

### 基本原理

```
數位簽名的三個關鍵操作：

1. 金鑰生成（Key Generation）
   私鑰 → 公鑰
   k（隨機數）→ K = k × G（橢圓曲線乘法）

2. 簽名（Sign）
   訊息 m + 私鑰 k → 簽名 (r, s)

3. 驗證（Verify）
   訊息 m + 公鑰 K + 簽名 (r, s) → true/false

性質：
- 只有私鑰持有者能產生有效簽名
- 任何人都能用公鑰驗證
- 簽名綁定特定訊息（無法移植到其他訊息）
- 不洩露私鑰資訊
```

### 簽名在比特幣中的角色

```
交易流程：

┌─────────────────────────────────────────────────┐
│                                                 │
│  1. 構建交易                                     │
│     ┌─────────────────────────────────┐         │
│     │  輸入：前一筆交易的輸出          │         │
│     │  輸出：接收地址 + 金額           │         │
│     └─────────────────────────────────┘         │
│                      │                          │
│                      ▼                          │
│  2. 計算交易雜湊                                 │
│     hash = SHA256(SHA256(序列化交易))           │
│                      │                          │
│                      ▼                          │
│  3. 用私鑰簽名                                   │
│     signature = Sign(hash, private_key)         │
│                      │                          │
│                      ▼                          │
│  4. 附加簽名到交易                               │
│     scriptSig 或 witness 中                     │
│                      │                          │
│                      ▼                          │
│  5. 廣播到網路                                   │
│     節點驗證簽名後傳播                           │
│                                                 │
└─────────────────────────────────────────────────┘
```

## ECDSA 簽名算法

### 橢圓曲線基礎

```
比特幣使用 secp256k1 曲線：

曲線方程：y² = x³ + 7 (mod p)

參數：
p = 2²⁵⁶ - 2³² - 977  （質數模數）
G = 基點（生成點）
n = 曲線階（點的數量）

n = 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEBAAEDCE6AF48A03BBFD25E8CD0364141

私鑰 k：1 到 n-1 之間的隨機數
公鑰 K = k × G（橢圓曲線點乘法）
```

### ECDSA 簽名過程

```
ECDSA 簽名算法：

輸入：
- 訊息雜湊 z
- 私鑰 d

步驟：
1. 選擇隨機數 k（1 < k < n）
2. 計算 R = k × G（橢圓曲線點）
3. r = R.x mod n（取 x 座標）
4. s = k⁻¹ × (z + r × d) mod n
5. 簽名 = (r, s)

虛擬碼：
def ecdsa_sign(z, d):
    k = random(1, n-1)          # 隨機數（極重要！）
    R = k * G                    # 橢圓曲線乘法
    r = R.x % n
    s = (modular_inverse(k, n) * (z + r * d)) % n

    # Low-S 標準化（BIP 146）
    if s > n // 2:
        s = n - s

    return (r, s)

注意：
- k 必須真正隨機
- 重複使用 k = 洩露私鑰！
- PlayStation 3 駭客事件就是因為重複使用 k
```

### ECDSA 驗證過程

```
ECDSA 驗證算法：

輸入：
- 訊息雜湊 z
- 公鑰 P
- 簽名 (r, s)

步驟：
1. 驗證 r, s 在有效範圍 [1, n-1]
2. 計算 u₁ = z × s⁻¹ mod n
3. 計算 u₂ = r × s⁻¹ mod n
4. 計算 R' = u₁ × G + u₂ × P
5. 驗證 r == R'.x mod n

虛擬碼：
def ecdsa_verify(z, P, r, s):
    # 範圍檢查
    if not (1 <= r < n and 1 <= s < n):
        return False

    s_inv = modular_inverse(s, n)
    u1 = (z * s_inv) % n
    u2 = (r * s_inv) % n

    R_prime = u1 * G + u2 * P  # 兩次橢圓曲線乘法

    return r == R_prime.x % n
```

### DER 編碼格式

```
ECDSA 簽名的 DER 編碼：

結構：
30 <總長度>
   02 <r長度> <r值>
   02 <s長度> <s值>

範例：
30 45                           // SEQUENCE, 69 bytes
   02 21                        // INTEGER, 33 bytes
      00 b9...                  // r 值（帶前導零避免負數）
   02 20                        // INTEGER, 32 bytes
      5e...                     // s 值

長度變化：
- r 和 s 各 32 bytes
- 但可能需要前導零（33 bytes）
- 總長度：70-72 bytes

+ SIGHASH 標誌（1 byte）
= 完整簽名：71-73 bytes
```

## Schnorr 簽名算法

### Schnorr vs ECDSA

```
比較表：

┌─────────────────┬───────────────┬───────────────┐
│      特性       │    ECDSA      │    Schnorr    │
├─────────────────┼───────────────┼───────────────┤
│ 簽名大小        │ 71-73 bytes   │ 64 bytes      │
│ 公鑰大小        │ 33 bytes      │ 32 bytes      │
│ 數學性質        │ 非線性        │ 線性          │
│ 批量驗證        │ 否            │ 是            │
│ 簽名聚合        │ 否            │ 是（MuSig）   │
│ 安全性證明      │ 有            │ 更強          │
│ 比特幣支援      │ 創世          │ Taproot       │
└─────────────────┴───────────────┴───────────────┘

Schnorr 更簡潔：
- 固定 64 bytes（r: 32, s: 32）
- 無 DER 編碼開銷
- 公鑰只需 x 座標
```

### Schnorr 簽名過程（BIP 340）

```
BIP-340 Schnorr 簽名：

輸入：
- 訊息 m
- 私鑰 d

步驟：
1. 計算公鑰 P = d × G
2. 如果 P.y 是奇數，d = n - d（確保 even y）
3. k = hash(d || P || m)（確定性隨機數）
4. R = k × G
5. 如果 R.y 是奇數，k = n - k
6. e = hash(R.x || P.x || m)
7. s = (k + e × d) mod n
8. 簽名 = R.x || s（各 32 bytes）

關鍵改進：
- 確定性 k（無隨機數風險）
- 固定 64 bytes 輸出
- x-only 公鑰（32 bytes）
```

### Schnorr 驗證過程

```
BIP-340 Schnorr 驗證：

輸入：
- 訊息 m
- 公鑰 P（32 bytes，x 座標）
- 簽名 (R, s)（各 32 bytes）

步驟：
1. 從 P.x 恢復完整公鑰點（假設 even y）
2. e = hash(R || P || m)
3. 計算 s × G
4. 計算 R + e × P
5. 驗證 s × G == R + e × P

數學原理：
s = k + e × d
s × G = k × G + e × d × G
s × G = R + e × P  ✓
```

### 批量驗證

```
Schnorr 批量驗證優勢：

單獨驗證 n 個簽名：
- 需要 2n 次橢圓曲線乘法
- O(n) 複雜度

批量驗證 n 個簽名：
- 隨機化後合併
- 只需約 n+1 次乘法
- 約 2 倍加速

實現：
def batch_verify(signatures):
    """批量驗證多個 Schnorr 簽名"""
    # 隨機係數
    a = [random() for _ in signatures]

    # 聚合驗證
    # Σ(aᵢ × sᵢ) × G == Σ(aᵢ × Rᵢ) + Σ(aᵢ × eᵢ × Pᵢ)

    left = sum(a[i] * s[i] for i in range(n)) * G
    right = sum(a[i] * R[i] + a[i] * e[i] * P[i] for i in range(n))

    return left == right

應用場景：
- 區塊驗證（數百筆交易）
- 初始同步加速
```

## SIGHASH 類型

### SIGHASH 概述

```
SIGHASH 控制簽名覆蓋範圍：

┌─────────────────┬───────┬────────────────────────┐
│    SIGHASH      │  值   │         含義           │
├─────────────────┼───────┼────────────────────────┤
│ SIGHASH_ALL     │ 0x01  │ 簽名所有輸入和輸出     │
│ SIGHASH_NONE    │ 0x02  │ 簽名所有輸入，無輸出   │
│ SIGHASH_SINGLE  │ 0x03  │ 簽名所有輸入+對應輸出  │
│ ANYONECANPAY    │ 0x80  │ 只簽名當前輸入（組合用）│
├─────────────────┼───────┼────────────────────────┤
│ ALL|ANYONECANPAY│ 0x81  │ 當前輸入 + 所有輸出    │
│ NONE|ANYONECANPAY│ 0x82 │ 只簽當前輸入           │
│ SINGLE|ANYONECANPAY│ 0x83│ 當前輸入 + 對應輸出   │
└─────────────────┴───────┴────────────────────────┘
```

### 各類型詳解

```
SIGHASH_ALL（最常用）：
┌─────────────────────────────────────┐
│  輸入 1 [簽名] ────────────────────┐│
│  輸入 2 [簽名] ─────────────────── ││
│  ...                               ││
├─────────────────────────────────────┤│
│  輸出 1 ←──────────────────────── │
│  輸出 2 ←──────────────────────────┘│
│  ...                                │
└─────────────────────────────────────┘
用途：標準支付（最安全）

SIGHASH_NONE：
┌─────────────────────────────────────┐
│  輸入 1 [簽名] ────────────────────┐│
│  輸入 2 [簽名] ─────────────────── ││
├─────────────────────────────────────┤│
│  輸出：任意 ←────────（不簽名）     │
└─────────────────────────────────────┘
用途：授權他人決定輸出（危險！）

SIGHASH_SINGLE：
┌─────────────────────────────────────┐
│  輸入 1 [簽名] ──────────────────┐  │
│  輸入 2 [簽名] ────────────────┐ │  │
├─────────────────────────────────┼─┼──┤
│  輸出 1 ←──────────────────────┘ │  │
│  輸出 2 ←────────────────────────┘  │
│  輸出 3（新增）                     │
└─────────────────────────────────────┘
用途：彩色幣、原子交換

ANYONECANPAY | ALL：
┌─────────────────────────────────────┐
│  輸入 1 [簽名] ──┐                  │
│  輸入 2（可新增）│                  │
├──────────────────┼──────────────────┤
│  輸出 1 ←────────┘                  │
│  輸出 2 ←────────┘                  │
└─────────────────────────────────────┘
用途：眾籌（多人添加輸入）
```

### 應用場景

```
各 SIGHASH 的實際應用：

眾籌（Crowdfunding）：
ANYONECANPAY | ALL
- 目標收款地址固定
- 任何人可以添加輸入
- 達到金額後廣播

原子交換（Atomic Swap）：
SIGHASH_SINGLE
- 每個輸入對應特定輸出
- 允許添加找零輸出
- 跨鏈交易基礎

授權代付（Delegation）：
SIGHASH_NONE
- 簽名者放棄輸出控制
- 極度危險，謹慎使用
- 通常搭配其他腳本條件
```

## 簽名實現

### JavaScript 實現

```javascript
const bitcoin = require('bitcoinjs-lib');
const { ECPairFactory } = require('ecpair');
const ecc = require('tiny-secp256k1');

const ECPair = ECPairFactory(ecc);

// 創建並簽名交易
function signTransaction(privateKey, utxo, toAddress, amount) {
  const keyPair = ECPair.fromPrivateKey(Buffer.from(privateKey, 'hex'));
  const network = bitcoin.networks.bitcoin;

  const psbt = new bitcoin.Psbt({ network });

  // 添加輸入
  psbt.addInput({
    hash: utxo.txid,
    index: utxo.vout,
    witnessUtxo: {
      script: Buffer.from(utxo.scriptPubKey, 'hex'),
      value: utxo.value,
    },
  });

  // 添加輸出
  psbt.addOutput({
    address: toAddress,
    value: amount,
  });

  // 簽名
  psbt.signInput(0, keyPair);

  // 驗證簽名
  const valid = psbt.validateSignaturesOfInput(0, (pubkey, msghash, signature) => {
    return ecc.verify(msghash, pubkey, signature);
  });
  console.log('簽名有效:', valid);

  // 完成並提取
  psbt.finalizeAllInputs();
  return psbt.extractTransaction().toHex();
}

// 驗證簽名
function verifySignature(message, signature, publicKey) {
  const hash = bitcoin.crypto.sha256(Buffer.from(message));
  return ecc.verify(hash, publicKey, signature);
}

// Schnorr 簽名（Taproot）
function schnorrSign(privateKey, message) {
  const keyPair = ECPair.fromPrivateKey(Buffer.from(privateKey, 'hex'));
  const tweakedKey = keyPair.tweak(
    bitcoin.crypto.taggedHash('TapTweak', keyPair.publicKey.slice(1))
  );

  const hash = bitcoin.crypto.taggedHash('TapSighash', message);
  return ecc.signSchnorr(hash, tweakedKey.privateKey);
}
```

### Python 實現

```python
import hashlib
import secrets
from ecdsa import SECP256k1, SigningKey, VerifyingKey

def ecdsa_sign(private_key_hex, message):
    """ECDSA 簽名"""
    # 私鑰
    private_key = bytes.fromhex(private_key_hex)
    sk = SigningKey.from_string(private_key, curve=SECP256k1)

    # 訊息雜湊
    message_hash = hashlib.sha256(hashlib.sha256(message).digest()).digest()

    # 簽名
    signature = sk.sign_digest(
        message_hash,
        sigencode=lambda r, s, order: (r, s)
    )

    return signature

def ecdsa_verify(public_key_hex, message, signature):
    """ECDSA 驗證"""
    public_key = bytes.fromhex(public_key_hex)
    vk = VerifyingKey.from_string(public_key, curve=SECP256k1)

    message_hash = hashlib.sha256(hashlib.sha256(message).digest()).digest()

    try:
        return vk.verify_digest(signature, message_hash)
    except:
        return False

def low_s_normalize(s, order):
    """Low-S 標準化（BIP 146）"""
    if s > order // 2:
        return order - s
    return s

# 簽名交易雜湊
def sign_transaction_hash(private_key_hex, sighash):
    """簽名交易雜湊"""
    private_key = bytes.fromhex(private_key_hex)
    sk = SigningKey.from_string(private_key, curve=SECP256k1)

    # 簽名
    r, s = sk.sign_digest(
        sighash,
        sigencode=lambda r, s, order: (r, s)
    )

    # Low-S
    s = low_s_normalize(s, SECP256k1.order)

    return der_encode(r, s)

def der_encode(r, s):
    """DER 編碼簽名"""
    def encode_integer(x):
        b = x.to_bytes((x.bit_length() + 7) // 8, 'big')
        if b[0] & 0x80:
            b = b'\x00' + b
        return b'\x02' + bytes([len(b)]) + b

    r_bytes = encode_integer(r)
    s_bytes = encode_integer(s)

    return b'\x30' + bytes([len(r_bytes) + len(s_bytes)]) + r_bytes + s_bytes
```

## 簽名安全

### 隨機數安全

```
k 值安全的重要性：

ECDSA 簽名：s = k⁻¹ × (z + r × d) mod n

如果 k 被重複使用：
- 兩個簽名 (r, s₁) 和 (r, s₂)
- 相同的 r 值！
- 可以計算出私鑰 d

數學推導：
s₁ = k⁻¹(z₁ + rd) mod n
s₂ = k⁻¹(z₂ + rd) mod n

s₁ - s₂ = k⁻¹(z₁ - z₂) mod n
k = (z₁ - z₂) / (s₁ - s₂) mod n
d = (s₁k - z₁) / r mod n

著名案例：
- PlayStation 3 破解（2010）
- Sony 使用固定 k
- 私鑰被完全恢復

防護措施：
- RFC 6979：確定性 k 生成
- k = HMAC(私鑰, 訊息雜湊)
- Schnorr 也使用確定性 k
```

### 簽名延展性

```
簽名延展性問題：

ECDSA 延展性：
- 簽名 (r, s) 有效
- 簽名 (r, n-s) 也有效！
- 兩者驗證同一訊息

問題：
- 第三方可以修改簽名
- 導致交易雜湊改變（txid 變化）
- 影響依賴 txid 的應用

解決方案：

1. Low-S 規則（BIP 146）
   - 要求 s ≤ n/2
   - 消除一半的可能簽名
   - 現在是共識規則

2. SegWit（BIP 141）
   - 簽名移到 witness
   - txid 不包含簽名
   - 根本解決問題

3. Schnorr 簽名
   - 天生沒有延展性
   - 固定格式簽名
```

### 驗證最佳實踐

```
簽名驗證清單：

✓ 驗證簽名格式正確
  - DER 編碼有效
  - r, s 在有效範圍

✓ 驗證 Low-S
  - s ≤ n/2
  - 拒絕 high-S 簽名

✓ 驗證公鑰有效
  - 點在曲線上
  - 不是無窮遠點

✓ 驗證數學正確
  - ECDSA/Schnorr 方程成立

✓ 驗證 SIGHASH 正確
  - 簽名覆蓋正確範圍
  - 與預期一致

✓ 驗證腳本條件
  - 滿足 scriptPubKey 要求
  - 所有必需簽名都存在
```

## 開發者資源

### Bitcoin Core RPC

```bash
# 簽名相關 RPC

# 簽名訊息
bitcoin-cli signmessage "address" "message"

# 驗證訊息簽名
bitcoin-cli verifymessage "address" "signature" "message"

# 簽名原始交易
bitcoin-cli signrawtransactionwithkey \
  "rawtx" \
  '["privatekey"]'

# 使用錢包簽名
bitcoin-cli signrawtransactionwithwallet "rawtx"

# PSBT 簽名
bitcoin-cli walletprocesspsbt "psbt"

# 檢查交易簽名
bitcoin-cli testmempoolaccept '["signedtx"]'

# 解碼簽名資訊
bitcoin-cli decoderawtransaction "signedtx"
```

### 簽名調試

```javascript
// 調試簽名問題

function debugSignature(tx, inputIndex) {
  const input = tx.ins[inputIndex];

  // 提取簽名
  const chunks = bitcoin.script.decompile(input.script);
  const signature = chunks[0];
  const pubkey = chunks[1];

  // 解析 DER
  const { r, s } = parseDER(signature.slice(0, -1));
  const sighash = signature[signature.length - 1];

  console.log('r:', r.toString('hex'));
  console.log('s:', s.toString('hex'));
  console.log('SIGHASH:', sighash.toString(16));
  console.log('公鑰:', pubkey.toString('hex'));

  // 檢查 Low-S
  const n = BigInt('0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEBAAEDCE6AF48A03BBFD25E8CD0364141');
  const sBigInt = BigInt('0x' + s.toString('hex'));
  console.log('Low-S:', sBigInt <= n / 2n);
}

function parseDER(sig) {
  // 解析 DER 編碼
  let offset = 2;
  const rLen = sig[offset + 1];
  const r = sig.slice(offset + 2, offset + 2 + rLen);

  offset += 2 + rLen;
  const sLen = sig[offset + 1];
  const s = sig.slice(offset + 2, offset + 2 + sLen);

  return { r, s };
}
```

## 常見問題

### 為什麼比特幣使用 secp256k1？

```
secp256k1 的選擇原因：

1. 效率高
   - 特殊結構允許優化
   - 驗證速度快 30%

2. 無後門疑慮
   - 參數來源透明
   - 不像 NIST 曲線有 NSA 陰影

3. 安全性
   - 沒有已知弱點
   - 經過多年實戰驗證

4. 中本聰的選擇
   - 可能受 OpenSSL 影響
   - 後來證明是明智選擇
```

### Schnorr 為什麼等到 2021？

```
Schnorr 延遲採用的原因：

1. 專利問題（1991-2008）
   - Schnorr 持有專利
   - 2008 年才過期
   - 中本聰選擇了 ECDSA

2. 保守升級策略
   - 比特幣不輕易改變
   - 需要充分測試
   - 軟分叉需要社區共識

3. 實現複雜性
   - BIP 340 定義新標準
   - 需要配合 Taproot
   - 整體設計花了數年

4. 2021 年終於啟用
   - Taproot 軟分叉
   - 區塊 709,632 啟用
   - 向後相容
```

### 簽名驗證失敗怎麼辦？

```
常見驗證失敗原因：

1. SIGHASH 不匹配
   - 簽名時和驗證時的 SIGHASH 不同
   - 檢查簽名末位元組

2. 公鑰錯誤
   - 使用了錯誤的公鑰
   - 壓縮/非壓縮格式混淆

3. 訊息雜湊錯誤
   - 序列化方式不同
   - 位元組順序問題

4. High-S 被拒絕
   - 舊簽名可能是 high-S
   - 現代節點會拒絕

5. DER 格式錯誤
   - 編碼不規範
   - 多餘的零或缺少零

調試步驟：
1. 打印 r, s 值
2. 檢查 SIGHASH 類型
3. 驗證公鑰對應
4. 確認訊息雜湊相同
```
