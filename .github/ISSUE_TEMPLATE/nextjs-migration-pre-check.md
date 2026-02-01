---
name: Next.js 移行前チェック
about: 移行前に揃えておく最低限の項目。あとは AI に投げる前提。記録は Issue で管理する。
title: 'Next.js 移行前チェック'
labels: ''
assignees: ''
---

## Next.js 移行前チェック（最低限）

**記録は Issue で管理する。ファイルを闇雲に増やさない。**  
**あとは AI に投げる予定のため、最低限のチェックのみ。**

---

### 1. ルーティング（済み）

- [x] トップ・store・curry・bar の URL を整えた（index.html, store.html, curry.html, bar.html）
- [ ] contract.html をサイトに含めるか、別場所にするか決める

**メモ**：Next では `/`, `/store`, `/curry`, `/bar`。ドメインは midorino-tatemono.tokyo 想定。

---

### 2. その他（AI に投げる前提）

- 共通パーツ（Header, Footer, StoreCard, Swiper など）・データのまとめ・CSS 分割・画像パス・Swiper/script.js の置き換え → **移行時に AI に任せる**
- 必要なら「共通パーツ名」「contract の扱い」だけ決めておけば十分

---

**この Issue で管理するのは上記のみ。細かい設計は移行時に AI に投げる。**
