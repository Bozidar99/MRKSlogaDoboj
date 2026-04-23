
import { Outlet } from 'react-router-dom'
import './App.css'
//component
import  NavBarComponent  from"./components/NavBarComponent"
import FooterComponent from './components/FooterComponent'


function App() {


  return (
    <div>
      <NavBarComponent />
      <Outlet />
      <FooterComponent /> 
    </div>
  )
}

export default App
