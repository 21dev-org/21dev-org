# 貢獻指南

感謝你對 21dev.org 的興趣！本文件提供貢獻程式碼和內容的完整指南。

## 目錄

- [開發環境設置](#開發環境設置)
- [專案結構](#專案結構)
- [程式碼風格](#程式碼風格)
- [組件模式](#組件模式)
- [內容指南](#內容指南)
- [測試](#測試)
- [提交規範](#提交規範)
- [Pull Request 流程](#pull-request-流程)

## 開發環境設置

### 前置需求

- Node.js 20+
- npm

### 安裝步驟

```bash
# 複製專案
git clone https://github.com/21dev-org/21dev-org.git
cd 21dev-org

# 安裝依賴
npm install

# 啟動開發伺服器
npm run dev
```

### 可用指令

| 指令 | 說明 |
|------|------|
| `npm run dev` | 啟動開發伺服器 |
| `npm run build` | 建置生產版本（含類型檢查） |
| `npm run preview` | 預覽建置結果 |
| `npm run test` | 執行測試 |
| `npm run test:watch` | 監控模式執行測試 |
| `npm run lint` | 執行 ESLint |
| `npm run lint:fix` | 自動修復 lint 問題 |
| `npm run format` | 格式化程式碼 |
| `npm run format:check` | 檢查格式 |

## 專案結構

```
src/
├── components/         # 可重用組件
│   ├── blocks/         # 頁面區塊組件
│   ├── layout/         # 佈局組件（Header, Footer）
│   ├── svg/            # SVG 圖標組件
│   └── ui/             # UI 基礎組件
│       ├── Breadcrumb.astro
│       ├── Button.astro
│       ├── Callout.astro   # 提示框
│       ├── Heading.astro   # 標題
│       ├── Search.astro    # 搜尋
│       └── Tag.astro
├── data/               # 資料檔案
│   ├── bips.ts         # BIP 元數據
│   ├── nips.ts         # NIP 元數據
│   ├── books.ts        # 書籍資料
│   ├── constants.ts    # 共用常數
│   └── site.ts         # 網站設定
├── layouts/            # 頁面佈局
│   ├── ArticleLayout.astro   # 文章佈局
│   ├── BipLayout.astro       # BIP 頁面佈局
│   ├── NipLayout.astro       # NIP 頁面佈局
│   ├── BookLayout.astro      # 書籍佈局
│   └── PageLayout.astro      # 基礎頁面佈局
├── pages/              # 頁面檔案
├── styles/             # 全域樣式
│   └── global.css      # CSS 變數和基礎樣式
└── utils/              # 工具函數
    ├── schema.ts       # JSON-LD Schema 生成
    └── learning-progress.ts
tests/                  # 測試檔案
├── bips.test.ts
├── nips.test.ts
├── constants.test.ts
├── schema.test.ts
└── ...
```

## 程式碼風格

### TypeScript

- 使用 TypeScript 進行類型檢查
- 優先使用 `interface` 而非 `type`
- 為 props 定義明確的介面
- 使用 `@/` 路徑別名

```typescript
import { difficultyLabels } from '@/data/constants';
import type { Book } from '@/data/books';

interface Props {
  title: string;
  description?: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}
```

### Astro 組件

- 使用語義化的 HTML 標籤
- 優先使用 CSS 類別而非內聯樣式
- 使用 `class:list` 進行條件類別

```astro
---
interface Props {
  variant?: 'primary' | 'secondary';
  class?: string;
}

const { variant = 'primary', class: className } = Astro.props;
---

<div
  class:list={[
    'base-class',
    variant === 'primary' && 'primary-variant',
    className,
  ]}
>
  <slot />
</div>
```

### Tailwind CSS

使用專案定義的語義化類別（定義於 `tailwind.config.mjs`）：

| 語義類別 | CSS 變數 | 說明 |
|----------|----------|------|
| `text-primary` | `--text-primary` | 主要文字顏色 |
| `text-secondary` | `--text-secondary` | 次要文字顏色 |
| `text-tertiary` | `--text-tertiary` | 第三級文字顏色 |
| `border-default` | `--border-default` | 預設邊框顏色 |
| `bg-surface` | `--surface-elevated` | 浮起表面背景 |
| `bg-secondary` | `--bg-secondary` | 次要背景 |

## 組件模式

### Heading 組件

統一的標題樣式：

```astro
---
import Heading from '@/components/ui/Heading.astro';
---

<Heading level={1}>頁面主標題</Heading>
<Heading level={2}>章節標題</Heading>
<Heading level={3} id="subsection">子章節標題</Heading>
```

### Callout 組件

提示框組件，支援 5 種類型：

```astro
---
import Callout from '@/components/ui/Callout.astro';
---

<Callout type="info" title="資訊">
  這是一個資訊提示框。
</Callout>

<Callout type="warning" title="警告">
  這是一個警告訊息。
</Callout>

<Callout type="success">
  操作成功！
</Callout>

<Callout type="danger" title="危險">
  請注意安全風險。
</Callout>

<Callout type="tip">
  這是一個實用技巧。
</Callout>
```

### BipLayout

BIP 頁面使用統一的佈局，從 `bips.ts` 讀取元數據：

```astro
---
import BipLayout from '@/layouts/BipLayout.astro';
---

<BipLayout number={340} prevBip={341} nextBip={342}>
  <h2>摘要</h2>
  <p>BIP 內容...</p>
</BipLayout>
```

新增 BIP 時，需要：
1. 在 `src/data/bips.ts` 添加 BIP 元數據
2. 建立頁面檔案 `src/pages/bips/bip-XXXX.astro`

### NipLayout

NIP 頁面使用類似的模式：

```astro
---
import NipLayout from '@/layouts/NipLayout.astro';
---

<NipLayout number={1} nextNip={2}>
  <!-- NIP 內容 -->
</NipLayout>
```

## 內容指南

### 語言規範

- 使用繁體中文（台灣正體）
- 專有名詞保持英文：Bitcoin、Lightning Network、Nostr、BIP、NIP
- 中英文之間加空格：`這是 Bitcoin 的介紹`
- 數字與中文之間加空格：`共有 21 百萬枚`

### 難度標記

| 難度 | 常數值 | 適用內容 |
|------|--------|----------|
| 入門 | `beginner` | 新手入門、基礎概念 |
| 進階 | `intermediate` | 進階知識、實作教學 |
| 高級 | `advanced` | 協議細節、底層技術 |

使用方式：

```astro
<ArticleLayout
  title="UTXO 模型詳解"
  difficulty="intermediate"
  ...
>
```

### 文章結構

1. 開頭提供簡短摘要（1-2 段）
2. 使用 `Heading` 組件進行標題層級
3. 適時使用 `Callout` 提示重要資訊
4. 程式碼區塊標註語言
5. 相關內容使用內部連結

## 測試

### 執行測試

```bash
# 執行所有測試
npm run test

# 監控模式
npm run test:watch
```

### 測試結構

- `tests/bips.test.ts` - BIP 資料驗證
- `tests/nips.test.ts` - NIP 資料驗證
- `tests/constants.test.ts` - 常數驗證
- `tests/schema.test.ts` - JSON-LD Schema 驗證

### 新增測試

為新的資料檔案或工具函數添加測試：

```typescript
import { describe, it, expect } from 'vitest';
import { myFunction } from '../src/utils/myUtil';

describe('myFunction', () => {
  it('should work correctly', () => {
    expect(myFunction('input')).toBe('expected');
  });
});
```

## 提交規範

使用 [Conventional Commits](https://www.conventionalcommits.org/) 格式：

```
<type>(<scope>): <subject>

<body>
```

### 類型

| 類型 | 說明 |
|------|------|
| `feat` | 新功能 |
| `fix` | 錯誤修復 |
| `docs` | 文件更新 |
| `style` | 格式調整（不影響邏輯） |
| `refactor` | 重構 |
| `perf` | 效能優化 |
| `test` | 測試相關 |
| `chore` | 建置或工具變更 |

### 範例

```
feat(bip): add BIP-340 Schnorr signature page

- Add detailed explanation of Schnorr signatures
- Include code examples for verification
- Add related BIP links
```

```
fix(search): correct category grouping logic

Results are now properly grouped by URL path category.
```

## Pull Request 流程

### 1. 開發前準備

```bash
# 建立功能分支
git checkout -b feat/my-feature

# 或修復分支
git checkout -b fix/bug-description
```

### 2. 開發並測試

```bash
# 開發中持續測試
npm run test:watch

# 完成後執行完整檢查
npm run lint
npm run format:check
npm run test
npm run build
```

### 3. 提交變更

```bash
git add .
git commit -m "feat(scope): description"
```

### 4. 推送並建立 PR

```bash
git push origin feat/my-feature
```

### PR 檢查清單

- [ ] 程式碼符合專案風格
- [ ] 通過所有測試
- [ ] 通過 lint 和 format 檢查
- [ ] 建置成功
- [ ] 更新相關文件（如需要）
- [ ] 提交訊息符合規範

## 問題回報

如發現問題，請透過 [GitHub Issues](https://github.com/21dev-org/21dev-org/issues) 回報：

1. 搜尋是否已有相同問題
2. 提供重現步驟
3. 附上相關截圖或錯誤訊息
4. 說明預期行為與實際行為

## 行為準則

- 保持友善和尊重
- 接受建設性的批評
- 關注對社群最有利的事情

---

感謝你的貢獻！如有任何問題，歡迎開 Issue 討論。
