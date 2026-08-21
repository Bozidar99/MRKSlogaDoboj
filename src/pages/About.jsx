import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchIstorija } from '../store/istorijaSlice'
import Hero2Component from "../components/Hero2Component"
import { GiTrophy, GiChampions, GiLaurelCrown } from 'react-icons/gi'
import { FaUsers, FaCalendarAlt, FaMedal, FaHeart } from 'react-icons/fa'

const statistika = [
  { broj: "50+", naziv: "Godina tradicije", ikona: <FaCalendarAlt size={28} /> },
  { broj: "10+", naziv: "Trofeja", ikona: <FaMedal size={28} /> },
  { broj: "100+", naziv: "Igrača", ikona: <FaUsers size={28} /> },
  { broj: "1000+", naziv: "Navijača", ikona: <FaHeart size={28} /> },
]

const trofiji = [
  { naziv: "Premijer liga BiH", broj: 1, ikona: <GiChampions size={50} className="text-white" /> },
  { naziv: "Kup BiH", broj: 2, ikona: <GiTrophy size={50} className="text-white" /> },
  { naziv: "Kup RS", broj: 7, ikona: <GiLaurelCrown size={50} className="text-white" /> },
]

// Najveći istorijski uspesi kluba — fiksna vremenska linija
const najveciUspesi = [
  { godina: "1959", naslov: "Osnivanje kluba", opis: "RK Sloga Doboj je osnovan i postaje jedan od prvih sportskih kolektiva grada." },
  { godina: "1972", naslov: "Klub počinje da nastupa pod imenom Sloga", opis: "Od ove godine klub nosi ime pod kojim je poznat i danas." },
  { godina: "1980–1991", naslov: "Prva liga bivše Jugoslavije", opis: "Sloga je bila redovan učesnik najvišeg ranga jugoslovenskog rukometa." },
  { godina: "1983", naslov: "Finale Kupa Jugoslavije", opis: "Klub je stigao do finala, gdje je poražen od Metaloplastike iz Šapca." },
  { godina: "1984", naslov: "Finale Kupa pobjednika kupova", opis: "Najveći evropski uspjeh kluba — finale protiv FC Barcelone." },
  { godina: "2005 / 2006", naslov: "Dvije titule Kupa BiH", opis: "Sloga osvaja Kup Bosne i Hercegovine dvije godine zaredom." },
  { godina: "2012", naslov: "Prvak Premijer lige BiH", opis: "Klub osvaja titulu prvaka države, potvrđujući status vodećeg kluba u zemlji." },
  { godina: "2002 — 2025", naslov: "7 titula Kupa Republike Srpske", opis: "Sloga je u ovom periodu čak 7 puta osvojila Kup Republike Srpske, čime je potvrdila status jednog od najuspješnijih klubova u regionu." },
]

function About() {
  const dispatch = useDispatch()
  const { istorija, loading, error } = useSelector((state) => state.istorija)

  const [aktivnaId, setAktivnaId] = useState(null)
  const [aktivnaGodina, setAktivnaGodina] = useState("Sve")

  useEffect(() => {
    dispatch(fetchIstorija())
  }, [dispatch])

  // GODINE
  const godine = [
    "Sve",
    ...new Set(istorija.map((item) => item.godina))
  ]

  // FILTRIRANI ČLANCI
  const filtriranaIstorija =
    aktivnaGodina === "Sve"
      ? istorija
      : istorija.filter(
          (item) => item.godina === aktivnaGodina
        )

  return (
    <div className="w-full">
      <Hero2Component />

      {/* DEKORATIVNA LINIJA */}
      <div className="w-full bg-white flex items-center justify-center py-6 gap-4">
        <div className="h-[2px] w-24 bg-gray-200 rounded-full" />
        <div className="w-3 h-3 rounded-full bg-red-600" />
        <div className="h-[2px] w-48 bg-red-600 rounded-full" />
        <div className="w-3 h-3 rounded-full bg-red-600" />
        <div className="h-[2px] w-24 bg-gray-200 rounded-full" />
      </div>

      {/* O NAMA SEKCIJA */}
      <div className="w-full bg-white py-16 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-extrabold text-black uppercase tracking-wide mb-4">
            MRK Sloga Doboj
          </h1>

          <div className="w-16 h-1 bg-red-600 mx-auto mb-6 rounded-full" />

          <p className="text-gray-600 text-base md:text-lg leading-relaxed max-w-3xl mx-auto">
            Rukometni klub Sloga Doboj je sportski kolektiv iz Doboja u Bosni i Hercegovini, osnovan 1959. godine, sa dugom i bogatom tradicijom u rukometu i jedan od najvažnijih sportskih simbola grada.
            Danas RK Sloga Doboj nastupa u Premijer ligi BiH, nastavlja da njeguje tradiciju, razvija mlade igrače i predstavlja grad Doboj na domaćoj i međunarodnoj sceni — prepoznat po borbenosti, disciplini i snažnoj podršci svojih navijača.
          </p>
        </div>
      </div>

      {/* NAJVEĆI USPESI — VREMENSKA LINIJA */}
      <div className="w-full bg-gray-50 py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-black uppercase tracking-wide mb-4">
              Najveći uspjesi
            </h2>
            <div className="w-16 h-1 bg-red-600 mx-auto rounded-full" />
          </div>

          <div className="relative pl-8 md:pl-0">
            {/* Vertikalna linija */}
            <div className="absolute left-3 md:left-1/2 top-0 bottom-0 w-0.5 bg-red-200 md:-translate-x-1/2" />

            <div className="flex flex-col gap-8">
              {najveciUspesi.map((dogadjaj, i) => (
                <div
                  key={i}
                  className={`relative md:flex md:items-center md:gap-8 ${
                    i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Tačka na liniji */}
                  <div className="absolute left-3 md:left-1/2 top-1.5 w-3 h-3 rounded-full bg-red-600 border-2 border-white shadow -translate-x-1/2 z-10" />

                  {/* Kartica */}
                  <div className="md:w-1/2">
                    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
                      <span className="inline-block bg-red-600 text-white text-xs font-extrabold px-3 py-1 rounded-lg mb-2">
                        {dogadjaj.godina}
                      </span>
                      <h3 className="font-bold text-black text-base mb-1">{dogadjaj.naslov}</h3>
                      <p className="text-gray-500 text-sm leading-relaxed">{dogadjaj.opis}</p>
                    </div>
                  </div>

                  {/* Prazan prostor sa druge strane (samo desktop) */}
                  <div className="hidden md:block md:w-1/2" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      
      {/* TROFIJI */}
      <div className="w-full bg-red-600 py-14 px-4">
        <h2 className="text-center text-white text-2xl md:text-3xl font-extrabold uppercase tracking-widest mb-10">
          Naši Trofiji
        </h2>

        <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6">
          {trofiji.map((t, i) => (
            <div
              key={i}
              className="flex flex-col items-center bg-white/10 border-2 border-white/30 rounded-2xl py-8 px-4 shadow-lg hover:bg-white/20 transition"
            >
              <div className="mb-4">{t.ikona}</div>

              <h3 className="text-white font-extrabold text-5xl mb-2">
                {t.broj}x
              </h3>

              <p className="text-white/80 text-sm font-semibold uppercase tracking-wide text-center">
                {t.naziv}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ISTORIJA KLUBA */}
      <div className="w-full bg-white py-16 px-4">
        <div className="max-w-4xl mx-auto">

          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-black uppercase tracking-wide mb-4">
              Novinski arhiv
            </h2>

            <div className="w-16 h-1 bg-red-600 mx-auto rounded-full" />
          </div>

          {/* FILTER GODINA */}
          {!loading && !error && (
            <div className="flex flex-wrap gap-3 justify-center mb-10">
              {godine.map((godina) => (
                <button
                  key={godina}
                  onClick={() => setAktivnaGodina(godina)}
                  className={`px-4 py-2 rounded-xl font-bold text-sm transition-all duration-300
                  ${
                    aktivnaGodina === godina
                      ? "bg-red-600 text-white shadow-lg"
                      : "bg-gray-100 text-gray-700 hover:bg-red-100"
                  }`}
                >
                  {godina}
                </button>
              ))}
            </div>
          )}

          {/* LOADING */}
          {loading && (
            <div className="flex flex-col items-center py-12 gap-4">
              <div className="w-10 h-10 border-4 border-red-600 border-t-transparent rounded-full animate-spin" />

              <p className="text-gray-400 text-sm">
                Učitavanje istorije...
              </p>
            </div>
          )}

          {/* ERROR */}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl text-center">
              {error}
            </div>
          )}

          {/* ČLANCI */}
          {!loading && !error && (
            <div className="flex flex-col gap-4">

              {filtriranaIstorija.map((item) => (
                <div
                  key={item.id}
                  className="bg-gray-50 rounded-xl border border-gray-200 hover:border-red-600 transition-all duration-300 cursor-pointer"
                  onClick={() =>
                    setAktivnaId(
                      aktivnaId === item.id ? null : item.id
                    )
                  }
                >

                  {/* HEADER */}
                  <div className="flex items-center justify-between px-4 py-3">

                    <div className="flex items-center gap-3">
                      <span className="bg-red-600 text-white text-xs font-extrabold px-2 py-1 rounded-lg">
                        {item.godina}
                      </span>

                      <h3 className="font-bold text-black text-sm md:text-base">
                        {item.naslov}
                      </h3>
                    </div>

                    <span className="text-red-600 font-bold text-lg ml-3 flex-shrink-0">
                      {aktivnaId === item.id ? "↑" : "↓"}
                    </span>

                  </div>

                  {/* EXPANDOVANI TEKST */}
                  {aktivnaId === item.id && (
                    <div className="px-4 pb-4 border-t border-gray-200">

                      <p className="text-gray-500 text-sm italic pt-3 mb-3">
                        {item.kratko}
                      </p>

                      <p className="text-gray-700 text-sm leading-relaxed">
                        {item.tekst}
                      </p>

                    </div>
                  )}

                </div>
              ))}

            </div>
          )}

        </div>
        
      </div>
      {/* STATISTIKA */}
      <div className="w-full bg-gray-50 py-12 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {statistika.map((s, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl shadow-md border-2 border-gray-100 hover:border-red-600 hover:shadow-xl transition-all duration-300 p-6 flex flex-col items-center text-center"
            >
              <div className="bg-red-600 text-white p-3 rounded-xl mb-3">
                {s.ikona}
              </div>

              <h3 className="text-3xl font-extrabold text-black mb-1">
                {s.broj}
              </h3>

              <p className="text-gray-500 text-sm">
                {s.naziv}
              </p>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}

export default About
