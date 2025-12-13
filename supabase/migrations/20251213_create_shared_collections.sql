-- Enable pgcrypto for UUID generation if not already enabled
create extension if not exists "pgcrypto";

create table if not exists shared_collections (
  id uuid default gen_random_uuid() primary key,
  original_anonymous_id uuid not null, -- 誰が作ったか（念のため）
  snapshot_data jsonb not null, -- その時点のカラーリスト [{hex, id, created_at, ...}]
  created_at timestamptz default now()
);

-- RLS Policies
alter table shared_collections enable row level security;

-- Allow public read access (sharing)
create policy "Public can view shared collections"
  on shared_collections for select
  using (true);

-- Allow anonymous users to insert (create share)
create policy "Anonymous users can create shared collections"
  on shared_collections for insert
  with check (true);
