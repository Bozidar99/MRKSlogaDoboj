import HeaderComponent from "./HeaderComponent"
import  HeroComponent  from"./HeroComponent"
import { useState } from "react"
import { Link } from "react-router-dom"
import { NavLink } from "react-router-dom"


//images
import logo from "../assets/logo.png"
function NavBarComponent() {
          const [togglrHeader, setToggleHeader] = useState(true)


  return (
  <div>
    {togglrHeader && <HeaderComponent setToggleHeader={setToggleHeader}/>}

    <div>
      <div className="container mx-auto flex items-center justify-between mt-2">
        <div className="flex items-center gap-5 font-bold">
          <img src={logo} alt="logo" className="w-20 ml-10" />
          <p>MRK SLOGA DOBOJ</p>
        </div>
        {/* Pages */}
        <div className="flex items-center gap-5 mr-10 text-black">
          <NavLink to="/" className={({ isActive }) => (isActive ? "text-red-500 font-bold" : "text-black")}>Home</NavLink>

          <NavLink to="/about" className={({ isActive }) => (isActive ? "text-red-500 font-bold" : "text-black")}>O nama</NavLink>

          <NavLink to="/players" className={({ isActive }) => (isActive ? "text-red-500 font-bold" : "text-black")}>Igrači</NavLink>

          <NavLink to="/news" className={({ isActive }) => (isActive ? "text-red-500 font-bold" : "text-black")}>Vijesti</NavLink>

          <NavLink to="/galery" className={({ isActive }) => (isActive ? "text-red-500 font-bold" : "text-black")}>Galerija</NavLink>

          <NavLink to ="/contact" className={({ isActive }) => (isActive ? "text-red-500 font-bold" : "text-black")}>Kontakt</NavLink>
        </div>

      </div>
      <div className='mt-2'>
          <HeroComponent/>
        </div>
       
    </div>
  </div>
)
}
export default NavBarComponent
