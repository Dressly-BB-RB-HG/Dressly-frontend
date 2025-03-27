import { createContext, useContext, useState, useEffect } from "react";
import { myAxios } from "../contexts/MyAxios";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });
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
        if (data) {
            setUser(data);
            localStorage.setItem("user", JSON.stringify(data));
        } else {
            throw new Error("Nincs felhasználói adat.");
        }
    } catch (error) {
        setUser(null);
        localStorage.removeItem("user");
    }
};

const checkAuth = async () => {
  try {
    await csrf();
    await getUser();
    console.log("Frissített user:", user); // Debug üzenet
  } catch (error) {
    console.error("Autentikáció ellenőrzése sikertelen:", error);
    setUser(null);
    localStorage.removeItem("user");
  }
};


  const logout = async () => {
    try {
      await csrf();
      await myAxios.post("/logout");
      setUser(null);
      localStorage.removeItem("user");
      navigate("/");
    } catch (error) {
      console.error("Hiba történt a kijelentkezés során:", error);
    }
  };

  const loginReg = async ({ ...adat }, vegpont) => {
    try {
      await csrf();
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
      localStorage.setItem("user", JSON.stringify(response.data.user));
    } catch (error) {
      console.error("Profil frissítése sikertelen:", error);
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