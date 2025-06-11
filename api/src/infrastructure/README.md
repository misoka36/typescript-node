# インフラストラクチャ層 (Infrastructure Layer)

## DynamoDBテーブル設計

### テーブル名: MemoApp

| アクセスパターン | PK | SK | GSI1-PK | GSI1-SK | 属性 |
|---------------|-----|-----|---------|---------|------|
| メモ取得 | MEMO#{id} | MEMO#{id} | USER#{userId} | MEMO#{createdAt} | title, tagIds, sharedUserIds, updatedAt |
| ブロック一覧 | MEMO#{memoId} | BLOCK#{id} | - | - | type, content, position, createdAt, updatedAt |
| タグ取得 | TAG#{id} | TAG#{id} | TAG_LIST | TAG#{name} | color, createdAt |
| ユーザーのメモ一覧 | - | - | USER#{userId} | MEMO#{createdAt} | GSI1でクエリ |
| タグ一覧 | - | - | TAG_LIST | TAG#{name} | GSI1でクエリ |

## リポジトリインターフェース定義

### IMemoRepository
- `create(memo: Memo): Promise<void>` - メモを作成
- `findById(id: MemoId): Promise<Memo | null>` - IDでメモを取得
- `findByUserId(userId: UserId, limit?: number, cursor?: string): Promise<{ items: Memo[], nextCursor?: string }>` - ユーザーのメモ一覧を取得
- `update(memo: Memo): Promise<void>` - メモを更新
- `delete(id: MemoId): Promise<void>` - メモを削除
- `search(query: string): Promise<Memo[]>` - メモを検索

### IBlockRepository
- `create(block: Block): Promise<void>` - ブロックを作成
- `findByMemoId(memoId: MemoId): Promise<Block[]>` - メモIDでブロック一覧を取得
- `update(block: Block): Promise<void>` - ブロックを更新
- `delete(id: BlockId): Promise<void>` - ブロックを削除
- `deleteByMemoId(memoId: MemoId): Promise<void>` - メモIDでブロックを一括削除

### ITagRepository
- `create(tag: Tag): Promise<void>` - タグを作成
- `findById(id: TagId): Promise<Tag | null>` - IDでタグを取得
- `findAll(): Promise<Tag[]>` - 全タグを取得
- `findByIds(ids: TagId[]): Promise<Tag[]>` - 複数IDでタグを取得
- `delete(id: TagId): Promise<void>` - タグを削除

## 実装ファイル

### データベース実装
- `DynamoDBMemoRepository.ts` - メモリポジトリのDynamoDB実装
- `DynamoDBBlockRepository.ts` - ブロックリポジトリのDynamoDB実装
- `DynamoDBTagRepository.ts` - タグリポジトリのDynamoDB実装

### リポジトリインターフェース (adapters/repositories/)
- `IMemoRepository.ts` - メモリポジトリインターフェース
- `IBlockRepository.ts` - ブロックリポジトリインターフェース
- `ITagRepository.ts` - タグリポジトリインターフェース

## 実装規則
1. エンティティごとにインターフェースと実装を作成
2. DynamoDBのアクセスパターンに基づいてメソッドを定義
3. エンティティとDBモデルの変換処理を含む