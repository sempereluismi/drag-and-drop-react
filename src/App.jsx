import { Board } from './components/Board'
import { Profesores } from './components/Profesores'
import profesores from './mooks/profesores.json'
import modulos from './mooks/modulos.json'
import { useState } from 'react'

function App () {
  const [draggedItemId, setDraggedItemId] = useState(null)
  return (
    <main className='bg-neutral-800 grid grid-cols-[400px_1fr] h-screen text-white'>
      <Profesores profesores={profesores} draggedItemId={draggedItemId} setDraggedItemId={setDraggedItemId} />
      <Board modulos={modulos} draggedItemId={draggedItemId} setDraggedItemId={setDraggedItemId} />
    </main>
  )
}

export default App
