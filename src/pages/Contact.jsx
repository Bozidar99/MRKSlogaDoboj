import React, { useState } from 'react'
import logofooter from "../assets/logofooter.png"
import { MdEmail, MdLocationOn, MdPhone } from "react-icons/md"
import { FaFacebook, FaInstagram } from "react-icons/fa"
import { useTranslation } from 'react-i18next'

function Contact() {
  const { t } = useTranslation()
  const [forma, setForma] = useState({ ime: '', email: '', poruka: '' })
  const [poslano, setPoslano] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    // Ovdje će ići Axios poziv ka backendu kad bude spreman
    setPoslano(true)
    setForma({ ime: '', email: '', poruka: '' })
    setTimeout(() => setPoslano(false), 4000)
  }

  return (
    <div className="w-full">
      {/* DEKORATIVNA LINIJA */}
      <div className="w-full bg-white flex items-center justify-center py-6 gap-4">
        <div className="h-[2px] w-24 bg-gray-200 rounded-full" />
        <div className="w-3 h-3 rounded-full bg-red-600" />
        <div className="h-[2px] w-48 bg-red-600 rounded-full" />
        <div className="w-3 h-3 rounded-full bg-red-600" />
        <div className="h-[2px] w-24 bg-gray-200 rounded-full" />
      </div>

      {/* KONTAKT SEKCIJA */}
      <div className="w-full bg-white py-16 px-4">
        <div className="max-w-6xl mx-auto">

          {/* NASLOV */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-black uppercase tracking-wide">
              Kontaktirajte nas
            </h2>
            <div className="w-16 h-1 bg-red-600 mx-auto mt-4 rounded-full" />
          </div>

          <div className="grid md:grid-cols-2 gap-10 items-start">

            {/* LIJEVA STRANA - INFO */}
            <div className="flex flex-col gap-8">

              {/* LOGO */}
              <img
                src={logofooter}
                alt="logo"
                className="w-24 md:w-32 object-contain"
              />

              <p className="text-gray-500 text-base leading-relaxed">
                Imate pitanje, prijedlog ili želite sarađivati sa MRK Sloga Doboj? 
                Slobodno nas kontaktirajte — odgovaramo u najkraćem mogućem roku.
              </p>

              {/* KONTAKT INFO */}
              <div className="flex flex-col gap-5">
                <div className="flex items-center gap-4">
                  <div className="bg-red-600 p-3 rounded-xl">
                    <MdEmail className="text-white" size={22} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 uppercase font-semibold">Email</p>
                    <p className="text-black font-semibold">mrksloga@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="bg-red-600 p-3 rounded-xl">
                    <MdPhone className="text-white" size={22} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 uppercase font-semibold">Telefon</p>
                    <p className="text-black font-semibold">+387 65 094 185</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="bg-red-600 p-3 rounded-xl">
                    <MdLocationOn className="text-white" size={22} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 uppercase font-semibold">Adresa</p>
                    <p className="text-black font-semibold">Doboj, Republika Srpska, BiH</p>
                  </div>
                </div>
              </div>

              {/* DRUŠTVENE MREŽE */}
              <div>
                <p className="text-xs text-gray-400 uppercase font-semibold mb-3">Pratite nas</p>
                <div className="flex gap-4">
                  
                    <a href="#"
                    className="bg-red-600 p-3 rounded-xl hover:bg-red-700 transition"
                  >
                    <FaFacebook className="text-white" size={20} />
                  </a>
                  
                   <a href="#"
                    className="bg-red-600 p-3 rounded-xl hover:bg-red-700 transition"
                  >
                    <FaInstagram className="text-white" size={20} />
                  </a>
                </div>
              </div>

            </div>

            {/* DESNA STRANA - FORMA */}
            <div className="bg-gray-50 rounded-2xl p-6 md:p-8 shadow-lg border border-gray-100">
              <h3 className="text-xl font-bold text-black mb-6">Pošaljite poruku</h3>

              {poslano && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-xl mb-6 text-sm font-semibold">
                  ✅ Poruka je uspješno poslana! Javit ćemo se uskoro.
                </div>
              )}

              <form onSubmit={handleSubmit} className="flex flex-col gap-5">

                {/* IME */}
                <div>
                  <label className="text-sm font-semibold text-gray-600 mb-1 block">
                    Ime i prezime
                  </label>
                  <input
                    type="text"
                    required
                    value={forma.ime}
                    onChange={(e) => setForma({ ...forma, ime: e.target.value })}
                    placeholder="Vaše ime..."
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-red-600 transition"
                  />
                </div>

                {/* EMAIL */}
                <div>
                  <label className="text-sm font-semibold text-gray-600 mb-1 block">
                    Email adresa
                  </label>
                  <input
                    type="email"
                    required
                    value={forma.email}
                    onChange={(e) => setForma({ ...forma, email: e.target.value })}
                    placeholder="vasa@email.com"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-red-600 transition"
                  />
                </div>

                {/* PORUKA */}
                <div>
                  <label className="text-sm font-semibold text-gray-600 mb-1 block">
                    Poruka
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={forma.poruka}
                    onChange={(e) => setForma({ ...forma, poruka: e.target.value })}
                    placeholder="Vaša poruka..."
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-red-600 transition resize-none"
                  />
                </div>

                {/* DUGME */}
                <button
                  type="submit"
                  className="w-full bg-red-600 text-white font-bold py-3 rounded-xl hover:bg-red-700 transition text-sm uppercase tracking-wide"
                >
                  Pošalji poruku →
                </button>

              </form>
            </div>

          </div>

          {/* MAPA */}
          <div className="mt-12 rounded-2xl overflow-hidden shadow-lg border border-gray-100 h-64 md:h-80">
            <iframe
              title="MRK Sloga Doboj"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11385.123456789!2d18.0875!3d44.7306!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x475b4b0000000001%3A0x1!2sDoboj%2C+Bosnia+and+Herzegovina!5e0!3m2!1sen!2sba!4v1234567890"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            />
          </div>

        </div>
      </div>
    </div>
  )
}

export default Contact
