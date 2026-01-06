# 21dev.org

> 華語中文圈最全面的比特幣技術教育平台

[![Deploy to GitHub Pages](https://github.com/21dev-org/21dev-org/actions/workflows/deploy.yml/badge.svg)](https://github.com/21dev-org/21dev-org/actions/workflows/deploy.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](./CONTRIBUTING.md)

**[21dev.org](https://21dev.org)** | [貢獻指南](./CONTRIBUTING.md) | [架構文檔](./ARCHITECTURE.md)

## 特色

- **500+ 頁面**的技術文檔與教學內容
- **全站搜尋**（Pagefind）
- **深色/淺色主題**切換
- **響應式設計**，支援所有裝置
- **PWA 支援**，可離線瀏覽
- **Lighthouse 90+ 分數**

## 內容涵蓋

- 📚 **精選書籍** - 中文翻譯的經典比特幣技術書籍
- 🔧 **技術領域** - Bitcoin Core、Lightning Network、Nostr 深度解析
- 📝 **BIP 討論** - 比特幣改進提案的中文翻譯與討論
- 👤 **重要人物** - 比特幣發展史上的關鍵貢獻者
- 🎬 **技術影片** - 精選技術演講與教學
- 📅 **社群活動** - 華語社群活動資訊

## 技術棧

| 類別 | 技術 |
|------|------|
| 框架 | [Astro](https://astro.build/) |
| 樣式 | [Tailwind CSS](https://tailwindcss.com/) |
| 語言 | TypeScript |
| 搜尋 | [Pagefind](https://pagefind.app/) |
| 部署 | GitHub Pages |
| CI/CD | GitHub Actions |

## 本地開發

### 前置需求

- Node.js 20+
- npm 或 pnpm

### 安裝與啟動

```bash
# Clone 專案
git clone https://github.com/21dev-org/21dev-org.git
cd 21dev-org

# 安裝依賴
npm install

# 啟動開發伺服器
npm run dev
```

開發伺服器會在 `http://localhost:4321` 啟動。

### 常用指令

```bash
npm run dev          # 啟動開發伺服器
npm run build        # 建構生產版本
npm run preview      # 預覽生產版本
npm run lint         # ESLint 檢查
npm run format       # Prettier 格式化
npm run typecheck    # TypeScript 類型檢查
npm test             # 執行測試
```

## 專案結構

```
/
├── public/              # 靜態資源
├── src/
│   ├── components/      # 組件
│   │   ├── layout/      # 佈局組件 (Header, Footer)
│   │   ├── ui/          # UI 組件 (Button, Card)
│   │   ├── blocks/      # 區塊組件 (Hero, FeatureGrid)
│   │   └── svg/         # SVG 圖標組件
│   ├── content/         # 內容集合 (Markdown)
│   ├── data/            # 資料檔案 (TypeScript)
│   ├── layouts/         # 頁面佈局
│   ├── pages/           # 頁面路由
│   ├── styles/          # 全域樣式
│   └── utils/           # 工具函數
├── tests/               # 測試檔案
├── astro.config.mjs     # Astro 設定
├── tailwind.config.mjs  # Tailwind 設定
└── package.json
```

詳細架構說明請參閱 [ARCHITECTURE.md](./ARCHITECTURE.md)。

## 貢獻

我們歡迎各種形式的貢獻！無論是修正錯字、改進翻譯、新增內容或修復 bug，都非常感謝。

### 快速開始

1. Fork 本倉庫
2. 創建功能分支 (`git checkout -b feature/amazing-feature`)
3. 提交更改 (`git commit -m 'feat: add amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 開啟 Pull Request

詳細貢獻流程請參閱 [CONTRIBUTING.md](./CONTRIBUTING.md)。

## 精選書籍

| 書籍 | 連結 |
|------|------|
| 精通比特幣 第二版 | [mastering-bitcoin.doge.tg](https://mastering-bitcoin.doge.tg/) |
| 精通比特幣 第三版 | [bitcoinbook-3nd-zh.doge.tg](https://bitcoinbook-3nd-zh.doge.tg/) |
| Bitcoin 程式設計 | [programming-bitcoin-zh.doge.tg](https://programming-bitcoin-zh.doge.tg/) |
| 精通閃電網路 | [lnbook-zh.doge.tg](https://lnbook-zh.doge.tg/) |
| 區塊大小戰爭 | [the-blocksize-war.doge.tg](https://the-blocksize-war.doge.tg/) |

## 社群

- **網站**: [21dev.org](https://21dev.org)
- **GitHub**: [github.com/21dev-org](https://github.com/21dev-org)
- **X (Twitter)**: [@21dev_org](https://x.com/21dev_org)
- **Signal 群組**: [加入群組](https://signal.group/#CjQKIKEW5NtKmgLKX9JOei4GOaTCl1enEIOpFC1R6vjm5_RCEhD3TXZew1_1HSLkD9sh8r5K)

## 授權

本專案以 [MIT 許可證](./LICENSE) 開源。

---

<p align="center">
  由社群驅動，為比特幣教育而生。
</p>
