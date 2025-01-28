import useAuthContext from "../contexts/AuthContext";

function Kezdolap() {
  const { user } = useAuthContext();

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