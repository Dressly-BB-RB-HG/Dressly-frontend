import { createContext, useState, useEffect } from "react";

export const KosarContext = createContext("");

export const KosarProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser) : null;
    });

    const [kosarLISTA, setKosarLista] = useState(() => {
        const storedKosar = localStorage.getItem("kosar");
        return storedKosar && user ? JSON.parse(storedKosar) : [];
    });

    useEffect(() => {
        if (user) {
            localStorage.setItem("kosar", JSON.stringify(kosarLISTA));
        } else {
            localStorage.removeItem("kosar"); // Ha nincs bejelentkezve, töröljük a kosarat
        }
    }, [kosarLISTA, user]);

    function kosarbaTesz(adat) {
        if (!user) return; // Csak bejelentkezett felhasználók tehetnek a kosárba

        setKosarLista((prevKosar) => {
            const ujKosar = [...prevKosar, adat];
            localStorage.setItem("kosar", JSON.stringify(ujKosar));
            return ujKosar;
        });
    }

    const kosarbolTorol = (id) => {
        if (!user) return;

        setKosarLista((prevKosar) => {
            const updatedKosar = prevKosar.filter((termek) => termek.id !== id);
            localStorage.setItem("kosar", JSON.stringify(updatedKosar));
            return updatedKosar;
        });
    };

    return (
        <KosarContext.Provider value={{ kosarLISTA, kosarbaTesz, kosarbolTorol, setUser }}>
            {children}
        </KosarContext.Provider>
    );
};
