---
sidebar_position: 1
---

# TypeScript Node Project - Developer Documentation

このプロジェクトは、Clean ArchitectureとDomain-Driven Design (DDD)の原則に基づいて構築されたTypeScript Nodeアプリケーションです。

## プロジェクト概要

本プロジェクトは以下の技術スタックを採用しています：

- **TypeScript**: 型安全性とモダンなJavaScript機能
- **Node.js**: サーバーサイドJavaScript実行環境
- **Express**: 軽量で柔軟なWebアプリケーションフレームワーク
- **Prisma**: モダンなTypeScript ORMツール
- **React + Vite**: フロントエンド開発環境

## アーキテクチャ

このプロジェクトはClean ArchitectureとDDDの原則に従って構成されています：

### レイヤー構造

1. **Domain層** (`domains/`)
   - エンティティとドメインロジック
   - ビジネスルールの定義

2. **Application層** (`application/`)
   - ユースケースの実装
   - ドメインサービスの協調

3. **Infrastructure層** (`infrastructure/`)
   - データベースアクセス（リポジトリ実装）
   - 外部サービスとの統合

4. **Presentation層** (`presentation/`)
   - API/UIレイヤー
   - リクエスト/レスポンスの処理

## はじめに

1. [アーキテクチャ詳細](./architecture/overview)
2. [開発ガイドライン](./development/guidelines)

## その他のリソース

- [APIドキュメント](/api/intro) - API仕様の詳細
- [セットアップガイド](/guides/intro) - 環境構築とチュートリアル
