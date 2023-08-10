import '../styles/PokemonCard.css'
import PokemonImage from './PokemonImage'

function PokemonCard() {
  return (
    <>
      <li className='flex flex-col col-span-1 text-center duration-300 divide-y divide-gray-200 rounded-lg shadow bg-blue-50 hover:cursor-pointer sm:hover:shadow-lg sm:hover:scale-105'>
        <div className='flex flex-col flex-1 p-4 rounded-lg card-color'>
          <PokemonImage />
          <div className='mt-3 text-sm font-medium text-blue-500'>#001</div>
          <div className='text-xl font-semibold text-blue-900'>Bulbasaur</div>
        </div>
      </li>
    </>
  )
}
export default PokemonCard
