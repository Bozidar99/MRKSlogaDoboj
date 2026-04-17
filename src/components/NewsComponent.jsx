import React, { useState } from 'react'
import duca from "../assets/duca.jpg"

const vijesti = [
  {
    id: 1,
    naslov: "Sloga u dramatičnoj utakmici bolja od Borca",
    kratko: "MRK Sloga Doboj slavila je u 22. kolu Premijer lige BiH protiv Borac M:TEL rezultatom 29:28 u napetoj završnici.",
    sadrzaj: "U jednoj od najdramatičnijih utakmica sezone, Sloga je na svom terenu savladala Borac M:TEL minimalnim rezultatom 29:28. Utakmica je bila neizvjesna do posljednje sekunde, a Slogini navijači su odahnuli tek kada je završni zvižduk sudije označio kraj meča. Pobjedom su crveno-crni ostali u borbi za visoke pozicije u ligi.",
    datum: "22.04.2026",
    url: "https://sportdc.net/n/175711/sloga-u-dramaticnoj-utakmici-bolja-od-borca"
  },
  {
    id: 2,
    naslov: "Srđan Pavlović: Sloga spremna za derbi protiv Borca",
    kratko: "Trener Sloge uoči derbija poručio da je tim u odličnoj formi i spreman za najveći izazov sezone.",
    sadrzaj: "Trener MRK Sloga Doboj Srđan Pavlović izjavio je uoči derbija sa Borcem da su igrači maksimalno motivisani i fizički spremni. Pavlović je naglasio da ekipa dobro funkcioniše kao kolektiv i da je ovo šansa da se pokaže pravi karakter tima. Navijači su ispunili halu i pružili odličnu podršku.",
    datum: "18.04.2026",
    url: "https://sportdc.net/n/175689/srdjan-pavlovic-sloga-spremna-za-derbi-protiv-borca"
  },
  {
    id: 3,
    naslov: "Sloga na evropskom putu, pobjeda u Vogošći",
    kratko: "Sloga je slavila u gostima kod Vogošće i nastavila niz dobrih rezultata u drugom dijelu sezone.",
    sadrzaj: "MRK Sloga Doboj ostvarila je važnu pobjedu u gostima, savladavši domaći tim Vogošće. Gosti su pokazali odličnu organizaciju igre i efikasnost u napadu, što ih je dovelo do vrijednih bodova koji ih drže u vrhu tabele. Rezultat govori o uzlaznoj formi Sloginih rukometaša.",
    datum: "10.04.2026",
    url: "https://sportdc.net/n/175557/sloga-na-evropskom-putu-pobjeda-u-vogosci"
  },
  {
    id: 4,
    naslov: "Kup BiH: Sloga protiv Slobode u polufinalu",
    kratko: "Izvučen je žrijeb za polufinale Kupa Bosne i Hercegovine — Sloga se sastaje sa Slobodom iz Tuzle.",
    sadrzaj: "Rukometaši MRK Sloga Doboj dočekuju Slobodu iz Tuzle u polufinalu Kupa Bosne i Hercegovine. Ovo je velika prilika za klub da osvoji trofej i nastavi tradiciju uspješnih nastupa u kup takmičenjima. Utakmica se očekuje s velikim interesovanjem navijača.",
    datum: "05.04.2026",
    url: "https://sportdc.net/n/175796/kup-bosne-i-hercegovine-sloga-protiv-slobode-leotar-protiv-izvidjaca"
  },
  {
    id: 5,
    naslov: "Slogini dječaci 2013. godišta i mlađi bez poraza",
    kratko: "Mlađe kategorije MRK Sloga Doboj nastavljaju sjajan niz — pioniri godišta 2013. i mlađi još uvijek neporaženi.",
    sadrzaj: "Podmladak MRK Sloga Doboj nastavlja s izvrsnim rezultatima. Pioniri godišta 2013. i mlađi odigrali su odličnu sezonu bez ijednog poraza, što govori o kvalitetu rada sa mladim igračima i perspektivnoj budućnosti kluba. Ovo je dokaz da Sloga ulaže u razvoj domaćih talenata.",
    datum: "28.03.2026",
    url: "https://sportdc.net/n/175583/slogini-djecaci-2013-godiste-i-mladji-bez-poraza"
  },
  {
    id: 6,
    naslov: "Bitka za poziciju dva — Sloga u igri",
    kratko: "Sa 30 bodova i odličnom formom, Sloga je realan kandidat za visoku poziciju u završnici sezone.",
    sadrzaj: "Kako se sezona privodi kraju, borba za drugu poziciju u Premijer ligi BiH postaje sve napetija. MRK Sloga Doboj je sa serijom dobrih rezultata ušla u krug favorita za visoko mjesto. Preostalih nekoliko kola biće presudno, a Slogini navijači s uzbuđenjem prate svaku utakmicu.",
    datum: "17.04.2026",
    url: "https://sportdc.net/n/175814/bitka-za-poziciju-dva"
  },
]

const igracUtakmice = {
  ime: "Dušan Vasić",
  golova: 9,
  utakmica: "Sloga 29 : 28 Borac M:TEL",
  datum: "22.04.2026",
  opis: "Dušan je bio heroj večeri u dramatičnoj pobjedi nad Borcem, pogodivši odlučujući gol u završnici."
}

function NewsComponent() {
  const [aktivna, setAktivna] = useState(null)

  return (
    <div className="w-full bg-gray-50 py-10 md:py-16 px-4">
      <div className="max-w-7xl mx-auto">

        {/* NASLOV SEKCIJE */}
        <h2 className="text-2xl md:text-3xl font-extrabold text-center text-red-600 mb-8 tracking-wide uppercase">
          📰 Vijesti & Igrač Utakmice
        </h2>

        {/* GORNJI RED: POSLJEDNJA VIJEST + IGRAČ UTAKMICE */}
        <div className="flex flex-col md:flex-row gap-6 mb-10">

          {/* POSLJEDNJA VIJEST */}
          <div className="flex-1 bg-white rounded-2xl shadow-lg border-4 border-red-600 overflow-hidden">
            <div className="bg-red-600 px-5 py-3">
              <span className="text-white font-bold text-sm uppercase tracking-widest">🔴 Najnovija vijest</span>
            </div>
            <div className="p-5 md:p-6">
              <p className="text-xs text-gray-400 mb-2">{vijesti[0].datum}</p>
              <h3 className="text-lg md:text-xl font-extrabold text-black mb-3 leading-snug">
                {vijesti[0].naslov}
              </h3>
              <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-4">
                {vijesti[0].sadrzaj}
              </p>
              
                href={vijesti[0].url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-red-600 text-white text-sm font-bold px-4 py-2 rounded-xl hover:bg-red-700 transition"
              <a>
                Pročitaj više →
              </a>
            </div>
          </div>

          {/* IGRAČ UTAKMICE */}
          <div className="md:w-72 bg-white rounded-2xl shadow-lg border-4 border-black overflow-hidden flex flex-col">
            <div className="bg-black px-5 py-3">
              <span className="text-white font-bold text-sm uppercase tracking-widest">⭐ Igrač utakmice</span>
            </div>
            <div className="flex flex-col items-center p-5 flex-1">
              <img
                src={duca}
                alt="Igrač utakmice"
                className="w-32 h-32 md:w-40 md:h-40 object-cover rounded-full border-4 border-red-600 shadow-lg mb-4"
              />
              <h3 className="text-xl font-extrabold text-black">{igracUtakmice.ime}</h3>
              <div className="flex items-center gap-2 mt-2 mb-3">
                <span className="bg-red-600 text-white font-extrabold text-2xl px-4 py-1 rounded-xl shadow">
                  {igracUtakmice.golova}
                </span>
                <span className="text-gray-500 text-sm font-semibold">golova</span>
              </div>
              <p className="text-xs text-gray-400 text-center mb-1">{igracUtakmice.utakmica}</p>
              <p className="text-xs text-gray-400 text-center mb-3">{igracUtakmice.datum}</p>
              <p className="text-sm text-gray-600 text-center italic leading-relaxed">
                "{igracUtakmice.opis}"
              </p>
            </div>
          </div>

        </div>

        {/* GRID VIJESTI */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {vijesti.slice(1).map((vijest) => (
            <div
              key={vijest.id}
              className="bg-white rounded-2xl shadow-md border-2 border-gray-200 hover:border-red-600 hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col cursor-pointer"
              onClick={() => setAktivna(aktivna === vijest.id ? null : vijest.id)}
            >
              <div className="p-5 flex flex-col flex-1">
                <p className="text-xs text-red-500 font-semibold mb-1">{vijest.datum}</p>
                <h3 className="text-base font-bold text-black mb-2 leading-snug">
                  {vijest.naslov}
                </h3>
                <p className="text-sm text-gray-500 flex-1">
                  {aktivna === vijest.id ? vijest.sadrzaj : vijest.kratko}
                </p>
              </div>
              <div className="px-5 pb-4 flex justify-between items-center">
                <button className="text-red-600 text-sm font-bold hover:underline">
                  {aktivna === vijest.id ? "Zatvori ↑" : "Čitaj više ↓"}
                </button>
                
                  href={vijest.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="text-xs text-gray-400 hover:text-red-600 transition"
                <a>
                  Sport DC →
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}

export default NewsComponent