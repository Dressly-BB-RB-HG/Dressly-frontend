import React, { useContext } from 'react'
import { KosarContext } from '../contexts/KosarContext';

function KosarElem(props) {
  const { kosarbolTorol } = useContext(KosarContext);
  return (
    <div>
        Gyártó: {props.adat.modell.gyarto} Ár: {props.adat.ar}Ft Méret: {props.adat.meret}
        <button onClick={kosarbolTorol}>🗑️</button>
    </div>
  )
}

export default KosarElem