# 21dev.org 開發計劃

> 生成日期: 2026-02-05
> 最後更新: 2026-02-05
> 目標: 完善網站功能、修復技術債、提升使用者體驗

---

## 現況總覽

| 類別 | 技術 |
|------|------|
| 框架 | Astro 4.16.18 (Static Site Generator) |
| 樣式 | Tailwind CSS 3.4.15 |
| 語言 | TypeScript 5.7.2 |
| 搜尋 | Pagefind 1.4.0 |
| 部署 | GitHub Pages |
| 總頁面數 | ~601 |

---

## 第一波：立即修復 (P0)

### 1.1 修正 SearchAction URL ✅ 已完成
- **問題**: `BaseLayout.astro` 的 JSON-LD SearchAction 指向 `/search?q={search_term_string}`，但該頁面不存在
- **方案**: 建立 `/search` 頁面，整合 Pagefind 搜尋功能
- **檔案**: `src/pages/search.astro`
- **狀態**: ✅ 已完成
- **完成內容**:
  - 建立全頁搜尋頁面，支援 URL query parameter (`/search?q=taproot`)
  - 整合 Pagefind 全文搜尋引擎
  - 分類顯示搜尋結果（BIP、技術文檔、學習資源等）
  - URL 同步更新（搜尋時自動更新瀏覽器網址列）
  - 無結果時顯示熱門頁面連結

### 1.2 為所有頁面實作 dateModified
- **問題**: SEO-ROADMAP Phase 3.1 標記為「待後續完成」，缺少內容新鮮度信號
- **方案**: 利用 git log 取得檔案最後修改日期，注入到 schema 和 meta tags
- **檔案**: `src/layouts/BaseLayout.astro`, `src/utils/schema.ts`
- **狀態**: ⬜ 待開發

### 1.3 建立 Blog/文章系統 ✅ 已完成
- **問題**: `articlesCollection` schema 已定義但 `src/content/articles/` 為空
- **方案**: 建立文章列表頁面和動態路由
- **狀態**: ✅ 已完成
- **完成內容**:
  - `src/pages/blog/index.astro` - 文章列表頁（按年份分組、難度標籤、RSS 連結）
  - `src/pages/blog/[...slug].astro` - 文章內容頁（前後導航、ArticleLayout）
  - 3 篇範例文章：
    - `what-is-taproot.md` - Taproot 升級指南
    - `bitcoin-node-2026.md` - 全節點架設指南
    - `lightning-network-basics.md` - 閃電網路入門
  - 整合至導航列和 Footer
  - 加入 sitemap 分類（`sitemap-blog.xml`）

---

## 第二波：短期功能 (P1)

### 2.1 線上工具拆分為獨立路由
- **問題**: 7 個工具全部在 `/tools/index.astro` (~28,000 tokens)，不利 SEO 和效能
- **方案**: 每個工具獨立頁面 `/tools/unit-converter` 等
- **狀態**: ⬜ 待開發

### 2.2 加入 RSS Feed ✅ 已完成
- **問題**: 無法讓讀者訂閱新內容
- **狀態**: ✅ 已完成
- **完成內容**:
  - 安裝 `@astrojs/rss` 套件
  - `src/pages/rss.xml.ts` - RSS 2.0 feed endpoint
  - 自動包含所有文章（標題、描述、日期、分類、作者）
  - `BaseLayout.astro` 加入 RSS auto-discovery `<link>` 標籤
  - Blog 列表頁和 Footer 加入 RSS 訂閱連結

### 2.3 加入評論系統 ✅ 已完成
- **問題**: 缺少讀者互動機制
- **狀態**: ✅ 已完成
- **完成內容**:
  - `src/components/ui/Comments.astro` - Giscus 評論元件
  - 自動同步網站 dark/light 主題
  - 整合至 `ArticleLayout.astro`（所有文章頁面自動顯示）
  - 使用 `pathname` 映射策略
  - 注意：需在 GitHub repo 上啟用 Discussions 並安裝 Giscus app，填入 `data-repo-id` 和 `data-category-id`

### 2.4 建立「最近更新」頁面
- **問題**: 讀者無法知道哪些頁面是新增或更新的
- **方案**: 建立 `/updates` 頁面，依日期列出更新
- **狀態**: ⬜ 待開發

### 2.5 補充活動和影片內容
- **問題**: 活動僅 2 筆、影片僅 3 筆，內容稀少
- **方案**: 持續新增社群活動和教育影片
- **狀態**: ⬜ 待開發

---

## 第三波：中期優化 (P2)

### 3.1 升級 Astro 5.x + Tailwind 4.x
- **說明**: 利用 Content Layer API、Server Islands 等新功能
- **狀態**: ⬜ 待開發

### 3.2 完善 PWA 體驗
- **問題**: `manifest.json` 的 `screenshots` 為空、缺少 maskable 專用圖示
- **狀態**: ⬜ 待開發

### 3.3 增加測試覆蓋率
- **問題**: 僅 6 個單元測試，缺少 component 測試和 e2e 測試
- **方案**: 加入 Playwright e2e 測試
- **狀態**: ⬜ 待開發

### 3.4 Lighthouse CI 整合
- **問題**: `lighthouserc.json` 存在但未在 CI 中執行
- **方案**: 加入 GitHub Actions workflow
- **狀態**: ⬜ 待開發

### 3.5 自動 Link Checker
- **問題**: 601 頁面的內部連結沒有自動檢查壞鏈機制
- **方案**: 在 CI 中加入 link checker
- **狀態**: ⬜ 待開發

### 3.6 Service Worker 快取策略優化
- **問題**: 所有 GET 請求都用 network-first，缺少按資源類型分策略
- **方案**: HTML 用 network-first，靜態資源用 cache-first
- **狀態**: ⬜ 待開發

### 3.7 JSON-LD Schema 驗證自動化
- **問題**: 沒有 CI 自動驗證 structured data 正確性
- **方案**: 在測試中加入 schema 格式驗證
- **狀態**: ⬜ 待開發

---

## 第四波：長期規劃 (P3)

### 4.1 學習儀表板
- **說明**: 視覺化學習進度、完成標記、推薦下一步
- **狀態**: ⬜ 待開發

### 4.2 英文版 i18n
- **說明**: 使用 Astro i18n 路由建立 `/en/` 路徑
- **狀態**: ⬜ 待開發

### 4.3 Newsletter 訂閱
- **說明**: 郵件訂閱系統，主動通知讀者新內容
- **狀態**: ⬜ 待開發

### 4.4 書籤/收藏功能
- **說明**: 讀者可標記想稍後閱讀的文章
- **狀態**: ⬜ 待開發

### 4.5 CSP 安全 Headers
- **說明**: 設定 Content Security Policy
- **狀態**: ⬜ 待開發

---

## 已完成的修改檔案清單

| 檔案 | 修改內容 |
|------|----------|
| `src/pages/search.astro` | ✅ 新建 - 全頁搜尋頁面 |
| `src/pages/blog/index.astro` | ✅ 新建 - 文章列表頁 |
| `src/pages/blog/[...slug].astro` | ✅ 新建 - 文章動態路由 |
| `src/pages/rss.xml.ts` | ✅ 新建 - RSS Feed endpoint |
| `src/content/articles/*.md` | ✅ 新建 - 3 篇範例文章 |
| `src/components/ui/Comments.astro` | ✅ 新建 - Giscus 評論元件 |
| `src/layouts/ArticleLayout.astro` | ✅ 修改 - 整合評論元件 |
| `src/layouts/BaseLayout.astro` | ✅ 修改 - 加入 RSS auto-discovery |
| `src/data/navigation.ts` | ✅ 修改 - 加入文章連結至導航和 Footer |
| `src/components/layout/Footer.astro` | ✅ 修改 - 加入 RSS 訂閱連結 |
| `astro.config.mjs` | ✅ 修改 - Blog 頁面 sitemap 優先級 |
| `scripts/generate-sitemaps.mjs` | ✅ 修改 - 新增 blog sitemap 分類 |
| `package.json` | ✅ 修改 - 新增 @astrojs/rss 依賴 |

---

## 進度追蹤

- [ ] 第一波完成 (剩餘: 1.2 dateModified)
- [ ] 第二波完成 (剩餘: 2.1 工具拆分, 2.4 最近更新, 2.5 內容補充)
- [ ] 第三波完成
- [ ] 第四波完成
