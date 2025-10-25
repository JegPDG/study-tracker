import { ArrowDownLeftIcon, ArrowLeftIcon, MagnifyingGlassIcon, PlusIcon } from '@heroicons/react/24/solid'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import React, { useState } from 'react'
import api from '../services/api'
import { useNavigate, useParams } from 'react-router-dom'
import NoteCard from '../components/NoteCard'


const SubjectDetail = () => {
  const { subjectId } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient(); 

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

  // Delete
  const deleteSubjectMutation = useMutation({
    mutationFn: async (id) => {
      await api.delete(`/subject/${id}/`);
    },
    onSuccess: () => {
      // Invalidate ALL related queries
      queryClient.invalidateQueries(['subjects']);
      queryClient.invalidateQueries(['notes']);
      queryClient.invalidateQueries(['recentlyOpenedNotes']);
      
      navigate('/subjects/');
    },
    onError: (error) => {
      console.error('Delete failed:', error);
      alert('Failed to delete subject');
    }
  });

  const handleDelete = () => {
    const message = 'Delete this subject and ALL its notes? This cannot be undone.';
    if (window.confirm(message)) {
      deleteSubjectMutation.mutate(subjectId);
    }
  };

    
    // Handle back navigation
    const handleBack = () => {
      if (subjectId) {
        navigate(`/subjects/`);
      } else {
        navigate(-1);
      }
    };

  

  return (
      <div className='pt-4 pl-8 w-full'>

        {/* Delete and Back buttons  */}
        <div className='flex flex-row justify-between '>
          <div 
            onClick={handleBack}
            className='hover:bg-purple-3 bg-purple-2 inline-block p-2 rounded-sm'>
            <ArrowLeftIcon className='size-6' fill='white'></ArrowLeftIcon>
          </div>

          <div className='mr-4'>
            <button 
              onClick={handleDelete} 
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
            <div className='relative w-[300px] bg-purple-2/20 rounded-md'>
              <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                <MagnifyingGlassIcon className='size-6'></MagnifyingGlassIcon>
              </div>
              <input 
                // value={search}
                // onChange={(e) => setSearch(e.target.value)}
                type="text" 
                placeholder='Search note...' 
                className='w-full pt-2 pb-2  block pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent' />
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