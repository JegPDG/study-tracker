import React, { useState } from 'react'
import { MagnifyingGlassIcon, PlusIcon } from '@heroicons/react/24/solid'
import NoteCard from '../components/NoteCard'
import { useNavigate } from 'react-router-dom';
import { useDebounce } from 'use-debounce';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import api from '../services/api';
import SubjectCard from '../components/SubjectCard';
import AddNewSubject from '../components/modals/AddNewSubject';

const SubjectsAll = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("")
  const [debouncedSearch] = useDebounce(search, 1000);
  const [newsubject, setNewSubject] = useState(false);
  const queryClient = useQueryClient()

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

  const handleAddNewSub = () => {
    setNewSubject(false)
  }


  // console.log("All Subjects data:", subjects)

  if(isLoading) {
    return(
      <div className='loading'>
        <span className='loader'></span>
      </div>
    )
  }

  return (
    <div className='relative w-full'>
      
      {/* New Subject modal  */}
      {newsubject && (
        <AddNewSubject
          handleAddNewSub={handleAddNewSub}
        ></AddNewSubject>
      )}

      <div className='pt-4 pl-8 w-full'>
        <div className=''>
          {/* Note title  */}
          <p className='text-4xl font-bold opacity-40'>SUBJECTS</p>
          
          {/* Buttons container  */}
          {/* <div className='mt-2 flex gap-2'>
            {buttonLinks.map((button,i) =>{
              return(
                <button key={i} className='bg-purple-1 pt-2 pb-2 pr-4 pl-4 text-white-1 rounded-sm cursor-pointer hover:bg-purple-1/80 '>
                  {button.text}
                </button>
              )}
            )}
          </div> */}

          {/* Search Container  */}
          <div className='mt-4 flex flex-row items-center gap-4'>
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

            <div 
              onClick={() => setNewSubject(true)}
              className='flex gap-2 hover:bg-purple-2 bg-purple-1 pt-2 pb-2 pl-4 pr-4 rounded-sm cursor-pointer '>
              <PlusIcon className='size-6' fill='white'></PlusIcon>
              <p className='text-white-1'>Add New Subject</p>
            </div>
          </div>
          

          {/* Subject Cards  */}
          <div className='min-h-[600px] bg-white-3 mt-4 mr-4 rounded-sm p-4 flex gap-4 flex-wrap'>
            {subjects?.map((subject, i) => {
              return (
                <div 
                  key={i} 
                  >
                  <SubjectCard
                    subID={subject.id}
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
    </div>
  )
}

export default SubjectsAll