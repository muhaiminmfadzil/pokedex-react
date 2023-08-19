import PokemonCard from '../components/PokemonCard'
import AnimatedSpinner from '../components/AnimatedSpinner'
import { usePaginationContext } from '../context/PokemonContext'
import Paginator from '../components/Paginator'
import { Link } from 'react-router-dom'
import { PokemonsApi } from '../api/PokemonsApi'
import { useQuery } from 'react-query'

function PokemonsView() {
  const { currentPage, limit, setTotalCount, setOffset, setTotalPages } = usePaginationContext()

  const fetchPokemons = async () => {
    const offset = (currentPage - 1) * limit
    setOffset(offset)
    const { pokemons, totalCount } = await PokemonsApi({ limit, offset })
    setTotalCount(totalCount)
    setTotalPages(Math.ceil(totalCount / limit))
    return pokemons
  }

  const { isLoading, isError, data } = useQuery({ queryKey: ['pokemons', currentPage], queryFn: fetchPokemons })

  return (
    <>
      {/* Image */}
      <img className='object-cover w-64 h-32 pt-4 mx-auto' src='https://www.freepnglogos.com/uploads/pokemon-logo-png-0.png' alt='Pokemon Logo Png' />
      {/* Listing */}
      {(() => {
        // Error state
        if (isError) {
          return (
            <div className='flex items-center justify-center h-[60dvh] text-xl font-normal text-blue-800'>
              Oppss.. Something goes wrong
              <br />
              Please try again later
            </div>
          )
        }
        // Loading state
        if (isLoading) {
          return (
            <div className='flex items-center justify-center h-[60dvh]'>
              <AnimatedSpinner size='large' />
            </div>
          )
        }
        // Success
        return (
          <ul className='grid max-w-4xl grid-cols-1 gap-6 px-8 pt-8 pb-[80px] mx-auto bg-blue-200 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
            {data.map((pokemon) => (
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
      {/* About */}
      <Link to={'about'}>
        <button class='fixed font-semibold text-blue-700 bg-white rounded-full shadow-xl right-5 bottom-20'>
          <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth='1.5' stroke='currentColor' className='w-8 h-8'>
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z'
            />
          </svg>
        </button>
      </Link>
    </>
  )
}
export default PokemonsView
