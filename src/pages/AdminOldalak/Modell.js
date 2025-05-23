import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import useAuthContext from "../../contexts/AuthContext"; 
import { myAxios } from "../../contexts/MyAxios";
import Termekmodel from "./Termekmodel"; // A külön komponens a termék kiegészítéshez

const Modell = () => {
  const navigate = useNavigate();
  const { user } = useAuthContext(); 
  const [modelData, setModelData] = useState({
    kategoria: "",
    tipus: "",
    gyarto: "",
    kep: "",
  });
  const [loading, setLoading] = useState(false);
  const [models, setModels] = useState([]); 
  const [isModalOpen, setIsModalOpen] = useState(false); // A modális ablak nyitásához
  const [selectedModel, setSelectedModel] = useState(null); // Kiválasztott modell

  useEffect(() => {
    if (!user || (user.role !== 1 && user.role !== 2)) {
      navigate("/Bejelentkezes"); 
    }
    fetchModels(); 
  }, [user, navigate]);

  // Modell adatainak lekérése
  const fetchModels = async () => {
    try {
      let endpoint = "";
  
      if (user?.role === 1) {
        endpoint = "/api/admin/modellek";
      } else if (user?.role === 2) {
        endpoint = "/api/raktaros/modellek";
      } else {
        alert("Ismeretlen jogosultsági szint.");
        return;
      }
  
      const response = await myAxios.get(endpoint);
      setModels(response.data); 
    } catch (error) {
      console.error("Hiba történt a modellek lekérése során:", error);
      alert("Hiba történt a modellek lekérése során.");
    }
  };

  // Modell feltöltése
  const handleModelSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      let endpoint = "";
  
      if (user?.role === 1) {
        endpoint = "/api/admin/modell";
      } else if (user?.role === 2) {
        endpoint = "/api/raktaros/modell";
      } else {
        alert("Ismeretlen jogosultsági szint. Modell feltöltése nem engedélyezett.");
        return;
      }
  
      await myAxios.post(endpoint, modelData);
      alert("Új modell sikeresen feltöltve!");
      setModelData({ kategoria: "", tipus: "", gyarto: "", kep: "" });
      fetchModels();
    } catch (error) {
      console.error("Hiba történt a modell feltöltése során:", error);
      alert("Hiba történt a modell feltöltése során.");
    } finally {
      setLoading(false);
    }
  };

  // Modell törlése
  const handleDeleteModel = async (modelId) => {
    if (window.confirm("Biztosan törölni szeretnéd ezt a modellt?")) {
      try {
        let endpoint = "";
  
        if (user?.role === 1) {
          endpoint = `/api/admin/modell-torles/${modelId}`;
        } else if (user?.role === 2) {
          endpoint = `/api/raktaros/modell-torles/${modelId}`;
        } else {
          alert("Ismeretlen jogosultsági szint. Törlés nem engedélyezett.");
          return;
        }
  
        await myAxios.delete(endpoint);
        alert("Modell sikeresen törölve!");
        fetchModels(); 
      } catch (error) {
        console.error("Hiba történt a modell törlése során:", error);
        alert("Hiba történt a modell törlése során.");
      }
    }
  };

  // Kategória szövegek lekérése
  const getCategoryText = (kategoria) => {
    switch (kategoria) {
      case 1:
        return "Rövid újjú póló";
      case 2:
        return "Hosszú újjú póló";
      case 3:
        return "Pulóver";
      case 4:
        return "Zokni";
      case 5:
        return "Kabát";
      case 6:
        return "Dzseki";
      case 7:
        return "Galléros póló";
      case 8:
        return "Mezek";
      default:
        return "";
    }
  };

  // Típus szövegek lekérése
  const getTypeText = (tipus) => {
    switch (tipus) {
      case "F":
        return "Férfi";
      case "N":
        return "Női";
      default:
        return "";
    }
  };

  const handleOpenModal = (model) => {
    setSelectedModel(model);
    setIsModalOpen(true);
  };

  return (
    <div className="container my-5">
      <div className="col-lg-12 mb-5">
        <h3 className="text-center mb-4">Új modell feltöltése</h3>
        <form onSubmit={handleModelSubmit} className="shadow p-4 rounded border">
          <div className="mb-3">
            <label htmlFor="kategoria" className="form-label font-weight-bold">
              Kategória:
            </label>
            <input
              type="text"
              className="form-control"
              id="kategoria"
              value={modelData.kategoria}
              onChange={(e) =>
                setModelData({ ...modelData, kategoria: e.target.value })
              }
              placeholder="Add meg a kategóriát"
              required
            />
            <p className="form-text">
              1 - Rövid újjú póló, 2 - Hosszú újjú póló, 3 - Pulóver, 4 - Zokni, 5 - Kabát, 6 - Dzseki, 7 - Galléros póló, 8 - Mezek
            </p>
          </div>
          <div className="mb-3">
            <label htmlFor="tipus" className="form-label font-weight-bold">
              Típus (1 betűs):
            </label>
            <input
              type="text"
              className="form-control"
              id="tipus"
              value={modelData.tipus}
              onChange={(e) =>
                setModelData({ ...modelData, tipus: e.target.value })
              }
              placeholder="Add meg a típust (1 betű)"
              maxLength={1}
              required
            />
            <p className="form-text">
              F - Férfi, N - Női
            </p>
          </div>
          <div className="mb-3">
            <label htmlFor="gyarto" className="form-label font-weight-bold">
              Gyártó:
            </label>
            <input
              type="text"
              className="form-control"
              id="gyarto"
              value={modelData.gyarto}
              onChange={(e) =>
                setModelData({ ...modelData, gyarto: e.target.value })
              }
              placeholder="Add meg a gyártót"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="kep" className="form-label font-weight-bold">
              Kép URL:
            </label>
            <input
              type="text"
              className="form-control"
              id="kep"
              value={modelData.kep}
              onChange={(e) =>
                setModelData({ ...modelData, kep: e.target.value })
              }
              placeholder="Add meg a kép URL-jét"
              required
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary w-100 mt-3"
            disabled={loading}
          >
            {loading ? "Feltöltés..." : "Feltöltés"}
          </button>
        </form>
      </div>

      <div className="col-lg-12 mt-5">
        <h3 className="text-center mb-4">Jelenlegi modellek</h3>
        <table className="table table-striped table-hover">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Kategória</th>
              <th>Típus</th>
              <th>Gyártó</th>
              <th>Kép</th>
              <th>Törlés</th>
              <th>Termék adatok</th>
            </tr>
          </thead>
          <tbody>
            {models.length > 0 ? (
              models.map((model, index) => (
                <tr key={model.id}>
                  <td>{index + 1}</td>
                  <td>
                    {model.kategoria} ({getCategoryText(model.kategoria)})
                  </td>
                  <td>{model.tipus} ({getTypeText(model.tipus)})</td>
                  <td>{model.gyarto}</td>
                  <td>
                    <img
                      src={model.kep}
                      alt="Model"
                      style={{ width: "100px", height: "auto" }}
                    />
                  </td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDeleteModel(model.modell_id)}
                    >
                      Törlés
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-info"
                      onClick={() => handleOpenModal(model)}
                    >
                      Termék adatok frissítése
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center">
                  Nincsenek modellek.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modális ablak megjelenítése a termékek feltöltéséhez */}
      {isModalOpen && (
        <Termekmodel
          model={selectedModel}
          closeModal={() => setIsModalOpen(false)}
          fetchModels={fetchModels}
        />
      )}
    </div>
  );
};

export default Modell;
