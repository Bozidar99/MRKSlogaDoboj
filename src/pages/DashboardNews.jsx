import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchVijesti, dodajVijest, obrisiVijest, urediVijest } from '../store/newsSlice'
import { FaTrash, FaEdit, FaPlus, FaTimes } from 'react-icons/fa'

const kategorije = ["Rezultat", "Pobjeda", "Derbi", "Intervju", "Kup", "Omladinska"]

const initialForma = {
  naslov:    "",
  kratko:    "",
  sadrzaj:   "",
  datum:     "",
  kategorija:"Rezultat",
  url:       "",
  slika:     "",
}

function DashboardNews() {
  const dispatch = useDispatch()
  const { vijesti, loading, saving } = useSelector((state) => state.news)
  const [showForma, setShowForma]   = useState(false)
  const [editId, setEditId]         = useState(null)
  const [forma, setForma]           = useState(initialForma)

  useEffect(() => {
    dispatch(fetchVijesti())
  }, [dispatch])

  function handleDodaj(e) {
    e.preventDefault()
    if (editId) {
      dispatch(urediVijest({ ...forma, id: editId }))
      setEditId(null)
    } else {
      dispatch(dodajVijest(forma))
    }
    setForma(initialForma)
    setShowForma(false)
  }

  function handleEdit(vijest) {
    setForma({
      naslov:     vijest.naslov,
      kratko:     vijest.kratko,
      sadrzaj:    vijest.sadrzaj,
      datum:      vijest.datum,
      kategorija: vijest.kategorija,
      url:        vijest.url,
      slika:      vijest.slika || "",
    })
    setEditId(vijest.id)
    setShowForma(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function handleObrisi(id) {
    if (window.confirm("Da li ste sigurni da želite obrisati vijest?")) {
      dispatch(obrisiVijest(id))
    }
  }

  function handleOtkazi() {
    setForma(initialForma)
    setEditId(null)
    setShowForma(false)
  }

  const boje = {
    "Rezultat":   "bg-blue-100 text-blue-700",
    "Pobjeda":    "bg-green-100 text-green-700",
    "Derbi":      "bg-red-100 text-red-700",
    "Intervju":   "bg-purple-100 text-purple-700",
    "Kup":        "bg-yellow-100 text-yellow-700",
    "Omladinska": "bg-orange-100 text-orange-700",
  }

  return (
    <div>
      {/* HEADER */}
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-2xl font-extrabold text-black">Vijesti</h2>
        <button
          onClick={() => { setShowForma(!showForma); setEditId(null); setForma(initialForma) }}
          className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-red-700 transition"
        >
          {showForma ? <FaTimes size={12} /> : <FaPlus size={12} />}
          {showForma ? "Zatvori" : "Dodaj vijest"}
        </button>
      </div>
      <p className="text-gray-400 text-sm mb-6">
        Ukupno vijesti: <span className="font-bold text-black">{vijesti.length}</span>
      </p>

      {/* FORMA */}
      {showForma && (
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 mb-6">
          <h3 className="font-extrabold text-black mb-4">
            {editId ? "Uredi vijest" : "Nova vijest"}
          </h3>
          <form onSubmit={handleDodaj} className="flex flex-col gap-4">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-gray-500 mb-1 block">Naslov</label>
                <input
                  required
                  type="text"
                  placeholder="Naslov vijesti..."
                  value={forma.naslov}
                  onChange={(e) => setForma({ ...forma, naslov: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-red-600"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 mb-1 block">Kratki opis</label>
                <input
                  required
                  type="text"
                  placeholder="Kratki opis za preview..."
                  value={forma.kratko}
                  onChange={(e) => setForma({ ...forma, kratko: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-red-600"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-500 mb-1 block">Puni tekst</label>
              <textarea
                required
                rows={4}
                placeholder="Puni tekst vijesti..."
                value={forma.sadrzaj}
                onChange={(e) => setForma({ ...forma, sadrzaj: e.target.value })}
                className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-red-600 resize-none"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-xs font-semibold text-gray-500 mb-1 block">Datum</label>
                <input
                  required
                  type="date"
                  value={forma.datum ? forma.datum.split('.').reverse().join('-') : ""}
                  onChange={(e) => {
                    const d = new Date(e.target.value)
                    const formatted = `${String(d.getDate()).padStart(2,'0')}.${String(d.getMonth()+1).padStart(2,'0')}.${d.getFullYear()}`
                    setForma({ ...forma, datum: formatted })
                  }}
                  className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-red-600"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 mb-1 block">Kategorija</label>
                <select
                  value={forma.kategorija}
                  onChange={(e) => setForma({ ...forma, kategorija: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-red-600"
                >
                  {kategorije.map((k) => (
                    <option key={k} value={k}>{k}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 mb-1 block">URL (Sport DC)</label>
                <input
                  type="text"
                  placeholder="https://sportdc.net/..."
                  value={forma.url}
                  onChange={(e) => setForma({ ...forma, url: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-red-600"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-500 mb-1 block">URL slike</label>
              <input
                type="text"
                placeholder="https://sportdc.net/img/..."
                value={forma.slika}
                onChange={(e) => setForma({ ...forma, slika: e.target.value })}
                className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-red-600"
              />
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                disabled={saving}
                className="bg-red-600 text-white px-6 py-2 rounded-xl text-sm font-bold hover:bg-red-700 transition disabled:opacity-50"
              >
                {saving ? "Čuvanje..." : (editId ? "Sačuvaj izmjene" : "Objavi vijest")}
              </button>
              <button
                type="button"
                onClick={handleOtkazi}
                className="bg-gray-100 text-gray-600 px-6 py-2 rounded-xl text-sm font-bold hover:bg-gray-200 transition"
              >
                Otkaži
              </button>
            </div>

          </form>
        </div>
      )}

      {/* LISTA VIJESTI */}
      <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="flex flex-col items-center py-12 gap-4">
            <div className="w-8 h-8 border-4 border-red-600 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 text-gray-400 text-xs uppercase">
              <th className="px-6 py-3 text-left">Naslov</th>
              <th className="px-6 py-3 text-left">Kategorija</th>
              <th className="px-6 py-3 text-left">Datum</th>
              <th className="px-6 py-3 text-left">Akcije</th>
            </tr>
          </thead>
          <tbody>
            {vijesti.map((vijest) => (
              <tr key={vijest.id} className="border-t border-gray-100 hover:bg-gray-50 transition">
                <td className="px-6 py-3 font-semibold text-black max-w-xs truncate">
                  {vijest.naslov}
                </td>
                <td className="px-6 py-3">
                  <span className={`text-xs font-bold px-2 py-1 rounded-full ${boje[vijest.kategorija] || 'bg-gray-100 text-gray-700'}`}>
                    {vijest.kategorija}
                  </span>
                </td>
                <td className="px-6 py-3 text-gray-400">{vijest.datum}</td>
                <td className="px-6 py-3">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleEdit(vijest)}
                      className="text-blue-500 hover:text-blue-700 transition"
                    >
                      <FaEdit size={14} />
                    </button>
                    <button
                      onClick={() => handleObrisi(vijest.id)}
                      className="text-red-500 hover:text-red-700 transition"
                    >
                      <FaTrash size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        )}
      </div>

    </div>
  )
}

export default DashboardNews
