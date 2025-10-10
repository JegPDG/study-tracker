import React from 'react'
import { logo } from '../assets/assets'
import { Bars3BottomLeftIcon } from '@heroicons/react/24/solid'

const NavigationBar = () => {
  return (
    <div className='h-[64px] bg-purple-2 flex '>
      <div className='flex justify-between items-center w-full pl-4 pr-4'>
        
        <div className='flex items-center gap-2 '>
          <div>
            <img src={logo.logo_1} alt="" />
          </div>
          <p className='text-white-1 text-xl font-bold'>StudBud</p>
        </div>


        <div>
          <Bars3BottomLeftIcon className='size-8' fill='white'></Bars3BottomLeftIcon>
        </div>
      </div>
    </div>
  )
}

export default NavigationBar