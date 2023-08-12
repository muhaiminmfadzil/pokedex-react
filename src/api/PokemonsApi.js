import axios from 'axios'

axios.defaults.baseURL = 'https://pokeapi.co/api/v2'

const sanitizeData = (obj) => {
  let newObj = { ...obj }
  // Number
  const splitUrl = obj.url.split('/')
  newObj.number = String(splitUrl[splitUrl.length - 2]).padStart(3, '0')

  return newObj
}

export const PokemonsApi = async ({ limit, offset }) => {
  const params = {
    limit,
    offset,
  }
  const { data } = await axios.get('/pokemon', { params })
  const pokemons = data.results.map((result) => sanitizeData(result))
  const totalCount = data.count

  return {
    pokemons,
    totalCount,
  }
}

export const StatusApi = async (stringId) => {
  const id = Number(stringId)
  const { data } = await axios.get(`/pokemon/${id}`)
  return { data }
}
