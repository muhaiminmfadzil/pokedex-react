import PropTypes from 'prop-types'

function PokemonImage({ number }) {
  return (
    <>
      <div className='flex items-center justify-center mx-auto'>
        <img src={`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${number}.png`} alt='' />
      </div>
    </>
  )
}

PokemonImage.propTypes = {
  number: PropTypes.string.isRequired,
}

export default PokemonImage
