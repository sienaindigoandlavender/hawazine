-- Hawazine — journal_entries
--
-- Run this in the Supabase SQL Editor once. Safe to re-run: each
-- statement is idempotent-guarded where Supabase supports it, or
-- wrapped in "if not exists" / "or replace".
--
-- Editing happens in Supabase Studio (Table Editor) with the service
-- role, which bypasses RLS. Public reads go through the anon key with
-- RLS filtering to published=true only.

-- ---------------------------------------------------------------
-- Table
-- ---------------------------------------------------------------
create table if not exists public.journal_entries (
  slug             text primary key,
  title            text not null,
  subtitle         text,
  body_markdown    text not null,
  hero_image_url   text,
  hero_image_alt   text,
  published_at     timestamptz not null default now(),
  published        boolean not null default false,
  format           text
                     check (format is null or format in (
                       'the-medina',
                       'the-market',
                       'the-house',
                       'the-record'
                     )),
  updated_at       timestamptz not null default now()
);

comment on table public.journal_entries is
  'Hawazine Journal entries. Edited via Supabase Studio; read by the Next.js app with the anon key under RLS.';

-- ---------------------------------------------------------------
-- updated_at trigger
-- ---------------------------------------------------------------
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists journal_entries_set_updated_at on public.journal_entries;
create trigger journal_entries_set_updated_at
  before update on public.journal_entries
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------
-- Indexes
-- ---------------------------------------------------------------
create index if not exists journal_entries_published_at_idx
  on public.journal_entries (published_at desc)
  where published = true;

-- ---------------------------------------------------------------
-- Row-level security
-- ---------------------------------------------------------------
alter table public.journal_entries enable row level security;

-- The anon role (the key shipped to the browser) can only read
-- published rows. Drafts stay invisible.
drop policy if exists "anon reads published journal entries"
  on public.journal_entries;

create policy "anon reads published journal entries"
  on public.journal_entries
  for select
  to anon
  using (published = true);

-- No insert/update/delete policies for anon; Supabase Studio edits
-- go through the service role which bypasses RLS.
