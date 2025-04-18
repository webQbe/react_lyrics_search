/* Navbar component */
import React from 'react'

const Navbar = () => {
  return (
    <nav className="navbar navbar-dark bg-dark mb-5">  
        {/* Dark-themed navbar with margin-bottom spacing */}
        <span className="navbar-brand mb-0 h1 mx-auto">
            LyricFinder  {/* Bootstrap Branding style with horizontally centered text */}
        </span>
    </nav>
  )
}

export default Navbar