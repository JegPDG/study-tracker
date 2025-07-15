import React, { useEffect, useState } from 'react'
import './newnote.css'
import api from '../services/api'
import { useNavigate, useParams } from 'react-router-dom'



const Note = () => {
  const {id} = useParams();
  const [note, setNote] = useState(null);
  const navigate = useNavigate();

  useEffect( () => {
     const getNote = async () => {
    try {
      const response = await api.get(`note/${id}`)
      setNote(response.data)

    } catch (error) {
      console.log('Error in getting note', error.text)
    }
  };
  
  getNote();

  }, [id])

 


  return (
    <>
      <div className="new-note-main">
        <div className="newnote-container">
          <p className='note-subject-relate'></p>
          <p className='note-created'> 00/00/00</p>
          
          <h1 className='note-title-h1'>{note?.title}</h1>

          <div className='content-functions'>
            <button 
              type='submit'
              onClick={() => {
                navigate(`/note/${id}/edit`)
              }}
            >Edit</button>
          </div>


          <p className='note-content-p'>
            {note?.content}
          </p>

        </div>
      </div>
    </>
  )
}

export default Note