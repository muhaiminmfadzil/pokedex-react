import { useContext, useState } from 'react'
import PokemonContext from '../context/PokemonContext'

function Paginator() {
  const [showPaginateMenu, setShowPaginateMenu] = useState(false)
  const { currentPage, totalPage } = useContext(PokemonContext)

  const handleTogglePaginateMenu = () => {
    setShowPaginateMenu((prevState) => !prevState)
  }

  const isCurrentPage = (value) => {
    return currentPage === value
  }

  return (
    <div className='flex items-center justify-between px-4 py-3 bg-white border-t border-gray-200 sm:px-6'>
      <div className='flex justify-between flex-1 sm:hidden'>
        <button className='relative inline-flex items-center px-4 py-2 text-sm font-medium rounded-md w-[25%] justify-center'>Previous</button>
        <button className='relative inline-flex items-center px-4 py-2 text-sm border rounded-md whitespace-nowrap w-[25%] justify-center' onClick={handleTogglePaginateMenu}>
          {currentPage} of {totalPage}
          {showPaginateMenu && (
            <ul className='absolute h-[50dvh] overflow-auto text-gray-700 inset-x-0 bottom-11 dropdown-menu rounded-md bg-blue-100 shadow-md'>
              {Array(totalPage)
                .fill()
                .map((_, index) => {
                  const page = index + 1
                  return (
                    <li key={page}>
                      <span data-page={page} className={`w-full block px-4 py-2 whitespace-nowrap ${isCurrentPage(page) ? 'bg-blue-600 text-white' : 'hover:bg-blue-200'}`}>
                        {page}
                      </span>
                    </li>
                  )
                })}
            </ul>
          )}
        </button>
        <button className='relative inline-flex items-center px-4 py-2 text-sm font-medium rounded-md w-[25%] justify-center'>Next</button>
      </div>
    </div>
  )
}

export default Paginator
