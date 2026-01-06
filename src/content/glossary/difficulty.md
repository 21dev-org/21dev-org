---
term: 難度
termEn: Difficulty
short: 衡量找到有效區塊雜湊所需計算量的指標。每 2016 個區塊（約兩週）自動調整，維持約 10 分鐘的出塊時間。
aliases: [挖礦難度, Mining Difficulty]
category: mining
difficulty: intermediate
relatedTerms: [mining, hash, block]
seeAlso: [/tech/bitcoin-core/difficulty]
---

難度（Difficulty）是比特幣網路中衡量找到有效區塊所需計算量的指標。透過自動調整難度，比特幣網路確保無論全網算力如何變化，平均出塊時間始終維持在約 10 分鐘。這是比特幣協議中最精妙的自我調節機制之一。

## 難度的本質

### 什麼是難度？

```
簡單理解：

難度就是「找到有效區塊有多困難」

類比：
- 擲骰子得到 1：難度 6（六面）
- 擲骰子得到 1：難度 1000（千面骰）
- 擲骰子得到小於目標值的數字

比特幣：
- 骰子有 2^256 面
- 找到小於目標值的雜湊
- 難度決定目標值的大小
```

### 難度與目標值

```
數學關係：

目標值（Target）= 難度1目標值 / 難度

難度1目標值（最大目標）：
0x00000000FFFF0000000000000000000000000000000000000000000000000000

等於十進位：
26,959,535,291,011,309,493,156,476,344,723,991,336,010,898,738,574,164,086,137,773,096,960

難度 D 時的目標值：
Target = 難度1目標值 / D

難度越高 → 目標值越小 → 越難找到有效雜湊
```

### 挖礦成功的條件

```
有效區塊的條件：

SHA256(SHA256(區塊頭)) < 目標值

視覺化：

目標值：00000000000000000025...
有效雜湊必須小於此值

有效：000000000000000000024...（比目標值小）
有效：000000000000000000001...（更小）
無效：000000000000000000026...（比目標值大）

雜湊結果是隨機的：
- 有些以很多零開頭
- 大多數沒有
- 需要大量嘗試才能找到
```

## 難度調整機制

### 為什麼需要調整？

```
問題情境：

算力增加時（無調整）：
- 更多礦機 → 更快找到區塊
- 出塊時間 < 10 分鐘
- 比特幣發行加速
- 減半週期縮短
- 供應計劃被打亂

算力減少時（無調整）：
- 礦工離開 → 更難找到區塊
- 出塊時間 > 10 分鐘
- 交易確認變慢
- 用戶體驗下降
- 網路可能停滯

難度調整解決這些問題
```

### 調整週期

```
每 2016 個區塊調整一次：

為什麼是 2016？
2016 區塊 × 10 分鐘 = 20,160 分鐘 = 2 週

調整時機：
區塊 2016, 4032, 6048, 8064, ...
每 2016 的倍數

當前（2024）：
區塊高度約 850,000
已經過約 423 次調整
```

### 調整公式

```
計算公式：

新難度 = 舊難度 × (目標時間 / 實際時間)
新難度 = 舊難度 × (20,160 分鐘 / 實際耗時)

等價於：
新目標 = 舊目標 × (實際時間 / 目標時間)

範例1：出塊太快
實際耗時：10,080 分鐘（1週，比目標快一倍）
新難度 = 舊難度 × (20,160 / 10,080) = 舊難度 × 2
難度翻倍

範例2：出塊太慢
實際耗時：40,320 分鐘（4週，比目標慢一倍）
新難度 = 舊難度 × (20,160 / 40,320) = 舊難度 × 0.5
難度減半
```

### 調整限制

```
防止極端波動：

最大調整幅度：4 倍
- 上限：新難度 ≤ 舊難度 × 4
- 下限：新難度 ≥ 舊難度 / 4

為什麼有限制？
1. 防止時間戳操縱攻擊
2. 平滑過渡
3. 給礦工適應時間

極端情況：
如果 99% 算力突然消失
- 無限制：難度立即降到 1%
- 有限制：需要多個週期逐步下降
```

## nBits 編碼格式

### 目標值的壓縮表示

```
區塊頭中的 nBits 欄位（4 bytes）：

格式：
nBits = 指數(1 byte) + 尾數(3 bytes)

解碼公式：
target = 尾數 × 256^(指數-3)

範例（難度1）：
nBits = 0x1d00ffff
指數 = 0x1d = 29
尾數 = 0x00ffff = 65535

target = 65535 × 256^(29-3)
       = 65535 × 256^26
       = 0x00000000ffff0000...
```

### 編碼與解碼

```python
def bits_to_target(bits):
    """將 nBits 解碼為目標值"""
    exponent = bits >> 24
    mantissa = bits & 0x007fffff

    if exponent <= 3:
        target = mantissa >> (8 * (3 - exponent))
    else:
        target = mantissa << (8 * (exponent - 3))

    # 處理負數情況（最高位為符號位）
    if mantissa & 0x00800000:
        target = -target

    return target

def target_to_bits(target):
    """將目標值編碼為 nBits"""
    # 計算需要的字節數
    target_bytes = target.to_bytes((target.bit_length() + 7) // 8, 'big')

    if len(target_bytes) <= 3:
        mantissa = int.from_bytes(target_bytes.ljust(3, b'\x00'), 'big')
        exponent = len(target_bytes)
    else:
        mantissa = int.from_bytes(target_bytes[:3], 'big')
        exponent = len(target_bytes)

    # 確保尾數不會被解釋為負數
    if mantissa & 0x00800000:
        mantissa >>= 8
        exponent += 1

    return (exponent << 24) | mantissa
```

## 難度歷史

### 歷史里程碑

| 時間 | 難度 | 事件 |
|-----|------|------|
| 2009-01 | 1 | 創世區塊 |
| 2010-07 | 181 | 首次顯著上升 |
| 2011-01 | 14,484 | GPU 挖礦興起 |
| 2013-01 | 3,129,573 | ASIC 時代開始 |
| 2017-12 | 1.87T | 牛市高峰 |
| 2018-12 | 5.11T | 熊市低谷 |
| 2021-05 | 25.05T | 中國禁礦前 |
| 2021-07 | 13.67T | 中國禁礦後最低 |
| 2024-04 | 83.13T | 第四次減半時 |

### 難度與算力關係

```
難度與全網算力的關係：

算力估算公式：
算力(H/s) = 難度 × 2^32 / 600

其中 600 是目標出塊時間（秒）

範例（難度 80T）：
算力 = 80 × 10^12 × 2^32 / 600
     ≈ 573 EH/s

反向計算：
難度 = 算力 × 600 / 2^32
```

### 中國禁礦事件（2021）

```
時間線：

2021年5月：
- 難度：25.05T
- 全網算力：~180 EH/s
- 中國佔比：~65%

2021年6月-7月：
- 中國全面禁止挖礦
- 大量算力離線
- 難度連續下降

2021年7月：
- 難度：13.67T（下降 45%）
- 最大單次下降：-28%

恢復：
- 礦工遷移到北美、哈薩克等地
- 2021年底恢復到禁礦前水平
- 證明了網路的彈性
```

## 難度與安全性

### 攻擊成本計算

```
51% 攻擊成本估算：

假設：
- 難度：80T
- 全網算力：~570 EH/s
- 需要控制：>285 EH/s

硬體成本：
- 最新 ASIC：200 TH/s
- 需要數量：285 EH/s / 200 TH/s = 142 萬台
- 單價：~$5,000
- 總成本：~$71 億

電力成本（每天）：
- 每台功耗：3.5 kW
- 總功耗：5 GW
- 日耗電：120 GWh
- 電費（$0.05/kWh）：$600 萬/天

結論：難度越高，攻擊成本越高
```

### 難度與網路健康

```
評估指標：

健康信號：
✓ 難度穩定增長
✓ 算力分佈均勻
✓ 出塊時間接近 10 分鐘

警告信號：
⚠️ 難度大幅下降
⚠️ 算力集中於少數礦池
⚠️ 出塊時間異常波動

監控工具：
- mempool.space/mining
- btc.com/stats
- coinwarz.com/mining/bitcoin
```

## 難度調整的邊緣情況

### 時間戳操縱

```
潛在攻擊：

時間戳規則：
- 必須大於前 11 區塊的中位數時間
- 必須小於網路時間 + 2 小時

操縱方式：
- 礦工故意設置未來時間戳
- 縮短週期計算的「實際時間」
- 導致難度增加較少

防禦：
- 4 倍調整上限
- 中位數時間規則
- 2 小時未來時間限制
```

### 難度炸彈？

```
比特幣沒有難度炸彈：

與以太坊不同：
- 以太坊有「難度炸彈」設計
- 強制定期升級
- 比特幣沒有這個機制

比特幣的設計哲學：
- 最小化強制變更
- 難度純粹基於算力
- 無人為干預
```

## 開發者資源

### 計算難度

```python
import struct

def calculate_difficulty(bits):
    """從 nBits 計算難度值"""
    # 難度 1 的目標值
    max_target = 0x00000000FFFF0000000000000000000000000000000000000000000000000000

    # 解碼當前目標
    current_target = bits_to_target(bits)

    # 計算難度
    difficulty = max_target / current_target

    return difficulty

def estimate_hashrate(difficulty):
    """從難度估算全網算力"""
    # 算力 = 難度 × 2^32 / 600
    hashrate = difficulty * (2**32) / 600
    return hashrate  # H/s

def expected_time(difficulty, hashrate):
    """計算期望出塊時間"""
    # 找到有效區塊的期望嘗試次數
    expected_hashes = difficulty * (2**32)
    # 期望時間 = 期望嘗試 / 算力
    return expected_hashes / hashrate  # 秒
```

### Bitcoin Core RPC

```bash
# 獲取當前難度
bitcoin-cli getdifficulty

# 獲取區塊的難度目標
bitcoin-cli getblockheader <blockhash>
# 查看 "bits" 和 "difficulty" 欄位

# 獲取挖礦資訊（包含難度）
bitcoin-cli getmininginfo

# 獲取區塊鏈資訊
bitcoin-cli getblockchaininfo
# 查看 "difficulty" 欄位

# 獲取網路算力估算
bitcoin-cli getnetworkhashps
bitcoin-cli getnetworkhashps 120  # 最近 120 區塊的平均值
```

### 追蹤難度調整

```javascript
const bitcoin = require('bitcoinjs-lib');

function getNextRetargetBlock(currentHeight) {
  const interval = 2016;
  const currentPeriod = Math.floor(currentHeight / interval);
  return (currentPeriod + 1) * interval;
}

function blocksUntilRetarget(currentHeight) {
  return getNextRetargetBlock(currentHeight) - currentHeight;
}

function estimateNextDifficulty(periodStartTime, periodEndTime, currentDifficulty) {
  const targetTime = 2016 * 10 * 60; // 20160 分鐘（秒）
  const actualTime = periodEndTime - periodStartTime;

  let adjustment = targetTime / actualTime;

  // 應用 4 倍限制
  if (adjustment > 4) adjustment = 4;
  if (adjustment < 0.25) adjustment = 0.25;

  return currentDifficulty * adjustment;
}
```

## 常見問題

### 如果所有礦工同時停止會怎樣？

```
理論情境：

所有算力消失：
1. 無法產生新區塊
2. 交易無法確認
3. 網路「凍結」

但是：
- 只要有一個礦工，就會繼續
- 難度會在下個週期調整
- 最多等待 4 倍時間（8週）
- 然後難度降到 1/4

實際上：
- 永遠會有礦工（只要有利可圖）
- 價格下跌會讓更多人有利可圖
- 網路有強大的自我修復能力
```

### 難度能降到 1 以下嗎？

```
理論上可以，但不太可能：

難度 < 1 的含義：
- 比創世區塊更容易挖
- 目標值非常大
- 幾乎任何雜湊都有效

為什麼不可能發生：
1. 當前難度是 80T+
2. 每次最多降 75%
3. 需要數十次連續下降
4. 意味著算力持續暴跌

即使發生：
- 難度 < 1 仍然有效
- 協議沒有禁止
- 只是非常不可能
```

### 難度調整會影響價格嗎？

```
間接關係：

難度上升通常意味著：
- 更多礦工加入
- 對未來價格樂觀
- 投資增加

難度下降可能意味著：
- 礦工退出（不盈利）
- 可能伴隨價格下跌
- 或只是效率提升

但不是因果關係：
- 難度不決定價格
- 價格影響礦工決策
- 礦工決策影響算力
- 算力決定難度
```

### 為什麼不更頻繁調整？

```
2016 區塊（2 週）的理由：

優點：
1. 給礦工適應時間
2. 減少波動
3. 降低操縱風險
4. 足夠的數據點

更頻繁調整的問題：
- 更容易被操縱
- 過度反應短期波動
- 增加計算複雜度

不同幣種的選擇：
- Bitcoin Cash：每區塊調整
- Litecoin：2016 區塊
- Dogecoin：每區塊調整

比特幣的選擇經過多年驗證
```
