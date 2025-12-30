# 21dev.org 網站改進開發計劃

> 最後更新: 2025-12-30

## 概覽

本文件記錄網站改進項目的詳細開發計劃，按優先級分類並提供具體實作步驟。

---

## 第一階段：最高優先級 (Critical)

### 1.1 重複麵包屑程式碼重構

**問題**: 約 40 個 `.astro` 檔案包含重複的麵包屑 HTML 程式碼

**影響**: 維護困難，修改需要改動多處

**解決方案**: 建立 `Breadcrumb.astro` 元件

**實作步驟**:
1. 建立 `/src/components/Breadcrumb.astro`
2. 元件接受 `items: Array<{label: string, href?: string}>` 參數
3. 逐一替換所有頁面中的麵包屑程式碼
4. 驗證所有頁面導覽正常

**影響檔案**: 約 40 個 `.astro` 檔案

**預估複雜度**: 中等

---

### 1.2 BIP 資料一致性修復

**問題**: `/src/data/bips.ts` 使用硬編碼資料，部分 BIP 頁面直接在 Astro 檔案中定義資料

**影響**: 資料不同步，維護困難

**解決方案**: 統一使用 `/src/data/bips.ts` 作為唯一資料來源

**實作步驟**:
1. 審查所有 BIP 相關頁面
2. 擴展 `bips.ts` 包含所有需要的 BIP 資料
3. 修改頁面從 `bips.ts` 導入資料
4. 移除頁面中的硬編碼資料

**影響檔案**:
- `/src/data/bips.ts`
- `/src/pages/learn/bips/*.astro`

**預估複雜度**: 中等

---

### 1.3 影片頁面修復

**問題**: `/src/pages/videos/index.astro` 可能存在空資料或路由問題

**影響**: 使用者無法存取影片內容

**解決方案**: 檢查並修復影片頁面

**實作步驟**:
1. 檢查 `/src/content/videos/` 目錄內容
2. 驗證 Content Collection 設定
3. 修復頁面渲染邏輯
4. 添加空狀態處理

**影響檔案**:
- `/src/pages/videos/index.astro`
- `/src/content/config.ts`

**預估複雜度**: 低

---

### 1.4 OG 圖片格式優化

**問題**: OG 圖片可能使用 SVG 格式，社群媒體平台不支援

**影響**: 社群分享預覽圖無法顯示

**解決方案**: 提供 PNG/JPG 格式的 OG 圖片

**實作步驟**:
1. 檢查 `BaseLayout.astro` 中的 OG 圖片設定
2. 將 SVG 轉換為 PNG (1200x630)
3. 更新 meta 標籤引用

**影響檔案**:
- `/src/layouts/BaseLayout.astro`
- `/public/` 目錄中的圖片

**預估複雜度**: 低

---

## 第二階段：高優先級 (High)

### 2.1 Learn 頁面統一使用 ArticleLayout

**問題**: 部分 Learn 頁面未使用 `ArticleLayout`，缺少一致的導覽體驗

**影響**: 使用者體驗不一致

**解決方案**: 統一使用 ArticleLayout

**實作步驟**:
1. 列出所有 `/src/pages/learn/` 下的頁面
2. 檢查每個頁面的 Layout 使用情況
3. 將未使用 ArticleLayout 的頁面進行改造
4. 確保 breadcrumbs、prevPage、nextPage 設定正確

**影響檔案**: `/src/pages/learn/**/*.astro`

**預估複雜度**: 中等

---

### 2.2 重複 GitHub 圖示清理

**問題**: 同一圖示可能在多處重複定義

**影響**: 程式碼冗餘

**解決方案**: 集中管理圖示

**實作步驟**:
1. 檢查 `/src/components/icons/` 目錄
2. 確認 GitHub 圖示只定義一次
3. 移除重複定義
4. 更新所有引用

**影響檔案**: 圖示相關元件

**預估複雜度**: 低

---

### 2.3 缺失 BIP 頁面補充

**問題**: `bips.ts` 中定義的 BIP 可能缺少對應的詳細頁面

**影響**: 使用者無法深入了解特定 BIP

**解決方案**: 建立缺失的 BIP 頁面

**實作步驟**:
1. 比對 `bips.ts` 與 `/src/pages/learn/bips/` 目錄
2. 列出缺失的 BIP 頁面
3. 根據現有模板建立新頁面
4. 更新索引頁連結

**影響檔案**: `/src/pages/learn/bips/`

**預估複雜度**: 高 (內容創作)

---

## 第三階段：中等優先級 (Medium)

### 3.1 行動裝置目錄 (TOC) 顯示

**問題**: 目錄在行動裝置上隱藏

**影響**: 行動用戶難以導覽長文章

**解決方案**: 實作行動版 TOC

**實作步驟**:
1. 設計行動版 TOC UI (漢堡選單或浮動按鈕)
2. 修改 `ArticleLayout.astro`
3. 添加展開/收合動畫
4. 測試各種螢幕尺寸

**影響檔案**: `/src/layouts/ArticleLayout.astro`

**預估複雜度**: 中等

---

### 3.2 程式碼區塊複製按鈕

**問題**: 程式碼區塊沒有一鍵複製功能

**影響**: 使用者需要手動選取複製

**解決方案**: 添加複製按鈕

**實作步驟**:
1. 建立 `CodeBlock.astro` 元件或使用 JS 插件
2. 整合到 Astro 的程式碼高亮設定
3. 添加複製成功提示
4. 確保深色/淺色主題相容

**影響檔案**:
- `/src/components/CodeBlock.astro` (新建)
- `astro.config.mjs`

**預估複雜度**: 中等

---

### 3.3 搜尋功能

**問題**: 網站沒有搜尋功能

**影響**: 使用者難以快速找到內容

**解決方案**: 整合搜尋功能

**實作步驟**:
1. 評估方案: Pagefind (推薦) 或 Algolia
2. 安裝並設定搜尋插件
3. 建立搜尋 UI 元件
4. 整合到導覽列
5. 設定搜尋索引建立流程

**影響檔案**:
- `astro.config.mjs`
- `/src/components/Search.astro` (新建)
- `/src/components/Navigation.astro`

**預估複雜度**: 高

---

### 3.4 表格無障礙性

**問題**: 表格可能缺少 caption 或 aria-label

**影響**: 螢幕閱讀器使用者體驗不佳

**解決方案**: 添加無障礙屬性

**實作步驟**:
1. 搜尋所有 `<table>` 標籤
2. 為每個表格添加適當的 `<caption>` 或 `aria-label`
3. 確保表格標題使用 `<th>` 並設定 `scope`

**影響檔案**: 所有包含表格的頁面

**預估複雜度**: 低

---

## 第四階段：低優先級 (Low)

### 4.1 ESLint/Prettier 設定

**問題**: 缺少程式碼風格檢查工具

**影響**: 程式碼風格不一致

**解決方案**: 添加 ESLint 和 Prettier

**實作步驟**:
1. 安裝 eslint, prettier, eslint-plugin-astro
2. 建立 `.eslintrc.js` 和 `.prettierrc`
3. 添加 npm scripts
4. 設定 pre-commit hook (可選)
5. 修復現有程式碼風格問題

**新增檔案**:
- `.eslintrc.js`
- `.prettierrc`
- `.eslintignore`

**預估複雜度**: 中等

---

### 4.2 清理未使用的路徑別名

**問題**: `tsconfig.json` 中可能存在未使用的路徑別名

**影響**: 設定混亂

**解決方案**: 審查並清理

**實作步驟**:
1. 檢查 `tsconfig.json` 中的 `paths` 設定
2. 搜尋每個別名的使用情況
3. 移除未使用的別名

**影響檔案**: `tsconfig.json`

**預估複雜度**: 低

---

### 4.3 測試框架設定

**問題**: 沒有自動化測試

**影響**: 無法確保程式碼品質

**解決方案**: 添加測試框架

**實作步驟**:
1. 安裝 Vitest 或 Jest
2. 設定測試環境
3. 為關鍵元件撰寫單元測試
4. 設定 CI 執行測試

**新增檔案**:
- `vitest.config.ts`
- `/tests/` 目錄

**預估複雜度**: 高

---

## 進度追蹤

| 項目 | 優先級 | 狀態 | 完成日期 |
|------|--------|------|----------|
| 1.1 麵包屑重構 | Critical | 已完成 | 2025-12-30 |
| 1.2 BIP 資料一致性 | Critical | 已完成 | 2025-12-30 |
| 1.3 影片頁面修復 | Critical | 已完成 | 2025-12-30 |
| 1.4 OG 圖片優化 | Critical | 已完成 | 2025-12-30 |
| 2.1 Learn 頁面統一 | High | 已完成 | 2025-12-30 |
| 2.2 GitHub 圖示清理 | High | 已完成 | 2025-12-30 |
| 2.3 BIP 頁面補充 | High | 待開始 | - |
| 3.1 行動版 TOC | Medium | 待開始 | - |
| 3.2 程式碼複製按鈕 | Medium | 待開始 | - |
| 3.3 搜尋功能 | Medium | 待開始 | - |
| 3.4 表格無障礙性 | Medium | 待開始 | - |
| 4.1 ESLint/Prettier | Low | 待開始 | - |
| 4.2 路徑別名清理 | Low | 待開始 | - |
| 4.3 測試框架 | Low | 待開始 | - |

---

## 已完成的改進

- [x] Bitcoin Core 技術文檔擴展 (11 頁)
- [x] Lightning Network 技術文檔擴展 (11 頁)
- [x] Nostr 技術文檔擴展 (8 頁)
- [x] 移除所有原生 emoji
- [x] 移除所有破折號 (——)
- [x] Learn 頁面統一使用 ArticleLayout (27 頁)
- [x] 社交圖示元件化 (GitHub, Twitter, Signal)

---

## 備註

- 優先處理 Critical 項目，確保網站基本功能正常
- High 和 Medium 項目可根據實際情況調整順序
- Low 項目可在空閒時進行
- 每完成一個項目後更新進度追蹤表
