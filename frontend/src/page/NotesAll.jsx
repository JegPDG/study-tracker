import React, { useState } from 'react'
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'
import NoteCard from '../components/NoteCard'
import { useNavigate } from 'react-router-dom';
import { useDebounce } from 'use-debounce';
import { useQuery } from '@tanstack/react-query';
import api from '../services/api';

const NotesAll = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("")
  const [debouncedSearch] = useDebounce(search, 1000)

  const getNotes = async() => {
    const res = await api.get(`note/?search=${debouncedSearch}`)
    return res.data
  }

  const {data : notes = [], isLoading, error} = useQuery({
    queryKey: ["notes", debouncedSearch],
    queryFn: getNotes,
    keepPreviousData: true
  })

  console.log("Notes All data:", notes)

  return (
    <div className='pt-4 pl-8 w-full'>
      <div className=''>
        {/* Note title  */}
        <p className='text-4xl font-bold opacity-40'>NOTES</p>
        
        {/* Buttons container  */}
        {/* <div className='mt-2 flex gap-2'>
          <button className='bg-purple-1 pt-2 pb-2 pr-4 pl-4 text-white-1 rounded-sm cursor-pointer hover:bg-purple-1/80 '>
            All
          </button>

          <button className='bg-purple-1 pt-2 pb-2 pr-4 pl-4 text-white-1 rounded-sm cursor-pointer hover:bg-purple-1/80 '>
            Recently added
          </button>

          <button className='bg-purple-1 pt-2 pb-2 pr-4 pl-4 text-white-1 rounded-sm cursor-pointer hover:bg-purple-1/80 '>
            Recently deleted
          </button>
        </div> */}

        {/* Search Container  */}
        <div className='mt-4'>
          <div className='relative w-[300px] bg-purple-2/20 rounded-md'>
            <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
              <MagnifyingGlassIcon className='size-6'></MagnifyingGlassIcon>
            </div>
            <input 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              type="text" 
              placeholder='Search note...' 
              className='w-full pt-2 pb-2 block pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent' />
          </div>
        </div>
        
        <div className='min-h-[600px] bg-white-3 mt-4 mr-4 rounded-sm p-4 w-full flex gap-4 flex-wrap'>
          {notes?.map((note, i) => {
            return (
              <div 
                key={i} 
                >
                <NoteCard
                  noteID={note.id}
                  updated_at={note.updated_at}
                  title={note.title}
                  content={note.content}
                  subject={note.subject?.name}
                ></NoteCard>
              </div>
            );
          })}
          
        </div>
      </div>
    </div>
  )
}

export default NotesAll