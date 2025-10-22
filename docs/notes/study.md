# 📚 学習記録

## 📋 目次

[20251022_リモートブランチの直接操作](#20251022_リモートブランチの直接操作)

[20251009_Git Worktreeのマージと整理](#20251009_git-worktreeのマージと整理)

[20250115_VercelのworktreeブランチURL発行について](#20250115_vercelのworktreeブランチurl発行について)

[20251009_画像形式HEICとJPEGの使い分け](#20251009_画像形式heicとjpegの使い分け)

[20251014_Xcodeの役割](#20251014_xcodeの役割)

[20251014_worktreeの活用](#20251014_worktreeの活用)

[20250731_ディレクトリ構造について](#20250731_ディレクトリ構造について)

---

# 20251022_リモートブランチの直接操作

## 💡 Git Worktreeとリモートブランチの直接操作

### Git Worktreeとは

通常のgitは1つのディレクトリで1つのブランチしか扱えないが、**worktree**を使うと、1つのリポジトリで複数のディレクトリを使い、それぞれ異なるブランチで同時に作業できる。

#### 例
```
/Users/rin5uron/Desktop/nico_demo            → main ブランチ
/Users/rin5uron/Desktop/nico_demo_pattern_b  → pattern-b ブランチ
```

**重要:** この場合、`nico_demo_pattern_b`から`git checkout main`しようとすると、mainは既に`nico_demo`で使用中のためエラーになる。

```bash
# エラー例
$ git checkout main
fatal: 'main' is already used by worktree at '/Users/rin5uron/Desktop/nico_demo'
```

---

### リモートブランチから直接新しいブランチを作る

**重要な発見:** ローカルにcheckoutせずに、リモートのブランチから直接新しいブランチを作成できる。

#### コマンド構文
```bash
git push <リモート名> <ソース>:<デスティネーション>
```

#### 実例
```bash
git push origin origin/main:refs/heads/develop-v0.2
```

**意味:**
- `origin/main`（リモートのmainブランチ）を元に
- `develop-v0.2`という新しいブランチをリモートに作成

#### 実行結果
```bash
remote:
remote: Create a pull request for 'develop-v0.2' on GitHub by visiting:
remote:      https://github.com/rin5uron/nico_demo/pull/new/develop-v0.2
remote:
To https://github.com/rin5uron/nico_demo.git
 * [new branch]      origin/main -> develop-v0.2
```

---

### メリット

| メリット | 説明 |
|---------|------|
| ローカルcheckout不要 | worktreeで別ブランチを開いていても実行可能 |
| リモート間で完結 | ローカルにブランチを作らずに済む |
| 速い | リモート同士のやり取りで瞬時に完了 |

---

### GitHub CLI との違い

これは**Git本体の機能**であり、GitHub CLIは不要。

| ツール | 機能 |
|-------|------|
| **Git本体** | ブランチ操作、コミット、マージなど基本機能 |
| **GitHub CLI** | PR作成(`gh pr create`)、Issue管理(`gh issue list`)など GitHub特化機能 |

---

### まとめ

- Git worktreeは同時に複数ブランチで作業するための仕組み
- `git push`は柔軟で、リモート間でのブランチ操作が可能
- ローカルにcheckoutせずともリモートブランチを操作できる
- worktreeで別ブランチを使用中でも、リモートブランチの操作は可能

<br><br><br>

---

# 20251009_Git Worktreeのマージと整理

## 概要
`git worktree` で作成した作業ブランチをプルリクエストし、`main` ブランチにマージした後の整理手順と、次の作業への移行方法をまとめる。

---

### 1. Worktreeブランチのマージ

Worktreeで作成したブランチ (`pattern-b`など) は、GitHub上で通常のブランチと同様にプルリクエストを作成し、マージすることができます。
マージが完了すると、`main`ブランチに変更が統合されます。

---

### 2. マージ後の整理

マージが完了し、不要になったWorktreeは、関連する作業ディレクトリとブランチを削除して整理します。

```bash
# 現在のworktree一覧を確認
git worktree list

# 使い終わったworktree（作業ディレクトリ）を削除
# これにより '../pattern-b' のようなディレクトリがクリーンアップされます
git worktree remove ../pattern-b

# 不要になったブランチをローカルから削除
git branch -d pattern-b
```
**注意:** リモートブランチがまだ残っている場合は、`git push origin --delete pattern-b` で削除できます。

---

### 3. mainブランチの更新

ローカルの `main` ブランチも、リモートリポジトリの最新の状態に更新しておきます。

```bash
# mainブランチに切り替え
git checkout main

# リモートの最新情報を取得してマージ
git pull origin main
```

---

### 4. 次の作業ブランチの作成

新しい作業を始める際は、再度 `worktree add` コマンドで新しい作業ディレクトリとブランチを作成します。

```bash
# 新しいブランチ 'pattern-c' を作成し、'../pattern-c' ディレクトリに展開
git worktree add ../pattern-c -b pattern-c
```
これにより、また独立した環境で新しい作業を開始できます。

<br><br><br>

---

# 20250115_VercelのworktreeブランチURL発行について

## 💡 Vercelでのブランチ別デプロイとURL発行の仕組み

---

### 🤔 発見したこと
Vercelダッシュボードの「Active Branches」セクションで、worktreeブランチのURLが自動発行される仕組みを理解した。

---

### ⚙️ URL発行の仕組み

| 要素 | 内容 |
|------|------|
| **発行場所** | Vercelダッシュボードの「Active Branches」セクション |
| **発行タイミング** | ブランチにプッシュした瞬間に自動でプレビューURLが生成される |
| **URL形式** | `nico-demo-[ランダムID].vercel.app` |
| **確認方法** | 各ブランチの右側にある「Preview」ボタンをクリック |

---

### 🌱 現在のブランチ状況
- **pattern-b**: ID `44tvdkcE5`（5分前に更新）
- **develop**: ID `12z5cvWhL`（8月10日に更新）

---

### ✅ 学びポイント

| 学び | 内容 |
|------|------|
| **自動発行** | ブランチ名に関係なく、プッシュすれば自動でプレビューURLが生成される |
| **本番との違い** | 本番URLは`main`ブランチのみ。その他のブランチは全てプレビュー |
| **同時並行開発** | 複数ブランチを同時にプレビューできる |
| **URL管理** | 各ブランチごとにユニークなIDが割り当てられる |

---

### 💬 devブランチについて
**結論：`dev`ブランチでも全く同じ仕組みで自動発行される。**

- `dev`ブランチにプッシュ → 自動でプレビューURL生成
- `feature-xxx`ブランチにプッシュ → 自動でプレビューURL生成  
- `hotfix-xxx`ブランチにプッシュ → 自動でプレビューURL生成

**ブランチ名は関係なく、プッシュした瞬間にVercelが自動でプレビュー環境を構築してくれる。**

---

### 🌷 まとめ
> Vercelの「Active Branches」の「Preview」ボタンが、worktreeブランチのURL発行場所。  
> ブランチ名に関係なく、プッシュすれば自動でプレビューURLが生成される仕組み。

---

# 20251009_画像形式HEICとJPEGの使い分け

## 🤔 背景
クライアントから提供された画像がHEIC形式（`.heic`）だった。
Webサイトで利用するためにJPEGに変換したが、その理由と使い分けを整理する。

---

### 💡 HEICとJPEGの主な違い

| 特徴 | HEIC (High Efficiency Image Container) | JPEG (Joint Photographic Experts Group) |
|---|---|---|
| **互換性** | 比較的低い（Apple製品が中心） | **非常に高い**（ほぼ全てのデバイス・ブラウザで対応） |
| **圧縮率** | 高い（JPEGより小さいファイルサイズで同等の画質を保てる） | 高い（Webで十分な圧縮率） |
| **用途** | 写真の保存・管理 | **Webサイト、メール、資料など幅広い用途** |
| **ライセンス** | ライセンス料が発生する場合がある | パテントフリー |

---

### ✅ Webサイトでの結論

**WebサイトではJPEGを使うのが最適。**

理由は以下の通り：
1.  **圧倒的な互換性:** どのユーザー環境でも画像が問題なく表示される。
2.  **十分な圧縮率:**ページの表示速度を損なわない程度にファイルサイズを軽量化できる。

HEICは高画質・高効率な良い形式だが、Webの「誰でも見れる」という特性とは相性が悪い。

---

### 🌱 まとめ
> HEICはAppleデバイスでの写真保存には優れているが、Webサイトで公開する際は、互換性の高いJPEGに変換して使用するべき。

<br><br><br>

---

# 20251014_Xcodeの役割
## 💡 Xcodeを入れたらCursorのWorktree設定が使えるようになった理由と学び

---

### 🧠 気づき
- Cursorの「Git Worktree」設定が出なかったけど  
  **Xcodeをインストールしたら突然使えるようになった。**
- これには「Xcodeの中に入っている開発ツール」が関係していた。

---

### ⚙️ Xcodeの役割（ざっくり）
Appleが提供している**Mac用の開発環境**。  
アプリを作るだけじゃなく、Mac全体に必要な「開発者用ツール」を入れてくれる。

中には次のようなものが含まれている👇

| 含まれているツール | 役割 |
|--------------------|------|
| `git` | バージョン管理コマンド（最新版に更新される） |
| `clang` / `gcc` | C/C++などのビルド用コンパイラ |
| `xcodebuild` | macOS/iOSアプリのビルドコマンド |
| 証明書・署名関連ツール | 開発アプリの実行を許可する署名を扱う |
| Command Line Tools（CLI） | ターミナルから開発系コマンドを動かせるようにする |

---

### 💻 今回の現象のしくみ
Cursorは内部的に「git」や「開発ツール（CLI）」を呼び出して動いている。  
でもMac標準状態ではそれらが古かったり足りなかったりする。

**→ Xcodeを入れたことで次のことが起きた：**

1. 最新の `git` がインストールされた  
2. 開発者ツール（Command Line Tools）がセットアップされた  
3. macOSが開発ツールに必要な権限・署名を許可した  
4. その結果、Cursorの更新やGit連携が正常に動くようになった  

---

### ✅ 学びポイント

| 学び | 内容 |
|------|------|
| Xcodeはアプリ開発専用じゃない | 「開発者ツールの土台」を整える役割がある |
| CLI（Command Line Tools）は大事 | ターミナルやElectronアプリ（Cursorなど）に必要な裏方 |
| Macの開発環境はXcodeで整う | git, node, cursor, vercelなどが安定動作するようになる |
| Worktreeやgitの不具合はツール不足でも起きる | エラーの原因はアプリではなく環境の準備不足のこともある |

---

### 🌱 まとめ
> Xcodeを入れたことで、macOSに「開発のための基礎ツール（git・CLI・署名など）」が整い、  
> Cursorがそれらを利用できるようになった。  
> 結果、Worktree設定やアップデート処理が正常に動作した。  

---

### 💬 次に活かせること
- 新しいMacをセットアップしたらまず  
  ```bash
  xcode-select --install
<br><br><br>
# 20251014_worktreeの活用
## 💻 Cursorで既存HTMLリポジトリをWorktreeで複製・並行開発する手順

---

### 🪄 前提
- 既にGitで管理されているHTML/CSS/JSのリポジトリが存在している（例：`sample-site`）
  - ※新しく`git init`する必要はありません。既存の履歴をそのまま使います。
- 少なくとも1回以上コミットされている（＝中身がGitに登録済）
- Cursor（v1.7.33以降）を使用


---

### 🧭 ① 現在のブランチを確認
まず、今どのブランチで作業しているかを確認します。

```bash
cd ~/projects/sample-site
git branch
```

たとえば `main` や `master` と表示されていればOKです。

---

### ⚙️ ② CursorでWorktree機能をONにする

1. 右上の ⚙️ アイコン → **Settings** を開く  
2. 検索バーに「worktree」と入力  
3. 「✅ Enable Git Worktrees」をONにする  

これでCursorが複数ブランチをウィンドウごとに扱えるようになります。

---

### 🌱 ③ 新しいブランチをWorktreeで追加

以下を実行します。

```bash
git worktree add ../sample-site-b pattern-b
```

- `../sample-site-b` → 新しく作るフォルダの場所  
- `pattern-b` → 新しいブランチ名  

この時点で、自動的に**現在のブランチ（例：main）の中身がまるごとコピー**されます。  
（HTML/CSS/JS など全部含まれます。設定不要）

---

### 📁 フォルダ構成イメージ

```
sample-site/
├─ .git/
└─ ../sample-site-b/   ← pattern-b ブランチ（mainのスナップショット）
```

このコピーは実際にはGitのスナップショットによるリンクで、  
物理コピーではないので軽量です。

---

### 🖥️ ④ Cursorで2つのフォルダを開く

- ウィンドウA → `sample-site`（mainブランチ）  
- ウィンドウB → `../sample-site-b`（pattern-bブランチ）

> Cursorの「＋ New Agent Window」または「File → Open Folder」で  
> 両方を別ウィンドウで開くと同時編集が可能。

---

### 🎨 ⑤ pattern-b側で変更を加えてコミット

```bash
cd ../sample-site-b
git add .
git commit -m "update pattern B design"
```

`index.html` や `style.css` を自由に修正して保存します。  
ブラウザで main と pattern-b の両方を開いて見比べ可能です。

---

### 🔄 ⑥ mainにマージしたい場合

気に入ったデザイン（pattern-b）をmainブランチへ反映します。

```bash
cd ../sample-site
git merge pattern-b
```

---

### 🧹 ⑦ Worktreeを削除したい場合

作業用フォルダを消してブランチを削除します。

```bash
git worktree remove ../sample-site-b
git branch -d pattern-b
```

---

### 💡 補足ポイント

| 注意点 | 対応方法 |
|--------|-----------|
| コピー内容 | Worktree作成時点のブランチ内容が自動で反映される |
| 衝突リスク | HTML/CSS/JSのみならほぼゼロ |
| 差分確認 | 各フォルダで `git diff` や Cursorの差分ビューで確認可能 |
| 同時作業 | 各ブランチを別ウィンドウで開けば安全に並行開発OK |
| ディスク容量 | Gitのリンク構造なので軽量 |

---

### 🌷 使いどころの例

- クライアント提案用に **2パターンのデザイン**を同時に作る  
- 既存サイトの **改修前／改修後** を比較しながら編集する  
- **別テーマ検証**や**季節デザイン差分**の開発などに最適

---

✅ **まとめ**
> Worktree追加コマンドだけで、既存ブランチの内容がそのまま新フォルダに展開される。  
> Cursor設定でWorktreeを有効化すれば、ウィンドウごとに別ブランチを同時編集できる。

<br><br><br>

# 20250731_ディレクトリ構造について
 - 今後保守が誰がやってもわかりやすいようなディレクトリ構造を意識する
 

現在のディレクトリ構成
../../media/notes/250731_.directory

’’’
nico_demo/
├ README.md
├ index.html
├ style.css
├ script.js
├ site/
│   └ images/
└ docs/
    ├ contacts/
    ├ notes/
    ├ proposals/
    ├ media/
    │   ├ contacts/
    │   ├ notes/
    │   └ proposals/
    └ spec/
        └ spec.md
'''