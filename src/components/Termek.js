import React, { useContext, useState } from 'react'
import { KosarContext } from '../contexts/KosarContext'
import './Termek.css'

function Termek(props) {
  const { kosarbaTesz } = useContext(KosarContext)
  const [kedvenc, setKedvenc] = useState(false);

  const kedvencKezelo = () => {
    setKedvenc(!kedvenc);
  };

  return (
    <div className="card">
      <div className="card-body">
        <img className="kep card-img-top" alt={props.adat.tipus + props.adat.kategoria} src={props.adat.kep} />
        <h4 className="gyarto card-text">{props.adat.gyarto}</h4>
        <p className="ar card-text">{props.adat.ar}</p>
        <div className="gombok">
          <button className="kosarbagomb btn btn-primary mt-4" onClick={() => kosarbaTesz(props.data)}>Kosárba tesz</button>
          <button className={`kedvenc-gomb ${kedvenc ? 'kedvenc-aktiv' : ''}`}
          onClick={kedvencKezelo}
          >
            {kedvenc ? '♥' : '♡'}
          </button>
        </div>
      </div>
    </div>
  )
}


export default Termek
