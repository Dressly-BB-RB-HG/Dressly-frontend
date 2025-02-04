import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuthContext from "../../contexts/AuthContext";
import { myAxios } from "../../contexts/MyAxios";

const Rendelesek = () => {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (!user) {
      navigate("/Bejelentkezes");
    }
    fetchOrders();
  }, [user, navigate]);

  // Rendelések lekérése
  const fetchOrders = async () => {
    try {
      const response = await myAxios.get("/api/admin/rendelesek");
      setOrders(response.data);
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
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Felhasználó</th>
              <th>Dátum</th>
              <th>Státusz</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map((order, index) => (
                <tr key={order.id}>
                  <td>{index + 1}</td>
                  <td>{order.user}</td>
                  <td>{new Date(order.date).toLocaleDateString()}</td>
                  <td>{order.status}</td>
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

export default Rendelesek;