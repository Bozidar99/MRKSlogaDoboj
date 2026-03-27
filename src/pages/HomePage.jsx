import React from 'react'
import  HeroComponent  from"../components/HeroComponent"
import  AboutComponent from "../components/AboutComponent"
import MatchComponent from '../components/MatchComponent'
function HomePage() {
  return (
    <div className='mt-2'>
          <HeroComponent/>
          <MatchComponent/>
          <AboutComponent/>

    </div>
  )
}

export default HomePage
