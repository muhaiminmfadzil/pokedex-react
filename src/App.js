import PokemonsView from './pages/PokemonsView'
import { PokemonProvider } from './context/PokemonContext'

function App() {
  return (
    <PokemonProvider>
      <div className='relative min-h-screen bg-blue-200'>
        <PokemonsView />
      </div>
    </PokemonProvider>
  )
}

export default App
