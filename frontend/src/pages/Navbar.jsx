import React, { useContext, useState, useRef, useEffect } from 'react';
// import './styles/navbar.css';
import logo_2 from '../assets/studbud-logo-2.svg';
import search from '../assets/search-light.svg';
import menu_nd from '../assets/menu-secondary.svg';
import account from '../assets/account.svg';
import notification from '../assets/notification.svg';
import security from '../assets/security.svg';
import logout from '../assets/logout.svg';



import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

const Navbar = () => {
  const {logoutUser, user} = useContext(AuthContext);
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate()


  const handletoggle = () => {
    setShowMenu(prev => !prev)
  }

  useEffect(() => {
    if (!showMenu) return;

    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false); // close the menu
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showMenu]);


  const menuFunctions = [
    {
      name: "Account",
      img: account
    },
     {
      name: "Security",
      img: security
    },
     {
      name: "Notifications",
      img: notification
    },
    {
      name: "Logout",
      img: logout,
      function: () => {
          logoutUser()
          navigate('/login')
      }
    }
  ]




  return (
    <>
      <div className="h-[85px] bg-purple-2 flex items-center pl-4 pr-4 w-full">
        <div className="logo-menu flex items-center justify-between w-full">
          <div className="flex items-center gap-2 text-xl">
            <img src={logo_2} alt="" />
            <p className=''>STUDBUD</p>

            {/* <div className="search">
              <img src={search} alt="" />
              <p>Search...</p>
            </div> */}

          </div>

          <div className="search-menu">

            <p className="username">
              {user?.username}
            </p>

            {/* <div className="profile-pict">
            </div> */}

            <div className="menu-function">
              <div
                onClick={handletoggle}
              >
                <img className='nav-menu' src={menu_nd} alt="" />
              </div>

              {showMenu && (
                <div className="function-box" ref={menuRef}>
                  <ul>
                  {menuFunctions.map((func, index) => 
                    <li key={index} onClick={
                      func.function
                    }>
                      <img src={func.img} alt="" />
                      <p>{func.name}</p>
                    </li>
                  )}
                  </ul>
                </div>
              )}

            </div>
            
          </div>
        </div>

      </div>
    </>
  )
}

export default Navbar