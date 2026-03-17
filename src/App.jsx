
import { Outlet } from 'react-router-dom'
import './App.css'
//component
import  NavBarComponent  from"./components/NavBarComponent"


function App() {


  return (
    <div>
      <NavBarComponent />
      <Outlet />
    </div>
  )
}

export default App
