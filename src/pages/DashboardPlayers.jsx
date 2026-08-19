import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchIgraci, obrisiIgraca, dodajIgraca } from '../store/playersSlice'
import { FaTrash, FaPlus } from 'react-icons/fa'

const sekcije = [
  { kljuc: "golmani", naziv: "Golmani", badge: "bg-yellow-500" },
  { kljuc: "krila",   naziv: "Krila",   badge: "bg-blue-500"   },
  { kljuc: "bekovi",  naziv: "Bekovi",  badge: "bg-green-500"  },
  { kljuc: "pivoti",  naziv: "Pivoti",  badge: "bg-purple-500" },
]

const initialForma = { ime: "", br: "", pozicija: "", kljuc: "golmani" }

function DashboardPlayers() {
  const dispatch = useDispatch()
  const { golmani, krila, bekovi, pivoti, treneri, loading, saving } = useSelector((state) => state.players)
  const [forma, setForma] = useState(initialForma)
  const [showForma, setShowForma] = useState(false)

  useEffect(() => {
    dispatch(fetchIgraci())
  }, [dispatch])

  const getIgraci = (kljuc) =>
    kljuc === "golmani" ? golmani :
    kljuc === "krila"   ? krila   :
    kljuc === "bekovi"  ? bekovi  : pivoti

  function handleDodaj(e) {
    e.preventDefault()
    dispatch(dodajIgraca({
      kljuc: forma.kljuc,
      igrac: { ime: forma.ime, br: Number(forma.br), pozicija: forma.pozicija }
    }))
    setForma(initialForma)
    setShowForma(false)
  }

  function handleObrisi(kljuc, id) {
    if (window.confirm("Da li ste sigurni da želite obrisati igrača?")) {
      dispatch(obrisiIgraca({ kljuc, id }))
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-2xl font-extrabold text-black">Igrači</h2>
        <button
          onClick={() => setShowForma(!showForma)}
          className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-red-700 transition"
        >
          <FaPlus size={12} />
          Dodaj igrača
        </button>
      </div>
      <p className="text-gray-400 text-sm mb-6">Pregled svih igrača MRK Sloga Doboj</p>

      {/* FORMA ZA DODAVANJE */}
      {showForma && (
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 mb-6">
          <h3 className="font-extrabold text-black mb-4">Novi igrač</h3>
          <form onSubmit={handleDodaj} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="text-xs font-semibold text-gray-500 mb-1 block">Ime i prezime</label>
              <input
                required
                type="text"
                placeholder="Ime igrača..."
                value={forma.ime}
                onChange={(e) => setForma({ ...forma, ime: e.target.value })}
                className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-red-600"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-500 mb-1 block">Broj dresa</label>
              <input
                required
                type="number"
                placeholder="Br. dresa..."
                value={forma.br}
                onChange={(e) => setForma({ ...forma, br: e.target.value })}
                className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-red-600"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-500 mb-1 block">Pozicija</label>
              <input
                required
                type="text"
                placeholder="Pozicija..."
                value={forma.pozicija}
                onChange={(e) => setForma({ ...forma, pozicija: e.target.value })}
                className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-red-600"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-500 mb-1 block">Kategorija</label>
              <select
                value={forma.kljuc}
                onChange={(e) => setForma({ ...forma, kljuc: e.target.value })}
                className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-red-600"
              >
                {sekcije.map((s) => (
                  <option key={s.kljuc} value={s.kljuc}>{s.naziv}</option>
                ))}
              </select>
            </div>
            <div className="sm:col-span-2 lg:col-span-4 flex gap-3">
              <button
                type="submit"
                disabled={saving}
                className="bg-red-600 text-white px-6 py-2 rounded-xl text-sm font-bold hover:bg-red-700 transition disabled:opacity-50"
              >
                {saving ? "Čuvanje..." : "Sačuvaj"}
              </button>
              <button
                type="button"
                onClick={() => setShowForma(false)}
                className="bg-gray-100 text-gray-600 px-6 py-2 rounded-xl text-sm font-bold hover:bg-gray-200 transition"
              >
                Otkaži
              </button>
            </div>
          </form>
        </div>
      )}

      {loading ? (
        <div className="flex flex-col items-center py-12 gap-4">
          <div className="w-8 h-8 border-4 border-red-600 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
      <>
      {/* TABELE PO SEKCIJAMA */}
      {sekcije.map((s) => (
        <div key={s.kljuc} className="bg-white rounded-2xl shadow-md border border-gray-100 mb-6 overflow-hidden">
          <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-100">
            <span className={`text-white text-xs font-bold px-3 py-1 rounded-full ${s.badge}`}>
              {s.naziv}
            </span>
            <span className="text-gray-400 text-sm">{getIgraci(s.kljuc).length} igrača</span>
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-gray-400 text-xs uppercase">
                <th className="px-6 py-3 text-left">Br.</th>
                <th className="px-6 py-3 text-left">Ime</th>
                <th className="px-6 py-3 text-left">Pozicija</th>
                <th className="px-6 py-3 text-left">Obriši</th>
              </tr>
            </thead>
            <tbody>
              {getIgraci(s.kljuc).map((igrac) => (
                <tr key={igrac.id} className="border-t border-gray-100 hover:bg-gray-50 transition">
                  <td className="px-6 py-3 font-extrabold text-red-600">#{igrac.br}</td>
                  <td className="px-6 py-3 font-semibold text-black">{igrac.ime}</td>
                  <td className="px-6 py-3 text-gray-400">{igrac.pozicija}</td>
                  <td className="px-6 py-3">
                    <button
                      onClick={() => handleObrisi(s.kljuc, igrac.id)}
                      className="text-red-500 hover:text-red-700 transition"
                    >
                      <FaTrash size={14} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}

      {/* TRENERI */}
      <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
        <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-100">
          <span className="text-white text-xs font-bold px-3 py-1 rounded-full bg-red-600">
            Stručni štab
          </span>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 text-gray-400 text-xs uppercase">
              <th className="px-6 py-3 text-left">Ime</th>
              <th className="px-6 py-3 text-left">Uloga</th>
            </tr>
          </thead>
          <tbody>
            {treneri.map((trener) => (
              <tr key={trener.id} className="border-t border-gray-100 hover:bg-gray-50 transition">
                <td className="px-6 py-3 font-semibold text-black">{trener.ime}</td>
                <td className="px-6 py-3 text-gray-400">{trener.pozicija}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      </>
      )}

    </div>
  )
}

export default DashboardPlayers
