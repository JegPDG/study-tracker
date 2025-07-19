import React, { useContext, useEffect, useState } from 'react'
import './newnote.css'
import { AuthContext } from '../context/AuthContext'
import { useNavigate, useParams } from 'react-router-dom';
import api from '../services/api'

const NewNote = () => {
  const {authToken} = useContext(AuthContext);
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
 
  return (
    <>
      <div className="new-note-main">
        <div className="newnote-container">
          <p className='note-subject-relate'> Subject title</p>
          <p className='note-created'> 00/00/00</p>

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