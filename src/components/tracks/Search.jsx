import React, { useState } from 'react'
import axios from 'axios'
import { Consumer } from '../../context' // To access global state 

const Search = () => {

    const [ trackTitle, setTrackTitle ] = useState('') // To store search input value (trackTitle starts empty)

  return (
    <Consumer>
        {/* <Consumer> expects a function as a child  */}
        { 
            // the function receives {state} (coming from app's context)
            ({ state }) => { 

                return (
                    <div className="card card-body mb-4 p-4">
                        {/* Bootstrap card with padding and margin */}

                        <h1 className="display-4 text-center">
                            {/* Big centered heading */}
                            <i className="fas fa-music"></i> Search For A Song
                        </h1>

                        {/*  Smaller centered paragraph */}
                        <p className="lead text-center">Get the lyrics for any song</p>

                        {/* Search Form */}   
                        <form onSubmit={findTrack}>                 
                            <div className="form-group">
                                {/* Search text input */}
                                <input 
                                    type="text" 
                                    className="form-control form-control lg" // big input
                                    placeholder="Song title..."
                                    name="trackTitle"
                                    value={ trackTitle }
                                    onChange={
                                         // Update local state trackTitle whenever user types
                                        (e) => setTrackTitle(e.target.value)
                                    }
                                />
                            </div>
                            {/* Blue color large submit button */}
                            <button type='submit' className="btn btn-primary btn-lg btn-block mb-5">
                               Get Track Lyrics         
                            </button>
                        </form>
                    </div>
                )
        }}
    </Consumer>
  )
}

export default Search /* The Index page imports and renders the <Search /> */