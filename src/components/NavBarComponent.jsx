import HeaderComponent from "./HeaderComponent"
import { useState } from "react"
import { NavLink } from "react-router-dom"
import logo from "../assets/logo.png"
import { FaBars, FaTimes } from "react-icons/fa"

function NavBarComponent() {
  const [toggleHeader, setToggleHeader] = useState(true)
  const [menuOpen, setMenuOpen] = useState(false)

  const navLinks = [
    { to: "/",        label: "Home" },
    { to: "/about",   label: "O nama" },
    { to: "/players", label: "Igrači" },
    { to: "/news",    label: "Vijesti" },
    { to: "/galery",  label: "Galerija" },
    { to: "/contact", label: "Kontakt" },
  ]

  return (
    <div>
      {toggleHeader && <HeaderComponent setToggleHeader={setToggleHeader} />}

      <nav className="w-full bg-white shadow-sm">
        <div className="container mx-auto flex items-center justify-between px-6 py-3">

          {/* LOGO + IME */}
          <div className="flex items-center gap-3 font-bold">
            <img src={logo} alt="logo" className="w-14 md:w-20" />
            <p className="text-sm md:text-base">MRK SLOGA DOBOJ</p>
          </div>

          {/* DESKTOP LINKOVI */}
          <div className="hidden md:flex items-center gap-6 text-black">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  isActive ? "text-red-500 font-bold" : "text-black hover:text-red-500 transition"
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          {/* HAMBURGER - mobilni */}
          <button
            className="md:hidden text-black text-2xl"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>

        </div>

        {/* MOBILNI MENI */}
        {menuOpen && (
          <div className="md:hidden flex flex-col bg-white border-t border-gray-100 px-6 py-4 gap-4">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  isActive ? "text-red-500 font-bold text-lg" : "text-black text-lg hover:text-red-500 transition"
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>
        )}

      </nav>
    </div>
  )
}

export default NavBarComponent
