import React from 'react'
import { GiTrophy } from 'react-icons/gi'
import { HiMiniTrophy } from "react-icons/hi2";
import { BiSolidTrophy } from "react-icons/bi";

const trofeje = [
  { naziv: "Premijer liga BiH", broj: 1, ikona: <BiSolidTrophy size={60} className="text-white" /> },
  { naziv: "Kup BiH",           broj: 3, ikona: <GiTrophy size={60} className="text-white" /> },
  { naziv: "Kup RS",            broj: 7, ikona: <HiMiniTrophy size={60} className="text-white" /> },
]

function TrophyComponent() {
  return (
    <div className="w-full bg-white py-14 px-4">
      <h2 className="text-center text-red-600 text-2xl md:text-3xl font-extrabold uppercase tracking-widest mb-10">
        🏆 Naši Trofiji
      </h2>
      <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6">
        {trofeje.map((t, i) => (
          <div
            key={i}
            className="flex flex-col items-center bg-red-600 rounded-2xl py-8 px-4 shadow-lg hover:bg-red-700 transition"
          >
            <div className="mb-4">{t.ikona}</div>
            <h3 className="text-white font-extrabold text-5xl mb-2">{t.broj}x</h3>
            <p className="text-white/80 text-sm font-semibold uppercase tracking-wide text-center">{t.naziv}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TrophyComponent