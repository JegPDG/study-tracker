import React from 'react'
import './dashboard.css'

import subject_icon from '../../assets/subjects.svg'
import plus_sign from '../../assets/plus-sign.svg'

const DashLayout = () => {

  const placeholder = [
    {title:"Django rest",
      number: 3,
      date: '09/31/25'
    },
     {title:"Django rest",
      number: 3,
      date: '09/31/25'
    },
     {title:"Django rest",
      number: 3,
      date: '09/31/25'
    },
     {title:"Django rest",
      number: 3,
      date: '09/31/25'
    },
     {title:"Django rest",
      number: 3,
      date: '09/31/25'
    }
  ]

  const asignment = [
    {
      title: "Homework number 1",
      date: "10, July 2025 10:30 AM",
      status: "In Progress"
    },
     {
      title: "Homework number 1",
      date: "10, July 2025 10:30 AM",
      status: "In Progress"
    },
     {
      title: "Homework number 1",
      date: "10, July 2025 10:30 AM",
      status: "In Progress"
    }
  ]

  return (
    <>
     <div className="dashboard-grid">

      <div className="subjects-card">
        <div className="dash-titles">
          <img src={subject_icon} alt="" />
          <div className="">
            <p>Subjects</p>
          </div>
        </div>

        <div className="subject-table">
          <p>Subject Name</p>
          <p>No. of Notes</p>
          <p>Last updated</p>
        </div>
        <div className="line dash-line"></div>
        <ul className='subject-ul'>
          {placeholder.map((subject, index) =>
            <li className='subject-list' key={index}>
              <p>HElo</p>
              <p>Anyioung</p>
              <p>73i74</p>
            </li>
          )}
        </ul>

        <div className="dash-sub-bot">
          <div className="total-sub">
            <p>Total Subjects</p>
            <p>178</p>
          </div>

          <div className="add-sub">
            <p>Add Subject</p>
            <img src={plus_sign} alt="" />
          </div>
        </div>

      </div>
      <div className="calendar-card">Calendar...</div>

      <div className="notes-card">
        <div className="dash-titles">
          <img src={subject_icon} alt="" />
          <p>NOtes</p>
        </div>
        
        <div className="note-links">
          <p>Recently added</p>
          <p>Recently deleted</p>
        </div>

        <div className="line dash-line"></div>
        <ul>
          {placeholder.map((note, index) => 
             <li className='note-list' key={index}>
                <p>{note.title}</p>
                <p>{note.date}</p>
             </li>
          
          )}
        </ul>

      </div>
      <div className="assignments-card">
        <div className="dash-titles">
          <img src={subject_icon} alt="" />
          <p>Assignments</p>
        </div>

        <ul>
          {asignment.map((task, index) => 
            <li className='assgn-list' key={index}>
               <div className='assgn-detail'>
                <p>{task.title}</p>
                <p>{task.date}</p>
               </div>

               <div className="status-prog">
                  {task.status}
               </div>

            </li>
          )}
        </ul>


      </div>

    </div>
    </>
  )
}

export default DashLayout