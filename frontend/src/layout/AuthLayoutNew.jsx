import React from 'react'
import { illustrations, logo } from '../assets/assets'

const AuthLayoutNew = ({children}) => {
  return (
    <div className='flex h-screen overflow-hidden'>
      <div className='w-full h-screen flex flex-col bg-purple-1 items-center justify-center relative'>
        <div className=' absolute top-16 flex flex-col items-center'>
          <img className='size-12' src={logo.logo_1} alt="" />
          <p className='font-bold text-white-1'>StudBud</p>
        </div>

        <div className='mt-16 font-medium text-6xl text-white-1 '>Welcome,<br/> Study Buddy!</div>
        <div className='font-medium mt-4 text-xl text-white-1/60 '>Let's get learning</div>

        <img className='absolute bottom-[-15px]' src={illustrations.glasses} alt="" />
      </div>

      <div className='w-full'>
        {children}
      </div>
      
    </div>
  )
}

export default AuthLayoutNew