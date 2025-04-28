/* Global State Setup */
import React, { useState, useEffect, createContext, useReducer } from 'react'
import axios from 'axios'

// Create a React Context to store the app's global data
const Context = createContext()


/* Reducer is how you modify the global state */
const reducer = (state, action) => { 
  // Define how the state should change based on different action.type
  switch(action.type){
    case 'TOP_TRACKS': // Replace track_list with the API's top tracks and change heading
      return {
        ...state,
        track_list: action.payload, 
        heading: 'Top 10 Tracks'   
      }
    case 'SEARCH_TRACKS': // Replace track_list with search results and change heading
      return {
        ...state,
        track_list: action.payload,
        heading: 'Search Results'
      }
      default:
        return state
  }
}

// Initial state
const initState = {
  track_list: [],
  heading: 'Top 10 Tracks'
}

/* Provider Component */
export const Provider = ({ children }) => { 

  // Init global state
  const [state, dispatch] = useReducer(reducer, initState)
  /* 'state' holds the current data (like track_list, heading)
     'dispatch' is how you update that data */

  useEffect(() => { /* Run once on component mount */

   // API Request to fetch top 10 tracks
   axios.get(
        `https://thingproxy.freeboard.io/fetch/https://api.deezer.com/chart/tracks`
        /* Send GET request to Deezer’s API through a CORS proxy to avoid browser CORS restrictions. */
      )
      .then(res => { 
          // Dispatch TOP_TRACKS to update the state.track_list
          dispatch({
              type: 'TOP_TRACKS',
              payload: Object.values(res.data.tracks.data)
            });
      })
      .catch(err => console.log(err)); // Error Handling
  }, []) 

  /* Return the Provider to wrap the whole app and provide { state, dispatch } to all child components */
  return (
    <Context.Provider value={{ state, dispatch }}> 
        { children } 
    </Context.Provider>
  )
}

export const Consumer = Context.Consumer // To consume the data in child components.
export { Context }