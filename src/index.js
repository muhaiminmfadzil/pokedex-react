import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './router'
import { PokemonProvider } from './context/PokemonContext'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  // <React.StrictMode>
  <PokemonProvider>
    <div className='relative min-h-screen bg-blue-200'>
      <RouterProvider router={router} />
    </div>
  </PokemonProvider>,
  // </React.StrictMode>,
)
