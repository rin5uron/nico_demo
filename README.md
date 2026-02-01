
```
nico_demo/
├ README.md
├ index.html
├ style.css
├ script.js
├ site/
│   └ images/
└ docs/
    ├ contacts/
    │   └ proposals/
    ├ contracts/      # 契約書・更新契約のPDF（任意で新設）
    ├ media/
    ├ notes/
    ├ spec/
    └ repository_management_plan.md
```

## このリポジトリの役割

**契約前段階まで＋契約書類の保管庫**（デモ・企画・契約の記録を一箇所にまとめる用）。

| 入れるもの | 説明 |
|-----------|------|
| デモサイトの最終版コード | 静的サイト（index / store / curry / bar） |
| 契約前・決定前の記録 | 提案・見積・議事録など `docs/contacts/` のアーカイブ |
| 契約書・更新契約のPDF | **最低限 `docs` に保管**。`docs/contacts/proposals/` の日付フォルダか `docs/contracts/` で管理 |

本番サイトの開発は**nico**リポジトリ（Next.js）で行います。契約書・経緯の詳細はこのリポジトリを参照し、本番用には契約書は置きません。  
詳細は [docs/repository_management_plan.md](docs/repository_management_plan.md) を参照。

### GitHub の About（Description）に貼る用

| リポジトリ | 説明文 |
|-----------|--------|
| **nico_demo**（このリポ） | デモ・契約前段階の記録と契約書類の保管。本番は別リポジトリ。 |
| **nico**（本番用） | ニコ酒店 本番サイト（Next.js）。開発・デプロイはこちら。契約書類は nico_demo を参照。 |

---

## ブランチとバージョン管理

| ブランチ | バージョン | Vercel URL | 説明 |
|---------|----------|-----------|------|
| `develop` | v0.1.0-alpha | [https://nico-demo-git-develop-rs-projects-9c94598c.vercel.app/](https://nico-demo-git-develop-rs-projects-9c94598c.vercel.app/) | 開発版（初期バージョン） |
| `develop-v0.2` | v0.2.0-alpha | 未発行 | 次期バージョン開発ブランチ<br>GitHub: [develop-v0.2](https://github.com/rin5uron/nico_demo/tree/develop-v0.2) |
| `pattern-b` | - | [https://nico-demo-git-pattern-b-rs-projects-9c94598c.vercel.app/](https://nico-demo-git-pattern-b-rs-projects-9c94598c.vercel.app/) | デザインパターンB検証用 |

## デプロイ済みサイト

現在の最終確認用サイト（パターンB）: https://nico-demo-git-pattern-b-rs-projects-9c94598c.vercel.app/