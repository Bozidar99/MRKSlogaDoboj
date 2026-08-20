import React from 'react'
import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { logoutAdmin } from '../store/authSlice'
import { MdDashboard, MdNewspaper, MdSportsHandball, MdPhoto, MdLogout, MdSportsScore, MdEmail } from 'react-icons/md'
import logo from '../assets/logo.png'

const sidebarLinks = [
  { to: "/dashboard/home",     label: "Dashboard", ikona: <MdDashboard size={20} />      },
  { to: "/dashboard/news",     label: "Vijesti",   ikona: <MdNewspaper size={20} />      },
  { to: "/dashboard/players",  label: "Igrači",    ikona: <MdSportsHandball size={20} /> },
  { to: "/dashboard/match",    label: "Utakmice",  ikona: <MdSportsScore size={20} />    },
  { to: "/dashboard/gallery",  label: "Galerija",  ikona: <MdPhoto size={20} />          },
  { to: "/dashboard/messages", label: "Poruke",    ikona: <MdEmail size={20} />          },
]

function Dashboard() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  function handleLogout() {
    dispatch(logoutAdmin())
    navigate("/login")
  }

  return (
    <div className="min-h-screen flex bg-gray-100">

      {/* SIDEBAR */}
      <div className="w-64 bg-black text-white flex flex-col justify-between py-6 px-4 fixed h-full">
        <div>
          {/* LOGO */}
          <div className="flex items-center gap-3 mb-10 px-2">
            <img src={logo} alt="logo" className="w-10" />
            <div>
              <p className="font-extrabold text-white text-sm">MRK SLOGA</p>
              <p className="text-gray-400 text-xs">Admin Panel</p>
            </div>
          </div>

          {/* LINKOVI */}
          <div className="flex flex-col gap-2">
            {sidebarLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-xl transition font-semibold text-sm ${
                    isActive
                      ? "bg-red-600 text-white"
                      : "text-gray-400 hover:bg-gray-800 hover:text-white"
                  }`
                }
              >
                {link.ikona}
                {link.label}
              </NavLink>
            ))}
          </div>
        </div>

        {/* LOGOUT */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:bg-red-600 hover:text-white transition font-semibold text-sm"
        >
          <MdLogout size={20} />
          Odjava
        </button>

      </div>

      {/* CONTENT */}
      <div className="flex-1 ml-64 p-8">
        <Outlet />
      </div>

    </div>
  )
}

export default Dashboard