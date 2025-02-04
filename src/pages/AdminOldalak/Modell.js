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
      const response = await myAxios.get("/api/admin/modellek");
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
      await myAxios.post("/api/admin/modell", modelData);
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
        await myAxios.delete(`/api/admin/modell-torles/${modelId}`);
        alert("Modell sikeresen törölve!");
        fetchModels();  // Frissítjük a modellek listáját a törlés után
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

  // Kiegészítés gomb kattintásakor megjelenik a modális ablak
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
                  <td>{model.tipus}</td>
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
