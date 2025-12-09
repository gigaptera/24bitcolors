# 24bitColors - Strategic Roadmap

24bitColors の将来的な拡張計画とビジョンをまとめたロードマップです。
本プロジェクトの核心は「単なる診断ツール」ではなく、**「世界最大の色嗜好データベースプラットフォーム」** を目指すことにあります。

## 🗺️ 全体戦略 (Grand Strategy)

| フェーズ      | バージョン  | テーマ                     | 戦略的意義           | 主なゴール                                         |
| :------------ | :---------- | :------------------------- | :------------------- | :------------------------------------------------- |
| **Phase 1**   | **v1.0.0**  | **Acquisition (MVP)**      | データの入り口を作る | 診断機能、シェア拡散、PWA 対応 **(完了 ✅)**       |
| **Phase 1.5** | **v1.1.0~** | **UX Optimization**        | 離脱を防ぎ拡散させる | URL シェア、ダークモード、簡易診断モード           |
| **Phase 2**   | **v2.0.0~** | **Activation & Retention** | ユーザーを定着させる | 統計ダッシュボード、コレクション機能、アカウント化 |
| **Phase 3**   | **v3.0.0~** | **Global Expansion**       | 母集団を最大化する   | 多言語対応、地域別トレンド、インフルエンサー連携   |
| **Phase 4**   | **v4.0.0~** | **Data Ecosystem**         | データを価値に変える | API 公開、オープンデータ化、法人向けレポート       |
| **Phase 5**   | **v5.0.0~** | **AI Personalization**     | 個への価値還元       | AI 感性分析、レコメンド、クリエイティブ支援        |

---

## ✅ Phase 1: Acquisition (MVP) - v1.0.0 Released

基本的な診断機能とデザイン基盤の確立。

- [x] 20 問の bit 探索ロジックによる色診断
- [x] 美術館（Museum）テーマのデザインシステム
- [x] シェアカード生成機能
- [x] PWA / SEO / AdSense 対応

---

## 🚀 Phase 1.5: UX Optimization (磨き込み) - v1.1.0 Released

Z 世代視点の UX レビューに基づき、ユーザビリティと拡散力を強化します。

- [x] **シェア導線の強化 ("Frictionless Share")**
  - 画像生成を待たずに、URL だけで即座にシェアできるボタン（X, LINE）の追加
  - Instagram Stories へのスムーズな連携（Web Share API / Link fallback）
- [x] **ダークモード ("Night Museum")**
  - 夜間の利用に配慮し、かつ高級感を損なわない「夜の美術館」テーマの実装
  - OS 設定に応じた自動切り替え
- [x] **診断プロセスの最適化**
  - 離脱率の計測強化（Google Analytics）
- [x] **Landing Page Redesign (v1.1.0)**
  - Fullscreen Hero Section with "Aurora Prism" effect.
  - Scroll Snap interaction.
- [x] **Data Architecture v2 (v1.1.0)**
  - Separation of "Facts" (Diagnoses) and "Opinions" (Feedback).
  - Server-side location tracking (Country/Region).

---

## 📊 Phase 2: Activation & Retention (定着と深化)

「一度やって終わり」から「何度も訪れて色を探す場所」へ進化させます。

- [ ] **リアルタイム統計ダッシュボード ("The Pulse of Color")**
  - 「今、世界で一番愛されている色」のリアルタイムランキング
  - 色相（Hue）ごとの人気分布ヒートマップ
  - 季節ごとのトレンド変化グラフ
- [ ] **詳細な結果分析レポート**
  - 自分の選んだ色の詳細スペック（RGB/CMYK/マンセル/PCCS）
  - **レア度判定**: 「その色は上位 0.05%の希少な好みです」といったエンタメ判定
  - **性格・印象分析**: 色彩心理学に基づいた簡単な性格診断コメント
- [ ] **マイパレット機能**
  - 気に入った色を「保存」してコレクション化（Cookie/LocalStorage）
- [ ] **Advanced SEO & Performance (Organic Growth)**
  - **Sitemap & Robots.txt**: 検索エンジンへの適切なインデックス指示
  - **Structured Data (JSON-LD)**: リッチリザルト対応で検索面有率を向上
  - **Core Web Vitals**: LCP (読み込み速度) と CLS (視覚的安定性) の最適化
  - **Dynamic OGP**: 色ごとの動的 OGP 画像生成による SNS 流入強化

---

## 🌍 Phase 3: Global Expansion (グローバル展開)

「色」は言語の壁を越える最強のコンテンツです。世界展開を加速させます。

- [ ] **多言語対応 (i18n)**
  - 英語 (EN)、中国語 (ZH)、スペイン語 (ES)、フランス語 (FR)
  - 言語ごとの OGP 画像生成（各国の文化に合わせたデザイン最適化）
- [ ] **「色のバベル」プロジェクト**
  - 国や地域ごとの「好みの色」の違いを世界地図上に可視化
  - 「日本人は淡い桜色が好き」「ブラジルは鮮やかな緑が好き」などの仮説を検証
- [ ] **SNS シェア機能の強化**
  - Instagram Stories 用縦長画像生成
  - TikTok 用ダイナミック動画生成

---

## 🏘️ Phase 4: Data Ecosystem & Monetization (活用と収益化)

蓄積されたデータを資産化し、エコシステムを構築します。

- [ ] **ユーザーアカウント機能 (Social Login)**
  - 過去の診断履歴の永続化
  - 作成したパレットの公開と「いいね」機能（ソーシャル要素）
- [ ] **24bitColors API ecosystem**
  - 外部のデザイナーや開発者が「人気色データ」を利用できる API の提供
  - 企業のマーケティング担当者向け「カラートレンドレポート」の有料販売
- [ ] **オープンデータ・プロジェクト**
  - 匿名化されたデータセットを研究機関や大学へ提供
  - 色彩心理学やデザイン研究への貢献

---

## 🤖 Phase 5: AI & Intelligence (究極のパーソナライズ)

「あなたの色」を知り尽くした AI が、ライフスタイルを提案します。

- [ ] **AI 感性プロファイリング**
  - 選んだ色から、現在の心理状態や潜在的な願望を AI が深層分析
- [ ] **AI ライフスタイル・レコメンド**
  - 「その色が好きなあなたニ似合う服・インテリア・コスメ」を Amazon/楽天から提案（アフィリエイト）
  - Spotify 連携: 「あなたの色に合うプレイリスト」の自動生成
- [ ] **Color Biorhythm (心のバイオリズム)**
  - 「今日はこの色を選んだ」という変化を記録し、体調や気分の波を可視化
  - 「疲れている時は青を選びがち」といった自己理解を促すメンタルヘルス機能
- [ ] **Generative AI 連携**
  - 「あなたの運命の色」をテーマにした壁紙やアートワークの自動生成

---

## 💡 技術的な挑戦（Tech Roadmap）

- **大規模データ処理**: 数千万〜億単位のレコードを捌くための Supabase/PostgreSQL パーティショニングとインデックス戦略
- **エッジコンピューティング**: 世界中どこからでも高速に診断できるように、ロジックを Edge Functions 化
- **3D WebGL Visualization**: 1677 万色の宇宙（Color Universe）をブラウザ上で自由に探索できる 3D インターフェース
- **Color Similarity Search**: ベクトル検索を用いた「似ている色」の高速検索エンジン
