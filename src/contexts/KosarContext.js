import { createContext, useState, useEffect, useContext } from "react";
import useAuthContext from "./AuthContext";
import { myAxios } from "../contexts/MyAxios";

export const KosarContext = createContext(null);

export const KosarProvider = ({ children }) => {
  const { user, checkAuth } = useAuthContext();
  const [kosarLISTA, setKosarLista] = useState([]);
  const [loading, setLoading] = useState(true);

  // Kosár frissítése
  const fetchKosar = async () => {
    if (user) {
      try {
        const response = await myAxios.get("/api/kosar-megjelen", {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });

        setKosarLista(
          response.data.map((item) => ({
            ...item,
            ar: item.termek.ar,
            meret: item.termek.meret,
            szin: item.termek.szin,
            modell: item.termek.modell,
            mennyiseg: item.mennyiseg 
          }))
        );
      } catch (error) {
        console.error("Hiba a kosár betöltése során:", error);
        setKosarLista([]);
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    if (user) {
      fetchKosar();
    } else {
      setKosarLista([]);
      setLoading(false);
    }
  }, [user]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Betöltés...</p>
      </div>
    );
  }

  // Kosárba tétel
  const kosarbaTesz = async (termek) => {
    try {
      const response = await myAxios.post(
        "/api/kosar",
        {
          termek_id: termek.termek_id,
          mennyiseg: 1,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      fetchKosar();
    } catch (error) {
      console.error(
        "Hiba a kosárba tétel során:",
        error.response?.data || error
      );
      if (!user) {
        alert("Vásárláshoz jelentkezz be!");
      }
    }
  };

  // Kosárból törlés
  const kosarbolTorol = async (termekId) => {
    try {
      await myAxios.delete(`/api/kosarTorles/${termekId}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      fetchKosar();
    } catch (error) {
      console.error(
        "Hiba a kosár törlése során:",
        error.response?.data || error
      );
      alert("Hiba történt a kosár törlésénél!");
    }
  };

  

  return (
    <KosarContext.Provider value={{ kosarLISTA, kosarbaTesz, kosarbolTorol }}>
      {children}
    </KosarContext.Provider>
  );
};

export const useKosarContext = () => useContext(KosarContext);
