-- Supabase SQL: feedbackテーブル作成 (v2 - Detailed Feedback)
-- Supabase Dashboard > SQL Editor で実行してください

CREATE TABLE IF NOT EXISTS feedback (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  hex VARCHAR(7) NOT NULL,
  hue DECIMAL(6,2) NOT NULL,
  lightness DECIMAL(4,3) NOT NULL,
  chroma DECIMAL(4,3) NOT NULL,
  rating INTEGER, -- 旧rating (1-5) または簡易評価用
  agreement_score INTEGER CHECK (agreement_score >= 0 AND agreement_score <= 100), -- 納得度 (0-100)
  expected_color TEXT, -- 期待していた色 (red, blue...)
  actual_impression TEXT, -- 実際の印象 (perfect, close...)
  comment TEXT, -- 自由記述
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- インデックス作成（分析用）
CREATE INDEX IF NOT EXISTS idx_feedback_rating ON feedback(rating);
CREATE INDEX IF NOT EXISTS idx_feedback_agreement ON feedback(agreement_score);
CREATE INDEX IF NOT EXISTS idx_feedback_created_at ON feedback(created_at);

-- Row Level Security (RLS) を有効化
ALTER TABLE feedback ENABLE ROW LEVEL SECURITY;

-- 匿名ユーザーによる挿入を許可（読み取りは不可）
CREATE POLICY "Anyone can insert feedback" ON feedback
  FOR INSERT
  WITH CHECK (true);

-- 読み取りは認証済みユーザーのみ（管理者用）
CREATE POLICY "Authenticated users can read feedback" ON feedback
  FOR SELECT
  USING (auth.role() = 'authenticated');
