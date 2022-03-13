-- profile
create table profiles (
  id uuid references auth.users not null,
  updated_at timestamp with time zone,
  username text unique,
  avatar_url text,
  primary key (id),
  unique(username),
  constraint username_length check (char_length(username) >= 3)
);
alter table profiles enable row level security;
create policy "Public profiles are viewable by the owner." on profiles for
select using (auth.uid() = id);
create policy "Users can insert their own profile." on profiles for
insert with check (auth.uid() = id);
create policy "Users can update own profile." on profiles for
update using (auth.uid() = id);
-- secret group
create table secrets_group (
  id serial unique,
  user_id uuid references auth.users not null,
  name text,
  primary key (id, name),
  constraint name_length check (char_length(name) >= 3)
);
alter table secrets_group enable row level security;
create policy "Secret groups are viewable by the owner." on secrets_group for
select using (auth.uid() = user_id);
create policy "Users can insert new secret groups." on secrets_group for
insert with check (auth.uid() = user_id);
create policy "Users can update secret groups they own." on secrets_group for
update with check (auth.uid() = user_id);
-- secret
create table secrets (
  name text,
  value text,
  group_id int references secrets_group(id) not null,
  primary key (group_id, name),
  constraint name_length check (char_length(name) >= 3)
);
alter table secrets enable row level security;
create policy "Secrets are viewable by the owner." on secrets for
select using (
    exists(
      select 1
      from secrets_group sg
      where sg.user_id = auth.uid()
        and sg.id = secrets.group_id
    )
  );
create policy "Secrets are insertable into groups owned by the user." on secrets for
insert with check (
    exists(
      select 1
      from secrets_group sg
      where sg.user_id = auth.uid()
        and sg.id = secrets.group_id
    )
  );
create policy "Secrets are updatable if group is owned by the user." on secrets for
update with check (
    exists(
      select 1
      from secrets_group sg
      where sg.user_id = auth.uid()
        and sg.id = secrets.group_id
    )
  );
create policy "Secrets are deletable if group is owned by the user." on secrets for delete with check (
  exists(
    select 1
    from secrets_group sg
    where sg.user_id = auth.uid()
      and sg.id = secrets.group_id
  )
);
-- Set up Realtime
begin;
drop publication if exists supabase_realtime;
create publication supabase_realtime;
commit;
alter publication supabase_realtime
add table profiles;
-- Set up Storage
insert into storage.buckets (id, name)
values ('avatars', 'avatars');
create policy "Avatar images are publicly accessible." on storage.objects for
select using (bucket_id = 'avatars');
create policy "Anyone can upload an avatar." on storage.objects for
insert with check (bucket_id = 'avatars');
create policy "Anyone can update an avatar." on storage.objects for
update with check (bucket_id = 'avatars');