/* Show Individual Track Info */
import React from 'react'
import { Link } from 'react-router-dom'

const Track = ({ track }) => { // Pass track prop from .map() in Tracks.jsx
  
  // Destructure artist
  const { artist, title, album, id } = track

  // console.log("Track object:", track); 
  return (
    <div className="col-md-6">
        <div className="card mb-4 shadow-sm">
            <div className="card-body">
              
                {/* Show artist name */}
                <h5> {   // optional chaining to safely access artist name
                        artist?.name 
                     }
                </h5> 
                {/* Display Track Title & Album Title with Font Awesome icons */}
                <p className="card-text">
                  <strong><i className="fas fa-play"></i>Track</strong>: { title }
                  <br />
                  <strong><i className="fas fa-compact-disc"></i>Album</strong>: { album?.title }
                </p>
                {/* Route to lyrics page. */}
                <Link to={`lyrics/track/${id}`} className="btn btn-dark btn-dark btn-block">
                     <i className="fas fa-chevron-right"></i> View Lyrics
                </Link>
            </div>
        </div>
    </div>
  )
}

export default Track