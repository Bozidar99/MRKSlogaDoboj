import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchVijesti } from '../store/newsSlice'
import { fetchIgraci } from '../store/playersSlice'
import { fetchGalerija } from '../store/gallerySlice'
import { fetchPoruke } from '../store/messagesSlice'
import { MdNewspaper, MdSportsHandball, MdPhoto, MdEmail } from 'react-icons/md'
import { GiTrophy } from 'react-icons/gi'
import { Link } from 'react-router-dom'

function DashboardHome() {
  const dispatch = useDispatch()
  const { vijesti } = useSelector((state) => state.news)
  const { golmani, krila, bekovi, pivoti } = useSelector((state) => state.players)
  const { slike } = useSelector((state) => state.gallery)
  const { poruke } = useSelector((state) => state.messages)
  const ukupnoIgraca = golmani.length + krila.length + bekovi.length + pivoti.length

  useEffect(() => {
    dispatch(fetchVijesti())
    dispatch(fetchIgraci())
    dispatch(fetchGalerija())
    dispatch(fetchPoruke())
  }, [dispatch])

  const kartice = [
    {
      naziv:  "Ukupno vijesti",
      broj:   vijesti.length,
      ikona:  <MdNewspaper size={28} />,
      boja:   "bg-red-600",
      link:   "/dashboard/news"
    },
    {
      naziv:  "Ukupno igrača",
      broj:   ukupnoIgraca,
      ikona:  <MdSportsHandball size={28} />,
      boja:   "bg-black",
      link:   "/dashboard/players"
    },
    {
      naziv:  "Trofeja",
      broj:   11,
      ikona:  <GiTrophy size={28} />,
      boja:   "bg-yellow-500",
      link:   "#"
    },
    {
      naziv:  "Galerija",
      broj:   slike.length,
      ikona:  <MdPhoto size={28} />,
      boja:   "bg-gray-600",
      link:   "/dashboard/gallery"
    },
    {
      naziv:  "Nepročitane poruke",
      broj:   poruke.filter(p => !p.procitano).length,
      ikona:  <MdEmail size={28} />,
      boja:   "bg-blue-600",
      link:   "/dashboard/messages"
    },
  ]

  return (
    <div>
      <h2 className="text-2xl font-extrabold text-black mb-2">Dobrodošli 👋</h2>
      <p className="text-gray-400 text-sm mb-8">Pregled MRK Sloga Doboj admin panela</p>

      {/* STAT KARTICE */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {kartice.map((k, i) => (
          <Link
            key={i}
            to={k.link}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 flex items-center gap-4 border border-gray-100 hover:border-red-600"
          >
            <div className={`${k.boja} text-white p-3 rounded-xl`}>
              {k.ikona}
            </div>
            <div>
              <p className="text-gray-400 text-xs font-semibold">{k.naziv}</p>
              <p className="text-2xl font-extrabold text-black">{k.broj}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* POSLJEDNJE VIJESTI */}
      <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-extrabold text-black text-lg">Posljednje vijesti</h3>
          <Link to="/dashboard/news" className="text-red-600 text-sm font-bold hover:underline">
            Upravljaj →
          </Link>
        </div>
        <div className="flex flex-col gap-3">
          {vijesti.slice(0, 5).map((v) => (
            <div
              key={v.id}
              className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0"
            >
              <div className="flex items-center gap-3">
                <span className="bg-red-100 text-red-600 text-xs font-bold px-2 py-1 rounded-lg">
                  {v.kategorija}
                </span>
                <p className="text-sm font-semibold text-black">{v.naslov}</p>
              </div>
              <span className="text-xs text-gray-400 flex-shrink-0 ml-4">{v.datum}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}

export default DashboardHome
