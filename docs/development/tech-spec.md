# 24bitColors - 技術仕様書

## 🛠 技術スタック

| カテゴリ         | 技術                                    |
| ---------------- | --------------------------------------- |
| フレームワーク   | Next.js 15 (App Router)                 |
| 言語             | TypeScript                              |
| スタイリング     | Tailwind CSS v3.4 (with v4 preparation) |
| 色空間ライブラリ | culori                                  |
| アイコン         | Phosphor Icons (light)                  |
| i18n             | next-intl                               |
| デプロイ         | Vercel                                  |
| バックエンド     | Supabase                                |

---

## 🎯 機能仕様

### 色選択診断機能

- **方式**: bit 診断（二択を繰り返す適応的アルゴリズム）
- **質問数**: 20 問
- **所要時間**: 30 秒以内
- **対応色数**: 理論上 1677 万色（24bit RGB）

### リアルタイム予測

- 各質問ごとに現在の予測色を表示
- 信頼度を%で表示（質問が進むにつれて上昇）

### 結果表示

- 最終的な好きな色を大きく表示
- ポエティックな色名（例: "Sprout", "Twilight Ember"）
- HEX コード表示
- シェア機能（Web Share API, URL コピー, 画像生成）

---

## 🧬 技術仕様

### 色空間: OKLCH

#### 選定理由

- **知覚的均一性**: 人間の目の見え方に最も近い
- **色相の正確性**: 特に青系の予測が優秀
- **最新標準**: CSS Color Level 4 採用

#### OKLCH 座標系

```
L (Lightness): 0.0 - 1.0  明度
C (Chroma):    0.0 - 0.4  彩度
H (Hue):       0 - 360°   色相
```

#### 色変換

- **ライブラリ**: culori
- sRGB 色域外の色は自動的にクランプ

### アルゴリズム: 適応的二択診断

#### 基本原理

二分探索の色版。ユーザーの選択に基づいて、色空間を動的に絞り込む。

#### 改善点

1. **色変換**: culori ライブラリで正確な変換
2. **円形距離計算**: 色相の円形性を考慮（0° と 350° は近い）
3. **ペア選択**: 重み分布に基づく最適化

---

## 📂 主要ディレクトリ構成

```
src/
├── app/
│   ├── [locale]/             # i18n Routing Root
│   │   ├── page.tsx          # ランディングページ
│   │   ├── layout.tsx        # i18n Layout (Metadata, Fonts)
│   │   ├── about/            # About ページ
│   │   ├── diagnosis/        # 診断ページ
│   │   └── result/[group]/   # 結果ページ (Dynamic Route)
│   ├── api/
│   │   └── og/route.tsx      # OGP画像生成
│   └── globals.css           # Global Styles
├── i18n/
│   ├── routing.ts            # i18n Routing Config
│   └── request.ts            # Request Handler
├── messages/
│   ├── ja.json               # 日本語リソース
│   └── en.json               # 英語リソース
├── components/
│   ├── DiagnosisApp.tsx      # 診断メインコンポーネント
│   ├── ResultInteraction.tsx # 結果ページインタラクション
│   ├── GoogleAdsense.tsx     # AdSense Component (Lazy)
│   └── ui/                   # shadcn/ui ベースコンポーネント
└── lib/
    ├── oklch.ts              # OKLCH 色空間ユーティリティ
    └── colorNamesDictionary.ts # ポエティック色名辞書
```

---

**最終更新**: 2025 年 12 月 12 日 (v1.2.0 i18n 対応完了)
