/**
 * Topic Clusters Data
 * Defines relationships between content for internal linking and recommendations
 */

export interface TopicCluster {
  id: string;
  name: string;
  description: string;
  pillarPage: string;
  relatedPages: {
    href: string;
    title: string;
    type: 'article' | 'bip' | 'book' | 'tech';
  }[];
  relatedBips: number[];
  keywords: string[];
}

export const topicClusters: TopicCluster[] = [
  {
    id: 'hd-wallets',
    name: 'HD 錢包',
    description: '階層式確定性錢包標準',
    pillarPage: '/bips/bip-0032/',
    relatedPages: [
      { href: '/bips/bip-0032/', title: 'BIP-32: HD 錢包', type: 'bip' },
      { href: '/bips/bip-0039/', title: 'BIP-39: 助記詞', type: 'bip' },
      { href: '/bips/bip-0044/', title: 'BIP-44: 多帳戶結構', type: 'bip' },
      { href: '/bips/bip-0084/', title: 'BIP-84: Native SegWit', type: 'bip' },
      { href: '/learn/basics/wallet-guide/', title: '錢包使用指南', type: 'article' },
      { href: '/learn/basics/security-basics/', title: '安全基礎', type: 'article' },
    ],
    relatedBips: [32, 39, 44, 84, 49],
    keywords: ['HD 錢包', '助記詞', '種子', '派生路徑', 'BIP32', 'BIP39'],
  },
  {
    id: 'segwit',
    name: 'SegWit',
    description: '隔離見證升級',
    pillarPage: '/bips/bip-0141/',
    relatedPages: [
      { href: '/bips/bip-0141/', title: 'BIP-141: SegWit 共識', type: 'bip' },
      { href: '/bips/bip-0143/', title: 'BIP-143: 交易簽名', type: 'bip' },
      { href: '/bips/bip-0144/', title: 'BIP-144: 網路序列化', type: 'bip' },
      { href: '/bips/bip-0173/', title: 'BIP-173: Bech32 地址', type: 'bip' },
      { href: '/learn/intermediate/address-types/', title: '地址類型詳解', type: 'article' },
      { href: '/learn/intermediate/transaction-structure/', title: '交易結構', type: 'article' },
    ],
    relatedBips: [141, 143, 144, 173],
    keywords: ['SegWit', '隔離見證', 'Bech32', 'bc1', '交易延展性'],
  },
  {
    id: 'taproot',
    name: 'Taproot',
    description: 'Taproot/Schnorr 升級',
    pillarPage: '/learn/advanced/taproot/',
    relatedPages: [
      { href: '/learn/advanced/taproot/', title: 'Taproot 詳解', type: 'article' },
      { href: '/learn/advanced/schnorr-signatures/', title: 'Schnorr 簽名', type: 'article' },
      { href: '/bips/bip-0340/', title: 'BIP-340: Schnorr', type: 'bip' },
      { href: '/bips/bip-0341/', title: 'BIP-341: Taproot', type: 'bip' },
      { href: '/bips/bip-0342/', title: 'BIP-342: Tapscript', type: 'bip' },
      { href: '/bips/bip-0350/', title: 'BIP-350: Bech32m', type: 'bip' },
      { href: '/learn/advanced/musig2/', title: 'MuSig2 多簽', type: 'article' },
    ],
    relatedBips: [340, 341, 342, 350],
    keywords: ['Taproot', 'Schnorr', 'MAST', 'bc1p', 'Tapscript'],
  },
  {
    id: 'transactions',
    name: '交易',
    description: '比特幣交易結構與處理',
    pillarPage: '/learn/intermediate/transaction-structure/',
    relatedPages: [
      { href: '/learn/intermediate/transaction-structure/', title: '交易結構', type: 'article' },
      { href: '/learn/intermediate/utxo-model/', title: 'UTXO 模型', type: 'article' },
      { href: '/learn/intermediate/fee-estimation/', title: '手續費估算', type: 'article' },
      { href: '/learn/intermediate/rbf-cpfp/', title: 'RBF 與 CPFP', type: 'article' },
      { href: '/learn/intermediate/coin-selection/', title: 'Coin Selection', type: 'article' },
      { href: '/bips/bip-0125/', title: 'BIP-125: RBF', type: 'bip' },
      { href: '/tech/bitcoin-core/transaction/', title: '交易結構 (技術)', type: 'tech' },
    ],
    relatedBips: [125, 174, 370],
    keywords: ['交易', 'UTXO', '手續費', 'RBF', 'CPFP', 'vbyte'],
  },
  {
    id: 'scripting',
    name: '腳本系統',
    description: '比特幣腳本與智能合約',
    pillarPage: '/learn/intermediate/script-basics/',
    relatedPages: [
      { href: '/learn/intermediate/script-basics/', title: '腳本系統基礎', type: 'article' },
      { href: '/learn/advanced/script-language/', title: 'Script 語言', type: 'article' },
      { href: '/learn/advanced/miniscript/', title: 'Miniscript', type: 'article' },
      { href: '/learn/intermediate/timelock/', title: '時間鎖', type: 'article' },
      { href: '/learn/intermediate/multisig/', title: '多簽錢包', type: 'article' },
      { href: '/bips/bip-0065/', title: 'BIP-65: CLTV', type: 'bip' },
      { href: '/bips/bip-0068/', title: 'BIP-68: 相對時間鎖', type: 'bip' },
    ],
    relatedBips: [16, 65, 68, 112],
    keywords: ['Script', '腳本', 'OP_CODE', '時間鎖', 'CLTV', 'CSV'],
  },
  {
    id: 'psbt',
    name: 'PSBT',
    description: '部分簽名比特幣交易',
    pillarPage: '/learn/intermediate/psbt/',
    relatedPages: [
      { href: '/learn/intermediate/psbt/', title: 'PSBT 詳解', type: 'article' },
      { href: '/bips/bip-0174/', title: 'BIP-174: PSBT', type: 'bip' },
      { href: '/bips/bip-0370/', title: 'BIP-370: PSBT v2', type: 'bip' },
      { href: '/learn/intermediate/multisig/', title: '多簽錢包', type: 'article' },
      { href: '/learn/advanced/output-descriptors/', title: '輸出描述符', type: 'article' },
    ],
    relatedBips: [174, 370, 380, 381, 382, 383, 384, 385, 386],
    keywords: ['PSBT', '部分簽名', '硬體錢包', '多簽'],
  },
  {
    id: 'lightning',
    name: '閃電網路',
    description: 'Lightning Network 二層協議',
    pillarPage: '/learn/lightning/',
    relatedPages: [
      { href: '/learn/lightning/', title: '閃電網路概覽', type: 'article' },
      { href: '/learn/lightning/basics/', title: '閃電網路基礎', type: 'article' },
      { href: '/learn/lightning/channels/', title: '支付通道', type: 'article' },
      { href: '/learn/lightning/htlc/', title: 'HTLC', type: 'article' },
      { href: '/learn/lightning/routing/', title: '路由', type: 'article' },
      { href: '/learn/lightning/invoices/', title: '發票', type: 'article' },
      { href: '/tech/lightning/', title: '技術文檔', type: 'tech' },
      { href: '/tech/lightning/submarine-swaps/', title: 'Submarine Swaps', type: 'tech' },
      { href: '/tech/lightning/splicing/', title: 'Splicing', type: 'tech' },
      { href: '/tech/lightning/bolt12-offers/', title: 'BOLT12 Offers', type: 'tech' },
      { href: '/tech/lightning/taproot-channels/', title: 'Taproot Channels', type: 'tech' },
      { href: '/books/mastering-lightning/', title: '精通閃電網路', type: 'book' },
    ],
    relatedBips: [],
    keywords: ['閃電網路', 'Lightning', 'HTLC', '支付通道', 'BOLT', 'Submarine Swap', 'Splicing', 'BOLT12', 'Taproot'],
  },
  {
    id: 'nostr',
    name: 'Nostr',
    description: 'Nostr 去中心化協議',
    pillarPage: '/tech/nostr/',
    relatedPages: [
      { href: '/tech/nostr/', title: 'Nostr 概覽', type: 'tech' },
      { href: '/tech/nostr/protocol/', title: '協議基礎', type: 'tech' },
      { href: '/tech/nostr/nip-01/', title: 'NIP-01 基本協議', type: 'tech' },
      { href: '/tech/nostr/nip-02/', title: 'NIP-02 聯絡人列表', type: 'tech' },
      { href: '/tech/nostr/events/', title: '事件系統', type: 'tech' },
      { href: '/tech/nostr/keys/', title: '密鑰管理', type: 'tech' },
      { href: '/tech/nostr/nip-04/', title: 'NIP-04 加密私訊', type: 'tech' },
      { href: '/tech/nostr/nip-07/', title: 'NIP-07 瀏覽器擴充', type: 'tech' },
      { href: '/tech/nostr/nip-09/', title: 'NIP-09 事件刪除', type: 'tech' },
      { href: '/tech/nostr/nip-10/', title: 'NIP-10 回覆與標記', type: 'tech' },
      { href: '/tech/nostr/nip-11/', title: 'NIP-11 中繼器資訊', type: 'tech' },
      { href: '/tech/nostr/nip-19/', title: 'NIP-19 bech32 編碼', type: 'tech' },
      { href: '/tech/nostr/nip-23/', title: 'NIP-23 長文內容', type: 'tech' },
      { href: '/tech/nostr/nip-25/', title: 'NIP-25 反應', type: 'tech' },
      { href: '/tech/nostr/nip-42/', title: 'NIP-42 中繼器認證', type: 'tech' },
      { href: '/tech/nostr/relays/', title: '中繼器', type: 'tech' },
      { href: '/tech/nostr/nip-05/', title: 'NIP-05 域名驗證', type: 'tech' },
      { href: '/tech/nostr/nip-44/', title: 'NIP-44 加密訊息 v2', type: 'tech' },
      { href: '/tech/nostr/nip-46/', title: 'NIP-46 遠端簽名', type: 'tech' },
      { href: '/tech/nostr/nip-47/', title: 'NIP-47 錢包連接', type: 'tech' },
      { href: '/tech/nostr/nip-50/', title: 'NIP-50 搜尋', type: 'tech' },
      { href: '/tech/nostr/nip-57/', title: 'NIP-57 Zaps', type: 'tech' },
      { href: '/tech/nostr/nip-65/', title: 'NIP-65 中繼器列表', type: 'tech' },
      { href: '/tech/nostr/nip-94/', title: 'NIP-94 檔案中繼資料', type: 'tech' },
      { href: '/tech/nostr/nip-96/', title: 'NIP-96 檔案儲存', type: 'tech' },
      { href: '/tech/nostr/nip-98/', title: 'NIP-98 HTTP 認證', type: 'tech' },
      { href: '/tech/nostr/nip-51/', title: 'NIP-51 列表', type: 'tech' },
      { href: '/tech/nostr/nip-58/', title: 'NIP-58 徽章', type: 'tech' },
      { href: '/tech/nostr/nip-59/', title: 'NIP-59 禮物包裝', type: 'tech' },
      { href: '/tech/nostr/nip-13/', title: 'NIP-13 工作量證明', type: 'tech' },
      { href: '/tech/nostr/nip-40/', title: 'NIP-40 過期時間戳', type: 'tech' },
      { href: '/tech/nostr/nip-17/', title: 'NIP-17 私密訊息', type: 'tech' },
      { href: '/tech/nostr/nip-18/', title: 'NIP-18 轉發', type: 'tech' },
      { href: '/tech/nostr/nip-21/', title: 'NIP-21 nostr: URI', type: 'tech' },
      { href: '/tech/nostr/nip-28/', title: 'NIP-28 公開聊天', type: 'tech' },
      { href: '/tech/nostr/nip-29/', title: 'NIP-29 中繼器群組', type: 'tech' },
      { href: '/tech/nostr/nip-30/', title: 'NIP-30 自訂表情', type: 'tech' },
      { href: '/tech/nostr/nip-36/', title: 'NIP-36 敏感內容', type: 'tech' },
      { href: '/tech/nostr/nip-90/', title: 'NIP-90 資料販賣機', type: 'tech' },
      { href: '/tech/nostr/nip-56/', title: 'NIP-56 舉報', type: 'tech' },
      { href: '/tech/nostr/nip-32/', title: 'NIP-32 標籤系統', type: 'tech' },
      { href: '/tech/nostr/nip-38/', title: 'NIP-38 用戶狀態', type: 'tech' },
      { href: '/tech/nostr/nip-53/', title: 'NIP-53 直播活動', type: 'tech' },
      { href: '/tech/nostr/nip-75/', title: 'NIP-75 Zap 目標', type: 'tech' },
      { href: '/tech/nostr/nip-52/', title: 'NIP-52 日曆活動', type: 'tech' },
      { href: '/tech/nostr/nip-84/', title: 'NIP-84 精選標記', type: 'tech' },
      { href: '/tech/nostr/nip-89/', title: 'NIP-89 應用處理器', type: 'tech' },
      { href: '/tech/nostr/nip-71/', title: 'NIP-71 影片事件', type: 'tech' },
      { href: '/tech/nostr/nip-39/', title: 'NIP-39 外部身份', type: 'tech' },
      { href: '/tech/nostr/nip-72/', title: 'NIP-72 審核社群', type: 'tech' },
      { href: '/tech/nostr/nip-78/', title: 'NIP-78 應用程式資料', type: 'tech' },
      { href: '/tech/nostr/nip-06/', title: 'NIP-06 助記詞派生', type: 'tech' },
      { href: '/tech/nostr/nip-22/', title: 'NIP-22 評論', type: 'tech' },
      { href: '/tech/nostr/nip-49/', title: 'NIP-49 私鑰加密', type: 'tech' },
    ],
    relatedBips: [],
    keywords: ['Nostr', 'NIP', '中繼器', '事件', 'Zaps', 'npub', 'nsec', 'bech32', 'NIP-02', 'NIP-13', 'NIP-17', 'NIP-18', 'NIP-21', 'NIP-28', 'NIP-29', 'NIP-30', 'NIP-32', 'NIP-36', 'NIP-38', 'NIP-40', 'NIP-42', 'NIP-44', 'NIP-07', 'NIP-09', 'NIP-10', 'NIP-11', 'NIP-25', 'NIP-46', 'NIP-47', 'NIP-50', 'NIP-51', 'NIP-52', 'NIP-53', 'NIP-56', 'NIP-58', 'NIP-59', 'NIP-65', 'NIP-75', 'NIP-84', 'NIP-90', 'NIP-94', 'NIP-96', 'NIP-98', '加密', '瀏覽器擴充', '遠端簽名', 'Nostr Connect', 'Wallet Connect', 'NWC', '反應', '回覆', '對話串', '刪除', 'Outbox', '搜尋', '檔案上傳', '媒體', 'HTTP認證', 'Bearer', 'blurhash', 'imeta', '閃電網路錢包', '中繼器認證', 'AUTH', '聯絡人', '關注', 'petname', 'kind 3', '列表', '靜音', '書籤', '置頂', '徽章', 'badge', '成就', 'gift wrap', '禮物包裝', 'seal', '密封', '隱私', 'PoW', '工作量證明', 'nonce', '難度', 'expiration', '過期', '時間戳', 'repost', '轉發', '引用', 'NSFW', '敏感內容', 'content-warning', '私密訊息', 'private DM', 'rumor', 'nostr: URI', 'njump', '自訂表情', 'custom emoji', 'shortcode', '公開聊天', 'channel', '頻道', '群組', 'relay group', '私密群組', 'DVM', 'data vending machine', '資料販賣機', 'AI', '翻譯', '圖片生成', '舉報', 'report', 'kind 1984', '垃圾訊息', 'spam', '冒充', 'impersonation', '惡意軟體', 'malware', 'labeling', '標籤', 'taxonomy', 'kind 1985', '命名空間', 'namespace', 'user status', '用戶狀態', 'kind 30315', 'music', '音樂', 'general', 'live activities', '直播', 'streaming', 'kind 30311', 'kind 1311', 'live chat', '語音房', 'meeting', 'zap goals', '募資', 'crowdfunding', 'kind 9041', 'fundraising', 'millisats', 'calendar', '日曆', 'RSVP', 'kind 31922', 'kind 31923', 'kind 31925', 'geohash', '活動', 'event scheduling', 'highlights', '精選', 'kind 9802', 'annotation', '標記', 'quote', 'NIP-89', 'application handler', '應用處理器', 'kind 31989', 'kind 31990', 'app discovery', '應用發現', 'recommendation', 'handler info', 'NIP-71', 'video', '影片', 'kind 21', 'kind 22', 'short video', '短影音', 'imeta', 'text-track', 'segment', '章節', 'WebVTT', '字幕', 'NIP-39', 'external identity', '外部身份', 'github', 'twitter', 'mastodon', 'telegram', 'identity verification', '身份驗證', 'i tag', 'NIP-72', 'moderated community', '審核社群', 'kind 34550', 'kind 4550', 'kind 1111', 'moderator', '版主', 'approval', '批准', 'community post', 'NIP-78', 'app data', '應用程式資料', 'kind 30078', 'custom data', '自訂資料', 'user preferences', '用戶設定', 'storage', '儲存', 'NIP-06', 'mnemonic', '助記詞', 'BIP-39', 'BIP-32', 'seed phrase', '種子', 'HD wallet', '派生路徑', 'key derivation', 'NIP-22', 'comment', '評論', 'kind 1111', 'threaded', '討論串', 'reply', 'NIP-49', 'ncryptsec', '私鑰加密', 'scrypt', 'XChaCha20', 'password encryption', '密碼加密'],
  },
];

/**
 * Get related content for a given page path
 */
export function getRelatedContent(
  currentPath: string,
  limit: number = 5
): TopicCluster['relatedPages'] {
  // Find clusters that contain this page
  const relevantClusters = topicClusters.filter(
    (cluster) =>
      cluster.pillarPage === currentPath ||
      cluster.relatedPages.some((page) => page.href === currentPath)
  );

  if (relevantClusters.length === 0) {
    return [];
  }

  // Collect all related pages from relevant clusters, excluding current page
  const allRelated = relevantClusters
    .flatMap((cluster) => cluster.relatedPages)
    .filter((page) => page.href !== currentPath);

  // Remove duplicates
  const uniqueRelated = allRelated.filter(
    (page, index, self) => index === self.findIndex((p) => p.href === page.href)
  );

  return uniqueRelated.slice(0, limit);
}

/**
 * Get cluster by ID
 */
export function getClusterById(id: string): TopicCluster | undefined {
  return topicClusters.find((cluster) => cluster.id === id);
}

/**
 * Get clusters that contain a specific BIP
 */
export function getClustersByBip(bipNumber: number): TopicCluster[] {
  return topicClusters.filter((cluster) => cluster.relatedBips.includes(bipNumber));
}

/**
 * Get all keywords for SEO
 */
export function getAllKeywords(): string[] {
  const allKeywords = topicClusters.flatMap((cluster) => cluster.keywords);
  return [...new Set(allKeywords)];
}
