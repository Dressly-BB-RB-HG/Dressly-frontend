import React, { useContext } from 'react';
import Termek from './Termek';
import { ApiContext } from '../contexts/ApiContext';

function Termekek({ visibleProducts }) {
  const { termekLista } = useContext(ApiContext);

  // Slice the product list to show only the visible ones
  const productsToDisplay = termekLista.slice(0, visibleProducts);

  return (
    <div className="termekek-container">
      {productsToDisplay.map((adat, index) => (
        <Termek adat={adat} key={index} />
      ))}
    </div>
  );
}

export default Termekek;
