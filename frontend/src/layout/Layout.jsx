import React from 'react'
import Navbar from '../pages/Navbar'
import Sidebar from '../pages/Sidebar'
import { Outlet } from 'react-router-dom'
import '../pages/styles/layout.css'
import NavigationBar from '../components/NavigationBar'
import SideBar1 from '../components/SideBar1'

const Layout = () => {
  return (
    <>
    <div className="layout flex w-full relative flex-col h-screen">
      {/* <Navbar></Navbar> */}
      <NavigationBar></NavigationBar>
      <div className="main-content w-full flex overflow-hidden h-full">
       {/* <Sidebar></Sidebar> */}
       <SideBar1></SideBar1>
       
       <div className="page-content w-full overflow-y-scroll flex relative pr-[300px]">
        <Outlet></Outlet>

        <div className='w-[300px] fixed right-6 top-24 bg-white h-[80vh]'>
          AI Helper
        </div>
        </div> 
      </div>
    </div>
    
    
    </>
  )
}

export default Layout