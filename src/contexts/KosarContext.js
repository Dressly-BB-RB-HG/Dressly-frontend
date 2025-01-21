import { createContext, useState } from "react";

export const KosarContext = createContext("");
export const KosarProvider = ({children})=>{

const[kosarLISTA, setKosarLista] = useState([])
    
function kosarbaTesz(adat){
    const segedLista = [...kosarLISTA]
    segedLista.push(adat)
    setKosarLista([...segedLista])
}

return (
    <KosarContext.Provider value = {{kosarLISTA, kosarbaTesz}}>
        {children}
    </KosarContext.Provider>
);


};