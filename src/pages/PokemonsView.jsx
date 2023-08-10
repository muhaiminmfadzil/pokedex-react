import PokemonCard from '../components/PokemonCard'

function PokemonsView() {
  const listing = new Array(20).fill().map((x, idx) => idx)

  return (
    <>
      {/* Image */}
      <img className='object-cover w-64 h-32 pt-4 mx-auto' src='https://www.freepnglogos.com/uploads/pokemon-logo-png-0.png' alt='Pokemon Logo Png' />
      {/* Listing */}
      <ul className='grid max-w-4xl grid-cols-1 gap-6 px-8 pt-8 pb-[80px] mx-auto bg-blue-200 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
        {listing.map(() => (
          <PokemonCard />
        ))}
      </ul>
    </>
  )
}
export default PokemonsView
