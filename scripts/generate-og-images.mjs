import satori from 'satori';
import sharp from 'sharp';
import crypto from 'crypto';
import { readFileSync, writeFileSync, mkdirSync, existsSync, readdirSync, statSync } from 'fs';
import { join, dirname, basename } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = join(__dirname, '..');
const PAGES_DIR = join(ROOT_DIR, 'src/pages');
const OUTPUT_DIR = join(ROOT_DIR, 'public/og');

// Category colors and labels
const CATEGORIES = {
  'notable-figures': { color: '#F7931A', label: 'Notable Figures', labelZh: '重要人物' },
  'bips': { color: '#3B82F6', label: 'BIPs', labelZh: 'BIP 提案' },
  'tech/bitcoin-core': { color: '#F7931A', label: 'Bitcoin Core', labelZh: 'Bitcoin Core' },
  'tech/lightning': { color: '#FACC15', label: 'Lightning', labelZh: '閃電網路' },
  'tech/nostr': { color: '#8B5CF6', label: 'Nostr', labelZh: 'Nostr' },
  'learn/basics': { color: '#22C55E', label: 'Basics', labelZh: '入門基礎' },
  'learn/intermediate': { color: '#3B82F6', label: 'Intermediate', labelZh: '進階知識' },
  'learn/advanced': { color: '#EF4444', label: 'Advanced', labelZh: '高級技術' },
  'learn/lightning': { color: '#FACC15', label: 'Lightning', labelZh: '閃電網路' },
  'books': { color: '#EC4899', label: 'Books', labelZh: '推薦書籍' },
  'events': { color: '#14B8A6', label: 'Events', labelZh: '活動' },
  'default': { color: '#F7931A', label: '21dev.org', labelZh: '21dev.org' }
};

// Load font for satori
async function loadFont() {
  // Use system font or download a font
  // For simplicity, we'll use a basic font
  const fontPath = join(ROOT_DIR, 'scripts/fonts/NotoSansSC-Bold.ttf');

  if (existsSync(fontPath)) {
    return readFileSync(fontPath);
  }

  // Fallback: Download font if not exists
  console.log('Downloading font...');
  const fontUrl = 'https://github.com/googlefonts/noto-cjk/raw/main/Sans/OTF/SimplifiedChinese/NotoSansCJKsc-Bold.otf';

  try {
    const response = await fetch(fontUrl);
    const buffer = Buffer.from(await response.arrayBuffer());
    mkdirSync(dirname(fontPath), { recursive: true });
    writeFileSync(fontPath, buffer);
    return buffer;
  } catch (e) {
    console.error('Could not download font, using fallback');
    return null;
  }
}

// Extract title from Astro file
function extractTitle(filePath) {
  try {
    const content = readFileSync(filePath, 'utf-8');

    // Try to extract title from PageLayout or BaseLayout props
    const titleMatch = content.match(/title=["']([^"']+)["']/);
    if (titleMatch) {
      return titleMatch[1];
    }

    // Try to extract from h1
    const h1Match = content.match(/<h1[^>]*>([^<]+)<\/h1>/);
    if (h1Match) {
      return h1Match[1].trim();
    }

    // Use filename as fallback
    return basename(filePath, '.astro').replace(/-/g, ' ');
  } catch (e) {
    return basename(filePath, '.astro').replace(/-/g, ' ');
  }
}

// Get category from file path
function getCategory(filePath) {
  const relativePath = filePath.replace(PAGES_DIR + '/', '');

  for (const [key, value] of Object.entries(CATEGORIES)) {
    if (relativePath.startsWith(key + '/')) {
      return value;
    }
  }

  return CATEGORIES.default;
}

// Generate OG image template
function createOgTemplate(title, category) {
  const truncatedTitle = title.length > 40 ? title.substring(0, 37) + '...' : title;

  return {
    type: 'div',
    props: {
      style: {
        width: '1200px',
        height: '630px',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#0a0a0a',
        padding: '60px',
        fontFamily: 'Noto Sans SC',
      },
      children: [
        // Top bar
        {
          type: 'div',
          props: {
            style: {
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '8px',
              backgroundColor: category.color,
            },
          },
        },
        // Header with logo and category
        {
          type: 'div',
          props: {
            style: {
              display: 'flex',
              alignItems: 'center',
              gap: '20px',
              marginBottom: '40px',
            },
            children: [
              // Logo circle
              {
                type: 'div',
                props: {
                  style: {
                    width: '80px',
                    height: '80px',
                    borderRadius: '50%',
                    backgroundColor: category.color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '40px',
                    fontWeight: 'bold',
                    color: 'white',
                  },
                  children: 'B',
                },
              },
              // Site name
              {
                type: 'div',
                props: {
                  style: {
                    fontSize: '36px',
                    fontWeight: 'bold',
                    color: 'white',
                  },
                  children: '21dev.org',
                },
              },
              // Spacer
              {
                type: 'div',
                props: { style: { flex: 1 } },
              },
              // Category badge
              {
                type: 'div',
                props: {
                  style: {
                    padding: '10px 24px',
                    borderRadius: '30px',
                    border: `2px solid ${category.color}`,
                    color: category.color,
                    fontSize: '20px',
                    fontWeight: 'bold',
                  },
                  children: category.labelZh,
                },
              },
            ],
          },
        },
        // Main title
        {
          type: 'div',
          props: {
            style: {
              flex: 1,
              display: 'flex',
              alignItems: 'center',
            },
            children: [
              {
                type: 'div',
                props: {
                  style: {
                    fontSize: title.length > 20 ? '64px' : '80px',
                    fontWeight: 'bold',
                    color: 'white',
                    lineHeight: 1.2,
                    maxWidth: '900px',
                  },
                  children: truncatedTitle,
                },
              },
            ],
          },
        },
        // Footer
        {
          type: 'div',
          props: {
            style: {
              display: 'flex',
              alignItems: 'center',
              gap: '30px',
              color: '#666',
              fontSize: '24px',
            },
            children: [
              'Bitcoin Technical Education Platform',
            ],
          },
        },
        // Background B
        {
          type: 'div',
          props: {
            style: {
              position: 'absolute',
              right: '50px',
              top: '50%',
              transform: 'translateY(-50%)',
              fontSize: '400px',
              fontWeight: 'bold',
              color: category.color,
              opacity: 0.08,
            },
            children: 'B',
          },
        },
      ],
    },
  };
}

// Generate PNG from template
async function generateImage(template, outputPath, fontData) {
  const svg = await satori(template, {
    width: 1200,
    height: 630,
    fonts: fontData ? [
      {
        name: 'Noto Sans SC',
        data: fontData,
        weight: 700,
        style: 'normal',
      },
    ] : [],
  });

  const png = await sharp(Buffer.from(svg))
    .png()
    .toBuffer();

  mkdirSync(dirname(outputPath), { recursive: true });
  writeFileSync(outputPath, png);
}

// Compute content hash for caching
function computeContentHash(title, category) {
  const content = JSON.stringify({ title, categoryLabel: category.labelZh, color: category.color });
  return crypto.createHash('md5').update(content).digest('hex');
}

// Check if OG image needs regeneration
function needsRegeneration(outputPath, contentHash) {
  const hashFile = outputPath + '.hash';

  // If image doesn't exist, needs generation
  if (!existsSync(outputPath)) {
    return true;
  }

  // If hash file doesn't exist, needs regeneration
  if (!existsSync(hashFile)) {
    return true;
  }

  // Compare stored hash with current content hash
  try {
    const storedHash = readFileSync(hashFile, 'utf-8').trim();
    return storedHash !== contentHash;
  } catch {
    return true;
  }
}

// Save content hash for caching
function saveContentHash(outputPath, contentHash) {
  const hashFile = outputPath + '.hash';
  writeFileSync(hashFile, contentHash);
}

// Walk directory recursively
function walkDir(dir, fileList = []) {
  const files = readdirSync(dir);

  for (const file of files) {
    const filePath = join(dir, file);
    const stat = statSync(filePath);

    if (stat.isDirectory()) {
      walkDir(filePath, fileList);
    } else if (file.endsWith('.astro') && !file.startsWith('[')) {
      fileList.push(filePath);
    }
  }

  return fileList;
}

// Main function
async function main() {
  console.log('Loading font...');
  const fontData = await loadFont();

  console.log('Scanning pages...');
  const pages = walkDir(PAGES_DIR);

  console.log(`Found ${pages.length} pages`);

  // Create output directory
  mkdirSync(OUTPUT_DIR, { recursive: true });

  let generated = 0;
  let skipped = 0;

  for (const pagePath of pages) {
    const relativePath = pagePath.replace(PAGES_DIR + '/', '').replace('.astro', '');
    const outputPath = join(OUTPUT_DIR, relativePath + '.png');

    // Skip index files - use parent directory name
    if (basename(pagePath) === 'index.astro') {
      continue;
    }

    const title = extractTitle(pagePath);
    const category = getCategory(pagePath);

    // Check if regeneration is needed using content hash
    const contentHash = computeContentHash(title, category);

    if (!needsRegeneration(outputPath, contentHash)) {
      skipped++;
      continue;
    }

    console.log(`Generating: ${relativePath}`);

    try {
      const template = createOgTemplate(title, category);
      await generateImage(template, outputPath, fontData);
      saveContentHash(outputPath, contentHash);
      generated++;
    } catch (e) {
      console.error(`Failed to generate ${relativePath}:`, e.message);
    }
  }

  console.log(`\nDone! Generated: ${generated}, Skipped: ${skipped} (cached)`);
}

main().catch(console.error);
