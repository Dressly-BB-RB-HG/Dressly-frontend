import React, { useContext, useState, useEffect } from 'react';
import { KosarContext } from '../contexts/KosarContext';
import './Termek.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Button, Form } from 'react-bootstrap';
import { myAxios } from '../contexts/MyAxios';
import useAuthContext from '../contexts/AuthContext'; 

function Termek(props) {
  const { kosarbaTesz } = useContext(KosarContext);
  const { user } = useAuthContext(); 
  const [kedvenc, setKedvenc] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState('');
  const [meretek, setMeretek] = useState([]); 
  const [kivalasztottMeret, setKivalasztottMeret] = useState('');

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
  
    // Ha van modell_id, akkor kérjük le a méreteket
    if (props.adat?.modell_id) {
      fetchMeretek();
    } else {
      console.log("A modell_id nem található!");
    }
  }, [props.adat]);  // Eltérő adatok esetén újra lekérjük a méreteket
  

  const kedvencKezelo = async () => {
    try {
      let response;
      if (kedvenc) {
        response = await myAxios.delete(`/api/kedvencek-torol/${props.adat.modell_id}`, {
          felhasznalo: user.id,
          modell: props.adat.modell_id,
        });
        setKedvenc(false);
      } else {
        response = await myAxios.post('/api/kedvencekhez-ad', {
          felhasznalo: user.id,
          modell: props.adat.modell_id,
        });
        setKedvenc(true);
      }
      setMessage(response.data.message);
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

        <div className="gombok">
          <button 
            className="kosarbagomb btn btn-primary mt-4" 
            onClick={() => {
              if (kivalasztottMeret) {
                kosarbaTesz({ ...props.adat, meret: kivalasztottMeret });
              } else {
                setMessage('Válassz méretet a vásárláshoz!');
              }
            }}
          >
            Kosárba
          </button>
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
          <p>Ár: {props.adat.termekek.slice(0, 1).map(termek => 
            termek.arak_megjelenit?.length > 0 
              ? termek.arak_megjelenit[0].uj_ar 
              : termek.ar
          ).join(', ')} Ft</p>

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
            } else {
              setMessage('Válassz méretet a vásárláshoz!');
            }
          }}>
            Kosárba
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Termek;
