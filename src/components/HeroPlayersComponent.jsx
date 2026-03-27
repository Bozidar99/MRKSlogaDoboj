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
    className='relative w-full h-[80vh] bg-cover bg-center'
    style={{ backgroundImage: `url(${hero2})` }}
    >

        <img src={sloga1} className='absolute left-[5%] top-[5%] w-80 hover:scale-110 duration-300' />
        <img src={sloga2} className='absolute left-[22%] top-[50%] w-80 hover:scale-110 duration-300' />
        <img src={sloga3} className='absolute left-[42%] top-[7%] w-80 hover:scale-110 duration-300' />
        <img src={sloga4} className='absolute left-[58%] top-[50%] w-80 hover:scale-110 duration-300' />
        <img src={sloga5} className='absolute left-[75%] top-[6%] w-80 hover:scale-110 duration-300' />

</div>
  )
}

export default HeroPlayersComponent
