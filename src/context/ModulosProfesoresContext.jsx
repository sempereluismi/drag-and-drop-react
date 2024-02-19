/* eslint-disable react/prop-types */
import { createContext, useState } from 'react'
import modulosMook from '../mooks/modulos.json'
import profesoresMook from '../mooks/profesores.json'

// Crear el contexto
export const ModulosProfesoresContext = createContext()
// Crear el proveedor
export function ModulosProfesoresProvider ({ children }) {
  const [modulos, setModulos] = useState(modulosMook)
  const [profesores, setProfesores] = useState(profesoresMook)
  const [draggedModulo, setDraggedModulo] = useState(null)
  const [draggedProfesor, setDraggedProfesor] = useState(null)
  const [draggedFromBoard, setDraggedFromBoard] = useState(false)

  const contextValue = {
    modulos,
    setModulos,
    profesores,
    setProfesores,
    draggedModulo,
    setDraggedModulo,
    draggedFromBoard,
    setDraggedFromBoard,
    draggedProfesor,
    setDraggedProfesor
  }

  return (
    <ModulosProfesoresContext.Provider value={contextValue}>
      {children}
    </ModulosProfesoresContext.Provider>
  )
}
