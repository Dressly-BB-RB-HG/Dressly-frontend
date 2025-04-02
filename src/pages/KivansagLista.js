import React, { useContext, useEffect } from 'react'
import Termekek from '../components/Termekek'
import './KivansagLista.css'
import useAuthContext from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { ApiContext } from '../contexts/ApiContext';
import KedvencTermekek from '../components/KedvencTermekek';

import "@fontsource/playfair-display";

function KivansagLista() {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const {getKedvencTermek } = useContext(ApiContext);

  useEffect(() => {
    if (!user) {
      navigate('/bejelentkezes');
    } else {
      getKedvencTermek();
    }
  }, [user, navigate, getKedvencTermek]);

  return (
    <div className='kedvenc-oldal'>
      <h1>kedvenc termékeid</h1>
      <div className="row">
        <article className="kedvenc">
          <KedvencTermekek />
        </article>
      </div>
    </div>
  );
}

export default KivansagLista;