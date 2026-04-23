import React from 'react'
import logofooter from "../assets/logofooter.png"

function FooterComponent() {
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
              <a className="hover:text-white transition">Facebook</a>
              <a className="hover:text-white transition">Instagram</a>
              <a className="hover:text-white transition">YouTube</a>
            </div>
          </div>
        </div>

        {/* NAVIGACIJA */}
        <div>
          <h3 className="text-white font-semibold mb-3 uppercase tracking-wide">
            Klub
          </h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><a className="hover:text-white">Početna</a></li>
            <li><a className="hover:text-white">Tim</a></li>
            <li><a className="hover:text-white">Utakmice</a></li>
            <li><a className="hover:text-white">Vijesti</a></li>
            <li><a className="hover:text-white">Galerija</a></li>
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
            <p>📧 mrkslogadoboj@gmail.com</p>
          </div>
        </div>
      </div>

      {/* SPONZORI BAR */}
      <div className="border-t border-gray-800 py-6">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-center gap-6 text-gray-500 text-xs uppercase tracking-widest">
          <span>Sponzor 1</span>
          <span>Sponzor 2</span>
          <span>Sponzor 3</span>
          <span>Sponzor 4</span>
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