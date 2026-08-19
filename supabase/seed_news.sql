-- Vijesti (izvučeno iz postojećeg newsSlice.js)
insert into news (naslov, kratko, sadrzaj, datum, kategorija, url, slika) values
('Sloga remizirala sa Krivajom', 'U 24. kolu Premijer lige BiH, Sloga je remizirala sa Krivajom rezultatom 31:31.', 'U 24. kolu Premijer lige BiH, Sloga je remizirala sa Krivajom rezultatom 31:31. Uprkos remiju, Sloga ostaje na trećem mjestu tabele sa 33 boda i nastavlja borbu za evropsku poziciju.', '27.04.2026', 'Rezultat', 'https://sportdc.net/n/175986/sloga-remizirala-sa-krivajom', 'https://sportdc.net/img/newsphoto/175986/800'),
('Peta uzastopna pobjeda Sloge', 'Rukometaši Sloge ostvarili su petu uzastopnu pobjedu i učvrstili poziciju u vrhu tabele.', 'Rukometaši Sloge ostvarili su petu uzastopnu pobjedu i učvrstili poziciju u vrhu tabele Premijer lige BiH. Sjajan niz rezultata svrstava ih među favorite za evropsku poziciju.', '24.04.2026', 'Pobjeda', 'https://sportdc.net/n/175861/peta-uzastopna-pobjeda-sloge', 'https://sportdc.net/img/newsphoto/175861/800'),
('Sloga u dramatičnoj utakmici bolja od Borca', 'MRK Sloga Doboj slavila je u 22. kolu Premijer lige BiH protiv Borac M:TEL rezultatom 29:28.', 'U jednoj od najdramatičnijih utakmica sezone, Sloga je na svom terenu savladala Borac M:TEL minimalnim rezultatom 29:28. Utakmica je bila neizvjesna do posljednje sekunde.', '11.04.2026', 'Derbi', 'https://sportdc.net/n/175711/sloga-u-dramaticnoj-utakmici-bolja-od-borca', 'https://sportdc.net/img/newsphoto/175711/800'),
('Srđan Pavlović: Sloga spremna za derbi protiv Borca', 'Trener Sloge uoči derbija poručio da je tim u odličnoj formi i spreman za najveći izazov sezone.', 'Trener MRK Sloga Doboj Srđan Pavlović izjavio je uoči derbija sa Borcem da su igrači maksimalno motivisani i fizički spremni.', '11.04.2026', 'Intervju', 'https://sportdc.net/n/175689/srdjan-pavlovic-sloga-spremna-za-derbi-protiv-borca', 'https://sportdc.net/img/newsphoto/175689/800'),
('Sloga na evropskom putu, pobjeda u Vogošći', 'Sloga je slavila u gostima kod Vogošće i nastavila niz dobrih rezultata u drugom dijelu sezone.', 'MRK Sloga Doboj ostvarila je važnu pobjedu u gostima, savladavši domaći tim Vogošće rezultatom 34:32.', '04.04.2026', 'Pobjeda', 'https://sportdc.net/n/175557/sloga-na-evropskom-putu-pobjeda-u-vogosci', 'https://sportdc.net/img/newsphoto/175557/800'),
('Kup BiH: Sloga protiv Slobode u polufinalu', 'Izvučen je žrijeb za polufinale Kupa Bosne i Hercegovine — Sloga se sastaje sa Slobodom iz Tuzle.', 'Rukometaši MRK Sloga Doboj dočekuju Slobodu iz Tuzle u polufinalu Kupa Bosne i Hercegovine.', '05.04.2026', 'Kup', 'https://sportdc.net/n/175796/kup-bosne-i-hercegovine-sloga-protiv-slobode-leotar-protiv-izvidjaca', 'https://sportdc.net/img/newsphoto/175796/800'),
('Slogini dječaci 2013. godišta i mlađi bez poraza', 'Mlađe kategorije MRK Sloga Doboj nastavljaju sjajan niz — pioniri godišta 2013. i mlađi još uvijek neporaženi.', 'Podmladak MRK Sloga Doboj nastavlja s izvrsnim rezultatima. Pioniri godišta 2013. i mlađi odigrali su odličnu sezonu bez ijednog poraza.', '28.03.2026', 'Omladinska', 'https://sportdc.net/n/175583/slogini-djecaci-2013-godiste-i-mladji-bez-poraza', 'https://sportdc.net/img/newsphoto/175583/800'),
('Sloga savladala Maglaja', 'Rukometaši Sloge porazili su ekipu Maglaja rezultatom 27:24.', 'Rukometaši Sloge porazili su ekipu Maglaja rezultatom 27:24. Sjajni golman Đorđe Bosić sakupio je 17 odbrana od toga jedan sedmerac.', '28.03.2026', 'Rezultat', 'https://sportdc.net/n/175398/sloga-savladala-maglaja', 'https://sportdc.net/img/newsphoto/175398/800');

-- Sljedeća i prethodna utakmica (izvučeno iz matchSlice.js)
insert into matches (tip, domacin, gost, gol_domacin, gol_gost, datum, vrijeme) values
('sljedeca', 'Sloga', 'Borac', null, null, '10.05.2026', '19:00'),
('prethodna', 'Sloga', 'Borac M:TEL', 29, 28, '22.04.2026', null);

-- Tabela lige (fallback podaci koje je MatchComponent koristio)
insert into league_table (pos, tim, u, p, r, g, bod, highlight) values
(1,  'Izviđač',    26, 18, 1, 3,  44, false),
(2,  'Borac Banja Luka',      26, 17, 1, 4,  39, false),
(3,  'Zrinjski',   26, 15, 2, 5,  27, false),
(4,  'Maglaj',     26, 14, 1, 7,  21, false),
(5,  'Vogošća',    26, 11, 2, 9,  30, false),
(6,  'Konjuh Živinice',     26, 10, 2, 10, 33, false),
(7,  'Bosna Visoko',      26, 9,  1, 12, 21, false),
(8,  'Sloga Doboj',      26, 7,  2, 13, 37, true),
(9,  'Derventa',     26, 5,  1, 16, 19, false),
(10, 'Krivaja', 26, 3,  1, 18, 27,  false),
(11, 'Goražde', 26, 2,  1, 19, 22,  false),
(12, 'Gračanica',     26, 1,  0, 21, 21,  false),
(13, 'Sloboda Tuzla',     26, 0,  0, 22, 12,  false),
(14, 'Leotar', 26, 0,  0, 22, 11,  false);
