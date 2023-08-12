import PropTypes from 'prop-types'
import '../styles/PokemonType.css'

function PokemonType({ type }) {
  const typeName = type?.name

  const borderColor = () => {
    return `${typeName}-border-color`
  }

  const color = () => {
    return `${typeName}-color`
  }

  return (
    <div className={`inline-flex items-center px-1 mr-1 bg-white border rounded-lg ${borderColor()}`}>
      {/* <img v-if="getTypeIcon" :src="getTypeIcon" alt="" class="w-5 mr-1" /> */}
      <div className={`font-sm ${color()}`}>{typeName}</div>
    </div>
  )
}

PokemonType.propTypes = {
  type: PropTypes.object,
}

PokemonType.defaultProps = {
  type: null,
}

export default PokemonType
