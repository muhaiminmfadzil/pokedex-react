import { Link } from 'react-router-dom'

function About() {
  return (
    <div className='max-w-4xl p-4 mx-auto text-blue-800'>
      <Link to='/'>
        <button className='flex items-center px-1 py-2 mb-4 text-blue-800 rounded-lg hover:bg-blue-100'>
          <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke-width='1.5' stroke='currentColor' className='w-6 h-6 mr-1'>
            <path stroke-linecap='round' stroke-linejoin='round' d='M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3' />
          </svg>
          Back
        </button>
      </Link>
      <div className='text-2xl font-semibold'>About</div>
      <div className='text-sm'>
        <div>
          Simple project to demonstrate fetching and displaying data from&nbsp;
          <a className='text-blue-500 underline' href='https://pokeapi.co/api/v2'>
            pokemon api
          </a>
          <br />
          This is part of my long life learning (L3) journey for front end technology
        </div>
        <div className='inline-block px-2 py-1 mt-4 mb-2 text-white bg-blue-800 rounded-lg'>Built with</div>
        <div>React, Tailwind CSS, Heroicons</div>
        <div className='inline-block px-2 py-1 mt-4 mb-2 text-white bg-blue-800 rounded-lg'>Deployment</div>
        <div>Netlify</div>
      </div>
    </div>
  )
}
export default About
