import React from 'react'
import logofooter from "../assets/logofooter.png"
import { NavLink } from "react-router-dom"
import bht from "../assets/eurotaxi-logo.png"
import ers from "../assets/logo-red.png"
import ter from "../assets/logo.svg"
import hero from "../assets/hero.png"
function FooterComponent() {

  const navLinks = [
    { to: "/",        label: "Home" },
    { to: "/about",   label: "O nama" },
    { to: "/players", label: "Igrači" },
    { to: "/news",    label: "Vijesti" },
    { to: "/galery",  label: "Galerija" },
    { to: "/contact", label: "Kontakt" },
  ]
  return (
    <footer className="relative text-gray-300 bg-[#0b0f19]">

      {/* RED ACCENT LINE (sportski feel) */}
      <div className="h-1 bg-gradient-to-r from-red-600 via-white to-red-600"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* KLUB INFO */}
        <div className="md:col-span-2 flex flex-col sm:flex-row gap-6">

          <img 
            src={logofooter} 
            alt="logo" 
            className="w-24 md:w-28 object-contain"
          />

          <div>
            <h2 className="text-white text-2xl font-bold uppercase tracking-wide">
              MRK Sloga Doboj
            </h2>

            <p className="text-sm mt-2 text-gray-400 max-w-md">
              Profesionalni rukometni klub sa tradicijom i ambicijom.
              Takmičimo se na najvišem nivou i gradimo budućnost sporta.
            </p>

            {/* SOCIAL */}
            <div className="flex gap-4 mt-4 text-sm">
              <a href="https://www.facebook.com/rkslogadoboj/?locale=sr_RS" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">Facebook</a>
              <a href="https://www.instagram.com/mrk_sloga.doboj/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">Instagram</a>
              <a href="https://www.youtube.com/@mrkslogadoboj9587" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">YouTube</a>
            </div>
          </div>
        </div>

        {/* NAVIGACIJA */}
        <div>
          <h3 className="text-white font-semibold mb-3 uppercase tracking-wide">
            Klub
          </h3>
          <ul className="space-y-2 text-sm text-gray-400">
          {navLinks.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                className={({ isActive }) =>
                  isActive ? "text-red-500 font-bold" : "hover:text-white transition"
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
        </div>

        {/* KONTAKT */}
        <div>
          <h3 className="text-white font-semibold mb-3 uppercase tracking-wide">
            Kontakt
          </h3>

          <div className="space-y-2 text-sm text-gray-400">
            <p>📍 Doboj, BiH</p>
            <p>📞 +387 65 094 185</p>
            <p>📧 dobojrksloga@gmail.com</p>
          </div>
        </div>
      </div>

      {/* SPONZORI BAR */}
      <div className="border-t border-gray-800 py-6">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-center gap-6 text-gray-500 text-xs uppercase tracking-widest">
          <span><img src={bht} alt='bht' className="w-35 h-20 object-contain md:mt-12 hover:scale-110 transition duration-300 mr-15"/></span>
          <span><img src={ers} alt='bht' className="w-35 h-20 object-contain md:mt-12 hover:scale-110 transition duration-300 mr-15"/></span>
          <span><img src={ter} alt='bht' className="w-35 h-20 object-contain md:mt-12 hover:scale-110 transition duration-300 mr-15"/></span>
          <span><img src={hero} alt='bht' className="w-35 h-20 object-contain md:mt-12 hover:scale-110 transition duration-300"/></span>
        </div>
      </div>

      {/* BOTTOM */}
      <div className="bg-black py-4 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} MRK Sloga Doboj • All rights reserved
      </div>

    </footer>
  )
}

export default FooterComponent