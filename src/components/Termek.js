import React, { useContext, useState } from 'react';
import { KosarContext } from '../contexts/KosarContext';
import './Termek.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Button } from 'react-bootstrap';
import { myAxios } from '../contexts/MyAxios';
import useAuthContext from '../contexts/AuthContext'; // Importáljuk a useAuthContext hookot
import { useKedvencek } from '../contexts/KedvencekContext';
import { ApiContext } from '../contexts/ApiContext';

function Termek(props) {
  const { kosarbaTesz } = useContext(KosarContext);
  const { user } = useAuthContext(); // Lekérjük a bejelentkezett felhasználót
  const { kedvencek, kedvenchezAd, kedvencTorol } = useKedvencek();
  const [showModal, setShowModal] = useState(false);
const {getKedvencTermek } = useContext(ApiContext);

  const isKedvenc = kedvencek.includes(props.adat.modell_id);

  const kedvencKezelo = () => {
    if (isKedvenc) {
      kedvencTorol(props.adat.modell_id);
      getKedvencTermek();
    } else {
      kedvenchezAd(props.adat.modell_id);
      getKedvencTermek();
    }
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
          alt={props.adat.tipus + props.adat.kategoria.ruhazat_kat}
          src={props.adat.kep}
          onClick={handleImageClick}
          style={{ cursor: "pointer", width: '100%', height: 'auto' }}
        />
        <h4 className="gyarto card-text">{props.adat.gyarto} {props.adat.kategoria.ruhazat_kat}</h4>
        <p className="ar card-text">{props.adat.termekek
            .slice(0, 1)  // az első terméket választjuk ki
            .map(termek => 
                // Ha van új ár, akkor azt jelenítjük meg, különben az alap árát
                termek.arak_megjelenit?.length > 0 
                    ? termek.arak_megjelenit[0].uj_ar 
                    : termek.ar
            )
            .join(', ')} Ft</p>
        <div className="gombok">
          <button className="kosarbagomb btn btn-primary mt-4" onClick={() => kosarbaTesz(props.adat)}>Kosárba tesz</button>
          <button className={`kedvenc-gomb ${isKedvenc ? 'kedvenc-aktiv' : ''}`} onClick={kedvencKezelo}> {isKedvenc ? '♥' : '♡'} </button>
        </div>
      </div>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img src={props.adat.kep} alt={props.adat.tipus} className="modal-img" style={{ aspectRatio: 19 / 23, objectFit: 'cover' }} />
          <p>{props.adat.gyarto} {props.adat.kategoria.ruhazat_kat}</p>
          <p>{props.adat.termekek
            .slice(0, 1)  // Csak az első terméket választjuk ki
            .map(termek => 
                // Ha van új ár, akkor azt jelenítjük meg, különben az alap árát
                termek.arak_megjelenit?.length > 0 
                    ? termek.arak_megjelenit[0].uj_ar 
                    : termek.ar
            )
            .join(', ')} Ft</p>
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
  );

}
export default Termek;
