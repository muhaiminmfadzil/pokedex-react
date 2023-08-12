import { useState } from 'react'
import PropTypes from 'prop-types'

function HandleImage({ src, alt, errorItem }) {
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)

  const handleImageLoaded = () => {
    setIsLoading(false)
  }

  const handleImageError = () => {
    setIsLoading(false)
    setIsError(true)
  }

  return (
    <>
      {isLoading && (
        <div className='flex items-center justify-center'>
          <div className='spinner'></div>
        </div>
      )}
      {(() => {
        if (isError) {
          return errorItem ? <div className='text-3xl font-semibold'>{errorItem}</div> : <div></div>
        }
        return <img src={src} alt={alt} onLoad={handleImageLoaded} onError={handleImageError} />
      })()}
    </>
  )
}

HandleImage.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string,
  errorItem: PropTypes.string,
}

HandleImage.defaultProps = {
  alt: '',
  errorItem: null,
}

export default HandleImage
