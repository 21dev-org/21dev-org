# dev21.org 比特幣教育網站 - 實施計劃

> 華語中文圈最全面的比特幣技術教育平台

---

## 目錄

1. [專案概述](#1-專案概述)
2. [技術選型](#2-技術選型)
3. [設計系統](#3-設計系統)
4. [專案結構](#4-專案結構)
5. [頁面架構](#5-頁面架構)
6. [組件設計](#6-組件設計)
7. [SVG 插圖規劃](#7-svg-插圖規劃)
8. [內容資料結構](#8-內容資料結構)
9. [GitHub Actions 部署](#9-github-actions-部署)
10. [實施階段](#10-實施階段)
11. [社群貢獻指南](#11-社群貢獻指南)

---

## 1. 專案概述

### 1.1 使命

推動比特幣技術在華語中文圈的發展，建立一個專業、內容豐富、設計精美的比特幣教育平台。

### 1.2 目標受眾

- 比特幣初學者
- 開發者和技術人員
- 研究人員
- 中文社群貢獻者

### 1.3 核心功能

- 結構化學習路徑
- 精選書籍資源（連結至現有翻譯）
- 技術領域深度解析
- BIP 討論與翻譯
- 活動與會議資訊
- 影片教學資源
- 社群貢獻機制

### 1.4 技術優先領域

1. **Bitcoin Core** - 核心協議與開發
2. **Lightning Network** - 閃電網路
3. **Nostr** - 去中心化社交協議

---

## 2. 技術選型

### 2.1 確定方案

| 項目 | 選擇 | 理由 |
|------|------|------|
| **框架** | Astro | 零 JS 預設、內容優先、效能極佳 |
| **樣式** | Tailwind CSS | 快速開發、設計系統整合、Tree-shaking |
| **部署** | GitHub Pages | 免費、穩定、與 GitHub 整合 |
| **CI/CD** | GitHub Actions | 自動化部署 |
| **內容管理** | Astro Content Collections | 類型安全、Zod schema |

### 2.2 依賴套件

```json
{
  "dependencies": {
    "astro": "^4.x",
    "@astrojs/tailwind": "^5.x",
    "@astrojs/sitemap": "^3.x"
  },
  "devDependencies": {
    "tailwindcss": "^3.x",
    "@types/node": "^20.x",
    "typescript": "^5.x"
  }
}
```

### 2.3 瀏覽器支援

- Chrome/Edge 90+
- Firefox 90+
- Safari 14+
- Mobile Safari / Chrome for Android

---

## 3. 設計系統

### 3.1 設計風格：比特幣橙 (Bitcoin Orange)

大膽現代的設計風格，以比特幣標誌性的橙色為主色調，搭配深色/淺色模式切換，呈現專業且具科技感的視覺體驗。

### 3.2 色彩系統

```css
/* ================================
   淺色模式 (預設)
   ================================ */
:root {
  /* Primary - Bitcoin Orange */
  --color-primary-50: #FFF7ED;
  --color-primary-100: #FFEDD5;
  --color-primary-200: #FED7AA;
  --color-primary-300: #FDBA74;
  --color-primary-400: #FB923C;
  --color-primary-500: #F7931A;    /* Bitcoin Orange - 主色 */
  --color-primary-600: #EA580C;
  --color-primary-700: #C2410C;
  --color-primary-800: #9A3412;
  --color-primary-900: #7C2D12;

  /* Neutral - 暖灰色系 */
  --color-neutral-50: #FAFAF9;
  --color-neutral-100: #F5F5F4;
  --color-neutral-200: #E7E5E4;
  --color-neutral-300: #D6D3D1;
  --color-neutral-400: #A8A29E;
  --color-neutral-500: #78716C;
  --color-neutral-600: #57534E;
  --color-neutral-700: #44403C;
  --color-neutral-800: #292524;
  --color-neutral-900: #1C1917;
  --color-neutral-950: #0C0A09;

  /* 語意色彩 */
  --color-success: #22C55E;
  --color-warning: #EAB308;
  --color-error: #EF4444;
  --color-info: #3B82F6;

  /* 背景與表面 */
  --bg-primary: #FFFFFF;
  --bg-secondary: #FAFAF9;
  --bg-tertiary: #F5F5F4;
  --surface-elevated: #FFFFFF;

  /* 文字 */
  --text-primary: #1C1917;
  --text-secondary: #57534E;
  --text-tertiary: #78716C;
  --text-inverse: #FFFFFF;

  /* 邊框 */
  --border-default: #E7E5E4;
  --border-strong: #D6D3D1;
}

/* ================================
   深色模式
   ================================ */
[data-theme="dark"] {
  --bg-primary: #0C0A09;
  --bg-secondary: #1C1917;
  --bg-tertiary: #292524;
  --surface-elevated: #1C1917;

  --text-primary: #FAFAF9;
  --text-secondary: #A8A29E;
  --text-tertiary: #78716C;
  --text-inverse: #1C1917;

  --border-default: #292524;
  --border-strong: #44403C;
}
```

### 3.3 字型系統

```css
/* 字型家族 */
--font-sans: 'Noto Sans SC', 'PingFang SC', 'Microsoft YaHei', sans-serif;
--font-mono: 'JetBrains Mono', 'Fira Code', monospace;
--font-display: 'Noto Sans SC', sans-serif;

/* 字型大小 - 流體排版 */
--text-xs: clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem);
--text-sm: clamp(0.875rem, 0.8rem + 0.375vw, 1rem);
--text-base: clamp(1rem, 0.925rem + 0.375vw, 1.125rem);
--text-lg: clamp(1.125rem, 1rem + 0.625vw, 1.25rem);
--text-xl: clamp(1.25rem, 1.1rem + 0.75vw, 1.5rem);
--text-2xl: clamp(1.5rem, 1.25rem + 1.25vw, 2rem);
--text-3xl: clamp(1.875rem, 1.5rem + 1.875vw, 2.5rem);
--text-4xl: clamp(2.25rem, 1.75rem + 2.5vw, 3rem);
--text-5xl: clamp(3rem, 2.25rem + 3.75vw, 4rem);

/* 行高 */
--leading-tight: 1.25;
--leading-snug: 1.375;
--leading-normal: 1.5;
--leading-relaxed: 1.625;
--leading-loose: 2;

/* 字距 */
--tracking-tight: -0.025em;
--tracking-normal: 0;
--tracking-wide: 0.025em;
```

### 3.4 間距系統

```css
--space-1: 0.25rem;   /* 4px */
--space-2: 0.5rem;    /* 8px */
--space-3: 0.75rem;   /* 12px */
--space-4: 1rem;      /* 16px */
--space-5: 1.25rem;   /* 20px */
--space-6: 1.5rem;    /* 24px */
--space-8: 2rem;      /* 32px */
--space-10: 2.5rem;   /* 40px */
--space-12: 3rem;     /* 48px */
--space-16: 4rem;     /* 64px */
--space-20: 5rem;     /* 80px */
--space-24: 6rem;     /* 96px */
```

### 3.5 組件設計標記

```css
/* 圓角 */
--radius-sm: 0.25rem;
--radius-md: 0.5rem;
--radius-lg: 0.75rem;
--radius-xl: 1rem;
--radius-2xl: 1.5rem;
--radius-full: 9999px;

/* 陰影 */
--shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
--shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);
--shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1);
--shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1);
--shadow-glow: 0 0 20px rgb(247 147 26 / 0.3);

/* 過渡動畫 */
--transition-fast: 150ms ease;
--transition-base: 200ms ease;
--transition-slow: 300ms ease;
```

### 3.6 中文排版優化

```css
.prose {
  /* 中文適用的較寬行高 */
  line-height: 1.8;

  /* 避免不當斷行 */
  word-break: keep-all;
  overflow-wrap: break-word;

  /* 適當的字距 */
  letter-spacing: 0.02em;
}

/* 中英文混排自動間距 */
.prose :where(p, li) {
  text-spacing-trim: space-all;
}
```

---

## 4. 專案結構

```
/21dev-org/
├── .github/
│   ├── workflows/
│   │   └── deploy.yml              # GitHub Actions 部署
│   └── ISSUE_TEMPLATE/
│       ├── bug_report.md
│       └── feature_request.md
│
├── public/
│   ├── favicon.svg                 # Bitcoin 主題 favicon
│   ├── og-image.png                # Open Graph 圖片
│   ├── robots.txt
│   ├── fonts/
│   │   ├── NotoSansSC-Regular.woff2
│   │   ├── NotoSansSC-Medium.woff2
│   │   ├── NotoSansSC-Bold.woff2
│   │   └── JetBrainsMono-Regular.woff2
│   └── images/
│       ├── books/                  # 書籍封面
│       └── events/                 # 活動圖片
│
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.astro
│   │   │   ├── Footer.astro
│   │   │   ├── MegaMenu.astro
│   │   │   ├── MobileNav.astro
│   │   │   └── ThemeToggle.astro
│   │   ├── ui/
│   │   │   ├── Button.astro
│   │   │   ├── Card.astro
│   │   │   ├── BookCard.astro
│   │   │   ├── EventCard.astro
│   │   │   ├── VideoCard.astro
│   │   │   ├── BipCard.astro
│   │   │   ├── Tag.astro
│   │   │   ├── Breadcrumb.astro
│   │   │   └── TableOfContents.astro
│   │   ├── blocks/
│   │   │   ├── Hero.astro
│   │   │   ├── FeatureGrid.astro
│   │   │   ├── BookshelfSection.astro
│   │   │   ├── TechStack.astro
│   │   │   ├── EventTimeline.astro
│   │   │   ├── VideoGallery.astro
│   │   │   ├── ContributeCTA.astro
│   │   │   └── Newsletter.astro
│   │   └── svg/
│   │       ├── BitcoinLogo.astro
│   │       ├── LightningBolt.astro
│   │       ├── NostrIcon.astro
│   │       ├── NetworkGraph.astro
│   │       ├── BlockchainChain.astro
│   │       ├── NodeNetwork.astro
│   │       ├── HashPattern.astro
│   │       └── WavePattern.astro
│   │
│   ├── layouts/
│   │   ├── BaseLayout.astro        # 基礎 HTML 結構
│   │   ├── PageLayout.astro        # 標準頁面
│   │   ├── ArticleLayout.astro     # 文章/教學
│   │   ├── BookLayout.astro        # 書籍頁面
│   │   └── HubLayout.astro         # Hub 索引頁
│   │
│   ├── pages/
│   │   ├── index.astro             # 首頁
│   │   ├── about.astro             # 關於
│   │   ├── contribute.astro        # 貢獻指南
│   │   ├── learn/                  # 學習中心
│   │   ├── books/                  # 書籍資源
│   │   ├── tech/                   # 技術領域
│   │   ├── bips/                   # BIP 討論
│   │   ├── events/                 # 活動
│   │   └── videos/                 # 影片
│   │
│   ├── content/
│   │   ├── config.ts               # Content Collections 設定
│   │   ├── events/                 # 活動 Markdown
│   │   └── videos/                 # 影片 Markdown
│   │
│   ├── styles/
│   │   ├── global.css              # 全域樣式與 CSS 變數
│   │   ├── typography.css          # 排版系統
│   │   ├── components.css          # 組件樣式
│   │   └── utilities.css           # 工具類別
│   │
│   ├── scripts/
│   │   ├── theme.ts                # 主題切換邏輯
│   │   ├── mega-menu.ts            # Mega Menu 互動
│   │   └── animations.ts           # 滾動動畫
│   │
│   └── data/
│       ├── navigation.ts           # 導航結構
│       ├── books.ts                # 書籍資料
│       ├── bips.ts                 # BIP 元資料
│       └── site.ts                 # 網站設定
│
├── astro.config.mjs
├── tailwind.config.mjs
├── tsconfig.json
├── package.json
├── CONTRIBUTING.md
├── LICENSE
└── README.md
```

---

## 5. 頁面架構

### 5.1 網站地圖

```
dev21.org/
│
├── /                              # 首頁
│   ├── Hero 區塊（動態網路背景）
│   ├── 精選書籍輪播
│   ├── 技術領域入口
│   ├── 最新活動
│   └── 貢獻 CTA
│
├── /learn/                        # 學習中心 Hub
│   ├── /basics/                   # 入門基礎
│   │   ├── what-is-bitcoin        # 什麼是比特幣
│   │   ├── how-bitcoin-works      # 比特幣如何運作
│   │   └── wallet-guide           # 錢包使用指南
│   ├── /intermediate/             # 進階知識
│   │   ├── utxo-model             # UTXO 模型
│   │   └── transaction-structure  # 交易結構
│   └── /advanced/                 # 深入技術
│       ├── script-language        # Script 語言
│       └── taproot                # Taproot 升級
│
├── /books/                        # 書籍資源 Hub
│   ├── mastering-bitcoin          # 精通比特幣 第二版
│   ├── mastering-bitcoin-3rd      # 精通比特幣 第三版
│   ├── programming-bitcoin        # Bitcoin 程式設計
│   ├── mastering-lightning        # 精通閃電網路
│   ├── blocksize-war              # 區塊大小戰爭
│   └── whitepapers                # 白皮書合集
│
├── /tech/                         # 技術領域 Hub
│   ├── /bitcoin-core/             # Bitcoin Core
│   │   ├── index                  # 概述
│   │   ├── architecture           # 架構
│   │   └── contribute             # 參與開發
│   ├── /lightning/                # 閃電網路
│   │   ├── index                  # 概述
│   │   ├── how-it-works           # 運作原理
│   │   └── implementations        # 實作指南
│   └── /nostr/                    # Nostr
│       ├── index                  # 協議介紹
│       ├── protocol               # 協議詳解
│       └── clients                # 客戶端
│
├── /bips/                         # BIP 討論 Hub
│   ├── bip-0001                   # BIP 流程
│   ├── bip-0032                   # HD 錢包
│   ├── bip-0039                   # 助記詞
│   ├── bip-0141                   # SegWit
│   └── bip-0340                   # Schnorr
│
├── /events/                       # 活動 Hub
│   └── [slug]                     # 動態活動頁
│
├── /videos/                       # 影片 Hub
│   └── [slug]                     # 動態影片頁
│
├── /about                         # 關於我們
└── /contribute                    # 貢獻指南
```

### 5.2 Mega Menu 導航結構

```typescript
// src/data/navigation.ts
export const navigation = {
  main: [
    {
      label: "學習",
      href: "/learn/",
      megaMenu: {
        featured: {
          title: "開始學習比特幣",
          description: "從零開始理解比特幣的完整指南",
          href: "/learn/basics/what-is-bitcoin",
          image: "/images/learn-featured.svg"
        },
        sections: [
          {
            title: "入門基礎",
            links: [
              { label: "什麼是比特幣", href: "/learn/basics/what-is-bitcoin" },
              { label: "比特幣如何運作", href: "/learn/basics/how-bitcoin-works" },
              { label: "錢包使用指南", href: "/learn/basics/wallet-guide" }
            ]
          },
          {
            title: "進階知識",
            links: [
              { label: "UTXO 模型", href: "/learn/intermediate/utxo-model" },
              { label: "交易結構", href: "/learn/intermediate/transaction-structure" }
            ]
          },
          {
            title: "深入技術",
            links: [
              { label: "Script 語言", href: "/learn/advanced/script-language" },
              { label: "Taproot 升級", href: "/learn/advanced/taproot" }
            ]
          }
        ]
      }
    },
    {
      label: "書籍",
      href: "/books/",
      megaMenu: {
        featured: {
          title: "精選翻譯書籍",
          description: "社群翻譯的經典比特幣技術書籍",
          href: "/books/",
          image: "/images/books-featured.svg"
        },
        sections: [
          {
            title: "核心經典",
            links: [
              { label: "精通比特幣 第二版", href: "/books/mastering-bitcoin" },
              { label: "精通比特幣 第三版", href: "/books/mastering-bitcoin-3rd" },
              { label: "Bitcoin 程式設計", href: "/books/programming-bitcoin" }
            ]
          },
          {
            title: "閃電網路",
            links: [
              { label: "精通閃電網路", href: "/books/mastering-lightning" }
            ]
          },
          {
            title: "歷史與白皮書",
            links: [
              { label: "區塊大小戰爭", href: "/books/blocksize-war" },
              { label: "白皮書", href: "/books/whitepapers" }
            ]
          }
        ]
      }
    },
    {
      label: "技術",
      href: "/tech/",
      megaMenu: {
        sections: [
          {
            title: "Bitcoin Core",
            description: "比特幣核心協議與開發",
            links: [
              { label: "架構概述", href: "/tech/bitcoin-core/" },
              { label: "參與開發", href: "/tech/bitcoin-core/contribute" }
            ]
          },
          {
            title: "閃電網路",
            description: "Layer 2 擴展方案",
            links: [
              { label: "運作原理", href: "/tech/lightning/" },
              { label: "實作指南", href: "/tech/lightning/implementations" }
            ]
          },
          {
            title: "Nostr",
            description: "去中心化社交協議",
            links: [
              { label: "協議介紹", href: "/tech/nostr/" },
              { label: "客戶端", href: "/tech/nostr/clients" }
            ]
          }
        ]
      }
    },
    {
      label: "BIPs",
      href: "/bips/",
      megaMenu: {
        sections: [
          {
            title: "重要 BIPs",
            links: [
              { label: "BIP-0001: BIP 流程", href: "/bips/bip-0001" },
              { label: "BIP-0032: HD 錢包", href: "/bips/bip-0032" },
              { label: "BIP-0039: 助記詞", href: "/bips/bip-0039" },
              { label: "BIP-0141: SegWit", href: "/bips/bip-0141" },
              { label: "BIP-0340: Schnorr", href: "/bips/bip-0340" }
            ]
          }
        ]
      }
    },
    { label: "活動", href: "/events/" },
    { label: "影片", href: "/videos/" }
  ],
  secondary: [
    { label: "關於", href: "/about" },
    { label: "貢獻", href: "/contribute" }
  ]
};
```

---

## 6. 組件設計

### 6.1 布局組件

#### BaseLayout.astro
- HTML 結構 (`lang="zh-Hant"`)
- 主題初始化腳本（防止閃爍）
- Meta 標籤、Open Graph、favicon
- 字型載入 (`font-display: swap`)
- 全域 CSS 引入

#### PageLayout.astro
- Header + Mega Menu
- 主內容區域（最大寬度容器）
- Footer

#### HubLayout.astro
- Hero 區塊
- 功能卡片網格
- 側邊快速導航
- 相關內容推薦

#### ArticleLayout.astro
- 麵包屑導航
- 文章標題區（標題、元資料、閱讀時間）
- 目錄（固定側邊欄）
- 內容區域
- 上一篇/下一篇導航

#### BookLayout.astro
- 書籍封面
- 元資料（作者、譯者、語言）
- 描述與主題標籤
- 外部連結按鈕

### 6.2 UI 組件

| 組件 | 用途 |
|------|------|
| `Button.astro` | 按鈕（primary, secondary, ghost） |
| `Card.astro` | 通用卡片 |
| `BookCard.astro` | 書籍卡片（含封面） |
| `BipCard.astro` | BIP 卡片（含狀態徽章） |
| `EventCard.astro` | 活動卡片（含日期） |
| `VideoCard.astro` | 影片卡片（含縮圖） |
| `Tag.astro` | 標籤組件 |
| `Breadcrumb.astro` | 麵包屑導航 |
| `TableOfContents.astro` | 文章目錄 |

### 6.3 區塊組件

| 組件 | 用途 |
|------|------|
| `Hero.astro` | 首頁 Hero 區塊 |
| `FeatureGrid.astro` | 功能展示網格 |
| `BookshelfSection.astro` | 書籍展示區 |
| `TechStack.astro` | 技術領域卡片 |
| `EventTimeline.astro` | 活動時間線 |
| `VideoGallery.astro` | 影片畫廊 |
| `ContributeCTA.astro` | 貢獻呼籲區塊 |

---

## 7. SVG 插圖規劃

### 7.1 品牌與圖示

| 檔案 | 描述 | 用途 |
|------|------|------|
| `BitcoinLogo.astro` | Bitcoin "B" 標誌（漸層） | Header、favicon、裝飾 |
| `LightningBolt.astro` | 閃電符號 | 閃電網路區塊 |
| `NostrIcon.astro` | Nostr 中繼圖示 | Nostr 區塊 |
| `SatoshiSymbol.astro` | 聰符號 | 定價、微支付 |

### 7.2 網路視覺化

| 檔案 | 描述 | 用途 |
|------|------|------|
| `NetworkGraph.astro` | 動態節點網路（P2P） | Hero 背景、技術區塊 |
| `BlockchainChain.astro` | 區塊鏈連接視覺化 | 學習頁面、圖解 |
| `MerkleTree.astro` | Merkle Tree 結構 | 技術解說 |
| `HashVisualization.astro` | 雜湊函數表示 | 密碼學區塊 |
| `UTXODiagram.astro` | UTXO 模型視覺化 | 交易解說 |

### 7.3 裝飾圖案

| 檔案 | 描述 | 用途 |
|------|------|------|
| `HashPattern.astro` | 重複雜湊圖案 | 區塊背景 |
| `WavePattern.astro` | 抽象波浪流動 | 分隔線、背景 |
| `GridPattern.astro` | 細微網格覆蓋 | 卡片背景 |
| `CircuitPattern.astro` | 電路板美學 | 技術區塊 |

### 7.4 教學插圖

| 檔案 | 描述 | 用途 |
|------|------|------|
| `WalletIllustration.astro` | 硬體/軟體錢包 | 錢包指南 |
| `NodeIllustration.astro` | 比特幣節點視覺化 | 節點設定指南 |
| `KeysIllustration.astro` | 公私鑰對 | 安全教育 |
| `LayersIllustration.astro` | Layer 1/2 堆疊 | 技術概覽 |

---

## 8. 內容資料結構

### 8.1 書籍資料

```typescript
// src/data/books.ts
export interface Book {
  id: string;
  title: string;
  subtitle: string;
  author: string;
  translator: string;
  coverImage: string;
  externalUrl: string;
  description: string;
  topics: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  pages: number;
  year: number;
}

export const books: Book[] = [
  {
    id: "mastering-bitcoin",
    title: "精通比特幣",
    subtitle: "Mastering Bitcoin 第二版",
    author: "Andreas M. Antonopoulos",
    translator: "Cypherpunks Core",
    coverImage: "/images/books/mastering-bitcoin.png",
    externalUrl: "https://mastering-bitcoin.doge.tg/",
    description: "最經典的比特幣技術書籍，深入解析比特幣的技術原理、交易機制、挖礦過程與網路架構。",
    topics: ["交易", "錢包", "挖礦", "網路協議"],
    difficulty: "intermediate",
    pages: 400,
    year: 2017
  },
  {
    id: "mastering-bitcoin-3rd",
    title: "精通比特幣 第三版",
    subtitle: "Mastering Bitcoin 3rd Edition",
    author: "Andreas M. Antonopoulos, David A. Harding",
    translator: "社群翻譯",
    coverImage: "/images/books/mastering-bitcoin-3rd.png",
    externalUrl: "https://bitcoinbook-3nd-zh.doge.tg/",
    description: "全新第三版，涵蓋 SegWit、Taproot 等最新升級內容。",
    topics: ["SegWit", "Taproot", "Schnorr", "PSBT"],
    difficulty: "intermediate",
    pages: 450,
    year: 2023
  },
  {
    id: "programming-bitcoin",
    title: "Bitcoin 程式設計",
    subtitle: "Programming Bitcoin",
    author: "Jimmy Song",
    translator: "社群翻譯",
    coverImage: "/images/books/programming-bitcoin.png",
    externalUrl: "https://programming-bitcoin-zh.doge.tg/#/",
    description: "從零開始用 Python 實作比特幣核心功能，理解橢圓曲線加密、交易建構與區塊驗證。",
    topics: ["Python", "橢圓曲線", "交易建構", "Script"],
    difficulty: "advanced",
    pages: 320,
    year: 2019
  },
  {
    id: "mastering-lightning",
    title: "精通閃電網路",
    subtitle: "Mastering the Lightning Network",
    author: "Andreas M. Antonopoulos, Olaoluwa Osuntokun, Rene Pickhardt",
    translator: "社群翻譯",
    coverImage: "/images/books/mastering-lightning.png",
    externalUrl: "https://lnbook-zh.doge.tg/",
    description: "閃電網路技術的完整指南，涵蓋支付通道、路由、HTLC 與實作細節。",
    topics: ["支付通道", "HTLC", "路由", "發票"],
    difficulty: "advanced",
    pages: 350,
    year: 2021
  },
  {
    id: "blocksize-war",
    title: "區塊大小戰爭",
    subtitle: "The Blocksize War",
    author: "Jonathan Bier",
    translator: "社群翻譯",
    coverImage: "/images/books/blocksize-war.png",
    externalUrl: "https://the-blocksize-war.doge.tg/#/",
    description: "記錄 2015-2017 年比特幣社群關於區塊大小的激烈爭論，理解比特幣治理的重要歷史。",
    topics: ["歷史", "治理", "分叉", "社群"],
    difficulty: "beginner",
    pages: 280,
    year: 2021
  },
  {
    id: "bitcoin-whitepaper",
    title: "比特幣白皮書",
    subtitle: "Bitcoin: A Peer-to-Peer Electronic Cash System",
    author: "Satoshi Nakamoto",
    translator: "Cypherpunks Core",
    coverImage: "/images/books/bitcoin-whitepaper.png",
    externalUrl: "https://cypherpunks-core.github.io/books/BitcoinWhitePaper/",
    description: "中本聰於 2008 年發表的比特幣白皮書，定義了整個加密貨幣時代的開端。",
    topics: ["白皮書", "原理", "歷史"],
    difficulty: "intermediate",
    pages: 9,
    year: 2008
  },
  {
    id: "lightning-whitepaper",
    title: "閃電網路白皮書",
    subtitle: "The Bitcoin Lightning Network",
    author: "Joseph Poon, Thaddeus Dryja",
    translator: "Cypherpunks Core",
    coverImage: "/images/books/lightning-whitepaper.png",
    externalUrl: "https://cypherpunks-core.github.io/books/LightningNetworkWhitePaper/",
    description: "閃電網路的原始白皮書，描述如何透過支付通道實現比特幣的擴展。",
    topics: ["白皮書", "支付通道", "擴展"],
    difficulty: "advanced",
    pages: 60,
    year: 2016
  }
];
```

### 8.2 BIP 資料

```typescript
// src/data/bips.ts
export interface BIP {
  number: number;
  title: string;
  titleZh: string;
  status: 'Draft' | 'Proposed' | 'Final' | 'Active' | 'Replaced' | 'Rejected' | 'Withdrawn';
  type: 'Standards Track' | 'Informational' | 'Process';
  author: string;
  created: string;
  summary: string;
  importance: 'fundamental' | 'critical' | 'important' | 'standard';
}

export const bips: BIP[] = [
  {
    number: 1,
    title: "BIP Purpose and Guidelines",
    titleZh: "BIP 目的與準則",
    status: "Active",
    type: "Process",
    author: "Amir Taaki",
    created: "2011-08-19",
    summary: "定義 Bitcoin Improvement Proposals 的格式、流程與生命週期。",
    importance: "fundamental"
  },
  {
    number: 32,
    title: "Hierarchical Deterministic Wallets",
    titleZh: "階層式確定性錢包",
    status: "Final",
    type: "Standards Track",
    author: "Pieter Wuille",
    created: "2012-02-11",
    summary: "定義從單一種子派生多個密鑰對的標準方法，成為現代錢包的基礎。",
    importance: "critical"
  },
  {
    number: 39,
    title: "Mnemonic code for generating deterministic keys",
    titleZh: "助記詞生成確定性密鑰",
    status: "Proposed",
    type: "Standards Track",
    author: "Marek Palatinus, Pavol Rusnak, Aaron Voisine, Sean Bowe",
    created: "2013-09-10",
    summary: "定義將隨機數轉換為易記單詞序列的標準，讓使用者可以備份錢包。",
    importance: "critical"
  },
  {
    number: 141,
    title: "Segregated Witness (Consensus layer)",
    titleZh: "隔離見證（共識層）",
    status: "Final",
    type: "Standards Track",
    author: "Eric Lombrozo, Johnson Lau, Pieter Wuille",
    created: "2015-12-21",
    summary: "比特幣最重要的升級之一，解決交易延展性問題並提高區塊容量。",
    importance: "critical"
  },
  {
    number: 340,
    title: "Schnorr Signatures for secp256k1",
    titleZh: "secp256k1 的 Schnorr 簽章",
    status: "Final",
    type: "Standards Track",
    author: "Pieter Wuille, Jonas Nick, Tim Ruffing",
    created: "2020-01-19",
    summary: "Taproot 升級的基礎，引入更高效的 Schnorr 簽章方案。",
    importance: "critical"
  },
  {
    number: 341,
    title: "Taproot: SegWit version 1 spending rules",
    titleZh: "Taproot: SegWit 版本 1 花費規則",
    status: "Final",
    type: "Standards Track",
    author: "Pieter Wuille, Jonas Nick, Anthony Towns",
    created: "2020-01-19",
    summary: "引入新的腳本類型，提供更強的隱私性和更高效的智能合約能力。",
    importance: "critical"
  },
  {
    number: 342,
    title: "Validation of Taproot Scripts",
    titleZh: "Taproot 腳本驗證",
    status: "Final",
    type: "Standards Track",
    author: "Pieter Wuille, Jonas Nick, Anthony Towns",
    created: "2020-01-19",
    summary: "定義 Tapscript 的驗證規則，支援新的腳本功能。",
    importance: "important"
  }
];
```

### 8.3 Content Collections 設定

```typescript
// src/content/config.ts
import { defineCollection, z } from 'astro:content';

const eventsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.date(),
    endDate: z.date().optional(),
    location: z.string(),
    type: z.enum(['meetup', 'conference', 'workshop', 'online', 'hackathon']),
    url: z.string().url().optional(),
    image: z.string().optional(),
    description: z.string(),
    tags: z.array(z.string()).optional(),
  }),
});

const videosCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.date(),
    duration: z.string(),
    platform: z.enum(['youtube', 'bilibili', 'vimeo', 'other']),
    embedId: z.string(),
    thumbnailUrl: z.string().optional(),
    speaker: z.string().optional(),
    topics: z.array(z.string()),
    description: z.string(),
    language: z.enum(['zh', 'en', 'zh-sub']).default('zh'),
  }),
});

const articlesCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.date(),
    updatedDate: z.date().optional(),
    author: z.string().optional(),
    tags: z.array(z.string()),
    difficulty: z.enum(['beginner', 'intermediate', 'advanced']).optional(),
    readingTime: z.number().optional(),
  }),
});

export const collections = {
  events: eventsCollection,
  videos: videosCollection,
  articles: articlesCollection,
};
```

---

## 9. GitHub Actions 部署

### 9.1 部署工作流程

```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

env:
  BUILD_PATH: "."

jobs:
  build:
    name: Build
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: "20"
          cache: npm
          cache-dependency-path: ${{ env.BUILD_PATH }}/package-lock.json

      - name: Setup Pages
        id: pages
        uses: actions/configure-pages@v4

      - name: Install dependencies
        run: npm ci
        working-directory: ${{ env.BUILD_PATH }}

      - name: Build with Astro
        run: npm run build
        working-directory: ${{ env.BUILD_PATH }}
        env:
          SITE: ${{ steps.pages.outputs.origin }}
          BASE: ${{ steps.pages.outputs.base_path }}

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ${{ env.BUILD_PATH }}/dist

  deploy:
    name: Deploy
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

### 9.2 Astro 設定

```javascript
// astro.config.mjs
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://dev21.org',
  integrations: [
    tailwind(),
    sitemap({
      i18n: {
        defaultLocale: 'zh-Hant',
        locales: {
          'zh-Hant': 'zh-Hant'
        }
      }
    })
  ],
  output: 'static',
  build: {
    assets: 'assets'
  },
  vite: {
    build: {
      cssMinify: 'lightningcss'
    }
  }
});
```

---

## 10. 實施階段

### 階段 1：專案初始化

**任務清單：**
- [ ] 移除舊的 Pelican 模板
- [ ] 初始化 Astro 專案
- [ ] 安裝依賴套件
- [ ] 設定 Astro 配置
- [ ] 設定 Tailwind CSS
- [ ] 建立專案目錄結構
- [ ] 設定 TypeScript

### 階段 2：設計系統與布局

**任務清單：**
- [ ] 建立全域 CSS 變數
- [ ] 建立排版系統
- [ ] 建立工具類別
- [ ] 實作主題切換系統
- [ ] 建立 BaseLayout
- [ ] 建立 PageLayout
- [ ] 建立 HubLayout
- [ ] 建立 ArticleLayout

### 階段 3：Header 與導航

**任務清單：**
- [ ] 建立 Header 組件
- [ ] 建立 Mega Menu 組件
- [ ] 建立 Mobile Nav 組件
- [ ] 建立 Theme Toggle 組件
- [ ] 實作導航互動邏輯
- [ ] 測試響應式行為

### 階段 4：SVG 插圖

**任務清單：**
- [ ] 建立 Bitcoin Logo SVG
- [ ] 建立 Lightning Bolt SVG
- [ ] 建立 Nostr Icon SVG
- [ ] 建立 Network Graph SVG（動畫）
- [ ] 建立 Hash Pattern SVG
- [ ] 建立 Wave Pattern SVG
- [ ] 建立 favicon

### 階段 5：UI 組件

**任務清單：**
- [ ] 建立 Button 組件
- [ ] 建立 Card 組件
- [ ] 建立 BookCard 組件
- [ ] 建立 BipCard 組件
- [ ] 建立 EventCard 組件
- [ ] 建立 VideoCard 組件
- [ ] 建立 Tag 組件
- [ ] 建立 Breadcrumb 組件

### 階段 6：區塊組件與首頁

**任務清單：**
- [ ] 建立 Hero 組件
- [ ] 建立 FeatureGrid 組件
- [ ] 建立 BookshelfSection 組件
- [ ] 建立 TechStack 組件
- [ ] 建立 ContributeCTA 組件
- [ ] 建立 Footer 組件
- [ ] 組裝首頁

### 階段 7：Hub 頁面

**任務清單：**
- [ ] 建立 /learn/ 索引頁
- [ ] 建立 /books/ 索引頁
- [ ] 建立 /tech/ 索引頁
- [ ] 建立 /bips/ 索引頁
- [ ] 建立 /events/ 索引頁
- [ ] 建立 /videos/ 索引頁

### 階段 8：內容頁面

**任務清單：**
- [ ] 建立書籍頁面（7 本）
- [ ] 建立 BIP 頁面（初始 5-7 個）
- [ ] 建立技術領域頁面（Bitcoin Core、Lightning、Nostr）
- [ ] 建立學習基礎頁面
- [ ] 建立 About 頁面
- [ ] 建立 Contribute 頁面

### 階段 9：Content Collections

**任務清單：**
- [ ] 設定 Content Collections
- [ ] 建立活動動態頁面
- [ ] 建立影片動態頁面
- [ ] 新增初始內容

### 階段 10：優化與上線

**任務清單：**
- [ ] SEO 優化（meta、structured data）
- [ ] 效能優化（圖片、字型）
- [ ] 無障礙測試
- [ ] 跨瀏覽器測試
- [ ] 更新 README.md
- [ ] 建立 CONTRIBUTING.md
- [ ] 設定 GitHub Pages
- [ ] 部署測試

---

## 11. 社群貢獻指南

### 11.1 貢獻流程

1. Fork 倉庫
2. 建立功能分支 (`git checkout -b feature/amazing-feature`)
3. 撰寫或修改內容
4. 提交變更 (`git commit -m 'feat: add amazing feature'`)
5. 推送到分支 (`git push origin feature/amazing-feature`)
6. 開啟 Pull Request

### 11.2 內容貢獻

**新增文章：**
```markdown
---
title: "文章標題"
description: "文章描述"
date: 2024-01-01
author: "作者名稱"
tags: ["比特幣", "教學"]
difficulty: "beginner"
---

# 文章內容

...
```

**新增活動：**
```markdown
---
title: "活動名稱"
date: 2024-06-01
location: "台北"
type: "meetup"
url: "https://example.com"
description: "活動描述"
tags: ["meetup", "比特幣"]
---

活動詳細內容...
```

### 11.3 檔案命名規範

| 類型 | 命名規則 | 範例 |
|------|----------|------|
| 頁面 | `kebab-case.astro` | `what-is-bitcoin.astro` |
| 組件 | `PascalCase.astro` | `BookCard.astro` |
| 資料 | `camelCase.ts` | `navigation.ts` |
| 內容 | `kebab-case.md` | `bitcoin-taipei-meetup.md` |

### 11.4 Commit Message 格式

```
type(scope): description

範例：
- feat(learn): add UTXO model explanation
- fix(nav): correct mobile menu z-index
- docs(bips): translate BIP-0341
- style(cards): improve hover states
- refactor(layout): simplify header component
```

**類型（type）：**
- `feat`: 新功能
- `fix`: 錯誤修正
- `docs`: 文檔更新
- `style`: 樣式調整
- `refactor`: 重構
- `perf`: 效能優化
- `test`: 測試相關
- `chore`: 維護任務

---

## 附錄

### A. 外部資源連結

| 資源 | 連結 |
|------|------|
| 精通比特幣 第二版 | https://mastering-bitcoin.doge.tg/ |
| 精通比特幣 第三版 | https://bitcoinbook-3nd-zh.doge.tg/ |
| Bitcoin 程式設計 | https://programming-bitcoin-zh.doge.tg/#/ |
| 精通閃電網路 | https://lnbook-zh.doge.tg/ |
| 區塊大小戰爭 | https://the-blocksize-war.doge.tg/#/ |
| 比特幣白皮書 | https://cypherpunks-core.github.io/books/BitcoinWhitePaper/ |
| 閃電網路白皮書 | https://cypherpunks-core.github.io/books/LightningNetworkWhitePaper/ |

### B. 參考網站

- [bitcoin.org](https://bitcoin.org)
- [Bitcoin Optech](https://bitcoinops.org)
- [Lightning Network](https://lightning.network)
- [Nostr Protocol](https://nostr.com)
- [BIPs Repository](https://github.com/bitcoin/bips)

### C. 設計參考

- [River Financial](https://river.com)
- [Swan Bitcoin](https://www.swanbitcoin.com)
- [Nakamoto Institute](https://nakamotoinstitute.org)
- [Bitcoin Magazine](https://bitcoinmagazine.com)

---

*此計劃由 dev21.org 團隊制定，歡迎社群貢獻與改進。*
