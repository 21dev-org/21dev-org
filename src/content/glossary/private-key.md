---
term: 私鑰
termEn: Private Key
aliases: [私密金鑰, 秘密金鑰]
category: cryptography
difficulty: beginner
relatedTerms: [public-key, wallet, seed-phrase]
seeAlso: [/learn/basics/wallet-guide, /learn/basics/security-basics]
---

私鑰是一個 256 位元的隨機數字，是控制比特幣的唯一憑證。擁有私鑰就等於擁有對應地址上所有比特幣的完全控制權。

## 私鑰格式

私鑰可以用多種格式表示：

```
十六進位（64 字元）：
e9873d79c6d87dc0fb6a5778633389f4453213303da61f20bd67fc233aa33262

WIF 格式（Base58）：
5Kb8kLf9zgWQnogidDA76MzPL6TsZZY36hWXMssSzNydYXYB9KF

WIF 壓縮格式：
L4rK1yDtCWekvXuE6oXD9jCYfFNV2cWRpVuPLBcCU2z8TrisoyY1
```

## 安全須知

- **絕對保密**：私鑰洩露等於資產被盜
- **離線儲存**：避免在聯網設備上保存
- **多重備份**：防止單點故障
- **永不共享**：任何索要私鑰的都是詐騙

## 與公鑰的關係

私鑰通過橢圓曲線加密（ECDSA/Schnorr）單向推導出公鑰，公鑰再推導出地址。這個過程不可逆。

```
私鑰 → 公鑰 → 地址
（單向，不可逆）
```
