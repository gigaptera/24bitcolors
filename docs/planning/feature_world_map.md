# World Color Map Implementation Plan (deck.gl Edition)

## Goal

全世界のユーザーから収集した診断データを活用し、国ごとの「色の傾向」を 3D 地球儀 (Digital Earth) 上に可視化する機能 **"World Color Trend"** を実装する。
ユーザー提案の通り **deck.gl** を採用し、「Mapbox トークン不要」かつ「デジタルアート的」な表現を実現する。

## Advantages of deck.gl

- **Visuals**: データビジュアライゼーションに特化しており、将来的に「アクセスがあった瞬間に光の柱が立つ (ColumnLayer)」や「色の粒子が飛ぶ (ParticleLayer)」などの高度な表現が可能。
- **No Token Required**: ベースマップ（道路地図など）を使用せず、GeoJSON で国境線を描画するだけなら Mapbox API Key は不要。完全無料で運用可能。
- **Concept Match**: "Digital Color Museum" のコンセプトに合致する、無機質で美しい「データ地球儀」を作れる。

## System Design

### 1. New Page

- URL: `/world` (e.g., `24bitcolors.com/world`)
- Title: **World Color Trend**
- Design:
  - **View**: `GlobeView` (deck.gl v8.8+ の機能) を使用。
  - **Visualization**:
    - 背景は漆黒 (Space)。
    - 地球儀はワイヤーフレーム、または国ごとのポリゴン (Solid) で描画。
    - 各国を「その国のトレンド色」で塗りつぶす。
    - クリック/ホバーで詳細データを表示。

### 2. Frontend (Library)

- **Library**: `deck.gl` (Monorepo or individual packages like `@deck.gl/react`, `@deck.gl/layers`)
- **Data Source**: Natural Earth などのパブリックな World GeoJSON データ。

### 3. Backend (API)

- Endpoint: `GET /api/statistics/world` (変更なし)
- Logic:
  - `diagnoses` テーブルから `country` ごとに集計。
  - 結果例: `{ "JP": { count: 1200, hex: "#FF0000" }, "US": ... }`

## Proposed Changes

### 1. Dependencies

- Install: `deck.gl`, `@luma.gl/engine` (peer dependencies), `react-map-gl` (型定義等のため必要になる場合があるが、ベースマップを使わないなら必須ではない。今回は `deck.gl` パッケージのみで構成を試みる)

### 2. Data Preparation

- `public/data/world.json`: 軽量化された世界地図の GeoJSON ファイルを配置する（または CDN から取得）。

### 3. Components

- `src/components/WorldMapDeck.tsx`:
  - `DeckGL` コンポーネントを使用。
  - `views={new GlobeView()}`
  - `layers`: `[new GeoJsonLayer({ ... })]`

### 4. Page (`src/app/[locale]/world/page.tsx`)

- マップコンポーネントを配置。

## Verification Plan

1.  **Build Check**: deck.gl のビルドが通るか（Next.js App Router との相性確認）。
2.  **Visual Check**: 暗黒空間に 3D 地球儀が浮かび、マウス操作で回転できるか。
3.  **Data Mapping**: 各国の色が正しく反映されているか。
