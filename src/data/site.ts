export const siteConfig = {
  name: '21dev.org',
  title: '21dev.org | 比特幣技術教育平台',
  description: '華語中文圈最全面的比特幣技術教育平台，涵蓋 Bitcoin Core、閃電網路、Nostr 等核心技術領域。',
  url: 'https://21dev.org',
  locale: 'zh-Hant',
  author: '21dev.org Community',

  // Social links
  social: {
    github: 'https://github.com/21dev-org',
    twitter: 'https://twitter.com/21devorg',
    signal: 'https://signal.group/#CjQKIKEW5NtKmgLKX9JOei4GOaTCl1enEIOpFC1R6vjm5_RCEhD3TXZew1_1HSLkD9sh8r5K',
  },

  // Default Open Graph image
  ogImage: '/og-image.svg',

  // Navigation
  navLinks: [
    { label: '學習', href: '/learn/' },
    { label: '書籍', href: '/books/' },
    { label: '技術', href: '/tech/' },
    { label: 'BIPs', href: '/bips/' },
  ],

  secondaryLinks: [
    { label: '關於', href: '/about' },
    { label: '貢獻', href: '/contribute' },
  ],
};

export const priorityTech = [
  {
    id: 'bitcoin-core',
    name: 'Bitcoin Core',
    description: '比特幣核心協議與開發',
    icon: 'bitcoin',
    color: 'bitcoin',
  },
  {
    id: 'lightning',
    name: 'Lightning Network',
    description: 'Layer 2 擴展方案',
    icon: 'lightning',
    color: 'yellow',
  },
  {
    id: 'nostr',
    name: 'Nostr',
    description: '去中心化社交協議',
    icon: 'nostr',
    color: 'purple',
  },
];
