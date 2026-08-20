import React from "react"
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
// pages
import HomePage from "./pages/HomePage.jsx"
import About from "./pages/About.jsx"
import Contact from "./pages/Contact.jsx"
import Galery from "./pages/Galery.jsx"
import News from "./pages/News.jsx"
import Players from "./pages/Players.jsx"
import Login from "./pages/LogInPage.jsx"
// dashboard
import Dashboard from "./pages/Dashboard.jsx"
import DashboardHome from "./pages/DashboardHome.jsx"
import DashboardNews from "./pages/DashboardNews.jsx"
import DashboardPlayers from "./pages/DashboardPlayers.jsx"
import DashboardGallery from "./pages/DashboardGallery.jsx"
import DashboardMatch from "./pages/DashboardMatch.jsx"
import DashboardMessages from "./pages/DashboardMessages.jsx"
import ProtectedRoute from "./components/ProtectedRoute.jsx"
// redux
import { Provider } from 'react-redux'
import { store } from './store/index.js'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/",        element: <HomePage /> },
      { path: "/about",   element: <About />    },
      { path: "/contact", element: <Contact />  },
      { path: "/galery",  element: <Galery />   },
      { path: "/news",    element: <News />     },
      { path: "/players", element: <Players />  },
      { path: "/login",   element: <Login />    },
    ]
  },
  // Dashboard — zaštićen, samo za ulogovane admine (ProtectedRoute je "pathless" layout)
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
        children: [
          { path: "home",    element: <DashboardHome />    },
          { path: "news",    element: <DashboardNews />    },
          { path: "players", element: <DashboardPlayers /> },
          { path: "match",   element: <DashboardMatch />   },
          { path: "gallery", element: <DashboardGallery /> },
          { path: "messages", element: <DashboardMessages /> },
        ]
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
)