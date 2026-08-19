import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchGalerija } from '../store/gallerySlice'
import Hero2Component from "../components/Hero2Component"

function Galery() {
  const dispatch = useDispatch()
  const { slike, loading } = useSelector((state) => state.gallery)

  useEffect(() => {
    dispatch(fetchGalerija())
  }, [dispatch])

  return (
    <div>
      <Hero2Component/>

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
          <h1 className="text-3xl md:text-4xl font-extrabold text-center text-black uppercase tracking-wide mb-2 pt-10">
            Galerija
          </h1>
          <p className="text-center text-gray-400 mb-10 text-sm">
            Fotografije MRK Sloga Doboj
          </p>

          {loading ? (
            <div className="flex justify-center py-20">
              <div className="w-10 h-10 border-4 border-red-600 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : slike.length === 0 ? (
            <p className="text-center text-gray-400 py-20 text-lg">Galerija je trenutno prazna.</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {slike.map((s) => (
                <div key={s.id} className="rounded-2xl overflow-hidden shadow-md border border-gray-100 group">
                  <img
                    src={s.url}
                    alt={s.opis || 'galerija'}
                    className="w-full h-48 object-cover group-hover:scale-105 transition duration-300"
                  />
                  {s.opis && (
                    <p className="text-xs text-gray-500 p-2 truncate">{s.opis}</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Galery
