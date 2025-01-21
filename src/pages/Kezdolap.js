import useAuthContext from "../contexts/AuthContext"

function Kezdolap() {

  const { user } = useAuthContext(); 

    return (
        <main className="row">
          
          <aside className="col-lg-3">
            asdasd
          </aside>
          <article className="row col-lg-7">
          <p>Bejelentkezett felhasználó: { user===null?"Nincs bejelentkezett felhasználó!":user.name }</p>
            asdasd
          </article>
        </main>
      );
}

export default Kezdolap