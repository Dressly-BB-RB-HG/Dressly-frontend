import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import useAuthContext from "../contexts/AuthContext";

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

    <div 
      className="d-flex justify-content-center align-items-center vh-100" 
      style={{ maxWidth: "400px", margin: "0 auto" }}
    >
      <div>
        <h1 className="text-center">Bejelentkezés</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3 mt-3">
            <label htmlFor="name" className="form-label">
              E-mail:
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
          {errors.email && (
              <span className="text-danger">{errors.email[0]}</span>
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
              className="form-control"
              id="password"
              placeholder="Ide írja a felhasználóhoz tartozó jelszavát!"
              name="password"
            />
           {errors.password && (
              <span className="text-danger">{errors.password[0]}</span>
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