import { createContext, useState, useEffect } from "react";

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

    function kosarbaTesz(adat) {
        if (!user) return alert("Jelentkezz be vagy regisztrálj!");

        setKosarLista((prevKosar) => {
            const ujKosar = [...prevKosar, adat];
            return ujKosar; 
        });
    }

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
