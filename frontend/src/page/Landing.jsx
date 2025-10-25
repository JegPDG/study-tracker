import React from 'react'
import { images, logo } from '../assets/assets'
import { BookOpenIcon, CreditCardIcon, PencilSquareIcon } from '@heroicons/react/24/solid'
import { useNavigate } from 'react-router-dom'

const Landing = () => {
  const navigate = useNavigate();
  return (
    <div>
      {/* Navigation Bar  */}
      <div>
        <div className='h-[64px] bg-purple-1 flex relative'>
          <div className='flex max-w-[1020px] m-auto w-full justify-between items-center pl-4 pr-4'>
            
            <div className='flex items-center gap-2 '>
              <div>
                <img src={logo.logo_1} alt="" />
              </div>
              <p className='text-white-1 text-xl font-bold'>StudBud</p>
            </div>

            <div>
              <button 
                onClick={() => navigate('/auth/login')}
                className='pt-2 pb-2 pr-4 pl-4 cursor-pointer rounded-md bg-purple-500 font-medium text-white-1'>
                Login
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Section 1  */}
      <div className=' flex flex-col' style={{height: "calc(100vh - 64px)"}}>
        <div className='flex max-w-[1020px] m-auto w-full mt-8'>
          <div className='w-full'>
            <p className='text-5xl font-medium'>Unlock Your Full Potential with Smart Learning!</p>

            <p className='mt-4 opacity-70'>Organize your notes, and get some help with AI!</p>

            <div className='mt-12'>
              <button 
                onClick={() => navigate('/auth/sign-up')}
                className='pt-2 pb-2 pr-4 pl-4 cursor-pointer rounded-md bg-purple-500 hover:bg-purple-600 font-medium text-white-1 shadow-1'>
                Get Started
              </button>
            </div>
          </div>
          <div className='w-full p-2'>
            <img className='w-full h-full object-cover shadow-2' src={images.image_1} alt="" />
          </div>
        </div>


        <div className='flex flex-col max-w-[1020px]  m-auto w-full mt-8'>
          <p className='text-3xl font-medium'>Features</p>

          <div className='mt-4 flex space-x-4' >

            <div className='flex flex-col items-center'>
              <div className='bg-purple-3 p-4 rounded-[50%]'>
                <BookOpenIcon className='size-16'></BookOpenIcon>
              </div>
              <p className='mt-3 font-medium'>Organize your Subjects</p>

              <p className='text-sm opacity-60 text-center'>Keep your topics neatly arranged and easy to find — all in one place. Stay focused and manage your studies effortlessly.</p>
            </div>

            <div className='flex flex-col items-center'>
              <div className='bg-purple-3 p-4 rounded-[50%]'>
                <PencilSquareIcon className='size-16'></PencilSquareIcon>
              </div>
              <p className='mt-3 font-medium'>Create and Store Notes</p>

              <p className='text-sm opacity-60 text-center'>Capture your ideas, lessons, and key points instantly. Your notes are saved and ready whenever inspiration strikes.</p>
            </div>

            <div className='flex flex-col items-center'>
              <div className='bg-purple-3 p-4 rounded-[50%]'>
                <PencilSquareIcon className='size-16'></PencilSquareIcon>
              </div>
              <p className='mt-3 font-medium'>AI Study Assistant</p>

              <p className='text-sm opacity-60 text-center'>Get smart help from AI to summarize, explain, or improve your notes — learn faster and study smarter.</p>
            </div>

            <div className='flex flex-col items-center'>
              <div className='bg-purple-3 p-4 rounded-[50%]'>
                <CreditCardIcon className='size-16'></CreditCardIcon>
              </div>
              <p className='mt-3 font-medium'>Generate Flashcards</p>

              <p className='text-sm opacity-60 text-center'>Turn your notes into interactive flashcards automatically, or create your own for quick and effective review.</p>
            </div>

          </div>
        </div>
      </div>

    </div>
  )
}

export default Landing