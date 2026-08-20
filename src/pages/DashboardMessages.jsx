import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchPoruke, oznaciProcitano, obrisiPoruku } from '../store/messagesSlice'
import { FaTrash, FaEnvelopeOpen, FaEnvelope } from 'react-icons/fa'

function DashboardMessages() {
  const dispatch = useDispatch()
  const { poruke, loading } = useSelector((state) => state.messages)

  useEffect(() => {
    dispatch(fetchPoruke())
  }, [dispatch])

  function handleObrisi(id) {
    if (window.confirm('Da li ste sigurni da želite obrisati poruku?')) {
      dispatch(obrisiPoruku(id))
    }
  }

  const nepromocitanih = poruke.filter(p => !p.procitano).length

  return (
    <div>
      <h2 className="text-2xl font-extrabold text-black mb-2">Poruke</h2>
      <p className="text-gray-400 text-sm mb-6">
        Ukupno poruka: <span className="font-bold text-black">{poruke.length}</span>
        {nepromocitanih > 0 && (
          <span className="ml-3 bg-red-100 text-red-600 text-xs font-bold px-2 py-1 rounded-full">
            {nepromocitanih} nepročitano
          </span>
        )}
      </p>

      {loading ? (
        <div className="flex flex-col items-center py-12 gap-4">
          <div className="w-8 h-8 border-4 border-red-600 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : poruke.length === 0 ? (
        <p className="text-gray-400 text-center py-12">Još uvijek nema poruka.</p>
      ) : (
        <div className="flex flex-col gap-3">
          {poruke.map((p) => (
            <div
              key={p.id}
              className={`bg-white rounded-2xl shadow-md border p-5 ${p.procitano ? 'border-gray-100' : 'border-red-300'}`}
            >
              <div className="flex items-start justify-between gap-4 mb-2">
                <div>
                  <p className="font-bold text-black">{p.ime}</p>
                  <a href={`mailto:${p.email}`} className="text-red-600 text-sm hover:underline">{p.email}</a>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                  <span className="text-xs text-gray-400">
                    {new Date(p.created_at).toLocaleDateString('sr-RS')}
                  </span>
                  {!p.procitano && (
                    <button
                      onClick={() => dispatch(oznaciProcitano(p.id))}
                      title="Označi kao pročitano"
                      className="text-blue-500 hover:text-blue-700 transition"
                    >
                      <FaEnvelope size={14} />
                    </button>
                  )}
                  {p.procitano && (
                    <FaEnvelopeOpen size={14} className="text-gray-300" />
                  )}
                  <button
                    onClick={() => handleObrisi(p.id)}
                    className="text-red-500 hover:text-red-700 transition"
                  >
                    <FaTrash size={14} />
                  </button>
                </div>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">{p.poruka}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default DashboardMessages
