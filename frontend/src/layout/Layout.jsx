import React, { useState } from 'react'
import Navbar from '../pages/Navbar'
import Sidebar from '../pages/Sidebar'
import { Outlet } from 'react-router-dom'
import '../pages/styles/layout.css'
import NavigationBar from '../components/NavigationBar'
import SideBar1 from '../components/SideBar1'
import { logo } from '../assets/assets'
import { PaperAirplaneIcon } from '@heroicons/react/24/solid'
import AIHelperContext from '../context/AIHelperContext'
import AIHelper from '../components/modals/AIHelper'

const Layout = () => {
  const [openAIhelp, setOpenAIhelp] = useState(false)



  return (
    <>
    <div className="layout flex w-full relative flex-col h-screen">
      {/* <Navbar></Navbar> */}
      <NavigationBar></NavigationBar>
      <div className="main-content w-full flex overflow-hidden h-full">
       {/* <Sidebar></Sidebar> */}
       <SideBar1></SideBar1>
       
       <div className="page-content w-full overflow-y-scroll flex relative pr-[400px]">
        <Outlet></Outlet>

        <div className='w-[400px] fixed right-6 top-24  h-[80vh]'>
          <AIHelper></AIHelper>
        </div>
        </div> 
      </div>
    </div>
    
    
    </>
  )
}

export default Layout