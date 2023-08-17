import { usePokemonContext } from '../context/PokemonContext'

function PaginationNumbers() {
  const { currentPage, totalPages, setCurrentPage } = usePokemonContext()
  const isCurrentPage = (page) => {
    return currentPage === page
  }

  const isNumber = (value) => {
    return typeof value === 'number'
  }
  const paginationNumbers = () => {
    const getRange = (start, end) => {
      const length = end - start + 1
      return Array(length)
        .fill()
        .map((_, i) => start + i)
    }

    const clamp = (number, lower, upper) => {
      return Math.min(Math.max(number, lower), upper)
    }
    // Data preparation
    let curPage = currentPage
    const pageCount = totalPages
    let pagesShown = 9
    const MINIMUM_PAGE_SIZE = 5
    // Data validation
    let delta
    curPage = clamp(curPage, 1, pageCount)
    pagesShown = clamp(pagesShown, MINIMUM_PAGE_SIZE, pageCount)
    const centerPagesShown = pagesShown - 5
    const boundaryPagesShown = pagesShown - 3

    if (pageCount <= pagesShown) {
      delta = pagesShown
    } else {
      delta = curPage < boundaryPagesShown || curPage > pageCount - boundaryPagesShown ? boundaryPagesShown : centerPagesShown
    }

    const range = {
      start: Math.round(curPage - delta / 2),
      end: Math.round(curPage + delta / 2),
    }

    if (range.start - 1 === 1 || range.end + 1 === pageCount) {
      range.start += 1
      range.end += 1
    }
    let pages = curPage > delta ? getRange(Math.min(range.start, pageCount - delta), Math.min(range.end, pageCount)) : getRange(1, Math.min(pageCount, delta + 1))

    if (curPage > pageCount - boundaryPagesShown && pageCount > pagesShown) {
      pages = getRange(pageCount - delta, pageCount)
    }

    const withDots = (value, pair) => (pages.length + 1 !== pageCount ? pair : [value])
    const lastPage = pages[pages.length - 1]

    if (pages[0] !== 1) {
      pages = withDots(1, [1, '...']).concat(pages)
    }

    if (lastPage && lastPage < pageCount) {
      pages = pages.concat(withDots(pageCount, ['...', pageCount]))
    }

    return pages
  }

  return paginationNumbers().map((paginate, index) => {
    if (isNumber(paginate)) {
      return (
        <button
          key={`${paginate}-${index}`}
          className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold transition duration-200 ease-in delay-150 ring-1 ring-inset ring-gray-300 ${
            isCurrentPage(paginate) ? 'bg-blue-600 text-white' : 'hover:bg-blue-100 focus:z-20 focus:outline-offset-0 text-gray-900'
          }`}
          disabled={isCurrentPage(paginate)}
          onClick={() => setCurrentPage(paginate)}
        >
          {paginate}
        </button>
      )
    }

    return (
      <button key={`${paginate}-${index}`} className='relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900' disabled>
        {paginate}
      </button>
    )
  })
}
export default PaginationNumbers
