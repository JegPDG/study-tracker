import React, { useContext, useState } from 'react'
import './newsubject.css'
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const NewSubject = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const {authToken} = useContext(AuthContext)
  const navigate = useNavigate();

  const submitNewSubject = async(e) => {
    e.preventDefault();
    try {
      await api.post('subject/', 
        { name, description } 
      )
      console.log('Subject created')
      navigate('/subject')
    } catch (error) {
      console.log(error.response?.data)
      console.log('error in creating subject')
    }

  }

  return (
   <>
   <div className="main-new-subject">
      <div className="new-subject-page">
        <p className='sub-heading'>Create new subject</p>
        <div className="form-content">
          <form onSubmit={submitNewSubject}>
            <p className='sub-heading'>Subject title</p>
            <input className="input-title-card"
                  placeholder='New Subject title'
                  type='text'
                  onChange={(e) => setName(e.target.value)}
                  >
            </input>

            <p className='sub-heading'>Description</p>
            <input className="input-description-card"
                  placeholder='Description'
                  type='text'
                  onChange={(e) => setDescription(e.target.value)}

              >
            </input>

            <div className="but-cont">
              <button type='submit'>Save Subject</button>
            </div>
          </form>





        </div>



      </div>
   </div>
   </>
  )
}

export default NewSubject