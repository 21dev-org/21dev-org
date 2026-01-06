---
term: 助記詞
termEn: Seed Phrase
short: 12 到 24 個英文單詞組成的備份短語，可用於恢復錢包中的所有私鑰和地址。遵循 BIP-39 標準，是人類可讀的私鑰表示方式。
aliases: [種子詞, 恢復詞組, Mnemonic, Recovery Phrase]
category: wallet
difficulty: beginner
relatedTerms: [private-key, wallet, bip]
seeAlso: []
---

助記詞（Seed Phrase）是一組 12 到 24 個英文單詞，用於備份和恢復加密貨幣錢包。它是 BIP-39 標準定義的人類可讀格式，將難以記憶的二進位熵轉換為容易抄寫和驗證的單詞序列。

## 為什麼使用助記詞？

### 傳統私鑰的問題

```
原始私鑰（十六進位）：
e9873d79c6d87dc0fb6a5778633389f4453213303da61f20bd67fc233aa33262

問題：
❌ 難以記憶
❌ 容易抄錯
❌ 不易驗證正確性
❌ 沒有校驗機制
```

### 助記詞的優勢

```
助記詞表示：
abandon ability able about above absent
absorb abstract absurd abuse access accident

優勢：
✓ 人類可讀
✓ 容易抄寫
✓ 內建校驗碼（最後一個詞）
✓ 可以口頭傳遞
✓ 支援多語言
```

## BIP-39 標準詳解

### 單詞列表

```
BIP-39 定義了 2048 個單詞的列表：

特點：
- 前 4 個字母唯一識別每個詞
- 避免相似詞（如 woman/women）
- 按字母順序排列
- 常用、易拼寫的英文單詞

單詞索引：0-2047
每個詞代表：11 bits 資訊（2^11 = 2048）

支援語言：
- 英文（最常用）
- 日文
- 韓文
- 西班牙文
- 中文（簡體/繁體）
- 法文
- 義大利文
- 捷克文
```

### 熵與單詞數量的關係

| 熵長度   | 校驗碼 | 總長度   | 單詞數 | 安全性 |
| -------- | ------ | -------- | ------ | ------ |
| 128 bits | 4 bits | 132 bits | 12 詞  | 2^128  |
| 160 bits | 5 bits | 165 bits | 15 詞  | 2^160  |
| 192 bits | 6 bits | 198 bits | 18 詞  | 2^192  |
| 224 bits | 7 bits | 231 bits | 21 詞  | 2^224  |
| 256 bits | 8 bits | 264 bits | 24 詞  | 2^256  |

### 生成流程

```
步驟 1：生成隨機熵
entropy = random_bytes(16)  # 128 bits for 12 words
例如：10101100 11010101 ... (128 bits)

步驟 2：計算校驗碼
checksum = SHA256(entropy)[0:熵長度/32]
128 bits → 4 bits 校驗碼

步驟 3：組合熵和校驗碼
combined = entropy + checksum
128 + 4 = 132 bits

步驟 4：分割成 11-bit 組
132 bits / 11 = 12 組
每組對應單詞列表中的一個索引

步驟 5：查表得到助記詞
index 1 → "abandon"
index 2 → "ability"
...
```

### 從助記詞到種子

```
步驟 1：標準化
mnemonic = normalize_nfkd(mnemonic)

步驟 2：構建 salt
salt = "mnemonic" + passphrase
（passphrase 默認為空字串）

步驟 3：PBKDF2 密鑰派生
seed = PBKDF2(
  password = mnemonic,
  salt = salt,
  iterations = 2048,
  hash = HMAC-SHA512,
  output_length = 64 bytes
)

結果：512 bits 的種子
```

## 派生路徑（BIP-32/44/84）

### HD 錢包結構

```
種子（512 bits）
    ↓ HMAC-SHA512("Bitcoin seed", seed)
主私鑰 + 鏈碼（Master Key）
    ↓
派生子密鑰（使用派生路徑）

派生路徑格式：
m / purpose' / coin_type' / account' / change / address_index

範例：
m/44'/0'/0'/0/0  - BIP-44 第一個接收地址
m/84'/0'/0'/0/0  - BIP-84 原生 SegWit 第一個地址
m/86'/0'/0'/0/0  - BIP-86 Taproot 第一個地址
```

### 常見派生路徑

| 路徑        | 標準   | 地址類型           | 說明        |
| ----------- | ------ | ------------------ | ----------- |
| m/44'/0'/0' | BIP-44 | P2PKH (1...)       | Legacy 地址 |
| m/49'/0'/0' | BIP-49 | P2SH-P2WPKH (3...) | 兼容 SegWit |
| m/84'/0'/0' | BIP-84 | P2WPKH (bc1q...)   | 原生 SegWit |
| m/86'/0'/0' | BIP-86 | P2TR (bc1p...)     | Taproot     |

### 硬化派生 vs 正常派生

```
硬化派生（'）：
- 使用私鑰派生
- 更安全
- 無法從公鑰推導
- 適用於帳戶層級

正常派生：
- 可以從公鑰派生
- 支援 watch-only 錢包
- 適用於地址層級

路徑 m/84'/0'/0'/0/0：
          ↑  ↑  ↑  ↑ ↑
          硬 硬 硬 正 正
```

## 可選密碼（Passphrase）

### 工作原理

```
無密碼：
助記詞 → PBKDF2("mnemonic" + "") → 種子 A

有密碼 "hunter2"：
助記詞 → PBKDF2("mnemonic" + "hunter2") → 種子 B

特點：
- 種子 A 和種子 B 完全不同
- 產生完全不同的地址
- 沒有「錯誤」的密碼（任何密碼都產生有效錢包）
```

### 使用場景

```
場景 1：隱藏錢包
- 主錢包：無密碼（放少量資金）
- 隱藏錢包：有密碼（主要資產）
- 被脅迫時只透露無密碼錢包

場景 2：額外安全層
- 助記詞存放在保險箱
- 密碼記在腦中
- 兩者都需要才能存取

場景 3：多錢包
- 同一助記詞 + 不同密碼
- 產生多個獨立錢包
- 方便管理
```

### 風險與注意事項

```
風險：
⚠️ 忘記密碼 = 永久丟失資金
⚠️ 密碼無法恢復或重置
⚠️ 沒有「密碼錯誤」的提示

建議：
✓ 密碼也要備份
✓ 使用簡單但獨特的密碼
✓ 考慮使用密碼管理器
✓ 測試恢復流程
```

## 安全最佳實踐

### 生成助記詞

```
安全的生成方式：
✓ 使用經過審計的錢包軟體
✓ 離線環境生成
✓ 硬體錢包生成
✓ 擲骰子/硬幣（進階用戶）

危險的生成方式：
❌ 線上生成器
❌ 自己選擇單詞
❌ 使用弱隨機數
❌ 截圖或拍照
```

### 備份方法

```
推薦方法：

1. 紙質備份
   - 使用防水筆
   - 酸性紙張更耐久
   - 避免打印（印表機有記憶）

2. 金屬備份
   - 鋼板刻印
   - 防火防水
   - 產品：Cryptosteel, Billfodl

3. 分散存儲
   - 多份備份
   - 不同地點
   - 考慮使用 Shamir 分割

備份檢查清單：
□ 手寫抄錄
□ 按順序編號
□ 拼寫檢查
□ 驗證恢復
□ 多處存放
□ 定期檢查
```

### 存儲位置

| 位置       | 優點     | 缺點         |
| ---------- | -------- | ------------ |
| 家中保險箱 | 方便取用 | 火災/盜竊    |
| 銀行保險箱 | 安全     | 需要銀行開門 |
| 律師處     | 繼承規劃 | 第三方風險   |
| 親友處     | 分散風險 | 信任問題     |

### 絕對不要做的事

```
危險行為：
❌ 拍照存手機
❌ 存雲端（iCloud, Google Drive）
❌ 發送到電子郵件
❌ 存在電腦文字檔
❌ 截圖
❌ 告訴任何人
❌ 在網站輸入
❌ 分享給「客服」
```

## 恢復錢包

### 恢復流程

```
1. 安裝相同類型的錢包
2. 選擇「恢復錢包」選項
3. 輸入助記詞（按順序）
4. 輸入密碼（如果有設置）
5. 選擇派生路徑
6. 等待同步完成
```

### 常見問題

```
問題 1：餘額顯示 0
可能原因：
- 派生路徑不同
- 錢包類型不同
- 密碼錯誤
- 未完成同步

解決：
- 嘗試不同派生路徑
- 使用支援多路徑的錢包（如 Sparrow）

問題 2：單詞無效
可能原因：
- 拼寫錯誤
- 不在 BIP-39 單詞列表
- 順序錯誤

解決：
- 檢查每個單詞的拼寫
- 參考 BIP-39 單詞列表
- 只需前 4 個字母匹配
```

## 進階主題

### SLIP-39（Shamir Backup）

```
將助記詞分割成多個 share：

設置 3-of-5：
- 產生 5 份 share
- 任意 3 份可以恢復
- 2 份或更少無法得知任何資訊

優勢：
- 沒有單點故障
- 靈活的門檻設置
- 更好的遺產規劃

支援錢包：
- Trezor Model T
- 部分軟體錢包
```

### 多語言支援

```
BIP-39 支援多種語言：

同樣的熵可以表示為：
英文：abandon ability able...
中文：的 一 是 不 了 人...
日文：あいこくしん あいさつ...

注意：
- 不同語言產生不同的種子！
- 助記詞和語言必須匹配
- 建議使用英文（最廣泛支援）
```

### 熵驗證

```
檢查助記詞有效性：

12 詞助記詞：
- 前 11 詞可以是任意有效單詞
- 第 12 詞是校驗碼
- 只有 1/256 的組合是有效的

驗證方法：
1. 將單詞轉換為索引
2. 組合成二進位字串
3. 分離熵和校驗碼
4. 計算熵的 SHA-256
5. 比較校驗碼
```

## 開發者資源

### 生成助記詞（JavaScript）

```javascript
const bip39 = require('bip39');

// 生成 12 詞助記詞
const mnemonic = bip39.generateMnemonic(128);
console.log(mnemonic);

// 生成 24 詞助記詞
const mnemonic24 = bip39.generateMnemonic(256);
console.log(mnemonic24);

// 驗證助記詞
const isValid = bip39.validateMnemonic(mnemonic);
console.log('Valid:', isValid);

// 助記詞 → 種子
const seed = bip39.mnemonicToSeedSync(mnemonic, 'optional passphrase');
console.log('Seed:', seed.toString('hex'));
```

### HD 錢包派生（JavaScript）

```javascript
const bip39 = require('bip39');
const { BIP32Factory } = require('bip32');
const ecc = require('tiny-secp256k1');
const bitcoin = require('bitcoinjs-lib');

const bip32 = BIP32Factory(ecc);

// 助記詞 → 種子 → 主密鑰
const mnemonic = 'abandon ability able...';
const seed = bip39.mnemonicToSeedSync(mnemonic);
const root = bip32.fromSeed(seed);

// BIP-84 派生（bc1q 地址）
const path = "m/84'/0'/0'/0/0";
const child = root.derivePath(path);

// 生成地址
const { address } = bitcoin.payments.p2wpkh({
  pubkey: child.publicKey,
});
console.log('Address:', address);
```

### 從熵生成助記詞（Python）

```python
import hashlib
from mnemonic import Mnemonic

# 生成熵
entropy = os.urandom(16)  # 128 bits

# 熵 → 助記詞
mnemo = Mnemonic("english")
mnemonic = mnemo.to_mnemonic(entropy)
print(mnemonic)

# 助記詞 → 種子
seed = mnemo.to_seed(mnemonic, passphrase="")
print(seed.hex())
```

## 常見問題

### 12 詞還是 24 詞？

```
12 詞（128 bits）：
- 安全性：2^128（足夠安全）
- 優點：較短，容易備份
- 適合：大多數用戶

24 詞（256 bits）：
- 安全性：2^256（理論極限）
- 優點：最高安全性
- 適合：極高價值存儲

建議：12 詞對大多數用戶已足夠安全
```

### 助記詞可以更改嗎？

```
不能更改，只能更換：

1. 創建新錢包（新助記詞）
2. 將資金轉移到新地址
3. 銷毀舊助記詞備份

原因：
- 助記詞決定了所有派生地址
- 更改一個詞會產生完全不同的錢包
```
