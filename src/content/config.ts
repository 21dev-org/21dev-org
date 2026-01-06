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

// 術語詞典
const glossaryCollection = defineCollection({
  type: 'content',
  schema: z.object({
    term: z.string(), // 中文術語
    termEn: z.string(), // 英文術語
    short: z.string(), // 簡短描述（用於列表預覽）
    aliases: z.array(z.string()).optional(), // 別名/縮寫
    category: z.enum([
      'basic', // 基礎概念
      'protocol', // 協議相關
      'cryptography', // 密碼學
      'transaction', // 交易相關
      'mining', // 挖礦相關
      'wallet', // 錢包相關
      'lightning', // 閃電網路
      'security', // 安全相關
      'development', // 開發相關
    ]),
    difficulty: z.enum(['beginner', 'intermediate', 'advanced']).default('beginner'),
    relatedTerms: z.array(z.string()).optional(), // 相關術語 slug
    seeAlso: z.array(z.string()).optional(), // 延伸閱讀連結
  }),
});

// FAQ 常見問題
const faqCollection = defineCollection({
  type: 'content',
  schema: z.object({
    question: z.string(),
    short: z.string().optional(), // 簡短答案摘要
    category: z.enum([
      'getting-started', // 入門問題
      'wallet', // 錢包問題
      'transaction', // 交易問題
      'security', // 安全問題
      'technical', // 技術問題
      'lightning', // 閃電網路
    ]),
    order: z.number().optional(), // 排序權重
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
  glossary: glossaryCollection,
  faq: faqCollection,
};
