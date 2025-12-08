-- Supabase SQL: feedbackテーブル作成
-- Supabase Dashboard > SQL Editor で実行してください

CREATE TABLE IF NOT EXISTS feedback (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  hex VARCHAR(7) NOT NULL,
  hue DECIMAL(6,2) NOT NULL,
  lightness DECIMAL(4,3) NOT NULL,
  chroma DECIMAL(4,3) NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- インデックス作成（分析用）
CREATE INDEX IF NOT EXISTS idx_feedback_rating ON feedback(rating);
CREATE INDEX IF NOT EXISTS idx_feedback_created_at ON feedback(created_at);

-- Row Level Security (RLS) を有効化
ALTER TABLE feedback ENABLE ROW LEVEL SECURITY;

-- 匿名ユーザーによる挿入を許可（読み取りは不可）
CREATE POLICY "Anyone can insert feedback" ON feedback
  FOR INSERT
  WITH CHECK (true);

-- 読み取りは認証済みユーザーのみ（管理者用）
-- Dashboard から確認する場合はこのポリシーは不要
CREATE POLICY "Authenticated users can read feedback" ON feedback
  FOR SELECT
  USING (auth.role() = 'authenticated');
