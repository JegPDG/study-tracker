import React from 'react';
import './sidebar.css';
import add_purple from '../assets/add-secondary.svg';

const Sidebar = () => {
  return (
    <>
      <div className='main-sidebar'>
        <div className="side-bar-elements">
          <img src={add_purple} alt="" />
          <p>add new subject</p>
        </div>
      </div>
    </>
  )
}

export default Sidebar