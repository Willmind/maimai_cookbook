-- 麦麦手记初始 Supabase schema
-- 适用范围：无登录个人 MVP。当前策略允许 anon 角色读写，公网部署前必须重新设计 Auth/RLS。

create extension if not exists pgcrypto with schema extensions;

create table if not exists public.recipes (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  source text,
  description text,
  cover_image_path text,
  ingredients text,
  method text,
  next_note text,
  familiarity text not null default 'new',
  want_to_make boolean not null default true,
  tags text[] not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint recipes_name_not_blank check (length(trim(name)) > 0),
  constraint recipes_familiarity_check check (familiarity in ('new', 'done', 'frequent'))
);

create table if not exists public.cooking_logs (
  id uuid primary key default gen_random_uuid(),
  recipe_id uuid not null references public.recipes(id) on delete cascade,
  cooked_at date not null default current_date,
  result text,
  note text,
  changes text,
  next_note text,
  photo_path text,
  created_at timestamptz not null default now(),
  constraint cooking_logs_result_check check (result is null or result in ('good', 'ok', 'failed'))
);

create index if not exists recipes_updated_at_idx on public.recipes (updated_at desc);
create index if not exists recipes_want_to_make_idx on public.recipes (want_to_make);
create index if not exists recipes_familiarity_idx on public.recipes (familiarity);
create index if not exists cooking_logs_recipe_id_idx on public.cooking_logs (recipe_id);
create index if not exists cooking_logs_cooked_at_idx on public.cooking_logs (cooked_at desc);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_recipes_updated_at on public.recipes;
create trigger set_recipes_updated_at
before update on public.recipes
for each row
execute function public.set_updated_at();

comment on table public.recipes is '麦麦手记菜谱档案。无登录个人 MVP 阶段使用 anon 公开读写策略。';
comment on table public.cooking_logs is '麦麦手记做饭记录，必须关联 recipes.id。无登录个人 MVP 阶段使用 anon 公开读写策略。';
comment on column public.recipes.tags is '前端固定标签数组，第一版不做动态标签表。';

grant usage on schema public to anon;
grant select, insert, update, delete on public.recipes to anon;
grant select, insert, update, delete on public.cooking_logs to anon;

alter table public.recipes enable row level security;
alter table public.cooking_logs enable row level security;

drop policy if exists "anon can read recipes" on public.recipes;
create policy "anon can read recipes"
on public.recipes
for select
to anon
using (true);

drop policy if exists "anon can insert recipes" on public.recipes;
create policy "anon can insert recipes"
on public.recipes
for insert
to anon
with check (true);

drop policy if exists "anon can update recipes" on public.recipes;
create policy "anon can update recipes"
on public.recipes
for update
to anon
using (true)
with check (true);

drop policy if exists "anon can delete recipes" on public.recipes;
create policy "anon can delete recipes"
on public.recipes
for delete
to anon
using (true);

drop policy if exists "anon can read cooking logs" on public.cooking_logs;
create policy "anon can read cooking logs"
on public.cooking_logs
for select
to anon
using (true);

drop policy if exists "anon can insert cooking logs" on public.cooking_logs;
create policy "anon can insert cooking logs"
on public.cooking_logs
for insert
to anon
with check (true);

drop policy if exists "anon can update cooking logs" on public.cooking_logs;
create policy "anon can update cooking logs"
on public.cooking_logs
for update
to anon
using (true)
with check (true);

drop policy if exists "anon can delete cooking logs" on public.cooking_logs;
create policy "anon can delete cooking logs"
on public.cooking_logs
for delete
to anon
using (true);
