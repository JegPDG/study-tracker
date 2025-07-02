import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './app.css';
import Login from './pages/Login'
import Subjects from './pages/Subjects'
import Sidebar from './pages/Sidebar'
import Navbar from './pages/Navbar'
import NewSubject from './pages/NewSubject';
import Layout from './pages/Layout';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Router>
        <Routes>
          <Route path='/login' element={<Login></Login>} ></Route>

          <Route element={<Layout></Layout>}> 
            <Route path='/subject' element={<Subjects></Subjects>}></Route>
            <Route path='/subject/new' element={<NewSubject></NewSubject>}></Route>
          </Route>
        </Routes>
      </Router>

      {/* <Sidebar></Sidebar> */}
      {/* <Subjects></Subjects> */}
      {/* <Login></Login> */}
    </>
  )
}

export default App
