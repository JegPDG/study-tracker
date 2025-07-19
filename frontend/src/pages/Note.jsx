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
      console.log("Note api", response.data)

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
          <p className='note-subject-relate'>{note?.subject.name}</p>
          <p className='note-created'>{note?.updated_at}</p>
          
          <h1 className='note-title-h1'>{note?.title}</h1>

          <div className='content-functions'>
            <button 
              type='submit'
              onClick={() => {
                navigate(`/note/${id}/edit`)
              }}
            >Edit</button>

            <button
              onClick={ async () => {
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
              }}
            
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