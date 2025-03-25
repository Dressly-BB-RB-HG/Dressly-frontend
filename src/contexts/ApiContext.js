import { createContext, useEffect, useState } from "react";
import { myAxios } from "./MyAxios";

export const ApiContext = createContext("");

export const ApiProvider = ({ children }) => {
  const [termekLista, setTermekLista] = useState([]);
  const [kategoriak, setKategoriak] = useState([]) // összes
  const [legkedveltebb, setLegkedveltebb] = useState([]); //csak legkedveltebb
  const [kedvencek, setKedvencek] = useState([]);

  const getAdat = async (vegpont) => {
    try {
      const response = await myAxios.get(vegpont);
      setTermekLista(response.data);
      console.log("adat:", response.data);
    } catch (err) {
      console.log("Hiba történt az adat elküldésekor.", err);
    }
  };

  // szűrések/rendezések


  
  const getLegkedveltebb = async () => {
    try {
      const response = await myAxios.get("/api/legkedveltebb-modell");
      setTermekLista(response.data);
      console.log("adat:", response.data);
    } catch (err) {
      console.log("Hiba történt az adat elküldésekor.", err);
    }
  };

  const getLegujabb = async () => {
    try {
      const response = await myAxios.get("/api/legujabb-modell");
      setTermekLista(response.data);
      console.log("adat:", response.data);
    } catch (err) {
      console.log("Hiba történt az adat elküldésekor.", err);
    }
  };

  const getMarkaRuhak = async (marka) => {
    try {
        const response = await myAxios.get(`/api/marka-ruhak/${marka}`);
        setTermekLista(response.data);
    } catch (err) {
        console.error("Hiba történt a márkás ruhák lekérése során:", err);
    }
};

const getNemuRuhak = async (nem) => {
  try {
      const response = await myAxios.get(`/api/nemu-ruhak/${nem}`);
      setTermekLista(response.data);
  } catch (err) {
      console.error("Hiba történt a márkás ruhák lekérése során:", err);
  }
};

const getMeretRuhak = async (meret) => {
  try {
      const response = await myAxios.get(`/api/meret-ruhak/${meret}`);
      setTermekLista(response.data);
  } catch (err) {
      console.error("Hiba történt a márkás ruhák lekérése során:", err);
  }
};

const getSzinuRuhak = async (szin) => {
  try {
      const response = await myAxios.get(`/api/szinu-minden/${szin}`);
      setTermekLista(response.data);
  } catch (err) {
      console.error("Hiba történt a márkás ruhák lekérése során:", err);
  }
};

const getRendezesArSzerint = async (irany) => {
  try {
    const response = await myAxios.get(`/api/termek-rendez-ar-szerint`, {
      params: { irany }  // Az irany paraméter a query stringben
  });
      setTermekLista(response.data);
      console.log("Rendezett adat:", response.data);
  } catch (err) {
      console.log("Hiba történt az adat rendezése során.", err);
  }
};

  //szűrések/rendezések vége
  const getKedvencTermek = async () => {
    try {
      const response = await myAxios.get("/api/kedvenc-termek");
      setKedvencek(response.data);
      console.log("kedvencek:", response.data);
    } catch (err) {
      console.log("Hiba történt a kedvencek lekérésekor.", err);
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
    getAdat("/api/modell-minden-adattal", setTermekLista);
  }, []);

  return (
    <ApiContext.Provider value={{ termekLista, kategoriak, kedvencek ,legkedveltebb, getKedvencTermek, getAdat, setTermekLista, getLegujabb ,getMarkaRuhak, getNemuRuhak, getMeretRuhak, getSzinuRuhak, getRendezesArSzerint, setKategoriak, setLegkedveltebb,  profilFrissit, uploadModel, uploadTermek, deleteModel, updateTermek, getLegkedveltebb, getAdat }}>
      {children}
    </ApiContext.Provider>
  );
};
