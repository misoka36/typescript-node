# ドメイン層 (Domain Layer)

## エンティティ定義

### Memo（メモ）
| フィールド名 | 型 | 説明 | 制約 |
|-----------|-----|-----|-----|
| id | string | メモID（UUID） | PK, 必須 |
| userId | string | 作成者ID | 必須 |
| title | string | タイトル | 必須, 最大200文字 |
| createdAt | string | 作成日時（ISO8601） | 必須 |
| updatedAt | string | 更新日時（ISO8601） | 必須 |
| sharedUserIds | string[] | 共有ユーザーID配列 | - |
| tagIds | string[] | タグID配列 | - |

### Block（ブロック）
| フィールド名 | 型 | 説明 | 制約 |
|-----------|-----|-----|-----|
| id | string | ブロックID（UUID） | PK, 必須 |
| memoId | string | メモID | 必須, FK |
| type | string | ブロックタイプ | 必須, TEXT/CODE/IMAGE/LINK |
| content | string | コンテンツ | 必須 |
| position | number | 表示順序 | 必須, 0以上 |
| createdAt | string | 作成日時（ISO8601） | 必須 |
| updatedAt | string | 更新日時（ISO8601） | 必須 |

### Tag（タグ）
| フィールド名 | 型 | 説明 | 制約 |
|-----------|-----|-----|-----|
| id | string | タグID（UUID） | PK, 必須 |
| name | string | タグ名 | 必須, 最大50文字, ユニーク |
| color | string | 色（16進数） | 必須, #RRGGBB形式 |
| createdAt | string | 作成日時（ISO8601） | 必須 |

## 値オブジェクト定義

### ID系値オブジェクト
- **MemoId**: UUID v4形式の文字列
- **BlockId**: UUID v4形式の文字列  
- **TagId**: UUID v4形式の文字列
- **UserId**: 外部システムから提供される文字列

### 実装規則
1. ID系の値オブジェクトのみ作成
2. `equals`メソッドと`toString`メソッドを必須実装
3. 不変性を保つ（readonlyプロパティ）

## ドメインサービス定義

| サービス名 | 対象エンティティ | 主要メソッド | 責務 |
|----------|-------------|-----------|-----|
| MemoService | Memo | validateMemo, canEdit, canShare | メモの妥当性検証、権限チェック |
| BlockService | Block | validateBlock, reorderBlocks | ブロックの妥当性検証、並び替え処理 |
| TagService | Tag | validateTag, suggestTags | タグの妥当性検証、タグ提案 |

### 実装規則
1. 各エンティティに対して1つのドメインサービス
2. バリデーション処理と権限チェックを実装
3. 複数エンティティにまたがる処理を実装

## エンティティ実装規則
1. 各エンティティは対応するテーブル定義と同じフィールドを持つ
2. コンストラクタは必須フィールドのみ受け取る
3. 更新系メソッドは個別フィールドごとに用意する