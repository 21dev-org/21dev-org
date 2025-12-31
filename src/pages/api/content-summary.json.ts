import type { APIRoute } from 'astro';
import { bips } from '@/data/bips';
import { siteConfig } from '@/data/site';

export const GET: APIRoute = async () => {
  const summary = {
    site: {
      name: siteConfig.name,
      url: siteConfig.url,
      language: 'zh-Hant',
      description: siteConfig.description,
    },
    lastUpdated: new Date().toISOString(),
    contentCategories: [
      {
        name: 'BIPs',
        count: bips.length,
        url: '/bips/',
        description: 'Bitcoin Improvement Proposals 中文翻譯與解析',
        items: bips.slice(0, 10).map((bip) => ({
          number: bip.number,
          title: bip.titleZh,
          status: bip.status,
          url: `/bips/bip-${String(bip.number).padStart(4, '0')}/`,
        })),
      },
      {
        name: 'Books',
        count: 7,
        url: '/books/',
        description: '經典比特幣技術書籍中文版',
        items: [
          { title: '精通比特幣 (第三版)', url: '/books/mastering-bitcoin-3rd/' },
          { title: '精通閃電網路', url: '/books/mastering-lightning/' },
          { title: 'Programming Bitcoin', url: '/books/programming-bitcoin/' },
          { title: '區塊大小戰爭', url: '/books/blocksize-war/' },
        ],
      },
      {
        name: 'Learn',
        url: '/learn/',
        description: '從入門到進階的結構化學習路徑',
        sections: [
          {
            name: '入門基礎',
            url: '/learn/basics/',
            topics: ['什麼是比特幣', '比特幣如何運作', '錢包使用指南', '安全基礎'],
          },
          {
            name: '進階知識',
            url: '/learn/intermediate/',
            topics: ['UTXO 模型', '交易結構', '地址類型', '腳本系統'],
          },
          {
            name: '高級主題',
            url: '/learn/advanced/',
            topics: ['Taproot', 'Schnorr 簽名', 'MuSig2', 'Miniscript'],
          },
          {
            name: '閃電網路',
            url: '/learn/lightning/',
            topics: ['支付通道', 'HTLC', '路由', '發票'],
          },
        ],
      },
      {
        name: 'Tech',
        url: '/tech/',
        description: 'Bitcoin Core、Lightning、Nostr 技術文檔',
        sections: [
          {
            name: 'Bitcoin Core',
            url: '/tech/bitcoin-core/',
            topics: ['共識機制', '區塊結構', 'RPC API', 'P2P 協議'],
          },
          {
            name: 'Lightning Network',
            url: '/tech/lightning/',
            topics: ['支付通道', 'HTLC', 'BOLT 規範', '路由算法'],
          },
          {
            name: 'Nostr',
            url: '/tech/nostr/',
            topics: ['協議基礎', '事件系統', 'NIP 標準', '中繼器'],
          },
        ],
      },
    ],
    popularTopics: [
      { topic: 'HD 錢包', bips: ['BIP-32', 'BIP-39', 'BIP-44'], url: '/bips/bip-0032/' },
      { topic: 'SegWit', bips: ['BIP-141', 'BIP-143', 'BIP-144'], url: '/bips/bip-0141/' },
      {
        topic: 'Taproot',
        bips: ['BIP-340', 'BIP-341', 'BIP-342'],
        url: '/learn/advanced/taproot/',
      },
      { topic: '閃電網路', url: '/learn/lightning/' },
      { topic: 'Nostr 協議', url: '/tech/nostr/' },
    ],
    contact: {
      github: siteConfig.social.github,
      twitter: siteConfig.social.twitter,
    },
  };

  return new Response(JSON.stringify(summary, null, 2), {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
