 import React, { useState, useEffect } from 'react'
 import { useParams, Link } from 'react-router-dom'
 import axios from 'axios'
 import Spinner from '../layout/Spinner'
 
 const Lyrics = () => {

  const { title } = useParams() // Grab song title from URL 

  /* State Initialization */
  const [ spotifyId, setSpotifyId ] = useState()    // Store spotifyId, needed for fetching lyricsData 
  const [ shazamId, setShazamId ] = useState()      // Store shazamId, needed for fetching trackData
  const [ lyricsData, setLyricsData ] = useState()  // Store actual song lyrics
  const [ trackData, setTrackData ] = useState()    // Store track's metadata

    /* First useEffect: Search Song IDs */
    useEffect(() => { /* Triggered whenever title changes (new URL param) */

        // Get Spotify ID for the song
        const fetchSpotifyTrackId = async () => {
          try {
            const response = await axios
                              .get(`https://spotify-scraper.p.rapidapi.com/v1/search?term=${encodeURIComponent(title)}&type=track&limit=1 `, 

                              /* encodeURIComponent(title) ensures special characters (like spaces or symbols) are URL-safe. */
                      {
                        headers: { /* Request Headers */
                          'X-RapidAPI-Key': import.meta.env.VITE_RAPIDAPI_KEY, // API Key
                          'X-RapidAPI-Host': 'spotify-scraper.p.rapidapi.com', 
                        }
                      });
            // console.log('API response:', response.data)

            
            if ( // Check if results returned
                 response.data.tracks && 
                 response.data.tracks.items && 
                 response.data.tracks.items.length > 0 ) 
              {
                const spotifyId = response.data.tracks.items[0].id;
                console.log('Spotify ID:', spotifyId);
                setSpotifyId(spotifyId) // Update spotifyId state
              } 
              else {
                // Log a warning instead of crashing 
                console.warn('No track key found in Spotify API response.')
              }
            
          } catch (error) {
            console.error('Error fetching spotifyId:', error)
          }
        }

      /* Get Shazam track key for the song */
      const fetchShazamTrackId = async () => {
        try {
          const response = await axios
                            .get(`https://shazam-core.p.rapidapi.com/v1/search/multi?offset=0&search_type=SONGS&query=${encodeURIComponent(title)}`, 
                              {
                                headers: { 
                                  'X-RapidAPI-Key': import.meta.env.VITE_RAPIDAPI_KEY,
                                  'X-RapidAPI-Host': 'shazam-core.p.rapidapi.com', 
                                }
                              })

          console.log('Shazam-core search API response:', response.data)

           // Extract trackKey from the response
           if ( response.data.tracks && 
                response.data.tracks.hits && 
                response.data.tracks.hits.length > 0 && 
                response.data.tracks.hits[0].track )
                {
                  const trackKey = response.data.tracks.hits[0].track.key
                  console.log('Shazam track key:', trackKey)
                  setShazamId(trackKey) // Update trackKey state

                } else {
                  // Log a warning instead of crashing 
                  console.warn('No track key found in Shazam API response.')
                }
          
        } catch (error) {
          console.error('Error searching shazam-core:', error)
        }
      }

      if (title) {
          fetchSpotifyTrackId()
          fetchShazamTrackId()
        }

     }, [title]) 

    /* Calling all fetch functions in one useEffect causes unwanted re-renders */

    /* Second useEffect: Fetch Lyrics */
    useEffect(() => { // Triggered whenever spotifyId changes (after it's fetched)

      // Use Spotify ID to fetch lyrics text
      const fetchSongLyrics = async () => {
        try {
          const response = await axios
                            .get(`https://spotify-scraper.p.rapidapi.com/v1/track/lyrics?trackId=${spotifyId}&format=json`, 
                    {
                      headers: { 
                        'X-RapidAPI-Key': import.meta.env.VITE_RAPIDAPI_KEY,
                        'X-RapidAPI-Host': 'spotify-scraper.p.rapidapi.com', 
                      }
                    });
          console.log('Lyrics API response:', response.data)
          
          setLyricsData(response.data) // Update lyricsData state        
          
        } catch (error) {
          console.error('Error fetching lyrics:', error)
        }
      }

      if (spotifyId) fetchSongLyrics()
    }, [spotifyId]) 


    /* Third useEffect: Fetch Track Data */    
    useEffect(() => {  // Triggered whenever shazamId changes

          // Use Shazam ID to fetch detailed track metadata
          const fetchTrackData = async () => {
            try {
              const response = await axios
                                .get(`https://shazam-core.p.rapidapi.com/v1/tracks/details?track_id=${shazamId}`, 
                        {
                          headers: { 
                            'X-RapidAPI-Key': import.meta.env.VITE_RAPIDAPI_KEY,
                            'X-RapidAPI-Host': 'shazam-core.p.rapidapi.com', 
                          }
                        });
              console.log('Track Data API response:', response.data)
              
              setTrackData(response.data) // Update trackData state       
              
            } catch (error) {
              console.error('Error fetching track data:', error)
            }
          }
    
          if (shazamId) fetchTrackData()
        }, [shazamId]) 
        
   

    /* Conditional Rendering with Loading State */
    if ( 
        // Either trackData or lyricsData is undefined (not yet fetched)
        trackData === undefined || 
        lyricsData === undefined  || 
        // Or an empty object {} (fetched but no content)
        Object.keys(trackData).length === 0 || Object.keys(lyricsData).length === 0 )  
      {
        // Render loading spinner component
        return <Spinner />

      } else {

        // Join all the text fields in lyricsData together, separated by a line break (\n).
        const fullLyrics = lyricsData.map(line => line.text).join('\n');

        return (
          <>  
             {/* Bootstrap styled button */}
             <Link to="/" className="btn btn-dark btn-sm mb-4">
                Go Back
             </Link>
             {/* Display track title & artist name inside Bootstrap card header */}
             <div className="card">
              <h5 className="card-header">
                { trackData.title } by {''} 
                <span className="text-secondary">
                  { trackData.subtitle }
                </span>
              </h5>
              <div className="card-body">
                    {/* Render lyrics inside <pre> to preserve line breaks */}
                    <pre className="card-text">{ fullLyrics }</pre>
              </div>
             </div>]
          </>
        )
      }
 }
 
 export default Lyrics