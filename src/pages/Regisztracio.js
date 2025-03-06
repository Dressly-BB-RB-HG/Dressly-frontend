import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import useAuthContext, { AuthContext } from "../contexts/AuthContext";

function Regisztracio() {
  
  const [name, setname] = useState("")
  const [v_nev, setv_nev] = useState("")
  const [k_nev, setk_nev] = useState("")
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [password_confirmation, setpassword_confirmation] = useState("");
  
  
  const [varos, setVaros] = useState("");
  const [kerulet, setKerulet] = useState("");  // Új állapot a kerülethez
  const [utca, setUtca] = useState("");
  const [hazszam, setHazszam] = useState("");

  const navigate = useNavigate();
  const { loginReg, errors } = useAuthContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const adat = {
      name: name,
      k_nev: k_nev,
      v_nev: v_nev,
      email: email,
      password: password,
      password_confirmation: password_confirmation,
      varos: varos,       // Szállítási város
      kerulet: kerulet,   // Szállítási kerület
      utca: utca,         // Szállítási utca/út
      hazszam: hazszam    // Szállítási házszám
    };       
  
    loginReg(adat, "/register");
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
              value={name}
              onChange={(e) => setname(e.target.value)}
              id="name"
              placeholder="Ide írja a felhasználónevét!"
              name="name"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="v_nev" className="form-label">
              Vezetéknév:
            </label>
            <input
              type="text"
              className="form-control"
              value={v_nev}
              onChange={(e) => setv_nev(e.target.value)}
              id="v_nev"
              placeholder="Ide írja a vezetéknevét!"
              name="v_nev"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="k_nev" className="form-label">
              Keresztnév:
            </label>
            <input
              type="text"
              className="form-control"
              value={k_nev}
              onChange={(e) => setk_nev(e.target.value)}
              id="k_nev"
              placeholder="Ide írja a keresztnevét!"
              name="k_nev"
            />
          </div>

          <div className="mb-3 mt-3">
            <label htmlFor="email" className="form-label">
              Email címe:
            </label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              placeholder="Ide írja az email címét!"
              name="email"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Jelszó (min 8 karakter):
            </label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
              id="password"
              placeholder="Ide írja a kívánt jelszavat"
              name="password"
            />
            {errors.password && (
              <span className="text-danger">{errors.password[0]}</span>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="password_confirmation" className="form-label">
              Jelszó megerősítése:
            </label>
            <input
              type="password"
              className="form-control"
              value={password_confirmation}
              onChange={(e) => setpassword_confirmation(e.target.value)}
              id="password_confirmation"
              placeholder="Írja be újra a jelszavát!"
              name="password_confirmation"
            />
          </div>

          {/* Szállítási adatok szekció */}
          <div className="mt-4">
            <h3 className="text-center">Szállítási Adatok</h3>

            <div className="mb-3">
              <label htmlFor="varos" className="form-label">
                Város:
              </label>
              <input
                type="text"
                className="form-control"
                value={varos}
                onChange={(e) => setVaros(e.target.value)}
                id="varos"
                placeholder="Írja be a várost"
                name="varos"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="kerulet" className="form-label">
                Kerület:
              </label>
              <input
                type="number"
                className="form-control"
                value={kerulet}
                onChange={(e) => setKerulet(e.target.value)}
                id="kerulet"
                placeholder="Írja be a kerületet"
                name="kerulet"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="utca" className="form-label">
                Utca/Út:
              </label>
              <input
                type="text"
                className="form-control"
                value={utca}
                onChange={(e) => setUtca(e.target.value)}
                id="utca"
                placeholder="Írja be az utcát/utat"
                name="utca"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="hazszam" className="form-label">
                Házszám:
              </label>
              <input
                type="number"
                className="form-control"
                value={hazszam}
                onChange={(e) => setHazszam(e.target.value)}
                id="hazszam"
                placeholder="Írja be a házszámot"
                name="hazszam"
              />
            </div>
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
