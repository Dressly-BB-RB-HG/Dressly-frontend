import { createContext, useEffect, useState } from "react";
import { myAxios } from "./MyAxios";

export const ApiContext = createContext("");

export const ApiProvider = ({ children }) => {
  const [termekLista, setTermekLista] = useState([]);

  const getAdat = async (vegpont, callbackFv) => {
    try {
      const response = await myAxios.get(vegpont);
      callbackFv(response.data);
      console.log("adat:", response.data);
    } catch (err) {
      console.log("Hiba történt az adat elküldésekor.", err);
    }
  };

  const profilFrissit = async (vegpont, callbackFv) => {
    try {
      const response = await myAxios.put(vegpont, callbackFv);
      console.log("Profil frissítve:", response.data);
      return response.data;
    } catch (err) {
      console.error("Hiba történt a profil frissítésekor.", err);
    }
  };

  const uploadModel = async (modelData) => {
    try {
      const response = await myAxios.post("/api/admin/modell", modelData);
      console.log("Modell sikeresen feltöltve:", response.data);
      return response.data;
    } catch (err) {
      console.error("Hiba történt a modell feltöltése során:", err);
      throw err;
    }
  };

  const uploadTermek = async (modelData) => {
    try {
      const response = await myAxios.post("/api/admin/termek", modelData);
      console.log("Termék sikeresen feltöltve:", response.data);
      return response.data;
    } catch (err) {
      console.error("Hiba történt a termék feltöltése során:", err);
      throw err;
    }
  };

  // Modell törlése
  const deleteModel = async (modelId) => {
    try {
      await myAxios.delete(`/api/admin/modell/${modelId}`);
      console.log("Modell sikeresen törölve!");
      
      // A termekLista frissítése, hogy eltávolítsuk a törölt modellt
      setTermekLista((prevState) =>
        prevState.filter((model) => model.id !== modelId)
      );
    } catch (err) {
      console.error("Hiba történt a modell törlése során:", err);
      throw err;
    }
  };

  const updateTermek = async (modellId, termekData) => {
    try {
      const response = await myAxios.put(`/api/admin/termek-modosit/${modellId}`, termekData);
      console.log("Termék sikeresen frissítve:", response.data);
      
      // A termekLista frissítése a módosított termékkel
      setTermekLista((prevState) =>
        prevState.map((termek) =>
          termek.modell_id === modellId ? { ...termek, ...termekData } : termek
        )
      );
    } catch (err) {
      console.error("Hiba történt a termék frissítése során:", err);
      throw err;
    }
  };


  useEffect(() => {
    getAdat("/api/admin/modellek", setTermekLista);
  }, []);

  return (
    <ApiContext.Provider value={{ termekLista, profilFrissit, uploadModel, uploadTermek, deleteModel, updateTermek }}>
      {children}
    </ApiContext.Provider>
  );
};
