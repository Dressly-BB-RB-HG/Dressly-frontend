import React from "react";
import useAuthContext from "../contexts/AuthContext";

function Kezdolap() {
  const { user } = useAuthContext();

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <main className="row" style={{ flex: 1 }}>
        <aside className="col-lg-3"></aside>
        <article className="row col-lg-7">
          <div>
            {user === null ? (
              <p>Nincs bejelentkezett felhasználó!</p>
            ) : (
              <>
                <p>Bejelentkezett felhasználó: {user.name}</p>
                <p>Felhasználói szerep: {user.role === 1 ? "Admin" : user.role === 2 ? "Raktáros" : "Felhasználó"}</p>
              </>
            )}
          </div>
        </article>
      </main>
    </div>
  );
}

export default Kezdolap;