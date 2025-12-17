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
