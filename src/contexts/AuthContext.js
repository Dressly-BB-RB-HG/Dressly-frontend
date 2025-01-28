import { createContext, useContext, useState } from "react";
import { myAxios } from "../contexts/MyAxios";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [errors, setErrors] = useState({
    felhasznaloNev: "",
    jelszo: "",
    jelszoMegerosit: "",
    email: "",
  });
  const csrf = () => myAxios.get("/sanctum/csrf-cookie");

  //bejelentkezett felhasználó adatainak lekérdezése
  const getUser = async () => {
    const { data } = await myAxios.get("/api/user");
    console.log(data)
    setUser(data);
  };

  const logout = async () => {
    await csrf();

    myAxios.post("/logout").then((resp) => {
      setUser(null);
      console.log(resp);
    });
  };

  const loginReg = async ({ ...adat }, vegpont) => {
    //lekérjük a csrf tokent
    await csrf();
    console.log(adat,vegpont);

    try {
      await myAxios.post(vegpont, adat);
      console.log("siker");
      //sikeres bejelentkezés/regisztráció esetén
      //Lekérdezzük a usert
      //await getUser();
      //elmegyünk  a kezdőlapra
      getUser()
      navigate("/");
      
    } catch (error) {
      console.log(error);
      if (error.response.status === 422) {
        setErrors(error.response.data.errors);
      }
    }
  };

  const updateProfile = async (data) => {
    try {
      const response = await myAxios.put('/api/update-profile', data);
      setUser(response.data.user); // Frissíti a felhasználói adatokat
    } catch (error) {
      setErrors(error.response.data.errors);
    }
  };

  return (
    <AuthContext.Provider value={{ logout, loginReg, updateProfile, errors, getUser, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export default function useAuthContext() {
    return useContext(AuthContext);
  }