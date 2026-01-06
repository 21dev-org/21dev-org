# 專案架構

本文檔描述 21dev.org 的技術架構和專案結構。

## 技術棧

| 類別 | 技術 | 版本 | 用途 |
|------|------|------|------|
| 框架 | [Astro](https://astro.build) | ^4.16 | 靜態網站生成 |
| 樣式 | [Tailwind CSS](https://tailwindcss.com) | ^3.4 | 原子化 CSS |
| 語言 | [TypeScript](https://www.typescriptlang.org) | ^5.7 | 類型安全 |
| 搜尋 | [Pagefind](https://pagefind.app) | ^1.4 | 全站搜尋 |
| 測試 | [Vitest](https://vitest.dev) | ^4.0 | 單元測試 |
| Lint | [ESLint](https://eslint.org) | ^9.0 | 程式碼檢查 |
| 格式化 | [Prettier](https://prettier.io) | ^3.7 | 程式碼格式化 |
| CI/CD | GitHub Actions | - | 自動部署 |

## 目錄結構

```
21dev-org/
├── .github/
│   └── workflows/
│       └── deploy.yml          # CI/CD 配置
│
├── public/                      # 靜態資源（直接複製到輸出）
│   ├── fonts/                   # 自託管字體 (JetBrains Mono)
│   ├── icons/                   # PWA 圖標
│   ├── og/                      # Open Graph 預覽圖片
│   ├── favicon.ico              # 網站圖標
│   ├── robots.txt               # 搜尋引擎規則
│   └── manifest.json            # PWA 清單
│
├── scripts/
│   └── generate-og-images.mjs   # OG 圖片生成腳本
│
├── src/
│   ├── components/
│   │   ├── blocks/              # 頁面區塊組件
│   │   │   ├── Hero.astro
│   │   │   ├── FeatureGrid.astro
│   │   │   └── ...
│   │   ├── layout/              # 佈局組件
│   │   │   ├── Header.astro
│   │   │   ├── Footer.astro
│   │   │   └── MegaMenu.astro
│   │   ├── svg/                 # SVG 圖標組件
│   │   └── ui/                  # UI 基礎組件
│   │       ├── Button.astro
│   │       ├── Card.astro
│   │       ├── Tag.astro
│   │       └── ...
│   │
│   ├── content/                 # Astro Content Collections
│   │   ├── events/              # 活動 Markdown
│   │   ├── videos/              # 影片 Markdown
│   │   └── config.ts            # Collection Schema 定義
│   │
│   ├── data/                    # 資料檔案
│   │   ├── bips.ts              # BIP 元數據
│   │   ├── nips.ts              # NIP 元數據
│   │   ├── books.ts             # 書籍資料
│   │   ├── navigation.ts        # 導航結構
│   │   ├── site.ts              # 網站全域配置
│   │   └── constants.ts         # 共用常數
│   │
│   ├── layouts/                 # 頁面佈局
│   │   ├── BaseLayout.astro     # HTML 基礎結構、SEO、Schema
│   │   ├── PageLayout.astro     # 標準頁面
│   │   ├── ArticleLayout.astro  # 文章/教學頁面
│   │   ├── BookLayout.astro     # 書籍章節頁面
│   │   ├── BipLayout.astro      # BIP 頁面
│   │   ├── NipLayout.astro      # NIP 頁面
│   │   └── HubLayout.astro      # 索引/Hub 頁面
│   │
│   ├── pages/                   # 頁面路由（檔案即路由）
│   │   ├── index.astro          # 首頁
│   │   ├── learn/               # 學習中心
│   │   ├── books/               # 書籍資源
│   │   ├── tech/                # 技術領域
│   │   │   ├── bitcoin-core/
│   │   │   ├── lightning/
│   │   │   └── nostr/
│   │   ├── bips/                # BIP 討論
│   │   ├── notable-figures/     # 知名人物
│   │   └── ...
│   │
│   ├── styles/
│   │   └── global.css           # 全域樣式、CSS 變數、主題
│   │
│   └── utils/                   # 工具函數
│       ├── schema.ts            # JSON-LD Schema 生成
│       └── learning-progress.ts # 學習進度追蹤
│
├── tests/                       # 測試檔案
│   └── *.test.ts
│
├── astro.config.mjs             # Astro 配置
├── tailwind.config.mjs          # Tailwind 配置
├── tsconfig.json                # TypeScript 配置
└── package.json
```

## 核心概念

### 佈局系統

所有頁面都繼承自 `BaseLayout.astro`，它提供：

- HTML 基礎結構
- SEO meta 標籤
- Open Graph 標籤
- JSON-LD Schema
- 主題切換支援

專門化的佈局：

| 佈局 | 用途 | 特色 |
|------|------|------|
| `PageLayout` | 一般頁面 | Header + Footer |
| `ArticleLayout` | 教學文章 | 文章元數據、閱讀進度 |
| `BookLayout` | 書籍章節 | 章節導航、書籍 Schema |
| `BipLayout` | BIP 頁面 | BIP 元數據表格、狀態標籤 |
| `NipLayout` | NIP 頁面 | NIP 元數據表格 |
| `HubLayout` | 索引頁面 | 卡片網格佈局 |

### 組件設計原則

1. **Astro 優先**：所有組件使用 `.astro` 格式，零 JS 傳送到客戶端
2. **Props 類型安全**：使用 TypeScript interface 定義 props
3. **CSS 變數主題**：透過 `var(--color-name)` 支援深色/淺色主題
4. **響應式設計**：Mobile-first，使用 Tailwind 斷點

### 資料流

```
src/data/*.ts (靜態資料)
       ↓
src/pages/*.astro (頁面組件)
       ↓
src/layouts/*.astro (佈局套用)
       ↓
dist/ (靜態 HTML 輸出)
```

### Content Collections

用於結構化內容管理：

```typescript
// src/content/config.ts
import { defineCollection, z } from 'astro:content';

const events = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.date(),
    // ...
  }),
});
```

## 建置流程

```bash
# 開發
npm run dev          # 啟動開發伺服器 (localhost:4321)

# 建置
npm run build        # 產生靜態網站到 dist/
npx pagefind --site dist  # 建立搜尋索引

# 品質檢查
npm run lint         # ESLint 檢查
npm run format:check # Prettier 檢查
npm run typecheck    # TypeScript 類型檢查
npm test             # 執行測試
```

## CI/CD 流程

GitHub Actions 工作流程 (`.github/workflows/deploy.yml`)：

1. **Lint** - ESLint 程式碼檢查
2. **Format** - Prettier 格式檢查
3. **Type Check** - TypeScript 類型檢查
4. **Test** - Vitest 單元測試
5. **Build** - Astro 靜態建置
6. **Pagefind** - 搜尋索引生成
7. **Deploy** - 部署到 GitHub Pages

## 效能優化

- **靜態生成**：所有頁面預先生成為 HTML
- **零 JS 預設**：除非需要互動，否則不傳送 JavaScript
- **字體最佳化**：自託管字體，使用 `font-display: swap`
- **圖片最佳化**：使用 Astro Image 組件
- **搜尋**：Pagefind 客戶端搜尋，無需伺服器

## 延伸閱讀

- [CONTRIBUTING.md](./CONTRIBUTING.md) - 貢獻指南
- [Astro 文檔](https://docs.astro.build)
- [Tailwind CSS 文檔](https://tailwindcss.com/docs)
