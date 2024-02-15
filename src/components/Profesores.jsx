/* eslint-disable react/prop-types */
import { useState } from 'react'
export function Profesores ({ profesores }) {
  return (
    <aside className='m-4 bg-neutral-700 rounded-lg'>
      <ul>
        {
            profesores.map((profesor) => {
              return <Profesor key={profesor.id} profesor={profesor} />
            })
        }
      </ul>
    </aside>
  )
}

const Profesor = ({ profesor }) => {
  const [active, setActive] = useState(false)

  const handleDragOver = (event) => {
    event.preventDefault()
    setActive(true)
  }

  const handleDrop = (event) => {
    event.preventDefault()
    setActive(false)
  }
  return (
    <li
      className={`px-3 py-5 
    ${active ? 'border-white border-2' : 'border-0'}`}
      onDragOver={handleDragOver}
      onDragLeave={() => setActive(false)}
      onDrop={handleDrop}
    >{profesor.nombre}
    </li>
  )
}
