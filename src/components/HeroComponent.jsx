import React from 'react'
import tim from "../assets/tim.jpg"
import ehf from "../assets/efh.jpg"
import ehf1 from "../assets/efh1.jpg"
import bht from "../assets/bht.png"
import hero from "../assets/hero.png"
import hero2 from "../assets/hero2.png"

function HeroComponent() {
  return (
    <div 
      className='flex flex-col md:flex-row gap-6 md:gap-15 items-center justify-center w-full min-h-[80vh] bg-cover bg-center px-4 py-8 md:py-0' 
      style={{ backgroundImage: `url(${hero2})` }}
    >
      
      {/* Slika tima - velika, samo se prilagođava širini ekrana */}
      <img 
        src={tim} 
        alt='tim' 
        className="w-full md:w-260 h-64 md:h-120 object-cover rounded-2xl shadow-xl ml-0 md:ml-7 opacity-65"
      />

      {/* Panel sa logosima */}
      <div className='flex flex-row md:flex-col items-center justify-center flex-wrap gap-4 md:gap-0 backdrop-blur-sm bg-white/40 p-6 rounded-2xl shadow-lg opacity-80'>
        
        <img src={ehf} alt='ehf' className="w-35 h-10 object-contain md:mt-12 hover:scale-110 transition duration-300"/>
        
        <img src={ehf1} alt='ehf1' className="w-35 h-10 object-contain md:mt-12 hover:scale-110 transition duration-300"/>
        
        <img src={bht} alt='bht' className="w-35 h-20 object-contain md:mt-12 hover:scale-110 transition duration-300"/>
        
        <img src={hero} alt='hero' className="w-25 h-22 object-contain md:mt-12 hover:scale-110 transition duration-300"/>
      </div>

    </div>
  )
}

export default HeroComponent
