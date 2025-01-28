import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthContext from '../contexts/AuthContext';
import { ApiContext } from '../contexts/ApiContext';

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
      navigate('/profil');
    } catch (err) {
      alert('A profil adatainak frissítése sikertelen volt.');
      console.error('Hiba történt:', err);
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{ maxWidth: '400px', margin: '0 auto' }}
    >
      <div>
        <h1 className="text-center">Profil Frissítése</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Felhasználónév:
            </label>
            <input
              type="text"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
              id="name"
              placeholder="Ide írja a felhasználónevét!"
              name="name"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email cím:
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
            <label htmlFor="oldPassword" className="form-label">
              Régi jelszó:
            </label>
            <input
              type="password"
              className="form-control"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              id="oldPassword"
              placeholder="Írja be a régi jelszavát!"
              name="oldPassword"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="newPassword" className="form-label">
              Új jelszó:
            </label>
            <input
              type="password"
              className="form-control"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              id="newPassword"
              placeholder="Írja be az új jelszót!"
              name="newPassword"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="newPasswordConfirmation" className="form-label">
              Új jelszó megerősítése:
            </label>
            <input
              type="password"
              className="form-control"
              value={newPasswordConfirmation}
              onChange={(e) => setNewPasswordConfirmation(e.target.value)}
              id="newPasswordConfirmation"
              placeholder="Írja be újra az új jelszót!"
              name="newPasswordConfirmation"
            />
          </div>

          <div className="text-center">
            <button type="submit" className="btn btn-success w-100">
              Mentés
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Profil;