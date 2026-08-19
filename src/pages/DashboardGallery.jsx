import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchGalerija, dodajSliku, obrisiSliku } from '../store/gallerySlice'
import { FaTrash, FaUpload } from 'react-icons/fa'

function DashboardGallery() {
  const dispatch = useDispatch()
  const { slike, loading, uploading, error } = useSelector((state) => state.gallery)
  const [file, setFile] = useState(null)
  const [opis, setOpis] = useState('')

  useEffect(() => {
    dispatch(fetchGalerija())
  }, [dispatch])

  function handleUpload(e) {
    e.preventDefault()
    if (!file) return
    dispatch(dodajSliku({ file, opis })).then(() => {
      setFile(null)
      setOpis('')
      e.target.reset()
    })
  }

  function handleObrisi(id) {
    if (window.confirm('Da li ste sigurni da želite obrisati sliku?')) {
      dispatch(obrisiSliku(id))
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-extrabold text-black mb-2">Galerija</h2>
      <p className="text-gray-400 text-sm mb-6">
        Ukupno slika: <span className="font-bold text-black">{slike.length}</span>
      </p>

      {/* FORMA ZA UPLOAD */}
      <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 mb-8">
        <h3 className="font-extrabold text-black mb-4">Dodaj novu sliku</h3>
        <form onSubmit={handleUpload} className="flex flex-col sm:flex-row gap-4 items-start sm:items-end">
          <div className="flex-1 w-full">
            <label className="text-xs font-semibold text-gray-500 mb-1 block">Slika</label>
            <input
              type="file"
              accept="image/*"
              required
              onChange={(e) => setFile(e.target.files[0])}
              className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm"
            />
          </div>
          <div className="flex-1 w-full">
            <label className="text-xs font-semibold text-gray-500 mb-1 block">Opis (opciono)</label>
            <input
              type="text"
              placeholder="npr. Utakmica protiv Borca"
              value={opis}
              onChange={(e) => setOpis(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-red-600"
            />
          </div>
          <button
            type="submit"
            disabled={uploading}
            className="flex items-center gap-2 bg-red-600 text-white px-6 py-2 rounded-xl text-sm font-bold hover:bg-red-700 transition disabled:opacity-50 whitespace-nowrap"
          >
            <FaUpload size={12} />
            {uploading ? 'Otpremanje...' : 'Otpremi'}
          </button>
        </form>
        {error && (
          <p className="text-red-600 text-sm mt-3">{error}</p>
        )}
      </div>

      {/* GRID SLIKA */}
      {loading ? (
        <div className="flex flex-col items-center py-12 gap-4">
          <div className="w-8 h-8 border-4 border-red-600 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : slike.length === 0 ? (
        <p className="text-gray-400 text-center py-12">Još uvijek nema slika u galeriji.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {slike.map((s) => (
            <div key={s.id} className="relative bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden group">
              <img src={s.url} alt={s.opis || 'galerija'} className="w-full h-40 object-cover" />
              <div className="p-3">
                <p className="text-xs text-gray-500 truncate">{s.opis || '—'}</p>
              </div>
              <button
                onClick={() => handleObrisi(s.id)}
                className="absolute top-2 right-2 bg-black/60 hover:bg-red-600 text-white p-2 rounded-lg transition opacity-0 group-hover:opacity-100"
              >
                <FaTrash size={12} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default DashboardGallery
