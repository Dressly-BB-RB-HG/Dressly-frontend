import React, { useContext, useState } from 'react'
import { KosarContext } from '../contexts/KosarContext'
import './Termek.css'
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Button } from 'react-bootstrap';

function KedvencTermek(props) {
  const { kosarbaTesz } = useContext(KosarContext)
  const [kedvenc, setKedvenc] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const kedvencKezelo = () => {
    setKedvenc(!kedvenc);
  };


  const handleImageClick = () => { 
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };


  return (
    <div className="card">
      <div className="card-body">
        <img
          className="kep card-img-top"
          alt={props.adat.modell.tipus + props.adat.modell.kategoria.ruhazat_kat}
          src={props.adat.modell.kep}
          onClick={handleImageClick}
          style={{ cursor: "pointer", width: '100%', height: 'auto' }}
        /> 
        <h4 className="gyarto card-text">{props.adat.modell.gyarto} {props.adat.modell.kategoria.ruhazat_kat}</h4>
        <p className="ar card-text">{props.adat.ar} Ft</p>
        <div className="gombok">
          <button className="kosarbagomb btn btn-primary mt-4" onClick={() => kosarbaTesz(props.adat)}>Kosárba tesz</button>
          <button className={`kedvenc-gomb ${kedvenc ? 'kedvenc-aktiv' : ''}`} onClick={kedvencKezelo}>
            {kedvenc ? '♥' : '♡'}
          </button>
        </div>
      </div>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{props.adat.tipus}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img src={props.adat.modell.kep} alt={props.adat.modell.tipus} className="modal-img" style={{ aspectRatio: 19 / 23, objectFit: 'cover' }} />
          <p>Kategória: {props.adat.modell.kategoria.ruhazat_kat}</p>
          <p>Gyártó: {props.adat.modell.gyarto}</p>
          <p>Ár: {props.adat.ar} Ft</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>Bezárás</Button>
          <Button variant="primary" onClick={() => {
            setShowModal(false); 
            kosarbaTesz(props.adat);
          }}>Kosárba tesz</Button>
        </Modal.Footer>
      </Modal>
    </div>


  )
}


export default KedvencTermek;
