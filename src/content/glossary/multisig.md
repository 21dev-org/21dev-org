---
term: 多重簽名
termEn: Multisig
short: 需要多把私鑰中的若干把才能花費比特幣的機制。常見配置如 2-of-3，提供冗餘備份和防止單點故障。
aliases: [多簽, Multi-signature]
category: security
difficulty: intermediate
relatedTerms: [wallet, private-key, transaction]
seeAlso: [/learn/intermediate/multisig, /tech/bitcoin-core/multisig]
---

多重簽名（Multisig）是比特幣中一種強大的安全機制，要求 n 把私鑰中的至少 m 把才能花費資金。這種 m-of-n 配置消除了單點故障風險，廣泛應用於個人安全存儲、企業財務管理和託管服務。

## 多重簽名的本質

### 基本概念

```
單簽 vs 多簽：

單簽（1-of-1）：
┌─────────────┐
│   私鑰 A    │ ──→ 簽名 ──→ 花費
└─────────────┘

多簽（2-of-3）：
┌─────────────┐
│   私鑰 A    │ ──┐
├─────────────┤   │
│   私鑰 B    │ ──┼─→ 2個簽名 ──→ 花費
├─────────────┤   │
│   私鑰 C    │ ──┘（任選2個）
└─────────────┘
```

### m-of-n 參數

```
m-of-n 的含義：

n = 總共多少把私鑰
m = 需要多少把簽名

常見配置：

1-of-2：任一方可單獨花費
2-of-2：雙方必須同時同意
2-of-3：三人中任兩人同意
3-of-5：五人中任三人同意

限制：
- m ≤ n（需要的簽名不能超過鑰匙總數）
- m ≥ 1（至少需要一個簽名）
- 傳統多簽 n ≤ 15（OP_CHECKMULTISIG 限制）
- P2WSH 多簽 n ≤ 20
- Taproot 無硬性限制
```

## 技術實現

### 傳統 P2SH 多簽

```
P2SH (Pay to Script Hash) 多簽：

贖回腳本（Redeem Script）：
OP_2                    // m = 2
<pubkey1>               // 公鑰 1
<pubkey2>               // 公鑰 2
<pubkey3>               // 公鑰 3
OP_3                    // n = 3
OP_CHECKMULTISIG        // 驗證多簽

P2SH 地址生成：
1. 建構 redeem script
2. HASH160(redeem_script)
3. 加上版本前綴 05
4. Base58Check 編碼
5. 結果：3 開頭的地址

花費時：
<空> <sig1> <sig2> <redeem_script>
```

### SegWit P2WSH 多簽

```
P2WSH (Pay to Witness Script Hash) 多簽：

見證腳本（Witness Script）：
與 P2SH 的 redeem script 相同

P2WSH 地址生成：
1. 建構 witness script
2. SHA256(witness_script)
3. Bech32 編碼
4. 結果：bc1q...（較長）

優勢：
- 手續費更低（簽名在 witness）
- 沒有交易延展性問題
- 支持更多簽名者（20 vs 15）

花費結構：
witness: <空> <sig1> <sig2> <witness_script>
```

### Taproot 多簽（MuSig2）

```
Taproot 多簽（密鑰聚合）：

傳統多簽：
- 鏈上可見是多簽
- 需要提供所有公鑰
- 費用與簽名數成比例

Taproot MuSig2：
- 聚合公鑰 P = P1 + P2 + P3
- 聚合簽名 s = s1 + s2 + s3
- 鏈上只有一個公鑰和簽名
- 看起來像普通單簽交易

優勢：
- 極佳隱私性
- 最低手續費
- 無法區分單簽/多簽
```

## 常見配置詳解

### 2-of-3 個人安全存儲

```
最佳實踐配置：

┌────────────────────────────────────────────┐
│               2-of-3 配置                   │
├────────────────────────────────────────────┤
│                                            │
│  鑰匙 1：日常使用                           │
│  ├─ 硬體錢包（Ledger/Trezor）              │
│  └─ 放在家中安全位置                        │
│                                            │
│  鑰匙 2：備份                               │
│  ├─ 鋼板助記詞                             │
│  └─ 銀行保險箱                             │
│                                            │
│  鑰匙 3：緊急備用                           │
│  ├─ 另一個硬體錢包                         │
│  └─ 信任的家人處 或 另一地點保險箱          │
│                                            │
└────────────────────────────────────────────┘

正常使用：鑰匙 1 + 鑰匙 2
設備故障：鑰匙 2 + 鑰匙 3
緊急情況：任意兩把

優勢：
- 單一設備丟失/損壞不會損失資金
- 單一地點被盜不會損失資金
- 保留完全自主控制權
```

### 3-of-5 企業財務

```
企業級配置：

┌────────────────────────────────────────────┐
│             3-of-5 企業配置                 │
├────────────────────────────────────────────┤
│                                            │
│  鑰匙 1：CEO                                │
│  鑰匙 2：CFO                                │
│  鑰匙 3：COO                                │
│  鑰匙 4：董事會代表                         │
│  鑰匙 5：外部安全顧問                       │
│                                            │
└────────────────────────────────────────────┘

審批流程：
- 日常支出 < $10K：CEO + CFO + COO
- 大額支出 > $10K：需要董事會代表
- 緊急情況：任意三人

審計追蹤：
- 每筆支出都有明確的簽名者
- 無法單人挪用資金
- 符合內控要求
```

### 2-of-2 協作託管

```
託管服務配置：

用戶 + 服務商（2-of-2）：
┌─────────────┐     ┌─────────────┐
│  用戶私鑰   │     │ 服務商私鑰  │
│  （用戶）   │     │  （服務）   │
└──────┬──────┘     └──────┬──────┘
       │                   │
       └───────┬───────────┘
               │
         需要雙方同意

適用場景：
- 交易所冷錢包
- 託管服務
- 定期支付合約

風險考量：
- 任一方失聯 = 資金鎖死
- 通常搭配時間鎖備案
- 需要額外的恢復機制
```

## 地址類型比較

### 不同類型的多簽地址

```
同一個 2-of-3 多簽的不同表示：

P2SH（傳統）：
地址：3QJmV3qfvL9SuYo34YihAf3sRCW3qSinyC
格式：Base58Check
手續費：最高

P2SH-P2WSH（嵌套 SegWit）：
地址：3J98t1WpEZ73CNmQviecrnyiWrnqRhWNLy
格式：Base58Check（向後相容）
手續費：中等

P2WSH（原生 SegWit）：
地址：bc1qwqdg6squsna38e46795at95yu9atm8azzmyvckulcc7kytlcckxswvvzej
格式：Bech32
手續費：較低

P2TR（Taproot）：
地址：bc1p5cyxnuxmeuwuvkwfem96lqzszd02n6xdcjrs20cac6yqjjwudpxqkedrcr
格式：Bech32m
手續費：最低（使用 MuSig2）
```

### 手續費比較

```
2-of-3 多簽花費成本比較（virtual bytes）：

P2SH：
- 輸入大小：約 297 vB
- 包含：2個簽名 + 3個公鑰 + 腳本

P2WSH：
- 輸入大小：約 140 vB
- 簽名移到 witness（75% 折扣）

P2TR（MuSig2）：
- 輸入大小：約 58 vB
- 只有一個聚合簽名
- 與單簽相同！

假設費率 20 sat/vB：
P2SH：  5,940 sats
P2WSH： 2,800 sats
P2TR：  1,160 sats（節省 80%!）
```

## 創建多簽錢包

### 使用 Bitcoin Core

```bash
# 創建 2-of-3 多簽（傳統方式）

# 1. 生成三個私鑰/公鑰對
bitcoin-cli getnewaddress "" legacy
bitcoin-cli getaddressinfo <address1>
# 記錄 pubkey1

bitcoin-cli getnewaddress "" legacy
bitcoin-cli getaddressinfo <address2>
# 記錄 pubkey2

bitcoin-cli getnewaddress "" legacy
bitcoin-cli getaddressinfo <address3>
# 記錄 pubkey3

# 2. 創建多簽地址
bitcoin-cli createmultisig 2 '["pubkey1","pubkey2","pubkey3"]'

# 輸出：
# {
#   "address": "3...",
#   "redeemScript": "5221...52ae",
#   "descriptor": "sh(multi(2,pubkey1,pubkey2,pubkey3))"
# }

# 3. 導入到錢包以追蹤餘額
bitcoin-cli importaddress "3..." "my-multisig" true
```

### 使用描述符（Descriptor）

```bash
# 現代方式：使用 Output Descriptors

# 創建描述符錢包
bitcoin-cli createwallet "multisig-wallet" true true "" false true

# P2WSH 多簽描述符
descriptor="wsh(multi(2,\
[fingerprint1/84'/0'/0']xpub1.../0/*,\
[fingerprint2/84'/0'/0']xpub2.../0/*,\
[fingerprint3/84'/0'/0']xpub3.../0/*))"

# 導入描述符
bitcoin-cli importdescriptors '[{
  "desc": "'$descriptor'",
  "timestamp": "now",
  "active": true,
  "internal": false,
  "range": [0, 100]
}]'

# 獲取新地址
bitcoin-cli getnewaddress "" bech32
```

### JavaScript 實現

```javascript
const bitcoin = require('bitcoinjs-lib');
const { ECPair } = require('ecpair');
const ecc = require('tiny-secp256k1');

// 創建 2-of-3 P2WSH 多簽

// 三個公鑰（實際應來自不同來源）
const pubkeys = [
  Buffer.from('02...', 'hex'),
  Buffer.from('03...', 'hex'),
  Buffer.from('02...', 'hex'),
].sort((a, b) => a.compare(b)); // 必須排序！

// 創建多簽腳本
const p2ms = bitcoin.payments.p2ms({
  m: 2, // 需要 2 個簽名
  pubkeys: pubkeys,
  network: bitcoin.networks.bitcoin,
});

// 包裝成 P2WSH
const p2wsh = bitcoin.payments.p2wsh({
  redeem: p2ms,
  network: bitcoin.networks.bitcoin,
});

console.log('多簽地址:', p2wsh.address);
console.log('Witness Script:', p2wsh.redeem.output.toString('hex'));

// 花費多簽
function spendMultisig(utxo, toAddress, amount, privkeys) {
  const psbt = new bitcoin.Psbt({ network: bitcoin.networks.bitcoin });

  psbt.addInput({
    hash: utxo.txid,
    index: utxo.vout,
    witnessUtxo: {
      script: p2wsh.output,
      value: utxo.value,
    },
    witnessScript: p2wsh.redeem.output,
  });

  psbt.addOutput({
    address: toAddress,
    value: amount,
  });

  // 用兩個私鑰簽名
  privkeys.forEach((privkey) => {
    const keyPair = ECPair.fromPrivateKey(privkey);
    psbt.signInput(0, keyPair);
  });

  psbt.finalizeAllInputs();
  return psbt.extractTransaction().toHex();
}
```

## PSBT 多簽工作流

### 什麼是 PSBT？

```
PSBT（Partially Signed Bitcoin Transaction）：

用途：多簽協作工作流程

工作流程：
┌──────────────────────────────────────────────────┐
│                                                  │
│  協調者創建                                       │
│  ┌──────────┐                                    │
│  │   PSBT   │ ─── 未簽名交易                      │
│  └────┬─────┘                                    │
│       │                                          │
│       ▼                                          │
│  分發給簽名者                                     │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐        │
│  │ 簽名者 1 │  │ 簽名者 2 │  │ 簽名者 3 │        │
│  │  簽名    │  │  簽名    │  │  (備用)  │        │
│  └────┬─────┘  └────┬─────┘  └──────────┘        │
│       │             │                            │
│       ▼             ▼                            │
│  合併簽名                                         │
│  ┌──────────────────────┐                        │
│  │   完整簽名的 PSBT    │                        │
│  └──────────┬───────────┘                        │
│             │                                    │
│             ▼                                    │
│  廣播交易                                         │
│                                                  │
└──────────────────────────────────────────────────┘
```

### PSBT 實際操作

```bash
# 完整的 PSBT 多簽流程

# 步驟 1：協調者創建 PSBT
bitcoin-cli walletcreatefundedpsbt \
  '[{"txid":"...","vout":0}]' \
  '[{"bc1q...":0.5}]'

# 輸出 PSBT（Base64 格式）
# cHNidP8BAFUCAAAAAQAAAAEAAAAAAAAAA...

# 步驟 2：分發給簽名者 1
bitcoin-cli walletprocesspsbt "cHNidP8..."
# 返回帶第一個簽名的 PSBT

# 步驟 3：分發給簽名者 2
bitcoin-cli walletprocesspsbt "cHNidP8...（帶簽名1）"
# 返回帶兩個簽名的 PSBT

# 步驟 4：合併並完成
bitcoin-cli combinepsbt '["psbt1", "psbt2"]'
bitcoin-cli finalizepsbt "combined_psbt"

# 步驟 5：廣播
bitcoin-cli sendrawtransaction "完整交易hex"
```

## 安全考量

### 備份要求

```
多簽備份清單：

必須備份的項目：

1. 所有私鑰/助記詞
   ┌─────────────────────────────────────┐
   │  鑰匙 1: abandon abandon ... zoo    │
   │  鑰匙 2: ability ability ... youth  │
   │  鑰匙 3: absorb absorb ... zebra    │
   └─────────────────────────────────────┘

2. 贖回腳本（Redeem Script）/ 見證腳本
   ┌─────────────────────────────────────┐
   │  522102...02...03...53ae             │
   │  或：描述符字串                       │
   └─────────────────────────────────────┘

3. 派生路徑（如果使用 HD 錢包）
   ┌─────────────────────────────────────┐
   │  m/48'/0'/0'/2' (標準多簽路徑)       │
   └─────────────────────────────────────┘

4. 公鑰順序
   ┌─────────────────────────────────────┐
   │  公鑰必須按字典序排列                 │
   │  順序錯誤 = 不同的地址！              │
   └─────────────────────────────────────┘

缺少任何一項 = 無法恢復資金！
```

### 常見錯誤

```
多簽常見錯誤：

❌ 只備份助記詞
   → 沒有贖回腳本無法花費

❌ 公鑰順序錯誤
   → 產生不同的地址

❌ 所有鑰匙放同一處
   → 失去多簽的安全意義

❌ 沒有測試恢復流程
   → 需要時才發現問題

❌ 使用不同軟體的非標準路徑
   → 恢復時路徑不匹配

✅ 正確做法：
   - 備份所有材料
   - 異地存放
   - 定期測試恢復
   - 使用標準派生路徑
   - 記錄軟體版本和設置
```

### 時間鎖備案

```
為 2-of-2 添加時間鎖備案：

問題：2-of-2 中一方失聯 = 資金鎖死

解決方案：時間鎖緊急路徑

Miniscript 表示：
or(
  and(pk(A), pk(B)),           // 正常：雙方同意
  and(pk(A), older(52560))     // 緊急：1年後 A 單獨
)

效果：
- 正常情況：需要 A 和 B 同時簽名
- 1 年後：A 可以單獨取回資金
- 防止資金永久鎖死
```

## 多簽工具和服務

### 專業多簽軟體

```
常用多簽軟體：

開源軟體：
┌────────────────────────────────────────────┐
│  Sparrow Wallet                            │
│  - 完整 PSBT 支援                          │
│  - 硬體錢包整合                            │
│  - 桌面版（Mac/Windows/Linux）             │
│  - 最推薦的多簽方案                         │
├────────────────────────────────────────────┤
│  Specter Desktop                           │
│  - 連接自己的節點                          │
│  - 硬體錢包協調                            │
│  - Web 界面                                │
├────────────────────────────────────────────┤
│  Caravan (Unchained)                       │
│  - 瀏覽器工具                              │
│  - 無需安裝                                │
│  - 開源                                    │
├────────────────────────────────────────────┤
│  Nunchuk                                   │
│  - 手機 + 桌面                             │
│  - 協作簽名                                │
│  - 聊天整合                                │
└────────────────────────────────────────────┘

託管服務：
- Casa：2-of-3 帶客服協助
- Unchained：商業級多簽服務
```

### 硬體錢包支援

```
硬體錢包多簽能力：

┌──────────────┬────────┬────────┬─────────┐
│   設備       │ P2SH   │ P2WSH  │  P2TR   │
├──────────────┼────────┼────────┼─────────┤
│ Ledger       │   ✓    │   ✓    │   ✓     │
│ Trezor       │   ✓    │   ✓    │   ✓     │
│ Coldcard     │   ✓    │   ✓    │   ✓     │
│ BitBox02     │   ✓    │   ✓    │   ✓     │
│ Keystone     │   ✓    │   ✓    │   ✓     │
└──────────────┴────────┴────────┴─────────┘

推薦配置：
- 使用不同品牌的硬體錢包
- 避免供應鏈攻擊風險
- 不同設備不同漏洞
```

## 進階主題

### 閾值簽名（TSS）

```
TSS vs 傳統多簽：

傳統多簽（on-chain）：
- 多個獨立簽名
- 鏈上可見
- 需要所有公鑰

TSS（off-chain）：
- 單一聚合簽名
- 鏈上不可見
- 私鑰分片

TSS 流程：
1. 私鑰生成協議（DKG）
   - 各方協作產生私鑰分片
   - 沒有人擁有完整私鑰

2. 簽名協議
   - 各方用分片協作簽名
   - 產生單一有效簽名

優點：
- 更好的隱私
- 更低的費用
- 可以輪換分片

缺點：
- 複雜的協議
- 需要互動
- 相對較新
```

### Miniscript 複雜策略

```
Miniscript 允許複雜的花費條件：

範例：公司財務策略

or(
  // 主要路徑：CEO + CFO + 風控
  thresh(3, pk(CEO), pk(CFO), pk(Risk)),

  // 緊急路徑：董事會多數 + 30天等待
  and(
    thresh(3, pk(Board1), pk(Board2), pk(Board3), pk(Board4), pk(Board5)),
    older(4320)  // 約 30 天
  )
)

效果：
- 日常：CEO + CFO + 風控 同意即可
- 緊急：30天後，5位董事中3位可以接管

這在傳統 Script 中很難實現
Miniscript 使複雜策略變得可組合
```

## 開發者資源

### Python 實現

```python
from bitcoin import SelectParams
from bitcoin.core import *
from bitcoin.core.script import *
from bitcoin.wallet import *

SelectParams('mainnet')

def create_multisig(m, pubkeys):
    """創建 m-of-n 多簽地址"""
    # 公鑰必須排序
    sorted_pubkeys = sorted(pubkeys)

    # 構建贖回腳本
    redeem_script = CScript([
        m,  # 需要的簽名數
        *[bytes.fromhex(pk) for pk in sorted_pubkeys],
        len(pubkeys),  # 總公鑰數
        OP_CHECKMULTISIG
    ])

    # P2SH 地址
    script_hash = Hash160(redeem_script)
    p2sh_address = P2SHBitcoinAddress.from_bytes(script_hash)

    # P2WSH 地址
    script_sha256 = hashlib.sha256(redeem_script).digest()
    # ... Bech32 編碼

    return {
        'address': str(p2sh_address),
        'redeem_script': redeem_script.hex(),
        'm': m,
        'n': len(pubkeys)
    }

def verify_multisig_signature(tx, input_idx, redeem_script, signatures, pubkeys):
    """驗證多簽交易"""
    # ... 驗證邏輯
    pass
```

### Bitcoin Core RPC

```bash
# 多簽相關 RPC 命令

# 創建多簽地址
bitcoin-cli createmultisig 2 '["pubkey1","pubkey2","pubkey3"]'

# 添加多簽地址到錢包
bitcoin-cli addmultisigaddress 2 '["pubkey1","pubkey2","pubkey3"]' "label"

# 獲取地址資訊
bitcoin-cli getaddressinfo "3..."

# 創建多簽交易
bitcoin-cli createrawtransaction \
  '[{"txid":"...","vout":0}]' \
  '[{"bc1q...":0.5}]'

# 簽名（需要提供贖回腳本）
bitcoin-cli signrawtransactionwithkey \
  "rawtx" \
  '["privkey1"]' \
  '[{"txid":"...","vout":0,"scriptPubKey":"...","redeemScript":"..."}]'

# 合併簽名
bitcoin-cli combinerawtransaction '["tx1", "tx2"]'

# 廣播
bitcoin-cli sendrawtransaction "完整交易"
```

## 常見問題

### 需要備份什麼？

```
完整備份清單：

最小備份（能恢復）：
□ 所有助記詞（m個中的m個）
□ 贖回腳本 或 所有公鑰
□ 派生路徑
□ m 和 n 的值

推薦備份（更安全）：
□ 所有助記詞（n個全部）
□ 主公鑰（xpub）
□ 完整描述符
□ 錢包設置檔
□ 使用的軟體版本

測試驗證：
□ 用備份恢復過錢包
□ 確認地址一致
□ 測試過小額花費
```

### 2-of-3 夠安全嗎？

```
2-of-3 的安全性分析：

攻擊向量：

單點攻擊（需要獲取 2 把鑰匙）：
- 需要同時攻破兩個位置
- 或同時攻破兩個設備
- 難度大幅提高

共謀攻擊：
- 如果用於多人（公司）
- 需要兩人共謀
- 比單簽安全

物理攻擊：
- 攻擊者需要找到兩個藏匿點
- 異地存放很重要

結論：
- 對個人：2-of-3 通常足夠
- 對企業：考慮 3-of-5 或更高
- 關鍵是：異地、異設備、異人員
```

### Taproot 多簽何時使用？

```
Taproot 多簽（MuSig2）的取捨：

優點：
✓ 最佳隱私（看起來像單簽）
✓ 最低手續費
✓ 鏈上更簡潔

缺點：
✗ 需要互動簽名
✗ 軟體支援較新
✗ 無法區分誰簽了名

適合：
- 預算敏感
- 隱私優先
- 技術成熟團隊

暫不適合：
- 需要審計追蹤
- 簽名者常離線
- 保守的企業環境
```
