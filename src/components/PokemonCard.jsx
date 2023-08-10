import '../styles/PokemonCard.css'
import PropTypes from 'prop-types'

import PokemonImage from './PokemonImage'

function PokemonCard({ number, name }) {
  return (
    <>
      <li className='flex flex-col col-span-1 text-center duration-300 divide-y divide-gray-200 rounded-lg shadow bg-blue-50 hover:cursor-pointer sm:hover:shadow-lg sm:hover:scale-105'>
        <div className='flex flex-col flex-1 p-4 rounded-lg card-color'>
          <PokemonImage number={number} />
          <div className='mt-3 text-sm font-medium text-blue-500'>#{number}</div>
          <div className='text-xl font-semibold text-blue-900'>{name}</div>
        </div>
      </li>
    </>
  )
}

PokemonCard.propTypes = {
  number: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
}

export default PokemonCard
