create table public.children (
  id uuid primary key default gen_random_uuid(),
  parent_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  name text not null,
  hero_key text not null default 'coral',
  created_at timestamptz not null default now()
);

alter table public.children enable row level security;

create policy "parents_select_own_children"
  on public.children for select
  using (auth.uid() = parent_id);

create policy "parents_insert_own_children"
  on public.children for insert
  with check (auth.uid() = parent_id);

create policy "parents_update_own_children"
  on public.children for update
  using (auth.uid() = parent_id);

create policy "parents_delete_own_children"
  on public.children for delete
  using (auth.uid() = parent_id);
