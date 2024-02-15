/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'

export function Board ({ modulos, setDraggedItemId, draggedItemId }) {
  const [positions, setPositions] = useState([])

  useEffect(() => {
    const positions = modulos.map((modulo) => {
      return {
        id: modulo.id,
        x: randomInt(0, 1000),
        y: randomInt(0, 500)
      }
    })
    setPositions(positions)
  }, [modulos])

  const handleDragOver = (event) => {
    event.preventDefault()
  }

  const handleDrop = (event) => {
    event.preventDefault()
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

const Modulo = ({ id, nombre, idRegimen, horasSemanales, color, setDraggedItemId, position }) => {
  const handleDragStart = (event) => {
    setDraggedItemId(parseInt(event.target.id))
  }

  const handleDragEnd = () => {
    setDraggedItemId(null)
  }

  return (
    <div
      id={id.toString()} // Se establece el ID como el índice del módulo
      className={`bg-[${color}] w-36 h-36 absolute cursor-grab active:cursor-grabbing`}
      style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
      draggable='true'
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <h1>{nombre}</h1>
      <p>{idRegimen}</p>
      <p>{horasSemanales}</p>
    </div>
  )
}

function randomInt (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}
