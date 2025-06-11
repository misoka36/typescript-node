---
sidebar_position: 1
---

# 環境構築ガイド

## 必要な環境

- **Node.js**: v18.0以上
- **npm**: v9.0以上
- **Docker**: データベース環境用（オプション）

## セットアップ手順

### 1. リポジトリのクローン

```bash
git clone https://github.com/your-org/typescript-node.git
cd typescript-node
```

### 2. 依存関係のインストール

プロジェクトルートで：

```bash
npm install
```

APIサーバー用：

```bash
cd api
npm install
```

Webクライアント用：

```bash
cd ../web
npm install
```

### 3. 環境変数の設定

APIディレクトリに`.env`ファイルを作成：

```bash
cd api
cp .env.example .env
```

必要な環境変数を設定してください。

### 4. データベースのセットアップ

Prismaマイグレーションの実行：

```bash
cd api
npx prisma migrate dev
```

### 5. 開発サーバーの起動

APIサーバー：

```bash
cd api
npm run dev
```

Webクライアント：

```bash
cd web
npm run dev
```

## トラブルシューティング

### ポート競合

デフォルトポート（API: 3000, Web: 5173）が使用中の場合は、環境変数で変更可能です。

### データベース接続エラー

`.env`ファイルの`DATABASE_URL`が正しく設定されているか確認してください。