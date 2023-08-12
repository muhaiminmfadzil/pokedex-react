function PokemonStatus() {
  return (
    <div className='max-w-4xl p-4 mx-auto'>
      <button className='flex items-center px-1 py-2 mb-4 text-blue-800 rounded-lg hover:bg-blue-100'>
        <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke-width='1.5' stroke='currentColor' className='w-6 h-6 mr-1'>
          <path stroke-linecap='round' stroke-linejoin='round' d='M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3' />
        </svg>
        Back
      </button>
    </div>
  )
}
export default PokemonStatus