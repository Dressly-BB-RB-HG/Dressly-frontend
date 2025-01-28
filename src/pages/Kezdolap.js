import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuthContext from "../contexts/AuthContext";

function Kezdolap() {
  const { user, checkAuth } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    const verifyUser = async () => {
      if (!user) {
        const isAuthenticated = await checkAuth();
        if (!isAuthenticated) {
          navigate("/bejelentkezes"); 
        }
      }
    };

    verifyUser();
  }, [user, navigate, checkAuth]);

  return (
    <main className="row">
      <aside className="col-lg-3"></aside>
      <article className="row col-lg-7">
        <p>
          Bejelentkezett felhasználó:{" "}
          {user === null ? "Nincs bejelentkezett felhasználó!" : user.name}
        </p>
      </article>
    </main>
  );
}

export default Kezdolap;