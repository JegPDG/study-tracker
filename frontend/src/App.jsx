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
import SpecificSub from './pages/SpecificSub';
import NewNote from './pages/NewNote';
import Note from './pages/Note';
import EditNote from './pages/EditNote';
import AllNotes from './pages/AllNotes';
import SignUp from './pages/SignUp';
import DashLayout from './pages/Dashboard/DashLayout';

function App() {
  

  return (
    <>
      <Router>
        <Routes>
          <Route path='/login' element={<Login></Login>} ></Route>
          <Route path='/signup' element={<SignUp></SignUp>} ></Route>

          <Route element={<Layout></Layout>}> 

            <Route path='/subject' element={<Subjects></Subjects>}></Route>

            <Route path='/subject/new' element={<NewSubject></NewSubject>}></Route>

            <Route path='/subject/:id' element={<SpecificSub></SpecificSub>}></Route>

            <Route path='/subject/:id/newnote' element={<NewNote></NewNote>}></Route>

            <Route path='/note/:id' element={<Note></Note>}></Route>

            <Route path='/note/:id/edit' element={<EditNote></EditNote>}></Route>

            <Route path='/note' element={<AllNotes/>}></Route>

            <Route path='/dashboard' element={<DashLayout/>}></Route>

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
