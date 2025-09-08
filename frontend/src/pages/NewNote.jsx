import React, { useContext, useEffect, useState } from 'react'
import './styles/newnote.css'
import { AuthContext } from '../context/AuthContext'
import { useNavigate, useParams } from 'react-router-dom';
import api from '../services/api'

import arrowback from '../assets/back-arrow.svg'


const NewNote = () => {
  const {authToken} = useContext(AuthContext);
  const [subject, setSubject] = useState(null);
  const [newNote, setNewNote] = useState(null);
  const navigate = useNavigate();
  const {id} = useParams();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const postNewNote = async (e) => {
    e.preventDefault();
    
    try {
      await api.post(
        '/note/', 
        { title, 
          content,
          subject_id: parseInt(id),
        },
      );

      navigate(`/subject/${id}`)      
    } catch (error) {
      console.log('Failed in saving the New Note', error.text)
    }
  }

  useEffect(() => {
    const getSubject = async ( ) => {
      try {
        const response = await api.get(`/subject/${id}`)
        setSubject(response.data)
      } catch (error) {
        console.log("Failed to fetch subject")
      }
    }

    getSubject();
    
  }, [id])
 
  return (
    <>
      <div className="new-note-main">
        <div className="newnote-container">
          <div className="top-controls">
            <button className='back-arrow'
              onClick={() => navigate(-1)}
              >
              <img src={arrowback} alt="" />
            </button>
          </div>
          
          <div className="note-subject-relate">{subject?.name}</div>

          <form 
            className='new-note-form' 
            onSubmit={postNewNote}>
            <input 
              type="text" 
              className='note-title' 
              placeholder='Note Title'
              value={title}
              onChange={ (e) => {
                setTitle(e.target.value);
              }}
              />

            <div className='content-functions'>
              <button type='submit'>Save</button>
            </div>

            <textarea 
              className='content-input' 
              name="" 
              id=""
              value={content}
              onChange={ (e) => {
                setContent(e.target.value);
              }}
              ></textarea>
          </form>

        </div>
      </div>
    </>
  )
}

export default NewNote