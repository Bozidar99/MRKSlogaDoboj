import React from 'react'

import tim from "../assets/tim.jpg"
import ehf from "../assets/efh.jpg"
import ehf1 from "../assets/efh1.jpg"
import bht from "../assets/bht.png"
import hero from "../assets/hero.png"
function HeroComponent() {
  return (
    <div className='flex gap-15 items-center bg-gray-200'>
  
      <img 
        src={tim} 
        alt='tim' 
        className="w-260 h-120 object-cover rounded-2xl shadow-xl ml-7"
      />

      <div className='mt-2 flex mb-2 flex-col items-center backdrop-blur-sm bg-white/40 p-6 rounded-2xl shadow-lg'>
        
        <img src={ehf} alt='ehf' className="w-35 h-10 object-contain mt-12 hover:scale-110 transition duration-300"/>
        
        <img src={ehf1} alt='ehf1' className="w-35 h-10 object-contain mt-12 hover:scale-110 transition duration-300"/>
        
        <img src={bht} alt='bht' className="w-35 h-20 object-contain mt-12 hover:scale-110 transition duration-300"/>
        
        <img src={hero} alt='hero' className="w-25 h-22 object-contain mt-12 hover:scale-110 transition duration-300"/>

      </div>

</div>
  )
}

export default HeroComponent
