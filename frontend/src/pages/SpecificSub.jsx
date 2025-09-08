import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import './styles/specifisub.css'
import api from '../services/api'
import { AuthContext } from '../context/AuthContext'
import { Link } from 'react-router-dom'

import arrowback from '../assets/back-arrow.svg'

const SpecificSub = () => {
  let { id } = useParams();   
  const [subject, setSubject] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false)

  useEffect(
    () => {
      const getSubjDetail = async () => {
        try {
          setLoading(true)
          const response = await api.get(`/subject/${id}`)
          setSubject(response.data)
          console.log(response.data)

        } catch (error) {
          console.log(error)
        } finally {
          setTimeout(
            () => {setLoading(false)}, 500
          )
        }
      };

      getSubjDetail();

    }, [id])

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
      <div className="subject-detail">
        <div className="subject-container">
          <div className="top-controls">
            <button className='back-arrow'
              onClick={() => navigate('/subject')}
              >
              <img src={arrowback} alt="" />
            </button>

            <button
              className='delete-button'
              onClick={ async () => {
                if(window.confirm("Do you want to delete this Subject?")){
                  try {
                    await api.delete(`/subject/${id}/`)
                    console.log('Deleted the subject')
                    navigate('/subject/')
                  } catch (error) {
                    console.log("Unable to delete subject", error.text)
                  }
                } else{
                  alert("Did not delete the subject")
                }
              }}
              >Delete</button>
          </div> 
          <p className='view-indicator'>Notebook</p>
          <h1>{subject?.name}</h1>
          <p>
            {subject?.description}
          </p>
          
          <h2>Notes</h2>
          <div className="function-container">
            <Link  to={`/subject/${subject.id}/newnote`}>
              <button>Create New Note</button>
            </Link>

          </div>

          <div className='note-views'>
            <p>Recently Added </p>
            <p>Recently Viewed </p>
          </div>
          <div className="notes-container">
            <ul>
              {subject?.notes?.map((note, i) => 
                <li key={note.id}>
                    <div 
                      onClick={ () => {
                        navigate(`/note/${note.id}`)
                      }}
                      className="note-card">
                      <p className='note-title'>{note.title}</p> 
                      <p className='note-content'>{note.content}</p>
                    </div>
                </li>
              )}
            </ul>
          </div>


        </div>

      </div>
    )}
    </>
  )
}

export default SpecificSub