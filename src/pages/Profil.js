import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthContext from '../contexts/AuthContext';
import { ApiContext } from '../contexts/ApiContext';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function Profil() {
  const { profilFrissit } = useContext(ApiContext);
  const { user, errors } = useAuthContext();
  const navigate = useNavigate();

  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordConfirmation, setNewPasswordConfirmation] = useState('');

  useEffect(() => {
    if (!user) {
      navigate('/bejelentkezes');
    } else {
      setName(user.name);
      setEmail(user.email);
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      name,
      email,
      old_password: oldPassword,
      new_password: newPassword,
      new_password_confirmation: newPasswordConfirmation,
    };

    try {
      await profilFrissit('/api/update-profile', data);
      alert('Profil sikeresen frissítve!');
      navigate('/');
    } catch (err) {
      alert('A profil adatainak frissítése sikertelen volt.');
      console.error('Hiba történt:', err);
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
        </ul>
      </div>
      
      
      <div className="flex-grow-1 d-flex justify-content-center align-items-center bg-light" style={{ padding: '20px' }}>
        <div className="card shadow p-4" style={{ maxWidth: '450px', width: '100%' }}>
          <h2 className="text-center mb-4">Profil Frissítése</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Felhasználónév:</label>
              <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} id="name" name="name" />
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email cím:</label>
              <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} id="email" name="email" />
            </div>

            <div className="mb-3">
              <label htmlFor="oldPassword" className="form-label">Régi jelszó:</label>
              <input type="password" className="form-control" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} id="oldPassword" name="oldPassword" />
            </div>

            <div className="mb-3">
              <label htmlFor="newPassword" className="form-label">Új jelszó:</label>
              <input type="password" className="form-control" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} id="newPassword" name="newPassword" />
            </div>

            <div className="mb-3">
              <label htmlFor="newPasswordConfirmation" className="form-label">Új jelszó megerősítése:</label>
              <input type="password" className="form-control" value={newPasswordConfirmation} onChange={(e) => setNewPasswordConfirmation(e.target.value)} id="newPasswordConfirmation" name="newPasswordConfirmation" />
            </div>

            <div className="text-center">
              <button type="submit" className="btn btn-success w-100">Mentés</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Profil;
