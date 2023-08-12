import PokemonCard from '../components/PokemonCard'
import AnimatedSpinner from '../components/AnimatedSpinner'
import PokemonContext from '../context/PokemonContext'
import { useContext, useEffect, useState } from 'react'
import Paginator from '../components/Paginator'
import { Link } from 'react-router-dom'
import { PokemonsApi } from '../api/PokemonsApi'

function PokemonsView() {
  const { currentPage, limit, setTotalCount, setOffset, setTotalPages } = useContext(PokemonContext)
  const [pokemons, setPokemons] = useState([])
  const [isFetching, setIsFetching] = useState(true)
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        setIsFetching(true)
        const offset = (currentPage - 1) * limit
        setOffset(offset)
        const { pokemons, totalCount } = await PokemonsApi({ limit, offset })
        setPokemons(pokemons)
        setTotalCount(totalCount)
        setTotalPages(Math.ceil(totalCount / limit))
      } catch (error) {
        setIsError(true)
      } finally {
        setIsFetching(false)
      }
    }

    fetchPokemons()
  }, [currentPage, limit, setOffset, setTotalCount, setTotalPages])

  return (
    <>
      {/* Image */}
      <img className='object-cover w-64 h-32 pt-4 mx-auto' src='https://www.freepnglogos.com/uploads/pokemon-logo-png-0.png' alt='Pokemon Logo Png' />
      {/* Listing */}
      {(() => {
        if (isError) {
          return (
            <div className='flex items-center justify-center h-[60dvh] text-xl font-normal text-blue-800'>
              Oppss.. Something goes wrong
              <br />
              Please try again later
            </div>
          )
        }

        if (isFetching) {
          return (
            <div className='flex items-center justify-center h-[60dvh]'>
              <AnimatedSpinner size='large' />
            </div>
          )
        }

        return (
          <ul className='grid max-w-4xl grid-cols-1 gap-6 px-8 pt-8 pb-[80px] mx-auto bg-blue-200 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
            {pokemons.map((pokemon) => (
              <Link to={pokemon.number} key={pokemon.number}>
                <PokemonCard number={pokemon.number} name={pokemon.name} />
              </Link>
            ))}
          </ul>
        )
      })()}
      {/* Paginator */}
      <div className='fixed bottom-0 left-0 w-full'>
        <Paginator />
      </div>
    </>
  )
}
export default PokemonsView
