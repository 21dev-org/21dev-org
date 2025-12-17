# 貢獻指南

感謝你對 21dev.org 的興趣！我們歡迎各種形式的貢獻。

## 如何貢獻

### 1. 回報問題

如果你發現了錯誤或有改進建議，請在 GitHub 上開啟 Issue。

### 2. 提交內容

#### 新增文章或教學

1. Fork 倉庫
2. 在 `src/content/` 目錄下創建新的 Markdown 檔案
3. 遵循現有的格式和風格
4. 提交 Pull Request

#### 翻譯貢獻

1. 確認要翻譯的內容尚未被翻譯
2. 在 Issue 中聲明你要翻譯的內容
3. 提交翻譯後的 Pull Request

### 3. 程式碼貢獻

1. Fork 倉庫並創建功能分支
2. 確保程式碼符合專案風格
3. 添加必要的測試
4. 提交 Pull Request

## 程式碼風格

### Commit Message 格式

```
type(scope): description

範例：
- feat(learn): add UTXO model explanation
- fix(nav): correct mobile menu z-index
- docs(bips): translate BIP-0341
- style(cards): improve hover states
```

**類型 (type)**:
- `feat`: 新功能
- `fix`: 錯誤修正
- `docs`: 文檔更新
- `style`: 樣式調整
- `refactor`: 重構
- `perf`: 效能優化
- `test`: 測試相關
- `chore`: 維護任務

### 檔案命名

| 類型 | 命名規則 | 範例 |
|------|----------|------|
| 頁面 | `kebab-case.astro` | `what-is-bitcoin.astro` |
| 組件 | `PascalCase.astro` | `BookCard.astro` |
| 資料 | `camelCase.ts` | `navigation.ts` |
| 內容 | `kebab-case.md` | `bitcoin-meetup.md` |

## 內容指南

### 文章前置資料 (Frontmatter)

```yaml
---
title: "文章標題"
description: "簡短描述"
date: 2024-01-01
author: "作者名稱"
tags: ["比特幣", "教學"]
difficulty: "beginner" # beginner | intermediate | advanced
---
```

### 寫作風格

- 使用繁體中文
- 專業術語保留英文，首次出現時附上中文翻譯
- 段落簡潔，避免過長句子
- 適當使用程式碼區塊和圖表

## 本地開發

```bash
# 安裝依賴
npm install

# 啟動開發伺服器
npm run dev

# 建構生產版本
npm run build
```

## 行為準則

- 保持友善和尊重
- 接受建設性的批評
- 關注對社群最有利的事情

## 問題？

如有任何問題，歡迎在 GitHub 上開啟 Issue 或參與討論。

---

感謝你的貢獻！
