import React, { createContext } from 'react'

export const Context = createContext();


const AIHelperContext = (props) => {

  




  return (
    <Context.Provider>
      {props.children}
    </Context.Provider>

  )
}

export default AIHelperContext