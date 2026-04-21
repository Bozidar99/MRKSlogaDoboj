import React, { Children } from "react"
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
// router
import { createBrowserRouter, RouterProvider } from "react-router-dom"
//pages
import HomePage from "./pages/HomePage.jsx"
import About from "./pages/About.jsx"
import Contact from "./pages/Contact.jsx"
import Galery from "./pages/Galery.jsx"
import News from "./pages/News.jsx"
import Players from "./pages/Players.jsx"
//redux
import { Provider } from 'react-redux'
import { store } from './store/index.js'

const router = createBrowserRouter([
  //app router
  {
    path: "/",
    element: <App />,
    children:[
      {
        path: "/",
        element: <HomePage />
      },
      {
        path: "/about",
        element: <About />
      },
      {
        path: "/contact",
        element: <Contact />
      },
      {
        path: "/galery",
        element: <Galery />
      },
      {
        path: "/news",
        element: <News />
      },
      {
        path: "/players",
        element: <Players />
      }
    ]
  }

  //dashboard router
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
