import React, { useState, useEffect } from 'react'
import axios from 'axios'

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

  useEffect(() => { /* Run once on component mount */
   // API Request
   axios.get(
        `https://thingproxy.freeboard.io/fetch/https://api.deezer.com/chart/tracks`
        /* Send GET request to Deezer’s API through a CORS proxy to avoid browser CORS restrictions. */
      )
      .then(res => { 
        /* On Successful Response */
        console.log(res.data)
        const topTracks = Object.values( // Ensure data is in array format 
                                res.data.tracks.data.slice(0, 10)
                          );

      /* Update App State */
      setState({
          track_list: topTracks,
          heading: "Top 10 Tracks"
        });
      })
      .catch(err => console.log(err)); // Error Handling
  }, [])                          

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