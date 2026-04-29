-- 麦麦手记 Storage RLS policy
-- 适用范围：无登录个人 MVP。允许 anon 角色读写指定 public buckets。

drop policy if exists "anon can read maimai storage objects" on storage.objects;
create policy "anon can read maimai storage objects"
on storage.objects
for select
to anon
using (bucket_id in ('recipe-covers', 'cooking-log-photos'));

drop policy if exists "anon can upload maimai storage objects" on storage.objects;
create policy "anon can upload maimai storage objects"
on storage.objects
for insert
to anon
with check (bucket_id in ('recipe-covers', 'cooking-log-photos'));

drop policy if exists "anon can update maimai storage objects" on storage.objects;
create policy "anon can update maimai storage objects"
on storage.objects
for update
to anon
using (bucket_id in ('recipe-covers', 'cooking-log-photos'))
with check (bucket_id in ('recipe-covers', 'cooking-log-photos'));

drop policy if exists "anon can delete maimai storage objects" on storage.objects;
create policy "anon can delete maimai storage objects"
on storage.objects
for delete
to anon
using (bucket_id in ('recipe-covers', 'cooking-log-photos'));
