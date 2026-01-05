export interface NavLink {
  label: string;
  href: string;
  description?: string;
}

export interface NavSection {
  title: string;
  description?: string;
  links: NavLink[];
}

export interface MegaMenuItem {
  label: string;
  href: string;
  featured?: {
    title: string;
    description: string;
    href: string;
    image?: string;
  };
  sections: NavSection[];
}

export const navigation: MegaMenuItem[] = [
  {
    label: '學習',
    href: '/learn/',
    featured: {
      title: '開始學習比特幣',
      description: '從零開始理解比特幣的完整指南',
      href: '/learn/basics/what-is-bitcoin',
    },
    sections: [
      {
        title: '入門基礎',
        links: [
          { label: '什麼是比特幣', href: '/learn/basics/what-is-bitcoin' },
          { label: '比特幣如何運作', href: '/learn/basics/how-bitcoin-works' },
          { label: '錢包使用指南', href: '/learn/basics/wallet-guide' },
        ],
      },
      {
        title: '進階知識',
        links: [
          { label: 'UTXO 模型', href: '/learn/intermediate/utxo-model' },
          { label: '交易結構', href: '/learn/intermediate/transaction-structure' },
          { label: '腳本系統基礎', href: '/learn/intermediate/script-basics' },
        ],
      },
      {
        title: '深入技術',
        links: [
          { label: 'Script 語言', href: '/learn/advanced/script-language' },
          { label: 'Taproot 升級', href: '/learn/advanced/taproot' },
        ],
      },
    ],
  },
  {
    label: '書籍',
    href: '/books/',
    featured: {
      title: '精選翻譯書籍',
      description: '社群翻譯的經典比特幣技術書籍',
      href: '/books/',
    },
    sections: [
      {
        title: '核心經典',
        links: [
          { label: '精通比特幣 第二版', href: '/books/mastering-bitcoin' },
          { label: '精通比特幣 第三版', href: '/books/mastering-bitcoin-3rd' },
          { label: 'Bitcoin 程式設計', href: '/books/programming-bitcoin' },
        ],
      },
      {
        title: '閃電網路',
        links: [{ label: '精通閃電網路', href: '/books/mastering-lightning' }],
      },
      {
        title: '歷史與白皮書',
        links: [
          { label: '區塊大小戰爭', href: '/books/blocksize-war' },
          { label: '白皮書', href: '/books/whitepapers' },
        ],
      },
    ],
  },
  {
    label: '技術',
    href: '/tech/',
    sections: [
      {
        title: 'Bitcoin Core',
        description: '比特幣核心協議與開發',
        links: [
          { label: '架構概述', href: '/tech/bitcoin-core/' },
          { label: '參與開發', href: '/tech/bitcoin-core/contribute' },
        ],
      },
      {
        title: '閃電網路',
        description: 'Layer 2 擴展方案',
        links: [
          { label: '運作原理', href: '/tech/lightning/' },
          { label: '實作指南', href: '/tech/lightning/implementations' },
        ],
      },
      {
        title: 'Nostr',
        description: '去中心化社交協議',
        links: [
          { label: '協議介紹', href: '/tech/nostr/' },
          { label: '協議詳解', href: '/tech/nostr/protocol' },
          { label: '客戶端', href: '/tech/nostr/clients' },
        ],
      },
    ],
  },
  {
    label: 'BIPs',
    href: '/bips/',
    sections: [
      {
        title: '核心 BIPs',
        links: [
          { label: 'BIP-0001: BIP 流程', href: '/bips/bip-0001' },
          { label: 'BIP-0032: HD 錢包', href: '/bips/bip-0032' },
          { label: 'BIP-0039: 助記詞', href: '/bips/bip-0039' },
          { label: 'BIP-0044: 派生路徑', href: '/bips/bip-0044' },
        ],
      },
      {
        title: 'SegWit & Taproot',
        links: [
          { label: 'BIP-0141: SegWit', href: '/bips/bip-0141' },
          { label: 'BIP-0173: Bech32', href: '/bips/bip-0173' },
          { label: 'BIP-0340: Schnorr', href: '/bips/bip-0340' },
          { label: 'BIP-0341: Taproot', href: '/bips/bip-0341' },
        ],
      },
    ],
  },
  {
    label: '大事記',
    href: '/timeline/',
    sections: [
      {
        title: '歷史時刻',
        links: [
          { label: '創世區塊 (2009)', href: '/timeline/#year-2009' },
          { label: 'Pizza Day (2010)', href: '/timeline/#year-2010' },
          { label: 'SegWit 升級 (2017)', href: '/timeline/#year-2017' },
          { label: 'Taproot 升級 (2021)', href: '/timeline/#year-2021' },
        ],
      },
      {
        title: '比特幣節日',
        links: [
          { label: '查看全部節日', href: '/timeline/#holidays' },
        ],
      },
    ],
  },
];

export const simpleNavItems: NavLink[] = [];

export const secondaryNav = [
  { label: '關於', href: '/about' },
  { label: '貢獻', href: '/contribute' },
];

export const footerNav = {
  resources: {
    title: '資源',
    links: [
      { label: '學習中心', href: '/learn/' },
      { label: '書籍資源', href: '/books/' },
      { label: '比特幣大事記', href: '/timeline/' },
      { label: 'BIP 討論', href: '/bips/' },
    ],
  },
  technology: {
    title: '技術',
    links: [
      { label: 'Bitcoin Core', href: '/tech/bitcoin-core/' },
      { label: '閃電網路', href: '/tech/lightning/' },
      { label: 'Nostr', href: '/tech/nostr/' },
    ],
  },
  community: {
    title: '社群',
    links: [
      { label: '貢獻指南', href: '/contribute' },
      {
        label: 'Signal 群組',
        href: 'https://signal.group/#CjQKIKEW5NtKmgLKX9JOei4GOaTCl1enEIOpFC1R6vjm5_RCEhD3TXZew1_1HSLkD9sh8r5K',
      },
    ],
  },
  about: {
    title: '關於',
    links: [
      { label: '關於我們', href: '/about' },
      { label: 'GitHub', href: 'https://github.com/21dev-org' },
    ],
  },
};
