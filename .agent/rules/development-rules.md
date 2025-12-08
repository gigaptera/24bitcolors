# 24bitColors - Agent Behavior Guidelines

**重要**: 本プロジェクトの開発ルール（バージョニング、ブランチ戦略、コミット規約等）の詳細は、すべて **`docs/development_rules.md`** に定義されている内容を正とする。エージェントは作業開始前に必ずこのドキュメントを参照し、遵守すること。

## 1. 原則

- **言語**: ユーザーとの対話、ドキュメント作成、コミットメッセージ等はすべて **日本語** で行う。思考プロセスは英語でも可。
- **マスタードキュメント**: `docs/development_rules.md` および `docs/roadmap.md` をプロジェクトの真実のソースとして扱う。エージェント自身の知識よりもこれらを優先する。

## 2. ブランチ戦略 (Git Flow準拠)

`docs/development_rules.md` の定義に従い、以下のブランチ戦略を厳守する。

- **main**: 本番環境用。直接コミット禁止。
- **develop**: 開発用統合ブランチ。エージェントの作業ベース。
- **feature/{name}**: 新機能開発。`develop` から派生。
- **fix/{name}**: バグ修正。`develop` から派生。
- **release/v{version}**: リリース準備。`develop` から派生。
- **hotfix/{name}**: 緊急修正。`main` から派生。

**エージェントの行動指針**:
- 通常の開発作業は、`develop` ブランチから派生した `feature/...` または `fix/...` ブランチを作成して行う。
- ユーザーの明示的な許可がない限り、`main` や `develop` への直接プッシュは行わない。

## 3. コミットメッセージ規約

`docs/development_rules.md` で定義された **Conventional Commits** を厳守する。

- **Format**: `type(scope): subject`
- **Subject**: 日本語、命令形（例：「機能を追加」）
- **Types**:
  - `feat`: 新機能
  - `fix`: バグ修正
  - `docs`: ドキュメント
  - `style`: フォーマット
  - `refactor`: リファクタリング
  - `perf`: パフォーマンス
  - `test`: テスト
  - `chore`: その他

## 4. テックスタック基準

- **Frontend**: Next.js (App Router), React, Tailwind CSS
- **Design**: 美術館テーマ（モノトーン、Serif体、Invitation風）を維持する。
- **Global Style**: `globals.css` の変数（`--background: #E8E8E8` 等）を使用し、デザインの一貫性を保つ。

## 5. ドキュメント管理

- 実装に伴う変更は、必ず `docs/` 内の関連ドキュメントにも反映させる。
