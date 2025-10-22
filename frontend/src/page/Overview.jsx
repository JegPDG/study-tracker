import { BookOpenIcon, CreditCardIcon, MagnifyingGlassIcon, PencilSquareIcon } from '@heroicons/react/24/solid'
import { useQuery } from '@tanstack/react-query'
import React, { useContext } from 'react'
import api from '../services/api'
import SubjectCard from '../components/SubjectCard'
import NoteCard from '../components/NoteCard'
import { AuthContext } from '../context/AuthContext'

const Overview = () => {

  const { user } = useContext(AuthContext)

  const {data: subject = [], isLoading : subLoad, error : suberror} = useQuery({
    queryKey: ['subjects-overview'],
    queryFn: async() => {
      const res = await api.get(`/dashboard/subjects/`)
      return res.data
    },
    keepPreviousData: true
  })

  const {data: note = [], isLoading : noteLoad, error : noteerror} = useQuery({
    queryKey: ['notes-overview'],
    queryFn: async() => {
      const res = await api.get(`/dashboard/notes/`)
      return res.data
    },
    keepPreviousData: true
  })

  console.log("overview subject",subject)
  console.log("overview note", note)
  console.log("User", user)

  const {total_subjects} = subject
  const {totale_notes} = note

  return (
    <div className="pt-4 w-full pb-4">
      {/* Left & Right Section */}
      <div className="flex w-full max-w-full">
        {/* Left Side */}
        <div className="px-12 w-full shrink-0">
          <p className="text-4xl font-medium opacity-70">Welcome, <span className='font-bold text-purple-2'>{user?.username}</span>!</p>
          
          {/* Quick Search 
          <div className='mt-4'>
            <p className='text-xl font-medium'>Quick Search</p>
            <div className='relative w-[70%] bg-purple-2/20 rounded-md mt-2 shadow-2'>
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
          </div> */}



          {/* Overview */}
          <div className="mt-4">
            <p className="text-xl font-medium">Overview</p>
            <div className="grid grid-cols-3 gap-4 mt-2">
              {[
                { icon: <BookOpenIcon className="size-6" />, label: "Subjects", count: total_subjects},
                { icon: <PencilSquareIcon className="size-6" />, label: "Notes", count: totale_notes },
                { icon: <CreditCardIcon className="size-6" />, label: "Flashcards", count: 0 },
              ].map((item, i) => (
                <div key={i} className="bg-white-1 p-4 rounded-md shadow-2">
                  <div className="flex flex-col gap-2 items-center">
                    <div className="flex gap-2">
                      {item.icon}
                      <p className="font-medium">{item.label}</p>
                    </div>
                    <p>
                      <span className="text-4xl">{item.count}</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recently Opened Notes */}
          {/* <div className="mt-6">
            <p className="text-xl font-medium">Recent Notes</p>
            <div className="">
              <div className="grid grid-cols-2">
                {note.notes?.map((note, i) => (
                  <NoteCard
                    key={i}
                    noteID={note.id}
                    updated_at={note.updated_at}
                    title={note.title}
                    content={note.content}
                    subject={note.subject?.name}
                  />
                ))}
              </div>
            </div>
            
          </div> */}

          {/* Recently Opened Notes Original*/}
          <div className="mt-6">
            <p className="text-xl font-medium">Recent Notes</p>
            <div className="w-full overflow-x-scroll scrollbar-thin mt-4">
              <div className="flex flex-nowrap space-x-4 p-2">
                {note.notes?.map((note, i) => (
                  <NoteCard
                    key={i}
                    noteID={note.id}
                    updated_at={note.updated_at}
                    title={note.title}
                    content={note.content}
                    subject={note.subject?.name}
                  />
                ))}
              </div>
            </div>

          </div>

          {/* Recently Opened Subjects */}
          <div className="mt-6">
            <p className="text-xl font-medium">Recent Subjects</p>
            <div className="w-full overflow-x-scroll scrollbar-thin mt-4">
              <div className="flex flex-nowrap space-x-4 p-2">
                {subject.subjects?.map((subject, i) => (
                  <SubjectCard
                    key={i}
                    subID={subject.id}
                    name={subject.name}
                    description={subject.description}
                    notes={subject.notes}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="w-full shrink-0 hidden">
          Right side component
        </div>
      </div>
    </div>

  )
}

export default Overview