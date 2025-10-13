import React from 'react'
import { useNavigate } from 'react-router-dom'
import { illustrations } from '../assets/assets';
import { BookOpenIcon, ChartBarIcon, CreditCardIcon, PencilSquareIcon, SparklesIcon } from '@heroicons/react/24/solid';

const SideBar1 = () => {
  const navigate = useNavigate();

  const sidebartext = [
      {text: 'Overview',
        icon: ChartBarIcon,
        goto: () => {
          navigate('/dashboard')
        },
      }, 
      {text: 'Subjects',
        icon: BookOpenIcon,
        goto: () => {
          navigate('/subjects')
        },
      },
      {text: 'Notes',
        icon: PencilSquareIcon,
        goto: () => {
          navigate('/notes')
        },
      },
      // {text: 'Bookmarks',
      //   icon: bookmarks
      // },
      {text: 'Flashcards',
        icon: CreditCardIcon
      },
      {text: 'AI Helper',
        icon: SparklesIcon,
      },
    ]

  return (
    <div className='w-[240px] bg-purple-1'>
      <div className='p-2 flex flex-col justify-between h-full'>
        {/* top elements  */}
        <div className="">
          {sidebartext.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <div 
              onClick={feature.goto}
                key={i} 
                className="hover:bg-white-2/30 cursor-pointer h-10 flex flex-row items-center gap-2 box-border 
                          p-2 rounded-sm transition-colors duration-200 ease-in-out">
                <Icon className="size-6 text-blue-400" fill='white' />
                <p className="text-white font-medium">{feature.text}</p>
              </div>
            );
          })}
        </div>

        

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