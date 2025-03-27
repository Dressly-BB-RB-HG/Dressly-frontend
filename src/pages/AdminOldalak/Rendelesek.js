import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuthContext from "../../contexts/AuthContext";
import { myAxios } from "../../contexts/MyAxios";

const Rendelesek = () => {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const [rendeles, setRendeles] = useState([]);

  useEffect(() => {
    if (!user) {
      navigate("/Bejelentkezes");
    }
    fetchRendeles();
  }, [user, navigate]);

  // Rendelések lekérése
  const fetchRendeles = async () => {
    try {
      const response = await myAxios.get("/api/admin/rendelesek-osszes");
      setRendeles(response.data);
    } catch (error) {
      console.error("Hiba történt a rendelések lekérése során:", error);
      alert("Hiba történt a rendelések lekérése során.");
    }
  };

   // Rendelés törlése
   const handleDelete = async (rendelesSzam) => {
    console.log(`Törléshez használt rendelés szám: ${rendelesSzam}`);  
    
    
    if (!rendelesSzam) {
      console.error("A rendelés szám nem elérhető.");
      alert("A rendelés törléséhez szükséges rendelés szám nem elérhető.");
      return;
    }
  
    if (window.confirm("Biztosan törlöd ezt a rendelést?")) {
      try {
        
        await myAxios.delete(`/api/admin/adott-rendeles-torlese/${rendelesSzam}`);
        
        setRendeles(rendeles.filter((r) => r.rendeles_szam !== rendelesSzam));  
        alert("Rendelés sikeresen törölve.");
      } catch (error) {
        console.error("Hiba történt a rendelés törlése során:", error);
        alert("Hiba történt a rendelés törlése során.");
      }
    }
  };
  

  return (
    <div className="container my-5">
      <div className="col-lg-12 mt-5">
        <h3 className="text-center mb-4">Rendelések</h3>
        <table className="table table-striped table-hover">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Rendelés száma</th>
              <th>Felhasználó</th>
              <th>Dátum</th>
              <th>Teljesített-e?</th>
              <th>Műveletek</th>
            </tr>
          </thead>
          <tbody>
            {rendeles.length > 0 ? (
              rendeles.map((rendeles, index) => (
                <tr key={rendeles.rendeles_szam}>
                  <td>{index + 1}</td>
                  <td>{rendeles.rendeles_szam}</td>
                  <td>{rendeles.felhasznalo}</td>
                  <td>{new Date(rendeles.rendeles_datum).toLocaleDateString()}</td>
                  <td>
                    {(() => {
                      switch (rendeles.fizetve_e) {
                        case 1:
                          return "Igen";
                        case 0:
                          return "Nem";
                        default:
                          return "Ismeretlen";
                      }
                    })()}
                  </td>
                  <td>
                      <button
                        onClick={() => handleDelete(rendeles.rendeles_szam)}
                        className="btn btn-danger btn-sm"
                      >
                        Törlés
                      </button>
                    </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center">
                  Nincsenek rendelések.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Rendelesek;