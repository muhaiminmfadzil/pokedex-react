import { Listbox } from '@headlessui/react'
import { useContext, useEffect, useState } from 'react'
import PokemonContext from '../context/PokemonContext'
import PaginationNumbers from './PaginationNumbers'

function Paginator() {
  const { currentPage, totalPages, offset, limit, totalCount, setCurrentPage } = useContext(PokemonContext)
  const [hasPrevious, setHasPrevious] = useState(false)
  const [hasNext, setHasNext] = useState(false)
  const [fromCounter, setFromCounter] = useState(1)
  const [toCounter, setToCounter] = useState(20)

  const pages = () =>
    Array(totalPages)
      .fill()
      .map((_, index) => index + 1)

  useEffect(() => {
    setFromCounter(offset + 1)
    setToCounter(offset + limit)
    setHasPrevious(currentPage !== 1)
    setHasNext(currentPage !== totalPages)
  }, [currentPage, totalPages, offset, limit])

  const handleScroll = () => {
    // Equal to nextTick on vuejs
    setTimeout(() => {
      const selectedPageDiv = document.querySelector('div#current-page')
      if (selectedPageDiv) {
        selectedPageDiv.scrollIntoView({ block: 'center' })
      }
    })
  }

  const handleClickPrevious = () => {
    setCurrentPage((current) => current - 1)
  }

  const handleClickNext = () => {
    setCurrentPage((current) => current + 1)
  }

  return (
    <div className='flex items-center justify-between px-4 py-3 bg-white border-t border-gray-200 sm:px-6'>
      {/* Mobile nav */}
      <div className='flex justify-between flex-1 sm:hidden'>
        <button
          className={`inline-flex items-center px-4 py-2 text-sm font-medium rounded-md w-[25%] justify-center ${hasPrevious ? 'bg-blue-800 text-blue-50' : 'bg-gray-100 text-gray-300 border'}`}
          disabled={!hasPrevious}
          onClick={handleClickPrevious}
        >
          Previous
        </button>
        <Listbox value={currentPage} onChange={setCurrentPage} className='relative inline-flex items-center text-sm w-[25%] justify-center' as='div'>
          <Listbox.Button className='px-4 py-2 border rounded-lg whitespace-nowrap' onClick={handleScroll}>
            <span>
              {currentPage} of {totalPages}
            </span>
          </Listbox.Button>
          <Listbox.Options className='absolute w-[100px] bottom-11 rounded-lg z-10 h-[50dvh] overflow-auto bg-blue-100 shadow-md'>
            {pages().map((page) => (
              <Listbox.Option key={page} value={page}>
                {({ active }) => (
                  <div id={active ? 'current-page' : null} className={`w-full block text-center px-4 py-2 whitespace-nowrap ${active ? 'bg-blue-600 text-white' : 'hover:bg-blue-200'}`}>
                    {page}
                  </div>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Listbox>
        <button
          className={`inline-flex items-center px-4 py-2 text-sm font-medium rounded-md w-[25%] justify-center ${hasNext ? 'bg-blue-800 text-blue-50' : 'bg-gray-100 text-gray-300 border'}`}
          disabled={!hasNext}
          onClick={handleClickNext}
        >
          Next
        </button>
      </div>
      {/* Desktop nav */}
      <div className='hidden sm:flex sm:flex-1 sm:items-center sm:justify-between'>
        <div>
          <p className='text-sm text-gray-700'>
            Showing&nbsp;
            <span className='font-medium'>{fromCounter}</span> to&nbsp;
            <span className='font-medium'>{toCounter}</span> of&nbsp;
            <span className='font-medium'>{totalCount}</span> results
          </p>
        </div>
        <div>
          <nav className='inline-flex -space-x-px rounded-md shadow-sm isolate' aria-label='Pagination'>
            <button
              className={`relative inline-flex items-center px-2 py-2 text-gray-400 rounded-l-md ring-1 ring-inset ring-gray-300 ${
                hasPrevious ? 'hover:bg-gray-50 focus:outline-offset-0 focus:z-20' : 'text-gray-300 bg-gray-100'
              }`}
              disabled={!hasPrevious}
              onClick={handleClickPrevious}
            >
              <span className='sr-only'>Previous</span>
              <svg className='w-5 h-5' viewBox='0 0 20 20' fill='currentColor' aria-hidden='true'>
                <path fillRule='evenodd' d='M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z' clipRule='evenodd' />
              </svg>
            </button>
            <PaginationNumbers />
            <button
              className={`relative inline-flex items-center px-2 py-2 text-gray-400 rounded-r-md ring-1 ring-inset ring-gray-300 ${
                hasNext ? 'hover:bg-gray-50 focus:outline-offset-0 focus:z-20' : 'text-gray-300 bg-gray-100'
              }`}
              disabled={!hasNext}
              onClick={handleClickNext}
            >
              <span className='sr-only'>Next</span>
              <svg className='w-5 h-5' viewBox='0 0 20 20' fill='currentColor' aria-hidden='true'>
                <path fillRule='evenodd' d='M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z' clipRule='evenodd' />
              </svg>
            </button>
          </nav>
        </div>
      </div>
    </div>
  )
}

export default Paginator
