/* Display tracks */
import React from 'react'
import { Consumer } from '../../context'
import Spinner from '../layout/Spinner'
import Track from './Track'

const Tracks = () => {
  return (
    <Consumer>
      {/* <Consumer> gives you access to whatever is passed in value={{ state, setState }} in the Provider in context.jsx */}
      { 
        // Destructure state
        ({ state }) => {  
          
            // Destructure track_list & heading
            const { track_list, heading } = state

            // Check if track_list is undefined or empty
            if (track_list === undefined || track_list.length === 0){

              // Show spinner to signal that the app is still waiting for API data
              return <Spinner />

            } else {
                return (
                 <>
                    <h3 className="text-center mb-4">{ heading }</h3>
                    <div className="row">
                      {   
                        // Map over tracks 
                          track_list.map((trackObj, index) => {
                            // Render a <Track /> component for each
                            return <Track key={ index } track={ trackObj }/>

                            /* return keyword is required inside the .map() */
                        }) 
                      }
                    </div>
                  </>
                )
            }
        }
      }
    </Consumer>
  )
}

export default Tracks