# 21dev.org 網站優化計劃

## 執行摘要

本文檔為 21dev.org（基於 Astro、Tailwind CSS、TypeScript 構建的比特幣技術教育平台）制定全面的優化策略。網站包含 458+ 頁面，涵蓋 Bitcoin Core、Lightning Network、Nostr 和 BIPs。本計劃按影響力和工作量優先排序。

---

## 1. 程式碼品質與架構

### 1.1 重複程式碼模式

#### 問題：重複的 `difficultyLabels` 和 `difficultyVariants`
- **位置**：`ArticleLayout.astro`、`BookLayout.astro`、`BookCard.astro`
- **影響**：中等 | **工作量**：低

**解決方案**：
建立共用常數檔案 `/src/data/constants.ts`：
```typescript
export const difficultyLabels = {
  beginner: '入門',
  intermediate: '進階',
  advanced: '高級',
} as const;

export const difficultyVariants = {
  beginner: 'success',
  intermediate: 'bitcoin',
  advanced: 'warning',
} as const;

export type Difficulty = keyof typeof difficultyLabels;
```

#### 問題：內聯 CSS 變數模式過多
- `text-[var(--text-primary)]` 使用 2,553+ 次
- `border-[var(--border-default)]` 使用 4,562+ 次
- **影響**：高 | **工作量**：中等

**解決方案**：
在 `tailwind.config.mjs` 添加語義化類別：
```javascript
theme: {
  extend: {
    textColor: {
      'primary': 'var(--text-primary)',
      'secondary': 'var(--text-secondary)',
      'tertiary': 'var(--text-tertiary)',
    },
    borderColor: {
      'default': 'var(--border-default)',
      'strong': 'var(--border-strong)',
    },
    backgroundColor: {
      'surface': 'var(--surface-elevated)',
    }
  }
}
```
然後將 `text-[var(--text-primary)]` 重構為 `text-primary`

---

### 1.2 組件可重用性改進

#### 問題：重複的標題樣式模式
- `class="text-2xl font-bold text-[var(--text-primary)] mt-8 mb-4"` 出現 2,553+ 次
- **影響**：高 | **工作量**：中等

**解決方案**：
建立語義化標題組件 `/src/components/ui/Heading.astro`：
```astro
---
interface Props {
  level: 1 | 2 | 3 | 4;
  class?: string;
}
const { level, class: className = '' } = Astro.props;
const Tag = `h${level}` as 'h1' | 'h2' | 'h3' | 'h4';
const styles = {
  1: 'text-4xl md:text-5xl font-bold text-primary mb-6',
  2: 'text-2xl font-bold text-primary mt-12 mb-4',
  3: 'text-xl font-semibold text-primary mt-8 mb-3',
  4: 'text-lg font-semibold text-primary mt-6 mb-2',
};
---
<Tag class:list={[styles[level], className]}><slot /></Tag>
```

#### 問題：重複的提示框模式
- 類似的 alert/callout 模式散布在多個頁面
- **影響**：中等 | **工作量**：低

**解決方案**：
建立 `/src/components/ui/Callout.astro`：
```astro
---
interface Props {
  type: 'info' | 'warning' | 'success' | 'tip';
  title?: string;
}
const { type, title } = Astro.props;
const styles = {
  info: 'bg-blue-500/10 border-blue-500/30 text-blue-700 dark:text-blue-400',
  warning: 'bg-yellow-500/10 border-yellow-500/30 text-yellow-700 dark:text-yellow-400',
  success: 'bg-green-500/10 border-green-500/30 text-green-700 dark:text-green-400',
  tip: 'bg-purple-500/10 border-purple-500/30 text-purple-700 dark:text-purple-400',
};
---
<div class:list={['not-prose p-4 rounded-lg border', styles[type]]}>
  {title && <strong class="block mb-1">{title}</strong>}
  <p class="text-sm"><slot /></p>
</div>
```

---

### 1.3 TypeScript 類型安全增強

**解決方案**：
建立共用類型檔案 `/src/types/index.ts`：
```typescript
export type Difficulty = 'beginner' | 'intermediate' | 'advanced';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface PageMeta {
  title: string;
  description: string;
  ogImage?: string;
}

export interface NavigationLink {
  title: string;
  href: string;
}
```

---

## 2. 效能優化

### 2.1 建置效能

#### 問題：OG 圖片生成
- 每次建置都為 400+ 頁面生成圖片
- **影響**：高 | **工作量**：中等

**解決方案**：
實作增量生成與檔案雜湊快取：
```javascript
// scripts/generate-og-images.mjs
import crypto from 'crypto';
import { existsSync, readFileSync, writeFileSync } from 'fs';

// 檢查內容是否變更再重新生成
const contentHash = crypto.createHash('md5').update(title).digest('hex');
const cacheFile = `${outputPath}.hash`;
if (existsSync(cacheFile) && readFileSync(cacheFile, 'utf-8') === contentHash) {
  skipped++;
  continue;
}
// 生成後儲存雜湊
writeFileSync(cacheFile, contentHash);
```

### 2.2 執行時效能

#### 問題：外部字體載入
- Google Fonts 從 CDN 載入會阻塞渲染
- **影響**：高 | **工作量**：中等

**解決方案**：
自託管字體：
1. 下載 Noto Sans SC 和 JetBrains Mono
2. 放置於 `/public/fonts/`
3. 更新 CSS：
```css
@font-face {
  font-family: 'Noto Sans SC';
  font-display: swap;
  src: url('/fonts/NotoSansSC-Regular.woff2') format('woff2');
  font-weight: 400;
}
```

### 2.3 資產優化

**解決方案**：
1. 使用 Astro Image 整合優化圖片
2. 添加 SVGO 優化 SVG 組件

---

## 3. SEO 與無障礙

### 3.1 結構化資料增強

**現狀**：已有 FAQ、Breadcrumb、TechArticle、Book、WebPage schemas

**增強**：
為學習路徑添加 `Course` schema：
```typescript
export function generateCourseSchema(course: {
  name: string;
  description: string;
  modules: string[];
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: course.name,
    description: course.description,
    provider: {
      '@type': 'Organization',
      name: '21dev.org',
    },
    inLanguage: 'zh-Hant',
  };
}
```

### 3.2 無障礙改進

- 為純圖示按鈕添加 `aria-label`
- 為可摺疊區塊添加 `aria-expanded`
- 確保所有互動元素有適當的焦點樣式

### 3.3 行動裝置體驗

**解決方案**：
優化程式碼區塊在小螢幕的顯示：
```css
@media (max-width: 640px) {
  pre {
    font-size: 0.75rem;
    padding: 0.75rem;
  }
}
```

---

## 4. 內容與功能

### 4.1 內容差距

#### 問題：NIP 頁面缺乏集中資料管理
- BIP 已使用 `bips.ts`，但 NIP 頁面仍是硬編碼
- **影響**：中等 | **工作量**：中等

**解決方案**：
建立 `/src/data/nips.ts`（參考 `bips.ts` 模式）：
```typescript
export interface NIP {
  number: number;
  title: string;
  titleZh: string;
  status: 'Draft' | 'Final' | 'Deprecated';
  summary: string;
}

export const nips: NIP[] = [
  { number: 1, title: 'Basic protocol flow description', titleZh: '基礎協議流程', ... },
  // ...
];
```

然後建立 `NipLayout.astro`（類似 `BipLayout.astro`）

### 4.2 搜尋功能改進

**現狀**：Pagefind 搜尋已實作良好

**增強**：
1. 添加搜尋結果分類（按章節分組）
2. 使用 localStorage 儲存最近搜尋
3. 追蹤熱門搜尋

### 4.3 閱讀進度功能

**增強**：
1. 在索引頁面顯示視覺化進度指示器
2. 在首頁添加「繼續閱讀」區塊
3. 添加完成徽章/成就系統

---

## 5. 開發者體驗

### 5.1 測試覆蓋率

**現狀**：僅 3 個測試檔案

**優先級 1：添加組件測試**
```typescript
// tests/components/Breadcrumb.test.ts
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/dom';

describe('Breadcrumb', () => {
  it('renders correct number of items', () => {
    // 測試實作
  });
});
```

**優先級 2：添加整合測試**
- 測試頁面渲染
- 測試導航流程
- 測試搜尋功能

**優先級 3：添加無障礙測試**
```typescript
import { axe, toHaveNoViolations } from 'jest-axe';
expect.extend(toHaveNoViolations);
```

### 5.2 文件

**建立 `/CONTRIBUTING.md`**：
- 程式碼風格指南
- 組件模式
- 內容指南
- 翻譯指南

### 5.3 CI/CD 改進

**現狀**：基本 GitHub Actions 部署

**增強**：
```yaml
# .github/workflows/deploy.yml
- name: Lint
  run: npm run lint

- name: Test
  run: npm run test

- name: Type Check
  run: npx astro check

- name: Lighthouse CI
  uses: treosh/lighthouse-ci-action@v10
  with:
    urls: |
      https://21dev.org/
      https://21dev.org/learn/
```

---

## 6. 技術債務

### 6.1 依賴更新

1. 添加 `dependabot.yml` 自動更新依賴
2. 在 `package.json` 鎖定主要版本

### 6.2 設定改進

**ESLint Astro 設定**：
```javascript
// eslint.config.js
import astroParser from 'astro-eslint-parser';
export default [
  {
    files: ['**/*.astro'],
    languageOptions: { parser: astroParser },
  },
];
```

### 6.3 程式碼組織

建立 `/src/utils/index.ts` barrel export：
```typescript
export * from './schema';
export * from './learning-progress';
export * from './format';
```

---

## 實作優先級矩陣

| 優先級 | 任務 | 影響 | 工作量 | Sprint |
|--------|------|------|--------|--------|
| P0 | 提取 difficultyLabels 到共用常數 | 中 | 低 | 1 |
| P0 | 添加 Tailwind 語義化顏色類別 | 高 | 中 | 1 |
| P0 | 自託管字體 | 高 | 中 | 1 |
| P1 | 建立 Heading 組件 | 高 | 中 | 2 |
| P1 | 建立 Callout 組件 | 中 | 低 | 2 |
| P1 | 添加 CI lint/test 步驟 | 中 | 低 | 2 |
| P1 | 建立 NIP 資料檔案 | 中 | 中 | 2 |
| P2 | 改進 OG 圖片快取 | 高 | 中 | 3 |
| P2 | 添加組件測試 | 中 | 高 | 3 |
| P2 | 添加 Course schema | 中 | 低 | 3 |
| P3 | 添加搜尋結果分組 | 低 | 中 | 4 |
| P3 | 添加 Lighthouse CI | 中 | 中 | 4 |
| P3 | 建立 CONTRIBUTING.md | 低 | 低 | 4 |

---

## 預估時間軸

- **Sprint 1**：基礎 - 常數、Tailwind 設定、字體託管
- **Sprint 2**：組件 - Heading、Callout、CI 改進
- **Sprint 3**：效能 - OG 快取、測試基礎設施
- **Sprint 4**：完善 - 搜尋、文件、監控

---

## 追蹤指標

1. **建置效能**：建置時間 < 2 分鐘
2. **Lighthouse 分數**：所有類別 > 90
3. **測試覆蓋率**：工具函數 > 70%，組件 > 50%
4. **Core Web Vitals**：LCP < 2.5s, FID < 100ms, CLS < 0.1

---

## 關鍵實作檔案

| 檔案 | 用途 |
|------|------|
| `src/layouts/ArticleLayout.astro` | 主要佈局，需提取 difficultyLabels |
| `tailwind.config.mjs` | 添加語義化顏色類別 |
| `src/data/bips.ts` | NIP 資料整合的參考模式 |
| `.github/workflows/deploy.yml` | CI/CD 增強 |
| `src/styles/global.css` | 全域樣式和 CSS 變數 |
