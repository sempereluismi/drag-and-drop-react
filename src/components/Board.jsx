/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from 'react'
import { ModulosProfesoresContext } from '../context/ModulosProfesoresContext'

export function Board () {
  const [positions, setPositions] = useState([])
  const { modulos, draggedItemId, setDraggedItemId, draggedModulo, setModulos } = useContext(ModulosProfesoresContext)

  useEffect(() => {
    const positions = modulos.map((modulo) => {
      return {
        id: modulo.id,
        x: randomInt(0, 1000),
        y: randomInt(0, 500)
      }
    })
    setPositions(positions)
  }, [])

  const handleDragOver = (event) => {
    event.preventDefault()
  }

  const handleDrop = (event) => {
    event.preventDefault()

    if (!draggedModulo) {
      const draggedItemRect = document.getElementById(draggedItemId).getBoundingClientRect()
      const rect = event.target.getBoundingClientRect()
      const x = (event.clientX - (draggedItemRect.width / 2)) - rect.left
      const y = (event.clientY - (draggedItemRect.height / 2)) - rect.top

      setPositions(prevPositions => {
        const updatedPositions = prevPositions.map(position => {
          if (position.id === draggedItemId) {
            return {
              ...position,
              x,
              y
            }
          }
          return position
        })
        return updatedPositions
      })
    } else {
      const nuevosModulos = [...modulos, draggedModulo]
      setModulos(nuevosModulos)
    }

    setDraggedItemId(null)
  }

  return (
    <section className='m-4 bg-neutral-700 rounded-lg relative' onDragOver={handleDragOver} onDrop={handleDrop}>
      <ul>
        {modulos.map((modulo) => {
          return (positions.length > 0 &&
            <Modulo key={modulo.id} {...modulo} setDraggedItemId={setDraggedItemId} position={positions[modulo.id - 1]} />
          )
        })}
      </ul>
    </section>
  )
}

const Modulo = ({ id, nombre, regimen, horasSemanales, color, setDraggedItemId, position }) => {
  const handleDragStart = (event) => {
    setDraggedItemId(parseInt(event.target.id))
  }

  const handleDragEnd = () => {
    setDraggedItemId(null)
  }

  return (
    <div
      id={id.toString()} // Se establece el ID como el índice del módulo
      className='bg-yellow-300 w-36 h-36 absolute cursor-grab active:cursor-grabbing text-black'
      style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
      draggable='true'
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <h1>{nombre}</h1>
      <p>{regimen}</p>
      <p>{horasSemanales}</p>
    </div>
  )
}

function randomInt (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}
