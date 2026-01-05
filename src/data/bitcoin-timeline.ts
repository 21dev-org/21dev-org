// 比特幣大事件數據結構
export interface BitcoinMilestone {
  id: string;
  date: string; // 格式: "YYYY-MM-DD"
  title: string;
  titleEn?: string;
  description: string;
  category: 'genesis' | 'technical' | 'adoption' | 'regulatory' | 'market' | 'community';
  significance: 'critical' | 'major' | 'notable';
  relatedBips?: string[];
  links?: {
    label: string;
    url: string;
  }[];
  blockHeight?: number;
}

// 特殊節日數據結構
export interface BitcoinHoliday {
  id: string;
  date: string; // 格式: "MM-DD" (每年固定日期)
  name: string;
  nameEn?: string;
  description: string;
  origin?: string;
  icon?: string;
  celebrationIdeas?: string[];
}

// 比特幣歷史大事件
export const bitcoinMilestones: BitcoinMilestone[] = [
  // ===== 前比特幣時代 (Pre-Bitcoin Era) =====
  {
    id: 'chaum-blind-signatures',
    date: '1983-01-01',
    title: 'David Chaum 發明盲簽名',
    titleEn: 'David Chaum Invents Blind Signatures',
    description:
      '密碼學家 David Chaum 發表盲簽名論文，提出匿名電子支付的密碼學基礎，奠定數位隱私貨幣的理論基礎。',
    category: 'genesis',
    significance: 'notable',
    links: [{ label: '了解 David Chaum', url: '/figures/david-chaum' }],
  },
  {
    id: 'digicash',
    date: '1989-01-01',
    title: 'DigiCash 成立',
    titleEn: 'DigiCash Founded',
    description:
      '密碼學家 David Chaum 創立 DigiCash 公司，開發首個基於密碼學的電子現金系統 eCash，奠定了數位貨幣的概念基礎。',
    category: 'genesis',
    significance: 'notable',
    links: [{ label: '了解 David Chaum', url: '/figures/david-chaum' }],
  },
  {
    id: 'cypherpunks-list',
    date: '1992-09-22',
    title: '密碼龐克郵件列表成立',
    titleEn: 'Cypherpunks Mailing List Founded',
    description:
      'Eric Hughes、Timothy May 和 John Gilmore 創立密碼龐克郵件列表，成為推動隱私技術和數位貨幣研究的重要社群。',
    category: 'genesis',
    significance: 'major',
  },
  {
    id: 'cypherpunk-manifesto',
    date: '1993-03-09',
    title: '密碼龐克宣言',
    titleEn: "A Cypherpunk's Manifesto",
    description:
      'Eric Hughes 發表《密碼龐克宣言》，宣告「隱私是電子時代開放社會的必要條件」，為比特幣的哲學理念奠定基礎。',
    category: 'genesis',
    significance: 'major',
    links: [{ label: '閱讀宣言', url: 'https://www.activism.net/cypherpunk/manifesto.html' }],
  },
  {
    id: 'hashcash',
    date: '1997-03-28',
    title: 'HashCash 發明',
    titleEn: 'HashCash Invented',
    description:
      'Adam Back 發明 HashCash，使用工作量證明（Proof of Work）來對抗垃圾郵件。這個概念後來成為比特幣挖礦的核心技術。',
    category: 'genesis',
    significance: 'critical',
    links: [{ label: '了解 Adam Back', url: '/figures/adam-back' }],
  },
  {
    id: 'b-money',
    date: '1998-11-01',
    title: 'b-money 提案',
    titleEn: 'b-money Proposal',
    description:
      'Wei Dai 在密碼龐克郵件列表發布 b-money 提案，描述了一個匿名、分散式的電子現金系統，影響了比特幣的設計。',
    category: 'genesis',
    significance: 'major',
    links: [{ label: '了解 Wei Dai', url: '/figures/wei-dai' }],
  },
  {
    id: 'bit-gold',
    date: '1998-12-01',
    title: 'Bit Gold 構想',
    titleEn: 'Bit Gold Conception',
    description:
      'Nick Szabo 提出 Bit Gold 概念，結合工作量證明和數位稀缺性，被認為是比特幣最直接的前身。',
    category: 'genesis',
    significance: 'major',
    links: [{ label: '了解 Nick Szabo', url: '/figures/nick-szabo' }],
  },
  {
    id: 'rpow',
    date: '2004-08-15',
    title: 'RPOW 系統發布',
    titleEn: 'RPOW System Released',
    description:
      'Hal Finney 發布 Reusable Proofs of Work (RPOW) 系統，首次實現了可轉讓的工作量證明代幣。',
    category: 'genesis',
    significance: 'major',
    links: [{ label: '了解 Hal Finney', url: '/figures/hal-finney' }],
  },

  // ===== 2008 =====
  {
    id: 'domain-registered',
    date: '2008-08-18',
    title: 'bitcoin.org 域名註冊',
    titleEn: 'bitcoin.org Domain Registered',
    description: 'bitcoin.org 域名透過 anonymousspeech.com 匿名註冊，為比特幣的誕生做準備。',
    category: 'genesis',
    significance: 'major',
  },
  {
    id: 'whitepaper',
    date: '2008-10-31',
    title: '比特幣白皮書發布',
    titleEn: 'Bitcoin Whitepaper Published',
    description:
      '中本聰在密碼學郵件列表發布《Bitcoin: A Peer-to-Peer Electronic Cash System》，奠定了比特幣的理論基礎。',
    category: 'genesis',
    significance: 'critical',
    links: [
      { label: '閱讀白皮書', url: '/books/whitepapers' },
      { label: '了解中本聰', url: '/figures/satoshi-nakamoto' },
    ],
  },

  // ===== 2009 =====
  {
    id: 'genesis-block',
    date: '2009-01-03',
    title: '創世區塊誕生',
    titleEn: 'Genesis Block Mined',
    description:
      '中本聰挖出創世區塊（Block 0），區塊內包含當天《泰晤士報》頭條：「Chancellor on brink of second bailout for banks」。',
    category: 'genesis',
    significance: 'critical',
    blockHeight: 0,
  },
  {
    id: 'first-version',
    date: '2009-01-09',
    title: 'Bitcoin v0.1 發布',
    titleEn: 'Bitcoin v0.1 Released',
    description: '中本聰在 SourceForge 發布比特幣軟體的首個版本 Bitcoin v0.1.0，僅支援 Windows 系統。',
    category: 'genesis',
    significance: 'critical',
  },
  {
    id: 'first-transaction',
    date: '2009-01-12',
    title: '首筆比特幣交易',
    titleEn: 'First Bitcoin Transaction',
    description:
      '中本聰向 Hal Finney 發送 10 BTC，這是區塊鏈上第一筆 P2P 比特幣交易。Hal Finney 發出經典推文 "Running bitcoin"。',
    category: 'genesis',
    significance: 'critical',
    blockHeight: 170,
    links: [{ label: '了解 Hal Finney', url: '/figures/hal-finney' }],
  },
  {
    id: 'first-exchange-rate',
    date: '2009-10-05',
    title: '首次匯率定價',
    titleEn: 'First Exchange Rate',
    description:
      'New Liberty Standard 發布首個比特幣匯率：1 美元 = 1,309.03 BTC，基於挖礦電力成本計算。',
    category: 'market',
    significance: 'major',
  },
  {
    id: 'first-btc-fiat',
    date: '2009-10-12',
    title: '首筆法幣交易',
    titleEn: 'First Fiat Transaction',
    description: 'Martti Malmi 以 PayPal 向 NewLibertyStandard 出售 5,050 BTC，獲得 5.02 美元。',
    category: 'market',
    significance: 'major',
  },
  {
    id: 'bitcointalk-launch',
    date: '2009-11-22',
    title: 'Bitcointalk 論壇創立',
    titleEn: 'Bitcointalk Forum Launched',
    description:
      '中本聰創立 Bitcointalk 論壇（原 Bitcoin Forum），成為比特幣社群最重要的討論平台，至今仍是重要的歷史資料來源。',
    category: 'community',
    significance: 'major',
    links: [{ label: 'Bitcointalk 論壇', url: 'https://bitcointalk.org' }],
  },

  // ===== 2010 =====
  {
    id: 'btc-version-0.2',
    date: '2010-01-09',
    title: 'Bitcoin v0.2 發布',
    titleEn: 'Bitcoin v0.2 Released',
    description:
      '中本聰發布 Bitcoin v0.2，新增 Linux 支援，讓更多開發者能參與比特幣網路。',
    category: 'technical',
    significance: 'notable',
  },
  {
    id: 'bitcoin-market',
    date: '2010-02-06',
    title: '首個比特幣交易所',
    titleEn: 'First Bitcoin Exchange',
    description: 'Bitcoin Market 成立，成為第一個比特幣交易所，提供 PayPal 支付。',
    category: 'market',
    significance: 'major',
  },
  {
    id: 'gavin-lead-dev',
    date: '2010-05-17',
    title: 'Gavin Andresen 成為首席開發者',
    titleEn: 'Gavin Andresen Becomes Lead Developer',
    description:
      'Laszlo Hanyecz 將比特幣提醒系統的控制權交給 Gavin Andresen，中本聰開始信任他處理更多開發工作。',
    category: 'community',
    significance: 'notable',
  },
  {
    id: 'pizza-day',
    date: '2010-05-22',
    title: 'Bitcoin Pizza Day',
    titleEn: 'Bitcoin Pizza Day',
    description:
      'Laszlo Hanyecz 用 10,000 BTC 購買了兩個披薩，這是比特幣首次被用於實際商品交易，開創了比特幣作為支付手段的歷史。',
    category: 'adoption',
    significance: 'critical',
  },
  {
    id: 'mtgox-launch',
    date: '2010-07-17',
    title: 'Mt.Gox 交易所成立',
    titleEn: 'Mt.Gox Exchange Launched',
    description:
      'Jed McCaleb 創立 Mt.Gox 比特幣交易所，後來成為當時最大的比特幣交易平台，處理全球約 70% 的比特幣交易。',
    category: 'market',
    significance: 'major',
  },
  {
    id: 'value-overflow',
    date: '2010-08-15',
    title: '價值溢出漏洞',
    titleEn: 'Value Overflow Bug',
    description:
      '發現並修復了一個嚴重的整數溢出漏洞，該漏洞曾導致 1,844 億枚比特幣被意外創建。軟分叉在數小時內解決。',
    category: 'technical',
    significance: 'major',
    blockHeight: 74638,
  },
  {
    id: 'gpu-mining',
    date: '2010-09-18',
    title: '首個 GPU 挖礦',
    titleEn: 'First GPU Mining',
    description: '首個公開的 GPU 挖礦軟體發布，開啟挖礦硬體軍備競賽的序幕。',
    category: 'technical',
    significance: 'notable',
  },
  {
    id: 'slush-pool',
    date: '2010-11-27',
    title: '首個礦池成立',
    titleEn: 'First Mining Pool',
    description: 'Slush Pool（原 Bitcoin.cz Mining）成為第一個比特幣礦池，讓小型礦工能穩定獲得收益。',
    category: 'technical',
    significance: 'major',
  },
  {
    id: 'wikileaks-btc',
    date: '2010-12-04',
    title: 'WikiLeaks 事件與比特幣',
    titleEn: 'WikiLeaks and Bitcoin',
    description:
      '維基解密遭到 PayPal、Visa、Mastercard 等金融機構封鎖後，社群討論是否應接受比特幣捐贈。中本聰反對這樣做，擔心過早引起政府關注。',
    category: 'community',
    significance: 'notable',
  },
  {
    id: 'satoshi-last-post',
    date: '2010-12-12',
    title: '中本聰最後論壇發言',
    titleEn: "Satoshi's Last Forum Post",
    description:
      '中本聰在 Bitcointalk 論壇發表最後一篇公開文章，此後逐漸淡出公眾視野，將比特幣交給社群。',
    category: 'community',
    significance: 'critical',
  },

  // ===== 2011 =====
  {
    id: 'eff-accepts-btc',
    date: '2011-01-19',
    title: '電子前線基金會接受比特幣',
    titleEn: 'EFF Accepts Bitcoin',
    description:
      '電子前線基金會（EFF）開始接受比特幣捐款，成為首批接受比特幣的知名非營利組織之一。',
    category: 'adoption',
    significance: 'notable',
  },
  {
    id: 'parity-with-usd',
    date: '2011-02-09',
    title: '比特幣首次達到 1 美元',
    titleEn: 'Bitcoin Reaches $1 USD',
    description: '比特幣價格首次與美元平價，達到 1 BTC = 1 USD 的里程碑。',
    category: 'market',
    significance: 'major',
  },
  {
    id: 'time-cover',
    date: '2011-04-16',
    title: '《時代》雜誌報導比特幣',
    titleEn: 'TIME Magazine Covers Bitcoin',
    description:
      '《時代》雜誌發表文章介紹比特幣，標題為「Online Cash Bitcoin Could Challenge Governments」，首次將比特幣帶入主流媒體視野。',
    category: 'community',
    significance: 'notable',
  },
  {
    id: 'btc-gold-parity',
    date: '2011-06-01',
    title: '比特幣價值超越金價',
    titleEn: 'Bitcoin Exceeds Gold Price Per Ounce',
    description:
      '比特幣價格一度達到約 31 美元，首次超過每盎司黃金的價格（約 1,500 美元除以 50），引發「數位黃金」的討論。',
    category: 'market',
    significance: 'notable',
  },
  {
    id: 'silk-road',
    date: '2011-02-11',
    title: 'Silk Road 上線',
    titleEn: 'Silk Road Launches',
    description:
      '暗網市場 Silk Road 開始運營，使用比特幣作為唯一支付方式，引發關於比特幣匿名性的廣泛討論。',
    category: 'adoption',
    significance: 'major',
  },
  {
    id: 'satoshi-last-email',
    date: '2011-04-23',
    title: '中本聰最後郵件',
    titleEn: "Satoshi's Last Email",
    description:
      '中本聰發送最後一封已知郵件給開發者，表示已「轉向其他事情」，並將比特幣交給社群管理。',
    category: 'community',
    significance: 'critical',
  },
  {
    id: 'first-1000',
    date: '2011-06-08',
    title: '價格首次突破 30 美元',
    titleEn: 'Price Reaches $30',
    description: '比特幣價格首次突破 30 美元，在短短數月內從 1 美元飆升。',
    category: 'market',
    significance: 'notable',
  },
  {
    id: 'bip-process',
    date: '2011-08-19',
    title: 'BIP 流程建立',
    titleEn: 'BIP Process Established',
    description:
      'Amir Taaki 提出 BIP-0001，建立了比特幣改進提案（Bitcoin Improvement Proposals）流程，為協議升級提供標準化框架。',
    category: 'technical',
    significance: 'major',
    relatedBips: ['bip-0001'],
  },
  {
    id: 'litecoin-launch',
    date: '2011-10-07',
    title: 'Litecoin 誕生',
    titleEn: 'Litecoin Launched',
    description:
      'Charlie Lee 發布 Litecoin，作為比特幣的「白銀」替代品，採用 Scrypt 算法和更快的出塊時間。',
    category: 'community',
    significance: 'notable',
  },
  {
    id: 'gavin-cia',
    date: '2011-06-14',
    title: 'Gavin Andresen 向 CIA 介紹比特幣',
    titleEn: 'Gavin Andresen Presents to CIA',
    description:
      '比特幣首席開發者 Gavin Andresen 受邀向美國中央情報局介紹比特幣，這是比特幣首次進入美國政府視野。',
    category: 'regulatory',
    significance: 'notable',
  },
  {
    id: 'mtgox-hack-2011',
    date: '2011-06-19',
    title: 'Mt.Gox 遭駭客攻擊',
    titleEn: 'Mt.Gox Hacked',
    description:
      'Mt.Gox 交易所遭到駭客攻擊，比特幣價格在該平台瞬間從 17.50 美元跌至 0.01 美元，暴露了中心化交易所的風險。',
    category: 'market',
    significance: 'major',
  },

  // ===== 2012 =====
  {
    id: 'btc-magazine',
    date: '2012-05-01',
    title: 'Bitcoin Magazine 創刊',
    titleEn: 'Bitcoin Magazine Launched',
    description:
      '由 Vitalik Buterin 和 Mihai Alisie 共同創辦的《Bitcoin Magazine》創刊，成為首本專門報導比特幣的雜誌。',
    category: 'community',
    significance: 'notable',
  },
  {
    id: 'bip32-hd-wallets',
    date: '2012-02-11',
    title: 'HD 錢包標準',
    titleEn: 'HD Wallets Standard',
    description:
      'BIP-32 提出階層確定性錢包（HD Wallets）標準，允許從單一種子生成無限數量的密鑰對。',
    category: 'technical',
    significance: 'major',
    relatedBips: ['bip-0032'],
  },
  {
    id: 'bitpay-founded',
    date: '2012-05-15',
    title: 'BitPay 成立',
    titleEn: 'BitPay Founded',
    description:
      '比特幣支付處理商 BitPay 成立，讓商家可以輕鬆接受比特幣支付並即時轉換為法幣。',
    category: 'adoption',
    significance: 'notable',
  },
  {
    id: 'coinbase-founded',
    date: '2012-06-01',
    title: 'Coinbase 成立',
    titleEn: 'Coinbase Founded',
    description: 'Brian Armstrong 和 Fred Ehrsam 創立 Coinbase，後來成為最大的美國加密貨幣交易所。',
    category: 'market',
    significance: 'major',
  },
  {
    id: 'wordpress-btc',
    date: '2012-11-15',
    title: 'WordPress 接受比特幣',
    titleEn: 'WordPress Accepts Bitcoin',
    description:
      '全球最大的部落格平台 WordPress 開始接受比特幣付款，成為首批接受比特幣的主流科技公司之一。',
    category: 'adoption',
    significance: 'notable',
  },
  {
    id: 'bitcoin-foundation',
    date: '2012-09-27',
    title: '比特幣基金會成立',
    titleEn: 'Bitcoin Foundation Founded',
    description: '比特幣基金會成立，旨在推動比特幣的標準化、保護和推廣。',
    category: 'community',
    significance: 'notable',
  },
  {
    id: 'first-halving',
    date: '2012-11-28',
    title: '第一次減半',
    titleEn: 'First Halving',
    description: '比特幣區塊獎勵從 50 BTC 減半至 25 BTC，這是比特幣貨幣政策的重要時刻。',
    category: 'technical',
    significance: 'critical',
    blockHeight: 210000,
  },

  // ===== 2013 =====
  {
    id: 'finex-launch',
    date: '2013-01-01',
    title: 'Bitfinex 交易所成立',
    titleEn: 'Bitfinex Launched',
    description: 'Bitfinex 交易所成立，後來成為全球主要的比特幣交易平台之一。',
    category: 'market',
    significance: 'notable',
  },
  {
    id: 'casascius-coins',
    date: '2013-04-01',
    title: 'Casascius 實體比特幣',
    titleEn: 'Casascius Physical Bitcoins',
    description:
      'Mike Caldwell 的 Casascius 實體比特幣達到流通高峰，將私鑰嵌入實體硬幣中，成為收藏品經典。',
    category: 'community',
    significance: 'notable',
  },
  {
    id: 'cyprus-crisis',
    date: '2013-03-16',
    title: '賽普勒斯銀行危機',
    titleEn: 'Cyprus Banking Crisis',
    description:
      '賽普勒斯政府凍結銀行存款並徵收高額存款稅，引發人們對銀行系統的不信任，比特幣作為替代方案受到關注。',
    category: 'adoption',
    significance: 'major',
  },
  {
    id: 'first-btc-atm',
    date: '2013-10-29',
    title: '全球首台比特幣 ATM',
    titleEn: 'First Bitcoin ATM',
    description:
      '全球首台比特幣 ATM 在加拿大溫哥華 Waves 咖啡店安裝，由 Robocoin 公司製造，讓普通人可以用現金購買比特幣。',
    category: 'adoption',
    significance: 'major',
  },
  {
    id: 'bip39-mnemonic',
    date: '2013-09-10',
    title: '助記詞標準',
    titleEn: 'Mnemonic Standard',
    description: 'BIP-39 提出助記詞標準，讓用戶可以用 12-24 個單詞備份錢包，大大提升了用戶體驗。',
    category: 'technical',
    significance: 'major',
    relatedBips: ['bip-0039'],
  },
  {
    id: 'silk-road-shutdown',
    date: '2013-10-02',
    title: 'Silk Road 被關閉',
    titleEn: 'Silk Road Shutdown',
    description:
      'FBI 關閉 Silk Road 並逮捕創始人 Ross Ulbricht，沒收約 144,000 枚比特幣。比特幣繼續證明其抗審查性。',
    category: 'regulatory',
    significance: 'major',
  },
  {
    id: 'first-1000-usd',
    date: '2013-11-28',
    title: '價格首次突破 1,000 美元',
    titleEn: 'Price Reaches $1,000',
    description: '比特幣價格首次突破 1,000 美元，引發全球媒體關注。',
    category: 'market',
    significance: 'major',
  },
  {
    id: 'china-ban-1',
    date: '2013-12-05',
    title: '中國人民銀行禁令',
    titleEn: 'PBOC Bitcoin Ban',
    description: '中國人民銀行禁止金融機構處理比特幣交易，這是中國多次禁令的開始。',
    category: 'regulatory',
    significance: 'major',
  },
  {
    id: 'fincen-guidance',
    date: '2013-03-18',
    title: 'FinCEN 虛擬貨幣指引',
    titleEn: 'FinCEN Virtual Currency Guidance',
    description:
      '美國金融犯罪執法網絡（FinCEN）發布首個虛擬貨幣監管指引，將比特幣交易所歸類為貨幣服務業務（MSB）。',
    category: 'regulatory',
    significance: 'major',
  },
  {
    id: 'university-btc-course',
    date: '2013-09-01',
    title: '首個大學比特幣課程',
    titleEn: 'First University Bitcoin Course',
    description:
      '塞浦路斯尼科西亞大學開設首個比特幣課程並接受比特幣支付學費，成為首家接受比特幣的認證大學。',
    category: 'adoption',
    significance: 'notable',
  },

  // ===== 2014 =====
  {
    id: 'overstock-btc',
    date: '2014-01-09',
    title: 'Overstock 接受比特幣',
    titleEn: 'Overstock Accepts Bitcoin',
    description:
      '美國大型電商 Overstock.com 成為首家接受比特幣的主要零售商，開創電商接受加密貨幣的先河。',
    category: 'adoption',
    significance: 'major',
  },
  {
    id: 'newsweek-satoshi',
    date: '2014-03-06',
    title: 'Newsweek 錯認中本聰',
    titleEn: 'Newsweek Doxxes Wrong Satoshi',
    description:
      '《新聞週刊》錯誤指認 Dorian Nakamoto 為比特幣創始人，引發媒體倫理和隱私權討論，Dorian 本人否認。',
    category: 'community',
    significance: 'notable',
  },
  {
    id: 'hal-finney-passes',
    date: '2014-08-28',
    title: 'Hal Finney 逝世',
    titleEn: 'Hal Finney Passes Away',
    description:
      '比特幣先驅 Hal Finney 因漸凍症（ALS）去世，他是比特幣的首位用戶和重要貢獻者，遺體被冷凍保存。',
    category: 'community',
    significance: 'major',
    links: [{ label: '了解 Hal Finney', url: '/figures/hal-finney' }],
  },
  {
    id: 'mtgox-collapse',
    date: '2014-02-24',
    title: 'Mt.Gox 倒閉',
    titleEn: 'Mt.Gox Collapse',
    description:
      'Mt.Gox 宣布倒閉，約 85 萬枚比特幣被盜或遺失。這一事件強調了「Not your keys, not your coins」的重要性。',
    category: 'market',
    significance: 'critical',
  },
  {
    id: 'bip44',
    date: '2014-04-24',
    title: 'BIP-44 多幣種錢包',
    titleEn: 'BIP-44 Multi-Account',
    description: 'BIP-44 定義了 HD 錢包的多帳戶結構，成為錢包派生路徑的標準。',
    category: 'technical',
    significance: 'major',
    relatedBips: ['bip-0044'],
  },
  {
    id: 'first-asic',
    date: '2014-06-01',
    title: 'ASIC 礦機普及',
    titleEn: 'ASIC Miners Dominate',
    description: 'ASIC 專用挖礦晶片全面普及，GPU 挖礦時代結束，挖礦產業進入專業化階段。',
    category: 'technical',
    significance: 'notable',
  },
  {
    id: 'microsoft-btc',
    date: '2014-12-11',
    title: 'Microsoft 接受比特幣',
    titleEn: 'Microsoft Accepts Bitcoin',
    description:
      '微軟開始接受比特幣支付 Windows、Xbox 遊戲和其他數位內容，成為接受比特幣的最大科技公司之一。',
    category: 'adoption',
    significance: 'major',
  },
  {
    id: 'bitstamp-hack',
    date: '2015-01-04',
    title: 'Bitstamp 遭駭客攻擊',
    titleEn: 'Bitstamp Hacked',
    description:
      '歐洲最大比特幣交易所 Bitstamp 遭駭客攻擊，約 19,000 枚比特幣被盜，再次提醒用戶自我託管的重要性。',
    category: 'market',
    significance: 'notable',
  },

  // ===== 2015 =====
  {
    id: 'winklevoss-etf-filing',
    date: '2015-01-09',
    title: 'Winklevoss 兄弟 ETF 嘗試',
    titleEn: 'Winklevoss Bitcoin ETF Attempt',
    description:
      'Winklevoss 兄弟向 SEC 提交首個比特幣 ETF 申請，雖然最終被拒絕，但開啟了長達近十年的 ETF 審批之路。',
    category: 'adoption',
    significance: 'notable',
  },
  {
    id: 'lightning-whitepaper',
    date: '2015-02-28',
    title: '閃電網路白皮書',
    titleEn: 'Lightning Network Whitepaper',
    description:
      'Joseph Poon 和 Thaddeus Dryja 發布閃電網路白皮書，提出比特幣 Layer 2 擴展方案。',
    category: 'technical',
    significance: 'critical',
    links: [
      { label: '閱讀白皮書', url: 'https://lightning.network/lightning-network-paper.pdf' },
    ],
  },
  {
    id: 'bitlicense',
    date: '2015-06-03',
    title: 'BitLicense 實施',
    titleEn: 'BitLicense Implemented',
    description: '紐約州實施 BitLicense，成為美國首個專門針對加密貨幣企業的監管框架。',
    category: 'regulatory',
    significance: 'notable',
  },
  {
    id: 'scaling-debate-begins',
    date: '2015-08-15',
    title: '區塊大小辯論開始',
    titleEn: 'Block Size Debate Begins',
    description:
      'Mike Hearn 和 Gavin Andresen 發布 Bitcoin XT，提議增大區塊容量限制，引發比特幣歷史上最重大的技術與治理辯論。',
    category: 'community',
    significance: 'major',
    links: [{ label: '閱讀《區塊大小戰爭》', url: '/books/blocksize-war' }],
  },
  {
    id: 'ethereum-launch',
    date: '2015-07-30',
    title: '以太坊主網上線',
    titleEn: 'Ethereum Mainnet Launch',
    description:
      '以太坊主網正式上線，引入智能合約平台概念。雖然與比特幣不同，但其發展影響了整個加密貨幣生態。',
    category: 'community',
    significance: 'notable',
  },
  {
    id: '21-inc-computer',
    date: '2015-09-21',
    title: '21 Inc 比特幣電腦發布',
    titleEn: '21 Inc Bitcoin Computer Released',
    description:
      '21 Inc 發布首款內建比特幣挖礦晶片的電腦，嘗試將比特幣整合進消費電子產品。公司後來轉型為 Earn.com。',
    category: 'adoption',
    significance: 'notable',
  },
  {
    id: 'bip65-cltv',
    date: '2015-12-14',
    title: 'CHECKLOCKTIMEVERIFY 啟用',
    titleEn: 'CLTV Activation',
    description: 'BIP-65 啟用，引入時間鎖功能，為閃電網路等協議奠定基礎。',
    category: 'technical',
    significance: 'major',
    relatedBips: ['bip-0065'],
    blockHeight: 388381,
  },

  // ===== 2016 =====
  {
    id: 'hong-kong-agreement',
    date: '2016-02-21',
    title: '香港共識會議',
    titleEn: 'Hong Kong Roundtable Agreement',
    description:
      '比特幣核心開發者與礦工在香港舉行閉門會議，就區塊大小擴容達成臨時協議，但該協議後來引發更多爭議。',
    category: 'community',
    significance: 'notable',
    links: [{ label: '閱讀《區塊大小戰爭》', url: '/books/blocksize-war' }],
  },
  {
    id: 'mike-hearn-leaves',
    date: '2016-01-14',
    title: 'Mike Hearn 退出比特幣',
    titleEn: 'Mike Hearn Leaves Bitcoin',
    description:
      '早期比特幣開發者 Mike Hearn 發表文章宣稱「比特幣實驗已失敗」並出售所有比特幣，引發社群震動。',
    category: 'community',
    significance: 'notable',
  },
  {
    id: 'bip68-csv',
    date: '2016-07-04',
    title: '相對時間鎖啟用',
    titleEn: 'CSV Activation',
    description: 'BIP-68/112/113 啟用，引入相對時間鎖功能（CHECKSEQUENCEVERIFY），進一步支持閃電網路。',
    category: 'technical',
    significance: 'major',
    relatedBips: ['bip-0068', 'bip-0112', 'bip-0113'],
    blockHeight: 419328,
  },
  {
    id: 'second-halving',
    date: '2016-07-09',
    title: '第二次減半',
    titleEn: 'Second Halving',
    description: '比特幣區塊獎勵從 25 BTC 減半至 12.5 BTC。',
    category: 'technical',
    significance: 'critical',
    blockHeight: 420000,
  },
  {
    id: 'bitfinex-hack',
    date: '2016-08-02',
    title: 'Bitfinex 遭駭客攻擊',
    titleEn: 'Bitfinex Hacked',
    description:
      '香港交易所 Bitfinex 遭駭客攻擊，約 12 萬枚比特幣被盜（當時價值約 7,200 萬美元），是繼 Mt.Gox 後最大的交易所安全事件之一。',
    category: 'market',
    significance: 'major',
  },
  {
    id: 'segwit-proposal',
    date: '2016-10-28',
    title: 'SegWit 正式提案',
    titleEn: 'SegWit Formal Proposal',
    description:
      '隔離見證（SegWit）軟分叉正式提案發布，透過將簽名數據分離來解決交易延展性問題並間接增加區塊容量。',
    category: 'technical',
    significance: 'major',
    relatedBips: ['bip-0141'],
  },
  {
    id: 'compact-blocks',
    date: '2016-11-01',
    title: 'Compact Blocks',
    titleEn: 'Compact Blocks (BIP-152)',
    description: 'BIP-152 引入緊湊區塊傳播，大幅減少區塊傳播時間和網路頻寬。',
    category: 'technical',
    significance: 'notable',
    relatedBips: ['bip-0152'],
  },

  // ===== 2017 =====
  {
    id: 'japan-btc-legal',
    date: '2017-04-01',
    title: '日本承認比特幣為合法支付方式',
    titleEn: 'Japan Recognizes Bitcoin as Legal Payment',
    description:
      '日本《資金結算法》修正案生效，正式承認比特幣為合法支付方式，日本成為全球對加密貨幣最友好的國家之一。',
    category: 'regulatory',
    significance: 'major',
  },
  {
    id: 'uasf-bip148',
    date: '2017-03-12',
    title: 'BIP-148 UASF 提出',
    titleEn: 'BIP-148 UASF Proposed',
    description:
      '用戶激活軟分叉（User Activated Soft Fork）提案發布，社群決定不再等待礦工信號，自行推動 SegWit 激活。',
    category: 'community',
    significance: 'major',
    relatedBips: ['bip-0148'],
  },
  {
    id: 'segwit-lock-in',
    date: '2017-07-21',
    title: 'SegWit 鎖定',
    titleEn: 'SegWit Locked In',
    description: '在用戶激活軟分叉（UASF）壓力下，礦工信號支持 SegWit，達到激活門檻。',
    category: 'technical',
    significance: 'major',
    blockHeight: 477120,
  },
  {
    id: 'bch-fork',
    date: '2017-08-01',
    title: 'Bitcoin Cash 硬分叉',
    titleEn: 'Bitcoin Cash Hard Fork',
    description:
      '因區塊大小之爭，Bitcoin Cash (BCH) 從比特幣主鏈分叉，選擇增大區塊容量而非 SegWit 方案。用戶激活軟分叉（UASF）成功，這一天被稱為「比特幣獨立日」。',
    category: 'community',
    significance: 'critical',
    blockHeight: 478558,
  },
  {
    id: 'segwit-activation',
    date: '2017-08-24',
    title: 'SegWit 啟用',
    titleEn: 'SegWit Activation',
    description:
      '隔離見證（Segregated Witness）在區塊高度 481824 正式啟用，解決交易延展性問題並為閃電網路鋪路。',
    category: 'technical',
    significance: 'critical',
    relatedBips: ['bip-0141', 'bip-0143', 'bip-0144'],
    blockHeight: 481824,
  },
  {
    id: 'ico-boom',
    date: '2017-06-12',
    title: 'ICO 狂潮開始',
    titleEn: 'ICO Boom Begins',
    description:
      'EOS、Tezos 等項目透過 ICO 籌集數億美元。雖然主要在以太坊進行，但比特幣也因投資熱潮受益，市場關注度大增。',
    category: 'market',
    significance: 'notable',
  },
  {
    id: 'segwit2x-cancelled',
    date: '2017-11-08',
    title: 'SegWit2X 取消',
    titleEn: 'SegWit2X Cancelled',
    description: '因社群反對，SegWit2X 硬分叉計劃被取消，比特幣避免了另一次分裂。',
    category: 'community',
    significance: 'major',
  },
  {
    id: 'cboe-futures',
    date: '2017-12-10',
    title: 'CBOE 推出比特幣期貨',
    titleEn: 'CBOE Bitcoin Futures Launch',
    description: '芝加哥期權交易所（CBOE）率先推出比特幣期貨，是主流金融機構首次提供比特幣衍生品交易。',
    category: 'market',
    significance: 'major',
  },
  {
    id: 'first-20k',
    date: '2017-12-17',
    title: '價格首次接近 20,000 美元',
    titleEn: 'Price Reaches $20,000',
    description: '比特幣價格在瘋狂牛市中首次接近 20,000 美元，達到歷史新高。',
    category: 'market',
    significance: 'major',
  },
  {
    id: 'cme-futures',
    date: '2017-12-18',
    title: 'CME 比特幣期貨',
    titleEn: 'CME Bitcoin Futures',
    description: '芝加哥商品交易所（CME）推出比特幣期貨，標誌著華爾街正式進入比特幣市場。',
    category: 'market',
    significance: 'major',
  },

  // ===== 2018 =====
  {
    id: 'south-korea-regulations',
    date: '2018-01-08',
    title: '韓國加密貨幣監管風波',
    titleEn: 'South Korea Crypto Regulation Scare',
    description:
      '韓國政府討論禁止加密貨幣交易，引發市場恐慌。後來雖未全面禁止，但要求實名制交易，開啟亞洲嚴格監管先例。',
    category: 'regulatory',
    significance: 'notable',
  },
  {
    id: 'first-ln-payment',
    date: '2018-01-20',
    title: '首筆閃電網路主網支付',
    titleEn: 'First Lightning Mainnet Payment',
    description:
      '比特幣開發者透過閃電網路在主網完成首筆實際支付（購買 VPN 服務），證明 Layer 2 解決方案的可行性。',
    category: 'technical',
    significance: 'notable',
  },
  {
    id: 'lightning-pizza',
    date: '2018-02-25',
    title: '首筆閃電網路披薩交易',
    titleEn: 'First Lightning Pizza Purchase',
    description:
      'Laszlo Hanyecz（Bitcoin Pizza Day 的主角）透過閃電網路購買披薩，向經典致敬，展示閃電網路的日常應用潛力。',
    category: 'adoption',
    significance: 'notable',
  },
  {
    id: 'bech32-adoption',
    date: '2018-03-01',
    title: 'Bech32 地址普及',
    titleEn: 'Bech32 Address Adoption',
    description:
      '主要錢包和交易所開始支持原生 SegWit（Bech32）地址，提供更低的交易費用和更好的錯誤檢測。',
    category: 'technical',
    significance: 'notable',
    relatedBips: ['bip-0173'],
  },
  {
    id: 'lightning-mainnet',
    date: '2018-03-15',
    title: '閃電網路主網上線',
    titleEn: 'Lightning Network Mainnet',
    description:
      'Lightning Labs 發布 lnd 0.4-beta，閃電網路正式在比特幣主網上線，開啟 Layer 2 擴展新時代。',
    category: 'technical',
    significance: 'critical',
    links: [{ label: '閃電網路資源', url: '/lightning' }],
  },
  {
    id: 'twitter-jack-btc',
    date: '2018-03-20',
    title: 'Twitter CEO 看好比特幣',
    titleEn: 'Twitter CEO Endorses Bitcoin',
    description:
      'Twitter 和 Square CEO Jack Dorsey 公開表示比特幣將在 10 年內成為全球單一貨幣，引起主流媒體關注。',
    category: 'adoption',
    significance: 'notable',
  },
  {
    id: 'square-cash-btc',
    date: '2018-08-01',
    title: 'Square Cash App 支援比特幣',
    titleEn: 'Square Cash App Enables Bitcoin',
    description:
      'Jack Dorsey 的 Square 公司讓所有 Cash App 用戶都能購買比特幣，大幅降低美國用戶獲取比特幣的門檻。',
    category: 'adoption',
    significance: 'major',
  },
  {
    id: 'bear-market-low',
    date: '2018-12-15',
    title: '熊市低點 3,200 美元',
    titleEn: 'Bear Market Low $3,200',
    description:
      '比特幣價格跌至熊市低點約 3,200 美元，較歷史高點下跌超過 80%，考驗長期持有者的信念。',
    category: 'market',
    significance: 'notable',
  },

  // ===== 2019 =====
  {
    id: 'proof-of-keys-2019',
    date: '2019-01-03',
    title: '首個密鑰證明日',
    titleEn: 'First Proof of Keys Day',
    description:
      'Trace Mayer 發起「密鑰證明日」，鼓勵用戶在創世區塊週年紀念日將比特幣從交易所提取到自己的錢包。',
    category: 'community',
    significance: 'notable',
  },
  {
    id: 'lightning-torch',
    date: '2019-01-19',
    title: '閃電火炬傳遞',
    titleEn: 'Lightning Torch',
    description:
      '社群發起「閃電火炬」接力活動，用戶依次增加聰並傳遞付款，最終傳遍全球，展示閃電網路的全球可達性。',
    category: 'community',
    significance: 'notable',
  },
  {
    id: 'quadrigacx-collapse',
    date: '2019-02-01',
    title: 'QuadrigaCX 交易所倒閉',
    titleEn: 'QuadrigaCX Collapse',
    description:
      '加拿大最大加密交易所 QuadrigaCX 因創辦人 Gerald Cotten 意外身亡而無法訪問冷錢包，約 1.9 億美元用戶資金無法取回。',
    category: 'market',
    significance: 'notable',
  },
  {
    id: 'bitfinex-tether-scandal',
    date: '2019-04-25',
    title: 'Bitfinex-Tether 醜聞',
    titleEn: 'Bitfinex-Tether Scandal',
    description:
      '紐約總檢察長指控 Bitfinex 挪用 Tether 儲備金彌補 8.5 億美元損失，引發穩定幣信任危機討論。',
    category: 'regulatory',
    significance: 'notable',
  },
  {
    id: 'facebook-libra',
    date: '2019-06-18',
    title: 'Facebook 發布 Libra 計劃',
    titleEn: 'Facebook Announces Libra',
    description:
      'Facebook 發布 Libra（後改名 Diem）穩定幣白皮書，引起全球監管機構關注，間接促進了比特幣的認可度。',
    category: 'community',
    significance: 'notable',
  },
  {
    id: 'bakkt-launch',
    date: '2019-09-23',
    title: 'Bakkt 上線',
    titleEn: 'Bakkt Launch',
    description:
      '洲際交易所（ICE）旗下的 Bakkt 平台上線，提供實物交割的比特幣期貨，標誌機構基礎設施成熟。',
    category: 'market',
    significance: 'major',
  },
  {
    id: 'china-blockchain',
    date: '2019-10-25',
    title: '習近平提倡區塊鏈',
    titleEn: 'Xi Jinping Endorses Blockchain',
    description:
      '中國國家主席習近平表示要把區塊鏈作為核心技術自主創新的重要突破口，比特幣價格短暫飆升。',
    category: 'regulatory',
    significance: 'notable',
  },
  {
    id: 'schnorr-taproot-proposal',
    date: '2019-05-06',
    title: 'Taproot 提案公開',
    titleEn: 'Taproot Proposal Published',
    description: 'Pieter Wuille 公開 Schnorr/Taproot 軟分叉提案，開始社群審核過程。',
    category: 'technical',
    significance: 'major',
    relatedBips: ['bip-0340', 'bip-0341', 'bip-0342'],
  },

  // ===== 2020 =====
  {
    id: 'covid-crash',
    date: '2020-03-12',
    title: '黑色星期四',
    titleEn: 'Black Thursday',
    description: '受新冠疫情影響，比特幣價格單日暴跌約 50%，從約 8,000 美元跌至 4,000 美元以下。',
    category: 'market',
    significance: 'major',
  },
  {
    id: 'third-halving',
    date: '2020-05-11',
    title: '第三次減半',
    titleEn: 'Third Halving',
    description: '比特幣區塊獎勵從 12.5 BTC 減半至 6.25 BTC，發生於新冠疫情期間。',
    category: 'technical',
    significance: 'critical',
    blockHeight: 630000,
  },
  {
    id: 'twitter-hack',
    date: '2020-07-15',
    title: 'Twitter 比特幣詐騙事件',
    titleEn: 'Twitter Bitcoin Scam Hack',
    description:
      '駭客入侵多個知名 Twitter 帳號（包括 Elon Musk、Barack Obama、Apple 等），發布比特幣詐騙訊息。事件凸顯了中心化平台的安全風險。',
    category: 'community',
    significance: 'notable',
  },
  {
    id: 'microstrategy',
    date: '2020-08-11',
    title: 'MicroStrategy 入場',
    titleEn: 'MicroStrategy Buys Bitcoin',
    description:
      'MicroStrategy 宣布將比特幣作為主要儲備資產，購買 21,454 BTC，開啟企業採用比特幣的浪潮。',
    category: 'adoption',
    significance: 'major',
  },
  {
    id: 'paypal-bitcoin',
    date: '2020-10-21',
    title: 'PayPal 支持比特幣',
    titleEn: 'PayPal Enables Bitcoin',
    description: 'PayPal 宣布允許用戶購買、持有和出售比特幣，讓數億用戶可以接觸比特幣。',
    category: 'adoption',
    significance: 'major',
  },
  {
    id: 'break-20k',
    date: '2020-12-16',
    title: '突破歷史新高',
    titleEn: 'All-Time High Broken',
    description: '比特幣價格突破 2017 年高點，創下新的歷史最高價格，開啟新一輪牛市。',
    category: 'market',
    significance: 'major',
  },

  // ===== 2021 =====
  {
    id: 'tesla-bitcoin',
    date: '2021-02-08',
    title: 'Tesla 購買比特幣',
    titleEn: 'Tesla Buys Bitcoin',
    description: 'Tesla 披露購買 15 億美元比特幣，並宣布將接受比特幣支付。',
    category: 'adoption',
    significance: 'major',
  },
  {
    id: 'first-60k',
    date: '2021-03-13',
    title: '價格首次突破 60,000 美元',
    titleEn: 'Price Reaches $60,000',
    description: '比特幣價格首次突破 60,000 美元大關。',
    category: 'market',
    significance: 'notable',
  },
  {
    id: 'coinbase-ipo',
    date: '2021-04-14',
    title: 'Coinbase 上市',
    titleEn: 'Coinbase IPO',
    description: 'Coinbase 在納斯達克直接上市，成為首家上市的加密貨幣交易所，估值達 860 億美元。',
    category: 'market',
    significance: 'major',
  },
  {
    id: 'colonial-pipeline',
    date: '2021-05-07',
    title: 'Colonial Pipeline 勒索軟體事件',
    titleEn: 'Colonial Pipeline Ransomware Attack',
    description:
      '美國最大燃油管道營運商遭勒索軟體攻擊，支付 75 枚比特幣（約 440 萬美元）贖金。FBI 後來成功追回大部分比特幣，引發對比特幣隱私性的討論。',
    category: 'community',
    significance: 'notable',
  },
  {
    id: 'china-mining-ban',
    date: '2021-05-21',
    title: '中國禁止挖礦',
    titleEn: 'China Mining Ban',
    description:
      '中國宣布禁止比特幣挖礦，導致大量礦工遷移至北美和中亞，反而使比特幣網路更加去中心化。',
    category: 'regulatory',
    significance: 'major',
  },
  {
    id: 'el-salvador',
    date: '2021-06-09',
    title: '薩爾瓦多採用比特幣',
    titleEn: 'El Salvador Adopts Bitcoin',
    description: '薩爾瓦多成為全球首個將比特幣列為法定貨幣的國家，由總統 Nayib Bukele 推動。',
    category: 'adoption',
    significance: 'critical',
  },
  {
    id: 'el-salvador-law-effective',
    date: '2021-09-07',
    title: '比特幣法正式生效',
    titleEn: 'Bitcoin Law Takes Effect',
    description:
      '薩爾瓦多《比特幣法》正式生效，比特幣成為該國法定貨幣。首日系統出現技術問題，但開創主權國家採用比特幣的歷史先例。',
    category: 'adoption',
    significance: 'major',
  },
  {
    id: 'taproot-lock-in',
    date: '2021-06-12',
    title: 'Taproot 鎖定',
    titleEn: 'Taproot Locked In',
    description: 'Taproot 升級達到激活門檻並鎖定，預計於 11 月正式啟用。',
    category: 'technical',
    significance: 'major',
    blockHeight: 687285,
  },
  {
    id: 'first-btc-etf',
    date: '2021-10-19',
    title: '美國首個比特幣 ETF',
    titleEn: 'First US Bitcoin ETF',
    description: 'ProShares 比特幣期貨 ETF (BITO) 在紐交所上市，成為美國首個比特幣 ETF。',
    category: 'adoption',
    significance: 'major',
  },
  {
    id: 'taproot-activation',
    date: '2021-11-14',
    title: 'Taproot 啟用',
    titleEn: 'Taproot Activation',
    description:
      '比特幣有史以來最重要的升級之一，引入 Schnorr 簽名和 Taproot，大幅提升隱私性和智能合約能力。',
    category: 'technical',
    significance: 'critical',
    relatedBips: ['bip-0340', 'bip-0341', 'bip-0342'],
    blockHeight: 709632,
  },
  {
    id: 'ath-69k',
    date: '2021-11-10',
    title: '歷史新高 69,000 美元',
    titleEn: 'All-Time High $69,000',
    description: '比特幣價格創下 68,789 美元的歷史最高記錄。',
    category: 'market',
    significance: 'notable',
  },

  // ===== 2022 =====
  {
    id: 'car-bitcoin',
    date: '2022-04-27',
    title: '中非共和國採用比特幣',
    titleEn: 'CAR Adopts Bitcoin',
    description: '中非共和國成為第二個將比特幣列為法定貨幣的國家。',
    category: 'adoption',
    significance: 'notable',
  },
  {
    id: 'luna-collapse',
    date: '2022-05-09',
    title: 'Terra/Luna 崩盤',
    titleEn: 'Terra/Luna Collapse',
    description:
      'Terra 穩定幣 UST 脫鉤崩盤，引發加密市場連鎖反應，多家機構倒閉。比特幣再次證明其抗脆弱性。',
    category: 'market',
    significance: 'major',
  },
  {
    id: '3ac-collapse',
    date: '2022-06-27',
    title: '三箭資本倒閉',
    titleEn: 'Three Arrows Capital Collapse',
    description:
      '知名加密對沖基金三箭資本（3AC）因過度槓桿和 Terra 曝險而破產，引發連鎖清算潮。',
    category: 'market',
    significance: 'major',
  },
  {
    id: 'celsius-bankruptcy',
    date: '2022-07-13',
    title: 'Celsius 申請破產',
    titleEn: 'Celsius Files for Bankruptcy',
    description:
      '加密借貸平台 Celsius Network 申請破產保護，凍結用戶約 47 億美元資產，揭露 CeFi 風險。',
    category: 'market',
    significance: 'major',
  },
  {
    id: 'tornado-cash-sanctions',
    date: '2022-08-08',
    title: 'Tornado Cash 被美國制裁',
    titleEn: 'Tornado Cash Sanctioned',
    description:
      '美國財政部將以太坊混幣協議 Tornado Cash 列入制裁名單，引發加密社群對隱私權和代碼言論自由的激烈討論。',
    category: 'regulatory',
    significance: 'major',
  },
  {
    id: 'ftx-collapse',
    date: '2022-11-11',
    title: 'FTX 交易所倒閉',
    titleEn: 'FTX Collapse',
    description: 'FTX 交易所破產，創始人 SBF 被捕。再次強調「Not your keys, not your coins」的重要性。',
    category: 'market',
    significance: 'critical',
  },
  {
    id: 'genesis-bankruptcy',
    date: '2023-01-19',
    title: 'Genesis 申請破產',
    titleEn: 'Genesis Files for Bankruptcy',
    description:
      '加密借貸機構 Genesis Global 申請破產保護，負債超過 30 億美元，FTX 餘波持續。',
    category: 'market',
    significance: 'notable',
  },

  // ===== 2023 =====
  {
    id: 'ordinals-launch',
    date: '2023-01-21',
    title: 'Ordinals 協議發布',
    titleEn: 'Ordinals Protocol Launch',
    description:
      'Casey Rodarmor 發布 Ordinals 協議，允許在比特幣上銘刻 NFT，引發關於區塊空間使用的討論。',
    category: 'technical',
    significance: 'major',
    links: [
      { label: '了解 Casey Rodarmor', url: '/figures/casey-rodarmor' },
      { label: 'Ordinals 官網', url: 'https://ordinals.com' },
    ],
  },
  {
    id: 'brc20',
    date: '2023-03-08',
    title: 'BRC-20 代幣標準',
    titleEn: 'BRC-20 Token Standard',
    description: '基於 Ordinals 的 BRC-20 代幣標準出現，在比特幣上創建同質化代幣。',
    category: 'technical',
    significance: 'notable',
  },
  {
    id: 'blackrock-etf-filing',
    date: '2023-06-15',
    title: 'BlackRock 提交 ETF 申請',
    titleEn: 'BlackRock ETF Filing',
    description: '全球最大資產管理公司 BlackRock 提交現貨比特幣 ETF 申請，引發市場樂觀情緒。',
    category: 'adoption',
    significance: 'major',
  },
  {
    id: 'binance-sec',
    date: '2023-06-05',
    title: 'SEC 起訴 Binance',
    titleEn: 'SEC Sues Binance',
    description:
      '美國證券交易委員會（SEC）對全球最大加密交易所 Binance 及其創始人趙長鵬提起訴訟，指控違反證券法。',
    category: 'regulatory',
    significance: 'major',
  },
  {
    id: 'grayscale-court-win',
    date: '2023-08-29',
    title: 'Grayscale 勝訴 SEC',
    titleEn: 'Grayscale Wins Against SEC',
    description:
      '法院裁定 SEC 拒絕 Grayscale 將其比特幣信託轉換為 ETF 的決定是「任意且反覆無常的」，為現貨 ETF 鋪路。',
    category: 'regulatory',
    significance: 'major',
  },
  {
    id: 'sbf-guilty',
    date: '2023-11-02',
    title: 'SBF 被判有罪',
    titleEn: 'SBF Found Guilty',
    description:
      'FTX 創始人 Sam Bankman-Fried 被陪審團判定七項罪名全部成立，包括電匯詐欺和洗錢等重罪。',
    category: 'regulatory',
    significance: 'major',
  },
  {
    id: 'binance-settlement',
    date: '2023-11-21',
    title: 'Binance 認罪和解',
    titleEn: 'Binance Settlement',
    description:
      'Binance 與美國司法部達成 43 億美元和解協議，趙長鵬辭去 CEO 職務並認罪，創下加密產業最大罰款紀錄。',
    category: 'regulatory',
    significance: 'major',
  },
  {
    id: 'btc-year-end-2023',
    date: '2023-12-31',
    title: '2023 年收官漲幅超 150%',
    titleEn: 'Bitcoin Ends 2023 Up 150%+',
    description:
      '比特幣以約 42,000 美元收官，全年漲幅超過 150%，成為 2023 年表現最佳的主要資產之一。',
    category: 'market',
    significance: 'notable',
  },

  // ===== 2024 =====
  {
    id: 'bitcoin-etf',
    date: '2024-01-10',
    title: '美國現貨 ETF 批准',
    titleEn: 'US Spot Bitcoin ETF Approved',
    description:
      '美國 SEC 批准首批現貨比特幣 ETF，包括 BlackRock、Fidelity 等機構的產品，開啟機構投資新時代。',
    category: 'adoption',
    significance: 'critical',
  },
  {
    id: 'fourth-halving',
    date: '2024-04-20',
    title: '第四次減半',
    titleEn: 'Fourth Halving',
    description: '比特幣區塊獎勵從 6.25 BTC 減半至 3.125 BTC，標誌著比特幣進入新的供應週期。',
    category: 'technical',
    significance: 'critical',
    blockHeight: 840000,
  },
  {
    id: 'new-ath-2024',
    date: '2024-03-14',
    title: '突破 73,000 美元',
    titleEn: 'New All-Time High',
    description: '比特幣價格突破 73,000 美元，創下新的歷史最高記錄。',
    category: 'market',
    significance: 'notable',
  },
  {
    id: 'runes-launch',
    date: '2024-04-20',
    title: 'Runes 協議發布',
    titleEn: 'Runes Protocol Launch',
    description: 'Casey Rodarmor 在第四次減半時發布 Runes 協議，提供更高效的比特幣代幣標準。',
    category: 'technical',
    significance: 'notable',
    blockHeight: 840000,
  },
  {
    id: 'hong-kong-etf',
    date: '2024-04-30',
    title: '香港比特幣 ETF 上市',
    titleEn: 'Hong Kong Bitcoin ETF Launch',
    description:
      '香港證監會批准首批現貨比特幣和以太坊 ETF 上市交易，成為亞洲首個允許現貨加密貨幣 ETF 的主要金融市場。',
    category: 'adoption',
    significance: 'major',
  },
  {
    id: 'mt-gox-distribution',
    date: '2024-07-01',
    title: 'Mt.Gox 開始償還債權人',
    titleEn: 'Mt.Gox Begins Distributions',
    description:
      '在破產十年後，Mt.Gox 終於開始向債權人償還比特幣，約 142,000 枚 BTC 陸續發放，市場擔憂拋壓。',
    category: 'market',
    significance: 'notable',
  },
  {
    id: 'trump-bitcoin-conference',
    date: '2024-07-27',
    title: '川普出席比特幣大會',
    titleEn: 'Trump Speaks at Bitcoin Conference',
    description:
      '美國前總統川普在納什維爾 Bitcoin 2024 大會發表演講，承諾若當選將建立國家比特幣儲備並解僱 SEC 主席。',
    category: 'regulatory',
    significance: 'major',
  },
  {
    id: 'germany-btc-sale',
    date: '2024-07-12',
    title: '德國政府出售比特幣',
    titleEn: 'Germany Sells Bitcoin',
    description:
      '德國政府完成出售從電影盜版網站沒收的約 50,000 枚比特幣，引發短期市場波動和對政府持幣策略的討論。',
    category: 'regulatory',
    significance: 'notable',
  },

  // ===== 2024 (continued) =====
  {
    id: 'btc-100k',
    date: '2024-12-05',
    title: '比特幣突破 100,000 美元',
    titleEn: 'Bitcoin Breaks $100,000',
    description: '比特幣價格歷史性突破 100,000 美元，達成重要心理價位里程碑。',
    category: 'market',
    significance: 'critical',
  },
  {
    id: 'microstrategy-nasdaq100',
    date: '2024-12-13',
    title: 'MicroStrategy 納入 Nasdaq-100',
    titleEn: 'MicroStrategy Joins Nasdaq-100',
    description:
      'MicroStrategy 被納入 Nasdaq-100 指數，成為首家以比特幣儲備策略著稱的公司進入該指數。',
    category: 'adoption',
    significance: 'major',
  },
  {
    id: 'etf-1m-btc',
    date: '2024-12-16',
    title: '美國 ETF 持倉突破 110 萬 BTC',
    titleEn: 'US ETFs Hold Over 1.1M BTC',
    description:
      '美國現貨比特幣 ETF 總持倉量突破 110 萬枚 BTC，超越中本聰估計的持幣量，機構採用達到新高度。',
    category: 'adoption',
    significance: 'major',
  },

  // ===== 2025 =====
  {
    id: 'strategic-reserve-order',
    date: '2025-01-23',
    title: '美國總統簽署數位資產行政命令',
    titleEn: 'US President Signs Digital Asset Executive Order',
    description:
      '美國總統川普簽署行政命令，成立「總統數位資產市場工作小組」，並禁止發行央行數位貨幣（CBDC），為比特幣戰略儲備研究奠定基礎。',
    category: 'regulatory',
    significance: 'critical',
  },
  {
    id: 'el-salvador-10k-btc',
    date: '2025-02-15',
    title: '薩爾瓦多持倉突破 6,000 BTC',
    titleEn: 'El Salvador Holdings Exceed 6,000 BTC',
    description: '薩爾瓦多國家比特幣儲備突破 6,000 枚，持續執行每日購買策略，成為主權國家持幣典範。',
    category: 'adoption',
    significance: 'notable',
  },
  {
    id: 'strategic-bitcoin-reserve',
    date: '2025-03-06',
    title: '美國戰略比特幣儲備法案',
    titleEn: 'US Strategic Bitcoin Reserve Act',
    description:
      '美國總統川普簽署行政命令，正式建立「戰略比特幣儲備」（Strategic Bitcoin Reserve），將沒收的比特幣資產納入國家儲備，並禁止出售。這是主權國家採用比特幣的歷史性里程碑。',
    category: 'regulatory',
    significance: 'critical',
  },
  {
    id: 'bitcoin-policy-summit',
    date: '2025-03-07',
    title: '白宮首屆加密貨幣高峰會',
    titleEn: 'First White House Crypto Summit',
    description:
      '白宮舉辦首屆「數位資產高峰會」，政府高層與業界領袖共同討論比特幣政策和監管框架。',
    category: 'regulatory',
    significance: 'major',
  },
  {
    id: 'etf-record-inflows',
    date: '2025-04-01',
    title: 'ETF 累計淨流入超過 400 億美元',
    titleEn: 'ETF Net Inflows Exceed $40B',
    description:
      '美國現貨比特幣 ETF 推出一年多後，累計淨流入超過 400 億美元，成為金融史上最成功的 ETF 產品類別之一。',
    category: 'adoption',
    significance: 'major',
  },
  {
    id: 'state-btc-reserves',
    date: '2025-04-15',
    title: '多州推動比特幣儲備法案',
    titleEn: 'Multiple States Push Bitcoin Reserve Bills',
    description:
      '美國多州（包括德州、佛州、亞利桑那州等）相繼提出比特幣戰略儲備法案，部分州開始將比特幣納入州政府資產配置。',
    category: 'regulatory',
    significance: 'major',
  },
  {
    id: 'brazil-btc-reserve',
    date: '2025-05-01',
    title: '巴西提議比特幣國家儲備',
    titleEn: 'Brazil Proposes National Bitcoin Reserve',
    description:
      '巴西國會提出法案，建議將國家外匯儲備的 5% 配置於比特幣，成為拉丁美洲第二個考慮大規模採用比特幣的主要經濟體。',
    category: 'adoption',
    significance: 'major',
  },
  {
    id: 'lightning-10m-channels',
    date: '2025-05-15',
    title: '閃電網路容量突破 10,000 BTC',
    titleEn: 'Lightning Network Capacity Exceeds 10,000 BTC',
    description:
      '閃電網路總容量突破 10,000 BTC，通道數量持續增長，Layer 2 擴展方案日趨成熟。',
    category: 'technical',
    significance: 'notable',
  },
  {
    id: 'ark-mainnet',
    date: '2025-06-01',
    title: 'Ark 協議主網上線',
    titleEn: 'Ark Protocol Mainnet Launch',
    description:
      '由 Burak 設計的 Ark 協議在比特幣主網上線，為比特幣 Layer 2 生態帶來新的擴展方案，提供即時結算和更高的隱私性。',
    category: 'technical',
    significance: 'major',
  },
  {
    id: 'fedimint-adoption',
    date: '2025-06-15',
    title: 'Fedimint 聯邦銀託管普及',
    titleEn: 'Fedimint Federation Adoption',
    description:
      '基於聯邦化 Chaumian eCash 的 Fedimint 協議獲得廣泛採用，為比特幣社群提供隱私保護的託管方案。',
    category: 'technical',
    significance: 'notable',
  },
  {
    id: 'bitcoin-asia-2025',
    date: '2025-06-20',
    title: 'Bitcoin Asia 2025 香港',
    titleEn: 'Bitcoin Asia 2025 Hong Kong',
    description:
      '亞洲最大的比特幣會議在香港舉行，吸引全球開發者和企業，展示亞太地區比特幣生態的蓬勃發展。',
    category: 'community',
    significance: 'notable',
  },
  {
    id: 'nostr-bitcoin-integration',
    date: '2025-07-01',
    title: 'Nostr 與閃電網路深度整合',
    titleEn: 'Nostr-Lightning Deep Integration',
    description:
      '去中心化社交協議 Nostr 與閃電網路的整合日趨成熟，Zaps（閃電小費）成為內容創作者的主要收入來源之一。',
    category: 'adoption',
    significance: 'notable',
  },
  {
    id: 'op-cat-discussion',
    date: '2025-07-15',
    title: 'OP_CAT 復興討論升溫',
    titleEn: 'OP_CAT Revival Discussion Heats Up',
    description:
      '社群對於重新啟用 OP_CAT 操作碼的討論持續升溫，可能為比特幣帶來更強大的智能合約能力。',
    category: 'technical',
    significance: 'notable',
    relatedBips: ['bip-0347'],
  },
  {
    id: 'corporate-btc-treasury',
    date: '2025-08-01',
    title: '更多上市公司採用比特幣儲備',
    titleEn: 'More Public Companies Adopt Bitcoin Treasury',
    description:
      '繼 MicroStrategy 之後，更多上市公司宣布將比特幣作為資產負債表上的儲備資產，企業採用趨勢加速。',
    category: 'adoption',
    significance: 'major',
  },
  {
    id: 'silent-payments-adoption',
    date: '2025-08-15',
    title: 'Silent Payments 錢包支援',
    titleEn: 'Silent Payments Wallet Support',
    description:
      '主流比特幣錢包開始支援 Silent Payments（靜默支付），提供更好的接收隱私保護，無需交互即可生成新地址。',
    category: 'technical',
    significance: 'notable',
    relatedBips: ['bip-0352'],
  },
  {
    id: 'btc-mining-renewable',
    date: '2025-09-01',
    title: '比特幣挖礦可再生能源佔比超過 60%',
    titleEn: 'Bitcoin Mining Renewable Energy Exceeds 60%',
    description:
      '多項研究顯示比特幣挖礦的可再生能源使用比例超過 60%，成為全球能源消耗最「綠」的產業之一。',
    category: 'community',
    significance: 'notable',
  },
  {
    id: 'japan-btc-etf',
    date: '2025-09-15',
    title: '日本批准首個比特幣現貨 ETF',
    titleEn: 'Japan Approves First Spot Bitcoin ETF',
    description:
      '日本金融廳批准首個比特幣現貨 ETF，成為亞洲主要經濟體中繼香港之後開放此類產品的國家。',
    category: 'adoption',
    significance: 'major',
  },
  {
    id: 'great-consensus-cleanup',
    date: '2025-10-01',
    title: 'Great Consensus Cleanup 討論',
    titleEn: 'Great Consensus Cleanup Discussion',
    description:
      '比特幣核心開發者持續討論「Great Consensus Cleanup」提案，旨在修復一些長期存在的協議邊界案例。',
    category: 'technical',
    significance: 'notable',
  },
  {
    id: 'btc-derivatives-growth',
    date: '2025-10-15',
    title: '比特幣衍生品市場創新高',
    titleEn: 'Bitcoin Derivatives Market Reaches New High',
    description:
      '比特幣期貨和選擇權未平倉合約創歷史新高，機構投資者的參與度持續提升，市場結構日趨成熟。',
    category: 'market',
    significance: 'notable',
  },
  {
    id: 'ln-mobile-wallets',
    date: '2025-11-01',
    title: '閃電網路手機錢包用戶突破千萬',
    titleEn: 'Lightning Mobile Wallet Users Exceed 10 Million',
    description:
      '閃電網路手機錢包（如 Phoenix、Breez、Zeus 等）總用戶數突破 1,000 萬，日常小額支付使用場景持續擴展。',
    category: 'adoption',
    significance: 'major',
  },
  {
    id: 'bitcoin-core-28',
    date: '2025-11-15',
    title: 'Bitcoin Core 28.0 發布',
    titleEn: 'Bitcoin Core 28.0 Released',
    description:
      'Bitcoin Core 28.0 正式發布，帶來多項性能優化和安全改進，持續強化比特幣網路的穩健性。',
    category: 'technical',
    significance: 'notable',
  },
  {
    id: 'btc-remittance-milestone',
    date: '2025-12-01',
    title: '比特幣跨境匯款突破 100 億美元',
    titleEn: 'Bitcoin Cross-Border Remittances Exceed $10B',
    description:
      '透過比特幣和閃電網路進行的跨境匯款年總額突破 100 億美元，成為傳統匯款服務的重要替代方案。',
    category: 'adoption',
    significance: 'major',
  },
];

// 比特幣特殊節日
export const bitcoinHolidays: BitcoinHoliday[] = [
  {
    id: 'genesis-day',
    date: '01-03',
    name: '創世區塊日',
    nameEn: 'Genesis Block Day / Proof of Keys Day',
    description:
      '紀念 2009 年比特幣創世區塊的誕生，也是「密鑰證明日」(Proof of Keys Day)。鼓勵將比特幣從交易所轉到自己的錢包。',
    origin: '2009 年 1 月 3 日',
    icon: '🏛️',
    celebrationIdeas: ['驗證創世區塊', '將比特幣轉到自己的錢包', '回顧比特幣歷史'],
  },
  {
    id: 'running-bitcoin-day',
    date: '01-12',
    name: 'Hal Finney 日',
    nameEn: 'Running Bitcoin Day',
    description:
      '紀念 Hal Finney 發出經典推文 "Running bitcoin" 並收到第一筆 P2P 比特幣交易的日子。Hal Finney 是比特幣的第一個用戶（除中本聰外）和重要貢獻者。',
    origin: '2009 年 1 月 12 日',
    icon: '🏃',
    celebrationIdeas: ['運行比特幣節點', '學習 RPOW', '緬懷 Hal Finney 的貢獻'],
  },
  {
    id: 'lightning-day',
    date: '03-15',
    name: '閃電網路日',
    nameEn: 'Lightning Network Day',
    description: '紀念 2018 年閃電網路在比特幣主網正式上線，開啟 Layer 2 擴展新時代。',
    origin: '2018 年 3 月 15 日',
    icon: '⚡',
    celebrationIdeas: ['開設閃電通道', '用閃電網路支付', '學習 HTLC 原理'],
  },
  {
    id: 'pizza-day',
    date: '05-22',
    name: 'Bitcoin Pizza Day',
    nameEn: 'Bitcoin Pizza Day',
    description:
      '紀念 2010 年 Laszlo Hanyecz 用 10,000 BTC 購買兩個披薩，這是比特幣首次被用於實際商品交易。這是比特幣最著名的節日之一。',
    origin: '2010 年 5 月 22 日',
    icon: '🍕',
    celebrationIdeas: ['吃披薩', '用比特幣或閃電網路買披薩', '計算 10,000 BTC 的現值'],
  },
  {
    id: 'len-sassaman-day',
    date: '07-03',
    name: 'Len Sassaman 紀念日',
    nameEn: 'Len Sassaman Day',
    description:
      '紀念密碼龐克先驅 Len Sassaman，他對隱私技術和 PGP 的貢獻深遠影響了比特幣的發展。他的訃告被永久刻在區塊鏈上。',
    origin: '社群自發紀念',
    icon: '🕯️',
    celebrationIdeas: ['學習密碼學歷史', '使用 PGP 加密', '探索隱私技術'],
  },
  {
    id: 'independence-day',
    date: '08-01',
    name: '比特幣獨立日',
    nameEn: 'Bitcoin Independence Day',
    description:
      '紀念 2017 年用戶激活軟分叉 (UASF) 成功，社群證明了用戶才是比特幣網路的最終決策者，而非礦工或企業。',
    origin: '2017 年 8 月 1 日',
    icon: '🗽',
    celebrationIdeas: ['運行全節點', '學習 UASF 歷史', '參與社群討論'],
  },
  {
    id: 'segwit-day',
    date: '08-24',
    name: 'SegWit 日',
    nameEn: 'SegWit Day',
    description:
      '紀念 2017 年隔離見證（SegWit）在比特幣主網啟用，這是比特幣最重要的協議升級之一，解決了交易延展性問題。',
    origin: '2017 年 8 月 24 日',
    icon: '🔧',
    celebrationIdeas: ['學習 SegWit 原理', '升級到 Native SegWit 地址', '研究交易延展性問題'],
  },
  {
    id: 'whitepaper-day',
    date: '10-31',
    name: '白皮書日',
    nameEn: 'Whitepaper Day / Bitcoin Halloween',
    description: '紀念 2008 年中本聰發布比特幣白皮書，也恰逢萬聖節。這是比特幣的「生日」。',
    origin: '2008 年 10 月 31 日',
    icon: '📜',
    celebrationIdeas: ['閱讀白皮書', '分享比特幣知識', '舉辦線上討論會'],
  },
  {
    id: 'taproot-day',
    date: '11-14',
    name: 'Taproot 日',
    nameEn: 'Taproot Day',
    description:
      '紀念 2021 年 Taproot 升級啟用，引入 Schnorr 簽名，大幅提升比特幣的隱私性和智能合約能力。',
    origin: '2021 年 11 月 14 日',
    icon: '🌳',
    celebrationIdeas: ['學習 Schnorr 簽名', '探索 Tapscript', '研究 MAST 結構'],
  },
  {
    id: 'first-halving-day',
    date: '11-28',
    name: '首次減半紀念日',
    nameEn: 'First Halving Anniversary',
    description: '紀念 2012 年比特幣首次減半，區塊獎勵從 50 BTC 減至 25 BTC，驗證了比特幣的貨幣政策。',
    origin: '2012 年 11 月 28 日',
    icon: '✂️',
    celebrationIdeas: ['研究減半經濟學', '回顧歷次減半', '預測下次減半影響'],
  },
  {
    id: 'satoshi-last-day',
    date: '12-12',
    name: '中本聰告別日',
    nameEn: 'Satoshi Farewell Day',
    description:
      '紀念 2010 年中本聰在論壇最後發言，此後逐漸淡出，將比特幣完全交給社群。體現了比特幣的去中心化精神。',
    origin: '2010 年 12 月 12 日',
    icon: '👋',
    celebrationIdeas: ['思考去中心化的意義', '閱讀中本聰的文章', '感謝社群貢獻者'],
  },
  {
    id: 'hodl-day',
    date: '12-18',
    name: 'HODL 日',
    nameEn: 'HODL Day',
    description:
      '紀念 2013 年 GameKyuubi 在 Bitcointalk 發表的經典醉酒帖子「I AM HODLING」，HODL 成為比特幣文化的標誌性梗。',
    origin: '2013 年 12 月 18 日',
    icon: '💎',
    celebrationIdeas: ['堅定持有', '閱讀原文', '分享 HODL 表情包'],
  },
  {
    id: 'etf-day',
    date: '01-10',
    name: 'ETF 日',
    nameEn: 'Bitcoin ETF Day',
    description:
      '紀念 2024 年美國 SEC 批准首批現貨比特幣 ETF，標誌著華爾街與傳統金融全面接納比特幣的歷史性時刻。',
    origin: '2024 年 1 月 10 日',
    icon: '📈',
    celebrationIdeas: ['研究 ETF 結構', '追蹤機構動態', '學習傳統金融如何接納比特幣'],
  },
  {
    id: 'blocksize-war-victory',
    date: '11-08',
    name: '區塊大小戰爭勝利日',
    nameEn: 'Blocksize War Victory Day',
    description:
      '紀念 2017 年 SegWit2X 硬分叉計畫被取消，比特幣社群成功抵禦企業集團試圖控制協議的行為，證明用戶才是比特幣的主人。',
    origin: '2017 年 11 月 8 日',
    icon: '⚔️',
    celebrationIdeas: ['閱讀《區塊大小戰爭》', '運行全節點', '了解去中心化治理'],
  },
  {
    id: 'bitcoin-legal-tender-day',
    date: '09-07',
    name: '比特幣法幣日',
    nameEn: 'Bitcoin Legal Tender Day',
    description:
      '紀念 2021 年薩爾瓦多《比特幣法》正式生效，比特幣首次成為主權國家的法定貨幣。',
    origin: '2021 年 9 月 7 日',
    icon: '🇸🇻',
    celebrationIdeas: ['了解薩爾瓦多比特幣政策', '使用 Chivo 錢包', '支持比特幣國家'],
  },
  {
    id: 'difficulty-adjustment-day',
    date: '04-20',
    name: '減半日',
    nameEn: 'Halving Day',
    description:
      '紀念比特幣減半機制，約每四年區塊獎勵減半一次。2024 年第四次減半發生在這一天，區塊獎勵從 6.25 減至 3.125 BTC。',
    origin: '2024 年 4 月 20 日',
    icon: '⛏️',
    celebrationIdeas: ['計算下次減半日期', '回顧減半歷史', '理解供應稀缺性'],
  },
  {
    id: 'finney-day',
    date: '01-28',
    name: 'Finney 紀念日',
    nameEn: 'Finney Memorial Day',
    description:
      '紀念 Hal Finney 的生日。他是比特幣的第一位用戶（除中本聰外）、RPOW 發明者、和 PGP 2.0 的主要開發者。2014 年因 ALS 去世。',
    origin: '1956 年 1 月 28 日',
    icon: '🏃',
    celebrationIdeas: ['學習 Hal Finney 的貢獻', '運行比特幣全節點', '閱讀他的論壇文章'],
  },
  {
    id: 'bitcoin-atm-day',
    date: '10-29',
    name: '首台比特幣 ATM 日',
    nameEn: 'First Bitcoin ATM Day',
    description:
      '紀念 2013 年在加拿大溫哥華 Waves 咖啡店安裝了全球首台比特幣 ATM，讓普通人可以用現金購買比特幣。',
    origin: '2013 年 10 月 29 日',
    icon: '🏧',
    celebrationIdeas: ['找尋附近的比特幣 ATM', '體驗 ATM 購幣', '了解 ATM 發展史'],
  },
  {
    id: 'new-liberty-standard-day',
    date: '10-05',
    name: '首次定價日',
    nameEn: 'First Pricing Day',
    description:
      '紀念 2009 年 New Liberty Standard 發布首個比特幣匯率（1 美元 = 1,309.03 BTC），基於挖礦電力成本計算。',
    origin: '2009 年 10 月 5 日',
    icon: '💵',
    celebrationIdeas: ['計算當年的比特幣價值', '了解價值發現過程', '思考貨幣的本質'],
  },
  {
    id: 'adam-back-day',
    date: '03-28',
    name: 'HashCash 日',
    nameEn: 'HashCash Day',
    description:
      '紀念 1997 年 Adam Back 發明 HashCash 的日子，工作量證明概念後來成為比特幣挖礦的核心技術。',
    origin: '1997 年 3 月 28 日',
    icon: '⚙️',
    celebrationIdeas: ['學習工作量證明原理', '了解密碼龐克歷史', '閱讀 HashCash 論文'],
  },
  {
    id: 'lnp2pbot-day',
    date: '02-28',
    name: '閃電 P2P 交易日',
    nameEn: 'Lightning P2P Day',
    description:
      '紀念去中心化閃電網路 P2P 交易平台的興起，如 RoboSats 和 LNP2PBot，讓用戶可以無需 KYC 購買比特幣。',
    origin: '社群自發紀念',
    icon: '🤖',
    celebrationIdeas: ['嘗試 P2P 交易', '了解去中心化交易', '支持隱私權'],
  },
  {
    id: 'stratosphere-day',
    date: '11-29',
    name: '破萬日',
    nameEn: 'Bitcoin $10K Day',
    description:
      '紀念 2017 年比特幣價格首次突破 10,000 美元，這是一個重要的心理價位里程碑。',
    origin: '2017 年 11 月 29 日',
    icon: '🚀',
    celebrationIdeas: ['回顧價格歷史', '思考長期價值', '計算投資報酬率'],
  },
  {
    id: 'nakamoto-day',
    date: '04-05',
    name: '中本聰生日',
    nameEn: 'Nakamoto Birthday',
    description:
      '中本聰在 P2P Foundation 註冊資料中填寫的生日（1975 年 4 月 5 日）。1933 年的這一天，羅斯福簽署了沒收黃金的 6102 號行政命令。',
    origin: 'P2P Foundation 註冊資料',
    icon: '🎂',
    celebrationIdeas: ['思考匿名的意義', '閱讀白皮書', '探索 6102 號命令歷史'],
  },
  {
    id: 'freedom-day',
    date: '06-09',
    name: '比特幣自由日',
    nameEn: 'Bitcoin Freedom Day',
    description:
      '紀念 2021 年薩爾瓦多通過比特幣法案的日子，比特幣首次成為主權國家的法定貨幣，開創歷史先河。',
    origin: '2021 年 6 月 9 日',
    icon: '🗽',
    celebrationIdeas: ['了解薩爾瓦多政策', '支持比特幣友好國家', '推廣比特幣採用'],
  },
];

// 輔助函數
export function getMilestonesByYear(year: number): BitcoinMilestone[] {
  return bitcoinMilestones.filter((m) => m.date.startsWith(year.toString()));
}

export function getMilestonesByCategory(
  category: BitcoinMilestone['category']
): BitcoinMilestone[] {
  return bitcoinMilestones.filter((m) => m.category === category);
}

export function getUpcomingHoliday(): BitcoinHoliday | undefined {
  const today = new Date();
  const todayMMDD = `${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

  // 按日期排序
  const sorted = [...bitcoinHolidays].sort((a, b) => a.date.localeCompare(b.date));

  // 找下一個節日（今天或之後）
  const upcoming = sorted.find((h) => h.date >= todayMMDD);

  // 如果今年沒有了，返回明年第一個
  return upcoming || sorted[0];
}

export function getHolidayByMonth(month: number): BitcoinHoliday[] {
  const monthStr = String(month).padStart(2, '0');
  return bitcoinHolidays.filter((h) => h.date.startsWith(monthStr));
}

export function getTodayHoliday(): BitcoinHoliday | undefined {
  const today = new Date();
  const todayMMDD = `${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
  return bitcoinHolidays.find((h) => h.date === todayMMDD);
}

// 今日歷史事件
export function getTodayInHistory(): BitcoinMilestone[] {
  const today = new Date();
  const todayMMDD = `-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
  return bitcoinMilestones.filter((m) => m.date.endsWith(todayMMDD));
}

// 取得特定日期的歷史事件
export function getHistoryByDate(month: number, day: number): BitcoinMilestone[] {
  const mmdd = `-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  return bitcoinMilestones.filter((m) => m.date.endsWith(mmdd));
}

// 分類標籤
export const categoryLabels: Record<BitcoinMilestone['category'], string> = {
  genesis: '起源',
  technical: '技術',
  adoption: '採用',
  regulatory: '監管',
  market: '市場',
  community: '社群',
};

export const categoryColors: Record<BitcoinMilestone['category'], string> = {
  genesis: 'bitcoin',
  technical: 'lightning',
  adoption: 'success',
  regulatory: 'warning',
  market: 'nostr',
  community: 'default',
};

// 統計資訊
export function getTimelineStats() {
  const years = [...new Set(bitcoinMilestones.map((m) => m.date.substring(0, 4)))];
  const categories = bitcoinMilestones.reduce(
    (acc, m) => {
      acc[m.category] = (acc[m.category] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  return {
    totalMilestones: bitcoinMilestones.length,
    totalHolidays: bitcoinHolidays.length,
    yearsCovered: years.length,
    firstYear: Math.min(...years.map(Number)),
    lastYear: Math.max(...years.map(Number)),
    criticalEvents: bitcoinMilestones.filter((m) => m.significance === 'critical').length,
    categoryCounts: categories,
  };
}
