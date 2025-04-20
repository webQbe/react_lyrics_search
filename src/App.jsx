/*  Main root component */
import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Navbar from './components/layout/Navbar'
import Index from './components/layout/Index' // To render <Tracks />

function App() {

  return (
    <Router> {/* Set up React Router */}
      <>
        <Navbar /> {/* Render Navbar component*/}
        <div className="container">
            <Routes>
              <Route exact path='/' element={ <Index /> } />
            </Routes>
        </div>
      </>
    </Router>
  )
}

export default App
