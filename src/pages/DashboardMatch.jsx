import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchMatchData, postaviSljedecu, postaviPrethodnu, sacuvajTabelu } from '../store/matchSlice'
import { FaSave } from 'react-icons/fa'

function DashboardMatch() {
  const dispatch = useDispatch()
  const { sljedeca, prethodna, tabela, loading } = useSelector((state) => state.match)

  const [formaSljedeca, setFormaSljedeca] = useState(null)
  const [formaPrethodna, setFormaPrethodna] = useState(null)
  const [formaTabela, setFormaTabela] = useState([])

  useEffect(() => {
    dispatch(fetchMatchData())
  }, [dispatch])

  useEffect(() => { if (sljedeca) setFormaSljedeca(sljedeca) }, [sljedeca])
  useEffect(() => { if (prethodna) setFormaPrethodna(prethodna) }, [prethodna])
  useEffect(() => { if (tabela.length) setFormaTabela(tabela) }, [tabela])

  function handleSljedecaSubmit(e) {
    e.preventDefault()
    const { id, tip, created_at, ...rest } = formaSljedeca
    dispatch(postaviSljedecu(rest))
  }

  function handlePrethodnaSubmit(e) {
    e.preventDefault()
    const { id, tip, created_at, ...rest } = formaPrethodna
    dispatch(postaviPrethodnu(rest))
  }

  function handleTabelaChange(index, polje, vrijednost) {
    const kopija = [...formaTabela]
    kopija[index] = { ...kopija[index], [polje]: vrijednost }
    setFormaTabela(kopija)
  }

  function handleTabelaSave() {
    dispatch(sacuvajTabelu(formaTabela))
  }

  if (loading || !formaSljedeca || !formaPrethodna) {
    return (
      <div className="flex flex-col items-center py-20 gap-4">
        <div className="w-10 h-10 border-4 border-red-600 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div>
      <h2 className="text-2xl font-extrabold text-black mb-2">Utakmice i tabela</h2>
      <p className="text-gray-400 text-sm mb-6">Upravljaj podacima koji se prikazuju na početnoj strani</p>

      <div className="grid md:grid-cols-2 gap-6 mb-8">

        {/* SLJEDEĆA UTAKMICA */}
        <form onSubmit={handleSljedecaSubmit} className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
          <h3 className="font-extrabold text-black mb-4">Sljedeća utakmica</h3>
          <div className="grid grid-cols-2 gap-3 mb-3">
            <input placeholder="Domaćin" value={formaSljedeca.domacin || ''} onChange={(e) => setFormaSljedeca({ ...formaSljedeca, domacin: e.target.value })} className="border border-gray-200 rounded-xl px-3 py-2 text-sm" />
            <input placeholder="Gost" value={formaSljedeca.gost || ''} onChange={(e) => setFormaSljedeca({ ...formaSljedeca, gost: e.target.value })} className="border border-gray-200 rounded-xl px-3 py-2 text-sm" />
          </div>
          <div className="grid grid-cols-2 gap-3 mb-4">
            <input type="text" placeholder="DD.MM.GGGG" value={formaSljedeca.datum || ''} onChange={(e) => setFormaSljedeca({ ...formaSljedeca, datum: e.target.value })} className="border border-gray-200 rounded-xl px-3 py-2 text-sm" />
            <input type="text" placeholder="19:00" value={formaSljedeca.vrijeme || ''} onChange={(e) => setFormaSljedeca({ ...formaSljedeca, vrijeme: e.target.value })} className="border border-gray-200 rounded-xl px-3 py-2 text-sm" />
          </div>
          <button type="submit" className="bg-red-600 text-white px-5 py-2 rounded-xl text-sm font-bold hover:bg-red-700 transition">Sačuvaj</button>
        </form>

        {/* PRETHODNA UTAKMICA */}
        <form onSubmit={handlePrethodnaSubmit} className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
          <h3 className="font-extrabold text-black mb-4">Prethodna utakmica</h3>
          <div className="grid grid-cols-2 gap-3 mb-3">
            <input placeholder="Domaćin" value={formaPrethodna.domacin || ''} onChange={(e) => setFormaPrethodna({ ...formaPrethodna, domacin: e.target.value })} className="border border-gray-200 rounded-xl px-3 py-2 text-sm" />
            <input placeholder="Gost" value={formaPrethodna.gost || ''} onChange={(e) => setFormaPrethodna({ ...formaPrethodna, gost: e.target.value })} className="border border-gray-200 rounded-xl px-3 py-2 text-sm" />
          </div>
          <div className="grid grid-cols-3 gap-3 mb-4">
            <input type="number" placeholder="Golovi domaćin" value={formaPrethodna.gol_domacin ?? ''} onChange={(e) => setFormaPrethodna({ ...formaPrethodna, gol_domacin: Number(e.target.value) })} className="border border-gray-200 rounded-xl px-3 py-2 text-sm" />
            <input type="number" placeholder="Golovi gost" value={formaPrethodna.gol_gost ?? ''} onChange={(e) => setFormaPrethodna({ ...formaPrethodna, gol_gost: Number(e.target.value) })} className="border border-gray-200 rounded-xl px-3 py-2 text-sm" />
            <input type="text" placeholder="DD.MM.GGGG" value={formaPrethodna.datum || ''} onChange={(e) => setFormaPrethodna({ ...formaPrethodna, datum: e.target.value })} className="border border-gray-200 rounded-xl px-3 py-2 text-sm" />
          </div>
          <button type="submit" className="bg-red-600 text-white px-5 py-2 rounded-xl text-sm font-bold hover:bg-red-700 transition">Sačuvaj</button>
        </form>
      </div>

      {/* TABELA LIGE */}
      <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-extrabold text-black">Tabela lige</h3>
          <button onClick={handleTabelaSave} className="flex items-center gap-2 bg-red-600 text-white px-5 py-2 rounded-xl text-sm font-bold hover:bg-red-700 transition">
            <FaSave size={12} />
            Sačuvaj tabelu
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-gray-400 text-xs uppercase">
                <th className="px-3 py-2 text-left">Tim</th>
                <th className="px-3 py-2 text-center">U</th>
                <th className="px-3 py-2 text-center">P</th>
                <th className="px-3 py-2 text-center">R</th>
                <th className="px-3 py-2 text-center">G</th>
                <th className="px-3 py-2 text-center">Bod</th>
                <th className="px-3 py-2 text-center">Istakni (Sloga)</th>
              </tr>
            </thead>
            <tbody>
              {formaTabela.map((red, i) => (
                <tr key={red.id ?? i} className="border-t border-gray-100">
                  <td className="px-3 py-2">
                    <input value={red.tim || ''} onChange={(e) => handleTabelaChange(i, 'tim', e.target.value)} className="w-full border border-gray-200 rounded-lg px-2 py-1" />
                  </td>
                  {['u', 'p', 'r', 'g', 'bod'].map((polje) => (
                    <td key={polje} className="px-3 py-2">
                      <input type="number" value={red[polje] ?? 0} onChange={(e) => handleTabelaChange(i, polje, Number(e.target.value))} className="w-16 border border-gray-200 rounded-lg px-2 py-1 text-center" />
                    </td>
                  ))}
                  <td className="px-3 py-2 text-center">
                    <input type="checkbox" checked={!!red.highlight} onChange={(e) => handleTabelaChange(i, 'highlight', e.target.checked)} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default DashboardMatch
