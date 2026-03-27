import React from 'react'

function AboutComponent() {
  return (
    <div className="w-full bg-white py-20 px-6">
      
      {/* KONTEJNER */}
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        
        {/* LIJEVA STRANA - TEKST */}
        <div>
          <h2 className="text-4xl font-bold mb-6">
            MRK SLOGA DOBOJ
          </h2>

          <p className="text-gray-600 text-lg mb-6">
            Rukometni klub sa dugom tradicijom, poznat po borbenosti, timskom duhu i strasti prema igri. 
            Sloga Doboj predstavlja ponos grada i simbol sportskog uspjeha.
          </p>

          <button className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition">
            Saznaj više
          </button>
        </div>

        {/* DESNA STRANA - STATISTIKA */}
        <div className="grid grid-cols-2 gap-6 text-center">
          
          <div className="bg-gray-100 p-6 rounded-xl shadow">
            <h3 className="text-3xl font-bold">50+</h3>
            <p className="text-gray-500">Godina tradicije</p>
          </div>

          <div className="bg-gray-100 p-6 rounded-xl shadow">
            <h3 className="text-3xl font-bold">10+</h3>
            <p className="text-gray-500">Trofeja</p>
          </div>

          <div className="bg-gray-100 p-6 rounded-xl shadow">
            <h3 className="text-3xl font-bold">100+</h3>
            <p className="text-gray-500">Igrača</p>
          </div>

          <div className="bg-gray-100 p-6 rounded-xl shadow">
            <h3 className="text-3xl font-bold">1000+</h3>
            <p className="text-gray-500">Navijača</p>
          </div>

        </div>

      </div>
    </div>
  )
}

export default AboutComponent
