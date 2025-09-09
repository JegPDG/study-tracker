import React, { useContext, useEffect, useState } from 'react'
import api from '../services/api';
import {AuthContext} from '../context/AuthContext';
import './styles/subjects.css'
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';
import search_light from '../assets/search-light.svg';
import { useQuery } from '@tanstack/react-query';
import { useDebounce } from 'use-debounce';


const Subjects= () => {
  const [search, setSearch] = useState('');
  const [debouncedSearch] = useDebounce(search, 300);
  const navigate = useNavigate();

  const getSubjects = async () => {
    const res = await api.get(`subject/?search=${debouncedSearch}`)
    return res.data
  }

  const {data: subjects = [], isLoading, error} = useQuery({
    queryKey: ['subjects', debouncedSearch ],
    queryFn: getSubjects,
    keepPreviousData: true
  })


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
          <p className="subj-header">SUBJECTS</p>

          <div className="function-containers">
            <div className="search">
              <img src={search_light} alt="" />
              <input 
                type="text"
                placeholder='Search...'
                value={search}
                onChange={(e) => setSearch(e.target.value)} />
            </div>

            <button 
              onClick={ () => navigate('/subject/new')}
            >Add Subject</button>
          </div>

          {/* <div className="subject-links">
            <p>Recently added</p>
            <p>Recently deleted</p>
          </div> */}

          <div className="subject-list-cont">
            <ul>
              {subjects?.map((subject) => 
                <li key={subject.id}>
                  <div 
                  onClick={() => {
                    console.log(subject)
                    navigate(`/subject/${subject.id}`);
                  }}
                  className="subject-card">
                    <p className="subject-title">{subject.name}</p>
                    <div className="line"></div>
                    <p className="subject-description">
                      {subject.description}
                    </p>

                    <p className="note-head">NOTES</p>
                    <div className="line"></div>
                    <div className="notes-titles">
                        <ul>
                          {subject?.notes?.map((note, i) => 
                            <li key={note.id}>
                               <p>{note.title}</p> 
                            </li>
                          )}
                        </ul>
                    </div>
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

export default Subjects