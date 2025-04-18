/*  Main root component */
import { useState } from 'react'
import './App.css'
import Navbar from './components/layout/Navbar'

function App() {

  return (
    <div className="App">
      <Navbar /> {/* Render Navbar component*/}
    </div>
  )
}

export default App
