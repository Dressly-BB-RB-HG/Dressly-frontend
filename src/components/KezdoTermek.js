import React, { useContext, useState } from 'react'
import { KosarContext } from '../contexts/KosarContext'
import './KezdoTermek.css'
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Button } from 'react-bootstrap';

function Termek(props) {
  const { kosarbaTesz } = useContext(KosarContext)
  const [showModal, setShowModal] = useState(false);

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
          alt={props.adat.modell.tipus}
          src={props.adat.modell.kep}
          onClick={handleImageClick}
          style={{ cursor: "pointer", width: '100%', height: 'auto' }}
        /> 
        <p className="kar">{props.adat.ar} Ft</p>
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


export default Termek
