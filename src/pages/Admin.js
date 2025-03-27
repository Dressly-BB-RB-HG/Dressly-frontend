import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function Admin({ user }) {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(user);

  useEffect(() => {
    if (!user) {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setCurrentUser(JSON.parse(storedUser));
      }
    }
  }, [user]);

  const handleNavigation = (page) => {
    if (page === "felhasznalok") {
      navigate("/felhasznalok");
    } else if (page === "modell") {
      navigate("/modell");
    } else if (page === "rendelesek") {
      navigate("/rendelesek");
    } else if (page === "csomagok") {
      navigate("/csomagok")
    }
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <header className="bg-light py-4 text-center border-bottom">
        <h1 className="mb-3" style={{ fontSize: "2rem" }}>Adminisztrációs felület</h1>

        
        <motion.p
          className="text-muted fw-bold text-center mt-3"
          style={{ fontSize: "1.3rem", color: "#333" }}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {currentUser ? (
            <>
              Üdvözöllek, <span style={{ color: "#007bff" }}>{currentUser.name}</span>! 
              <br />
              Szerepköröd: <span style={{ color: "#28a745" }}>
                {currentUser.role === 1 ? "Admin" : currentUser.role === 2 ? "Raktáros" : "Ismeretlen"}
              </span>
            </>
          ) : (
            "Nincs bejelentkezett felhasználó!"
          )}
        </motion.p>
      
        <p className="text-muted" style={{ fontSize: "1.2rem" }}>
          Kérlek válaszd ki, hogy mit szeretnél kezelni.
        </p>
      </header>

      {/* Navigációs gombok jogosultságok alapján */}
      <div className="d-flex justify-content-center gap-4 my-5">
        {currentUser?.role === 1 && (
          <button
            className="btn btn-primary px-4 py-3"
            style={{ minWidth: "250px", fontSize: "1.1rem" }}
            onClick={() => handleNavigation("felhasznalok")}
          >
            Felhasználók kezelése
          </button>
        )}
        <button
          className="btn btn-secondary px-4 py-3"
          style={{ minWidth: "250px", fontSize: "1.1rem" }}
          onClick={() => handleNavigation("modell")}
        >
          Modell kezelése
        </button>

        {/* Rendelések gomb hozzáadása */}
        <button
          className="btn btn-secondary px-4 py-3"
          style={{ minWidth: "250px", fontSize: "1.1rem" }}
          onClick={() => handleNavigation("rendelesek")}
        >
          Rendelések kezelése
        </button>

        <button
          className="btn btn-secondary px-4 py-3"
          style={{ minWidth: "250px", fontSize: "1.1rem" }}
          onClick={() => handleNavigation("csomagok")}
        >
          Szállítási Csomagok
        </button>
      </div>

      {/* Fő tartalom */}
      <main className="container my-4" style={{ flex: 1 }}>
        <div className="row">
          {/* További tartalom ide kerülhet */}
        </div>
      </main>
    </div>
  );
}

export default Admin;
