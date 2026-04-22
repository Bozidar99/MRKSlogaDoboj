import React from 'react'
import  HeroComponent  from"../components/HeroComponent"
import  AboutComponent from "../components/AboutComponent"
import MatchComponent from '../components/MatchComponent'
import NewsComponent from '../components/NewsComponent'
import TrophyComponent from '../components/TrophyComponent'
import FooterComponent from '../components/FooterComponent'
function HomePage() {
  return (
    <div className='mt-2'>
          <HeroComponent/>
          <MatchComponent/>
          <NewsComponent/>
          <TrophyComponent/>
          <FooterComponent/>

    </div>
  )
}

export default HomePage
