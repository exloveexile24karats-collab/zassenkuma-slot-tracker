# 台データ推移トラッカー（スタンドアロン版）

Claudeのアーティファクトから、GitHub Pages + Firebase で単体のWebアプリとして動くように移植したものです。
URLを知っていれば誰でもログインなしで入力・閲覧でき、スマホのホーム画面にアイコンとして追加できます。
アプリの見た目・機能はClaude版と同じです。

## 0. 全体の流れ

1. Firebaseプロジェクトを作る（データの保存先）
2. `src/firebase.js` に自分のFirebase設定を貼り付ける
3. GitHubにリポジトリを作ってこのフォルダをpush
4. GitHub Pages（GitHub Actions経由）を有効化
5. 発行されたURLをスマホで開いて「ホーム画面に追加」

以降、機能追加のたびに `git push` するだけで自動的にデプロイされ、
Firestore（データ本体）はコードのデプロイとは別物なので、**入力したデータは消えません**。

---

## 1. Firebaseプロジェクトを作る

1. https://console.firebase.google.com/ を開き、Googleアカウントでログイン
2. 「プロジェクトを作成」→ 好きな名前を入力（Google Analyticsは不要なのでオフでOK）
3. 左メニューの「構築」→「Firestore Database」→「データベースの作成」
   - ロケーションは `asia-northeast1`（東京）などお好みで
   - ルールは後で書き換えるので、いったん「テストモード」でOK
4. 左メニューの「プロジェクトの概要」の歯車アイコン →「プロジェクトの設定」
5. 「マイアプリ」→ `</>`（ウェブ）アイコンをクリックしてアプリを登録（ホスティングの設定は不要、チェックを外してOK）
6. 表示される `firebaseConfig` の中身（`apiKey`, `authDomain`, `projectId` など）をコピー

## 2. `src/firebase.js` を編集

このリポジトリの `src/firebase.js` を開き、`firebaseConfig` の中身を
手順1でコピーした値にそのまま置き換えてください。

## 3. Firestoreのセキュリティルールを設定

Firebaseコンソール →「Firestore Database」→「ルール」タブを開き、
このリポジトリの `firestore.rules` の内容をそのまま貼り付けて「公開」してください。

> ⚠️ 注意：このルールは「ログイン不要・URLを知っていれば誰でも読み書き可能」という
> 要望どおりの設定です。裏を返すと、`src/firebase.js` の設定値（＝公開されるJSファイルの中身）
> を知っていれば誰でもデータを書き換え・削除できます。他人に荒らされたくない場合は、
> リポジトリを Private にする、共有パスワードを追加する、などの対策を後から追加できます
> （必要になったら教えてください）。

## 4. ローカルで動作確認（任意）

```bash
npm install
npm run dev
```

`http://localhost:5173` で動作確認できます。

## 5. GitHubにpush

まだリポジトリを作っていない場合は、GitHub上で新しい空のリポジトリを作成してから：

```bash
git init
git add .
git commit -m "Initial commit: slot data tracker"
git branch -M main
git remote add origin https://github.com/<あなたのユーザー名>/<リポジトリ名>.git
git push -u origin main
```

## 6. GitHub Pagesを有効化

1. GitHubのリポジトリ画面 →「Settings」→ 左メニュー「Pages」
2. 「Build and deployment」の「Source」を **GitHub Actions** に設定
3. 保存すると、このリポジトリに含まれる `.github/workflows/deploy.yml` が
   自動的に動いて、`https://<ユーザー名>.github.io/<リポジトリ名>/` にデプロイされます
   （Actionsタブでビルド状況を確認できます）

## 7. スマホでホーム画面に追加

1. 発行されたURLをスマホのブラウザで開く
2. iPhone(Safari)：共有ボタン →「ホーム画面に追加」
   Android(Chrome)：メニュー →「ホーム画面に追加」/「アプリをインストール」
3. ホーム画面にアイコンが追加され、タップするとブラウザバーなしのアプリのような見た目で起動します

## 今後のアップデートについて

- コードを直して `git push` すれば、GitHub Actionsが自動でビルド・再デプロイします
- データはFirestore（Firebase側）に保存されていて、コードのデプロイとは完全に独立しています
- そのため、機能を追加してもこれまで入力したデータはそのまま残ります
- ただし、データの「形」を大きく変えるような変更（保存するJSONの構造を変えるなど）をした場合は、
  古いデータの読み込み方法を別途調整する必要があります。追加のたびに確認します。

## 構成

- `src/App.jsx` … アプリ本体（Claude版と同じUI/ロジック）
- `src/storage.js` … Firestoreを使ったデータ保存・読み込み（Claudeの `window.storage` の代わり）
- `src/firebase.js` … Firebaseの接続設定（★ここに自分のプロジェクトの値を貼る）
- `firestore.rules` … Firestoreのセキュリティルール（Firebaseコンソールに貼る）
- `public/manifest.json` / `public/sw.js` … スマホでアプリ化するためのPWA設定
- `.github/workflows/deploy.yml` … push時に自動デプロイするGitHub Actions設定
