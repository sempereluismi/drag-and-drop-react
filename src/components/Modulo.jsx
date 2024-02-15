/* eslint-disable react/prop-types */
export function Modulo ({ nombre, idRegimen, horasSemanales, color }) {
  return (
    <div className={`bg-[${color}] w-36 h-36`}>
      <h1>{nombre}</h1>
      <p>{idRegimen}</p>
      <p>{horasSemanales}</p>
    </div>
  )
}
