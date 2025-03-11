import React, { useContext } from 'react';
import { KosarContext } from '../contexts/KosarContext';

function KosarElem(props) {
  const { kosarbolTorol } = useContext(KosarContext);


  const handleDelete = () => {
    console.log("Törlendő termék ID:", props.adat.termek.termek_id);
    kosarbolTorol(props.adat.termek.termek_id);
  };

  return (
    <div>
       Ár: {props.adat.ar}Ft
       Méret: {props.adat.meret} Szín: {props.adat.szin}
      <button onClick={handleDelete}>🗑️</button>
    </div>
  );
}

export default KosarElem;
