export interface Book {
  id: string;
  title: string;
  subtitle: string;
  author: string;
  translator: string;
  coverImage: string;
  externalUrl: string;
  description: string;
  topics: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  pages: number;
  year: number;
}

export const books: Book[] = [
  {
    id: 'mastering-bitcoin',
    title: '精通比特幣',
    subtitle: 'Mastering Bitcoin 第二版',
    author: 'Andreas M. Antonopoulos',
    translator: 'Cypherpunks Core',
    coverImage: '/images/books/mastering-bitcoin.svg',
    externalUrl: 'https://mastering-bitcoin.doge.tg/',
    description: '最經典的比特幣技術書籍，深入解析比特幣的技術原理、交易機制、挖礦過程與網路架構。',
    topics: ['交易', '錢包', '挖礦', '網路協議'],
    difficulty: 'intermediate',
    pages: 400,
    year: 2017,
  },
  {
    id: 'mastering-bitcoin-3rd',
    title: '精通比特幣 第三版',
    subtitle: 'Mastering Bitcoin 3rd Edition',
    author: 'Andreas M. Antonopoulos, David A. Harding',
    translator: '社群翻譯',
    coverImage: '/images/books/mastering-bitcoin-3rd.svg',
    externalUrl: 'https://bitcoinbook-3nd-zh.doge.tg/',
    description: '全新第三版，涵蓋 SegWit、Taproot 等最新升級內容。',
    topics: ['SegWit', 'Taproot', 'Schnorr', 'PSBT'],
    difficulty: 'intermediate',
    pages: 450,
    year: 2023,
  },
  {
    id: 'programming-bitcoin',
    title: 'Bitcoin 程式設計',
    subtitle: 'Programming Bitcoin',
    author: 'Jimmy Song',
    translator: '社群翻譯',
    coverImage: '/images/books/programming-bitcoin.svg',
    externalUrl: 'https://programming-bitcoin-zh.doge.tg/#/',
    description: '從零開始用 Python 實作比特幣核心功能，理解橢圓曲線加密、交易建構與區塊驗證。',
    topics: ['Python', '橢圓曲線', '交易建構', 'Script'],
    difficulty: 'advanced',
    pages: 320,
    year: 2019,
  },
  {
    id: 'mastering-lightning',
    title: '精通閃電網路',
    subtitle: 'Mastering the Lightning Network',
    author: 'Andreas M. Antonopoulos, Olaoluwa Osuntokun, Rene Pickhardt',
    translator: '社群翻譯',
    coverImage: '/images/books/mastering-lightning.svg',
    externalUrl: 'https://lnbook-zh.doge.tg/',
    description: '閃電網路技術的完整指南，涵蓋支付通道、路由、HTLC 與實作細節。',
    topics: ['支付通道', 'HTLC', '路由', '發票'],
    difficulty: 'advanced',
    pages: 350,
    year: 2021,
  },
  {
    id: 'blocksize-war',
    title: '區塊大小戰爭',
    subtitle: 'The Blocksize War',
    author: 'Jonathan Bier',
    translator: '社群翻譯',
    coverImage: '/images/books/blocksize-war.svg',
    externalUrl: 'https://the-blocksize-war.doge.tg/#/',
    description: '記錄 2015-2017 年比特幣社群關於區塊大小的激烈爭論，理解比特幣治理的重要歷史。',
    topics: ['歷史', '治理', '分叉', '社群'],
    difficulty: 'beginner',
    pages: 280,
    year: 2021,
  },
  {
    id: 'bitcoin-whitepaper',
    title: '比特幣白皮書',
    subtitle: 'Bitcoin: A Peer-to-Peer Electronic Cash System',
    author: 'Satoshi Nakamoto',
    translator: 'Cypherpunks Core',
    coverImage: '/images/books/bitcoin-whitepaper.svg',
    externalUrl: 'https://cypherpunks-core.github.io/books/BitcoinWhitePaper/',
    description: '中本聰於 2008 年發表的比特幣白皮書，定義了整個加密貨幣時代的開端。',
    topics: ['白皮書', '原理', '歷史'],
    difficulty: 'intermediate',
    pages: 9,
    year: 2008,
  },
  {
    id: 'lightning-whitepaper',
    title: '閃電網路白皮書',
    subtitle: 'The Bitcoin Lightning Network',
    author: 'Joseph Poon, Thaddeus Dryja',
    translator: 'Cypherpunks Core',
    coverImage: '/images/books/lightning-whitepaper.svg',
    externalUrl: 'https://cypherpunks-core.github.io/books/LightningNetworkWhitePaper/',
    description: '閃電網路的原始白皮書，描述如何透過支付通道實現比特幣的擴展。',
    topics: ['白皮書', '支付通道', '擴展'],
    difficulty: 'advanced',
    pages: 60,
    year: 2016,
  },
];

export function getBookById(id: string): Book | undefined {
  return books.find((book) => book.id === id);
}

export function getBooksByDifficulty(difficulty: Book['difficulty']): Book[] {
  return books.filter((book) => book.difficulty === difficulty);
}
