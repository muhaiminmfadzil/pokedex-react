import { useEffect, useState } from 'react'
import axios from 'axios'
import PokemonCard from '../components/PokemonCard'

function PokemonsView() {
  const [pokemons, setPokemons] = useState([])
  const [isError, setIsError] = useState(false)

  const sanitizeData = (obj) => {
    let newObj = { ...obj }
    // Number
    const splitUrl = obj.url.split('/')
    newObj.number = String(splitUrl[splitUrl.length - 2]).padStart(3, '0')

    return newObj
  }

  useEffect(() => {
    const params = {
      limit: 20,
      offset: 0,
    }
    const fetchPokemons = async () => {
      try {
        const { data } = await axios.get('https://pokeapi.co/api/v2/pokemon', { params })
        const pokemons = data.results.map((result) => sanitizeData(result))
        setPokemons(pokemons)
      } catch (error) {
        setIsError(true)
      }
    }

    fetchPokemons()
  }, [])

  if (isError) {
    return <h3>Is Error...</h3>
  }

  return (
    <>
      {/* Image */}
      <img className='object-cover w-64 h-32 pt-4 mx-auto' src='https://www.freepnglogos.com/uploads/pokemon-logo-png-0.png' alt='Pokemon Logo Png' />
      {/* Listing */}
      <ul className='grid max-w-4xl grid-cols-1 gap-6 px-8 pt-8 pb-[80px] mx-auto bg-blue-200 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
        {pokemons.map((pokemon) => (
          <PokemonCard key={pokemon.number} number={pokemon.number} name={pokemon.name} />
        ))}
      </ul>
    </>
  )
}
export default PokemonsView
