import { createContext, useEffect, useState } from 'react'
import { PokemonsApi } from '../api/PokemonsApi'

const PokemonContext = createContext()

export const PokemonProvider = ({ children }) => {
  const [pokemons, setPokemons] = useState([])
  const [isFetching, setIsFetching] = useState(true)
  const [isError, setIsError] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalCount, setTotalCount] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [offset, setOffset] = useState(0)
  const limit = 20

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
  }, [currentPage])

  return (
    <PokemonContext.Provider
      value={{
        pokemons,
        isFetching,
        isError,
        currentPage,
        totalCount,
        limit,
        offset,
        totalPages,
        setCurrentPage,
      }}
    >
      {children}
    </PokemonContext.Provider>
  )
}

export default PokemonContext
