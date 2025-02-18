import React, { useState, useEffect } from 'react';
import { myAxios } from '../contexts/MyAxios';

const RendelesPopup = ({ rendelesSzam, closePopup }) => {
  const [rendelesTetel, setRendelesTetel] = useState([]);

  useEffect(() => {
    const fetchRendelesTetel = async () => {
      
  
      try {
        const response = await myAxios.get(`/api/rendeles/${rendelesSzam}/tetel`);
        setRendelesTetel(response.data);
      } catch (error) {
        console.error("Hiba történt a rendelés tételeinek lekérése során:", error);
        alert("Hiba történt a rendelés tételeinek lekérése során.");
      }

      if (!rendelesSzam) {
        console.error("Nincs rendelés szám.");
        return;
      }
    };
  
    // Ha a rendelesSzam értéke nem létezik, ne próbáld lekérni az adatokat
    if (rendelesSzam) {
      fetchRendelesTetel();
    } else {
      console.log('A rendelés szám nem elérhető.');
    }
  }, [rendelesSzam]);
  
  

  return (
    <div className="modal show" style={{ display: 'block' }} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">Rendelés Részletei</h5>
            <button type="button" className="btn-close" onClick={closePopup}></button>
          </div>
          <div className="modal-body">
            <table className="table">
              <thead>
                <tr>
                  <th>Termék</th>
                  <th>Mennyiség</th>
                  <th>Modell</th>
                  <th>Szín</th>
                  <th>Méret</th>
                  <th>Ár</th>
                </tr>
              </thead>
              <tbody>
                {rendelesTetel.length > 0 ? (
                  rendelesTetel.map((rendeles_tetel, index) => (
                    <tr key={index}>
                      <td>{rendeles_tetel.termek}</td> {/* Termék neve a rendeles_tetels-ből */}
                      <td>{rendeles_tetel.mennyiseg}</td> {/* Mennyiség a rendeles_rendeles_tetels-ből */}
                      <td>{rendeles_tetel.modell}</td> {/* Modell a termeks-ből */}
                      <td>{rendeles_tetel.szin}</td> {/* Szín a termeks-ből */}
                      <td>{rendeles_tetel.meret}</td> {/* Méret a termeks-ből */}
                      <td>{rendeles_tetel.ar}</td> {/* Ár a termeks-ből */}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center">
                      Nincsenek tételek a rendelésben.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RendelesPopup;
