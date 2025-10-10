import React from 'react'

const NoteCard = (props) => {
  const { title, content, updated_at, subject} = props

  return (
    <div className='bg-white-1 size-60 p-4 shadow-1 overflow-hidden transition-transform duration-300 hover:scale-105'>
      <p className='text-sm text-dark-purple-text/60'>{updated_at}</p>
      <p className='text-sm text-dark-purple-text/60 font-medium'>{subject}</p>

      <p className='mt-2 text-xl/tight font-bold limited-text'>{title}</p>

      <p className='text-sm mt-2 limited-text'>{content}</p>

    </div>
  )
}

export default NoteCard