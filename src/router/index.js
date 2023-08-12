import { createBrowserRouter } from 'react-router-dom'
import PokemonView from '../pages/PokemonsView'
import PokemonDetail from '../pages/PokemonDetail'
import About from '../pages/About'

const router = createBrowserRouter([
  {
    path: '/',
    element: <PokemonView />,
  },
  {
    path: '/about',
    element: <About />,
  },
  {
    path: '/:id',
    element: <PokemonDetail />,
  },
])

export default router
