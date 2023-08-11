import { Listbox } from '@headlessui/react'
import { useContext, useEffect, useState } from 'react'
import PokemonContext from '../context/PokemonContext'

function Paginator() {
  const { currentPage, totalPages, setCurrentPage } = useContext(PokemonContext)
  const [hasPrevious, setHasPrevious] = useState(false)
  const [hasNext, setHasNext] = useState(false)

  const pages = () =>
    Array(totalPages)
      .fill()
      .map((_, index) => index + 1)

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

  useEffect(() => {
    setHasPrevious(currentPage !== 1)
    setHasNext(currentPage !== totalPages)
  }, [currentPage, totalPages])

  return (
    <div className='flex items-center justify-between px-4 py-3 bg-white border-t border-gray-200 sm:px-6'>
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
    </div>
  )
}

export default Paginator
