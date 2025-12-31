/**
 * JSON-LD Schema 工具函數
 * 用於生成結構化數據，優化 SEO 和 AI 搜尋引擎
 */

import { siteConfig } from '@/data/site';

// ============================================
// 類型定義
// ============================================

export interface FAQItem {
  question: string;
  answer: string;
}

export interface BreadcrumbItem {
  name: string;
  url?: string;
}

export interface TechArticleData {
  title: string;
  description: string;
  url: string;
  datePublished?: string;
  dateModified?: string;
  author?: string;
  keywords?: string[];
  proficiencyLevel?: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
}

export interface WebPageData {
  title: string;
  description: string;
  url: string;
  dateModified?: string;
}

// ============================================
// Schema 生成函數
// ============================================

/**
 * 生成 FAQPage schema
 * 用於常見問題頁面，提高在搜尋結果中顯示 FAQ 的機會
 */
export function generateFAQSchema(items: FAQItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}

/**
 * 生成 BreadcrumbList schema
 * 用於麵包屑導航，幫助搜尋引擎理解網站結構
 */
export function generateBreadcrumbSchema(items: BreadcrumbItem[]) {
  const baseUrl = siteConfig.url;

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      ...(item.url && { item: `${baseUrl}${item.url}` }),
    })),
  };
}

/**
 * 生成 TechArticle schema
 * 用於技術文章，包含 BIP 文檔和教程
 */
export function generateTechArticleSchema(article: TechArticleData) {
  const baseUrl = siteConfig.url;

  return {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: article.title,
    description: article.description,
    url: `${baseUrl}${article.url}`,
    inLanguage: 'zh-Hant',
    ...(article.proficiencyLevel && { proficiencyLevel: article.proficiencyLevel }),
    ...(article.keywords && { keywords: article.keywords.join(', ') }),
    ...(article.datePublished && { datePublished: article.datePublished }),
    ...(article.dateModified && { dateModified: article.dateModified }),
    ...(article.author && {
      author: {
        '@type': 'Person',
        name: article.author,
      },
    }),
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
      url: baseUrl,
    },
  };
}

/**
 * 生成 WebPage schema
 * 用於一般頁面
 */
export function generateWebPageSchema(page: WebPageData) {
  const baseUrl = siteConfig.url;

  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: page.title,
    description: page.description,
    url: `${baseUrl}${page.url}`,
    inLanguage: 'zh-Hant',
    ...(page.dateModified && { dateModified: page.dateModified }),
    isPartOf: {
      '@type': 'WebSite',
      name: siteConfig.name,
      url: baseUrl,
    },
  };
}

/**
 * 生成 HowTo schema
 * 用於教程和指南類內容
 */
export function generateHowToSchema(
  name: string,
  description: string,
  steps: { name: string; text: string }[]
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name,
    description,
    step: steps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step.name,
      text: step.text,
    })),
  };
}

/**
 * 生成 Book schema
 * 用於書籍頁面
 */
export function generateBookSchema(book: {
  name: string;
  author: string;
  description: string;
  url: string;
  image?: string;
  isbn?: string;
}) {
  const baseUrl = siteConfig.url;

  return {
    '@context': 'https://schema.org',
    '@type': 'Book',
    name: book.name,
    author: {
      '@type': 'Person',
      name: book.author,
    },
    description: book.description,
    url: `${baseUrl}${book.url}`,
    inLanguage: 'zh-Hant',
    ...(book.image && { image: book.image }),
    ...(book.isbn && { isbn: book.isbn }),
  };
}

/**
 * 生成 EducationalOrganization schema
 * 用於網站整體的教育機構標識
 */
export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    sameAs: [siteConfig.social.github, siteConfig.social.twitter],
    knowsAbout: [
      'Bitcoin',
      'Lightning Network',
      'Nostr Protocol',
      'Cryptocurrency',
      'Blockchain Technology',
    ],
  };
}
