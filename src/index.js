import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './router'
import { PaginationProvider } from './context/PokemonContext'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <PaginationProvider>
      <div className='relative min-h-screen bg-blue-200'>
        <RouterProvider router={router} />
      </div>
    </PaginationProvider>
  </React.StrictMode>,
)
