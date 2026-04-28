import React, { useState } from 'react'
import { useSelector } from 'react-redux'


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
  const { vijesti } = useSelector((state) => state.news)
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
            <input
              type="text"
              placeholder="Pretraži vijesti..."
              value={pretraga}
              onChange={(e) => setPretraga(e.target.value)}
              className="w-full md:w-72 border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-red-600 transition bg-white"
            />
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
                      <span className={`text-xs font-bold px-3 py-1 rounded-full mb-3 inline-block ${boje[glavnaVijest.kategorija] || 'bg-gray-100 text-gray-700'}`}>
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
                  
                  <a  key={vijest.id}
                    href={vijest.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden hover:shadow-xl hover:border-red-600 transition-all duration-300 flex flex-col"
                  >
                    <div className="h-48 overflow-hidden">
                      <img
                        src={vijest.slika}
                        alt={vijest.naslov}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                      />
                    </div>
                    <div className="p-5 flex flex-col flex-1">
                      <div className="flex items-center justify-between mb-3">
                        <span className={`text-xs font-bold px-2 py-1 rounded-full ${boje[vijest.kategorija] || 'bg-gray-100 text-gray-700'}`}>
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