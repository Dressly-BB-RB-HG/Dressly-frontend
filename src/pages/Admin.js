import React from "react";
import { useNavigate } from "react-router-dom";  

function Admin({ user }) {  
  const navigate = useNavigate(); 

  const handleNavigation = (page) => {
    if (page === "felhasznalok") {
      navigate("/felhasznalok"); 
    } else if (page === "modell") {
      navigate("/modell"); 
    }
  };



  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Fejléc */}
      <header className="bg-light py-4 text-center border-bottom">
        <h1 className="mb-3" style={{ fontSize: "2rem" }}>Admin Panel</h1>

        {/* Felhasználói üdvözlés */}
        {user && (
          <div>
            <p className="text-muted" style={{ fontSize: "1.2rem" }}>
              Üdvözöllek, {user.name}!
            </p>
            <p className="text-muted" style={{ fontSize: "1.2rem" }}>
              Szerepköröd: {user.role}
            </p>
          </div>
        )}
        
        <p className="text-muted" style={{ fontSize: "1.2rem" }}>
          Kérlek válaszd ki, hogy mit szeretnél kezelni.
        </p>
      </header>

      {/* Navigációs gombok */}
      <div className="d-flex justify-content-center gap-4 my-5">
        <button
          className="btn btn-primary px-4 py-3"
          style={{ minWidth: "250px", fontSize: "1.1rem" }}
          onClick={() => handleNavigation("felhasznalok")}
        >
          Felhasználók kezelése
        </button>
        <button
          className="btn btn-secondary px-4 py-3"
          style={{ minWidth: "250px", fontSize: "1.1rem" }}
          onClick={() => handleNavigation("modell")}
        >
          Modell kezelése
        </button>
      </div>

      {/* Fő tartalom */}
      <main className="container my-4" style={{ flex: 1 }}>
        <div className="row">
          {/* Egyéb tartalom itt elhelyezhető */}
        </div>
      </main>
    </div>
  );
}

export default Admin;