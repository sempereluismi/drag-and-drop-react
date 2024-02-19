/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from 'react'
import { ModulosProfesoresContext } from '../context/ModulosProfesoresContext'

export function Board () {
  const [positions, setPositions] = useState([])
  const { modulos, setDraggedModulo, draggedModulo, setModulos, draggedFromBoard, profesores } = useContext(ModulosProfesoresContext)

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

    if (draggedFromBoard) {
      const draggedItemRect = document.getElementById(draggedModulo.id).getBoundingClientRect()
      const rect = event.target.getBoundingClientRect()
      const x = (event.clientX - (draggedItemRect.width / 2)) - rect.left
      const y = (event.clientY - (draggedItemRect.height / 2)) - rect.top

      setPositions(prevPositions => {
        const updatedPositions = prevPositions.map(position => {
          if (position.id === draggedModulo.id) {
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
      profesores.map((profesor) => {
        return (profesor.modulos = profesor.modulos.filter(modulo => modulo.id !== draggedModulo.id))
      })
      setModulos(nuevosModulos)
    }

    setDraggedModulo(null)
  }

  return (
    <section className='m-4 bg-neutral-700 rounded-lg relative' onDragOver={handleDragOver} onDrop={handleDrop}>
      <ul>
        {modulos.map((modulo) => {
          return (positions.length > 0 &&
            <Modulo key={modulo.id} modulo={modulo} position={positions[modulo.id - 1]} />
          )
        })}
      </ul>
    </section>
  )
}

const Modulo = ({ modulo, position }) => {
  const { setDraggedModulo, setDraggedFromBoard } = useContext(ModulosProfesoresContext)

  const handleDragStart = (event) => {
    setDraggedModulo(modulo)
    setDraggedFromBoard(true)
  }

  const handleDragEnd = () => {
    setDraggedModulo(null)
    setDraggedFromBoard(false)
  }

  return (
    <div
      id={modulo.id.toString()} // Se establece el ID como el índice del módulo
      className='w-36 h-36 absolute cursor-grab active:cursor-grabbing text-black'
      style={{ transform: `translate(${position.x}px, ${position.y}px)`, backgroundColor: modulo.color }}
      draggable='true'
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <h1>{modulo.nombre}</h1>
      <p>{modulo.regimen}</p>
      <p>{modulo.horasSemanales}</p>
    </div>
  )
}

function randomInt (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}
