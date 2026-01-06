---
term: Schnorr 簽名
termEn: Schnorr Signature
short: Taproot 升級引入的簽名算法，比 ECDSA 更小（64 bytes）、支持批量驗證和簽名聚合，使多簽看起來像單簽。
aliases: [BIP-340]
category: cryptography
difficulty: advanced
relatedTerms: [signature, taproot]
seeAlso: [/bips/bip-0340, /learn/advanced/schnorr-signatures]
---

Schnorr 簽名是 2021 年 Taproot 升級引入比特幣的新簽名算法，由德國密碼學家 Claus Schnorr 於 1989 年發明。相較於原本的 ECDSA，Schnorr 簽名更簡潔（64 bytes）、支持批量驗證和簽名聚合，並具有更強的安全性證明。

## Schnorr 簽名的歷史

### 為什麼比特幣一開始沒用 Schnorr？

```
時間線：

1989：Schnorr 發明此簽名算法
1991：Schnorr 申請專利（美國專利 4,995,082）
2008：專利到期
2008：中本聰發布比特幣白皮書
2009：比特幣主網上線（使用 ECDSA）

為什麼中本聰選擇 ECDSA：
1. Schnorr 專利剛過期，軟體生態不成熟
2. ECDSA 是開放標準，有廣泛實現
3. OpenSSL 支持 ECDSA（中本聰使用 OpenSSL）
4. ECDSA 已被廣泛驗證和信任

等待 12 年才採用的原因：
1. 比特幣保守的升級策略
2. 需要設計完整的 BIP 規範
3. Taproot 整體設計需要時間
4. 社區共識需要建立
```

### 標準化過程

```
Schnorr 進入比特幣的過程：

2018-01：BIP 340 草案（Schnorr 簽名）
2018-05：BIP 341 草案（Taproot）
2018-05：BIP 342 草案（Tapscript）

2020-10：BIPs 正式化
2021-06：Speedy Trial 啟用信號收集
2021-06-12：達到 90% 礦工支持
2021-11-14：區塊 709,632 啟用 Taproot

啟用後：
- Schnorr 簽名正式可用
- P2TR 地址類型可用
- 向後相容，舊交易仍有效
```

## 數學基礎

### 核心概念

```
Schnorr 簽名的數學基礎：

使用相同的 secp256k1 曲線：
- 曲線：y² = x³ + 7 (mod p)
- 基點 G
- 階 n

私鑰和公鑰：
- 私鑰 d：隨機數 [1, n-1]
- 公鑰 P = d × G

關鍵性質——線性：
P₁ + P₂ = (d₁ + d₂) × G

這允許：
- 公鑰聚合
- 簽名聚合
- 閾值簽名
```

### BIP-340 規範

```
BIP-340 Schnorr 簽名規範：

與傳統 Schnorr 的差異：

1. X-only 公鑰（32 bytes）
   - 只儲存 x 座標
   - 假設 y 為偶數
   - 節省 1 byte

2. 確定性 nonce
   - k = hash(d || P || m)
   - 消除隨機數風險

3. Tagged Hash
   - hash = SHA256(SHA256(tag) || SHA256(tag) || data)
   - 防止跨協議攻擊

簽名格式：
┌────────────────────────────────────┐
│  R.x (32 bytes) │ s (32 bytes)    │
└────────────────────────────────────┘
總計：64 bytes（固定）
```

## 簽名與驗證

### 簽名算法

```
BIP-340 簽名流程：

輸入：
- 私鑰 d
- 訊息 m

步驟：
1. 計算公鑰 P = d × G
2. 若 P.y 為奇數：d' = n - d（翻轉私鑰）
3. 計算輔助隨機數：
   aux = random_32_bytes()
4. 計算 nonce：
   t = d' XOR hash("BIP0340/aux", aux)
   k = hash("BIP0340/nonce", t || P.x || m) mod n
5. 若 k = 0：失敗，重試
6. 計算 R = k × G
7. 若 R.y 為奇數：k' = n - k
8. 計算挑戰：
   e = hash("BIP0340/challenge", R.x || P.x || m) mod n
9. 計算 s = (k' + e × d') mod n
10. 返回簽名 (R.x, s)

虛擬碼：
def schnorr_sign(d, m, aux_rand=None):
    P = d * G
    if P.y % 2 != 0:
        d = n - d

    if aux_rand is None:
        aux_rand = random_bytes(32)

    t = xor(d, tagged_hash("BIP0340/aux", aux_rand))
    k = int(tagged_hash("BIP0340/nonce", t || P.x || m)) % n

    if k == 0:
        raise ValueError("k is zero")

    R = k * G
    if R.y % 2 != 0:
        k = n - k

    e = int(tagged_hash("BIP0340/challenge", R.x || P.x || m)) % n
    s = (k + e * d) % n

    return (R.x, s)
```

### 驗證算法

```
BIP-340 驗證流程：

輸入：
- 公鑰 P（32 bytes，x 座標）
- 訊息 m
- 簽名 (R, s)（各 32 bytes）

步驟：
1. 驗證 P 在曲線上（lift_x）
2. 驗證 r < p 且 s < n
3. 計算挑戰：
   e = hash("BIP0340/challenge", R || P || m) mod n
4. 計算 R' = s × G - e × P
5. 驗證 R'.y 為偶數
6. 驗證 R'.x == R

虛擬碼：
def schnorr_verify(P_x, m, sig):
    R, s = sig[:32], int(sig[32:64])

    # 恢復完整公鑰點（假設 even y）
    P = lift_x(P_x)
    if P is None:
        return False

    if s >= n:
        return False

    e = int(tagged_hash("BIP0340/challenge", R || P_x || m)) % n

    R_computed = s * G - e * P

    if R_computed.y % 2 != 0:
        return False

    return R_computed.x == int(R)
```

### Tagged Hash

```
BIP-340 Tagged Hash：

目的：域分離，防止跨協議攻擊

定義：
tagged_hash(tag, data) = SHA256(
    SHA256(tag) || SHA256(tag) || data
)

預計算標籤雜湊：
SHA256("BIP0340/aux")       = 預算值
SHA256("BIP0340/nonce")     = 預算值
SHA256("BIP0340/challenge") = 預算值

優化：
- 標籤雜湊可預計算
- 初始化 SHA256 狀態
- 直接從中間狀態開始

為什麼重複兩次 SHA256(tag)？
- 確保唯一的初始狀態
- 即使 tag 長度為 64 bytes
```

## 批量驗證

### 原理

```
批量驗證的數學原理：

單一驗證：
s × G = R + e × P

批量驗證 n 個簽名：
Σ(aᵢ × sᵢ) × G = Σ(aᵢ × Rᵢ + aᵢ × eᵢ × Pᵢ)

其中 aᵢ 是隨機係數（防止惡意構造）

優勢：
- 左側：一次大型點乘
- 右側：多個點乘，但可用多標量乘法優化

效率提升：
┌───────────────┬──────────────┬──────────────┐
│    驗證數量    │   單獨驗證   │   批量驗證   │
├───────────────┼──────────────┼──────────────┤
│      1        │    ~2 ms     │    ~2 ms     │
│     10        │   ~20 ms     │   ~12 ms     │
│    100        │  ~200 ms     │   ~70 ms     │
│   1000        │ ~2000 ms     │  ~400 ms     │
└───────────────┴──────────────┴──────────────┘
區塊驗證時效果顯著！
```

### 實現

```python
def batch_verify(signatures):
    """批量驗證 Schnorr 簽名"""
    n_sigs = len(signatures)

    # 隨機係數（第一個固定為 1）
    a = [1] + [random.randint(1, n-1) for _ in range(n_sigs - 1)]

    # 累加左側：Σ(aᵢ × sᵢ)
    s_sum = sum(a[i] * signatures[i].s for i in range(n_sigs)) % n

    # 累加右側點
    points = []
    scalars = []

    for i in range(n_sigs):
        sig = signatures[i]
        e = compute_challenge(sig.R, sig.P, sig.m)

        # R 點
        points.append(lift_x(sig.R))
        scalars.append(a[i])

        # e×P
        points.append(sig.P)
        scalars.append(a[i] * e % n)

    # 多標量乘法
    rhs = multi_scalar_mult(points, scalars)
    lhs = s_sum * G

    return lhs == rhs
```

## 簽名聚合（MuSig）

### MuSig2 概述

```
MuSig2：安全的多方 Schnorr 簽名

問題：
- 簡單加法不安全
- P = P₁ + P₂ 容易被攻擊
- 攻擊者選擇 P₂ = P_attack - P₁

解決方案：密鑰聚合係數

聚合公鑰：
L = hash(P₁ || P₂ || ... || Pₙ)
aᵢ = hash(L || Pᵢ)
P_agg = Σ(aᵢ × Pᵢ)

特性：
- 聚合公鑰與普通公鑰無法區分
- 需要所有參與者協作簽名
- 結果是單一 64 bytes 簽名
```

### MuSig2 流程

```
MuSig2 簽名流程（2 輪）：

參與者：Alice (d₁, P₁), Bob (d₂, P₂)
訊息：m

┌─────────────────────────────────────────────────┐
│                  第一輪：Nonce 交換              │
├─────────────────────────────────────────────────┤
│                                                 │
│  Alice:                     Bob:                │
│  生成 r₁,₁, r₁,₂           生成 r₂,₁, r₂,₂     │
│  R₁,₁ = r₁,₁×G            R₂,₁ = r₂,₁×G        │
│  R₁,₂ = r₁,₂×G            R₂,₂ = r₂,₂×G        │
│                                                 │
│        ────── 交換 R 點 ──────                  │
│                                                 │
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│                  第二輪：部分簽名                │
├─────────────────────────────────────────────────┤
│                                                 │
│  聚合 Nonce：                                    │
│  b = hash(R₁,₁ || R₂,₁ || R₁,₂ || R₂,₂ || P || m)│
│  R = R₁,₁ + R₂,₁ + b×(R₁,₂ + R₂,₂)             │
│                                                 │
│  挑戰：                                          │
│  e = hash(R || P_agg || m)                      │
│                                                 │
│  部分簽名：                                      │
│  s₁ = r₁,₁ + b×r₁,₂ + e×a₁×d₁                  │
│  s₂ = r₂,₁ + b×r₂,₂ + e×a₂×d₂                  │
│                                                 │
│  最終簽名：                                      │
│  s = s₁ + s₂                                    │
│  sig = (R, s)                                   │
│                                                 │
└─────────────────────────────────────────────────┘

結果：普通 Schnorr 簽名（64 bytes）
無法分辨是單簽還是多簽！
```

### 與傳統多簽比較

```
MuSig2 vs 傳統多簽：

傳統 2-of-3 多簽（P2WSH）：
┌─────────────────────────────────────┐
│  witness:                           │
│  ┌─────────────────────────────────┐│
│  │ OP_0                            ││
│  │ <sig1> (71-73 bytes)            ││
│  │ <sig2> (71-73 bytes)            ││
│  │ <witness_script>:               ││
│  │   OP_2 <pk1> <pk2> <pk3> OP_3   ││
│  │   OP_CHECKMULTISIG              ││
│  └─────────────────────────────────┘│
│  總大小：~250 bytes                  │
└─────────────────────────────────────┘

MuSig2 2-of-2：
┌─────────────────────────────────────┐
│  witness:                           │
│  ┌─────────────────────────────────┐│
│  │ <schnorr_sig> (64 bytes)        ││
│  └─────────────────────────────────┘│
│  總大小：64 bytes                    │
└─────────────────────────────────────┘

節省：~75% 空間（和費用！）
隱私：無法區分單簽/多簽
```

## 與 ECDSA 的詳細比較

### 技術比較

```
Schnorr vs ECDSA 完整比較：

┌───────────────────┬─────────────────┬─────────────────┐
│       特性        │     ECDSA       │    Schnorr      │
├───────────────────┼─────────────────┼─────────────────┤
│ 簽名大小          │ 71-73 bytes     │ 64 bytes        │
│                   │ (DER 編碼)      │ (固定)          │
├───────────────────┼─────────────────┼─────────────────┤
│ 公鑰大小          │ 33 bytes        │ 32 bytes        │
│                   │ (壓縮)          │ (x-only)        │
├───────────────────┼─────────────────┼─────────────────┤
│ 驗證速度          │ 基準            │ 快 ~10%         │
├───────────────────┼─────────────────┼─────────────────┤
│ 批量驗證          │ 否              │ 是（~2x 提升）  │
├───────────────────┼─────────────────┼─────────────────┤
│ 簽名聚合          │ 否              │ 是（MuSig2）    │
├───────────────────┼─────────────────┼─────────────────┤
│ 延展性            │ 有（需 low-s）  │ 無              │
├───────────────────┼─────────────────┼─────────────────┤
│ 數學性質          │ 非線性          │ 線性            │
├───────────────────┼─────────────────┼─────────────────┤
│ 安全性證明        │ 有              │ 更強（ROS）     │
├───────────────────┼─────────────────┼─────────────────┤
│ 比特幣支援        │ 所有地址類型    │ 僅 P2TR         │
└───────────────────┴─────────────────┴─────────────────┘
```

### 為什麼線性性質重要？

```
線性性質的實際意義：

ECDSA（非線性）：
- 簽名公式包含模逆元
- s = k⁻¹(z + rd)
- 無法直接相加簽名

Schnorr（線性）：
- 簽名公式是線性的
- s = k + ed
- 可以直接相加：
  s₁ + s₂ = (k₁ + k₂) + e(d₁ + d₂)

這啟用了：

1. 簽名聚合
   多個簽名 → 一個簽名

2. 適配器簽名（Adaptor Signatures）
   用於原子交換、閃電網路

3. 閾值簽名（FROST）
   t-of-n 而不暴露門檻

4. 盲簽名
   匿名憑證系統
```

## 進階應用

### 適配器簽名

```
適配器簽名（Adaptor Signatures）：

用途：原子交換、PTLC

概念：
- 正常簽名 s
- 適配器點 T = t × G
- 適配器簽名 s' = s + t

流程：
┌─────────────────────────────────────────────────┐
│                                                 │
│  Alice 有秘密 t，公開 T = t × G                 │
│                                                 │
│  1. Alice 創建適配器簽名 s'                     │
│     s' = k + e×d + t                           │
│     （無法直接使用，差一個 t）                   │
│                                                 │
│  2. Bob 驗證適配器簽名                          │
│     s' × G = R + e × P + T                     │
│     （可以驗證但不能用）                         │
│                                                 │
│  3. 交換發生後，Bob 獲得完整簽名 s              │
│     s = s' - t                                 │
│                                                 │
│  4. Alice 從鏈上學到 t                          │
│     t = s' - s                                 │
│                                                 │
└─────────────────────────────────────────────────┘

應用：
- 閃電網路 PTLC（取代 HTLC）
- 更好的隱私
- 更小的腳本
```

### FROST（閾值簽名）

```
FROST：t-of-n 閾值 Schnorr 簽名

與 MuSig2 的區別：
- MuSig2：需要所有人（n-of-n）
- FROST：只需要門檻（t-of-n）

設置階段（DKG）：
1. 每個參與者生成秘密份額
2. 使用 Shamir 秘密分享
3. 分發份額給其他人
4. 計算聚合公鑰

簽名階段：
1. t 個參與者合作
2. 生成並交換 nonce
3. 計算拉格朗日係數
4. 產生部分簽名
5. 聚合成完整簽名

特性：
- 靈活的門檻
- 參與者可離線
- 仍然是單一簽名輸出
```

## 實現範例

### JavaScript 實現

```javascript
const { schnorr } = require('@noble/secp256k1');
const { sha256 } = require('@noble/hashes/sha256');

// 生成密鑰對
function generateKeyPair() {
  const privateKey = schnorr.utils.randomPrivateKey();
  const publicKey = schnorr.getPublicKey(privateKey);

  return {
    privateKey: Buffer.from(privateKey).toString('hex'),
    publicKey: Buffer.from(publicKey).toString('hex')  // 32 bytes (x-only)
  };
}

// 簽名
async function sign(privateKey, message) {
  const privKey = Buffer.from(privateKey, 'hex');
  const msgHash = sha256(Buffer.from(message));

  const signature = await schnorr.sign(msgHash, privKey);
  return Buffer.from(signature).toString('hex');
}

// 驗證
async function verify(publicKey, message, signature) {
  const pubKey = Buffer.from(publicKey, 'hex');
  const msgHash = sha256(Buffer.from(message));
  const sig = Buffer.from(signature, 'hex');

  return await schnorr.verify(sig, msgHash, pubKey);
}

// 批量驗證
async function batchVerify(items) {
  const messages = items.map(i => sha256(Buffer.from(i.message)));
  const publicKeys = items.map(i => Buffer.from(i.publicKey, 'hex'));
  const signatures = items.map(i => Buffer.from(i.signature, 'hex'));

  return await schnorr.verifyBatch(signatures, messages, publicKeys);
}

// 使用範例
async function example() {
  const keyPair = generateKeyPair();
  console.log('公鑰:', keyPair.publicKey);  // 64 hex chars = 32 bytes

  const message = 'Hello, Schnorr!';
  const signature = await sign(keyPair.privateKey, message);
  console.log('簽名:', signature);  // 128 hex chars = 64 bytes

  const valid = await verify(keyPair.publicKey, message, signature);
  console.log('驗證:', valid);  // true
}
```

### Python 實現

```python
import hashlib
import secrets
from typing import Tuple

# secp256k1 參數
P = 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFFC2F
N = 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEBAAEDCE6AF48A03BBFD25E8CD0364141
G = (
    0x79BE667EF9DCBBAC55A06295CE870B07029BFCDB2DCE28D959F2815B16F81798,
    0x483ADA7726A3C4655DA4FBFC0E1108A8FD17B448A68554199C47D08FFB10D4B8
)

def tagged_hash(tag: str, data: bytes) -> bytes:
    """BIP-340 tagged hash"""
    tag_hash = hashlib.sha256(tag.encode()).digest()
    return hashlib.sha256(tag_hash + tag_hash + data).digest()

def int_from_bytes(b: bytes) -> int:
    return int.from_bytes(b, 'big')

def bytes_from_int(x: int) -> bytes:
    return x.to_bytes(32, 'big')

def lift_x(x: int) -> Tuple[int, int]:
    """從 x 座標恢復完整點（假設 even y）"""
    if x >= P:
        return None
    y_sq = (pow(x, 3, P) + 7) % P
    y = pow(y_sq, (P + 1) // 4, P)
    if pow(y, 2, P) != y_sq:
        return None
    if y % 2 != 0:
        y = P - y
    return (x, y)

def schnorr_sign(private_key: bytes, message: bytes) -> bytes:
    """BIP-340 Schnorr 簽名"""
    d = int_from_bytes(private_key)
    if d == 0 or d >= N:
        raise ValueError("Invalid private key")

    # 計算公鑰
    P = point_mul(G, d)
    if P[1] % 2 != 0:
        d = N - d

    # 生成 nonce
    aux = secrets.token_bytes(32)
    t = xor_bytes(bytes_from_int(d), tagged_hash("BIP0340/aux", aux))
    k0 = int_from_bytes(tagged_hash("BIP0340/nonce", t + bytes_from_int(P[0]) + message)) % N

    if k0 == 0:
        raise ValueError("k is zero")

    R = point_mul(G, k0)
    k = k0 if R[1] % 2 == 0 else N - k0

    e = int_from_bytes(tagged_hash("BIP0340/challenge",
        bytes_from_int(R[0]) + bytes_from_int(P[0]) + message)) % N

    s = (k + e * d) % N

    return bytes_from_int(R[0]) + bytes_from_int(s)

def schnorr_verify(public_key: bytes, message: bytes, signature: bytes) -> bool:
    """BIP-340 Schnorr 驗證"""
    if len(public_key) != 32 or len(signature) != 64:
        return False

    P = lift_x(int_from_bytes(public_key))
    if P is None:
        return False

    r = int_from_bytes(signature[:32])
    s = int_from_bytes(signature[32:])

    if r >= P or s >= N:
        return False

    e = int_from_bytes(tagged_hash("BIP0340/challenge",
        signature[:32] + public_key + message)) % N

    R = point_add(point_mul(G, s), point_mul(P, N - e))

    if R is None or R[1] % 2 != 0 or R[0] != r:
        return False

    return True

# 橢圓曲線運算（簡化版）
def point_add(P1, P2):
    """橢圓曲線點加法"""
    # ... 實現略
    pass

def point_mul(P, n):
    """橢圓曲線標量乘法"""
    # ... 實現略
    pass
```

## Bitcoin Core RPC

```bash
# Schnorr/Taproot 相關 RPC 命令

# 創建 Taproot 地址
bitcoin-cli getnewaddress "" bech32m

# 查看地址資訊（確認是 P2TR）
bitcoin-cli getaddressinfo "bc1p..."
# witness_version: 1
# witness_program: <x-only pubkey>

# 創建 Taproot 描述符
bitcoin-cli getdescriptorinfo "tr(<pubkey>)"

# 導入 Taproot 描述符
bitcoin-cli importdescriptors '[{
  "desc": "tr(<xpub>/86h/0h/0h/0/*)#checksum",
  "timestamp": "now",
  "active": true
}]'

# 簽名 Taproot 輸入（PSBT）
bitcoin-cli walletprocesspsbt "cHNidP8..."

# 驗證 Taproot 交易
bitcoin-cli testmempoolaccept '["signedtx"]'
```

## 常見問題

### Schnorr 比 ECDSA 更安全嗎？

```
安全性比較：

理論安全性：
- 兩者都基於離散對數問題
- 但 Schnorr 有更強的安全性證明
- Schnorr 可證明為 random oracle model 安全

實際安全性：
- Schnorr 沒有延展性問題
- 確定性 nonce 消除隨機數風險
- 更簡單的數學，更少攻擊面

結論：
- Schnorr 在理論和實踐上都更安全
- 但 ECDSA 經過更長時間驗證
- 兩者都足夠安全用於比特幣
```

### 為什麼 Schnorr 只能用於 P2TR？

```
技術原因：

1. 向後相容
   - 舊腳本驗證器不認識 Schnorr
   - 需要新的操作碼（OP_CHECKSIGADD）

2. 新的見證版本
   - P2TR 使用 witness version 1
   - 舊地址使用 version 0

3. Tapscript 整合
   - Schnorr 與 Taproot 一起設計
   - 支持 script path 和 key path

可以在舊地址使用嗎？
- 不行！
- P2PKH、P2SH、P2WPKH 都只支持 ECDSA
- 必須使用 P2TR（bc1p...）地址
```

### MuSig2 適合什麼場景？

```
MuSig2 最佳使用場景：

✅ 適合：
- 2-of-2 共同帳戶
- 冷熱錢包組合
- 高隱私要求
- 費用敏感場景
- 所有參與者通常在線

❌ 不適合：
- 需要離線簽名者（用 FROST）
- 需要審計追蹤
- 傳統企業合規要求
- t-of-n 門檻（用 FROST）

考量因素：
- 參與者可用性
- 隱私需求
- 合規要求
- 技術能力
```

### 如何從 ECDSA 遷移到 Schnorr？

```
遷移策略：

1. 不需要急著遷移
   - ECDSA 仍然完全有效
   - 安全性沒有問題

2. 新地址使用 P2TR
   - 獲得 Schnorr 好處
   - 享受較低費用

3. 舊資金可以轉移
   - 發送到新的 P2TR 地址
   - 沒有時間壓力

4. 錢包支援
   - 確認錢包支持 P2TR
   - 大多數現代錢包已支持

遷移檢查清單：
□ 確認錢包支持 Taproot
□ 生成新的 P2TR 地址
□ 測試小額收發
□ 逐步轉移資金
```

