import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { myAxios } from '../contexts/MyAxios';
import { useNavigate } from 'react-router-dom';

function Bejelentkezes() {

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    email: "",
    password: "",
});
  const csrf = () => myAxios.get("/sanctum/csrf-cookie");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await csrf();       
    const adat = {
        email: email,
        password: password,
    };       
    try {
        await myAxios.post("/login", adat );
        console.log("siker")
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
        <h1 className="text-center">Bejelentkezés</h1>
        <form onSubmit={handleSubmit}>
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

export default Bejelentkezes;