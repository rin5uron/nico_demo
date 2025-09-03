## Next.js 再構築設計書

このドキュメントは、既存のWebサイトをNext.jsフレームワークに移行するための設計と手順を定義します。

### 1. 基本方針

-   **App Routerの採用**: Next.jsの最新機能であるApp Routerを利用し、`app`ディレクトリベースのルーティングとコンポーネント管理を行います。
-   **コンポーネントベース設計**: 既存のHTMLを再利用可能なReactコンポーネントに分割し、コードの保守性と可読性を向上させます。
-   **CSS Modules**: スタイルの競合を防ぐため、コンポーネントごとにスコープされたCSS（CSS Modules）を基本とします。共通スタイルはグローバルCSSで管理します。
-   **画像最適化**: Next.jsの`<Image>`コンポーネントを利用し、画像の自動最適化（リサイズ、WebP変換など）を行い、パフォーマンスを向上させます。
-   **静的サイト生成 (SSG)**: 更新頻度が低いページは静的に生成し、高速な表示を実現します。

### 2. プロジェクト構造（案）

```
/
├── /app/                     # 主なアプリケーションコード
│   ├── /_components/         # サイト全体で使う共通コンポーネント
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── SectionTitle.tsx
│   ├── page.tsx              # トップページ (旧 index.html)
│   ├── layout.tsx            # 全ページ共通のレイアウト (<html>, <body>)
│   └── globals.css           # グローバルCSS (旧 style.css の一部)
│
├── /components/              # 特定のページや機能で使うコンポーネント
│   ├── HeroSection.tsx
│   ├── NewsSection.tsx
│   ├── ConceptSection.tsx
│   ├── ProductsSection.tsx
│   └── ContactSection.tsx
│
├── /public/                  # 静的ファイル (画像など)
│   ├── /images/
│   │   ├── logo.jpg
│   │   └── ... (既存の画像をすべてここに移動)
│   └── /icons/
│       └── ... (既存のアイコンをすべてここに移動)
│
└── package.json              # プロジェクト設定
```

### 3. コンポーネント分割計画

`index.html`を以下のReactコンポーネントに分割します。

| コンポーネント名 | 対応するHTML要素/セクション | 役割・機能 |
| :--- | :--- | :--- |
| `Header` | `<header>` | ヘッダー、ナビゲーション、SNSリンク。モバイルメニューの開閉状態を`useState`で管理。 |
| `Footer` | `<footer>` | フッター、コピーライト表示。 |
| `HeroSection` | `<section class="main-visual">` | メインビジュアルとキャッチコピー。 |
| `NewsSection` | `<section class="news-instagram">` | お知らせ（カレンダーとInstagram埋め込み）。 |
| `ConceptSection` | `<section id="store-concept">` | 「お店について」のセクション。 |
| `ProductsSection` | `<section id="product">` | 取扱商品セクション。薬膳茶や各種サンプル表示を含む。Swiper.js部分はクライアントコンポーネント(`"use client"`)として実装。 |
| `ContactSection` | `<section id="contact">` | お問い合わせ情報とGoogle Map。 |
| `SectionTitle` | `<div class="section-title">` | 各セクションで共通して使われるタイトル部分をコンポーポーネント化。 |

### 4. ファイル移行計画

-   **HTML (`index.html`)**:
    -   内容は`app/page.tsx`と上記コンポーネントに分割してJSXとして記述します。
    -   `lang="ja"`は`app/layout.tsx`の`<html>`タグに設定します。
    -   `<head>`内の`<title>`や`<meta>`タグは、`app/layout.tsx`の`metadata`オブジェクトで管理します。
    -   Google Fontsの読み込みは`next/font`を利用するとより最適化されます。

-   **CSS (`site/style.css`)**:
    -   `globals.css`: `:root`で定義されているCSS変数や、`body`, `a`タグなどの全体的なスタイルを`app/globals.css`に移行します。
    -   **コンポーネントCSS**: 各コンポーネントに関連するスタイルは、それぞれのコンポーネントファイルと同じ階層に`[ComponentName].module.css`という名前で作成し、CSS Modulesとして読み込みます。これにより、クラス名の衝突を心配する必要がなくなります。
        -   例: `Header.tsx` と `Header.module.css`

-   **JavaScript (`site/script.js`)**:
    -   **モバイルメニュー**: `Header`コンポーネント内で`useState`フックを使ってメニューの開閉状態を管理し、Reactのイベントハンドラ（`onClick`）で制御します。DOMを直接操作するコードは不要になります。
    -   **スクロールアニメーション**: `Intersection Observer`のロジックは、クライアントコンポーネント(`"use client"`)を作成し、`useEffect`フック内で実装するのが一般的です。
    -   **Swiper.js**: `ProductsSection`をクライアントコンポーネントとし、`useEffect`内でSwiperを初期化します。`react-id-swiper`のようなReact用ライブラリを導入すると、より宣言的に記述できます。
    -   **Instagram埋め込み**: `script.js`は不要になり、Next.jsの`<Script>`コンポーネントを使って`//www.instagram.com/embed.js`を読み込むことで、パフォーマンスを最適化できます。

-   **画像 (`site/images/`, `docs/media/`)**:
    -   すべての画像ファイルを`public/images/`ディレクトリに集約します。
    -   `<img>`タグはNext.jsの`<Image>`コンポーネントに置き換えます。
        -   旧: `<img src="site/images/logo.jpg" alt="...">`
        -   新: `<Image src="/images/logo.jpg" alt="..." width={50} height={50} />` (width/heightは要調整)

### 5. 実装の進め方（推奨）

1.  **Next.jsプロジェクト作成**:
    ```bash
    npx create-next-app@latest nico-next-app --typescript --tailwind no --eslint yes --app yes --src-dir no --import-alias "@/*"
    ```
2.  **ファイル配置**:
    -   `public`ディレクトリを作成し、既存の画像ファイルをすべてコピーします。
    -   `app/globals.css`に共通スタイルをコピーします。
3.  **レイアウト作成 (`app/layout.tsx`)**:
    -   `Header`と`Footer`コンポーネントの枠を作成し、`layout.tsx`に配置します。
    -   `metadata`を設定し、Google Fontsを読み込みます。
4.  **トップページ作成 (`app/page.tsx`)**:
    -   各セクションのコンポーネント（`HeroSection`, `NewsSection`など）の枠を作成し、`page.tsx`に配置します。
5.  **コンポーネント実装（個別）**:
    -   各コンポーネントにHTML構造をJSXとして移植し、CSS Modulesでスタイリングしていきます。
    -   JavaScriptの機能が必要なコンポーネントは`"use client";`をファイルの先頭に記述し、Reactのフックを使ってインタラクティブな機能を実装します。

---

この設計書が、Next.jsでの再構築を進める上での明確な指標となれば幸いです。ご不明な点があれば、いつでも質問してください。