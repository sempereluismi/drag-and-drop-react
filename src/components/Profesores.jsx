/* eslint-disable react/prop-types */
import { useState, useContext } from 'react'
import { ModulosProfesoresContext } from '../context/ModulosProfesoresContext'

export function Profesores () {
  const { profesores, draggedItemId, modulos } = useContext(ModulosProfesoresContext)

  return (
    <aside className='m-4 bg-neutral-700 rounded-lg'>
      <ul>
        {
            profesores.map((profesor) => {
              return <Profesor key={profesor.id} profesor={profesor} draggedItemId={draggedItemId} modulos={modulos} />
            })
        }
      </ul>
    </aside>
  )
}

const Profesor = ({ profesor, draggedItemId, modulos }) => {
  const { setModulos, setDraggedModulo, draggedModulo } = useContext(ModulosProfesoresContext)
  const [active, setActive] = useState(false)

  const handleDragOver = (event) => {
    event.preventDefault()
    setActive(true)
  }

  const handleDrop = (event) => {
    event.preventDefault()
    if (!draggedModulo) {
      const modulo = modulos.find(modulo => modulo.id === draggedItemId)
      profesor.modulos = [...profesor.modulos, modulo]
      const nuevosModulos = modulos.filter(modulo => modulo.id !== draggedItemId)
      setModulos(nuevosModulos)
    } else {
      profesor.modulos = [...profesor.modulos, draggedModulo]
    }
    setActive(false)
  }

  const handleDragStart = (event) => {
    const modulo = profesor.modulos.find(modulo => modulo.id === parseInt(event.target.id))
    setDraggedModulo(modulo)
  }

  const handleDragEnd = () => {
    const nuevosModulosProfesor = profesor.modulos.filter(modulo => modulo.id !== parseInt(event.target.id))
    profesor.modulos = nuevosModulosProfesor
    setDraggedModulo(null)
  }
  return (
    <>
      <li
        className={`px-3 py-5 
    ${active ? 'border-white border-2' : 'border-0'}`}
        onDragOver={handleDragOver}
        onDragLeave={() => setActive(false)}
        onDrop={handleDrop}
      >{profesor.nombre}
        {profesor.modulos.length > 0 &&
          <ul className='flex gap-x-2'>
            {profesor.modulos.map(modulo => {
              return (
                <li key={modulo.id} id={modulo.id} className='w-12 h-12 bg-yellow-300 text-black' draggable='true' onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
                  <div className='flex justify-center items-center h-full'>
                    {modulo.nombre}
                  </div>
                </li>
              )
            })}
          </ul>}
      </li>
    </>
  )
}
