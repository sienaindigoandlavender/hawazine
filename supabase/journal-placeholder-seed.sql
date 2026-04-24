-- Hawazine — Journal placeholder seed
--
-- Three entries used to exercise the Journal UI during the build pass.
-- Bodies are lorem ipsum; hero images are Unsplash URLs. Replace with
-- real content (typically via Supabase Studio) once real entries exist,
-- or set published = false / DELETE these rows.
--
-- Run this once after supabase/schema.sql has created the journal_entries
-- table. Safe to re-run in part: each INSERT uses an ON CONFLICT clause
-- on the slug primary key so repeat runs no-op.

INSERT INTO public.journal_entries (
  slug, title, subtitle, body_markdown, hero_image_url, hero_image_alt,
  format, published, published_at
) VALUES
(
  'placeholder-on-tadelakt',
  'On tadelakt',
  'The lime plaster that refuses to be rushed.',
  E'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.\n\nUt enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.\n\n## The process\n\nExcepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.\n\nTotam rem aperiam eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.\n\n## What a maalem knows\n\nSed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.\n\n> Sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.\n\nUt enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur.',
  'https://images.unsplash.com/photo-1618221381711-42ca8ab6e908?w=1600&h=1067&fit=crop',
  'A maalem applying tadelakt plaster to a riad wall',
  'the-house',
  true,
  '2026-04-22T10:00:00+01:00'
),
(
  'placeholder-laksour-morning',
  'Laksour, before the souk wakes',
  'A walk through the medina at the hour when only the bakers are out.',
  E'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.\n\nUt enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.\n\nDuis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.\n\n## The bakers\n\nSunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.\n\nTotam rem aperiam eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.\n\n## Light in the derb\n\nNemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.',
  'https://images.unsplash.com/photo-1597212618440-806262de4f6b?w=1600&h=1067&fit=crop',
  'A quiet derb in the Laksour quarter at dawn',
  'the-medina',
  true,
  '2026-04-15T10:00:00+01:00'
),
(
  'placeholder-on-the-market',
  'What 2,000,000 dirhams meant in 2021',
  'A short reckoning with the revaluation of the Marrakech medina.',
  E'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.\n\nUt enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.\n\n## The numbers\n\nDuis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.\n\nExcepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n\n## What moved\n\nSed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa quae ab illo inventore veritatis.',
  'https://images.unsplash.com/photo-1555990538-32122648f5b6?w=1600&h=1067&fit=crop',
  'Morning light on the rooftops of the Marrakech medina',
  'the-market',
  true,
  '2026-04-08T10:00:00+01:00'
)
ON CONFLICT (slug) DO NOTHING;
