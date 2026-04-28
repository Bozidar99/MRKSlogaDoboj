import React from 'react'

import hero2 from "../assets/hero2.png"
import sloga1 from "../assets/sloga1.jpg"
import sloga2 from "../assets/sloga2.jpg"
import sloga3 from "../assets/sloga3.jpg"
import sloga4 from "../assets/sloga4.jpg"
import sloga5 from "../assets/sloga5.jpg"

function HeroPlayersComponent() {
  return (
    <div
      className="relative w-full min-h-[60vh] md:min-h-[75vh] lg:h-[80vh] bg-cover bg-center overflow-hidden"
      style={{ backgroundImage: `url(${hero2})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Desktop slike */}
      <div className="hidden lg:block relative w-full h-full z-10">
        <img
          src={sloga1}
          alt="Sloga 1"
          className="absolute left-[4%] top-[8%] w-48 xl:w-56 2xl:w-64 rounded-2xl shadow-2xl hover:scale-110 duration-300 object-cover"
        />

        <img
          src={sloga2}
          alt="Sloga 2"
          className="absolute left-[20%] top-[52%] w-48 xl:w-56 2xl:w-64 rounded-2xl shadow-2xl hover:scale-110 duration-300 object-cover"
        />

        <img
          src={sloga3}
          alt="Sloga 3"
          className="absolute left-[40%] top-[10%] w-48 xl:w-56 2xl:w-64 rounded-2xl shadow-2xl hover:scale-110 duration-300 object-cover"
        />

        <img
          src={sloga4}
          alt="Sloga 4"
          className="absolute left-[58%] top-[52%] w-48 xl:w-56 2xl:w-64 rounded-2xl shadow-2xl hover:scale-110 duration-300 object-cover"
        />

        <img
          src={sloga5}
          alt="Sloga 5"
          className="absolute left-[76%] top-[8%] w-48 xl:w-56 2xl:w-64 rounded-2xl shadow-2xl hover:scale-110 duration-300 object-cover"
        />
      </div>

      {/* Tablet */}
      <div className="hidden sm:grid lg:hidden relative z-10 grid-cols-3 gap-4 px-6 py-10">
        {[sloga1, sloga2, sloga3, sloga4, sloga5].map((img, i) => (
          <img
            key={i}
            src={img}
            alt={`Sloga ${i + 1}`}
            className="w-full h-40 md:h-48 object-cover rounded-2xl shadow-xl hover:scale-105 duration-300"
          />
        ))}
      </div>

      {/* Mobile */}
      <div className="grid sm:hidden relative z-10 grid-cols-1 gap-4 px-4 py-8">
        {[sloga1, sloga2, sloga3, sloga4, sloga5].map((img, i) => (
          <img
            key={i}
            src={img}
            alt={`Sloga ${i + 1}`}
            className="w-full h-48 object-cover rounded-2xl shadow-xl"
          />
        ))}
      </div>

      {/* Naslov */}
      
    </div>
  )
}

export default HeroPlayersComponent