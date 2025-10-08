# 📚 学習記録

## 📋 目次

[20251014_Xcodeの役割](#20251014_xcodeの役割)

[20251014_worktreeの活用](#20251014_worktreeの活用)

[20250731_ディレクトリ構造について](#20250731_ディレクトリ構造について)

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