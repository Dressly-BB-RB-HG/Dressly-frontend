import { createContext, useState, useEffect, useContext } from "react";
import useAuthContext from "./AuthContext";
import { myAxios } from "../contexts/MyAxios"; 

export const KosarContext = createContext(null);

export const KosarProvider = ({ children }) => {
    const { user, checkAuth } = useAuthContext(); // Felhasználó lekérése
    const [kosarLISTA, setKosarLista] = useState([]);
    const [loading, setLoading] = useState(true); // Állapot a betöltéshez

    const fetchKosar = async () => {
        if (user) {
            try {
                const response = await myAxios.get('/api/kosar-megjelen', {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                });

                // Betöltjük a termékek adatokat a kosárban
                setKosarLista(response.data.map(item => ({
                    ...item,
                    ar: item.termek.ar,  // Az ár hozzáadása
                    meret: item.termek.meret,  // A méret hozzáadása
                    szin: item.termek.szin
                })));
            } catch (error) {
                console.error('Hiba a kosár betöltése során:', error);
                setKosarLista([]);
            }
        }
        setLoading(false);
    };

    useEffect(() => {
    
        fetchKosar();
    }, [user]);

    if (loading) {
        return <div>Loading...</div>;
    }


    // Kosárba tétel
    const kosarbaTesz = async (termek) => {
        try {
            const response = await myAxios.post('/api/kosar', {
                termek_id: termek.termek_id,
                mennyiseg: 1,
            }, {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            });
    
            // A termékek adatainak mentése a kosárba
            fetchKosar();
        } catch (error) {
            console.error('Hiba a kosárba tétel során:', error.response?.data || error);
            if (error.response?.status === 422) {
                alert("A kosárba tett termék érvénytelen. Ellenőrizd a termék ID-ját és a mennyiséget.");
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
    
            // Új kosárlista lekérése az API-ból törlés után
            const response = await myAxios.get('/api/kosar-megjelen', {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            });
    
            fetchKosar();
        } catch (error) {
            console.error('Hiba a kosár törlése során:', error.response?.data || error);
            alert('Hiba történt a kosár törlésénél!');
        }
    };
    
    
    
    return (
        <KosarContext.Provider value={{ kosarLISTA, kosarbaTesz, kosarbolTorol }}>
            {children}
        </KosarContext.Provider>
    );
};

export const useKosarContext = () => useContext(KosarContext);
