import { createContext, useState, useEffect } from "react";

export const KosarContext = createContext("");

export const KosarProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser) : null;
    });

    const [kosarLISTA, setKosarLista] = useState(() => {
        // Betöltjük a kosarat csak akkor, ha a user be van jelentkezve
        const storedKosar = localStorage.getItem("kosar");
        return storedKosar ? JSON.parse(storedKosar) : [];
    });

    // 1️⃣ Kosár szinkronizálása bejelentkezés/kijelentkezés esetén
    useEffect(() => {
        if (user) {
            const storedKosar = localStorage.getItem("kosar");
            if (storedKosar) {
                setKosarLista(JSON.parse(storedKosar)); // Ha be van jelentkezve, betöltjük a kosarat
            }
        } else {
            setKosarLista([]); // Kijelentkezéskor töröljük a kosarat
            localStorage.removeItem("kosar");
        }
    }, [user]);

    // 2️⃣ Kosár frissítése és mentése localStorage-ba
    useEffect(() => {
        if (kosarLISTA.length > 0) {
            localStorage.setItem("kosar", JSON.stringify(kosarLISTA)); // Kosár elmentése
        }
    }, [kosarLISTA]); // Kosár frissítésekor mindig mentjük el

    function kosarbaTesz(adat) {
        if (!user) return alert("Jelentkezz be vagy regisztrálj!"); // Csak bejelentkezett felhasználók tehetnek a kosárba

        setKosarLista((prevKosar) => {
            const ujKosar = [...prevKosar, adat];
            return ujKosar; // Kosár frissítése
        });
    }

    const kosarbolTorol = (id) => {
        if (!user) return;

        setKosarLista((prevKosar) => {
            const updatedKosar = prevKosar.filter((termek) => termek.id !== id);
            return updatedKosar; // Kosár frissítése
        });
    };

    return (
        <KosarContext.Provider value={{ kosarLISTA, kosarbaTesz, kosarbolTorol, setUser }}>
            {children}
        </KosarContext.Provider>
    );
};
