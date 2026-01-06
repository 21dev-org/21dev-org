---
term: 私鑰
termEn: Private Key
short: 256 位元的隨機數字，是控制比特幣的唯一憑證。擁有私鑰就等於擁有對應地址上所有比特幣的完全控制權，必須絕對保密。
aliases: [私密金鑰, 秘密金鑰]
category: cryptography
difficulty: beginner
relatedTerms: [public-key, wallet, seed-phrase, signature]
seeAlso: []
---

私鑰是一個 256 位元（32 位元組）的隨機數字，是控制比特幣的唯一憑證。在比特幣的世界裡，「擁有」比特幣意味著擁有能夠花費它的私鑰。私鑰的安全性直接決定了你的比特幣安全。

## 私鑰的本質

### 數學定義

```
私鑰 = 一個介於 1 到 n-1 之間的整數
n = secp256k1 曲線的階數
n = 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEBAAEDCE6AF48A03BBFD25E8CD0364141

實際範圍：
最小值：0x0000...0001
最大值：0xFFFF...FFFE（略小於 n）

可能的私鑰數量：約 2^256 ≈ 10^77
（比宇宙中的原子數量還多）
```

### 隨機性的重要性

```
安全私鑰的要求：
1. 真正的隨機性（熵）
2. 不可預測
3. 不可重複

危險的做法：
❌ 使用生日、電話號碼
❌ 使用簡單密碼的 hash
❌ 使用線上生成器
❌ 複製他人的範例私鑰

正確的做法：
✓ 使用硬體隨機數生成器
✓ 使用經過審計的錢包軟體
✓ 結合多個熵源
```

## 私鑰格式

同一個私鑰可以用多種格式表示：

### 原始十六進位（64 字元）

```
e9873d79c6d87dc0fb6a5778633389f4453213303da61f20bd67fc233aa33262

特點：
- 最基本的格式
- 64 個十六進位字元
- 無校驗碼
- 無網路標識
```

### WIF（Wallet Import Format）

```
原始 WIF（未壓縮公鑰）：
5HueCGU8rMjxEXxiPuD5BDku4MkFqeZyd4dZ1jvhTVqvbTLvyTJ

WIF 壓縮格式（壓縮公鑰）：
KwdMAjGmerYanjeui5SHS7JkmpZvVipYvB2LJGU1ZxJwYvP98617

區別：
- 原始 WIF：以 5 開頭，對應未壓縮公鑰
- WIF 壓縮：以 K 或 L 開頭，對應壓縮公鑰
```

### WIF 編碼過程

```
1. 添加網路前綴
   主網：0x80
   測試網：0xef

2. 添加壓縮標記（可選）
   壓縮公鑰：附加 0x01

3. 計算校驗碼
   checksum = SHA256(SHA256(data))[0:4]

4. Base58Check 編碼
   結果 = Base58(prefix + key + [compress] + checksum)

範例（壓縮格式）：
0x80 + 私鑰(32bytes) + 0x01 + checksum(4bytes)
→ Base58 編碼
→ KwdMAjGmerY...
```

## 從私鑰到地址

```
推導流程（單向不可逆）：

私鑰（256 bits）
    ↓ 橢圓曲線乘法（k × G）
公鑰（512 bits 或 264 bits 壓縮）
    ↓ SHA-256 + RIPEMD-160
公鑰雜湊（160 bits）
    ↓ 添加版本號 + 校驗碼
地址（Base58Check 或 Bech32）
```

### 橢圓曲線運算

```
secp256k1 曲線參數：
y² = x³ + 7 (mod p)
p = 2²⁵⁶ - 2³² - 977

基點 G：
x = 0x79BE667EF9DCBBAC55A06295CE870B07029BFCDB2DCE28D959F2815B16F81798
y = 0x483ADA7726A3C4655DA4FBFC0E1108A8FD17B448A68554199C47D08FFB10D4B8

公鑰計算：
P = k × G（k 為私鑰）
結果是曲線上的一個點 (x, y)
```

### 壓縮與未壓縮公鑰

```
未壓縮公鑰（65 bytes）：
04 + x座標(32 bytes) + y座標(32 bytes)
04 79BE667E...（x）...483ADA77...（y）

壓縮公鑰（33 bytes）：
02/03 + x座標(32 bytes)
- 02 表示 y 為偶數
- 03 表示 y 為奇數

為什麼可以壓縮？
- 已知 x 可以計算出 y（曲線方程）
- 但有兩個解（正負）
- 用 02/03 區分
```

## 私鑰安全

### 威脅模型

| 威脅 | 說明 | 防禦 |
|-----|------|------|
| 物理竊取 | 有人拿到你的備份 | 加密存儲、分散備份 |
| 網路攻擊 | 惡意軟體、釣魚 | 離線存儲、硬體錢包 |
| 社會工程 | 假冒客服索取私鑰 | 永不分享私鑰 |
| 暴力破解 | 嘗試所有可能的私鑰 | 使用高熵私鑰 |
| 側信道攻擊 | 監控簽名過程 | 硬體安全模組 |

### 最佳安全實踐

```
存儲原則：

1. 永不數位化
   ❌ 拍照
   ❌ 雲端備份
   ❌ 電子郵件
   ❌ 截圖

2. 物理備份
   ✓ 紙質備份（防水墨水）
   ✓ 金屬板刻印
   ✓ 多處存放

3. 訪問控制
   ✓ 保險箱
   ✓ 密封袋（防篡改）
   ✓ 定期檢查

4. 繼承規劃
   ✓ 遺囑說明
   ✓ 多簽名設置
   ✓ 時間鎖合約
```

### 私鑰洩露的後果

```
一旦私鑰洩露：
- 攻擊者可以立即轉走所有資金
- 交易不可逆，無法追回
- 無法報警或申訴

預防措施：
1. 假設已洩露 → 立即轉移資金到新地址
2. 使用多簽錢包 → 單一私鑰洩露不致命
3. 小額測試 → 確認備份有效再大額存入
```

## 進階主題

### HD 錢包（BIP-32）

現代錢包不直接使用單一私鑰，而是從種子派生：

```
種子（512 bits）
    ↓ HMAC-SHA512
主私鑰 + 鏈碼
    ↓ 派生路徑（如 m/84'/0'/0'/0/0）
子私鑰
    ↓
孫私鑰
    ...

好處：
- 一個備份恢復所有地址
- 確定性派生，可重現
- 支援無限數量的地址
```

### 多重簽名

不依賴單一私鑰：

```
2-of-3 多簽設置：
私鑰 A（你保管）
私鑰 B（家人保管）
私鑰 C（律師保管）

花費需要任意 2 個簽名：
- A + B：正常使用
- A + C：緊急情況
- B + C：繼承

好處：
- 單一私鑰丟失不會損失資金
- 需要兩方串謀才能盜取
```

### Shamir 密鑰分割（SLIP-39）

```
將種子分割成 N 份，需要 M 份恢復：

例如 3-of-5 設置：
- 產生 5 份 share
- 任意 3 份可以恢復
- 2 份或更少無法恢復

share 1: abandon ability able about above absent...
share 2: access accident account accuse achieve...
share 3: across act action actor actress actual...
share 4: adapt add addict address adjust admit...
share 5: adult advance advice aerobic affair afford...

好處：
- 分散風險
- 單點故障保護
- 靈活的門檻設置
```

## 私鑰的數學安全性

### 為什麼私鑰無法被暴力破解？

```
計算量比較：

2^256 可能的私鑰 ≈ 10^77

假設全人類的電腦一起破解：
- 全球算力：約 10^20 次/秒
- 一年秒數：約 3 × 10^7
- 一年嘗試：約 3 × 10^27

破解需要時間：
10^77 / (3 × 10^27) = 3 × 10^49 年

對比：
- 宇宙年齡：約 1.4 × 10^10 年
- 破解時間是宇宙年齡的 10^39 倍

結論：在當前物理學定律下不可能
```

### 量子計算威脅

```
Shor 算法理論上可以破解橢圓曲線：
- 需要約 2500 量子位元（邏輯）
- 目前最大量子電腦：約 1000 物理位元

防禦措施：
1. 不要重用地址（公鑰未暴露）
2. 未來可能升級到抗量子算法
3. 比特幣社區正在研究對策
```

## 開發者資源

### 生成私鑰

```javascript
// Node.js
const crypto = require('crypto');
const privateKey = crypto.randomBytes(32);
console.log(privateKey.toString('hex'));

// 驗證範圍
const secp256k1 = require('secp256k1');
while (!secp256k1.privateKeyVerify(privateKey)) {
  privateKey = crypto.randomBytes(32);
}
```

### WIF 編碼/解碼

```javascript
const bs58check = require('bs58check');

// 私鑰 → WIF
function toWIF(privateKey, compressed = true) {
  const prefix = Buffer.from([0x80]);
  const suffix = compressed ? Buffer.from([0x01]) : Buffer.from([]);
  const data = Buffer.concat([prefix, privateKey, suffix]);
  return bs58check.encode(data);
}

// WIF → 私鑰
function fromWIF(wif) {
  const decoded = bs58check.decode(wif);
  // 移除前綴和可能的壓縮標記
  const privateKey = decoded.slice(1, 33);
  const compressed = decoded.length === 34;
  return { privateKey, compressed };
}
```

### 簽名交易

```javascript
const bitcoin = require('bitcoinjs-lib');
const ECPairFactory = require('ecpair').default;
const ecc = require('tiny-secp256k1');

const ECPair = ECPairFactory(ecc);

// 從 WIF 創建密鑰對
const keyPair = ECPair.fromWIF('KwdMAjGmerY...');

// 簽名訊息
const message = Buffer.from('Hello Bitcoin');
const hash = bitcoin.crypto.sha256(message);
const signature = keyPair.sign(hash);
```

## 常見錯誤

### 錯誤 1：使用弱隨機數

```
危險範例：
- Math.random() ❌
- 時間戳作為種子 ❌
- 可預測的序列 ❌

安全範例：
- crypto.getRandomValues() ✓
- /dev/urandom ✓
- 硬體隨機數生成器 ✓
```

### 錯誤 2：私鑰重用

```
問題：
同一私鑰用於多個用途
→ 攻擊面增加
→ 隱私降低

正確做法：
- 每個用途獨立私鑰
- 使用 HD 錢包派生
```

### 錯誤 3：忽略校驗碼

```
WIF 包含校驗碼是有原因的：
- 防止輸入錯誤
- 確保格式正確

導入私鑰時：
- 驗證校驗碼
- 驗證網路前綴
- 驗證範圍有效性
```
