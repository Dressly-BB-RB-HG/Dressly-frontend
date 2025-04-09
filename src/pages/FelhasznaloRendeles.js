import React, { useState, useEffect } from "react";
import './FelhasznaloRendeles.css';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import useAuthContext from "../contexts/AuthContext";
import { myAxios } from "../contexts/MyAxios";
import RendelesPopup from "./FelhasznaloRendelesPopup"; 

const FelhasznaloRendeles = () => {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const [rendeles, setRendeles] = useState([]);
  const [selectedRendeles, setSelectedRendeles] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');  

  useEffect(() => {
    if (!user) {
      navigate("/bejelentkezes");
    } else {
      fetchRendeles(user.id);
    }
  }, [user, navigate]);

  const fetchRendeles = async (userID) => {
    try {
      const response = await myAxios.get(`/api/felhasznalo/${userID}/rendelesek`);
      setRendeles(response.data);
    } catch (error) {
      console.error("Hiba történt a rendelések lekérése során:", error);
      alert("Hiba történt a rendelések lekérése során.");
    }
  };

  const handleRendelesClick = (rendelesSzam) => {
    setSelectedRendeles(rendelesSzam);
  };

  const closePopup = () => {
    setSelectedRendeles(null);
  };

  const handleAtvettemRendelest = async (rendelesSzam) => {
    try {
      const response = await myAxios.put(`/api/rendeles/${rendelesSzam}/atvettem`);
      if (response.status === 200) {
        alert("Sikeresen átvetted a rendelést!");
        fetchRendeles(user.id); 
      } else {
        
        setErrorMessage(response.data.message);
        alert(response.data.message);  
      }
    } catch (error) {
      console.error("Hiba történt a rendelés átvételekor:", error);
      alert("Hiba történt a rendelés átvételekor.");
    }
  };

  return (
    <div className="d-flex vh-100">
      <div className="bg-light border-end p-4 d-flex flex-column align-items-start" style={{ width: '250px', height: '100vh' }}>
        <h4 className="mb-4">Menü</h4>
        <ul className="nav flex-column w-100">
          <li className="nav-item mb-2">
            <Link className="nav-link text-dark fw-bold px-3 py-2 rounded bg-secondary bg-opacity-25" to="/profil">Profil</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-dark fw-bold px-3 py-2 rounded bg-secondary bg-opacity-25" to="/felhasznalorendelesek">Rendeléseim</Link>
          </li>
          <hr className="my-3" />
          {(user.role === 1 || user.role === 2) && (
            <li className="nav-item mb-2">
              <Link className="nav-link text-dark fw-bold px-3 py-2 rounded bg-secondary bg-opacity-25" to="/admin">Adminisztrációs felület</Link>
            </li>
          )}
        </ul>
      </div>

      <div className="container my-5">
        <div className="col-lg-12 mt-5">
          <h3 className="text-center mb-4">Rendelések</h3>
          <table className="table table-striped table-hover">
            <thead className="table-primary">
              <tr>
                <th>#</th>
                <th>Rendelés Szám</th>
                <th>Rendelés Dátum</th>
                <th>Fizetve</th>
                <th>Részletek</th>
                <th>Rendelés átvétele</th>
                <th>Csomag Állapota</th> {/* Új oszlop a csomag állapotának */}
              </tr>
            </thead>
            <tbody>
              {rendeles.length > 0 ? (
                rendeles.map((rendeles, index) => (
                  <tr key={rendeles.rendeles_szam}>
                    <td>{index + 1}</td>
                    <td>{rendeles.rendeles_szam}</td>
                    <td>{new Date(rendeles.rendeles_datum).toLocaleDateString()}</td>
                    <td>{rendeles.fizetve_e ? "Igen" : "Nem"}</td>
                    <td>
                      <button className="btn btn-info" onClick={() => handleRendelesClick(rendeles.rendeles_szam)}>
                        Részletek
                      </button>
                    </td>
                    <td>
                      {rendeles.fizetve_e ? (
                        <span className="text-success">A rendelés teljesítve.</span>
                      ) : (
                        <>
                          <button className="btn btn-success" onClick={() => handleAtvettemRendelest(rendeles.rendeles_szam)}>
                            Átvettem a rendelést
                          </button>
                          {errorMessage && <p className="text-danger mt-2">{errorMessage}</p>} {/* Hibaüzenet */}
                        </>
                      )}
                    </td>
                    <td>
  {/* Ellenőrizzük, hogy van-e kapcsolódó szall_csomag és abban csomag_allapot */}
  {rendeles.szall_csomag ? rendeles.szall_csomag.csomag_allapot : "Nincs információ"}
</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center">
                    Nincsenek rendelések.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {selectedRendeles && (
        <RendelesPopup rendelesSzam={selectedRendeles} closePopup={closePopup} />
      )}
    </div>
                      
  );
};

export default FelhasznaloRendeles;


