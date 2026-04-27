import React, { useState } from 'react'
import Hero2Component from "../components/Hero2Component"

const vijesti = [
  {
    id: 1,
    naslov: "Sloga remizirala sa Krivajom",
    kratko: "U 24. kolu Premijer lige BiH, Sloga je remizirala sa Krivajom rezultatom 31:31.",
    datum: "27.04.2026",
    kategorija: "Rezultat",
    url: "https://sportdc.net/n/175986/sloga-remizirala-sa-krivajom",
    slika: "https://sportdc.net/img/newsphoto/175986/800"
  },
  {
    id: 2,
    naslov: "Peta uzastopna pobjeda Sloge",
    kratko: "Rukometaši Sloge ostvarili su petu uzastopnu pobjedu i učvrstili poziciju u vrhu tabele Premijer lige BiH.",
    datum: "24.04.2026",
    kategorija: "Pobjeda",
    url: "https://sportdc.net/n/175861/peta-uzastopna-pobjeda-sloge",
    slika: "https://sportdc.net/img/newsphoto/175861/800"
  },
  {
    id: 3,
    naslov: "Sloga u dramatičnoj utakmici bolja od Borca",
    kratko: "Rukometaši Sloge savladali su Borac M:TEL rezultatom 29:28 u velikom derbiju u fantastičnoj atmosferi.",
    datum: "11.04.2026",
    kategorija: "Derbi",
    url: "https://sportdc.net/n/175711/sloga-u-dramaticnoj-utakmici-bolja-od-borca",
    slika: "https://sportdc.net/img/newsphoto/175711/800"
  },
  {
    id: 4,
    naslov: "Srđan Pavlović: Sloga spremna za derbi protiv Borca",
    kratko: "Tim je mentalno i fizički spreman. Očekujem čvrstu, zahtjevnu i kvalitetnu utakmicu.",
    datum: "11.04.2026",
    kategorija: "Intervju",
    url: "https://sportdc.net/n/175689/srdjan-pavlovic-sloga-spremna-za-derbi-protiv-borca",
    slika: "https://sportdc.net/img/newsphoto/175689/800"
  },
  {
    id: 5,
    naslov: "Sloga na evropskom putu, pobjeda u Vogošći",
    kratko: "Rukometaši Sloge savladali su Vogošću rezultatom 34:32 i zabilježili treću uzastopnu pobjedu.",
    datum: "04.04.2026",
    kategorija: "Pobjeda",
    url: "https://sportdc.net/n/175557/sloga-na-evropskom-putu-pobjeda-u-vogosci",
    slika: "https://sportdc.net/img/newsphoto/175557/800"
  },
  {
    id: 6,
    naslov: "Sloga savladala Maglaja",
    kratko: "Rukometaši Sloge porazili su ekipu Maglaja rezultatom 27:24. Sjajni golman Đorđe Bosić sakupio je 17 odbrana.",
    datum: "28.03.2026",
    kategorija: "Rezultat",
    url: "https://sportdc.net/n/175398/sloga-savladala-maglaja",
    slika: "https://sportdc.net/img/newsphoto/175398/800"
  },
  {
    id: 7,
    naslov: "Slogini dječaci 2013. godišta i mlađi bez poraza",
    kratko: "Podmladak MRK Sloga Doboj nastavlja s izvrsnim rezultatima — pioniri godišta 2013. i mlađi još uvijek neporaženi.",
    datum: "28.03.2026",
    kategorija: "Omladinska",
    url: "https://sportdc.net/n/175583/slogini-djecaci-2013-godiste-i-mladji-bez-poraza",
    slika: "https://sportdc.net/img/newsphoto/175583/800"
  },
  {
    id: 8,
    naslov: "Kup BiH: Sloga protiv Slobode u polufinalu",
    kratko: "Izvučen žrijeb za polufinale Kupa BiH — Sloga se sastaje sa Slobodom iz Tuzle.",
    datum: "20.03.2026",
    kategorija: "Kup",
    url: "https://sportdc.net/n/175796/kup-bosne-i-hercegovine-sloga-protiv-slobode-leotar-protiv-izvidjaca",
    slika: "https://sportdc.net/img/newsphoto/175796/800"
  },
]

const kategorije = ["Sve", "Rezultat", "Pobjeda", "Derbi", "Intervju", "Kup", "Omladinska"]

const boje = {
  "Rezultat":   "bg-blue-100 text-blue-700",
  "Pobjeda":    "bg-green-100 text-green-700",
  "Derbi":      "bg-red-100 text-red-700",
  "Intervju":   "bg-purple-100 text-purple-700",
  "Kup":        "bg-yellow-100 text-yellow-700",
  "Omladinska": "bg-orange-100 text-orange-700",
}

function News() {
  const [aktivnaKat, setAktivnaKat] = useState("Sve")
  const [pretraga, setPretraga] = useState("")

  const filtrirane = vijesti.filter((v) => {
    const katOk = aktivnaKat === "Sve" || v.kategorija === aktivnaKat
    const pretragaOk = v.naslov.toLowerCase().includes(pretraga.toLowerCase())
    return katOk && pretragaOk
  })

  const glavnaVijest = filtrirane[0]
  const ostale = filtrirane.slice(1)

  return (
    <div className="w-full">
      

      {/* DEKORATIVNA LINIJA */}
      <div className="w-full bg-white flex items-center justify-center py-6 gap-4">
        <div className="h-[2px] w-24 bg-gray-200 rounded-full" />
        <div className="w-3 h-3 rounded-full bg-red-600" />
        <div className="h-[2px] w-48 bg-red-600 rounded-full" />
        <div className="w-3 h-3 rounded-full bg-red-600" />
        <div className="h-[2px] w-24 bg-gray-200 rounded-full" />
      </div>

      <div className="w-full bg-gray-50 pb-16 px-4">
        <div className="max-w-7xl mx-auto">

          {/* NASLOV */}
          <h1 className="text-3xl md:text-4xl font-extrabold text-center text-black uppercase tracking-wide mb-2">
            Vijesti
          </h1>
          <p className="text-center text-gray-400 mb-8 text-sm">
            Sve aktuelne vijesti o MRK Sloga Doboj
          </p>

          {/* PRETRAGA + FILTER */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            {/* PRETRAGA */}
            <input
              type="text"
              placeholder="Pretraži vijesti..."
              value={pretraga}
              onChange={(e) => setPretraga(e.target.value)}
              className="w-full md:w-72 border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-red-600 transition bg-white"
            />
            {/* KATEGORIJE */}
            <div className="flex flex-wrap gap-2">
              {kategorije.map((k) => (
                <button
                  key={k}
                  onClick={() => setAktivnaKat(k)}
                  className={`px-4 py-2 rounded-xl text-sm font-semibold transition ${
                    aktivnaKat === k
                      ? "bg-red-600 text-white"
                      : "bg-white text-gray-500 border border-gray-200 hover:border-red-600"
                  }`}
                >
                  {k}
                </button>
              ))}
            </div>
          </div>

          {filtrirane.length === 0 ? (
            <p className="text-center text-gray-400 py-20 text-lg">Nema vijesti za ovaj filter.</p>
          ) : (
            <>
              {/* GLAVNA VIJEST */}
              {glavnaVijest && (
                
                 <a href={glavnaVijest.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block mb-8 group"
                >
                  <div className="relative w-full h-64 md:h-96 rounded-2xl overflow-hidden shadow-xl">
                    <img
                      src={glavnaVijest.slika}
                      alt={glavnaVijest.naslov}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                    <div className="absolute bottom-0 left-0 p-6 md:p-8">
                      <span className={`text-xs font-bold px-3 py-1 rounded-full mb-3 inline-block ${boje[glavnaVijest.kategorija]}`}>
                        {glavnaVijest.kategorija}
                      </span>
                      <h2 className="text-white text-xl md:text-3xl font-extrabold leading-snug mb-2">
                        {glavnaVijest.naslov}
                      </h2>
                      <p className="text-white/70 text-sm hidden md:block mb-2">
                        {glavnaVijest.kratko}
                      </p>
                      <p className="text-white/50 text-xs">{glavnaVijest.datum} • Sport DC</p>
                    </div>
                  </div>
                </a>
              )}

              {/* GRID OSTALIH VIJESTI */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {ostale.map((vijest) => (
                  
                   <a key={vijest.id}
                    href={vijest.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden hover:shadow-xl hover:border-red-600 transition-all duration-300 flex flex-col"
                  >
                    {/* SLIKA */}
                    <div className="h-48 overflow-hidden">
                      <img
                        src={vijest.slika}
                        alt={vijest.naslov}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                      />
                    </div>
                    {/* SADRŽAJ */}
                    <div className="p-5 flex flex-col flex-1">
                      <div className="flex items-center justify-between mb-3">
                        <span className={`text-xs font-bold px-2 py-1 rounded-full ${boje[vijest.kategorija]}`}>
                          {vijest.kategorija}
                        </span>
                        <span className="text-xs text-gray-400">{vijest.datum}</span>
                      </div>
                      <h3 className="text-base font-bold text-black mb-2 leading-snug group-hover:text-red-600 transition">
                        {vijest.naslov}
                      </h3>
                      <p className="text-sm text-gray-500 flex-1 leading-relaxed">
                        {vijest.kratko}
                      </p>
                      <div className="mt-4 text-red-600 text-sm font-bold">
                        Čitaj više →
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </>
          )}

        </div>
      </div>
    </div>
  )
}

export default News