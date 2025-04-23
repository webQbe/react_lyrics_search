import React from 'react'
import { Consumer } from '../../context'
import Spinner from '../layout/Spinner'

const Tracks = () => {
  return (
    <Consumer>
      {/* <Consumer> gives you access to whatever is passed in value={{ state, setState }} in the Provider in context.jsx */}
      { 
        // Destructure state
        ({ state }) => {  
          
            // Destructure track_list
            const { track_list } = state

            // Check if track_list is undefined or empty
            if (track_list === undefined || track_list.length === 0){

              // Show spinner to signal that the app is still waiting for API data
              return <Spinner />

            } else {

                // Once track_list is populated
                return <h1>Tracks loaded</h1>

            }
        }
      }
    </Consumer>
  )
}

export default Tracks