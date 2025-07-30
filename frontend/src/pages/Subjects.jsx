import React, { useContext, useEffect, useState } from 'react'
import api from '../services/api';
import {AuthContext} from '../context/AuthContext';
import './subjects.css'
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';
import search from '../assets/search-light.svg';


const Subjects= () => {
  const {authToken} = useContext(AuthContext);
  const [subjects, setSubjects] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false)

  // const navigateTo = (num) => {
  //   navigate(`/${num}`);
  // }

  useEffect( () => {
    const getSubjects = async () => {
      try {
        setLoading(true)
        const response = await api.get('subject/')
        setSubjects(response.data)
        console.log(response.data)
        
      } catch (error) {
        console.log('Did not get the subjects', error)
      } finally {
        setTimeout(() =>{
          setLoading(false)
        }, 1000)
      }
    }

    if(authToken) getSubjects();

  }, [authToken])



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
          <p className="subj-header">SUBJECTS</p>

          <div className="function-containers">
            <div className="search">
              <img src={search} alt="" />
              <p>Search...</p>
            </div>

            <button 
              onClick={ () => navigate('/subject/new')}
            >Add Subject</button>
          </div>

          <div className="subject-links">
            <p>Recently added</p>
            <p>Recently deleted</p>
          </div>

          <div className="subject-list-cont">
            <ul>
              {subjects.map((subject) => 
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
                          {subject.notes.map((note, i) => 
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