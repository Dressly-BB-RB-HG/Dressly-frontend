import React, { useContext } from 'react'
import Termek from './Termek'
import { ApiContext } from '../contexts/ApiContext'

function Termekek() {

    const {termekLista} = useContext(ApiContext)

  return (
    <div className="termekek row">
        {termekLista?.length > 0 ? (
            termekLista.map((adat, index) => (
                <Termek adat={adat} key={index} />
            ))
        ) : (
            <p>Nincsenek elérhető termékek.</p>
        )}
    </div>
  )
}

export default Termekek
