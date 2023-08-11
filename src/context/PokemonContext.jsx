import axios from 'axios'
import { createContext, useEffect, useState } from 'react'

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

  const sanitizeData = (obj) => {
    let newObj = { ...obj }
    // Number
    const splitUrl = obj.url.split('/')
    newObj.number = String(splitUrl[splitUrl.length - 2]).padStart(3, '0')

    return newObj
  }

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        setIsFetching(true)
        const offset = (currentPage - 1) * limit
        setOffset(offset)
        const params = {
          limit,
          offset,
        }
        const { data } = await axios.get('https://pokeapi.co/api/v2/pokemon', { params })
        const pokemons = data.results.map((result) => sanitizeData(result))
        const totalCount = data.count
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
