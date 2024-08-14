import SortingVisualizer from './Components/SortingVisualizer.jsx'
import React from 'react'
import { Analytics } from "@vercel/analytics/react"
import './App.css'

function App() {
  
  return (
    <>
      <Analytics />
      <SortingVisualizer />
    </>
  )
}

export default App
