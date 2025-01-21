import { createContext, useEffect, useState } from "react";
import { myAxios } from "./MyAxios";


export const ApiContext = createContext("")
export const ApiProvider = ({children})=> {
    const [termekLista, setTermekLista] = useState([])

    const getAdat = async (vegpont, callbackFv ) => {
        try {
            const response = await myAxios.get(vegpont, callbackFv);
            callbackFv( response.data);
            console.log("adat:", response.data)
          } catch (err) {
            console.log("Hiba történt az adat elküldésekor.", err)
    }
    }

    useEffect(()=>{
        getAdat("/api/admin/modellek", setTermekLista)
    },
    [])

    return (
        <ApiContext.Provider value = {{termekLista}}>
        {children}
        </ApiContext.Provider>
    );
    

}
