import { createContext, useState, useEffect } from "react";
import { myAxios } from "./MyAxios";

export const KosarContext = createContext("");

export const KosarProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser) : null;
    });

    const [kosarLISTA, setKosarLista] = useState(() => {
        const storedKosar = localStorage.getItem("kosar");
        return storedKosar ? JSON.parse(storedKosar) : [];
    });

    useEffect(() => {
        if (user) {
            const storedKosar = localStorage.getItem("kosar");
            if (storedKosar) {
                setKosarLista(JSON.parse(storedKosar)); // Ha be van jelentkezve, betöltjük a kosarat
            }
        } else {
            setKosarLista([]);
            localStorage.removeItem("kosar");
        }
    }, [user]);

    useEffect(() => {
        if (kosarLISTA.length > 0) {
            localStorage.setItem("kosar", JSON.stringify(kosarLISTA)); // Kosár elmentése
        }
    }, [kosarLISTA]);

    // Kosárba tétel API hívás
    const kosarbaTesz = async (adat) => {
        if (!user) return alert("Jelentkezz be vagy regisztrálj!");

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

    const kosarbolTorol = (termek_id) => {
        setKosarLista((prevKosar) => {
            const updatedKosar = prevKosar.filter((termek) => termek.termek_id !== termek_id);
            return updatedKosar;
        });
    };

    return (
        <KosarContext.Provider value={{ kosarLISTA, kosarbaTesz, kosarbolTorol, setUser }}>
            {children}
        </KosarContext.Provider>
    );
};
