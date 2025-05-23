import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import useAuthContext from "../contexts/AuthContext";
import './Bejelentkezes.css';

export default function Bejelentkezes() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const { loginReg, errors } = useAuthContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const adat = {
      email: email,
      password: password,
    };

    loginReg(adat, "/login");
  };

  return (
    <div className="bejelentkezes-container">
      <div className="bejelentkezes-form">
        <h1 className="bejel-cim text-center">Bejelentkezés</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3 mt-3">
            <label htmlFor="name" className="bejel-form-label">
              E-mail:
            </label>
            <input
              type="email"
              className="bejel-form-control"
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
            {errors.email && (
              <span className="bejel-text-danger">{errors.email[0]}</span>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="pwd" className="form-label">
              Jelszó:
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              className="bejel-form-control"
              id="password"
              placeholder="Ide írja a felhasználóhoz tartozó jelszavát!"
              name="password"
            />
            {errors.password && (
              <span className="text-danger">{errors.password[0]}</span>
            )}
          </div>

          <div className="text-center">
            <button type="submit" className="bejel-gomb btn-success w-100">
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
