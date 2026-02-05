import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { siteConfig } from '@/data/site';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const articles = await getCollection('articles');

  const sortedArticles = articles.sort(
    (a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime()
  );

  return rss({
    title: siteConfig.title,
    description: siteConfig.description,
    site: context.site?.toString() || siteConfig.url,
    items: sortedArticles.map((article) => ({
      title: article.data.title,
      pubDate: article.data.date,
      description: article.data.description,
      link: `/blog/${article.slug}/`,
      categories: article.data.tags,
      author: article.data.author,
    })),
    customData: `<language>zh-Hant</language>`,
  });
}
