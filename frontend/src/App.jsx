import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './app.css';
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Sidebar from './pages/Sidebar'
import Navbar from './pages/Navbar'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="main-dash">
        <Sidebar></Sidebar>

        <div className="dash-nav">
          <Navbar></Navbar>
        </div>

      </div>
      {/* <Sidebar></Sidebar> */}
      {/* <Dashboard></Dashboard> */}
      {/* <Login></Login> */}
    </>
  )
}

export default App
