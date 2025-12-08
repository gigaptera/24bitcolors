# 24bitColors - Development Guidelines

24bitColors の品質と持続可能な開発を支えるための、厳格な開発・運用ルールです。
開発者は本ガイドラインを遵守してください。

## 1. バージョニング (Versioning)

[Semantic Versioning 2.0.0](https://semver.org/lang/ja/) に準拠します。

Format: `MAJOR.MINOR.PATCH`

- **MAJOR**: 互換性のない API 変更や、UI/UX の根本的な刷新
- **MINOR**: 後方互換性のある機能追加
- **PATCH**: 後方互換性のあるバグ修正

### バージョン更新フロー

1. `release` ブランチ作成時に `package.json` の version を更新
2. マージ後、Git タグ (`v1.0.0` 等) を作成

---

## 2. ブランチ戦略 (Branching Strategy)

**Git Flow** をベースとした運用を行います。

| ブランチ名  | 役割                                                             | 命名規則                | 例                                            |
| :---------- | :--------------------------------------------------------------- | :---------------------- | :-------------------------------------------- |
| **main**    | 本番環境用。常にリリース可能な状態。                             | `main`                  | `main`                                        |
| **develop** | 開発用。次期リリースのための統合ブランチ。                       | `develop`               | `develop`                                     |
| **feature** | 新機能開発用。develop から派生し develop へマージ。              | `feature/{機能名}`      | `feature/user-auth`, `feature/statistics-api` |
| **fix**     | バグ修正用。develop から派生し develop へマージ。                | `fix/{バグ概要}`        | `fix/safari-layout-bug`                       |
| **release** | リリース準備用。バージョン更新や最終調整。                       | `release/v{バージョン}` | `release/v1.1.0`                              |
| **hotfix**  | 本番環境の緊急修正用。main から派生し main と develop へマージ。 | `hotfix/{バグ概要}`     | `hotfix/critical-security-patch`              |

---

## 3. コミットメッセージ (Commit Messages)

[Conventional Commits](https://www.conventionalcommits.org/ja/v1.0.0/) に従います。
可読性と自動生成ツール（Changelog 等）への対応のため、厳守してください。

### Format

```
<type>(<scope>): <subject>
```

### Types

| Type         | 説明                                                 | 例                                           |
| :----------- | :--------------------------------------------------- | :------------------------------------------- |
| **feat**     | 新機能の追加 (minor version up)                      | `feat: ログイン機能を追加`                   |
| **fix**      | バグ修正 (patch version up)                          | `fix: iPhoneSEでのレイアウト崩れを修正`      |
| **docs**     | ドキュメントのみの変更                               | `docs: アップデート手順を追記`               |
| **style**    | コードの動作に影響しない変更（空白、フォーマット等） | `style: インデントを修正`                    |
| **refactor** | バグ修正や機能追加を含まないコード変更               | `refactor: userButtonコンポーネントを共通化` |
| **perf**     | パフォーマンス向上のための変更                       | `perf: 画像のLazyLoadを導入`                 |
| **test**     | テスト追加や既存テストの修正                         | `test: 診断ロジックの単体テストを追加`       |
| **chore**    | ビルドプロセスやツールの変更                         | `chore: 依存パッケージを更新`                |

### Rules

- **Subject**: 日本語で、命令形で記述する（例：「修正しました」ではなく「修正」）
- **Scope** (Optional): 変更の影響範囲（例: `feat(api):`, `fix(ui):`）

---

## 4. プルリクエスト (Pull Requests)

- 原則として、すべての変更は Pull Request (PR) を通じてマージされるべきです。
- PR タイトルも Conventional Commits に従ってください。
- マージ前に必ずセルフレビューと、CI (Lint/Test) の通過を確認してください。

---

## 5. リリースフロー (Release Workflow)

1. `develop` ブランチから `release/vX.Y.Z` ブランチを作成
2. `package.json` のバージョンを更新
3. 最終テスト実施
4. `release/vX.Y.Z` を `main` と `develop` にマージ
5. `main` ブランチにタグ `vX.Y.Z` を付与
6. GitHub Releases にリリースノートを作成
