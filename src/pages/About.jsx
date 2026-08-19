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
  { naziv: "Kup BiH", broj: 3, ikona: <GiTrophy size={50} className="text-white" /> },
  { naziv: "Kup RS", broj: 7, ikona: <GiLaurelCrown size={50} className="text-white" /> },
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
            Rukometni klub Sloga Doboj je sportski kolektiv iz Doboja u Bosni i Hercegovini, sa dugom i bogatom tradicijom u rukometu. Klub je osnovan 1959. godine i od tada predstavlja jedan od najvažnijih sportskih simbola grada.
            Tokom svoje istorije, klub je mijenjao naziv u ranim godinama, da bi od 1972. godine nastupao pod imenom Sloga. Sloga je kroz decenije bila redovan učesnik najviših rangova takmičenja, uključujući i Prvu ligu bivše Jugoslavije, gdje je igrala od 1980. do 1991. godine.
            Jedan od najvećih uspjeha kluba bio je plasman u finale Kupa Jugoslavije 1983. godine, gdje je poražen od Metaloplastike Šabac. Već naredne sezone klub je ostvario još jedan veliki evropski uspjeh – finale Kupa pobjednika kupova 1984. godine, gdje je izgubio od FC Barcelona.
            U novijoj istoriji, Sloga je osvojila Premijer ligu BiH 2012. godine, kao i Kup Bosne i Hercegovine 2005. i 2006. godine, čime je potvrdila status jednog od vodećih rukometnih klubova u zemlji.
            Danas RK Sloga Doboj nastavlja da njeguje tradiciju, razvija mlade igrače i predstavlja grad Doboj na domaćoj i međunarodnoj sceni. Klub je prepoznat po borbenosti, disciplini i snažnoj podršci svojih navijača.
          </p>
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
              Istorija kluba
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
