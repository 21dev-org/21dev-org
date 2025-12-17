# 21dev.org

> 華語中文圈最全面的比特幣技術教育平台

[![Deploy to GitHub Pages](https://github.com/21dev-org/21dev-org/actions/workflows/deploy.yml/badge.svg)](https://github.com/21dev-org/21dev-org/actions/workflows/deploy.yml)

## 關於

21dev.org 是一個致力於推動比特幣技術在華語中文圈發展的教育平台。我們提供：

- 📚 精選中文翻譯書籍
- 🔧 核心技術領域深度解析（Bitcoin Core、Lightning Network、Nostr）
- 📝 BIP 討論與翻譯
- 🎬 技術影片資源
- 📅 社群活動資訊

## 技術棧

- **框架**: [Astro](https://astro.build/)
- **樣式**: [Tailwind CSS](https://tailwindcss.com/)
- **部署**: GitHub Pages
- **CI/CD**: GitHub Actions

## 本地開發

```bash
# 安裝依賴
npm install

# 啟動開發伺服器
npm run dev

# 建構生產版本
npm run build

# 預覽生產版本
npm run preview
```

## 專案結構

```
/
├── public/              # 靜態資源
├── src/
│   ├── components/      # 組件
│   │   ├── layout/      # 佈局組件
│   │   ├── ui/          # UI 組件
│   │   ├── blocks/      # 區塊組件
│   │   └── svg/         # SVG 組件
│   ├── content/         # 內容集合
│   ├── data/            # 資料檔案
│   ├── layouts/         # 頁面佈局
│   ├── pages/           # 頁面路由
│   └── styles/          # 全域樣式
├── astro.config.mjs     # Astro 設定
├── tailwind.config.mjs  # Tailwind 設定
└── package.json
```

## 貢獻

我們歡迎各種形式的貢獻！請參閱 [CONTRIBUTING.md](./CONTRIBUTING.md) 了解詳情。

### 貢獻方式

1. Fork 本倉庫
2. 創建功能分支 (`git checkout -b feature/amazing-feature`)
3. 提交更改 (`git commit -m 'feat: add amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 開啟 Pull Request

## 精選書籍資源

| 書籍 | 連結 |
|------|------|
| 精通比特幣 第二版 | [mastering-bitcoin.doge.tg](https://mastering-bitcoin.doge.tg/) |
| 精通比特幣 第三版 | [bitcoinbook-3nd-zh.doge.tg](https://bitcoinbook-3nd-zh.doge.tg/) |
| Bitcoin 程式設計 | [programming-bitcoin-zh.doge.tg](https://programming-bitcoin-zh.doge.tg/) |
| 精通閃電網路 | [lnbook-zh.doge.tg](https://lnbook-zh.doge.tg/) |
| 區塊大小戰爭 | [the-blocksize-war.doge.tg](https://the-blocksize-war.doge.tg/) |

## 授權

本專案以 [MIT 許可證](./LICENSE) 開源。

---

由社群驅動，為比特幣教育而生。
