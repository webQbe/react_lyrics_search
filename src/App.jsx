/*  Main root component */
import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Provider } from './context'
import './App.css'
import Navbar from './components/layout/Navbar'
import Index from './components/layout/Index' // To render <Tracks />
import Lyrics from './components/tracks/Lyrics' 

function App() {

  return (
    <Provider> 
      {/* <Provider> wraps entire app, any component inside it can now access state and setState through the context. */}

      <Router> {/* Set up React Router */}
          <Navbar /> {/* Render Navbar component*/}
          <div className="container">
              <Routes>
                <Route exact path='/' element={ <Index /> } />
                <Route 
                  exact path='/lyrics/track/:id' /* Set up route to Lyrics  */
                  element={ <Lyrics /> } 
                />
              </Routes>
          </div>
      </Router>

    </Provider>
  )
}

export default App
