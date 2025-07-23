import React from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import { Outlet } from 'react-router-dom'
import './layout.css'

const Layout = () => {
  return (
    <>
    <div className="layout">
      <Navbar></Navbar>

      <div className="main-content">
       <Sidebar></Sidebar>
       <div className="page-content">
        <Outlet></Outlet>
        
        </div> 
      </div>
    </div>
    
    
    </>
  )
}

export default Layout