import { createContext, useContext, useEffect, useState } from "react";
import { myAxios } from "./MyAxios";
import useAuthContext from "./AuthContext";

export const KedvencekContext = createContext();

export const KedvencekProvider = ({ children, felhasznaloId }) => {
    const [kedvencek, setKedvencek] = useState([]);
    const { user } = useAuthContext();

    useEffect(() => {
        myAxios.get('/api/kedvenc-termek')
            .then(response => setKedvencek(response.data.map(termek => termek.modell_id)))
            .catch(error => console.error("Hiba a kedvencek lekérdezésekor:", error));
    }, [felhasznaloId]);

    const kedvenchezAd = async (modellId) => {
        try {
            await myAxios.post("/api/kedvencekhez-ad", {
                felhasznalo: user.id,
                modell: modellId
            });
            setKedvencek(prev => [...prev, modellId]);
        } catch (error) {
            console.error("Hiba a kedvencek hozzáadásakor:", error);
        }
    };

    const kedvencTorol = async (modellId) => {
        try {
            await myAxios.delete(`/api/kedvencek-torol/${modellId}`, {
                data: { felhasznalo: felhasznaloId, modell: modellId }
            });
            setKedvencek(prev => prev.filter(id => id !== modellId));
        } catch (error) {
            console.error("Hiba a kedvencek eltávolításakor:", error);
        }
    };


    
    return (
        <KedvencekContext.Provider value={{ kedvencek, kedvenchezAd, kedvencTorol }}>
            {children}
        </KedvencekContext.Provider>
    );
};

export const useKedvencek = () => useContext(KedvencekContext);
