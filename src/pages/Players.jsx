import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchIgraci } from '../store/playersSlice'
import HeroPlayersComponent from "../components/HeroPlayersComponent"
import { FaShieldAlt } from 'react-icons/fa'

const sekcije = [
  { kljuc: "golmani", naziv: "Golmani", boja: "border-yellow-500", badge: "bg-yellow-500" },
  { kljuc: "krila", naziv: "Krila", boja: "border-blue-500", badge: "bg-blue-500" },
  { kljuc: "bekovi", naziv: "Bekovi", boja: "border-green-500", badge: "bg-green-500" },
  { kljuc: "pivoti", naziv: "Pivoti", boja: "border-purple-500", badge: "bg-purple-500" },
]

function IgracKartica({ igrac, boja, badge }) {
  return (
    <div
      className={`bg-white rounded-2xl shadow-md border-2 ${boja} hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden`}
    >
      {/* GORNJI DIO */}
      <div className="bg-red-600 flex items-center justify-center pt-6 pb-4 relative min-h-[180px]">
        <span className="text-white font-extrabold text-8xl opacity-10 absolute select-none">
          {igrac.br}
        </span>

        {igrac.slika ? (
          <img
            src={igrac.slika}
            alt={igrac.ime}
            className="w-32 h-32 object-cover rounded-full border-4 border-white shadow-xl z-10"
          />
        ) : (
          <div className="w-32 h-32 rounded-full border-4 border-white shadow-xl z-10 bg-red-700 flex items-center justify-center">
            <span className="text-white font-extrabold text-3xl">
              #{igrac.br}
            </span>
          </div>
        )}
      </div>

      {/* DONJI DIO */}
      <div className="p-4 text-center">
        <p className="text-gray-400 text-xl font-semibold mb-1">#{igrac.br}</p>

        <h3 className="font-extrabold text-black text-sm md:text-base leading-snug mb-2">
          {igrac.ime}
        </h3>

        <span
          className={`text-white text-xs font-bold px-3 py-1 rounded-full ${badge}`}
        >
          {igrac.pozicija}
        </span>
      </div>
    </div>
  )
}

function TrenerKartica({ trener }) {
  return (
    <div className="bg-white rounded-2xl border-2 border-red-600 shadow-md overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      <div className="bg-red-600 flex items-center justify-center py-6 min-h-[160px]">
        {trener.slika ? (
          <img
            src={trener.slika}
            alt={trener.ime}
            className="w-28 h-28 object-cover rounded-full border-4 border-white shadow-xl"
          />
        ) : (
          <div className="w-28 h-28 rounded-full border-4 border-white shadow-xl bg-red-700 flex items-center justify-center">
            <FaShieldAlt className="text-white" size={40} />
          </div>
        )}
      </div>

      <div className="p-4 text-center">
        <h3 className="font-extrabold text-black text-base mb-1">
          {trener.ime}
        </h3>

        <span className="text-red-600 text-sm font-semibold">
          {trener.pozicija}
        </span>
      </div>
    </div>
  )
}

function Players() {
  const dispatch = useDispatch()

  const {
    golmani,
    krila,
    bekovi,
    pivoti,
    treneri,
    loading,
    error,
  } = useSelector((state) => state.players)

  const [aktivna, setAktivna] = useState("sve")

  useEffect(() => {
    dispatch(fetchIgraci())
  }, [dispatch])

  const sviIgraci = [...golmani, ...krila, ...bekovi, ...pivoti]

  const filtrirani =
    aktivna === "sve"
      ? sviIgraci
      : aktivna === "golmani"
      ? golmani
      : aktivna === "krila"
      ? krila
      : aktivna === "bekovi"
      ? bekovi
      : aktivna === "pivoti"
      ? pivoti
      : []

  const getIgraciZaSekciju = (kljuc) =>
    kljuc === "golmani"
      ? golmani
      : kljuc === "krila"
      ? krila
      : kljuc === "bekovi"
      ? bekovi
      : pivoti

  return (
    <div className="w-full">
      <HeroPlayersComponent />

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
            Igrači
          </h1>

          <p className="text-center text-gray-400 mb-8 text-sm">
            Upoznajte tim MRK Sloga Doboj — sezona 2025/26
          </p>

          {/* LOADING */}
          {loading && (
            <div className="flex flex-col items-center py-20 gap-4">
              <div className="w-10 h-10 border-4 border-red-600 border-t-transparent rounded-full animate-spin" />
              <p className="text-gray-400 text-sm">Učitavanje igrača...</p>
            </div>
          )}

          {/* ERROR */}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl text-center mb-6">
              {error}
            </div>
          )}

          {!loading && !error && (
            <>
              {/* FILTERI */}
              <div className="flex flex-wrap justify-center gap-3 mb-10">
                {[
                  { kljuc: "sve", naziv: "Svi igrači" },
                  { kljuc: "golmani", naziv: "Golmani" },
                  { kljuc: "krila", naziv: "Krila" },
                  { kljuc: "bekovi", naziv: "Bekovi" },
                  { kljuc: "pivoti", naziv: "Pivoti" },
                  { kljuc: "treneri", naziv: "Stručni štab" },
                ].map((f) => (
                  <button
                    key={f.kljuc}
                    onClick={() => setAktivna(f.kljuc)}
                    className={`px-5 py-2 rounded-xl text-sm font-semibold transition ${
                      aktivna === f.kljuc
                        ? "bg-red-600 text-white shadow"
                        : "bg-white text-gray-500 border border-gray-200 hover:border-red-600"
                    }`}
                  >
                    {f.naziv}
                  </button>
                ))}
              </div>

              {/* SVE */}
              {aktivna === "sve" && (
                <>
                  {sekcije.map((s) => (
                    <div key={s.kljuc} className="mb-12">
                      <div className="flex items-center gap-3 mb-5">
                        <div
                          className={`w-1 h-8 rounded-full ${s.badge}`}
                        />

                        <h2 className="text-xl font-extrabold text-black uppercase tracking-wide">
                          {s.naziv}
                        </h2>

                        <span
                          className={`text-white text-xs font-bold px-2 py-1 rounded-full ${s.badge}`}
                        >
                          {getIgraciZaSekciju(s.kljuc).length}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                        {getIgraciZaSekciju(s.kljuc).map((igrac) => (
                          <IgracKartica
                            key={igrac.br}
                            igrac={igrac}
                            boja={s.boja}
                            badge={s.badge}
                          />
                        ))}
                      </div>
                    </div>
                  ))}

                  {/* TRENERI */}
                  <div className="mt-12">
                    <div className="flex items-center gap-3 mb-5">
                      <div className="w-1 h-8 rounded-full bg-red-600" />

                      <h2 className="text-xl font-extrabold text-black uppercase tracking-wide">
                        Stručni štab
                      </h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {treneri.map((trener, i) => (
                        <TrenerKartica key={i} trener={trener} />
                      ))}
                    </div>
                  </div>
                </>
              )}

              {/* TRENERI FILTER */}
              {aktivna === "treneri" && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {treneri.map((trener, i) => (
                    <TrenerKartica key={i} trener={trener} />
                  ))}
                </div>
              )}

              {/* OSTALE POZICIJE */}
              {aktivna !== "sve" && aktivna !== "treneri" && (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {filtrirani.map((igrac) => {
                    const sekcija =
                      sekcije.find((s) =>
                        getIgraciZaSekciju(s.kljuc).includes(igrac)
                      ) || sekcije[0]

                    return (
                      <IgracKartica
                        key={igrac.br}
                        igrac={igrac}
                        boja={sekcija.boja}
                        badge={sekcija.badge}
                      />
                    )
                  })}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Players