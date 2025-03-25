import React, { useContext } from 'react'

import { ApiContext } from '../contexts/ApiContext'
import Termek from './Termek'

function KedvencTermekek() {
  const { kedvencek } = useContext(ApiContext)

  return (
    <div className="row">
      {kedvencek.map((adat, index) => (
        <div className="col-lg-3 col-md-4 col-sm-6 mb-4" key={index}>
          <Termek adat={adat} />
        </div>
      ))}
    </div>
  )
}

export default KedvencTermekek