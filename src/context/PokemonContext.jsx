import { createContext, useContext, useState } from 'react'

const PaginationContext = createContext()

export const usePaginationContext = () => {
  return useContext(PaginationContext)
}

export const PaginationProvider = ({ children }) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [totalCount, setTotalCount] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [offset, setOffset] = useState(0)
  const limit = 20

  return (
    <PaginationContext.Provider
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
    </PaginationContext.Provider>
  )
}
