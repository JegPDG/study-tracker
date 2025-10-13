import { ArrowDownLeftIcon, ArrowLeftIcon, MagnifyingGlassIcon, PlusIcon } from '@heroicons/react/24/solid'
import { useQuery } from '@tanstack/react-query'
import React, { useState } from 'react'
import api from '../services/api'
import { useNavigate, useParams } from 'react-router-dom'
import NoteCard from '../components/NoteCard'


const SubjectDetail = () => {
  const { subjectId } = useParams();
  const navigate = useNavigate();

  const getSubjDetail = async () => {
    const response = await api.get(`/subject/${subjectId}`)
    return response.data
  }

  const {data: subjectDetail = [], isLoading, error} = useQuery({
    queryKey: ['subjectDetail'],
    queryFn: getSubjDetail,
    keepPreviousData: true
  })

  console.log(error)
  console.log( "Subject detail",subjectDetail)

  const buttonLinks = [
    {text: 'All'},
    {text: 'Recently added'},
    {text: 'Recently deleted'},
  ]


  return (
      <div className='pt-4 pl-8'>

        {/* Delete and Back buttons  */}
        <div className='flex flex-row justify-between '>
          <div className='hover:bg-purple-3 bg-purple-2 inline-block p-2 rounded-sm'>
            <ArrowLeftIcon className='size-6' fill='white'></ArrowLeftIcon>
          </div>

          <div className='mr-4'>
            <button  
              className='bg-red-400 hover:bg-red-500 box-border  border-red-700 p-2 rounded-sm text-white-1 '>
                Delete
            </button>
          </div>
        </div>


        <div className='mt-4'>
          <p className='text-4xl font-medium'>{subjectDetail?.name}</p>

          <p className='mt-2'>{subjectDetail?.description}</p>
        </div>

        <div className='h-[2px] bg-purple-1/40 mt-9 mr-4'></div>

        <div className='mt-2'>
          <p className='text-xl font-medium opacity-70'>NOTES</p>

          {/* Buttons container  */}
          {/* Will probs turn into component  */}
          <div className='mt-2 flex gap-2'>
            {buttonLinks.map((button,i) =>{
              return(
                <button 
                  key={i}
                  className='bg-purple-1 pt-2 pb-2 pr-4 pl-4 text-white-1 rounded-sm cursor-pointer hover:bg-purple-1/80 '>
                  {button.text}
                </button>
              )}
            )}
          </div>

          <div className='mt-4 flex flex-row items-center gap-4'>
            <div className='bg-purple-1/10  pl-4 rounded-sm w-[350px] flex flex-row items-center'>
              <MagnifyingGlassIcon className='size-6'></MagnifyingGlassIcon>
              <input 
                // value={search}
                // onChange={(e) => setSearch(e.target.value)}
                type="text" 
                placeholder='Search note...' 
                className='w-full pt-2 pb-2 pl-2' />
            </div>

            <div 
              onClick={() => navigate(`/subjects/${subjectDetail?.id}/notes/new`)}
              className='flex gap-2 hover:bg-purple-2 bg-purple-1 pt-2 pb-2 pl-4 pr-4 rounded-sm cursor-pointer '>
              <PlusIcon className='size-6' fill='white'></PlusIcon>
              <p className='text-white-1'>Add New Note</p>
            </div>
          </div>
        </div>

        <div className='min-h-[350px] bg-white-3 mt-4 mr-4 rounded-sm p-4 flex gap-4 flex-wrap'>
            {subjectDetail?.notes?.map((note,i) => {
              return(
                <div
                  key={i}
                  >
                  <NoteCard
                    updated_at={note.updated_at}
                    title={note.title}
                    content={note.content}
                    subject={note.subject?.name}
                    noteID={note.id}
                    >
                  </NoteCard>
                </div>
              )
            })}
        </div>
      </div>
  )
}

export default SubjectDetail