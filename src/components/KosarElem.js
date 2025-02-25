import React, { useContext } from 'react';
import { KosarContext } from '../contexts/KosarContext';

function KosarElem(props) {
  const { kosarbolTorol } = useContext(KosarContext);


  const handleDelete = () => {
    kosarbolTorol(props.adat.termek_id);
  };

  return (
    <div>
      Gyártó: {props.adat.modell.gyarto} Ár: {props.adat.ar}Ft Méret: {props.adat.meret}
      <button onClick={handleDelete}>🗑️</button>
    </div>
  );
}

export default KosarElem;
