/**
 * 生成分類 Sitemap
 * 將單一 sitemap 拆分為多個類別 sitemap，提升搜尋引擎爬取效率
 *
 * 執行: node scripts/generate-sitemaps.mjs
 * 需在 npm run build 後執行
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST_DIR = path.join(__dirname, '../dist');
const SITE_URL = 'https://21dev.org';

// Sitemap 類別配置
const sitemapCategories = {
  'sitemap-learn': {
    name: '學習資源',
    pattern: '/learn/',
    priority: 0.9,
    changefreq: 'weekly',
  },
  'sitemap-bips': {
    name: 'BIP 文檔',
    pattern: '/bips/',
    priority: 0.8,
    changefreq: 'monthly',
  },
  'sitemap-tech': {
    name: '技術文檔',
    pattern: '/tech/',
    priority: 0.8,
    changefreq: 'weekly',
  },
  'sitemap-glossary': {
    name: '術語詞典',
    pattern: '/glossary/',
    priority: 0.7,
    changefreq: 'monthly',
  },
  'sitemap-notable-figures': {
    name: '重要人物',
    pattern: '/notable-figures/',
    priority: 0.6,
    changefreq: 'monthly',
  },
  'sitemap-books': {
    name: '書籍資源',
    pattern: '/books/',
    priority: 0.7,
    changefreq: 'monthly',
  },
  'sitemap-pages': {
    name: '其他頁面',
    pattern: null, // 匹配其他所有頁面
    priority: 0.5,
    changefreq: 'monthly',
  },
};

// 讀取原始 sitemap
function readOriginalSitemap() {
  const sitemapPath = path.join(DIST_DIR, 'sitemap-0.xml');
  if (!fs.existsSync(sitemapPath)) {
    console.error('Error: sitemap-0.xml not found. Run npm run build first.');
    process.exit(1);
  }
  return fs.readFileSync(sitemapPath, 'utf-8');
}

// 解析 sitemap XML 中的 URL
function parseUrls(xml) {
  const urlRegex = /<url>([\s\S]*?)<\/url>/g;
  const locRegex = /<loc>(.*?)<\/loc>/;
  const lastmodRegex = /<lastmod>(.*?)<\/lastmod>/;
  const changefreqRegex = /<changefreq>(.*?)<\/changefreq>/;
  const priorityRegex = /<priority>(.*?)<\/priority>/;

  const urls = [];
  let match;

  while ((match = urlRegex.exec(xml)) !== null) {
    const urlBlock = match[1];
    const loc = urlBlock.match(locRegex)?.[1] || '';
    const lastmod = urlBlock.match(lastmodRegex)?.[1] || new Date().toISOString();
    const changefreq = urlBlock.match(changefreqRegex)?.[1] || 'monthly';
    const priority = urlBlock.match(priorityRegex)?.[1] || '0.5';

    urls.push({ loc, lastmod, changefreq, priority });
  }

  return urls;
}

// 生成 sitemap XML
function generateSitemapXml(urls) {
  const urlEntries = urls.map(url => `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>`;
}

// 生成 sitemap index XML
function generateSitemapIndexXml(sitemaps) {
  const lastmod = new Date().toISOString();
  const sitemapEntries = sitemaps.map(name => `  <sitemap>
    <loc>${SITE_URL}/${name}.xml</loc>
    <lastmod>${lastmod}</lastmod>
  </sitemap>`).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapEntries}
</sitemapindex>`;
}

// 主函數
function main() {
  console.log('Reading original sitemap...');
  const originalXml = readOriginalSitemap();
  const allUrls = parseUrls(originalXml);
  console.log(`Found ${allUrls.length} URLs`);

  // 分類 URL
  const categorizedUrls = {};
  const usedUrls = new Set();

  // 先處理有 pattern 的類別
  Object.entries(sitemapCategories).forEach(([key, config]) => {
    if (config.pattern) {
      categorizedUrls[key] = allUrls.filter(url => {
        if (url.loc.includes(config.pattern) && !usedUrls.has(url.loc)) {
          usedUrls.add(url.loc);
          return true;
        }
        return false;
      });
    }
  });

  // 處理「其他頁面」類別
  categorizedUrls['sitemap-pages'] = allUrls.filter(url => !usedUrls.has(url.loc));

  // 生成各類別 sitemap
  const generatedSitemaps = [];

  Object.entries(categorizedUrls).forEach(([key, urls]) => {
    if (urls.length > 0) {
      const xml = generateSitemapXml(urls);
      const filePath = path.join(DIST_DIR, `${key}.xml`);
      fs.writeFileSync(filePath, xml, 'utf-8');
      console.log(`Generated ${key}.xml (${urls.length} URLs)`);
      generatedSitemaps.push(key);
    }
  });

  // 生成 sitemap index
  const indexXml = generateSitemapIndexXml(generatedSitemaps);
  const indexPath = path.join(DIST_DIR, 'sitemap-index.xml');
  fs.writeFileSync(indexPath, indexXml, 'utf-8');
  console.log(`\nGenerated sitemap-index.xml with ${generatedSitemaps.length} sitemaps`);

  // 統計
  console.log('\n=== Sitemap 統計 ===');
  generatedSitemaps.forEach(name => {
    const config = sitemapCategories[name];
    const count = categorizedUrls[name].length;
    console.log(`${config.name}: ${count} 頁面`);
  });
  console.log(`總計: ${allUrls.length} 頁面`);
}

main();
