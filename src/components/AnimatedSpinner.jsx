import PropTypes from 'prop-types'

function AnimatedSpinner({ size }) {
  const spinnerSize = () => {
    const sizeSpecs = {
      small: 'h-6 w-6',
      medium: 'h-10 w-10',
      large: 'h-14 w-14',
    }

    return sizeSpecs[size] || 'h-10 w-10'
  }

  const spinnerBorderWidth = () => {
    const sizeSpecs = {
      small: 'border',
      medium: 'border-2',
      large: 'border-8',
    }

    return sizeSpecs[size] || 'border-2'
  }

  return <div className={`inline-block rounded-full animate-spin border-t-gray-100 border-l-gray-100 border-b-gray-100 border-r-blue-500 ${spinnerSize()} ${spinnerBorderWidth()}`}></div>
}

AnimatedSpinner.propTypes = {
  size: PropTypes.string,
}

export default AnimatedSpinner
