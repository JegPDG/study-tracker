import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import './specifisub.css'
import api from '../services/api'
import { AuthContext } from '../context/AuthContext'
import { Link } from 'react-router-dom'

const SpecificSub = () => {
  let { id } = useParams();
  const [subject, setSubject] = useState([]);
  const {authtoken} = useContext(AuthContext)

  useEffect(
    () => {
      const getSubjDetail = async () => {
        try {
          const response = await api.get(`/subject/${id}`)
          setSubject(response.data)
          console.log(response.data)

        } catch (error) {
          console.log(error)
        }
      };

      getSubjDetail();

    }, [id])



  const placeholder = [
    {
      title: 'Bilat na mabaho',
      content: 'Sobrang baho ansakit sa ilong. pagamot mo na yan'
    },
      {
      title: 'CS01: Mathematics of the Modern World by Jane the birkin pr pinaslang ni lapu',
      content: 'Sobrang baho ansakit sa ilong. pagamot mo na yan.Sobrang baho ansakit sa ilong. pagamot mo na yanSobrang baho ansakit sa ilong. pagamot mo na yanSobrang baho ansakit sa ilong. pagamot mo na yanSobrang baho ansakit sa ilong. pagamot mo na yan'
    }
  ]
  
  return (
    <>
      <div className="subject-detail">
        <div className="subject-container">
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
                  <div className="note-card">
                    <p className='note-title'>{note.title}</p> 
                    <p className='note-content'>{note.content}</p>
                  </div>
                </li>
              )}
            </ul>
          </div>


        </div>

      </div>
    
    </>
  )
}

export default SpecificSub