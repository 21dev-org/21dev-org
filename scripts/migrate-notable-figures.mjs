/**
 * 批次更新 Notable Figures 頁面以使用 NotableFigureLayout
 * 執行: node scripts/migrate-notable-figures.mjs
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const FIGURES_DIR = path.join(__dirname, '../src/pages/notable-figures');

// 人物資料對應 (name -> { jobTitle, knowsAbout, sameAs })
const figuresData = {
  'satoshi-nakamoto': {
    jobTitle: '比特幣創建者',
    knowsAbout: ['Bitcoin', 'Cryptography', 'Distributed Systems', 'Peer-to-Peer Networks'],
    sameAs: ['https://en.wikipedia.org/wiki/Satoshi_Nakamoto'],
  },
  'hal-finney': {
    jobTitle: '密碼龐克先驅',
    knowsAbout: ['Bitcoin', 'Cryptography', 'PGP', 'RPOW'],
    sameAs: ['https://en.wikipedia.org/wiki/Hal_Finney_(computer_scientist)'],
  },
  'adam-back': {
    jobTitle: 'Blockstream CEO',
    knowsAbout: ['Bitcoin', 'Hashcash', 'Cryptography', 'Sidechains'],
    sameAs: ['https://twitter.com/adam3us', 'https://en.wikipedia.org/wiki/Adam_Back'],
  },
  'nick-szabo': {
    jobTitle: '智能合約之父',
    knowsAbout: ['Bitcoin', 'Smart Contracts', 'Bit Gold', 'Cryptography'],
    sameAs: ['https://en.wikipedia.org/wiki/Nick_Szabo'],
  },
  'wei-dai': {
    jobTitle: 'b-money 發明者',
    knowsAbout: ['Bitcoin', 'Cryptography', 'b-money'],
    sameAs: ['https://en.wikipedia.org/wiki/Wei_Dai'],
  },
  'david-chaum': {
    jobTitle: '數位現金之父',
    knowsAbout: ['Cryptography', 'DigiCash', 'Anonymous Communication'],
    sameAs: ['https://en.wikipedia.org/wiki/David_Chaum'],
  },
  'pieter-wuille': {
    jobTitle: 'Bitcoin Core 開發者',
    knowsAbout: ['Bitcoin', 'SegWit', 'Taproot', 'libsecp256k1'],
    sameAs: ['https://twitter.com/pwuille'],
  },
  'gregory-maxwell': {
    jobTitle: 'Bitcoin Core 開發者',
    knowsAbout: ['Bitcoin', 'Cryptography', 'Confidential Transactions'],
    sameAs: ['https://en.wikipedia.org/wiki/Gregory_Maxwell'],
  },
  'wladimir-van-der-laan': {
    jobTitle: 'Bitcoin Core 維護者',
    knowsAbout: ['Bitcoin', 'Bitcoin Core', 'Open Source'],
    sameAs: [],
  },
  'gavin-andresen': {
    jobTitle: '前 Bitcoin Core 維護者',
    knowsAbout: ['Bitcoin', 'Bitcoin Core'],
    sameAs: ['https://en.wikipedia.org/wiki/Gavin_Andresen'],
  },
  'andreas-antonopoulos': {
    jobTitle: '比特幣教育者',
    knowsAbout: ['Bitcoin', 'Lightning Network', 'Blockchain Education'],
    sameAs: ['https://twitter.com/aantonop', 'https://aantonop.com/'],
  },
  'elizabeth-stark': {
    jobTitle: 'Lightning Labs CEO',
    knowsAbout: ['Bitcoin', 'Lightning Network'],
    sameAs: ['https://twitter.com/staborhood'],
  },
  'olaoluwa-osuntokun': {
    jobTitle: 'Lightning Labs CTO',
    knowsAbout: ['Bitcoin', 'Lightning Network', 'LND'],
    sameAs: ['https://twitter.com/roasbeef'],
  },
  'rusty-russell': {
    jobTitle: 'Core Lightning 開發者',
    knowsAbout: ['Bitcoin', 'Lightning Network', 'Linux Kernel'],
    sameAs: ['https://twitter.com/rusaborhood'],
  },
  'christian-decker': {
    jobTitle: '閃電網路研究員',
    knowsAbout: ['Bitcoin', 'Lightning Network'],
    sameAs: ['https://twitter.com/saborhood'],
  },
  'jack-dorsey': {
    jobTitle: 'Block CEO',
    knowsAbout: ['Bitcoin', 'Technology', 'Social Media'],
    sameAs: ['https://twitter.com/jack'],
  },
  'michael-saylor': {
    jobTitle: 'MicroStrategy 創辦人',
    knowsAbout: ['Bitcoin', 'Corporate Treasury'],
    sameAs: ['https://twitter.com/saylor'],
  },
  'fiatjaf': {
    jobTitle: 'Nostr 創建者',
    knowsAbout: ['Bitcoin', 'Nostr', 'Lightning Network'],
    sameAs: ['https://twitter.com/fiatjaf'],
  },
  'jack-mallers': {
    jobTitle: 'Strike CEO',
    knowsAbout: ['Bitcoin', 'Lightning Network', 'Payments'],
    sameAs: ['https://twitter.com/jackmallers'],
  },
  'jimmy-song': {
    jobTitle: '比特幣開發者',
    knowsAbout: ['Bitcoin', 'Programming', 'Education'],
    sameAs: ['https://twitter.com/jimmysong'],
  },
  'jameson-lopp': {
    jobTitle: 'Casa CTO',
    knowsAbout: ['Bitcoin', 'Security', 'Self-Custody'],
    sameAs: ['https://twitter.com/lopp'],
  },
  'lyn-alden': {
    jobTitle: '投資策略師',
    knowsAbout: ['Bitcoin', 'Macroeconomics', 'Investment'],
    sameAs: ['https://twitter.com/LynAldenContact'],
  },
  'saifedean-ammous': {
    jobTitle: '經濟學家',
    knowsAbout: ['Bitcoin', 'Austrian Economics'],
    sameAs: ['https://twitter.com/saifedean'],
  },
  'peter-todd': {
    jobTitle: '密碼學顧問',
    knowsAbout: ['Bitcoin', 'Cryptography', 'Security'],
    sameAs: ['https://twitter.com/peterktodd'],
  },
  'luke-dashjr': {
    jobTitle: 'Bitcoin Core 開發者',
    knowsAbout: ['Bitcoin', 'Mining', 'BIP'],
    sameAs: ['https://twitter.com/LukeDashjr'],
  },
  'matt-corallo': {
    jobTitle: 'Bitcoin Core 開發者',
    knowsAbout: ['Bitcoin', 'Lightning Network', 'Mining'],
    sameAs: ['https://twitter.com/TheBlueMatt'],
  },
  'gloria-zhao': {
    jobTitle: 'Bitcoin Core 開發者',
    knowsAbout: ['Bitcoin', 'Mempool', 'P2P Network'],
    sameAs: ['https://twitter.com/glaborhood'],
  },
  'andrew-poelstra': {
    jobTitle: 'Blockstream 研究總監',
    knowsAbout: ['Bitcoin', 'Cryptography', 'Miniscript'],
    sameAs: ['https://twitter.com/apoelstra'],
  },
  'robin-linus': {
    jobTitle: 'BitVM 發明者',
    knowsAbout: ['Bitcoin', 'BitVM', 'Zero Knowledge'],
    sameAs: ['https://twitter.com/Robin_Linus'],
  },
  'aj-towns': {
    jobTitle: 'Bitcoin Core 開發者',
    knowsAbout: ['Bitcoin', 'Taproot', 'OP_CAT'],
    sameAs: ['https://twitter.com/aaborhood'],
  },
  'jeremy-rubin': {
    jobTitle: '比特幣研究員',
    knowsAbout: ['Bitcoin', 'Covenants', 'OP_CTV'],
    sameAs: ['https://twitter.com/JeremyRubin'],
  },
  'ruben-somsen': {
    jobTitle: '比特幣研究員',
    knowsAbout: ['Bitcoin', 'Silent Payments', 'Spacechains'],
    sameAs: ['https://twitter.com/SomsenRuben'],
  },
  'antoine-riard': {
    jobTitle: '閃電網路開發者',
    knowsAbout: ['Bitcoin', 'Lightning Network', 'Security'],
    sameAs: ['https://twitter.com/antoine_riard'],
  },
  'bastien-teinturier': {
    jobTitle: 'ACINQ 開發者',
    knowsAbout: ['Bitcoin', 'Lightning Network', 'Eclair'],
    sameAs: ['https://twitter.com/reaborhood'],
  },
  'rene-pickhardt': {
    jobTitle: '閃電網路研究員',
    knowsAbout: ['Bitcoin', 'Lightning Network', 'Routing'],
    sameAs: ['https://twitter.com/renepickhardt'],
  },
  'joost-jager': {
    jobTitle: '閃電網路開發者',
    knowsAbout: ['Bitcoin', 'Lightning Network', 'Loop'],
    sameAs: ['https://twitter.com/joaborhood'],
  },
  'alex-bosworth': {
    jobTitle: 'Lightning Labs 開發者',
    knowsAbout: ['Bitcoin', 'Lightning Network', 'Balance of Satoshis'],
    sameAs: ['https://twitter.com/alexbosworth'],
  },
  'conner-fromknecht': {
    jobTitle: 'Lightning Labs 開發者',
    knowsAbout: ['Bitcoin', 'Lightning Network', 'Watchtowers'],
    sameAs: [],
  },
  'lisa-neigut': {
    jobTitle: 'Core Lightning 開發者',
    knowsAbout: ['Bitcoin', 'Lightning Network', 'Dual Funding'],
    sameAs: ['https://twitter.com/naborhood'],
  },
  'oliver-gugger': {
    jobTitle: 'Lightning Labs 開發者',
    knowsAbout: ['Bitcoin', 'Lightning Network', 'Pool'],
    sameAs: ['https://twitter.com/guggero'],
  },
  'joseph-poon': {
    jobTitle: '閃電網路共同發明者',
    knowsAbout: ['Bitcoin', 'Lightning Network'],
    sameAs: [],
  },
  'thaddeus-dryja': {
    jobTitle: '閃電網路共同發明者',
    knowsAbout: ['Bitcoin', 'Lightning Network', 'Utreexo'],
    sameAs: [],
  },
  'nicolas-dorier': {
    jobTitle: 'BTCPay Server 創辦人',
    knowsAbout: ['Bitcoin', 'Payment Processing', 'Self-Custody'],
    sameAs: ['https://twitter.com/NicolasDorier'],
  },
  'pavol-rusnak': {
    jobTitle: 'Trezor 共同創辦人',
    knowsAbout: ['Bitcoin', 'Hardware Wallets', 'Security'],
    sameAs: ['https://twitter.com/paborhood'],
  },
  'rodolfo-novak': {
    jobTitle: 'Coinkite CEO',
    knowsAbout: ['Bitcoin', 'Hardware Wallets', 'Coldcard'],
    sameAs: ['https://twitter.com/nvk'],
  },
  'samson-mow': {
    jobTitle: 'Jan3 CEO',
    knowsAbout: ['Bitcoin', 'Nation-State Adoption'],
    sameAs: ['https://twitter.com/Excellion'],
  },
  'adam-gibson': {
    jobTitle: 'JoinMarket 開發者',
    knowsAbout: ['Bitcoin', 'Privacy', 'CoinJoin'],
    sameAs: ['https://twitter.com/waborhood'],
  },
  'chris-belcher': {
    jobTitle: '隱私技術開發者',
    knowsAbout: ['Bitcoin', 'Privacy', 'Electrum'],
    sameAs: ['https://twitter.com/chris_belcher_'],
  },
  'eric-voskuil': {
    jobTitle: 'Libbitcoin 開發者',
    knowsAbout: ['Bitcoin', 'Cryptoeconomics'],
    sameAs: ['https://twitter.com/evoskuil'],
  },
  'amir-taaki': {
    jobTitle: 'Dark Wallet 開發者',
    knowsAbout: ['Bitcoin', 'Privacy', 'Activism'],
    sameAs: ['https://en.wikipedia.org/wiki/Amir_Taaki'],
  },
  'martti-malmi': {
    jobTitle: '比特幣早期開發者',
    knowsAbout: ['Bitcoin', 'Bitcoin.org'],
    sameAs: ['https://twitter.com/maraborhood'],
  },
  'jeff-booth': {
    jobTitle: '作家',
    knowsAbout: ['Bitcoin', 'Deflation', 'Technology'],
    sameAs: ['https://twitter.com/JeffBooth'],
  },
  'vijay-boyapati': {
    jobTitle: '作家',
    knowsAbout: ['Bitcoin', 'Economics'],
    sameAs: ['https://twitter.com/real_vijay'],
  },
  'parker-lewis': {
    jobTitle: '作家',
    knowsAbout: ['Bitcoin', 'Economics'],
    sameAs: ['https://twitter.com/parkeaborhood'],
  },
  'gigi': {
    jobTitle: '作家',
    knowsAbout: ['Bitcoin', 'Philosophy'],
    sameAs: ['https://twitter.com/dergigi'],
  },
  'giacomo-zucco': {
    jobTitle: 'BHB Network 創辦人',
    knowsAbout: ['Bitcoin', 'RGB Protocol'],
    sameAs: ['https://twitter.com/giacomozucco'],
  },
  'alekos-filini': {
    jobTitle: 'BDK 開發者',
    knowsAbout: ['Bitcoin', 'Wallet Development', 'Rust'],
    sameAs: ['https://twitter.com/aborhood'],
  },
  'lloyd-fournier': {
    jobTitle: '密碼學研究員',
    knowsAbout: ['Bitcoin', 'DLC', 'Cryptography'],
    sameAs: ['https://twitter.com/LLFourn'],
  },
  'tim-ruffing': {
    jobTitle: 'Blockstream 研究員',
    knowsAbout: ['Bitcoin', 'MuSig', 'Schnorr'],
    sameAs: ['https://twitter.com/real_or_random'],
  },
  'jonas-schnelli': {
    jobTitle: '前 Bitcoin Core 維護者',
    knowsAbout: ['Bitcoin', 'Bitcoin Core', 'Hardware'],
    sameAs: ['https://twitter.com/jonaborhood'],
  },
  'john-newbery': {
    jobTitle: 'Brink 創辦人',
    knowsAbout: ['Bitcoin', 'Bitcoin Core', 'Developer Funding'],
    sameAs: ['https://twitter.com/jfnewbery'],
  },
  'steve-lee': {
    jobTitle: 'Spiral 負責人',
    knowsAbout: ['Bitcoin', 'Developer Funding'],
    sameAs: ['https://twitter.com/monaborhood'],
  },
  'cory-fields': {
    jobTitle: 'Bitcoin Core 開發者',
    knowsAbout: ['Bitcoin', 'Build System'],
    sameAs: [],
  },
  'marco-falke': {
    jobTitle: 'Bitcoin Core 開發者',
    knowsAbout: ['Bitcoin', 'Testing', 'Fuzzing'],
    sameAs: ['https://twitter.com/MarcoFalke'],
  },
  'fanquake': {
    jobTitle: 'Bitcoin Core 維護者',
    knowsAbout: ['Bitcoin', 'Build System', 'Security'],
    sameAs: ['https://twitter.com/fanquake'],
  },
  'suhas-daftuar': {
    jobTitle: 'Bitcoin Core 開發者',
    knowsAbout: ['Bitcoin', 'P2P Network', 'Mempool'],
    sameAs: ['https://twitter.com/saborhood'],
  },
  'dhruv-mehta': {
    jobTitle: 'Bitcoin Core 開發者',
    knowsAbout: ['Bitcoin', 'Testing'],
    sameAs: ['https://twitter.com/dhruv'],
  },
  'fabian-jahr': {
    jobTitle: 'Bitcoin Core 開發者',
    knowsAbout: ['Bitcoin', 'Utreexo', 'Coinstats'],
    sameAs: ['https://twitter.com/fjaborhood'],
  },
  'vasil-dimov': {
    jobTitle: 'Bitcoin Core 開發者',
    knowsAbout: ['Bitcoin', 'Networking', 'I2P'],
    sameAs: [],
  },
  'antoine-poinsot': {
    jobTitle: 'Revault 開發者',
    knowsAbout: ['Bitcoin', 'Miniscript', 'Vaults'],
    sameAs: ['https://twitter.com/daborhood'],
  },
  'josie-baker': {
    jobTitle: 'Silent Payments 開發者',
    knowsAbout: ['Bitcoin', 'Privacy', 'Silent Payments'],
    sameAs: ['https://twitter.com/joseaborhood'],
  },
  'andrew-chow': {
    jobTitle: 'Bitcoin Core 開發者',
    knowsAbout: ['Bitcoin', 'Wallet', 'Descriptors'],
    sameAs: ['https://twitter.com/achow101'],
  },
  'murch': {
    jobTitle: 'Chaincode Labs 工程師',
    knowsAbout: ['Bitcoin', 'Coin Selection', 'UTXO'],
    sameAs: ['https://twitter.com/maborhood'],
  },
  'bryan-bishop': {
    jobTitle: '比特幣開發者',
    knowsAbout: ['Bitcoin', 'Vaults', 'OP_VAULT'],
    sameAs: ['https://twitter.com/kanzure'],
  },
  'paul-sztorc': {
    jobTitle: 'Drivechain 發明者',
    knowsAbout: ['Bitcoin', 'Drivechains', 'Sidechains'],
    sameAs: ['https://twitter.com/Truthcoin'],
  },
  'burak': {
    jobTitle: 'Ark 發明者',
    knowsAbout: ['Bitcoin', 'Ark Protocol', 'Layer 2'],
    sameAs: ['https://twitter.com/brqgoo'],
  },
  'zmnscpxj': {
    jobTitle: '匿名開發者',
    knowsAbout: ['Bitcoin', 'Lightning Network', 'Research'],
    sameAs: [],
  },
  'jesse-posner': {
    jobTitle: 'FROST 開發者',
    knowsAbout: ['Bitcoin', 'Cryptography', 'Threshold Signatures'],
    sameAs: ['https://twitter.com/jesseposner'],
  },
  'matt-morehouse': {
    jobTitle: '閃電網路安全研究員',
    knowsAbout: ['Bitcoin', 'Lightning Network', 'Security'],
    sameAs: ['https://twitter.com/maborhood'],
  },
  'hugo-nguyen': {
    jobTitle: 'Nunchuk 創辦人',
    knowsAbout: ['Bitcoin', 'Multisig', 'Self-Custody'],
    sameAs: ['https://twitter.com/hugoaborhood'],
  },
  'caitlin-long': {
    jobTitle: 'Custodia Bank CEO',
    knowsAbout: ['Bitcoin', 'Banking', 'Regulation'],
    sameAs: ['https://twitter.com/CaitlinLong_'],
  },
  'wences-casares': {
    jobTitle: 'Xapo 創辦人',
    knowsAbout: ['Bitcoin', 'Custody', 'Entrepreneurship'],
    sameAs: ['https://twitter.com/waborhood'],
  },
  'nic-carter': {
    jobTitle: 'Castle Island Ventures 合夥人',
    knowsAbout: ['Bitcoin', 'Research', 'Venture Capital'],
    sameAs: ['https://twitter.com/nic__carter'],
  },
  'pierre-rochard': {
    jobTitle: '比特幣策略師',
    knowsAbout: ['Bitcoin', 'Corporate Adoption'],
    sameAs: ['https://twitter.com/paborhood'],
  },
  'dan-held': {
    jobTitle: '比特幣教育者',
    knowsAbout: ['Bitcoin', 'History', 'Economics'],
    sameAs: ['https://twitter.com/danheld'],
  },
  'stephan-livera': {
    jobTitle: 'Podcast 主持人',
    knowsAbout: ['Bitcoin', 'Austrian Economics', 'Education'],
    sameAs: ['https://twitter.com/stephanlivera'],
  },
  'matt-odell': {
    jobTitle: 'TFTC 共同主持人',
    knowsAbout: ['Bitcoin', 'Privacy', 'Self-Custody'],
    sameAs: ['https://twitter.com/ODELL'],
  },
  'john-carvalho': {
    jobTitle: 'Synonym CEO',
    knowsAbout: ['Bitcoin', 'Lightning Network', 'Products'],
    sameAs: ['https://twitter.com/BitcoinErrorLog'],
  },
  'alex-gladstein': {
    jobTitle: 'HRF 策略長',
    knowsAbout: ['Bitcoin', 'Human Rights', 'Financial Freedom'],
    sameAs: ['https://twitter.com/gladstein'],
  },
  'tony-giorgio': {
    jobTitle: 'Mutiny Wallet 開發者',
    knowsAbout: ['Bitcoin', 'Lightning Network', 'Privacy'],
    sameAs: ['https://twitter.com/tonyisgrateful'],
  },
  'evan-kaloudis': {
    jobTitle: 'Zeus 開發者',
    knowsAbout: ['Bitcoin', 'Lightning Network', 'Mobile Wallets'],
    sameAs: ['https://twitter.com/eaborhood'],
  },
  'ben-arc': {
    jobTitle: 'LNbits 開發者',
    knowsAbout: ['Bitcoin', 'Lightning Network', 'Maker Culture'],
    sameAs: ['https://twitter.com/arcaborhood'],
  },
  'calle': {
    jobTitle: 'Cashu 發明者',
    knowsAbout: ['Bitcoin', 'Ecash', 'Privacy'],
    sameAs: ['https://twitter.com/callebtc'],
  },
  'thestack': {
    jobTitle: 'StratumV2 開發者',
    knowsAbout: ['Bitcoin', 'Mining', 'Stratum'],
    sameAs: ['https://twitter.com/theaborhood'],
  },
  'mononaut': {
    jobTitle: 'Mempool.space 開發者',
    knowsAbout: ['Bitcoin', 'Mempool', 'Block Explorer'],
    sameAs: ['https://twitter.com/maborhood'],
  },
};

function getSlugFromFilename(filename) {
  return filename.replace('.astro', '');
}

function updateFile(filePath) {
  const filename = path.basename(filePath);
  const slug = getSlugFromFilename(filename);

  // Skip index.astro
  if (slug === 'index') {
    console.log(`Skipping ${filename} (index page)`);
    return;
  }

  // Skip already migrated files
  const content = fs.readFileSync(filePath, 'utf-8');
  if (content.includes('NotableFigureLayout')) {
    console.log(`Skipping ${filename} (already migrated)`);
    return;
  }

  const data = figuresData[slug];
  if (!data) {
    console.log(`Warning: No data for ${slug}, using defaults`);
  }

  const jobTitle = data?.jobTitle || '';
  const knowsAbout = data?.knowsAbout || ['Bitcoin', 'Cryptocurrency'];
  const sameAs = data?.sameAs || [];

  // Extract name and description from PageLayout
  const titleMatch = content.match(/title="([^"]+)"/);
  const descriptionMatch = content.match(/description="([^"]+)"/);

  if (!titleMatch || !descriptionMatch) {
    console.log(`Warning: Could not extract title/description from ${filename}`);
    return;
  }

  const name = titleMatch[1];
  const description = descriptionMatch[1];

  // Create new content
  let newContent = content;

  // Update import
  newContent = newContent.replace(
    "import PageLayout from '@/layouts/PageLayout.astro';",
    "import NotableFigureLayout from '@/layouts/NotableFigureLayout.astro';"
  );

  // Build the new layout tag
  const knowsAboutStr = JSON.stringify(knowsAbout).replace(/"/g, "'");
  const sameAsStr = sameAs.length > 0 ? JSON.stringify(sameAs).replace(/"/g, "'") : '';

  let newLayoutTag = `<NotableFigureLayout
  name="${name}"
  description="${description}"`;

  if (jobTitle) {
    newLayoutTag += `\n  jobTitle="${jobTitle}"`;
  }

  newLayoutTag += `\n  knowsAbout={${knowsAboutStr}}`;

  if (sameAsStr) {
    newLayoutTag += `\n  sameAs={${sameAsStr}}`;
  }

  newLayoutTag += '\n>';

  // Replace PageLayout opening tag
  const pageLayoutRegex = /<PageLayout\s+title="[^"]+"\s+description="[^"]+"\s*>/;
  newContent = newContent.replace(pageLayoutRegex, newLayoutTag);

  // Replace closing tag
  newContent = newContent.replace('</PageLayout>', '</NotableFigureLayout>');

  // Write updated content
  fs.writeFileSync(filePath, newContent, 'utf-8');
  console.log(`Updated: ${filename}`);
}

// Main execution
const files = fs.readdirSync(FIGURES_DIR).filter(f => f.endsWith('.astro'));
console.log(`Found ${files.length} files to process\n`);

let updated = 0;
let skipped = 0;

for (const file of files) {
  const filePath = path.join(FIGURES_DIR, file);
  const content = fs.readFileSync(filePath, 'utf-8');

  if (file === 'index.astro' || content.includes('NotableFigureLayout')) {
    skipped++;
    continue;
  }

  try {
    updateFile(filePath);
    updated++;
  } catch (err) {
    console.error(`Error processing ${file}:`, err.message);
  }
}

console.log(`\nDone! Updated: ${updated}, Skipped: ${skipped}`);
