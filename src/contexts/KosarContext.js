import { createContext, useState, useEffect } from "react";

export const KosarContext = createContext("");

export const KosarProvider = ({ children }) => {
    const [kosarLISTA, setKosarLista] = useState(() => {
        const storedKosar = localStorage.getItem("kosar");
        return storedKosar ? JSON.parse(storedKosar) : [];
    });

    useEffect(() => {
        localStorage.setItem("kosar", JSON.stringify(kosarLISTA));
    }, [kosarLISTA]);

    function kosarbaTesz(adat) {
        setKosarLista((prevKosar) => {
            const ujKosar = [...prevKosar, adat];
            localStorage.setItem("kosar", JSON.stringify(ujKosar)); // Frissítés azonnal
            return ujKosar;
        });
    }

    const kosarbolTorol = (id) => {
        setKosarLista((prevKosar) => {
            const updatedKosar = prevKosar.filter((termek) => termek.id !== id);
            localStorage.setItem("kosar", JSON.stringify(updatedKosar)); // Frissítés azonnal
            return updatedKosar;
        });
    };

    return (
        <KosarContext.Provider value={{ kosarLISTA, kosarbaTesz, kosarbolTorol }}>
            {children}
        </KosarContext.Provider>
    );
};
