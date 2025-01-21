import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { myAxios } from '../contexts/MyAxios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "../contexts/AuthContext";

function Regisztracio() {
  
  const csrf = () => myAxios.get("/sanctum/csrf-cookie");
  const navigate = useNavigate();
  const [felhasznaloNev, setfelhasznaloNev] = useState("")
  const [veznev, setVeznev] = useState("")
  const [kernev, setKernev] = useState("")
  const [szuletesiido, setSzuletesiido] = useState("")
  const [email, setEmail] = useState("");
  const [jelszo, setJelszo] = useState("");
  const [jelszoMegerosit, setJelszoMegerosit] = useState("");
  const [errors, setErrors] = useState({
    felhasznaloNev: "",
    veznev: "",
    kernev: "",
    szuletesiido: "",
    email: "",
    jelszo: "",
    jelszoMegerosit: "",
});

  const handleSubmit = async (e) => {
    e.preventDefault();       
    const adat = {
        veznev: veznev,
        kernev: kernev,
        szuletesiido: szuletesiido,
        email: email,
        jelszo: jelszo,
        jelszoMegerosit: jelszoMegerosit
    };       
    try {
        await csrf();
        await myAxios.post("/register", adat );
        navigate("/");
    } catch (error) {
      if (error.response.status === 422) {
          setErrors(error.response.data.errors);
      }
  }
};
 
  return (
    <div 
      className="d-flex justify-content-center align-items-center vh-100" 
      style={{ maxWidth: "400px", margin: "0 auto" }}
    >
      <div>
        <h1 className="text-center">Regisztráció</h1>
        <form onSubmit={handleSubmit}>

        <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Felhasználónév:
            </label>
            <input
              type="text"
              className="form-control"
              value={felhasznaloNev}
              onChange={(e) => {
                setfelhasznaloNev(e.target.value);
              }}
              id="felhasznaloNev"
              placeholder="Ide írja a felhasználónevét!"
              name="felhasznaloNev"
            />
          </div>

        <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Vezetéknév:
            </label>
            <input
              type="text"
              className="form-control"
              value={veznev}
              onChange={(e) => {
                setVeznev(e.target.value);
              }}
              id="veznev"
              placeholder="Ide írja a vezetéknevét!"
              name="veznev"
            />
          </div>

          <div>
            <span className="text-danger">hiba</span>
          </div>

          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Keresztnév:
            </label>
            <input
              type="text"
              className="form-control"
              value={kernev}
              onChange={(e) => {
                setKernev(e.target.value);
              }}
              id="kernev"
              placeholder="Ide írja a keresztnevét!"
              name="kernev"
            />
          </div>

          <div>
            <span className="text-danger">hiba</span>
          </div>

          <div className="mb-3">
            <label htmlFor="date" className="form-label">
              Születési idő:
            </label>
            <input
              type="date"
              className="form-control"
              value={szuletesiido}
              onChange={(e) => {
                setSzuletesiido(e.target.value);
              }}
              id="szuletesiido"
              placeholder="Adja meg a születési évét!"
              name="szuletesiido"
            />
          </div>

          <div>
            <span className="text-danger">hiba</span>
          </div>

          <div className="mb-3 mt-3">
            <label htmlFor="email" className="form-label">
              Email címe:
            </label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              id="email"
              placeholder="Ide írja az email címét!"
              name="email"
            />
          </div>

          <div>
            <span className="text-danger">hiba</span>
          </div>

          <div className="mb-3">
            <label htmlFor="pwd" className="form-label">
              Jelszó:
            </label>
            <input
              type="password"
              className="form-control"
              value={jelszo}
              onChange={(e) => {
                setJelszo(e.target.value);
              }}
              id="jelszo"
              placeholder="Ide írja a felhasználóhoz tartozó jelszavát!"
              name="jelszo"
            />
          </div>

          <div>
            <span className="text-danger">hiba</span>
          </div>

          <div className="mb-3">
            <label htmlFor="pwd-confirm" className="form-label">
              Jelszó megerősítése:
            </label>
            <input
              type="password"
              className="form-control"
              value={jelszoMegerosit}
              onChange={(e) => {
                setJelszoMegerosit(e.target.value);
              }}
              id="jelszoMegerosit"
              placeholder="Írja be újra a jelszavát!"
              name="jelszoMegerosit"
            />
          </div>


          <div>
            <span className="text-danger">hiba</span>
          </div>

          <div className="text-center">
            <button type="submit" className="btn btn-success w-100">
              Regisztráció
            </button>
            <br />
            <p>
            <Link className="nav-link text-info" to="/Bejelentkezes">Rendelkezem már felhasználói fiókkal</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Regisztracio;