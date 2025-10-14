import { BookOpenIcon, CreditCardIcon, PencilSquareIcon } from '@heroicons/react/24/solid'
import React from 'react'

const Overview = () => {
  return (
    <div className='pl-12 pt-4'>
      {/* Left Side  */}
      <div className='flex w-full'>
        <div className='w-full'>
          <div>
            <p className='text-4xl font-medium'>Welcome, Name!</p>
          </div>

          {/* Overview  */}
          <div className='mt-8'>
            <p className='text-xl font-medium'>Overview</p>

            <div className='grid grid-cols-3 gap-4 mt-2'>

              <div className='bg-white-1 p-4 rounded-md shadow-2'>
                <div className='flex flex-col gap-2 items-center'>
                  <div className='flex gap-2'>
                    <BookOpenIcon className='size-6'></BookOpenIcon>
                    <p className=' font-medium'>Subjects</p>
                  </div>
                  <div>
                    <p> <span className='text-4xl'>12</span></p>
                  </div>
                </div>
              </div>

              <div className='bg-white-1 p-4 rounded-md shadow-2'>
                <div className='flex flex-col gap-2 items-center'>
                  <div className='flex gap-2'>
                    <PencilSquareIcon className='size-6'></PencilSquareIcon>
                    <p className=' font-medium'>Notes</p>
                  </div>
                  <div>
                    <p> <span className='text-4xl'>33</span></p>
                  </div>
                </div>
              </div>

              <div className='bg-white-1 p-4 rounded-md shadow-2'>
                <div className='flex flex-col gap-2 items-center'>
                  <div className='flex gap-2'>
                    <CreditCardIcon className='size-6'></CreditCardIcon>
                    <p className=' font-medium'>Flashcards</p>
                  </div>
                  <div>
                    <p> <span className='text-4xl'>33</span></p>
                  </div>
                </div>
              </div>


            </div>
          </div>


          {/* Recent Subjects  */}
          <div className='mt-8'>
            <p className='text-xl font-medium'>Recently Opened Subjects</p>

            <div className='flex flex-row mt-4'>

              <div
                className='h-[300px] w-[250px] bg-white-1 box-border p-4 overflow-hidden rounded-sm transition-transform duration-300 hover:scale-105'>
                <p className='font-bold text-2xl/tight'>Name</p>
                <p className='text-sm limited-text mt-2'>description</p>

                <p className='font-bold mt-4 '>Notes</p>
                <ul className='list-disc pl-4'>
                </ul>
              </div>



            </div>
          </div>


          {/* Recenlty Opened Notes  */}
          <div className='mt-8'>
            <p className='text-xl font-medium'>Recently Opened Subjects</p>

            <div className='flex flex-row mt-4'>

              <div
                className='h-[300px] w-[250px] bg-white-1 box-border p-4 overflow-hidden rounded-sm transition-transform duration-300 hover:scale-105'>
                <p className='font-bold text-2xl/tight'>Name</p>
                <p className='text-sm limited-text mt-2'>description</p>

                <p className='font-bold mt-4 '>Notes</p>
                <ul className='list-disc pl-4'>
                </ul>
              </div>



            </div>
          </div>



        </div>

        <div className='min-w-[400px]'>
          Right
        </div>
      </div>
    </div>
  )
}

export default Overview