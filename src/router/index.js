import { createBrowserRouter } from 'react-router-dom'
import PokemonView from '../pages/PokemonsView'
import PokemonStatus from '../pages/PokemonStatus'

const router = createBrowserRouter([
  {
    path: '/',
    element: <PokemonView />,
  },
  {
    path: '/:id',
    element: <PokemonStatus />,
  },
])

export default router
