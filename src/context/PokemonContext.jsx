import axios from 'axios'
import { createContext, useEffect, useState } from 'react'

const PokemonContext = createContext()

export const PokemonProvider = ({ children }) => {
  const [pokemons, setPokemons] = useState([])
  const [isFetching, setIsFetching] = useState(true)
  const [isError, setIsError] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)

  // const currentPage = 1
  const totalPage = 64

  const sanitizeData = (obj) => {
    let newObj = { ...obj }
    // Number
    const splitUrl = obj.url.split('/')
    newObj.number = String(splitUrl[splitUrl.length - 2]).padStart(3, '0')

    return newObj
  }

  useEffect(() => {
    const fetchPokemons = async () => {
      const params = {
        limit: 20,
        offset: 0,
      }
      try {
        setIsFetching(true)
        const { data } = await axios.get('https://pokeapi.co/api/v2/pokemon', { params })
        const pokemons = data.results.map((result) => sanitizeData(result))
        setPokemons(pokemons)
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
        totalPage,
        setCurrentPage,
      }}
    >
      {children}
    </PokemonContext.Provider>
  )
}

export default PokemonContext
