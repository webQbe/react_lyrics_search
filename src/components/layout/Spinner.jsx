import React from 'react'
import spinner from './spinner.gif' // Import local GIF image


const Spinner = () => { /* Shown while data is loading */
  return (
    <div>
        {/* Render spinner image centered with inline styles */}
        <img 
            src={ spinner } 
            alt="Loading..." 
            style={{ width: '200px', margin: '40px auto', display: 'block' }}
        />
    </div>
  )
}

export default Spinner