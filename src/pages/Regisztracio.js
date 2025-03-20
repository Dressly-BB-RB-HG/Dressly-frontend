import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthContext from '../contexts/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import { myAxios } from '../contexts/MyAxios';
import { Link } from 'react-router-dom';

function Regisztracio() {
  const [name, setName] = useState("");
  const [vNev, setVnev] = useState("");
  const [kNev, setKnev] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  
  const [varos, setVaros] = useState("");
  const [kerulet, setKerulet] = useState("");  // Kerület
  const [utca, setUtca] = useState("");
  const [hazszam, setHazszam] = useState("");

  const navigate = useNavigate();
  const { loginReg, errors } = useAuthContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Regisztrációs adatok
    const adat = {
      name,
      k_nev: kNev,
      v_nev: vNev,
      email,
      password,
      password_confirmation: passwordConfirmation,
      varos,
      kerulet,
      utca,
      hazszam
    };

    try {
      // Regisztráció végrehajtása
      await loginReg(adat, "/register");

      // Email küldés
      await sendEmail(email);
      alert('A regisztrációs email sikeresen elküldve!');

      // Navigálás a bejelentkezési oldalra
      navigate("/");
    } catch (error) {
      console.error("Hiba történt a regisztráció során:", error);
      alert("Hiba történt a regisztráció során.");
    }
  };

  const sendEmail = async (userEmail) => {
    try {
      // API hívás az email küldésére (ehhez Axios kell)
      await myAxios.post('/api/regisztracio-email-kuldes', { email: userEmail });
    } catch (error) {
      console.error("Hiba történt az email küldése során:", error.response?.data?.message || error.message);
      alert("Hiba történt az email küldése során.");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100" style={{ maxWidth: "400px", margin: "0 auto" }}>
      <div>
        <h1 className="text-center">Regisztráció</h1>
        <form onSubmit={handleSubmit}>

          <div className="mb-3">
            <label htmlFor="name" className="form-label">Felhasználónév:</label>
            <input
              type="text"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
              id="name"
              placeholder="Ide írja a felhasználónevét!"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="v_nev" className="form-label">Vezetéknév:</label>
            <input
              type="text"
              className="form-control"
              value={vNev}
              onChange={(e) => setVnev(e.target.value)}
              id="v_nev"
              placeholder="Ide írja a vezetéknevét!"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="k_nev" className="form-label">Keresztnév:</label>
            <input
              type="text"
              className="form-control"
              value={kNev}
              onChange={(e) => setKnev(e.target.value)}
              id="k_nev"
              placeholder="Ide írja a keresztnevét!"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email címe:</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              placeholder="Ide írja az email címét!"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">Jelszó (min 8 karakter):</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              id="password"
              placeholder="Ide írja a kívánt jelszavat"
            />
            {errors.password && <span className="text-danger">{errors.password[0]}</span>}
          </div>

          <div className="mb-3">
            <label htmlFor="password_confirmation" className="form-label">Jelszó megerősítése:</label>
            <input
              type="password"
              className="form-control"
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
              id="password_confirmation"
              placeholder="Írja be újra a jelszavát!"
            />
          </div>

          <div className="mt-4">
            <h3 className="text-center">Szállítási Adatok</h3>
            <div className="mb-3">
              <label htmlFor="varos" className="form-label">Város:</label>
              <input
                type="text"
                className="form-control"
                value={varos}
                onChange={(e) => setVaros(e.target.value)}
                id="varos"
                placeholder="Írja be a várost"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="kerulet" className="form-label">Kerület:</label>
              <input
                type="text"
                className="form-control"
                value={kerulet}
                onChange={(e) => setKerulet(e.target.value)}
                id="kerulet"
                placeholder="Írja be a kerületet"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="utca" className="form-label">Utca/Út:</label>
              <input
                type="text"
                className="form-control"
                value={utca}
                onChange={(e) => setUtca(e.target.value)}
                id="utca"
                placeholder="Írja be az utcát/utat"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="hazszam" className="form-label">Házszám:</label>
              <input
                type="number"
                className="form-control"
                value={hazszam}
                onChange={(e) => setHazszam(e.target.value)}
                id="hazszam"
                placeholder="Írja be a házszámot"
              />
            </div>
          </div>

          <div className="text-center">
            <button type="submit" className="btn btn-success w-100">Regisztráció</button>
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
