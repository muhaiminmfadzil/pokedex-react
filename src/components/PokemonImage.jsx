// import { useState } from 'react'
import PropTypes from 'prop-types'
import '../styles/PokemonImage.css'
import HandleImage from '../global/HandleImage'

function PokemonImage({ number }) {
  return (
    <>
      <div className='flex items-center justify-center w-40 h-40 mx-auto rounded-full bg-blue-50'>
        {/* Image */}
        <HandleImage src={`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${number}.png`} alt={`pokemon-${number}`} errorItem='??' />
      </div>
    </>
  )
}

PokemonImage.propTypes = {
  number: PropTypes.string.isRequired,
}

export default PokemonImage
