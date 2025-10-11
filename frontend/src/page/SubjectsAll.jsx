import React, { useState } from 'react'
import { MagnifyingGlassIcon, PlusIcon } from '@heroicons/react/24/solid'
import NoteCard from '../components/NoteCard'
import { useNavigate } from 'react-router-dom';
import { useDebounce } from 'use-debounce';
import { useQuery } from '@tanstack/react-query';
import api from '../services/api';
import SubjectCard from '../components/SubjectCard';

const SubjectsAll = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("")
  const [debouncedSearch] = useDebounce(search, 1000);

  const buttonLinks = [
    {text: 'All'},
    {text: 'Recently added'},
    {text: 'Recently deleted'},

  ]

  const getSubjects = async () => {
    const res = await api.get(`subject/?search=${debouncedSearch}`)
    return res.data
  }

  const {data: subjects = [], isLoading, error} = useQuery({
    queryKey: ['subjects', debouncedSearch ],
    queryFn: getSubjects,
    keepPreviousData: true
  })


  // console.log("All Subjects data:", subjects)

  if(isLoading) {
    return(
      <div className='loading'>
        <span className='loader'></span>
      </div>
    )
  }

  return (
        <div className='pt-4 pl-8'>
      <div className=''>
        {/* Note title  */}
        <p className='text-4xl font-bold opacity-40'>SUBJECTS</p>
        
        {/* Buttons container  */}
        <div className='mt-2 flex gap-2'>
          {buttonLinks.map((button,i) =>{
            return(
              <button className='bg-purple-1 pt-2 pb-2 pr-4 pl-4 text-white-1 rounded-sm cursor-pointer hover:bg-purple-1/80 '>
                {button.text}
              </button>
            )}
          )}
        </div>

        {/* Search Container  */}
        <div className='mt-4 flex flex-row items-center gap-4'>
          <div className='bg-purple-1/10  pl-4 rounded-sm w-[350px] flex flex-row items-center'>
            <MagnifyingGlassIcon className='size-6'></MagnifyingGlassIcon>
            <input 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              type="text" 
              placeholder='Search note...' 
              className='w-full pt-2 pb-2 pl-2' />
          </div>

          <div className='flex gap-2 hover:bg-purple-2 bg-purple-1 pt-2 pb-2 pl-4 pr-4 rounded-sm cursor-pointer '>
            <PlusIcon className='size-6' fill='white'></PlusIcon>
            <p className='text-white-1'>Add New Subject</p>
          </div>
        </div>
        

        {/* Subject Cards  */}
        <div className='min-h-[600px] bg-white-3 mt-4 rounded-sm p-4 flex gap-4 flex-wrap'>
          {subjects?.map((subject, i) => {
            return (
              <div 
                key={i} 
                >
                <SubjectCard
                  name={subject.name}
                  description={subject.description}
                  notes={subject.notes}
                ></SubjectCard>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  )
}

export default SubjectsAll