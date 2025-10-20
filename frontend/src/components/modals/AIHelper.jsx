import { PaperAirplaneIcon } from '@heroicons/react/24/solid'
import React from 'react'
import { logo } from '../../assets/assets'

const AIHelper = () => {
  
  return (
    <div className='w-full h-full bg-white py-2 px-4 rounded-lg shadow-2 flex flex-col'>

      <div className='flex items-center gap-2 w-full justify-center'>
        <img className='size-8' src={logo.logo_1} alt="" />
        StudBud AI Helper
      </div>

      <div className='w-full  bg-white-3 mt-4 p-2 flex-1 rounded-md overflow-auto relative flex flex-col space-y-2'>
        
        {/* Your Message  */}
        <div className='w-full'>
          <div className='flex flex-row-reverse w-full'>
            <div className='bg-white-1 p-2 rounded-md max-w-[80%]'>
                <p className='text-sm'></p>
            </div>
          </div>
        </div>

        {/* API response  */}
        <div className='w-full'>
          <div className='flex w-full'>
            <div className='bg-white-2 p-2 rounded-md max-w-[80%]'>
                <p className='text-sm'>
                  
                </p>
            </div>
          </div>
        </div>


        {/* Message Bubble  */}
        <div className='absolute bottom-2 bg-white h-24 rounded-md p-2 mx-2  inset-x-0 '>
            <textarea
              type="text"
              placeholder='Ask Studbud AI Helper...'
              className='w-full resize-none focus:outline-none focus:ring-1 focus:ring-dark-purple-text/20 px-2'
              />
              <div className='flex flex-row-reverse'>
                <div className='bg-white-3 p-1 border border-gray-950/10 rounded-md'>
                    <PaperAirplaneIcon className='size-4'></PaperAirplaneIcon>
                </div>
              </div>

        </div>
      </div>

    </div>
  )
}

export default AIHelper