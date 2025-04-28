/* Displaying each track */
import React from 'react'
import { Link } from 'react-router-dom'

const Track = ({ track }) => { // Pass track prop from .map() in Tracks.jsx

/* Normalize data from  */  

// Normalize song title
/* Deezer response: track.title
   Spotify response: track.name */
const title = track.title ?? track.name // In JSX > { title }
/* If .title exists, use it. Otherwise fallback to .name 
   ?? the nullish coalescing operator means "Use the left value if it's not null / undefined; otherwise use the right one."
*/
                                        
// Normalize artist
/* Deezer response: track.artist.name
   Spotify response: track.artists[0].name */
const artist = track.artist ? track.artist           // In JSX > { album?.name }
                : { name: track.artists?.[0]?.name }  

// Normalize album
/* Deezer response: track.album.title
   Spotify response: track.album.name */
const album = track.album ?
              { title: track.album.title ?? track.album.name } // In JSX > { album?.title }
              : { title: track.album?.name } // If track.album itself missing
                /* Even though track.album was falsey, the code safely attempts track.album?.name with optional chaining (?.) 
                Result: { title: undefined } — but this prevents the app from crashing! */


  // console.log("Track object:", track); 
  return (
    <div className="col-md-6">
        <div className="card mb-4 shadow-sm">
            <div className="card-body">
              
                {/* Show artist name */}
                <h5> { artist?.name }
                </h5> 
                {/* Display Track Title & Album Title with Font Awesome icons */}
                <p className="card-text">
                  <strong><i className="fas fa-play"></i>Track</strong>: { title }
                  <br />
                  <strong><i className="fas fa-compact-disc"></i>Album</strong>: 
                  { album?.title }
                </p>
                
                {/* Linking to the Lyrics Page */}
                <Link 
                  to={`lyrics/track/${encodeURIComponent(title)}`} // Create a dynamic link based on title of track
                  className="btn btn-dark btn-dark btn-block"
                >
                     <i className="fas fa-chevron-right"></i> View Lyrics
                </Link>
            </div>
        </div>
    </div>
  )
}

export default Track