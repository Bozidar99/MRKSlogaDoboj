import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchMatchData } from '../store/matchSlice'
import { fetchIgraci } from '../store/playersSlice'
import duca from "../assets/duca.jpg"

function parseDatumVrijeme(datum, vrijeme) {
  // datum: "DD.MM.GGGG", vrijeme: "HH:MM"
  if (!datum) return null
  const [d, m, y] = datum.split('.')
  const [h, min] = (vrijeme || "00:00").split(':')
  return new Date(Number(y), Number(m) - 1, Number(d), Number(h), Number(min))
}

// Bira jednog igrača automatski, mijenja se svakih 7 dana bez ičije akcije
function getWeeklyPlayerImage(players) {
  const sviIgraci = players.filter(p => p.slika)
  if (sviIgraci.length === 0) return null
  const brojNedjelje = Math.floor(Date.now() / (7 * 24 * 60 * 60 * 1000))
  const index = brojNedjelje % sviIgraci.length
  return sviIgraci[index]
}

function MatchComponent() {
  const dispatch = useDispatch()
  const { sljedeca, prethodna, tabela, loading } = useSelector((state) => state.match)
  const { golmani, krila, bekovi, pivoti } = useSelector((state) => state.players)
  const [timeLeft, setTimeLeft] = useState(null)

  useEffect(() => {
    dispatch(fetchMatchData())
    dispatch(fetchIgraci())
  }, [dispatch])

  useEffect(() => {
    if (!sljedeca) return
    const matchDate = parseDatumVrijeme(sljedeca.datum, sljedeca.vrijeme)
    if (!matchDate) return

    const interval = setInterval(() => {
      const now = new Date()
      const difference = matchDate - now
      if (difference <= 0) {
        clearInterval(interval)
        setTimeLeft(null)
        return
      }
      setTimeLeft({
        days:    Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours:   Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      })
    }, 1000)
    return () => clearInterval(interval)
  }, [sljedeca])

  if (loading || !sljedeca || !prethodna) {
    return (
      <div className="w-full bg-white py-16 flex justify-center">
        <div className="w-10 h-10 border-4 border-red-600 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  const sviIgraci = [...golmani, ...krila, ...bekovi, ...pivoti]
  const nedjeljniIgrac = getWeeklyPlayerImage(sviIgraci)
  const prikazSlika = nedjeljniIgrac ? nedjeljniIgrac.slika : duca

  return (
    <div className="w-full bg-white text-black py-10 md:py-20">
      <div className="max-w-7xl mx-auto px-4 flex flex-col lg:flex-row gap-8 items-center lg:items-start justify-center">

        {/* LIJEVA SLIKA — automatski se mijenja svakih 7 dana */}
        <div className="hidden lg:flex flex-shrink-0 items-center justify-center">
          <img
            src={prikazSlika}
            alt={nedjeljniIgrac ? nedjeljniIgrac.ime : "igrač"}
            className="h-[350px] object-cover rounded-xl border-10 border-red-600"
          />
        </div>

        {/* SREDINA - KARTICE */}
        <div className="flex flex-col gap-6 w-full max-w-sm flex-shrink-0">

          <div className="bg-red-600 p-5 md:p-6 rounded-2xl text-center shadow-lg border-6 border-black">
            <h2 className="text-lg md:text-xl font-bold mb-3 text-gray-300">SLJEDEĆA UTAKMICA</h2>
            <p className="text-xl md:text-2xl font-semibold text-white">{sljedeca.domacin} vs {sljedeca.gost}</p>
            <p className="text-amber-300 mt-2 text-sm md:text-base">{sljedeca.datum} • {sljedeca.vrijeme}</p>
          </div>

          <div className="bg-red-600 p-5 md:p-6 rounded-2xl text-center shadow-lg border-6 border-black">
            <h2 className="text-lg md:text-xl font-bold mb-3 text-gray-300">PRETHODNA UTAKMICA</h2>
            <p className="text-xl md:text-2xl font-semibold text-white">
              {prethodna.domacin} {prethodna.gol_domacin} : {prethodna.gol_gost} {prethodna.gost}
            </p>
            <p className="text-amber-300 mt-2 text-sm md:text-base">{prethodna.datum}</p>
          </div>

          {timeLeft ? (
            <div className="flex justify-center gap-2 md:gap-4">
              {[
                { value: timeLeft.days,    label: "dana" },
                { value: timeLeft.hours,   label: "sati" },
                { value: timeLeft.minutes, label: "min"  },
                { value: timeLeft.seconds, label: "sek"  },
              ].map(({ value, label }) => (
                <div key={label} className="flex flex-col items-center bg-red-600 text-white p-2 md:p-4 rounded-2xl shadow-lg w-16 md:w-20 border-3 border-black">
                  <p className="text-2xl md:text-3xl font-extrabold">{value}</p>
                  <span className="text-xs md:text-sm">{label}</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center bg-red-600 p-4 rounded-2xl border-3 border-black">
              <p className="text-white font-bold text-base md:text-xl">⏱️ Utakmica je u toku ili je završena!</p>
            </div>
          )}

        </div>

        {/* DESNA STRANA - TABELA LIGE */}
        <div className="w-full max-w-sm lg:max-w-xs flex-shrink-0">
          <h2 className="text-center font-bold text-base md:text-lg mb-3 text-red-600 tracking-wider">
            🏆 PREMIJER LIGA BIH 2025/26
          </h2>

          <div className="overflow-hidden rounded-2xl border-4 border-red-600 shadow-xl">
            <table className="w-full text-xs md:text-sm text-black">
              <thead>
                <tr className="bg-red-600 text-white">
                  <th className="py-2 px-2 text-left">#</th>
                  <th className="py-2 px-2 text-left">Tim</th>
                  <th className="py-2 px-1 text-center">U</th>
                  <th className="py-2 px-1 text-center">P</th>
                  <th className="py-2 px-1 text-center">R</th>
                  <th className="py-2 px-1 text-center">G</th>
                  <th className="py-2 px-1 text-center font-bold">Bod</th>
                </tr>
              </thead>
              <tbody>
                {[...tabela]
                  .sort((a, b) => b.bod - a.bod)
                  .map((row, index) => (
                    <tr
                      key={row.id}
                      className={`border-b border-gray-200 ${
                        row.highlight
                          ? "bg-red-100 font-bold border-l-4 border-l-red-600"
                          : index % 2 === 0
                          ? "bg-gray-50"
                          : "bg-white"
                      }`}
                    >
                      <td className="py-2 px-2 text-gray-500">{index + 1}</td>
                      <td className="py-2 px-2 font-medium">{row.tim}</td>
                      <td className="py-2 px-1 text-center">{row.u}</td>
                      <td className="py-2 px-1 text-center">{row.p}</td>
                      <td className="py-2 px-1 text-center">{row.r}</td>
                      <td className="py-2 px-1 text-center">{row.g}</td>
                      <td className="py-2 px-1 text-center font-bold text-red-600">{row.bod}</td>
                    </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-400 text-center mt-2">U=utakmice · P=pobjede · R=remiji · G=gubici</p>
        </div>

      </div>
    </div>
  );
}

export default MatchComponent
