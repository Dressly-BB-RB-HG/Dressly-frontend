import { createContext, useState, useEffect } from "react";
import { myAxios } from "./MyAxios";

export const KosarContext = createContext("");

export const KosarProvider = ({ children }) => {
    const [user, setUser] = useState(null); // Alapértelmezés szerint nincs beállítva felhasználó
    const [kosarLISTA, setKosarLista] = useState([]); // Kosár alapértelmezés szerint üres

    // Ha be van jelentkezve a felhasználó, töltse be a kosarat az adatbázisból
    useEffect(() => {
        if (user) {
            const fetchKosar = async () => {
                try {
                    const response = await myAxios.get('/api/kosar', {
                        headers: {
                            Authorization: `Bearer ${user.token}`
                        }
                    });
                    setKosarLista(response.data); // A válaszban kapott adatokat beállítjuk
                } catch (error) {
                    console.error('Hiba a kosár betöltése során:', error);
                }
            };

            fetchKosar();
        } else {
            setKosarLista([]); // Ha nincs bejelentkezett felhasználó, üres kosár
        }
    }, [user]);

    // Kosárba tétel API hívás
    const kosarbaTesz = async (adat) => {
        if (!user || !user.token) {
            return console.log("Nincs bejelentkezve felhasználó.");
        }
        try {
            // API hívás
            const response = await myAxios.post('/api/kosar', {
                termek_id: adat.termek_id,
                mennyiseg: 1 // Alapértelmezett mennyiség, vagy módosítható
            }, {
                headers: {
                    Authorization: `Bearer ${user.token}` // Bejelentkezett felhasználó tokenjének átadása
                }
            });

            // Kosár lista frissítése
            setKosarLista((prevKosar) => [...prevKosar, response.data]);
        } catch (error) {
            console.error('Hiba a kosárba tétel során:', error);
        }
    };

    // Kosárból törlés API hívás
    const kosarbolTorol = async (termek_id) => {
        if (!user) return alert("Jelentkezz be vagy regisztrálj!");

        try {
            await myAxios.delete(`/api/kosar/${termek_id}`, {
                headers: {
                    Authorization: `Bearer ${user.token}` // Bejelentkezett felhasználó tokenjének átadása
                }
            });

            // Kosár lista frissítése
            setKosarLista((prevKosar) => prevKosar.filter((termek) => termek.termek_id !== termek_id));
        } catch (error) {
            console.error('Hiba a kosárból való törlés során:', error);
        }
    };

    return (
        <KosarContext.Provider value={{ kosarLISTA, kosarbaTesz, kosarbolTorol, setUser }}>
            {children}
        </KosarContext.Provider>
    );
};
