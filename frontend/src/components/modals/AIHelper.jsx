import { ArrowLeftCircleIcon, ArrowRightCircleIcon, PaperAirplaneIcon, XCircleIcon } from '@heroicons/react/24/solid'
import React, { useEffect, useState } from 'react'
import { logo } from '../../assets/assets'
import { aiCall } from '../../services/api'
import { data } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { use } from 'react'
import ReactMarkdown from "react-markdown";

const AIHelper = (props) => {
  const { setOpenAIhelp } = props

  const [message, setMessage] = useState('')
  const [conversation, setConversation] = useState(null);
  const [replyLoading, setReplyLoading] = useState(false)
  const [aidata, setAIdata] = useState(null)
  const [conversationThread, setConversationThread] = useState([])



  const handleSendMessage = async (e) => {
    e.preventDefault();

    if(!message.trim()) return;

    const userMessage = {
      role: "user",
      content: message
    }

    setConversationThread((prev) => [...prev, userMessage])
  
    console.log('Sending the message')
    setReplyLoading(true)

    try {
      const res = await aiCall.aiGenerate({
        message,
        conversation
      })

      const reply = res.data
      console.log('This is the reply', reply)

      //Then update the conversation ID
      if (!conversation){
        setConversation(reply.conversation)
      }
      console.log(conversation)

      setConversationThread((prev) => [...prev, reply])
      setMessage('')

    } catch (error) {
      console.log("Failed to send message!", error.text)
    } finally {
      console.log(conversationThread)
      setReplyLoading(false)
    }
  }
  

  //Get Conversation List
  const {data: convolist=[], isLoading: convoLoading, error: errorConvo} = useQuery({
    queryKey: ['conversationList'],
    queryFn: aiCall.aiGetConvoList,
    keepPreviousData: true
  })

  // console.log( 'this is the convolits', convolist)


  //Get the messages in conversation and render in chat box
  const fetchConvoMessages = async (conversationID) => {
    
    setConversation(conversationID)

    try {
      const result = await aiCall.aiConversation(conversationID)
      setConversationThread((prev) => [...prev, ...result?.data[0].messages]);


    } catch (error) {
      console.log('Failed to get conversation')
    }
  }

  useEffect(() => {
    console.log(conversationThread)
  }, [conversationThread])


  return (
    <div className='w-full h-full bg-white py-2 px-4 rounded-lg shadow-2 flex flex-col'>

      <div className='flex items-center gap-2 w-full justify-between'>
        <div className='flex items-center space-x-2 '>
          <img className='size-8' src={logo.logo_1} alt="" />
           <p>StudBud AI Helper</p>
        </div>

        <div className=''>
          <div className='flex'>
            <button
              onClick={() => setOpenAIhelp(false)}
              >
              <XCircleIcon className='size-6' fill='red'></XCircleIcon>
            </button>
          </div>
        </div>
      </div>

      <div className='mt-2 flex flex-row-reverse'>
        <button 
          onClick={() => {
            setConversationThread([])
            setConversation(null)
          }}
          className='bg-red-200 px-2 rounded-2xl border border-black/10 text-sm'>
          New conversation?
        </button>
      </div>

      <div className='w-full bg-white-3 mt-4 p-2 flex-1 overflow-auto scrollbar-thin rounded-md relative'>

        {conversationThread.length < 1 && 
          <div className='flex flex-col items-center justify-center h-full slide-up'>
            {/* Conversations List  */}
            <div className='bg-white-1 p-6 w-full max-w-[80%] mx-auto rounded-2xl '>
              <p className='gradient-purple-font'>Your Conversations</p>
              
              <div className='mt-2 space-y-1 max-h-[300px] overflow-auto scrollbar-thin'>
                {convolist?.map((convo,i) => {
                  return(
                    <p 
                      key={i} 
                      onClick={() => fetchConvoMessages(convo.id)}
                      className='bg-white-2 py-2 px-4 w-full rounded-3xl text-sm select-none '>{convo.title}</p>
                  )
                })}

              </div>
              {/* <div className='flex w-full justify-between mt-2'>
                <button><ArrowLeftCircleIcon className='size-8' fill='#86728B'></ArrowLeftCircleIcon></button>
                <button><ArrowRightCircleIcon className='size-8' fill='#86728B'></ArrowRightCircleIcon></button>
              </div> */}
            </div>
            {/* <p className='text-2xl text-center gradient-purple-font font-medium mt-8'>Start a Conversation Now</p> */}
          </div>
        }



        <div className=' space-y-2'>
          {conversationThread?.map((text,i) => {

            if(text?.role == 'user'){
              return(
                <div 
                  key={i}
                  className='w-full'>
                  <div className='flex flex-row-reverse w-full'>
                    <div className='bg-white-1 p-2 rounded-md max-w-[80%]'>
                        <p className='text-sm'>
                          {text.content}
                        </p>
                    </div>
                  </div>
                </div>
              )
            } 

            if(text?.role == 'assistant'){
              return(
                <div 
                  key={i}
                  className='w-full'>
                  <div className='flex w-full'>
                    <div className='bg-white-2 p-2 rounded-md max-w-[80%] text-sm'>
                        <ReactMarkdown  >
                          {text.content}
                        </ReactMarkdown>
                    </div>
                  </div>
                </div>
              )
            }
          })}

        </div>
      </div>
      
      {/* Message Bubble  */}
      <div className=' bg-white h-24 rounded-md p-2 mx-2  inset-x-0 '>
          <form onSubmit={handleSendMessage}>
            <textarea
              onChange={(e) => setMessage(e.target.value)}
              value={message}
              type="text"
              placeholder='Ask Studbud AI Helper...'
              className='w-full resize-none focus:outline-none focus:ring-1 text-sm focus:ring-dark-purple-text/20 px-2'
              />
              <div className='flex flex-row-reverse justify-between'>

                <button 
                  type='submit'
                  disabled={replyLoading}
                  className='bg-white-3 p-1 border border-gray-950/10 rounded-md cursor-pointer'>
                    <PaperAirplaneIcon className='size-4'></PaperAirplaneIcon>
                </button>

                <div >
                  <p className={`steel-metallic ${replyLoading ? 'block' : 'hidden'} `}>Thinking...</p>
                </div>
              </div>
          </form>

        </div>

    </div>
  )
}

export default AIHelper