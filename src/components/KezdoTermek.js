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
