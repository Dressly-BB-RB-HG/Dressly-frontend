import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuthContext from "../contexts/AuthContext";
import { myAxios } from "../contexts/MyAxios";

const FelhasznaloRendeles = () => {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const [rendeles, setRendeles] = useState([]);

  useEffect(() => {
    if (!user) {
      navigate("/bejelentkezes");
    }
    fetchRendeles();
  }, [user, navigate]);

  const fetchRendeles = async () => {
    try {
      const response = await myAxios.get("/api/rendelesek");
      setRendeles(response.data);
    } catch (error) {
      console.error("Hiba történt a rendelések lekérése során:", error);
      alert("Hiba történt a rendelések lekérése során.");
    }
  };

  return (
    <div className="container my-5">
      <div className="col-lg-12 mt-5">
        <h3 className="text-center mb-4">Rendelések</h3>
        <table className="table table-striped table-hover">
          <thead className="table-primary">
            <tr>
              <th>#</th>
              <th>Rendelés Szám</th>
              <th>Rendelés Dátum</th>
              <th>Fizetve</th>
            </tr>
          </thead>
          <tbody>
            {rendeles.length > 0 ? (
              rendeles.map((order, index) => (
                <tr key={order.kod}>
                  <td>{index + 1}</td>
                  <td>{order.rendeles_szam}</td>
                  <td>{new Date(order.rendeles_datum).toLocaleDateString()}</td>
                  <td>{order.fizetve_e ? "Igen" : "Nem"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center">
                  Nincsenek rendelések.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FelhasznaloRendeles;
