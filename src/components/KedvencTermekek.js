import React, { useContext } from 'react'

import { ApiContext } from '../contexts/ApiContext'
import Termek from './Termek'

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