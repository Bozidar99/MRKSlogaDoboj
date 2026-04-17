import React from 'react'
import { useEffect, useState } from 'react'
import duca from "../assets/duca.jpg"

function MatchComponent() {

  const matchDate = new Date("2026-05-10T19:00:00");
  const [timeLeft, setTimeLeft] = useState(null);
  const [tabela, setTabela] = useState([]);
  const [loadingTabela, setLoadingTabela] = useState(true);

  // ── TIMER ──────────────────────────────────────────
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const difference = matchDate - now;
      if (difference <= 0) {
        clearInterval(interval);
        setTimeLeft(null);
        return;
      }
      setTimeLeft({
        days:    Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours:   Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // ── LIVE TABELA PREKO CLAUDE API ────────────────────
  useEffect(() => {
    const fetchTabela = async () => {
      setLoadingTabela(true);
      try {
        const response = await fetch("https://api.anthropic.com/v1/messages", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            model: "claude-sonnet-4-20250514",
            max_tokens: 1000,
            tools: [{ type: "web_search_20250305", name: "web_search" }],
            messages: [{
              role: "user",
              content: `Pretraži web i pronađi trenutnu tabelu Rukometne Premijer lige BiH za sezonu 2025/26. 
              Vrati SAMO JSON array bez ikakvog teksta, u ovom formatu:
              [{"pos":1,"tim":"NazivTima","u":22,"p":18,"r":1,"g":3,"bod":37,"highlight":false}, ...]
              Za tim "Sloga" postavi highlight na true. Vrati samo JSON, bez markdown, bez objašnjenja.`
            }]
          })
        });

        const data = await response.json();
        const text = data.content
          .map(item => item.type === "text" ? item.text : "")
          .filter(Boolean)
          .join("");

        const clean = text.replace(/```json|```/g, "").trim();
        const parsed = JSON.parse(clean);
        setTabela(parsed);
      } catch (err) {
        console.error("Greška pri učitavanju tabele:", err);
        // Fallback na statičke podatke ako API ne radi
        setTabela([
          { pos: 1,  tim: "Izviđač",    u: 22, p: 18, r: 1, g: 3,  bod: 37, highlight: false },
          { pos: 2,  tim: "Borac",      u: 22, p: 17, r: 1, g: 4,  bod: 35, highlight: false },
          { pos: 3,  tim: "Zrinjski",   u: 22, p: 15, r: 2, g: 5,  bod: 26, highlight: false },
          { pos: 4,  tim: "Maglaj",     u: 22, p: 14, r: 1, g: 7,  bod: 29, highlight: false },
          { pos: 5,  tim: "Vogošća",    u: 22, p: 11, r: 2, g: 9,  bod: 24, highlight: false },
          { pos: 6,  tim: "Konjuh",     u: 22, p: 10, r: 2, g: 10, bod: 22, highlight: false },
          { pos: 7,  tim: "Bosna",      u: 22, p: 9,  r: 1, g: 12, bod: 15, highlight: false },
          { pos: 8,  tim: "Sloga",      u: 22, p: 7,  r: 2, g: 13, bod: 30, highlight: true  },
          { pos: 9,  tim: "Široki",     u: 22, p: 5,  r: 1, g: 16, bod: 11, highlight: false },
          { pos: 10, tim: "Zavidovići", u: 22, p: 3,  r: 1, g: 18, bod: 7,  highlight: false },
        ]);
      } finally {
        setLoadingTabela(false);
      }
    };

    fetchTabela();
  }, []);

  return (
    <div className="w-full bg-white text-black py-10 md:py-20">
      <div className="max-w-7xl mx-auto px-4 flex flex-col lg:flex-row gap-8 items-center lg:items-start justify-center">

        {/* LIJEVA SLIKA */}
        <div className="hidden lg:flex flex-shrink-0 items-center justify-center">
          <img
            src={duca}
            alt="duca"
            className="h-[350px] object-cover rounded-xl border-10 border-red-600"
          />
        </div>

        {/* SREDINA - KARTICE */}
        <div className="flex flex-col gap-6 w-full max-w-sm flex-shrink-0">

          <div className="bg-red-600 p-5 md:p-6 rounded-2xl text-center shadow-lg border-6 border-black">
            <h2 className="text-lg md:text-xl font-bold mb-3 text-gray-300">SLJEDEĆA UTAKMICA</h2>
            <p className="text-xl md:text-2xl font-semibold text-white">SLOGA vs BORAC</p>
            <p className="text-amber-300 mt-2 text-sm md:text-base">10.05.2026 • 19:00</p>
          </div>

          <div className="bg-red-600 p-5 md:p-6 rounded-2xl text-center shadow-lg border-6 border-black">
            <h2 className="text-lg md:text-xl font-bold mb-3 text-gray-300">PRETHODNA UTAKMICA</h2>
            <p className="text-xl md:text-2xl font-semibold text-white">SLOGA 28 : 25 IZVIĐAČ</p>
            <p className="text-amber-300 mt-2 text-sm md:text-base">18.03.2026</p>
          </div>

          {timeLeft ? (
            <div className="flex justify-center gap-2 md:gap-4">
              {[
                { value: timeLeft.days,    label: "dana" },
                { value: timeLeft.hours,   label: "sati" },
                { value: timeLeft.minutes, label: "min"  },
                { value: timeLeft.seconds, label: "sek"  },
              ].map(({ value, label }) => (
                <div key={label} className="flex flex-col items-center bg-red-600 text-white p-2 md:p-4 rounded-2xl shadow-lg w-16 md:w-20 border-3 border-black">
                  <p className="text-2xl md:text-3xl font-extrabold">{value}</p>
                  <span className="text-xs md:text-sm">{label}</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center bg-red-600 p-4 rounded-2xl border-3 border-black">
              <p className="text-white font-bold text-base md:text-xl">⏱️ Utakmica je u toku ili je završena!</p>
            </div>
          )}

        </div>

        {/* DESNA STRANA - LIVE TABELA */}
        <div className="w-full max-w-sm lg:max-w-xs flex-shrink-0">
          <h2 className="text-center font-bold text-base md:text-lg mb-3 text-red-600 tracking-wider">
            🏆 PREMIJER LIGA BIH 2025/26
          </h2>

          <div className="overflow-hidden rounded-2xl border-4 border-red-600 shadow-xl">
            {loadingTabela ? (
              // Loading stanje
              <div className="bg-white py-10 flex flex-col items-center gap-3">
                <div className="w-8 h-8 border-4 border-red-600 border-t-transparent rounded-full animate-spin"/>
                <p className="text-sm text-gray-500">Učitavanje tabele...</p>
              </div>
            ) : (
              <table className="w-full text-xs md:text-sm text-black">
                <thead>
                  <tr className="bg-red-600 text-white">
                    <th className="py-2 px-2 text-left">#</th>
                    <th className="py-2 px-2 text-left">Tim</th>
                    <th className="py-2 px-1 text-center">U</th>
                    <th className="py-2 px-1 text-center">P</th>
                    <th className="py-2 px-1 text-center">R</th>
                    <th className="py-2 px-1 text-center">G</th>
                    <th className="py-2 px-1 text-center font-bold">Bod</th>
                  </tr>
                </thead>
                <tbody>
                  {tabela
                    .sort((a, b) => b.bod - a.bod)  // ← sortira od najviše do najmanje bodova
                    .map((row, index) => (
                      <tr
                        key={row.pos}
                        className={`border-b border-gray-200 ${
                          row.highlight
                            ? "bg-red-100 font-bold border-l-4 border-l-red-600"
                            : index % 2 === 0
                            ? "bg-gray-50"
                            : "bg-white"
                        }`}
                      >
                        <td className="py-2 px-2 text-gray-500">{index + 1}</td>  {/* ← pozicija iz index-a, ne iz pos */}
                        <td className="py-2 px-2 font-medium">{row.tim}</td>
                        <td className="py-2 px-1 text-center">{row.u}</td>
                        <td className="py-2 px-1 text-center">{row.p}</td>
                        <td className="py-2 px-1 text-center">{row.r}</td>
                        <td className="py-2 px-1 text-center">{row.g}</td>
                        <td className="py-2 px-1 text-center font-bold text-red-600">{row.bod}</td>
                      </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
          <p className="text-xs text-gray-400 text-center mt-2">U=utakmice · P=pobjede · R=remiji · G=gubici</p>
        </div>

      </div>
    </div>
  );
}

export default MatchComponent
