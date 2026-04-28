import React, { useState } from 'react'
import duca from "../assets/duca.jpg"
import { useSelector } from 'react-redux'



function NewsComponent() {
  const { vijesti, igracUtakmice } = useSelector((state) => state.news)
  const [aktivna, setAktivna] = useState(null)
  const [trenutna, setTrenutna] = useState(0)

  const sljedeća = () => setTrenutna((prev) => (prev + 1) % vijesti.slice(1).length)
  const prethodna = () => setTrenutna((prev) => (prev - 1 + vijesti.slice(1).length) % vijesti.slice(1).length)

  const sliderVijesti = vijesti.slice(1)
  const vijest = sliderVijesti[trenutna]

  return (
    <div className="w-full bg-gray-50 py-10 md:py-16 px-4">
      <div className="max-w-7xl mx-auto">

        {/* NASLOV */}
        <h2 className="text-2xl md:text-3xl font-extrabold text-center text-red-600 mb-8 tracking-wide uppercase">
          📰 Vijesti & Igrač Utakmice
        </h2>

        {/* GORNJI RED */}
        <div className="flex flex-col md:flex-row gap-6 mb-10">

          {/* POSLJEDNJA VIJEST */}
          <div className="flex-1 bg-white rounded-2xl shadow-lg border-4 border-red-600 overflow-hidden">
            <div className="bg-red-600 px-5 py-3 flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-white inline-block"></span>
              <span className="text-white font-bold text-sm uppercase tracking-widest">Najnovija vijest</span>
            </div>
            <div className="p-5 md:p-6">
              <p className="text-xs text-gray-400 mb-2">{vijesti[0].datum}</p>
              <h3 className="text-lg md:text-xl font-extrabold text-black mb-3 leading-snug">
                {vijesti[0].naslov}
              </h3>
              <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-4">
                {vijesti[0].sadrzaj}
              </p>
              
                <a href={vijesti[0].url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-red-600 text-white text-sm font-bold px-4 py-2 rounded-xl hover:bg-red-700 transition"
              >
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

        {/* SLIDER VIJESTI */}
        <div className="relative">

          {/* KARTICA */}
          <div className="bg-white rounded-2xl shadow-md border-2 border-gray-200 overflow-hidden min-h-[220px] flex flex-col transition-all duration-300">
            <div className="p-5 md:p-6 flex flex-col flex-1">
             
              <p className="text-xs text-red-500 font-semibold mb-1">{vijest.datum}</p>
              <h3 className="text-base md:text-lg font-bold text-black mb-3 leading-snug">
                {vijest.naslov}
              </h3>
              <p className="text-sm text-gray-500 flex-1 leading-relaxed">
                {aktivna === vijest.id ? vijest.sadrzaj : vijest.kratko}
              </p>
            </div>
            <div className="px-5 pb-4 flex justify-between items-center">
              <button
                className="text-red-600 text-sm font-bold hover:underline"
                onClick={() => setAktivna(aktivna === vijest.id ? null : vijest.id)}
              >
                {aktivna === vijest.id ? "Zatvori ↑" : "Čitaj više ↓"}
              </button>
              
                <a href={vijest.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-gray-400 hover:text-red-600 transition"
              >
                Sport DC →
              </a>
            </div>
          </div>

          {/* STRELICE + INDIKATORI */}
          <div className="flex items-center justify-between mt-5">

            {/* LIJEVA STRELICA */}
            <button
              onClick={prethodna}
              className="bg-red-600 text-white w-10 h-10 rounded-full flex items-center justify-center shadow hover:bg-red-700 transition text-lg font-bold"
            >
              ‹
            </button>

            {/* TAČKICE */}
            <div className="flex gap-2">
              {sliderVijesti.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setTrenutna(i); setAktivna(null) }}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    i === trenutna ? "bg-red-600 scale-125" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>

            {/* DESNA STRELICA */}
            <button
              onClick={sljedeća}
              className="bg-red-600 text-white w-10 h-10 rounded-full flex items-center justify-center shadow hover:bg-red-700 transition text-lg font-bold"
            >
              ›
            </button>

          </div>
        </div>

      </div>
    </div>
  )
}

export default NewsComponent