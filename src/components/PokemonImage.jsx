import { useState } from 'react'
import PropTypes from 'prop-types'
import '../styles/PokemonImage.css'

function PokemonImage({ number }) {
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)

  const handleImageLoaded = () => {
    setIsLoading(false)
  }

  const handleImageError = () => {
    setIsLoading(false)
    setIsError(true)
  }

  const errorState = <div className='text-3xl font-semibold'>??</div>
  const loadingState = (
    <div className='flex items-center justify-center'>
      <div className='spinner'></div>
    </div>
  )

  const handleImage = () => {
    if (isError) {
      return errorState
    } else {
      return <img src={`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${number}.png`} alt={`pokemon-${number}`} onLoad={handleImageLoaded} onError={handleImageError} />
    }
  }

  return (
    <>
      <div className='flex items-center justify-center w-40 h-40 mx-auto rounded-full bg-blue-50'>
        {/* Loading */}
        {isLoading && loadingState}
        {/* Image */}
        {handleImage()}
      </div>
    </>
  )
}

PokemonImage.propTypes = {
  number: PropTypes.string.isRequired,
}

export default PokemonImage
