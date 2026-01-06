---
term: 雜湊
termEn: Hash
short: 將任意長度資料轉換為固定長度輸出的單向函數。比特幣使用 SHA-256 算法，具有確定性、單向性和抗碰撞特性。
aliases: [哈希, 散列, Hash Value]
category: cryptography
difficulty: beginner
relatedTerms: [sha256, mining, merkle-tree]
---

雜湊（Hash）是將任意長度的資料轉換為固定長度輸出的單向函數。在比特幣中，雜湊函數是最基礎的密碼學工具，用於交易識別、區塊連接、工作量證明和地址生成等核心功能。

## 雜湊函數的本質

### 數學定義

```
雜湊函數 H: {0,1}* → {0,1}^n

輸入：任意長度的位元串
輸出：固定長度 n 位元的位元串

SHA-256 的情況：
輸入：任意長度
輸出：256 bits（32 bytes，64 hex 字元）
```

### 核心特性

| 特性     | 說明                       | 比特幣中的重要性 |
| -------- | -------------------------- | ---------------- |
| 確定性   | 相同輸入永遠產生相同輸出   | 可驗證交易和區塊 |
| 快速計算 | 任何輸入都能快速計算       | 高效驗證         |
| 單向性   | 無法從輸出反推輸入         | 保護私鑰和原像   |
| 雪崩效應 | 微小變化導致輸出完全不同   | 防止預測         |
| 抗碰撞   | 極難找到相同輸出的不同輸入 | 交易安全         |

## 比特幣使用的雜湊算法

### SHA-256（主要）

```
SHA-256 = Secure Hash Algorithm 256-bit

特性：
- 輸出：256 bits（32 bytes）
- 由 NSA 設計，2001 年發布
- SHA-2 家族成員
- 目前無已知碰撞

比特幣使用場景：
- 區塊頭雜湊（雙重 SHA-256）
- 工作量證明
- 交易 ID（TXID）
- Merkle 樹
```

### RIPEMD-160

```
RIPEMD-160 = RACE Integrity Primitives Evaluation Message Digest

特性：
- 輸出：160 bits（20 bytes）
- 比利時學者設計
- 與 SHA-256 結合使用

使用場景：
- 公鑰到地址轉換
- HASH160 = RIPEMD160(SHA256(data))
```

### HASH256 和 HASH160

```
比特幣定義的組合雜湊：

HASH256(x) = SHA256(SHA256(x))
用於：區塊雜湊、TXID、校驗碼

HASH160(x) = RIPEMD160(SHA256(x))
用於：公鑰雜湊、地址生成

為什麼用雙重雜湊？
1. 增加安全邊際
2. 防止長度延伸攻擊
3. 減少輸出長度（HASH160）
```

## SHA-256 詳解

### 算法結構

```
SHA-256 處理流程：

1. 消息填充（Padding）
   - 添加 1 位元的 "1"
   - 添加 0 直到長度 ≡ 448 (mod 512)
   - 添加 64 位元的原始長度

2. 分割為 512 位元區塊

3. 初始化雜湊值
   H0 = 0x6a09e667（前 8 個質數平方根的小數部分）
   H1 = 0xbb67ae85
   H2 = 0x3c6ef372
   H3 = 0xa54ff53a
   H4 = 0x510e527f
   H5 = 0x9b05688c
   H6 = 0x1f83d9ab
   H7 = 0x5be0cd19

4. 64 輪壓縮函數
   - 使用 64 個常數 K[0..63]
   - 位元運算：AND, OR, XOR, NOT, 旋轉, 移位

5. 輸出最終雜湊值（256 bits）
```

### 雪崩效應示範

```
輸入的微小變化導致完全不同的輸出：

"Hello"
→ 185f8db32271fe25f561a6fc938b2e264306ec304eda518007d1764826381969

"Hello!"
→ 334d016f755cd6dc58c53a86e183882f8ec14f52fb05345887c8a5edd42c87b7

"hello"（只改大小寫）
→ 2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824

觀察：
- 輸入只差一個字元
- 輸出完全不同
- 無法看出輸入的關聯
```

## 比特幣中的雜湊應用

### 1. 區塊雜湊（Block Hash）

```
區塊雜湊 = SHA256(SHA256(區塊頭))

區塊頭（80 bytes）：
- 版本（4 bytes）
- 前區塊雜湊（32 bytes）
- Merkle 根（32 bytes）
- 時間戳（4 bytes）
- 難度目標（4 bytes）
- Nonce（4 bytes）

範例（創世區塊）：
000000000019d6689c085ae165831e934ff763ae46a2a6c172b3f1b60a8ce26f

特點：
- 以多個零開頭（滿足難度要求）
- 唯一識別區塊
- 連接到下一個區塊
```

### 2. 交易 ID（TXID）

```
TXID = SHA256(SHA256(序列化交易))

Legacy 交易：
TXID = HASH256(整個交易)

SegWit 交易：
TXID = HASH256(交易不含見證資料)
WTXID = HASH256(完整交易含見證資料)

範例：
4a5e1e4baab89f3a32518a88c31bc87f618f76673e2cc77ab2127b7afdeda33b
（創世區塊的 coinbase 交易）
```

### 3. 工作量證明

```
挖礦的本質：找到一個 Nonce 使得

SHA256(SHA256(區塊頭)) < 目標值

目標值示例（難度 1）：
00000000ffff0000000000000000000000000000000000000000000000000000

當前難度下的目標值：
000000000000000000025...（前導零更多）

計算過程：
for nonce in range(2^32):
    hash = SHA256(SHA256(header + nonce))
    if hash < target:
        區塊有效！
```

### 4. Merkle 樹

```
Merkle 樹將所有交易組織成樹狀結構：

         Merkle Root
           /     \
        H(AB)    H(CD)
        /   \    /   \
       A     B  C     D
      H(tx0) H(tx1) H(tx2) H(tx3)

節點計算：
H(AB) = SHA256(SHA256(A + B))

特點：
- 只需 log(n) 個雜湊即可證明交易存在
- 高效的 SPV（簡易支付驗證）
```

### 5. 地址生成

```
公鑰 → 地址的過程：

壓縮公鑰（33 bytes）
    ↓ SHA-256
中間雜湊（32 bytes）
    ↓ RIPEMD-160
公鑰雜湊（20 bytes）= HASH160
    ↓ 添加版本前綴 + 校驗碼
地址（Base58Check 或 Bech32）

為什麼用 HASH160 而非直接用公鑰？
1. 更短（20 bytes vs 33 bytes）
2. 額外安全層（量子保護）
3. 校驗碼防止輸入錯誤
```

## 雜湊碰撞

### 碰撞的定義

```
碰撞：找到兩個不同的輸入產生相同輸出

H(x) = H(y)，其中 x ≠ y

生日悖論：
n 位元雜湊需要約 2^(n/2) 次嘗試才能找到碰撞

SHA-256：
理論碰撞複雜度：2^128 次操作
（目前無已知碰撞）
```

### 碰撞攻擊的影響

```
如果 SHA-256 被攻破（找到碰撞）：

影響程度：
- TXID 碰撞：理論上可能偽造交易 ID
- 區塊碰撞：可能偽造區塊（但還需滿足 PoW）

實際風險：
- SHA-256 目前是安全的
- 比特幣社區會在必要時升級算法
- SHA-3 或其他算法可作為備選
```

### 原像攻擊

```
第一原像攻擊：
給定 H(x)，找到 x
複雜度：2^256（不可行）

第二原像攻擊：
給定 x，找到 y 使得 H(x) = H(y)
複雜度：2^256（不可行）

比特幣安全依賴：
- 無法從地址反推公鑰
- 無法從區塊雜湊反推區塊頭
- 無法偽造具有相同雜湊的交易
```

## 雜湊率（Hashrate）

### 定義

```
雜湊率 = 每秒計算的雜湊次數

單位：
1 H/s = 每秒 1 次雜湊
1 KH/s = 每秒 1,000 次
1 MH/s = 每秒 1,000,000 次
1 GH/s = 每秒 10^9 次
1 TH/s = 每秒 10^12 次
1 PH/s = 每秒 10^15 次
1 EH/s = 每秒 10^18 次

當前全網算力（2024）：
~500-600 EH/s
```

### 算力與安全性

```
算力越高 → 網路越安全

攻擊成本估算：
51% 攻擊需要 > 250 EH/s
每 TH/s 成本 ≈ $50/天（電力）
攻擊成本 > $1250 萬/天

結論：
經濟上不理性的攻擊
```

## 開發者資源

### JavaScript 實現

```javascript
const crypto = require('crypto');

// SHA-256
function sha256(data) {
  return crypto.createHash('sha256').update(data).digest('hex');
}

// 雙重 SHA-256（HASH256）
function hash256(data) {
  const first = crypto.createHash('sha256').update(data).digest();
  return crypto.createHash('sha256').update(first).digest('hex');
}

// HASH160
function hash160(data) {
  const sha = crypto.createHash('sha256').update(data).digest();
  return crypto.createHash('ripemd160').update(sha).digest('hex');
}

// 範例
console.log(sha256('Hello'));
// 185f8db32271fe25f561a6fc938b2e264306ec304eda518007d1764826381969

console.log(hash256(Buffer.from('Hello')));
// 雙重雜湊結果
```

### Python 實現

```python
import hashlib

def sha256(data):
    if isinstance(data, str):
        data = data.encode()
    return hashlib.sha256(data).hexdigest()

def hash256(data):
    """雙重 SHA-256"""
    if isinstance(data, str):
        data = data.encode()
    first = hashlib.sha256(data).digest()
    return hashlib.sha256(first).hexdigest()

def hash160(data):
    """SHA-256 + RIPEMD-160"""
    if isinstance(data, str):
        data = data.encode()
    sha = hashlib.sha256(data).digest()
    return hashlib.new('ripemd160', sha).hexdigest()

# 範例
print(sha256('Hello'))
print(hash256(b'Hello'))
print(hash160(b'Hello'))
```

### Bitcoin Core RPC

```bash
# 計算交易雜湊
bitcoin-cli getrawtransaction <txid> | bitcoin-cli -stdin decoderawtransaction

# 獲取區塊雜湊
bitcoin-cli getblockhash <height>

# 區塊資訊
bitcoin-cli getblock <blockhash>

# 最佳區塊雜湊
bitcoin-cli getbestblockhash
```

## 雜湊在其他加密貨幣

### 不同的雜湊算法

| 加密貨幣          | 雜湊算法 | 特點       |
| ----------------- | -------- | ---------- |
| Bitcoin           | SHA-256  | 雙重雜湊   |
| Litecoin          | Scrypt   | 記憶體密集 |
| Ethereum (PoS 前) | Ethash   | ASIC 抗性  |
| Monero            | RandomX  | CPU 友好   |
| Zcash             | Equihash | 記憶體密集 |

### 為什麼比特幣選擇 SHA-256？

```
選擇理由：
1. 成熟穩定：設計時已有多年研究
2. 硬體加速：Intel SHA 擴展
3. 安全性：無已知弱點
4. 簡單性：易於實現和驗證

不選擇其他算法的原因：
- Scrypt：當時不存在
- 自創算法：風險太高
- SHA-3：當時未標準化
```

## 安全考量

### 量子計算威脅

```
Grover 算法：
- 將搜索複雜度從 O(n) 降到 O(√n)
- SHA-256 的安全性從 256 bits 降到 128 bits
- 128 bits 仍然足夠安全

對策：
- 當前無實際威脅
- 必要時可升級到 SHA-3 或更長雜湊
```

### 最佳實踐

```
開發時注意：
1. 永遠使用經過驗證的庫
2. 不要自己實現雜湊算法
3. 注意時序攻擊
4. 使用常數時間比較函數

錯誤示範：
if (hash === expected_hash) // 可能洩露時序資訊

正確做法：
crypto.timingSafeEqual(hash, expected_hash)
```

## 常見問題

### 為什麼用雙重 SHA-256？

```
比特幣使用 SHA256(SHA256(x)) 的原因：

1. 防止長度延伸攻擊
   - 單次 SHA-256 容易受到此攻擊
   - 雙重雜湊消除此弱點

2. 增加安全邊際
   - 即使 SHA-256 有弱點
   - 雙重應用增加破解難度

3. 歷史決定
   - 中本聰的設計選擇
   - 已被證明是好的決定
```

### 雜湊值可以預測嗎？

```
不能預測：
- 雜湊函數是確定性的，但不可預測
- 無法知道什麼輸入會產生特定模式
- 這就是挖礦需要嘗試的原因

範例：
想找到以 "0000" 開頭的雜湊
必須嘗試大量輸入
平均需要 16^4 = 65536 次
```

### 兩個不同文件可能有相同雜湊嗎？

```
理論上可能（碰撞），實際上不可能：

SHA-256 碰撞概率：
- 約 2^128 次嘗試才能找到碰撞
- 全人類的電腦運算到宇宙終結都找不到

實際應用：
- 可以安全假設不同輸入有不同雜湊
- 比特幣的安全性依賴於此假設
```
