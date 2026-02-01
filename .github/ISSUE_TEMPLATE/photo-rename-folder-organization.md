---
name: 写真のリネーム・フォルダ整理
about: 実施した写真リネームとフォルダ整理のチェックリスト（記録用）
title: '写真のリネーム・フォルダ整理'
labels: ''
assignees: ''
---

## 写真のリネーム・フォルダ整理（チェックリスト）

**記録は Issue で管理する。ファイルを闇雲に増やさない。**

実施した内容をこの Issue に残して参照・管理用に使います。

---

### ページ名（ルーティング）

- [x] store_nico.html → **store.html**
- [x] store_curry.html → **curry.html**
- [x] store_bar.html → **bar.html**
- [x] index.html のリンクを store.html / curry.html / bar.html に更新

---

### ニコ酒店（store_nico）

- [x] 直下：001secchu → secchu.jpg、002ryokuin → ryokuin.jpg、003anka → anka.jpg、004kusamoe → kusamoe.jpg、005shutou → shutou.jpg（のちに tea/syuutou を使用し shutou.jpg は削除）
- [x] product1～5 → product_01～product_05.jpg
- [x] medicine：IMG_7396 等5枚 → medicine_fueki, medicine_ichigo, medicine_camomile, medicine_holon_original, medicine_holon_ame
- [x] medicine 残り12枚 → medicine_01～12.jpg（とりあえず）
- [x] recommend：nico_recommend_01～03 → recommend_01～03.jpg
- [x] event：240422_event.JPG 等8枚 → event_20240422.JPG ～ event_20260117.JPG
- [x] **tea/** フォルダ作成し syuutou.jpg（秋燈・お茶）を移動
- [x] store.html の秋燈カードを tea/syuutou.jpg に変更

---

### カレー（curry）

- [x] curry_hero.JPG → hero.jpg
- [x] IMG_1440～1444 → menu_vegetable_spice, menu_butter_chicken, menu_yakuzen_keema, menu_seafood_masala, menu_spinach_cheese
- [x] event：UUID 19枚 → event_01～19.JPEG
- [x] **archive/** フォルダ作成し dilani_srilanka（カレーアーカイブ）を archive/dilani_srilanka/ に移動
- [x] bar.html の dilani_srilanka 参照を curry/archive/dilani_srilanka/ に更新

---

### BAR（bar）

- [x] bar_gallery_01～04 → **gallery/** フォルダに移動（bar/gallery/gallery_01～04.JPG）
- [x] event：UUID 24枚 → event_01～24.JPEG
- [x] bar_nico/curry_store_exterior.JPG → **bar/store_exterior.JPG** に移動（bar_nico フォルダは削除）

---

### トップ・その他

- [x] toppage：bar.jpg, curry.jpg, store.jpg（変更なし）
- [x] icons：変更なし

---

### 削除・統合済み

- [x] store_nico/shutou.jpg 削除（秋燈は tea/syuutou.jpg を使用）
- [x] bar_nico フォルダ削除（中身を bar/ に統合）

---

**詳細**：`docs/rename-plan.md` を参照。
