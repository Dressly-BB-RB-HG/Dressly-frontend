import React, { useContext, useEffect, useState } from 'react'
import { KosarContext } from '../contexts/KosarContext'
import './KezdoTermek.css'
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Modal, Button } from 'react-bootstrap';
import { myAxios } from '../contexts/MyAxios';

function KezdoTermek(props) {
  const { kosarbaTesz } = useContext(KosarContext)
  const [showModal, setShowModal] = useState(false);
 const [kivalasztottMeret, setKivalasztottMeret] = useState('');
 const [meretek, setMeretek] = useState([]);
 useEffect(() => {
     const fetchMeretek = async () => {
       try {
         // Lekérjük az összes elérhető méretet a modell_id alapján
         const response = await myAxios.get(`/api/elerhetoMeretek/${props.adat.modell_id}`);
         setMeretek(response.data);  // Elérhető méretek beállítása
       } catch (error) {
         console.error("Hiba a méretek lekérésekor:", error);
       }
     };
 
     if (props.adat?.modell_id) {
       fetchMeretek();
     } else {
       console.log("A modell_id nem található!");
     }
   }, [props.adat]);
  const handleImageClick = () => { 
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };


  return (
    <div>
        <img
          className="kkep"
          alt={props.adat.tipus}
          src={props.adat.kep}
          onClick={handleImageClick}
          style={{ cursor: "pointer", width: '100%', height: 'auto' }}
        /> 
        <p className="kar">{props.adat.termekek.slice(0, 1).map(termek => 
            termek.arak_megjelenit?.length > 0 
              ? termek.arak_megjelenit[0].uj_ar 
              : termek.ar
          ).join(', ')} Ft</p>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{props.adat.tipus}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img src={props.adat.kep} alt={props.adat.tipus} className="modal-img" style={{ aspectRatio: 19 / 23, objectFit: 'cover' }} />
          <p>Kategória: {props.adat.kategoria.ruhazat_kat}</p>
          <p>Gyártó: {props.adat.gyarto}</p>
          <p className="ar card-text">
          {props.adat.termekek.slice(0, 1).map(termek => 
            termek.arak_megjelenit?.length > 0 
              ? termek.arak_megjelenit[0].uj_ar 
              : termek.ar
          ).join(', ')} Ft
        </p>
        <Form.Select value={kivalasztottMeret} onChange={(e) => setKivalasztottMeret(e.target.value)} className="mb-3">
          <option value="">Válassz méretet</option>
          {meretek.map((meret, index) => (
            <option key={index} value={meret}>{meret}</option>
          ))}
        </Form.Select>
        </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleCloseModal}>Bezárás</Button>
                  <Button variant="primary" onClick={() => {
                    if (kivalasztottMeret) {
                      kosarbaTesz({ ...props.adat, meret: kivalasztottMeret });
                      setShowModal(false);
                    }// else {
                    //  setMessage('Válassz méretet a vásárláshoz!');
                    //}
                  }}>
                    Kosárba
                  </Button>
                </Modal.Footer>
              </Modal>
    </div>


  )
}


export default KezdoTermek
