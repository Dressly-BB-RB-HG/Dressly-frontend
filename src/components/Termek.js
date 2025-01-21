import React, { useContext } from 'react'
import { KosarContext } from '../contexts/KosarContext'


function Termek(props) {
  const {kosarbaTesz}=useContext(KosarContext)

  return (
    <div className="card col-md-4 mb-4"> 
            <div className="card-body">
                <img className="kep card-img-top" alt={props.adat.tipus + props.adat.kategoria} src={props.adat.kep} />
                <h4 className="card-text">{props.adat.gyarto}</h4>
                <p className="card-text">{props.adat.ar}</p>
                <button className="gomb btn btn-primary mt-4" onClick={() => kosarbaTesz(props.adat)}>Kosárba tesz</button>
            </div>
       </div>
  )
}

export default Termek
