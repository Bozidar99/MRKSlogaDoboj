import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  vijesti: [
    {
      id: 1,
      naslov: "Sloga remizirala sa Krivajom",
      kratko: "U 24. kolu Premijer lige BiH, Sloga je remizirala sa Krivajom rezultatom 31:31.",
      sadrzaj: "U 24. kolu Premijer lige BiH, Sloga je remizirala sa Krivajom rezultatom 31:31. Uprkos remiju, Sloga ostaje na trećem mjestu tabele sa 33 boda i nastavlja borbu za evropsku poziciju.",
      datum: "27.04.2026",
      kategorija: "Rezultat",
      url: "https://sportdc.net/n/175986/sloga-remizirala-sa-krivajom",
      slika: "https://sportdc.net/img/newsphoto/175986/800"
    },
    {
      id: 2,
      naslov: "Peta uzastopna pobjeda Sloge",
      kratko: "Rukometaši Sloge ostvarili su petu uzastopnu pobjedu i učvrstili poziciju u vrhu tabele.",
      sadrzaj: "Rukometaši Sloge ostvarili su petu uzastopnu pobjedu i učvrstili poziciju u vrhu tabele Premijer lige BiH. Sjajan niz rezultata svrstava ih među favorite za evropsku poziciju.",
      datum: "24.04.2026",
      kategorija: "Pobjeda",
      url: "https://sportdc.net/n/175861/peta-uzastopna-pobjeda-sloge",
      slika: "https://sportdc.net/img/newsphoto/175861/800"
    },
    {
      id: 3,
      naslov: "Sloga u dramatičnoj utakmici bolja od Borca",
      kratko: "MRK Sloga Doboj slavila je u 22. kolu Premijer lige BiH protiv Borac M:TEL rezultatom 29:28.",
      sadrzaj: "U jednoj od najdramatičnijih utakmica sezone, Sloga je na svom terenu savladala Borac M:TEL minimalnim rezultatom 29:28. Utakmica je bila neizvjesna do posljednje sekunde.",
      datum: "11.04.2026",
      kategorija: "Derbi",
      url: "https://sportdc.net/n/175711/sloga-u-dramaticnoj-utakmici-bolja-od-borca",
      slika: "https://sportdc.net/img/newsphoto/175711/800"
    },
    {
      id: 4,
      naslov: "Srđan Pavlović: Sloga spremna za derbi protiv Borca",
      kratko: "Trener Sloge uoči derbija poručio da je tim u odličnoj formi i spreman za najveći izazov sezone.",
      sadrzaj: "Trener MRK Sloga Doboj Srđan Pavlović izjavio je uoči derbija sa Borcem da su igrači maksimalno motivisani i fizički spremni.",
      datum: "11.04.2026",
      kategorija: "Intervju",
      url: "https://sportdc.net/n/175689/srdjan-pavlovic-sloga-spremna-za-derbi-protiv-borca",
      slika: "https://sportdc.net/img/newsphoto/175689/800"
    },
    {
      id: 5,
      naslov: "Sloga na evropskom putu, pobjeda u Vogošći",
      kratko: "Sloga je slavila u gostima kod Vogošće i nastavila niz dobrih rezultata u drugom dijelu sezone.",
      sadrzaj: "MRK Sloga Doboj ostvarila je važnu pobjedu u gostima, savladavši domaći tim Vogošće rezultatom 34:32.",
      datum: "04.04.2026",
      kategorija: "Pobjeda",
      url: "https://sportdc.net/n/175557/sloga-na-evropskom-putu-pobjeda-u-vogosci",
      slika: "https://sportdc.net/img/newsphoto/175557/800"
    },
    {
      id: 6,
      naslov: "Kup BiH: Sloga protiv Slobode u polufinalu",
      kratko: "Izvučen je žrijeb za polufinale Kupa Bosne i Hercegovine — Sloga se sastaje sa Slobodom iz Tuzle.",
      sadrzaj: "Rukometaši MRK Sloga Doboj dočekuju Slobodu iz Tuzle u polufinalu Kupa Bosne i Hercegovine.",
      datum: "05.04.2026",
      kategorija: "Kup",
      url: "https://sportdc.net/n/175796/kup-bosne-i-hercegovine-sloga-protiv-slobode-leotar-protiv-izvidjaca",
      slika: "https://sportdc.net/img/newsphoto/175796/800"
    },
    {
      id: 7,
      naslov: "Slogini dječaci 2013. godišta i mlađi bez poraza",
      kratko: "Mlađe kategorije MRK Sloga Doboj nastavljaju sjajan niz — pioniri godišta 2013. i mlađi još uvijek neporaženi.",
      sadrzaj: "Podmladak MRK Sloga Doboj nastavlja s izvrsnim rezultatima. Pioniri godišta 2013. i mlađi odigrali su odličnu sezonu bez ijednog poraza.",
      datum: "28.03.2026",
      kategorija: "Omladinska",
      url: "https://sportdc.net/n/175583/slogini-djecaci-2013-godiste-i-mladji-bez-poraza",
      slika: "https://sportdc.net/img/newsphoto/175583/800"
    },
    {
      id: 8,
      naslov: "Sloga savladala Maglaja",
      kratko: "Rukometaši Sloge porazili su ekipu Maglaja rezultatom 27:24.",
      sadrzaj: "Rukometaši Sloge porazili su ekipu Maglaja rezultatom 27:24. Sjajni golman Đorđe Bosić sakupio je 17 odbrana od toga jedan sedmerac.",
      datum: "28.03.2026",
      kategorija: "Rezultat",
      url: "https://sportdc.net/n/175398/sloga-savladala-maglaja",
      slika: "https://sportdc.net/img/newsphoto/175398/800"
    },
  ],
  igracUtakmice: {
    ime: "Dušan Vasić",
    golova: 9,
    utakmica: "Sloga 29 : 28 Borac M:TEL",
    datum: "22.04.2026",
    opis: "Dušan je bio heroj večeri u dramatičnoj pobjedi nad Borcem, pogodivši odlučujući gol u završnici."
  },
  loading: false,
  error: null,
}

const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    dodajVijest: (state, action) => {
      state.vijesti.unshift(action.payload)
    },
    obrisiVijest: (state, action) => {
      state.vijesti = state.vijesti.filter(v => v.id !== action.payload)
    },
    urediVijest: (state, action) => {
      const index = state.vijesti.findIndex(v => v.id === action.payload.id)
      if (index !== -1) state.vijesti[index] = action.payload
    },
    postaviIgracaUtakmice: (state, action) => {
      state.igracUtakmice = action.payload
    },
  }
})

export const { dodajVijest, obrisiVijest, urediVijest, postaviIgracaUtakmice } = newsSlice.actions
export default newsSlice.reducer