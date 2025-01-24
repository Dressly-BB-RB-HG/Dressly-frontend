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


    const profilFrissit = async (vegpont, callbackFv) => {
        try {
          const response = await myAxios.patch(vegpont, callbackFv);
          console.log("Profil frissítve:", response.data);
          return response.data;
        } catch (err) {
          console.error("Hiba történt a profil frissítésekor.", err);
        }
      };

    useEffect(()=>{
        getAdat("/api/admin/modellek", setTermekLista)
    },
    [])

    return (
        <ApiContext.Provider value = {{termekLista, profilFrissit}}>
        {children}
        </ApiContext.Provider>
    );
    

}
