export interface Book {
  id: string;
  title: string;
  subtitle: string;
  author: string;
  translator: string;
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
    externalUrl: 'https://mastering-bitcoin.doge.tg/',
    description: '比特幣技術的標準教材。交易、錢包、挖礦、網路協議都有講。',
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
    externalUrl: 'https://bitcoinbook-3nd-zh.doge.tg/',
    description: '2023 年新版，加了 SegWit、Taproot、Schnorr 等內容。',
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
    externalUrl: 'https://programming-bitcoin-zh.doge.tg/#/',
    description: '用 Python 從頭寫一個比特幣。橢圓曲線、交易、Script 都自己實作。',
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
    externalUrl: 'https://lnbook-zh.doge.tg/',
    description: '閃電網路怎麼運作的。支付通道、HTLC、路由、實作。',
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
    externalUrl: 'https://the-blocksize-war.doge.tg/#/',
    description: '2015-2017 比特幣社群為了區塊大小吵翻天。這本書記錄了整個過程。',
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
    externalUrl: 'https://cypherpunks-core.github.io/books/BitcoinWhitePaper/',
    description: '2008 年中本聰發的那篇論文。9 頁，一切的起點。',
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
    externalUrl: 'https://cypherpunks-core.github.io/books/LightningNetworkWhitePaper/',
    description: '2016 年的閃電網路白皮書。解釋支付通道怎麼讓比特幣擴展。',
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
