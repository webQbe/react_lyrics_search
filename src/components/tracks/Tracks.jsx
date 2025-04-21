import React from 'react'
import { Consumer } from '../../context'

const Tracks = () => {
  return (
    <Consumer>
      {/* <Consumer> gives you access to whatever is passed in value={{ state, setState }} in the Provider in context.jsx */}
      { 
        // Destructure & log state
        ({ state }) => {  
            console.log(state) 
            return <h1>Tracks</h1>
        }
      }
    </Consumer>
  )
}

export default Tracks