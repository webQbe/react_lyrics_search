 import React, { useState, useEffect } from 'react'
 import { useParams } from 'react-router-dom'
 import axios from 'axios'
 
 const Lyrics = () => {

  const { title } = useParams() // Grab song title from URL 
  const [lyricsData, setLyricsData] = useState(null) // Store lyrics data

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
            console.log('API response:', response.data)
            setLyricsData(response.data) // result is stored in lyricsData
          } catch (error) {
            console.error('Error fetching lyrics:', error)
          }
        }

        // Run if title is not undefined 
        if (title) fetchLyricsSearch()

     }, [title]) 

   return (
     <div>
        <h1>Lyrics</h1>
     </div>
   )
 }
 
 export default Lyrics