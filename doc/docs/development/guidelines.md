---
sidebar_position: 1
---

# 開発ガイドライン

## コーディング規約

### TypeScript

- **厳格な型定義**: `any`の使用は避ける
- **インターフェース優先**: 型エイリアスよりインターフェースを使用
- **明示的な戻り値型**: 関数の戻り値型は明示的に定義

```typescript
// Good
interface UserData {
  id: string;
  name: string;
}

function getUser(id: string): Promise<UserData> {
  // 実装
}

// Bad
type UserData = {
  id: string;
  name: string;
}

function getUser(id: any) {
  // 実装
}
```

### ネーミング規則

- **クラス**: PascalCase（例: `UserService`）
- **インターフェース**: PascalCaseで`I`プレフィックス（例: `IUserRepository`）
- **関数・変数**: camelCase（例: `getUserById`）
- **定数**: UPPER_SNAKE_CASE（例: `MAX_RETRY_COUNT`）

## ディレクトリ構造

```
api/src/
├── domains/           # ドメイン層
│   ├── entities/      # エンティティ
│   └── services/      # ドメインサービス
├── application/       # アプリケーション層
│   ├── use-cases/     # ユースケース
│   └── services/      # アプリケーションサービス
├── infrastructure/    # インフラストラクチャ層
│   ├── database/      # データベース実装
│   └── adapters/      # 外部サービスアダプター
└── presentation/      # プレゼンテーション層
    └── handlers/      # HTTPハンドラー
```

## テスト

### ユニットテスト

各レイヤーのロジックを独立してテスト：

```typescript
describe('CreateUserUseCase', () => {
  it('should create a new user', async () => {
    const mockRepository = {
      save: jest.fn(),
      findByEmail: jest.fn().mockResolvedValue(null)
    };
    
    const useCase = new CreateUserUseCase(mockRepository);
    const result = await useCase.execute({
      email: 'test@example.com',
      name: 'Test User'
    });
    
    expect(mockRepository.save).toHaveBeenCalled();
    expect(result.email).toBe('test@example.com');
  });
});
```

### 統合テスト

API全体の動作をテスト：

```typescript
describe('POST /api/users', () => {
  it('should create a user', async () => {
    const response = await request(app)
      .post('/api/users')
      .send({
        email: 'test@example.com',
        name: 'Test User'
      });
    
    expect(response.status).toBe(201);
    expect(response.body.email).toBe('test@example.com');
  });
});
```

## Git ワークフロー

1. **フィーチャーブランチ**: `feature/機能名`
2. **バグ修正ブランチ**: `fix/バグ説明`
3. **コミットメッセージ**: [Conventional Commits](https://www.conventionalcommits.org/)に従う

```bash
# 良い例
git commit -m "feat: ユーザー認証機能を追加"
git commit -m "fix: ユーザー作成時のバリデーションエラーを修正"

# 悪い例
git commit -m "更新"
git commit -m "バグ修正"
```