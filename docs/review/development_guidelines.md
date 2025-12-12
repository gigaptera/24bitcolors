# 開発・レビューガイドライン

復元ソース: development_rules.md-, backend-migration.md

## ブランチ戦略 (Git Flow)

- **main**: 本番環境 (Production)。常にリリース可能。
- **develop**: 開発用 (Preview)。
- **feature/**: 新機能。
- **fix/**: バグ修正。

## コミット規約 (Conventional Commits)

- feat: 新機能
- fix: バグ修正
- refactor: リファクタリング
- docs: ドキュメント
- 1 コミット 1 論理変更 (Atomic Commits)

## バックエンド移行方針

- 現在は Next.js API Routes を使用。
- 将来的には Go (Gin) への移行を想定し、API エンドポイント (/api/diagnosis 等) のインターフェースを厳守すること。
