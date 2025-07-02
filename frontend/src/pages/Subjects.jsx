import React, { useContext, useEffect, useState } from 'react'
import api from '../services/api';
import {AuthContext} from '../context/AuthContext';
import './subjects.css'
import Sidebar from './Sidebar';
import Navbar from './Navbar';

const Subjects= () => {
  const {authToken} = useContext(AuthContext);
  const [subjects, setSubjects] = useState([]);


  useEffect( () => {
    const getSubjects = async () => {
      try {
        const response = await api.get('subject/')
        setSubjects(response.data)
        console.log(response.data)
        
      } catch (error) {
        console.log('Did not get the subjects', error)
      } 
    }

    if(authToken) getSubjects();

  }, [authToken])



  return (
    <>
      <div className="main-subjects-dash">
        <div className="subject-section">
          <p className="subj-header">SUBJECTS</p>
          <div className="subject-list-cont">
            <div className="subject-card">
              <p className="subject-title">Title</p>
              <div className="line"></div>
              <p className="subject-description">
                This is the sibject description of the subject.
              </p>

              <p className="note-head">NOTES</p>
              <div className="line"></div>
              <div className="notes-titles">
                <p>Note 1</p>
                <p>Note 2</p>
              </div>
            </div>

            <div className="subject-card">
              <p className="subject-title">Django REstFramework like bith</p>
              <div className="line"></div>
              <p className="subject-description">
                This is the sibject description of the subject. This is the sibject description of the subject.This is the sibject description of the subject.
              </p>

              <p className="note-head">NOTES</p>
              <div className="line"></div>
              <div className="notes-titles">
                <p>Note 1</p>
                <p>Note 2</p>
              </div>
            </div>

          </div>
        </div>

        <div className="subject-section">
          <p className="subj-header">RECENT NOTES</p>
          <div className="subject-list-cont">
            <div className="subject-card">
              <p className="subject-title">Title</p>
              <div className="line"></div>
              <p className="subject-description">
                This is the sibject description of the subject.
              </p>

              <p className="note-head">NOTES</p>
              <div className="line"></div>
              <div className="notes-titles">
                <p>Note 1</p>
                <p>Note 2</p>
              </div>
            </div>

            <div className="subject-card">
              <p className="subject-title">Django REstFramework like bith</p>
              <div className="line"></div>
              <p className="subject-description">
                This is the sibject description of the subject. This is the sibject description of the subject.This is the sibject description of the subject.
              </p>

              <p className="note-head">NOTES</p>
              <div className="line"></div>
              <div className="notes-titles">
                <p>Note 1</p>
                <p>Note 2</p>
              </div>
            </div>

          </div>
        </div>


      </div>
    </>  



  )
}

export default Subjects