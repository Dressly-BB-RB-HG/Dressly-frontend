import React, { useContext } from "react";
import Termek from "./Termek";
import { ApiContext } from "../contexts/ApiContext";

function Termekek({ visibleProducts }) {
  const { termekLista } = useContext(ApiContext);

  // Slice the product list to show only the visible ones
  const productsToDisplay = termekLista.slice(0, visibleProducts);

  return (
    <div className="row">
      {productsToDisplay.map((adat, index) => (
        <div className="col-lg-3 col-md-4 col-sm-6 mb-4" key={index}>
          <Termek adat={adat} />
        </div>
      ))}
    </div>
  );
}

export default Termekek;
