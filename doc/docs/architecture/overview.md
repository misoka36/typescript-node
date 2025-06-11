---
sidebar_position: 1
---

# アーキテクチャ概要

## Clean Architecture

このプロジェクトはClean Architectureの原則に従い、以下の利点を実現しています：

- **関心事の分離**: 各レイヤーが明確な責任を持つ
- **依存性の逆転**: ビジネスロジックがフレームワークに依存しない
- **テスタビリティ**: 各レイヤーを独立してテスト可能

## レイヤー詳細

### Domain層

```typescript
// domains/entities/User.ts
export class User {
  constructor(
    public readonly id: string,
    public readonly email: string,
    public readonly name: string
  ) {}
}
```

**責任**:
- ビジネスエンティティの定義
- ドメインロジックの実装
- ビジネスルールの保持

### Application層

```typescript
// application/use-cases/CreateUserUseCase.ts
export class CreateUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(input: CreateUserInput): Promise<User> {
    // ビジネスロジックの実装
  }
}
```

**責任**:
- ユースケースの実装
- アプリケーションフローの制御
- ドメインとインフラの協調

### Infrastructure層

```typescript
// infrastructure/database/UserRepository.ts
export class UserRepository implements IUserRepository {
  async save(user: User): Promise<void> {
    // データベースへの保存処理
  }
}
```

**責任**:
- データ永続化の実装
- 外部APIとの通信
- フレームワーク固有の実装

### Presentation層

```typescript
// handlers/UserHandler.ts
export class UserHandler {
  async createUser(req: Request, res: Response) {
    // HTTPリクエスト/レスポンスの処理
  }
}
```

**責任**:
- HTTPリクエスト/レスポンス処理
- 入力値の検証
- エラーハンドリング

## 依存性の方向

```
Presentation → Application → Domain
     ↓             ↓
Infrastructure ← Domain (interfaces)
```

内側のレイヤーは外側のレイヤーに依存しません。