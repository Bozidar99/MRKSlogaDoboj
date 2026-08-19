-- ============================================================
-- MRK Sloga Doboj — Supabase šema
-- Pokreni ovo u Supabase Dashboard -> SQL Editor -> New query -> Run
-- ============================================================

-- 1. VIJESTI
create table if not exists news (
  id bigint generated always as identity primary key,
  naslov text not null,
  kratko text,
  sadrzaj text,
  datum text,
  kategorija text default 'Rezultat',
  url text,
  slika text,
  created_at timestamptz default now()
);

-- 2. IGRAČ UTAKMICE (jedan red, uvijek se update-uje)
create table if not exists igrac_utakmice (
  id int primary key default 1,
  ime text,
  golova int,
  utakmica text,
  datum text,
  opis text,
  constraint single_row check (id = 1)
);
insert into igrac_utakmice (id, ime, golova, utakmica, datum, opis)
values (1, 'Dušan Vasić', 9, 'Sloga 29 : 28 Borac M:TEL', '22.04.2026', 'Heroj večeri.')
on conflict (id) do nothing;

-- 3. IGRAČI
create table if not exists players (
  id bigint generated always as identity primary key,
  ime text not null,
  br int not null,
  pozicija text,
  kategorija text not null check (kategorija in ('golmani','krila','bekovi','pivoti')),
  slika text,
  created_at timestamptz default now()
);

-- 4. TRENERI / STRUČNI ŠTAB
create table if not exists coaches (
  id bigint generated always as identity primary key,
  ime text not null,
  pozicija text,
  slika text,
  created_at timestamptz default now()
);

-- 5. ISTORIJA KLUBA
create table if not exists history (
  id bigint generated always as identity primary key,
  godina text,
  naslov text,
  kratko text,
  tekst text,
  slika text,
  created_at timestamptz default now()
);

-- 6. UTAKMICE (sljedeća i prethodna)
create table if not exists matches (
  id bigint generated always as identity primary key,
  tip text not null check (tip in ('sljedeca','prethodna')),
  domacin text,
  gost text,
  gol_domacin int,
  gol_gost int,
  datum text,
  vrijeme text,
  created_at timestamptz default now()
);

-- 7. TABELA LIGE (admin ručno unosi/ažurira)
create table if not exists league_table (
  id bigint generated always as identity primary key,
  pos int,
  tim text not null,
  u int default 0,
  p int default 0,
  r int default 0,
  g int default 0,
  bod int default 0,
  highlight boolean default false
);

-- 8. GALERIJA (metapodaci; same slike idu u Supabase Storage bucket "gallery")
create table if not exists gallery (
  id bigint generated always as identity primary key,
  url text not null,
  opis text,
  created_at timestamptz default now()
);

-- ============================================================
-- RLS (Row Level Security) — javno čitanje, upis samo ulogovanim adminima
-- ============================================================
alter table news enable row level security;
alter table igrac_utakmice enable row level security;
alter table players enable row level security;
alter table coaches enable row level security;
alter table history enable row level security;
alter table matches enable row level security;
alter table league_table enable row level security;
alter table gallery enable row level security;

-- Svi mogu da ČITAJU (public sajt)
create policy "Public read news" on news for select using (true);
create policy "Public read igrac_utakmice" on igrac_utakmice for select using (true);
create policy "Public read players" on players for select using (true);
create policy "Public read coaches" on coaches for select using (true);
create policy "Public read history" on history for select using (true);
create policy "Public read matches" on matches for select using (true);
create policy "Public read league_table" on league_table for select using (true);
create policy "Public read gallery" on gallery for select using (true);

-- Samo ULOGOVANI korisnici (admin) mogu da PIŠU/MENJAJU/BRIŠU
create policy "Auth write news" on news for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "Auth write igrac_utakmice" on igrac_utakmice for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "Auth write players" on players for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "Auth write coaches" on coaches for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "Auth write history" on history for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "Auth write matches" on matches for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "Auth write league_table" on league_table for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "Auth write gallery" on gallery for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

-- ============================================================
-- Storage bucket za slike galerije
-- Ovo pokreni odvojeno, ili napravi bucket ručno kroz Storage tab u Supabase-u:
-- Ime bucketa: gallery   |   Public: YES
-- ============================================================
