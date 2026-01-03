/**
 * NIP (Nostr Implementation Possibilities) data
 * Centralized metadata for all NIP pages
 */

export interface NIP {
  number: number;
  title: string;
  titleZh: string;
  status: 'Draft' | 'Final' | 'Deprecated' | 'Optional' | 'Recommended';
  category: 'core' | 'identity' | 'messaging' | 'content' | 'relay' | 'client' | 'payment' | 'other';
  summary: string;
  importance?: 'fundamental' | 'critical' | 'important' | 'standard';
}

export const nips: NIP[] = [
  // Core Protocol
  {
    number: 1,
    title: 'Basic protocol flow description',
    titleZh: '基本協議',
    status: 'Final',
    category: 'core',
    summary: '事件格式、簽名驗證和客戶端-中繼器通訊的基礎規範。',
    importance: 'fundamental',
  },
  {
    number: 2,
    title: 'Follow List',
    titleZh: '關注列表',
    status: 'Final',
    category: 'core',
    summary: 'Kind 3 關注列表事件和推薦中繼器的規範。',
    importance: 'fundamental',
  },
  {
    number: 3,
    title: 'OpenTimestamps Attestations',
    titleZh: 'OpenTimestamps 證明',
    status: 'Draft',
    category: 'other',
    summary: '使用 OpenTimestamps 為事件提供時間戳證明。',
  },
  {
    number: 4,
    title: 'Encrypted Direct Message',
    titleZh: '加密私訊',
    status: 'Deprecated',
    category: 'messaging',
    summary: '（已棄用）使用 NIP-04 加密的私人訊息。建議使用 NIP-44。',
    importance: 'important',
  },
  {
    number: 5,
    title: 'Mapping Nostr keys to DNS-based identifiers',
    titleZh: '域名驗證',
    status: 'Final',
    category: 'identity',
    summary: '將 Nostr 公鑰映射到網域名稱（如 user@domain.com）。',
    importance: 'critical',
  },
  {
    number: 6,
    title: 'Basic key derivation from mnemonic',
    titleZh: '助記詞密鑰派生',
    status: 'Final',
    category: 'identity',
    summary: '從 BIP-39 助記詞派生 Nostr 密鑰。',
    importance: 'important',
  },
  {
    number: 7,
    title: 'window.nostr capability',
    titleZh: '瀏覽器擴展',
    status: 'Final',
    category: 'client',
    summary: '瀏覽器擴展提供簽名功能的標準接口。',
    importance: 'critical',
  },
  {
    number: 9,
    title: 'Event Deletion Request',
    titleZh: '事件刪除請求',
    status: 'Final',
    category: 'core',
    summary: 'Kind 5 事件刪除請求的規範。',
    importance: 'important',
  },
  {
    number: 10,
    title: 'Conventions for clients\' use of e and p tags',
    titleZh: '回覆標記規範',
    status: 'Final',
    category: 'core',
    summary: '客戶端使用 e 和 p 標籤處理回覆和引用的規範。',
    importance: 'important',
  },
  {
    number: 11,
    title: 'Relay Information Document',
    titleZh: '中繼器資訊',
    status: 'Final',
    category: 'relay',
    summary: '中繼器通過 HTTP 提供元數據的規範。',
    importance: 'important',
  },
  {
    number: 13,
    title: 'Proof of Work',
    titleZh: '工作量證明',
    status: 'Final',
    category: 'other',
    summary: '使用工作量證明防止垃圾訊息。',
  },
  {
    number: 15,
    title: 'Nostr Marketplace',
    titleZh: '市集',
    status: 'Draft',
    category: 'content',
    summary: '在 Nostr 上建立去中心化市集。',
  },
  {
    number: 17,
    title: 'Private Direct Messages',
    titleZh: '私人訊息',
    status: 'Draft',
    category: 'messaging',
    summary: '改進的端對端加密私人訊息協議。',
    importance: 'important',
  },
  {
    number: 18,
    title: 'Reposts',
    titleZh: '轉發',
    status: 'Final',
    category: 'content',
    summary: 'Kind 6 轉發事件的規範。',
  },
  {
    number: 19,
    title: 'bech32-encoded entities',
    titleZh: 'Bech32 編碼',
    status: 'Final',
    category: 'identity',
    summary: 'npub/nsec/note 等 Bech32 編碼的規範。',
    importance: 'critical',
  },
  {
    number: 21,
    title: 'nostr: URI scheme',
    titleZh: 'URI 協議',
    status: 'Final',
    category: 'identity',
    summary: 'nostr: URI 協議的規範。',
  },
  {
    number: 22,
    title: 'Comment',
    titleZh: '評論',
    status: 'Draft',
    category: 'content',
    summary: '對任何內容發表評論的規範。',
  },
  {
    number: 23,
    title: 'Long-form Content',
    titleZh: '長文內容',
    status: 'Final',
    category: 'content',
    summary: 'Kind 30023 長篇文章的規範。',
    importance: 'important',
  },
  {
    number: 25,
    title: 'Reactions',
    titleZh: '反應',
    status: 'Final',
    category: 'content',
    summary: 'Kind 7 反應事件（按讚、表情）的規範。',
    importance: 'important',
  },
  {
    number: 26,
    title: 'Delegated Event Signing',
    titleZh: '委託簽名',
    status: 'Draft',
    category: 'identity',
    summary: '允許其他密鑰代為簽署事件。',
  },
  {
    number: 27,
    title: 'Text Note References',
    titleZh: '文本引用',
    status: 'Final',
    category: 'content',
    summary: '在純文本中引用其他事件和用戶。',
  },
  {
    number: 28,
    title: 'Public Chat',
    titleZh: '公開聊天',
    status: 'Final',
    category: 'messaging',
    summary: 'Kind 40-44 公開聊天室的規範。',
  },
  {
    number: 29,
    title: 'Relay-based Groups',
    titleZh: '群組',
    status: 'Draft',
    category: 'messaging',
    summary: '基於中繼器的群組功能。',
  },
  {
    number: 30,
    title: 'Custom Emoji',
    titleZh: '自訂表情',
    status: 'Final',
    category: 'content',
    summary: '在事件中使用自訂表情符號。',
  },
  {
    number: 32,
    title: 'Labeling',
    titleZh: '標籤系統',
    status: 'Draft',
    category: 'content',
    summary: '為內容添加標籤和分類。',
  },
  {
    number: 33,
    title: 'Parameterized Replaceable Events',
    titleZh: '參數化可替換事件',
    status: 'Final',
    category: 'core',
    summary: '帶參數的可替換事件規範（Kind 30000-39999）。',
    importance: 'important',
  },
  {
    number: 34,
    title: 'git stuff',
    titleZh: 'Git 整合',
    status: 'Draft',
    category: 'other',
    summary: '在 Nostr 上託管 Git 儲存庫。',
  },
  {
    number: 35,
    title: 'Torrents',
    titleZh: '種子',
    status: 'Draft',
    category: 'content',
    summary: '在 Nostr 上分享 BitTorrent 種子。',
  },
  {
    number: 36,
    title: 'Sensitive Content',
    titleZh: '敏感內容',
    status: 'Final',
    category: 'content',
    summary: '標記敏感或 NSFW 內容。',
  },
  {
    number: 38,
    title: 'User Statuses',
    titleZh: '用戶狀態',
    status: 'Draft',
    category: 'content',
    summary: '用戶當前狀態（音樂、活動等）。',
  },
  {
    number: 39,
    title: 'External Identities',
    titleZh: '外部身份',
    status: 'Final',
    category: 'identity',
    summary: '連結 GitHub、Twitter 等外部身份。',
  },
  {
    number: 40,
    title: 'Expiration Timestamp',
    titleZh: '過期時間',
    status: 'Final',
    category: 'core',
    summary: '設定事件的過期時間。',
  },
  {
    number: 42,
    title: 'Authentication of clients to relays',
    titleZh: '客戶端認證',
    status: 'Final',
    category: 'relay',
    summary: '客戶端向中繼器進行身份驗證。',
    importance: 'important',
  },
  {
    number: 44,
    title: 'Versioned Encryption',
    titleZh: '版本化加密',
    status: 'Final',
    category: 'messaging',
    summary: '改進的加密訊息標準，取代 NIP-04。',
    importance: 'critical',
  },
  {
    number: 45,
    title: 'Counting results',
    titleZh: '計數結果',
    status: 'Draft',
    category: 'relay',
    summary: '中繼器提供事件計數功能。',
  },
  {
    number: 46,
    title: 'Nostr Connect',
    titleZh: 'Nostr Connect',
    status: 'Final',
    category: 'client',
    summary: '遠程簽名協議，類似 WalletConnect。',
    importance: 'important',
  },
  {
    number: 47,
    title: 'Nostr Wallet Connect',
    titleZh: '錢包連接',
    status: 'Final',
    category: 'payment',
    summary: '通過 Nostr 連接閃電錢包。',
    importance: 'critical',
  },
  {
    number: 48,
    title: 'Proxy Tags',
    titleZh: '代理標籤',
    status: 'Draft',
    category: 'other',
    summary: '標記從其他協議橋接的內容。',
  },
  {
    number: 49,
    title: 'Private Key Encryption',
    titleZh: '私鑰加密',
    status: 'Final',
    category: 'identity',
    summary: '使用密碼加密私鑰的規範。',
    importance: 'important',
  },
  {
    number: 50,
    title: 'Search Capability',
    titleZh: '搜尋功能',
    status: 'Draft',
    category: 'relay',
    summary: '中繼器搜尋事件的能力。',
  },
  {
    number: 51,
    title: 'Lists',
    titleZh: '列表',
    status: 'Final',
    category: 'content',
    summary: '各種列表（靜音、書籤、置頂等）。',
    importance: 'important',
  },
  {
    number: 52,
    title: 'Calendar Events',
    titleZh: '日曆事件',
    status: 'Draft',
    category: 'content',
    summary: '在 Nostr 上發布日曆事件。',
  },
  {
    number: 53,
    title: 'Live Activities',
    titleZh: '直播',
    status: 'Draft',
    category: 'content',
    summary: '直播和即時活動的規範。',
  },
  {
    number: 54,
    title: 'Wiki',
    titleZh: 'Wiki',
    status: 'Draft',
    category: 'content',
    summary: '去中心化 Wiki 的規範。',
  },
  {
    number: 55,
    title: 'Android Signer Application',
    titleZh: 'Android 簽名器',
    status: 'Final',
    category: 'client',
    summary: 'Android 上的簽名應用程式規範。',
  },
  {
    number: 56,
    title: 'Reporting',
    titleZh: '舉報',
    status: 'Final',
    category: 'content',
    summary: '舉報不當內容的規範。',
  },
  {
    number: 57,
    title: 'Lightning Zaps',
    titleZh: '閃電打賞',
    status: 'Final',
    category: 'payment',
    summary: '使用閃電網路打賞的規範。',
    importance: 'critical',
  },
  {
    number: 58,
    title: 'Badges',
    titleZh: '徽章',
    status: 'Final',
    category: 'content',
    summary: '用戶徽章和成就系統。',
  },
  {
    number: 59,
    title: 'Gift Wrap',
    titleZh: '禮物包裝',
    status: 'Final',
    category: 'messaging',
    summary: '隱藏事件元數據的加密包裝。',
    importance: 'important',
  },
  {
    number: 60,
    title: 'Cashu Wallet',
    titleZh: 'Cashu 錢包',
    status: 'Draft',
    category: 'payment',
    summary: '在 Nostr 上整合 Cashu 電子現金。',
  },
  {
    number: 61,
    title: 'Nutzaps',
    titleZh: 'Nutzaps',
    status: 'Draft',
    category: 'payment',
    summary: '使用 Cashu 進行打賞。',
  },
  {
    number: 65,
    title: 'Relay List Metadata',
    titleZh: '中繼器列表',
    status: 'Final',
    category: 'relay',
    summary: '用戶偏好的中繼器列表。',
    importance: 'important',
  },
  {
    number: 70,
    title: 'Protected Events',
    titleZh: '受保護事件',
    status: 'Draft',
    category: 'relay',
    summary: '中繼器保護特定事件不被覆蓋。',
  },
  {
    number: 71,
    title: 'Video Events',
    titleZh: '視頻事件',
    status: 'Draft',
    category: 'content',
    summary: '在 Nostr 上發布視頻內容。',
  },
  {
    number: 72,
    title: 'Moderated Communities',
    titleZh: '審核社群',
    status: 'Draft',
    category: 'content',
    summary: '帶審核功能的社群規範。',
  },
  {
    number: 73,
    title: 'External Content IDs',
    titleZh: '外部內容 ID',
    status: 'Draft',
    category: 'content',
    summary: '引用外部平台內容的規範。',
  },
  {
    number: 75,
    title: 'Zap Goals',
    titleZh: '打賞目標',
    status: 'Draft',
    category: 'payment',
    summary: '眾籌和打賞目標的規範。',
  },
  {
    number: 78,
    title: 'Application-specific data',
    titleZh: '應用數據',
    status: 'Draft',
    category: 'other',
    summary: '應用程式專用數據的規範。',
  },
  {
    number: 84,
    title: 'Highlights',
    titleZh: '重點標記',
    status: 'Draft',
    category: 'content',
    summary: '標記和分享內容重點。',
  },
  {
    number: 89,
    title: 'Recommended Application Handlers',
    titleZh: '應用處理器',
    status: 'Draft',
    category: 'client',
    summary: '推薦處理不同事件類型的應用。',
  },
  {
    number: 90,
    title: 'Data Vending Machines',
    titleZh: '數據販賣機',
    status: 'Draft',
    category: 'other',
    summary: '付費數據服務的規範。',
  },
  {
    number: 92,
    title: 'Media Attachments',
    titleZh: '媒體附件',
    status: 'Draft',
    category: 'content',
    summary: '附加媒體文件的規範。',
  },
  {
    number: 94,
    title: 'File Metadata',
    titleZh: '文件元數據',
    status: 'Final',
    category: 'content',
    summary: '文件的元數據規範。',
  },
  {
    number: 96,
    title: 'HTTP File Storage Integration',
    titleZh: 'HTTP 文件存儲',
    status: 'Final',
    category: 'content',
    summary: '通過 HTTP 上傳和存儲文件。',
  },
  {
    number: 98,
    title: 'HTTP Auth',
    titleZh: 'HTTP 認證',
    status: 'Final',
    category: 'identity',
    summary: '使用 Nostr 進行 HTTP 認證。',
  },
  {
    number: 99,
    title: 'Classified Listings',
    titleZh: '分類廣告',
    status: 'Draft',
    category: 'content',
    summary: '發布分類廣告的規範。',
  },
];

/**
 * Get a NIP by number
 */
export function getNIP(number: number): NIP | undefined {
  return nips.find((nip) => nip.number === number);
}

/**
 * Get NIPs by category
 */
export function getNIPsByCategory(category: NIP['category']): NIP[] {
  return nips.filter((nip) => nip.category === category);
}

/**
 * Get NIPs by status
 */
export function getNIPsByStatus(status: NIP['status']): NIP[] {
  return nips.filter((nip) => nip.status === status);
}

/**
 * Get important NIPs
 */
export function getImportantNIPs(): NIP[] {
  return nips.filter((nip) => nip.importance);
}

/**
 * NIP category labels in Chinese
 */
export const nipCategoryLabels: Record<NIP['category'], string> = {
  core: '核心協議',
  identity: '身份',
  messaging: '訊息',
  content: '內容',
  relay: '中繼器',
  client: '客戶端',
  payment: '支付',
  other: '其他',
};

/**
 * NIP status labels in Chinese
 */
export const nipStatusLabels: Record<NIP['status'], string> = {
  Draft: '草案',
  Final: '正式',
  Deprecated: '已棄用',
  Optional: '可選',
  Recommended: '推薦',
};
