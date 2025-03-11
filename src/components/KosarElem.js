import React, { useContext } from "react";
import { KosarContext } from "../contexts/KosarContext";

function KosarElem(props) {
  const { kosarbolTorol } = useContext(KosarContext);

  const handleDelete = () => {
    kosarbolTorol(props.adat.termek.termek_id);
  };

  return (
    <div>
      
      <img src={props.adat.termek.modell.kep} alt={props.adat.termek.modell.gyarto}/>
      <p>Gyártó: {props.adat.termek.modell.gyarto}</p>
      <p>Ár: {props.adat.ar}Ft</p>
      <p>Méret: {props.adat.meret}</p>
      <p>Szín: {props.adat.szin}</p>
      <p>Mennyiség: {props.adat.mennyiseg}</p>
      
      <button onClick={handleDelete}>🗑️</button>
    </div>
  );
}

export default KosarElem;
