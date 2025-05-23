import React, { useContext, useState, useEffect } from 'react';
import { KosarContext } from '../contexts/KosarContext';
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Button, Form } from 'react-bootstrap';
import { myAxios } from '../contexts/MyAxios';
import useAuthContext from '../contexts/AuthContext';
import { useKedvencek } from '../contexts/KedvencekContext';
import { ApiContext } from '../contexts/ApiContext';

function Termek(props) {
  const { kosarbaTesz } = useContext(KosarContext);
  const { user } = useAuthContext(); 
  const { kedvencek, kedvenchezAd, kedvencTorol } = useKedvencek();
  const [showModal, setShowModal] = useState(false);
  const {getKedvencTermek } = useContext(ApiContext);
  const [meretek, setMeretek] = useState([]); 
  const {message, setMessage} = useState('');
  const [kivalasztottMeret, setKivalasztottMeret] = useState('');


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


  useEffect(() => {
    const fetchMeretek = async () => {
      try {
        const response = await myAxios.get(`/api/elerhetoMeretek/${props.adat.modell_id}`);
        setMeretek(response.data);
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
              } //else {
                //setMessage('Válassz méretet a vásárláshoz!');
             // }
            }}
          ><p>
            Kosárba
            </p>
          </button>
          <button className={`kedvenc-gomb ${isKedvenc ? 'kedvenc-aktiv' : ''}`} onClick={kedvencKezelo}> {isKedvenc ? '♥' : '♡'} </button>
        </div>
      </div>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{props.adat.gyarto} {props.adat.kategoria.ruhazat_kat}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img src={props.adat.kep} alt={props.adat.tipus} className="modal-img" style={{ aspectRatio: 19 / 23, objectFit: 'cover' }} />
          <p>Ár: {props.adat.termekek.slice(0, 1).map(termek =>  // Csak az első terméket választjuk ki
            termek.arak_megjelenit?.length > 0  // Ha van új ár, akkor azt jelenítjük meg, különben az alap árát
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
            }// else {
            //  setMessage('Válassz méretet a vásárláshoz!');
            //}
          }}>
            Kosárba
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );

}
export default Termek;
