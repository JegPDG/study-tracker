import React, { useContext, useState } from 'react'

import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import api from '../../services/api';

const AddNewSubject = (props) => {
  // Placed in SubjectsAll.jsx 
  // Need to navigate to the created subject


  const {handleAddNewSub} = props
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const {authToken} = useContext(AuthContext); 
  const navigate = useNavigate();

  const submitNewSubject = async(e) => {
    e.preventDefault();
    try {
      await api.post('subject/', 
        { name, description } 
      )
      console.log('Subject created')
      handleAddNewSub()
    } catch (error) {
      console.log(error.response?.data)
      alert("Error in submitting...")
      console.log('error in creating subject')
    }

  }

  const handleCancel = (e) => {
    setName('')
    setDescription('')
    handleAddNewSub

  }


  return (
      <div className='fixed inset-0 flex items-center justify-center bg-purple-1/70 bg-opacity-50 z-50 '>
        <div className='w-[65%] h-[60%] bg-white-1 rounded-md p-4'>
          <div className='flex w-full items-center flex-col'>
            <p className='font-bold text-4xl'>Create New Subject</p>

            <form 
              action="" 
              onSubmit={submitNewSubject}
              className='w-full flex items-center mt-4 flex-row'
              >
              <div className='w-full max-w-[70%] m-auto flex gap-4 flex-col'>

                <div className='w-full'>
                  <p className='text-xl opacity-60 font-medium'>Title</p>
                  <input 
                    type="text" 
                    placeholder='New subject...'
                    className='bg-white-2 w-full p-2 text-xl rounded-md'
                    onChange={(e) => setName(e.target.value)}

                    />
                </div>

                <div className='w-full'>
                  <p className='text-xl opacity-60 font-medium'>Description</p>
                  <textarea 
                    type="text" 
                    placeholder='New subject...'
                    className='bg-white-2 w-full h-[150px] p-2 text-md rounded-md resize-none'
                    onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                
                <div className='w-full flex flex-row-reverse gap-2'>

                  <button
                    onClick={handleAddNewSub}
                    className='pt-2 pb-2 pr-4 pl-4 border-2 text-medium border-purple-1 rounded-sm hover:bg-purple-1/20'
                    >
                    Cancel
                  </button>

                  <button 
                    type='submit'
                    className='pt-2 pb-2 pr-4 pl-4 bg-purple-1 text-white-1 rounded-sm hover:bg-purple-1/80'>
                      Submit 
                  </button>
                </div>

              </div>
            </form>

          </div>
        </div>
      </div>

  )
}

export default AddNewSubject