import React, { useState } from 'react'
import axios from 'axios'
import { Consumer } from '../../context' // To access global state 

const Search = () => {

    const [ trackTitle, setTrackTitle ] = useState('') // To store search input value (trackTitle starts empty)

    const findTrack = (e) => {
        e.preventDefault(); // stop form from refreshing the page

              const fetchShazamResults = async () => {
                try {
                  // Call Shazam API to search for song using trackTitle
                  const response = await axios
                                    .get(`https://shazam-core.p.rapidapi.com/v1/search/multi?offset=0&search_type=SONGS&query=${encodeURIComponent(trackTitle)}`, 
                                      {
                                        headers: { 
                                          'X-RapidAPI-Key': import.meta.env.VITE_RAPIDAPI_KEY,
                                          'X-RapidAPI-Host': 'shazam-core.p.rapidapi.com', 
                                        }
                                      })

                  // Log response data                    
                  console.log('Shazam-core search API response:', response.data)
                  
                } catch (error) {
                  console.error('Error searching shazam-core:', error)
                }  
              }

              fetchShazamResults()
    }

  return (
    <Consumer>
        {/* <Consumer> expects a function as a child  */}
        { 
            // the function receives {state} (coming from app's context)
            ({ state }) => { 
                console.log(state)
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