 import React, { useState, useEffect } from 'react'
 import { useParams } from 'react-router-dom'
 import axios from 'axios'
 import Spinner from '../layout/Spinner'
 
 const Lyrics = () => {

  const { title } = useParams() // Grab song title from URL 

  /* State Initialization */
  const [ songId, setSongId ] = useState() // Store songId 
  const [ lyricsData, setLyricsData ] = useState() // for storing the actual song lyrics
  const [ trackData, setTrackData ] = useState() // for storing metadata or tracking info

    /* Search for Song */
    useEffect(() => { /* Re-runs whenever title changes */

        // Search Genius API for song using the title
        const fetchLyricsSearch = async () => {
          try {
            const response = await axios
                              .get(`https://genius-lyrics1.p.rapidapi.com/search/?q=${encodeURIComponent(title)}&per_page=1&page=1`, 

                              /* encodeURIComponent(title) ensures special characters (like spaces or symbols) are URL-safe. */
                      {
                        headers: { /* Request Headers */
                          'X-RapidAPI-Key': import.meta.env.VITE_RAPIDAPI_KEY, // API Key
                          'X-RapidAPI-Host': 'genius-song-lyrics1.p.rapidapi.com', 
                        }
                      });
            // console.log('API response:', response.data)

            // Extract songId from the response
            if (response.data.hits.length > 0) {
              const songId = response.data.hits[0].result.id;
              console.log('Song ID:', songId);
              setSongId(songId) // Update songId state
            }
            
          } catch (error) {
            console.error('Error fetching results:', error)
          }
        }

        // Run if title is not undefined 
        if (title) fetchLyricsSearch()

     }, [title]) 

    /* Calling both fetch functions in one useEffect causes unwanted re-renders */

    /* Fetch Song Lyrics */
    useEffect(() => { // Runs only when songId is set by the previous effect

      // Use songId to get actual lyrics
      const fetchSongLyrics = async () => {
        try {
          const response = await axios
                            .get(`https://genius-lyrics1.p.rapidapi.com/song/lyrics/?id=${songId}`, 
                    {
                      headers: { 
                        'X-RapidAPI-Key': import.meta.env.VITE_RAPIDAPI_KEY,
                        'X-RapidAPI-Host': 'genius-song-lyrics1.p.rapidapi.com', 
                      }
                    });
          console.log('API response:', response.data)
          
          setLyricsData(response.data.lyrics.lyrics)       // Store lyrics info
          setTrackData(response.data.lyrics.tracking_data) // Store tracking info like title, artist, etc.
          
        } catch (error) {
          console.error('Error fetching lyrics:', error)
        }
      }

      if (songId) fetchSongLyrics()
    }, [songId]) 

    /* Conditional Rendering with Loading State */
    if ( 
        // Either trackData or lyricsData is undefined (not yet fetched)
        trackData === undefined || 
        lyricsData === undefined || 
        // Or an empty object {} (fetched but no content)
        Object.keys(trackData).length === 0 || Object.keys(lyricsData).length === 0) 
      {
        // Render loading spinner component
        return <Spinner />

      } else {
        
        // Otherwise, once both objects are available and have keys (i.e. valid data)
        return <h1>Data returned</h1>

      }
   return (
     <div>
        <h1>Lyrics</h1>
     </div>
   )
 }
 
 export default Lyrics