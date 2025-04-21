import React, { useState } from 'react'

// Create new context object
const Context = React.createContext()

/* Provider Component */
export const Provider = ({ children }) => { // To provide data to the app

  // Create shared state and a way to update it 
  const [state, setState] = useState({
                        track_list: [
                                { track: { track_name: 'abc' } },
                                { track: { track_name: '123' } }
                            ],
                        heading: 'Top 10 Tracks'})

  return (
    <Context.Provider 
        value={{ state, setState }} /* Pass the state to the entire app */
    > 
        { children } 
        {/* The children prop ensures whatever you wrap with <Provider> will have access to this shared state. */}
    </Context.Provider>
  )
}

export const Consumer = Context.Consumer // To consume the data in child components.
export default Context