import React, { useEffect, useState } from 'react'
import './allnotes.css'
import api from '../services/api'
import { useNavigate } from 'react-router-dom'

const AllNotes = () => {
  const navigate = useNavigate();
  const [allnote, setAllnotes] = useState(null);
  const [loading, setLoading] = useState(false)

  useEffect( () => {
    const getAllnotes = async () => {
      try {
        setLoading(true);
        const response = await api.get('note/')
        setAllnotes(response.data)

      } catch (error) {
        console.log('failed to get all notes')
      } finally {
        setTimeout(() => {
        setLoading(false);
      }, 1000);
      }
    }

    getAllnotes();
  }, [])


  return (
    <>
      {loading ? 
      (
        <div className="loading">
          <span className="loader"></span>
        </div>
      )
      :
      (
      <div className="main-subjects-dash">
        <div className="subject-section">
          <p className="subj-header">NOTES</p>

          <div className="allnote-container">
            <ul>
              {allnote?.map((allnote) => 
                <li key={allnote?.id}>
                  <div 
                      onClick={ () => {
                        navigate(`/note/${note.id}`)
                      }}
                      className="note-card">
                        <p className="related-sub">
                          {allnote?.subject?.name}
                        </p>
                      <p className='allnote-title'>{allnote?.title}</p> 
                      <p className='allnote-content'>{allnote?.content}</p>
                    </div>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div> 
      )
      }

    </>
  )
}

export default AllNotes