import React, { useState, useEffect } from 'react';
import { myAxios } from '../contexts/MyAxios';

const RendelesPopup = ({ rendelesSzam, closePopup }) => {
  const [rendelesTetel, setRendelesTetel] = useState([]);

  useEffect(() => {
    const fetchRendelesTetel = async () => {
      if (!rendelesSzam) {
        console.error("Nincs rendelés szám.");
        return;
      }

      try {
        const response = await myAxios.get(`/api/rendeles/${rendelesSzam}/tetel`);
        setRendelesTetel(response.data);
      } catch (error) {
        console.error("Hiba történt a rendelés tételeinek lekérése során:", error);
        alert("Hiba történt a rendelés tételeinek lekérése során.");
      }
    };

    // Csak akkor kérjük le a tételeket, ha a rendelesSzam elérhető
    if (rendelesSzam) {
      fetchRendelesTetel();
    }

  }, [rendelesSzam]); // A hook csak akkor fut újra, ha a rendelesSzam változik

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
                      <td>{rendeles_tetel.termek}</td>
                      <td>{rendeles_tetel.mennyiseg}</td>
                      <td>{rendeles_tetel.modell}</td>
                      <td>{rendeles_tetel.szin}</td>
                      <td>{rendeles_tetel.meret}</td>
                      <td>{rendeles_tetel.ar}</td>
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
