import React from 'react';
import './sidebar.css';

import add_purple from '../assets/add-secondary.svg';
import dashboard from '../assets/dashboard.svg';
import subject from '../assets/subjects.svg';
import notes from '../assets/notes.svg';
import bookmarks from '../assets/bookmarks.svg';
import flashcard from '../assets/flashcard.svg';
import ai from '../assets/ai.svg';
import { useNavigate } from 'react-router-dom';


const Sidebar = () => {
  const navigate = useNavigate();

  const sidebartext = [
    {text: 'Dashboard',
      icon: dashboard,
    }, 
    {text: 'Subjects',
      icon: subject,
      goto: () => {
        navigate('/subject')
      },
    },
    {text: 'Notes',
      icon: notes
    },
    {text: 'Bookmarks',
      icon: bookmarks
    },
    {text: 'Flashcards',
      icon: flashcard
    },
    {text: 'AI Helper',
      icon: ai,
    },
  ]


  return (
    <>
      <div className='main-sidebar'>
       
       <ul className='side-bar-elements'>
        {sidebartext.map((sideEl, index) => 
          <li  key={index}>
            <div onClick={ () => {
               sideEl.goto();
              }
            }>
              {/* <link rel="stylesheet" href="" /> */}
              <img src={sideEl.icon} alt="" />
              <p>{sideEl.text}</p>  
            </div>
          </li>
          )}
      </ul>

      </div>
    </>
  )
}

export default Sidebar