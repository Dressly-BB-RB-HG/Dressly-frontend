import React, { useContext } from 'react'
import Termek from './Termek'
import { ApiContext } from '../contexts/ApiContext'

function Termekek() {

    const {termekLista} = useContext(ApiContext)


  return (
    <div className="termekek row">
        {termekLista.map((adat, index) => (
                <Termek adat={adat} key={index} />
            ))}
    </div>
  )
}

export default Termekek
