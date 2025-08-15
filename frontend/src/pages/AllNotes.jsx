import React, { useEffect, useState } from 'react'
import './allnotes.css'
import api from '../services/api'
import { useNavigate } from 'react-router-dom';
import search_light from '../assets/search-light.svg';
import { useQuery } from '@tanstack/react-query';


const AllNotes = () => {
  const navigate = useNavigate();
  const [allnote, setAllnotes] = useState(null);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("")

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

  const getNotes = async() => {
    const res = await api.get(`note/?search=${search}`)
    return res.data
  }

  const {data : notes = [], isLoading, error} = useQuery({
    queryKey: ["notes", search],
    queryFn: getNotes,
    keepPreviousData: true
  })

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

          <div className="function-containers">
            <div className="search">
              <img src={search_light} alt="" />
              <input type="text" placeholder='Search...'/>
            </div>
          </div>

          <div className="subject-links">
            <p>Recently added</p>
            <p>Recently deleted</p>
          </div>

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