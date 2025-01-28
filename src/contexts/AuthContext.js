import { createContext, useContext, useState, useEffect } from "react";
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

  const getUser = async () => {
    try {
      const { data } = await myAxios.get("/api/user");
      setUser(data);
    } catch (error) {
      console.error("Felhasználó lekérdezése sikertelen:", error);
      setUser(null);
    }
  };

 
  const checkAuth = async () => {
    try {
      await csrf();
      await getUser();
      return true; 
    } catch {
      return false;
    }
  };

  const logout = async () => {
    await csrf();

    try {
      await myAxios.post("/logout");
      setUser(null);
      navigate("/bejelentkezes");
    } catch (error) {
      console.error("Hiba történt a kijelentkezés során:", error);
    }
  };

  const loginReg = async ({ ...adat }, vegpont) => {
    await csrf();
    console.log(adat, vegpont);

    try {
      await myAxios.post(vegpont, adat);
      await getUser(); 
      navigate("/"); 
    } catch (error) {
      console.error("Hiba történt a bejelentkezés/regisztráció során:", error);
      if (error.response?.status === 422) {
        setErrors(error.response.data.errors);
      }
    }
  };

  const updateProfile = async (data) => {
    try {
      const response = await myAxios.put("/api/update-profile", data);
      setUser(response.data.user); 
    } catch (error) {
      setErrors(error.response.data.errors);
    }
  };


  useEffect(() => {
    checkAuth();
  }, []); 

  return (
    <AuthContext.Provider
      value={{ logout, loginReg, updateProfile, errors, getUser, user, checkAuth }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default function useAuthContext() {
  return useContext(AuthContext);
}