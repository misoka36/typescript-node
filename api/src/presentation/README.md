# プレゼンテーション層 (Presentation Layer)

## API仕様

### メモAPI

| エンドポイント | メソッド | 説明 | リクエスト | レスポンス |
|-------------|---------|------|-----------|-----------|
| /api/memos | POST | メモ作成 | {title, blocks?} | {id, title, createdAt, updatedAt} |
| /api/memos | GET | メモ一覧 | ?limit&cursor | {items[], nextCursor} |
| /api/memos/{id} | GET | メモ詳細 | - | {id, title, blocks[], tags[], sharedUserIds[], createdAt, updatedAt} |
| /api/memos/{id} | PATCH | メモ更新 | {title?, tagIds?, sharedUserIds?} | {id, title, tagIds, sharedUserIds, updatedAt} |
| /api/memos/{id} | DELETE | メモ削除 | - | 204 No Content |
| /api/memos/search | GET | メモ検索 | ?q | {items[]} |

### ブロックAPI

| エンドポイント | メソッド | 説明 | リクエスト | レスポンス |
|-------------|---------|------|-----------|-----------|
| /api/memos/{memoId}/blocks | POST | ブロック追加 | {type, content, position} | {id, type, content, position} |
| /api/memos/{memoId}/blocks/{id} | PATCH | ブロック更新 | {content?, position?} | {id, content, position, updatedAt} |
| /api/memos/{memoId}/blocks/{id} | DELETE | ブロック削除 | - | 204 No Content |

### タグAPI

| エンドポイント | メソッド | 説明 | リクエスト | レスポンス |
|-------------|---------|------|-----------|-----------|
| /api/tags | POST | タグ作成 | {name, color} | {id, name, color} |
| /api/tags | GET | タグ一覧 | - | {items[]} |
| /api/tags/{id} | DELETE | タグ削除 | - | 204 No Content |

## 実装ファイル構成

### ハンドラー (handlers/)
- `memoHandlers.ts` - メモ関連のAPIハンドラー
- `blockHandlers.ts` - ブロック関連のAPIハンドラー  
- `tagHandlers.ts` - タグ関連のAPIハンドラー

### バリデーター (validators/)
- `schemas.ts` - リクエストボディのバリデーションスキーマ定義

## 実装規則
1. 各APIエンドポイントごとにハンドラー関数を作成
2. リクエストのバリデーションを実施
3. ユースケースを呼び出してビジネスロジックを実行
4. レスポンスの形式を整えて返却