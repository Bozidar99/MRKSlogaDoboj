import React from 'react'
import  HeroComponent  from"../components/HeroComponent"
import  AboutComponent from "../components/AboutComponent"
import MatchComponent from '../components/MatchComponent'
import NewsComponent from '../components/NewsComponent'
function HomePage() {
  return (
    <div className='mt-2'>
          <HeroComponent/>
          <MatchComponent/>
          <AboutComponent/>
          <NewsComponent/>

    </div>
  )
}

export default HomePage
