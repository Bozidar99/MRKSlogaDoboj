import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  vijesti: [
    {
      id: 1,
      naslov: "Sloga u dramatičnoj utakmici bolja od Borca",
      kratko: "MRK Sloga Doboj slavila je u 22. kolu Premijer lige BiH protiv Borac M:TEL rezultatom 29:28 u napetoj završnici.",
      sadrzaj: "U jednoj od najdramatičnijih utakmica sezone, Sloga je na svom terenu savladala Borac M:TEL minimalnim rezultatom 29:28. Utakmica je bila neizvjesna do posljednje sekunde, a Slogini navijači su odahnuli tek kada je završni zvižduk sudije označio kraj meča.",
      datum: "22.04.2026",
      url: "https://sportdc.net/n/175711/sloga-u-dramaticnoj-utakmici-bolja-od-borca"
    },
    {
      id: 2,
      naslov: "Srđan Pavlović: Sloga spremna za derbi protiv Borca",
      kratko: "Trener Sloge uoči derbija poručio da je tim u odličnoj formi i spreman za najveći izazov sezone.",
      sadrzaj: "Trener MRK Sloga Doboj Srđan Pavlović izjavio je uoči derbija sa Borcem da su igrači maksimalno motivisani i fizički spremni.",
      datum: "18.04.2026",
      url: "https://sportdc.net/n/175689/srdjan-pavlovic-sloga-spremna-za-derbi-protiv-borca"
    },
    {
      id: 3,
      naslov: "Sloga na evropskom putu, pobjeda u Vogošći",
      kratko: "Sloga je slavila u gostima kod Vogošće i nastavila niz dobrih rezultata u drugom dijelu sezone.",
      sadrzaj: "MRK Sloga Doboj ostvarila je važnu pobjedu u gostima, savladavši domaći tim Vogošće.",
      datum: "10.04.2026",
      url: "https://sportdc.net/n/175557/sloga-na-evropskom-putu-pobjeda-u-vogosci"
    },
    {
      id: 4,
      naslov: "Kup BiH: Sloga protiv Slobode u polufinalu",
      kratko: "Izvučen je žrijeb za polufinale Kupa Bosne i Hercegovine — Sloga se sastaje sa Slobodom iz Tuzle.",
      sadrzaj: "Rukometaši MRK Sloga Doboj dočekuju Slobodu iz Tuzle u polufinalu Kupa Bosne i Hercegovine.",
      datum: "05.04.2026",
      url: "https://sportdc.net/n/175796/kup-bosne-i-hercegovine-sloga-protiv-slobode-leotar-protiv-izvidjaca"
    },
    {
      id: 5,
      naslov: "Slogini dječaci 2013. godišta i mlađi bez poraza",
      kratko: "Mlađe kategorije MRK Sloga Doboj nastavljaju sjajan niz — pioniri godišta 2013. i mlađi još uvijek neporaženi.",
      sadrzaj: "Podmladak MRK Sloga Doboj nastavlja s izvrsnim rezultatima. Pioniri godišta 2013. i mlađi odigrali su odličnu sezonu bez ijednog poraza.",
      datum: "28.03.2026",
      url: "https://sportdc.net/n/175583/slogini-djecaci-2013-godiste-i-mladji-bez-poraza"
    },
    {
      id: 6,
      naslov: "Bitka za poziciju dva — Sloga u igri",
      kratko: "Sa 30 bodova i odličnom formom, Sloga je realan kandidat za visoku poziciju u završnici sezone.",
      sadrzaj: "Kako se sezona privodi kraju, borba za drugu poziciju u Premijer ligi BiH postaje sve napetija.",
      datum: "17.04.2026",
      url: "https://sportdc.net/n/175814/bitka-za-poziciju-dva"
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
    // Ove akcije ćeš koristiti u admin panelu
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