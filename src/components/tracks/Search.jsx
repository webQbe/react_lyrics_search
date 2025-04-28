/* Searching for tracks */
import React, { useState, useContext } from 'react'
import axios from 'axios'
import { Context } from '../../context'

const Search = () => {

    const [ trackTitle, setTrackTitle ] = useState('') // To store search input value (trackTitle starts empty)

    // Get access to the same state and dispatch from context.jsx
    const { state, dispatch } = useContext(Context) 

    const findTrack = (e) => { // Triggered when you submit the search form

        e.preventDefault();    // stop form from refreshing the page

              // Fetch Spotify search results using trackTitle
              const fetchSpotifyResults = async () => {
                try {
                    const response = await axios
                                    .get(`https://spotify-scraper.p.rapidapi.com/v1/search?term=${encodeURIComponent(trackTitle)}&type=track&limit=10 `, 
                                    {
                                      headers: { 
                                        'X-RapidAPI-Key': import.meta.env.VITE_RAPIDAPI_KEY, // API Key
                                        'X-RapidAPI-Host': 'spotify-scraper.p.rapidapi.com', 
                                      }
                                    })

                                console.log('Spotify search API response:', response.data);

                                // Dispatch SEARCH_TRACKS 
                                // to update the global state.track_list with search results
                                dispatch({
                                  type: 'SEARCH_TRACKS',
                                  payload: response.data.tracks.items
                                })
                                   
                          } catch (error) {
                            console.error('Error searching Spotify API:', error)
                          }  
              }

              fetchSpotifyResults()
    }

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
          <form onSubmit={ findTrack }>                 
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
}

export default Search /* The Index page imports and renders the <Search /> */