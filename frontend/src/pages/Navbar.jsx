import React from 'react';
import './navbar.css';
import logo_2 from '../assets/studbud-logo-2.svg';
import search from '../assets/search-light.svg';
import menu_nd from '../assets/menu-secondary.svg';

const Navbar = () => {
  return (
    <>
      <div className="navbar-main">
        <div className="logo-menu">
          <div className="nav-logo">
            <img src={logo_2} alt="" />
            <p>STUDBUD</p>

            <div className="search">
            <img src={search} alt="" />
            <p>Search...</p>

          </div>

          </div>

          <div className="search-menu">

            <p className="username">
              jeggypaduga
            </p>

            <div className="profile-pict">
            </div>

            <img className='nav-menu' src={menu_nd} alt="" />

          </div>
        </div>

      </div>
    </>
  )
}

export default Navbar