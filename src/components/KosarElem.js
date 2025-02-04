import React, { useContext } from 'react'
import { KosarContext } from '../contexts/KosarContext';

function KosarElem(props) {
  const { kosarbolTorol } = useContext(KosarContext);
  return (
    <div>
        {props.adat.gyarto}-{props.adat.ar}Ft{props.adat.meret}
        <button onClick={kosarbolTorol}>🗑️</button>
    </div>
  )
}

export default KosarElem