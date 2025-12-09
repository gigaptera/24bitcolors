-- Supabase SQL: Data Architecture v2 (Fact vs Opinion)
-- 実行前に既存のテーブルをバックアップするか、DROP TABLE feedback; して作り直すことを推奨します。

-- 1. 診断ログテーブル (Facts)
-- ユーザーが診断を完了した瞬間に自動保存される "事実"
CREATE TABLE IF NOT EXISTS diagnoses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  
  -- 色データ
  hex VARCHAR(7) NOT NULL,
  hue DECIMAL(6,2) NOT NULL,
  lightness DECIMAL(4,3) NOT NULL,
  chroma DECIMAL(4,3) NOT NULL,
  
  -- コンテキスト
  theme TEXT, -- 'light' | 'dark'
  algorithm_version TEXT, -- 'v1.0.0'
  duration_seconds INTEGER, -- 診断にかかった秒数
  
  -- ユーザー属性
  anonymous_id UUID, -- ブラウザ単位の匿名ID (Cookie/LocalStorage連携)
  locale TEXT, -- 'ja-JP', 'en-US' etc.
  user_agent TEXT,
  
  -- 地域情報 (Server Actionでヘッダーから取得)
  country TEXT, -- 'JP', 'US' etc.
  region TEXT, -- 'Tokyo', 'California' etc.
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. フィードバックテーブル (Opinions)
-- ユーザーが能動的に送信する "感想"
-- 以前のテーブル定義を置き換えます
DROP TABLE IF EXISTS feedback;

CREATE TABLE feedback (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  
  -- 診断との紐付け (必須)
  diagnosis_id UUID REFERENCES diagnoses(id) ON DELETE CASCADE,
  
  -- 簡易評価
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  
  -- 詳細フィードバック
  agreement_score INTEGER CHECK (agreement_score >= 0 AND agreement_score <= 100),
  expected_color TEXT,
  actual_impression TEXT,
  comment TEXT,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- インデックス作成
CREATE INDEX IF NOT EXISTS idx_diagnoses_created_at ON diagnoses(created_at);
CREATE INDEX IF NOT EXISTS idx_diagnoses_hex ON diagnoses(hex);
CREATE INDEX IF NOT EXISTS idx_diagnoses_anonymous_id ON diagnoses(anonymous_id);
CREATE INDEX IF NOT EXISTS idx_feedback_diagnosis_id ON feedback(diagnosis_id);

-- RLS (Row Level Security)
ALTER TABLE diagnoses ENABLE ROW LEVEL SECURITY;
ALTER TABLE feedback ENABLE ROW LEVEL SECURITY;

-- 全員がINSERT可能 (自動保存のため)
CREATE POLICY "Public insert diagnoses" ON diagnoses FOR INSERT WITH CHECK (true);
CREATE POLICY "Public insert feedback" ON feedback FOR INSERT WITH CHECK (true);

-- 読み取りは管理者のみ (Authenticated)
CREATE POLICY "Admin read diagnoses" ON diagnoses FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Admin read feedback" ON feedback FOR SELECT USING (auth.role() = 'authenticated');
