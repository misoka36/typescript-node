---
sidebar_position: 1
---

# API リファレンス

## エンドポイント一覧

### ユーザー管理

#### ユーザー作成

```http
POST /api/users
```

**リクエストボディ**:

```json
{
  "email": "user@example.com",
  "name": "John Doe"
}
```

**レスポンス**:

```json
{
  "id": "uuid",
  "email": "user@example.com",
  "name": "John Doe",
  "createdAt": "2024-01-01T00:00:00Z"
}
```

#### ユーザー取得

```http
GET /api/users/:id
```

**パラメータ**:
- `id`: ユーザーID

**レスポンス**:

```json
{
  "id": "uuid",
  "email": "user@example.com",
  "name": "John Doe",
  "createdAt": "2024-01-01T00:00:00Z"
}
```

#### ユーザー一覧取得

```http
GET /api/users
```

**クエリパラメータ**:
- `page`: ページ番号（デフォルト: 1）
- `limit`: 1ページあたりの件数（デフォルト: 20）

**レスポンス**:

```json
{
  "users": [
    {
      "id": "uuid",
      "email": "user@example.com",
      "name": "John Doe",
      "createdAt": "2024-01-01T00:00:00Z"
    }
  ],
  "totalCount": 100,
  "page": 1,
  "limit": 20
}
```

## エラーレスポンス

すべてのエラーは以下の形式で返されます：

```json
{
  "error": {
    "code": "ERROR_CODE",
    "message": "エラーメッセージ",
    "details": {}
  }
}
```

### HTTPステータスコード

- `200 OK`: 成功
- `201 Created`: リソース作成成功
- `400 Bad Request`: リクエスト不正
- `404 Not Found`: リソースが見つからない
- `500 Internal Server Error`: サーバーエラー