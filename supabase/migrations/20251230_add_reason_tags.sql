-- Add reason_tags column to feedback table
ALTER TABLE feedback ADD COLUMN reason_tags text[] DEFAULT '{}';
