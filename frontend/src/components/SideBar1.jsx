import React from 'react'
import { useNavigate } from 'react-router-dom'
import { illustrations } from '../assets/assets';

const SideBar1 = () => {
  const navigate = useNavigate();

  const sidebartext = [
      {text: 'Dashboard',
        icon: "",
        goto: () => {
          navigate('/dashboard')
        },
      }, 
      {text: 'Subjects',
        icon: "",
        goto: () => {
          navigate('/subject')
        },
      },
      {text: 'Notes',
        icon: "",
        goto: () => {
          navigate('/note')
        },
      },
      // {text: 'Bookmarks',
      //   icon: bookmarks
      // },
      {text: 'Flashcards',
        icon: ""
      },
      {text: 'AI Helper',
        icon: "",
      },
    ]

  return (
    <div className='w-[240px] bg-purple-1'>
      <div className='p-2 flex flex-col justify-between h-full'>
        {/* top elements  */}
        <ul className=''>
          {sidebartext.map((elem, index) => 
            <li 
              key={index}
              className='hover:bg-white/20 cursor-pointer h-10 flex flex-row items-center box-border p-2 rounded-sm'>
              <p className='font-bold text-white-1'>{elem.text}</p>
            </li>
          )}
        </ul>
        

        {/* bottom elements  */}
        <div>
          <div>
            <img src={illustrations.glass_and_leaf} alt="" />
          </div>

          <div 
              className='hover:bg-white/20 cursor-pointer h-10 flex flex-row items-center box-border p-2 rounded-sm'>
              <p className='font-bold text-white-1'>Hello</p>
          </div>

        </div>
      </div>
    </div>
  )
}

export default SideBar1