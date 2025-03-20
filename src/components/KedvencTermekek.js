import React, { useContext } from 'react'
import Termek from './Termek'
import { ApiContext } from '../contexts/ApiContext'

function KedvencTermekek() {
  const { kedvencek } = useContext(ApiContext)

  return (
    <div className="termekek-container">
      {kedvencek.map((adat, index) => (
        <Termek adat={adat} key={index} />
      ))}
    </div>
  )
}

export default KedvencTermekek