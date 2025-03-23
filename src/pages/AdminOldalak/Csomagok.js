import React, { useState, useEffect } from "react";
import { myAxios } from "../../contexts/MyAxios";

const Csomagok = () => {
  const [csomagok, setCsomagok] = useState([]);
  const [selectedAllapot, setSelectedAllapot] = useState({});  // Tároljuk a kiválasztott állapotokat

  useEffect(() => {
    fetchCsomagok();  // Adatok lekérése a csomagokból
  }, []);

  // Csak a csomagok lekérése
  const fetchCsomagok = async () => {
    try {
      const response = await myAxios.get("/api/szall-csomags");
      setCsomagok(response.data);  // Állapot frissítése
    } catch (error) {
      console.error("Hiba történt a csomagok lekérése során:", error);
      alert("Hiba történt a csomagok lekérése során.");
    }
  };

  // A csomag állapotának frissítése
  const handleAllapotValtoztatas = async (csomagId) => {
    const newAllapot = selectedAllapot[csomagId];  // Az új állapot, amit kiválasztottak
    if (!newAllapot) {
      alert("Kérlek válaszd ki az új állapotot!");
      return;
    }

    try {
      const response = await myAxios.put(`/api/szall-csomags/${csomagId}/allapot`, {
        csomag_allapot: newAllapot,  // Az új állapot beállítása
      });

      if (response.status === 200) {
        alert("A csomag állapota frissítve lett!");
        fetchCsomagok();  // Frissítjük a csomagok listáját
      }
    } catch (error) {
      console.error("Hiba történt a csomag állapotának frissítésekor:", error);
      alert("Hiba történt a csomag állapotának frissítésekor.");
    }
  };

  // A legördülő menü értékének kezelése
  const handleSelectChange = (csomagId, value) => {
    setSelectedAllapot((prev) => ({
      ...prev,
      [csomagId]: value,  // A kiválasztott állapot mentése a megfelelő csomaghoz
    }));
  };

  return (
    <div className="container my-5">
      <h3 className="text-center mb-4">Csomagok</h3>
      <table className="table table-striped table-hover">
        <thead className="table-primary">
          <tr>
            <th>#</th>
            <th>Csomag Szám</th>
            <th>Rendelés Szám</th>
            <th>Állapot</th>
            <th>Frissítés</th>
          </tr>
        </thead>
        <tbody>
          {csomagok.length > 0 ? (
            csomagok.map((csomag, index) => (
              <tr key={csomag.csomag_id}>
                <td>{index + 1}</td>
                <td>{csomag.csomag_id}</td>
                <td>{csomag.rendeles}</td>
                <td>{csomag.csomag_allapot}</td> {/* Állapot megjelenítése */}
                <td>
                  {/* Legördülő menü az állapot kiválasztásához */}
                  <select
                    className="form-select"
                    value={selectedAllapot[csomag.csomag_id] || csomag.csomag_allapot}
                    onChange={(e) => handleSelectChange(csomag.csomag_id, e.target.value)}
                  >
                    <option value="">Válassz állapotot</option>
                    <option value="Csomagolás">Csomagolás</option>
                    <option value="Futárnál">Futárnál</option>
                    <option value="Kézbesítve">Kézbesítve</option>
                  </select>
                  <button
                    className="btn btn-warning mt-2"
                    onClick={() => handleAllapotValtoztatas(csomag.csomag_id)}
                  >
                    Módosít
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">
                Nincsenek csomagok.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Csomagok;
