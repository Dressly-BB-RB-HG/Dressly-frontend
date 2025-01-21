import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import useAuthContext from "../contexts/AuthContext";

export default function Bejelentkezes() {

  const [felhasznaloNev, setfelhasznalonev] = useState("");
  const [jelszo, setJelszo] = useState("");

  const navigate = useNavigate();
  const { loginReg, errors } = useAuthContext();


  const handleSubmit = async (e) => {
    e.preventDefault();
    const adat = {
        felhasznaloNev: felhasznaloNev,
        jelszo: jelszo,
    };       
    loginReg(adat, "/login");
};

  return (

    <div 
      className="d-flex justify-content-center align-items-center vh-100" 
      style={{ maxWidth: "400px", margin: "0 auto" }}
    >
      <div>
        <h1 className="text-center">Bejelentkezés</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3 mt-3">
            <label htmlFor="name" className="form-label">
              Felhasználónév:
            </label>
            <input
              type="text"
              className="form-control"
              value={felhasznaloNev}
              onChange={(e) => {
                setfelhasznalonev(e.target.value);
              }}
              id="felhasznaloNev"
              placeholder="Ide írja a felhasználónevét!"
              name="felhasznaloNev"
            />
          </div>
          <div>
          {errors.felhasznaloNev && (
              <span className="text-danger">{errors.felhasznaloNev[0]}</span>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="pwd" className="form-label">
              Jelszó:
            </label>
            <input
              type="password"
              value={jelszo}
              onChange={(e) => {
                setJelszo(e.target.value);
              }}
              className="form-control"
              id="jelszo"
              placeholder="Ide írja a felhasználóhoz tartozó jelszavát!"
              name="jelszo"
            />
           {errors.password && (
              <span className="text-danger">{errors.jelszo[0]}</span>
            )}
          </div>
              
          <div className="text-center">
            <button type="submit" className="btn btn-success w-100">
              Bejelentkezés
            </button>
            <br />
            <p>
              Még nincs felhasználói fiókja?
              <Link className="nav-link text-info" to="/regisztracio">Regisztráció</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}