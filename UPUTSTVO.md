# MRK Sloga Doboj — Uputstvo za postavljanje

Ovaj projekat je sad povezan sa **Supabase** bazom podataka, tako da sve što se unese kroz dashboard (vijesti, igrači, utakmice, galerija) **ostaje trajno sačuvano** i vidljivo svim posjetiocima sajta — ne nestaje na refresh.

Prati korake redom. Traje oko 15-20 minuta, samo prvi put.

---

## KORAK 1 — Napravi besplatan Supabase nalog

1. Idi na **https://supabase.com** i klikni **Start your project**
2. Prijavi se (najlakše preko GitHub naloga, ili emailom)
3. Klikni **New Project**
   - Ime projekta: `mrk-sloga-doboj` (ili kako želiš)
   - Lozinka baze: postavi jaku lozinku i **sačuvaj je negdje** (neće ti trebati često, ali dobro je da je imaš)
   - Region: izaberi najbliži (npr. Frankfurt/EU)
4. Sačekaj 1-2 minuta da se projekat kreira

---

## KORAK 2 — Kreiraj tabele u bazi

1. U Supabase panelu, sa leve strane klikni na **SQL Editor**
2. Klikni **New query**
3. Otvori fajl `supabase/schema.sql` (iz ovog projekta), kopiraj **sav** sadržaj, nalepi u editor, i klikni **Run**
4. To će napraviti sve potrebne tabele i podesiti bezbednost (ko može da čita, ko može da menja)

### Popuni bazu postojećim podacima (opciono, ali preporučeno)

Isto ponovi (New query -> nalepi sadržaj -> Run) za svaki od ovih fajlova, redom:
- `supabase/seed_players.sql` (postojeći igrači i treneri)
- `supabase/seed_history.sql` (istorija kluba)
- `supabase/seed_news.sql` (postojeće vijesti, utakmice, tabela lige)

---

## KORAK 3 — Napravi "bucket" za slike galerije

1. U Supabase panelu klikni **Storage** (lijevi meni)
2. Klikni **New bucket**
3. Ime: `gallery`
4. Označi **Public bucket** — DA (da bi slike bile vidljive na sajtu)
5. Klikni **Create bucket**

---

## KORAK 4 — Napravi admin nalog (za login u dashboard)

1. U Supabase panelu klikni **Authentication** (lijevi meni)
2. Klikni **Users** -> **Add user** -> **Create new user**
3. Unesi email (npr. `admin@mrksloga.com`) i lozinku po želji
4. **NE** čekiraj "Auto Confirm User" opciju ako postoji — zapravo, čekiraj je (da ne mora email da se potvrđuje)
5. Klikni **Create user**

Ovo su podaci sa kojima ćeš se ubuduće logovati na `/login` stranici sajta — email i lozinka koje si sad postavio/la. Možeš napraviti više naloga za više ljudi iz kluba koji treba da uređuju sajt.

---

## KORAK 5 — Poveži kod sa svojim Supabase projektom

1. U Supabase panelu idi na **Project Settings** (zupčanik dole lijevo) -> **API**
2. Kopiraj dvije stvari:
   - **Project URL** (izgleda kao `https://xxxxx.supabase.co`)
   - **anon public** ključ (dugačak tekst)
3. U ovom projektu, napravi fajl `.env` u glavnom folderu (pored `package.json`) — kopiraj `.env.example` i preimenuj u `.env`
4. Otvori `.env` i upiši svoje podatke:

```
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=tvoj-anon-key-ovdje
```

---

## KORAK 6 — Pokreni projekat

U terminalu, unutar foldera projekta:

```bash
npm install
npm run dev
```

Otvori link koji se prikaže (obično `http://localhost:5173`).

- Idi na `/login` i uloguj se sa email/lozinkom iz Koraka 4
- Ući ćeš u `/dashboard/home` gde možeš da dodaješ/menjaš/brišeš vijesti, igrače, utakmice i slike u galeriji
- Sve promjene se odmah čuvaju u bazi i vidljive su svima na sajtu

---

## Kada budeš spreman/na da sajt bude "živ" (online)

Za sada ovo radi samo na tvom računaru (`localhost`). Kad budeš htio/htjela da sajt bude dostupan na internetu (na pravom domenu), javi — to je poseban korak (deploy na npr. Vercel/Netlify), gde ćeš samo trebati da uneseš iste `.env` vrijednosti u podešavanja tog servisa.

---

## Šta je promijenjeno u odnosu na staru verziju

- **Login** sad stvarno radi i štiti `/dashboard` (ranije je svako mogao da uđe direktno na `/dashboard/home` bez ikakve prijave)
- **Sve promjene iz dashboarda se čuvaju trajno** (ranije su nestajale na refresh)
- Dodata je **Galerija** stranica u dashboardu (ranije nije ni postojala)
- Dodata je **Utakmice** stranica u dashboardu — admin sad može da mijenja sljedeću/prethodnu utakmicu i tabelu lige kroz formu, umjesto da to bude zakucano u kodu
- Live tabela lige na početnoj strani više ne zove eksterni AI servis (koji nije radio van chat okruženja) — sad se ručno ažurira kroz dashboard
