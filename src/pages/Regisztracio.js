import React from 'react';
import { useState } from 'react';

function Regisztracio() {
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPasswordConfirmation] = useState("");
 
  return (
    <div 
      className="d-flex justify-content-center align-items-center vh-100" 
      style={{ maxWidth: "400px", margin: "0 auto" }}
    >
      <div>
        <h1 className="text-center">Regisztráció</h1>
        <form>

        <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Vezetéknév:
            </label>
            <input
              type="text"
              className="form-control"
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
              id="pwd"
              placeholder="Ide írja a felhasználóhoz tartozó jelszavát!"
              name="pwd"
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
              id="pwd-confirm"
              placeholder="Írja be újra a jelszavát!"
              name="pwd-confirm"
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
              Már van felhasználói fiókja? <span className="text-primary">Bejelentkezés</span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Regisztracio;