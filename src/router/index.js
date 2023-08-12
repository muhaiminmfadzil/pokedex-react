import { createBrowserRouter } from 'react-router-dom'
import PokemonView from '../pages/PokemonsView'
import PokemonDetail from '../pages/PokemonDetail'

const router = createBrowserRouter([
  {
    path: '/',
    element: <PokemonView />,
  },
  {
    path: '/:id',
    element: <PokemonDetail />,
  },
])

export default router
