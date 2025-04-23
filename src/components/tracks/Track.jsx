/* Show Individual Track Info */
import React from 'react'

const Track = ({ track }) => { // Pass track prop from .map() in Tracks.jsx
  
  // Destructure artist
  const { artist } = track

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
            </div>
        </div>
    </div>
  )
}

export default Track