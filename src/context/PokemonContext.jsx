import { createContext, useContext, useState } from 'react'

const PokemonContext = createContext()

export const usePokemonContext = () => {
  return useContext(PokemonContext)
}

export const PokemonProvider = ({ children }) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [totalCount, setTotalCount] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [offset, setOffset] = useState(0)
  const limit = 20

  return (
    <PokemonContext.Provider
      value={{
        currentPage,
        totalCount,
        limit,
        offset,
        totalPages,
        setCurrentPage,
        setTotalCount,
        setTotalPages,
        setOffset,
      }}
    >
      {children}
    </PokemonContext.Provider>
  )
}
