import { createContext, useState } from "react";

export const KosarContext = createContext("");
export const KosarProvider = ({children})=>{

const[kosarLISTA, setKosarLista] = useState([])
    
function kosarbaTesz(adat){
    const segedLista = [...kosarLISTA]
    segedLista.push(adat)
    setKosarLista([...segedLista])
}

const kosarbolTorol = (id) => {
    setKosarLista((prevKosar) => {
      const updatedKosar = prevKosar.filter((termek) => termek.id !== id);
      console.log("Frissített kosár a törlés után:", updatedKosar);
      return updatedKosar;
    });
  };

return (
    <KosarContext.Provider value = {{kosarLISTA, kosarbaTesz, kosarbolTorol}}>
        {children}
    </KosarContext.Provider>
);


};