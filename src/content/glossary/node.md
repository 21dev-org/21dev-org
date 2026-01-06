---
term: 節點
termEn: Node
short: 運行比特幣軟體並連接網路的電腦。全節點儲存完整區塊鏈並獨立驗證所有交易，是網路去中心化的基礎。
aliases: [全節點, Full Node]
category: protocol
difficulty: beginner
relatedTerms: [blockchain, mining, consensus]
seeAlso: [/learn/basics/running-node]
---

節點是運行比特幣軟體並連接到比特幣網路的電腦。全節點儲存完整的區塊鏈副本並獨立驗證所有交易和區塊，是比特幣去中心化和安全性的基礎。運行自己的節點意味著真正的「不信任，去驗證」（Don't Trust, Verify）。

## 節點的重要性

### 為什麼節點重要？

```
節點在比特幣網路中的角色：

去中心化的基礎：
┌─────────────────────────────────────────────────┐
│                                                 │
│    節點 ←─→ 節點 ←─→ 節點                       │
│      ↑         ↑         ↑                      │
│      ↓         ↓         ↓                      │
│    節點 ←─→ 節點 ←─→ 節點                       │
│      ↑         ↑         ↑                      │
│      ↓         ↓         ↓                      │
│    節點 ←─→ 節點 ←─→ 節點                       │
│                                                 │
│    沒有中心伺服器                                │
│    每個節點都是平等的                            │
│    任何人都可以加入                              │
│                                                 │
└─────────────────────────────────────────────────┘

節點的功能：
1. 驗證所有交易和區塊
2. 儲存完整區塊鏈歷史
3. 傳播交易給其他節點
4. 執行共識規則
5. 服務輕客戶端請求
```

### 「不信任，去驗證」

```
運行自己節點的意義：

不運行節點：
┌─────────────────────────────────────────────────┐
│                                                 │
│  你的錢包 ──→ 第三方伺服器 ──→ 比特幣網路       │
│                   │                             │
│              你必須信任                          │
│              第三方伺服器                        │
│                                                 │
└─────────────────────────────────────────────────┘

運行自己節點：
┌─────────────────────────────────────────────────┐
│                                                 │
│  你的錢包 ──→ 你的節點 ──→ 比特幣網路           │
│                   │                             │
│              自己驗證                            │
│              所有交易                            │
│                                                 │
└─────────────────────────────────────────────────┘

差異：
- 隱私：第三方不知道你的地址
- 安全：自己驗證餘額和交易
- 主權：不依賴他人
```

## 節點類型

### 全節點（Full Node）

```
全節點特性：

定義：
- 下載並驗證整個區塊鏈
- 獨立執行所有共識規則
- 不信任任何其他節點

功能：
✓ 完全驗證所有交易
✓ 完全驗證所有區塊
✓ 儲存完整 UTXO 集合
✓ 可以服務其他節點
✓ 可以直接廣播交易

硬體需求（2024）：
┌─────────────────────────────────────┐
│  儲存：~600 GB（並持續增長）        │
│  RAM：4+ GB（建議 8 GB）            │
│  CPU：一般桌面處理器即可            │
│  網路：10+ Mbps，無限流量最佳       │
│  月流量：~200-400 GB                │
└─────────────────────────────────────┘

常見軟體：
- Bitcoin Core（官方參考實現）
- btcd（Go 語言）
- libbitcoin（C++）
```

### 修剪節點（Pruned Node）

```
修剪節點特性：

定義：
- 完全驗證所有區塊（同全節點）
- 驗證後刪除舊區塊數據
- 只保留最近的區塊

工作方式：
┌─────────────────────────────────────────────────┐
│                                                 │
│  下載區塊 1-100,000                             │
│      ↓                                          │
│  驗證每個區塊（同全節點）                        │
│      ↓                                          │
│  保留 UTXO 集合                                 │
│      ↓                                          │
│  刪除舊區塊數據（只保留最新 N 個區塊）           │
│                                                 │
└─────────────────────────────────────────────────┘

設置（Bitcoin Core）：
prune=550  # 保留至少 550 MB 區塊數據

優點：
- 大幅減少儲存需求（~10-20 GB）
- 仍然完全驗證
- 適合儲存有限的設備

缺點：
- 無法服務歷史區塊給其他節點
- 無法重新掃描舊交易
- 無法支援某些錢包功能
```

### 輕節點（SPV / Light Node）

```
輕節點特性：

定義：
- 只下載區塊頭（每個 80 bytes）
- 使用 SPV（簡化支付驗證）
- 信任礦工的工作量證明

工作方式：
┌─────────────────────────────────────────────────┐
│                                                 │
│  只下載區塊頭（80 MB 整個歷史）                  │
│      ↓                                          │
│  向全節點查詢特定交易                            │
│      ↓                                          │
│  使用 Merkle 證明驗證交易存在                    │
│      ↓                                          │
│  信任最長鏈的工作量證明                          │
│                                                 │
└─────────────────────────────────────────────────┘

儲存需求：
- 區塊頭：~80 MB
- 對比全節點：~600 GB
- 減少 99.99%

安全性取捨：
✓ 可以驗證交易已被礦工確認
✗ 無法驗證交易是否違反共識規則
✗ 必須信任礦工誠實
✗ 隱私較差（需要告訴伺服器你的地址）

常見實現：
- Electrum（使用 Electrum Server）
- 多數手機錢包
```

### 歸檔節點（Archive Node）

```
歸檔節點特性：

定義：
- 全節點 + 完整歷史索引
- 可以查詢任何歷史狀態
- 資源需求最高

額外功能：
- 歷史餘額查詢
- 任意時點的 UTXO 快照
- 完整交易索引

儲存需求：
- 基本：~600 GB（區塊數據）
- + txindex：額外 ~30 GB
- + coinstatsindex：額外 ~10 GB

設置：
txindex=1
coinstatsindex=1

用途：
- 區塊瀏覽器
- 分析服務
- 研究用途
```

### 礦工節點

```
礦工節點特性：

定義：
- 全節點 + 挖礦功能
- 建構新區塊
- 參與工作量證明

額外功能：
- 交易選擇和排序
- 區塊模板生成
- 提交工作量證明

現代礦池架構：
┌─────────────────────────────────────────────────┐
│                                                 │
│  礦池節點（全節點）                              │
│      │                                          │
│      ├── Stratum 伺服器                         │
│      │       │                                  │
│      │       ├── ASIC 礦機 1                    │
│      │       ├── ASIC 礦機 2                    │
│      │       └── ASIC 礦機 N                    │
│      │                                          │
│      └── 區塊廣播                               │
│                                                 │
└─────────────────────────────────────────────────┘

注意：
- 個人挖礦已不經濟
- 大多數礦工連接礦池
- 礦池運行全節點
```

## 運行全節點

### 硬體需求

```
最低需求 vs 推薦配置：

┌────────────────┬─────────────┬─────────────────┐
│     項目       │   最低需求   │    推薦配置     │
├────────────────┼─────────────┼─────────────────┤
│ CPU            │ 雙核心       │ 四核心+         │
│ RAM            │ 4 GB        │ 8 GB+           │
│ 儲存           │ 600 GB HDD  │ 1 TB SSD        │
│ 網路           │ 10 Mbps     │ 100+ Mbps       │
│ 月流量         │ 200 GB      │ 無限            │
└────────────────┴─────────────┴─────────────────┘

專用硬體選項：

Raspberry Pi 4：
- 低功耗（~5W）
- 8 GB RAM 版本
- 外接 SSD
- 成本：~$100-150

舊筆電/桌機：
- 可能已有足夠配置
- 低成本入門

專用節點設備：
- Umbrel
- Start9
- RaspiBlitz
- 預設置，即插即用
```

### 安裝 Bitcoin Core

```bash
# 在 Ubuntu/Debian 上安裝

# 1. 下載 Bitcoin Core
wget https://bitcoincore.org/bin/bitcoin-core-26.0/bitcoin-26.0-x86_64-linux-gnu.tar.gz

# 2. 驗證簽名（重要！）
wget https://bitcoincore.org/bin/bitcoin-core-26.0/SHA256SUMS
wget https://bitcoincore.org/bin/bitcoin-core-26.0/SHA256SUMS.asc

# 驗證雜湊
sha256sum --ignore-missing --check SHA256SUMS

# 驗證 GPG 簽名
gpg --keyserver hkps://keys.openpgp.org --recv-keys 01EA5486DE18A882D4C2684590C8019E36C2E964
gpg --verify SHA256SUMS.asc

# 3. 解壓並安裝
tar xvf bitcoin-26.0-x86_64-linux-gnu.tar.gz
sudo install -m 0755 -o root -g root -t /usr/local/bin bitcoin-26.0/bin/*

# 4. 創建數據目錄
mkdir ~/.bitcoin

# 5. 創建配置檔
cat > ~/.bitcoin/bitcoin.conf << EOF
# 基本設置
server=1
daemon=1
txindex=0

# 網路
listen=1
maxconnections=125

# RPC（供本地錢包使用）
rpcuser=yourusername
rpcpassword=yourpassword

# 可選：修剪模式（節省空間）
# prune=550
EOF

# 6. 啟動節點
bitcoind

# 7. 檢查狀態
bitcoin-cli getblockchaininfo
```

### 初始區塊下載（IBD）

```
初始同步過程：

第一次運行時：
┌─────────────────────────────────────────────────┐
│                                                 │
│  1. 連接到種子節點                              │
│     ↓                                          │
│  2. 發現更多節點                                │
│     ↓                                          │
│  3. 下載區塊頭                                  │
│     ↓                                          │
│  4. 下載完整區塊                                │
│     ↓                                          │
│  5. 驗證每個交易和區塊                          │
│     ↓                                          │
│  6. 建構 UTXO 集合                              │
│                                                 │
└─────────────────────────────────────────────────┘

預期時間：
- SSD + 快速網路：4-8 小時
- HDD + 快速網路：1-2 天
- 慢速硬體：數天到數週

加速技巧：
1. 使用 SSD（最重要）
2. 分配更多記憶體
   dbcache=4096  # 使用 4GB 用於緩存
3. 暫時關閉交易索引
4. 優良的網路連接

監控進度：
bitcoin-cli getblockchaininfo
# 查看 "verificationprogress"（0.0 到 1.0）
```

## 節點配置

### 重要配置選項

```bash
# bitcoin.conf 完整配置範例

# ====== 基本設置 ======
# 以背景程序運行
daemon=1

# 資料目錄（可選）
# datadir=/path/to/data

# ====== 網路設置 ======
# 接受外部連接
listen=1

# 最大連接數
maxconnections=125

# 只使用 Tor（增強隱私）
# onlynet=onion

# ====== 儲存設置 ======
# 修剪模式（MB，最小 550）
# prune=550

# 交易索引（需要更多空間）
# txindex=1

# ====== 效能設置 ======
# 資料庫快取大小（MB）
dbcache=450

# 每秒最大上傳（KB）
# maxuploadtarget=1000

# ====== RPC 設置 ======
server=1
rpcuser=myusername
rpcpassword=mysecurepassword

# 允許的 RPC 來源
rpcallowip=127.0.0.1

# ====== 錢包設置 ======
# 停用錢包功能
# disablewallet=1

# ====== 除錯 ======
# 記錄所有 RPC 呼叫
# debug=rpc

# 記錄所有網路訊息
# debug=net
```

### 透過 Tor 運行

```bash
# 安裝 Tor
sudo apt install tor

# 配置 Tor
sudo cat >> /etc/tor/torrc << EOF
ControlPort 9051
CookieAuthentication 1
CookieAuthFileGroupReadable 1
EOF

# 將使用者加入 tor 群組
sudo usermod -a -G debian-tor $USER

# 重啟 Tor
sudo systemctl restart tor

# Bitcoin 配置
cat >> ~/.bitcoin/bitcoin.conf << EOF
# Tor 設置
proxy=127.0.0.1:9050
listen=1
bind=127.0.0.1

# 自動設置隱藏服務
listenonion=1
EOF

# 重啟 Bitcoin
bitcoin-cli stop
bitcoind

# 檢查 .onion 地址
bitcoin-cli getnetworkinfo
# 查看 "localaddresses" 中的 .onion 地址
```

## 節點維護

### 監控節點狀態

```bash
# 基本狀態
bitcoin-cli getblockchaininfo
# {
#   "chain": "main",
#   "blocks": 820000,
#   "verificationprogress": 0.9999999,
#   "size_on_disk": 550000000000,
#   ...
# }

# 網路連接狀態
bitcoin-cli getnetworkinfo
# {
#   "connections": 10,
#   "connections_in": 2,
#   "connections_out": 8,
#   ...
# }

# 連接的節點列表
bitcoin-cli getpeerinfo

# 記憶體池狀態
bitcoin-cli getmempoolinfo
# {
#   "size": 5000,
#   "bytes": 3000000,
#   ...
# }

# 錢包資訊（如果啟用）
bitcoin-cli getwalletinfo
```

### 常見問題排解

```
問題：同步卡住

可能原因：
1. 網路問題
2. 磁碟空間不足
3. 節點被封禁

解決方案：
# 檢查連接
bitcoin-cli getpeerinfo | grep "synced_blocks"

# 手動添加節點
bitcoin-cli addnode "node.example.com:8333" "onetry"

# 檢查磁碟空間
df -h ~/.bitcoin

# 重啟節點
bitcoin-cli stop
bitcoind
```

```
問題：記憶體使用過高

解決方案：
# 減少資料庫快取
dbcache=300  # 預設 450

# 減少連接數
maxconnections=20

# 減少記憶體池大小
maxmempool=100
```

```
問題：頻寬使用過高

解決方案：
# 限制上傳
maxuploadtarget=1000  # MB/天

# 減少連接
maxconnections=20

# 只連出不接受連入
listen=0
```

## 節點安全

### 基本安全措施

```
安全清單：

□ 使用強 RPC 密碼
□ 限制 RPC 訪問（rpcallowip）
□ 使用防火牆
□ 定期更新軟體
□ 使用專用使用者帳戶
□ 加密資料目錄（如果有錢包）
□ 監控異常活動

防火牆設置（UFW）：
# 允許比特幣 P2P
sudo ufw allow 8333/tcp

# 允許本地 RPC
sudo ufw allow from 127.0.0.1 to any port 8332

# 啟用防火牆
sudo ufw enable
```

### 備份

```
需要備份的資料：

錢包（如果使用）：
~/.bitcoin/wallets/

配置：
~/.bitcoin/bitcoin.conf

不需要備份（可重新下載）：
~/.bitcoin/blocks/
~/.bitcoin/chainstate/

備份腳本範例：
#!/bin/bash
DATE=$(date +%Y%m%d)
BACKUP_DIR="/backup/bitcoin"

# 停止節點
bitcoin-cli stop
sleep 10

# 備份錢包
tar -czf $BACKUP_DIR/wallets-$DATE.tar.gz ~/.bitcoin/wallets/

# 重啟節點
bitcoind
```

## 開發者使用

### RPC 介面

```bash
# 常用 RPC 命令

# 區塊鏈查詢
bitcoin-cli getbestblockhash
bitcoin-cli getblock "blockhash"
bitcoin-cli getblockheader "blockhash"
bitcoin-cli getblockcount

# 交易查詢
bitcoin-cli getrawtransaction "txid" true
bitcoin-cli decoderawtransaction "hex"

# 記憶體池
bitcoin-cli getrawmempool
bitcoin-cli getmempoolentry "txid"

# 網路
bitcoin-cli getnetworkinfo
bitcoin-cli getpeerinfo
bitcoin-cli getconnectioncount

# 錢包（如果啟用）
bitcoin-cli listwallets
bitcoin-cli getbalance
bitcoin-cli listtransactions
```

### 程式化存取

```python
# Python 使用 RPC
from bitcoinrpc.authproxy import AuthServiceProxy

# 連接到節點
rpc = AuthServiceProxy("http://user:password@127.0.0.1:8332")

# 獲取區塊資訊
block_count = rpc.getblockcount()
print(f"區塊高度: {block_count}")

# 獲取最新區塊
best_hash = rpc.getbestblockhash()
block = rpc.getblock(best_hash)
print(f"最新區塊: {block['height']}")
print(f"交易數: {len(block['tx'])}")

# 解碼交易
tx = rpc.getrawtransaction(block['tx'][0], True)
print(f"Coinbase 交易: {tx['txid']}")
```

```javascript
// Node.js 使用 RPC
const Client = require('bitcoin-core');

const client = new Client({
  host: '127.0.0.1',
  port: 8332,
  username: 'user',
  password: 'password',
});

async function main() {
  // 獲取區塊鏈資訊
  const info = await client.getBlockchainInfo();
  console.log(`區塊高度: ${info.blocks}`);
  console.log(`同步進度: ${(info.verificationprogress * 100).toFixed(2)}%`);

  // 獲取記憶體池
  const mempool = await client.getMempoolInfo();
  console.log(`記憶體池大小: ${mempool.size} 交易`);
}

main();
```

## 節點統計

### 全球節點分布

```
比特幣節點分布（2024）：

可達節點（接受連入）：
~15,000-20,000 個

總節點（包括不可達）：
估計 40,000-100,000 個

地理分布：
┌─────────────┬──────────┐
│    國家     │   佔比   │
├─────────────┼──────────┤
│ 美國        │  ~25%    │
│ 德國        │  ~15%    │
│ 法國        │  ~7%     │
│ 荷蘭        │  ~5%     │
│ 加拿大      │  ~4%     │
│ 英國        │  ~4%     │
│ 其他        │  ~40%    │
└─────────────┴──────────┘

版本分布：
- Bitcoin Core 26.x：~30%
- Bitcoin Core 25.x：~25%
- Bitcoin Core 24.x：~15%
- 其他版本：~30%

查看即時統計：
- bitnodes.io
- coin.dance/nodes
```

### 運行成本

```
年度運行成本估算：

電費（24/7 運行）：
- Raspberry Pi 4：5W × 24h × 365d = 44 kWh
  成本：~$5-15/年

- 舊筆電：30W × 24h × 365d = 263 kWh
  成本：~$30-80/年

- 專用伺服器：100W × 24h × 365d = 876 kWh
  成本：~$100-250/年

網路：
- 家用網路：通常包含在現有費用
- VPS：$5-20/月

儲存：
- 1TB SSD：~$80-100（一次性）

總計（Raspberry Pi 方案）：
- 初始：~$150-200
- 年度：~$10-30
```

## 常見問題

### 需要運行自己的節點嗎？

```
視情況而定：

應該運行的情況：
✓ 持有大量比特幣
✓ 重視隱私
✓ 想要完全主權
✓ 開發比特幣應用
✓ 想要支持網路

可以不運行的情況：
- 持有量少
- 信任錢包提供商
- 沒有技術能力/興趣

折衷方案：
- 使用可信的輕錢包
- 連接朋友的節點
- 使用 Umbrel 等簡易方案
```

### 運行節點能賺錢嗎？

```
直接收入：
- 全節點本身不產生收入
- 不像礦工有區塊獎勵

間接價值：
- 保護自己的比特幣
- 隱私保護（無價）
- 學習比特幣技術
- 支持網路去中心化

可能的收入來源：
- 運行 Lightning 路由節點
- 提供 API 服務
- 運行 Electrum 伺服器
- 但都需要額外設置
```

### 修剪節點 vs 全節點？

```
選擇建議：

選擇全節點如果：
- 有足夠儲存空間（600+ GB）
- 想要支援網路
- 可能需要歷史區塊
- 計劃運行服務

選擇修剪節點如果：
- 儲存有限（只需 ~10 GB）
- 主要為個人使用
- 不需要服務其他人
- 使用 Raspberry Pi 等小型設備

安全性相同：
- 兩者都完全驗證所有交易
- 修剪節點不是輕節點
- 同樣獨立、同樣安全
```
