import React from 'react'

const SubjectCard = (props) => {
  const {name, description, notes } = props

  return (
    <div 
      className='h-[300px] w-[250px] bg-white-1 box-border p-4 overflow-hidden rounded-sm transition-transform duration-300 hover:scale-105'>
      <p className='font-bold text-2xl/tight'>{name}</p>
      <p className='text-sm limited-text mt-2'>{description}</p>

      <p className='font-bold mt-4 '>Notes</p>
      <ul className='list-disc pl-4'>
        {notes?.map((note, i) => 
          <li 
            className='text-sm/tight'
            key={i}>
            {note.title}
          </li>
        )}
      </ul>
    </div>
  )
}

export default SubjectCard