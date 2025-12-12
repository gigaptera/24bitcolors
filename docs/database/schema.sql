-- 復元コンテキスト: database/schema.sql
-- 根拠: docs/development/backend-migration.md, roadmap.md

-- 1. Diagnoses Table (診断結果: Facts)
-- ユーザーが選択した色の結果とメタデータを保存
create table public.diagnoses (
  id uuid not null primary key, -- クライアント側で生成されたUUID
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  
  -- 色情報 (OKLCH色空間を採用)
  selected_color_hex text not null, -- HEXコード
  oklch_l float not null,           -- Lightness
  oklch_c float not null,           -- Chroma
  oklch_h float not null,           -- Hue
  
  -- 診断メタデータ
  algorithm_version text default 'v1.0', -- アルゴリズムバージョン
  
  -- ユーザー属性 (v1.1.0 データアーキテクチャ v2)
  location_country text, -- 国 (例: JP, US)
  location_region text   -- 地域
);

-- 2. Feedbacks Table (フィードバック: Opinions)
-- 診断結果に対するユーザーの評価
create table public.feedbacks (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  
  -- 診断IDとの紐付け (Pre-saved IDを利用)
  diagnosis_id uuid references public.diagnoses(id) on delete cascade not null,
  
  rating int check (rating >= 1 and rating <= 5), -- 評価 (1-5)
  comment text
);

-- Note: RLS (Row Level Security) 設定が必要
-- API Route化により、サーバーサイド(Service Role)での操作が前提
