import React, { useContext, useState } from 'react'
import { logo } from '../assets/assets'
import { ArrowLeftStartOnRectangleIcon, Bars3BottomLeftIcon } from '@heroicons/react/24/solid'
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const NavigationBar = () => {
  const {logoutUser, user} = useContext(AuthContext);
  const navigate = useNavigate();
  const [openBar, setOpenBar] = useState(false)

  const handleOpenBars = () => {
    setOpenBar(prev => !prev)
  }

  const logout = () => {
    logoutUser()
    navigate('/')
  }

  return (
    <div className='h-[64px] bg-purple-2 flex relative'>
      <div className='flex justify-between items-center w-full pl-4 pr-4'>
        
        <div className='flex items-center gap-2 '>
          <div>
            <img src={logo.logo_1} alt="" />
          </div>
          <p className='text-white-1 text-xl font-bold'>StudBud</p>
        </div>

        {openBar && (
          <div className='absolute right-2 top-16 w-[200px] bg-white-1 shadow-2 p-2 rounded-md slide-up z-50'>
            <div 
              onClick={logout}
              className='flex space-x-1 cursor-pointer hover:bg-purple-3 p-2 rounded-sm'>
              <ArrowLeftStartOnRectangleIcon className='size-6'></ArrowLeftStartOnRectangleIcon>
              <p>Logout</p>
            </div>
          </div>
        )}

        <div 
          onClick={handleOpenBars}
          className='cursor-pointer'>
          <Bars3BottomLeftIcon className='size-8' fill='white'></Bars3BottomLeftIcon>
        </div>
      </div>
    </div>
  )
}

export default NavigationBar