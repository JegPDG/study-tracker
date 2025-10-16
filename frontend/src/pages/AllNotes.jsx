import React, { useEffect, useState } from 'react'
import './styles/allnotes.css'
import api from '../services/api'
import { useNavigate } from 'react-router-dom';
import search_light from '../assets/search-light.svg';
import { useQuery } from '@tanstack/react-query';
import { useDebounce } from 'use-debounce'


const AllNotes = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("")
  const [debouncedSearch] = useDebounce(search, 300)

  const getNotes = async() => {
    const res = await api.get(`note/?search=${debouncedSearch}`)
    return res.data
  }



  const {data : notes = [], isLoading, error} = useQuery({
    queryKey: ["notes", debouncedSearch],
    queryFn: getNotes,
    keepPreviousData: true
  })

  console.log(notes)

  return (
    <>
      {isLoading ? 
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
              <input 
                type="text" 
                placeholder='Search...'
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                />
            </div>
          </div>

          {/* <div className="subject-links">
            <p>Recently added</p>
            <p>Recently deleted</p>
          </div> */}

          <div className="allnote-container">
            <ul>
              {notes?.map((note) => 
                <li key={note?.id}>
                  <div 
                      onClick={ () => {
                        navigate(`/note/${note.id}`)
                      }}
                      className="note-card">
                        <p className="related-sub">
                          {note?.subject?.name}
                        </p>
                      <p className='allnote-title'>{note?.title}</p> 
                      <p className='allnote-content'>{note?.content}</p>
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