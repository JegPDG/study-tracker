import React, { useEffect, useState } from 'react'
import './newnote.css'
import { useNavigate, useParams } from 'react-router-dom'
import api from '../services/api'


const EditNote = () => {
  const {id} = useParams();
  const [note, setNote] = useState({ title: '', content: ''});
  const navigate = useNavigate();
 
  useEffect(() => {
    const getNote = async () => {
      try {
        const response = await api.get(`/note/${id}`)
        setNote({
          title: response.data.title || '',
          content: response.data.content || '',
        })
        
      } catch (error) {
        console.log('Unable to fetch Note', error.text)
      }
    }

    getNote();

  }, [id])

  const updateNote = async() => {
    try {
      await api.patch(
        `/note/${id}/`,
        note
      );
      console.log('Successfully updated')
      navigate(`/note/${id}`)
    } catch (error) {
      console.log('Failed to update', error.text)
    }
  }

    const handleChange = (e) => {
    
    const { name, value } = e.target;
    setNote((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    updateNote();
  }

  if (!note) return <p>Loading...</p>;


  return (
    <>
      <div className="new-note-main">
        <div className="newnote-container">
          <p className='note-subject-relate'> Subject title</p>
          <p className='note-created'> 00/00/00</p>

          <form 
            className='new-note-form' 
            onSubmit={handleSubmit}>
            <input 
              type="text" 
              className='note-title' 
              placeholder='Note Title'
              name='title'
              value={note.title}
              onChange={handleChange}
              />

            <div className='content-functions'>
              <button type='submit'>Update</button>
            </div>

            <textarea 
              className='content-input' 
              name="content" 
              id=""
              value={note.content}
              onChange={handleChange}

              ></textarea>
          </form>

        </div>
      </div>
    </>
  )
}

export default EditNote