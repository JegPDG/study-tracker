import React, { useEffect, useState } from 'react'
import './styles/newnote.css'
import api from '../services/api'
import { useNavigate, useParams } from 'react-router-dom'

import arrowback from '../assets/back-arrow.svg'

const Note = () => {
  const {id} = useParams();
  const [note, setNote] = useState(null);
  const navigate = useNavigate();

  useEffect( () => {
     const getNote = async () => {
    try {
      const response = await api.get(`note/${id}`)
      setNote(response.data)
      console.log("Note api", response.data)

    } catch (error) {
      console.log('Error in getting note', error.text)
    }
  };
  
  getNote();

  }, [id])

  const handleDelete = async () => {
    if(window.confirm('Do you want to delete the subject?')){
      try {
      await api.delete(`/note/${id}/`)
      navigate(`/subject/${note.subject.id}`)
      console.log('Subject deleted')
      } catch (error) {
        console.log('Unable to delete', error.text)
      }
      
    } else{
      alert("Subject not deleted")
    }

  }
 


  return (
    <>
      <div className="new-note-main">
        <div className="newnote-container">
          <div className="top-controls">
            <button className='back-arrow'
              onClick={() => navigate(`/subject/${note?.subject.id}`)}
              >
              <img src={arrowback} alt="" />
            </button>
          </div>

          <p className='note-subject-relate'>{note?.subject.name}</p>
          <p className='note-created'>{note?.updated_at}</p>
          
          <h1 className='note-title-h1'>{note?.title}</h1>

          <div className='content-functions'>
            <button 
              type='submit'
              onClick={() => navigate(`/note/${id}/edit`)
              }
            >Edit</button>

            <button
              onClick={handleDelete}
            
            >Delete</button>
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