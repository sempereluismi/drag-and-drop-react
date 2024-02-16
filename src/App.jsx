import { Board } from './components/Board'
import { Profesores } from './components/Profesores'
import { ModulosProfesoresProvider } from './context/ModulosProfesoresContext'

function App () {
  return (
    <ModulosProfesoresProvider>
      <main className='bg-neutral-800 grid grid-cols-[400px_1fr] h-screen text-white'>
        <Profesores />
        <Board />
      </main>
    </ModulosProfesoresProvider>
  )
}

export default App
