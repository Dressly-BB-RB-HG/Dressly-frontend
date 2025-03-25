import React, { useContext, useState } from 'react';
import { KosarContext } from '../contexts/KosarContext';
import './Termek.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Button } from 'react-bootstrap';
import { myAxios } from '../contexts/MyAxios';
import useAuthContext from '../contexts/AuthContext'; // Importáljuk a useAuthContext hookot

function Termek(props) {
  const { kosarbaTesz } = useContext(KosarContext);
  const { user } = useAuthContext(); // Lekérjük a bejelentkezett felhasználót
  const [kedvenc, setKedvenc] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState('');

  const kedvencKezelo = async (modellId) => {
    try {
      let response;
      if (kedvenc) {
        // Ha a termék már kedvenc, eltávolítjuk
        response = await myAxios.delete(`/api/kedvencek-torol/${modellId}`, {
          felhasznalo: user.id, // A felhasználó ID-ját az AuthContext-ből vesszük
          modell: props.adat.modell.modell_id,
        
        })
        ;
        setKedvenc(false);
         // Ha sikerült törölni, deaktiváljuk a kedvenc státuszt
      } else {
        // Ha nem kedvenc, hozzáadjuk
        response = await myAxios.post('/api/kedvencekhez-ad', {
          felhasznalo: user.id, // A felhasználó ID-ját az AuthContext-ből vesszük
        modell: props.adat.modell.modell_id,
        });
        setKedvenc(true); // Ha sikerült hozzáadni, aktiváljuk a kedvenc státuszt
      }
  
      setMessage(response.data.message); // Üzenet a válasz alapján
    } catch (error) {
      setMessage('Hiba történt a kedvenc hozzáadása/eltávolítása közben.');
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
          <button className={`kedvenc-gomb ${kedvenc ? 'kedvenc-aktiv' : ''}`} onClick={kedvencKezelo}>
            {kedvenc ? '♥' : '♡'}
          </button>
        </div>
        {message && <p className="message">{message}</p>}
      </div>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{props.adat.tipus}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img src={props.adat.kep} alt={props.adat.tipus} className="modal-img" style={{ aspectRatio: 19 / 23, objectFit: 'cover' }} />
          <p>Kategória: {props.adat.kategoria.ruhazat_kat}</p>
          <p>Gyártó: {props.adat.gyarto}</p>
          <p>Ár: {props.adat.termekek
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
