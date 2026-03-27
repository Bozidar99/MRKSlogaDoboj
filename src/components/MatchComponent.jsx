import React from 'react'
import { useEffect, useState } from 'react'

import duca from "../assets/duca.jpg"
import boske from "../assets/boske.jpg"



function MatchComponent() {

    const matchDate = new Date("2026-03-30T19:00:00");

const [timeLeft, setTimeLeft] = useState({});

useEffect(() => {
  const interval = setInterval(() => {
    const now = new Date();
    const difference = matchDate - now;

    if (difference <= 0) {
      clearInterval(interval);
      return;
    }

    setTimeLeft({
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    });
  }, 1000);

  return () => clearInterval(interval);
}, []);

  return (
   <div className="w-full bg-white text-black py-20">

      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-10 items-center">

        {/* LIJEVA SLIKA */}
        <img 
          src={duca} 
          alt="duca" 
          className="hidden md:block h-[300px] object-cover rounded-xl ml-16"
        />

        {/* SREDINA - KARTICE */}
        <div className="flex flex-col gap-8">

          {/* SLJEDEĆA UTAKMICA */}
          <div className="bg-black/20 drop-blur-md p-6 rounded-2xl text-center shadow-lg">
            <h2 className="text-xl font-bold mb-4 text-red-500">
              SLJEDEĆA UTAKMICA
            </h2>

            <p className="text-2xl font-semibold">
              SLOGA vs BORAC
            </p>

            <p className="text-blue-400 mt-2">
              25.03.2026 • 19:00
            </p>
          </div>

          {/* PRETHODNA UTAKMICA */}
          <div className="bg-black/20 backdrop-blur-md p-6 rounded-2xl text-center shadow-lg">
            <h2 className="text-xl font-bold mb-4 text-green-400">
              PRETHODNA UTAKMICA
            </h2>

            <p className="text-2xl font-semibold">
              SLOGA 28 : 25 IZVIĐAČ
            </p>

            <p className="text-blue-400 mt-2">
              18.03.2026
            </p>
          </div>

          <div className="flex justify-center gap-6 mt-4">

            <div>
                <p className="text-xl font-bold">{timeLeft.days || 0}</p>
                <span className="text-sm text-gray-600">dana</span>
            </div>

            <div>
                <p className="text-xl font-bold">{timeLeft.hours || 0}</p>
                <span className="text-sm text-gray-600">sati</span>
            </div>

            <div>
                <p className="text-xl font-bold">{timeLeft.minutes || 0}</p>
                <span className="text-sm text-gray-600">min</span>
            </div>

            <div>
                <p className="text-xl font-bold">{timeLeft.seconds || 0}</p>
                <span className="text-sm text-gray-600">sek</span>
            </div>

            </div>

        </div>

        {/* DESNA SLIKA */}
        <img 
          src={boske} 
          alt="boske" 
          className="hidden md:block h-[300px] object-cover rounded-xl ml-21"
        />
        
        
        
        

      </div>
    </div>
  )
}

export default MatchComponent
