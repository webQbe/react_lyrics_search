 import React, { useState, useEffect } from 'react'
 import { useParams } from 'react-router-dom'
 import axios from 'axios'
 
 const Lyrics = () => {

  const { title } = useParams() // Grab song title from URL 
  const [songId, setSongId] = useState() // Store songId

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
              setSongId(songId) // Update the state
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
          
        } catch (error) {
          console.error('Error fetching lyrics:', error)
        }
      }

      if (songId) fetchSongLyrics()
    }, [songId]) 

   return (
     <div>
        <h1>Lyrics</h1>
     </div>
   )
 }
 
 export default Lyrics