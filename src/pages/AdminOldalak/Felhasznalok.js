import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Átirányításhoz szükséges
import useAuthContext from "../../contexts/AuthContext"; 
import { myAxios } from "../../contexts/MyAxios";

const Felhasznalok = () => {
  const navigate = useNavigate();
  const { user } = useAuthContext(); 
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user || (user.role !== 1 && user.role !== 2)) {
      
      navigate("/Bejelentkezes"); 
    } else {
      fetchUsers(); 
    }
  }, [user, navigate]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await myAxios.get("/api/admin/felhasznalok");
      setUsers(response.data);
    } catch (error) {
      console.error("Hiba történt a felhasználók lekérdezése során:", error);
      alert("Hiba történt a felhasználók lekérdezése során.");
    } finally {
      setLoading(false);
    }
  };

  // Szerep módosítása
  const handleRoleChange = async (userId, newRole) => {
    try {
      await myAxios.put(`/api/admin/felhasznalok/${userId}/role`, { role: newRole });
      fetchUsers(); 
      alert("A szerep sikeresen módosítva!");
    } catch (error) {
      console.error("Hiba történt a szerep módosítása során:", error);
      alert("Hiba történt a szerep módosítása során.");
    }
  };

  // Felhasználó törlése
  const handleDelete = async (userId) => {
    if (window.confirm("Biztosan törölni szeretnéd ezt a felhasználót?")) {
      try {
        await myAxios.delete(`/api/admin/felhasznalo-torles/${userId}`);
        fetchUsers(); 
        alert("A felhasználó sikeresen törölve!");
      } catch (error) {
        console.error("Hiba történt a felhasználó törlése során:", error);
        alert("Hiba történt a felhasználó törlése során.");
      }
    }
  };

  return (
    <div className="container my-5">
      <h3 className="mb-4 text-center">Regisztrált felhasználók</h3>
      {loading ? (
        <div className="text-center">
          <p className="text-muted">Betöltés...</p>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered table-hover">
            <thead className="table-light">
              <tr>
                <th>ID</th>
                <th>Név</th>
                <th>Email</th>
                <th>Szerep</th>
                <th>Szerep módosítása</th>
                <th>Törlés</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map((user, index) => (
                  <tr key={user.id}>
                    <td>{index + 1}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                      {user.role === 1
                        ? "Admin"
                        : user.role === 2
                        ? "Raktáros"
                        : "Felhasználó"}
                    </td>
                    <td>
                      <select
                        value={user.role}
                        onChange={(e) => handleRoleChange(user.id, parseInt(e.target.value))}
                        className="form-select"
                      >
                        <option value={1}>Admin</option>
                        <option value={2}>Raktáros</option>
                        <option value={3}>Felhasználó</option>
                      </select>
                    </td>
                    <td>
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="btn btn-danger btn-sm"
                      >
                        Törlés
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center">
                    Nincsenek regisztrált felhasználók.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Felhasznalok;
