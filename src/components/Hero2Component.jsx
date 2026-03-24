import React from 'react'

import hero2 from "../assets/hero2.png"


function Hero2Component() {
  return (
    <div>
      <img 
              src={hero2} 
              alt='hero2' 
              className="mt-2 w-full h-[80vh] bg-cover bg-center"
            />
    </div>
  )
}

export default Hero2Component
