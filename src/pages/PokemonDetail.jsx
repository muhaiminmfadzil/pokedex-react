// import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { DetailApi } from '../api/PokemonsApi'
import AnimatedSpinner from '../components/AnimatedSpinner'
import PokemonImage from '../components/PokemonImage'
import PokemonType from '../components/PokemonType'
import PokemonStatus from '../components/PokemonStatus'
import { useQuery } from 'react-query'

function PokemonDetail() {
  let { id } = useParams()

  const fetchDetail = async () => {
    const { data } = await DetailApi(id)
    return data
  }

  const { isLoading, isError, data } = useQuery({ queryKey: ['pokemon-detail', id], queryFn: fetchDetail })

  return (
    <div className='max-w-4xl p-4 mx-auto'>
      {/* Back button */}
      <Link to='/'>
        <button className='flex items-center px-1 py-2 mb-4 text-blue-800 rounded-lg hover:bg-blue-100'>
          <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth='1.5' stroke='currentColor' className='w-6 h-6 mr-1'>
            <path strokeLinecap='round' strokeLinejoin='round' d='M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3' />
          </svg>
          Back
        </button>
      </Link>
      {/* Detail */}
      {(() => {
        // Error state
        if (isError) {
          return (
            <div className='flex items-center justify-center h-[60dvh] text-xl text-center font-normal text-blue-800'>
              Oppss.. Something goes wrong
              <br />
              Please try again later
            </div>
          )
        }
        // Loading state
        if (isLoading) {
          return (
            <div className='flex items-center justify-center h-[60dvh]'>
              <AnimatedSpinner size='large' />
            </div>
          )
        }
        // Success
        return (
          <>
            {/* Image */}
            <PokemonImage number={id} />
            {/* Name and id */}
            <div className='flex items-baseline justify-between p-2 mt-6'>
              <div className='text-3xl font-semibold text-blue-800 uppercase'>{data.name}</div>
              <div className='text-base font-semibold text-blue-400'>#{id}</div>
            </div>
            {/* Types */}
            {data.types.map((type) => (
              <PokemonType key={type.slot} type={type.type} />
            ))}
            {/* Status */}
            <div className='my-4'>
              <PokemonStatus stats={data.stats} />
            </div>
          </>
        )
      })()}
    </div>
  )
}
export default PokemonDetail
