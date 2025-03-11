import React, { useContext } from 'react'
import { Dropdown, DropdownButton, Button } from 'react-bootstrap'
import { ApiContext } from '../contexts/ApiContext';
import Termekek from '../components/Termekek'
import './pages-css/Ruhazat.css';


function Ruhazat() {

    const { getLegkedveltebb, getAdat, getMarkaRuhak, getNemuRuhak, getMeretRuhak, getSzinuRuhak, getRendezesArSzerint } = useContext(ApiContext);
    
  
  const handleLegkedveltebb = () => {
    getLegkedveltebb();  
  };


  const handleMarkaValtozas = (marka) => {
    if (marka === "Minden márka") {
      // Ha "Minden márka" van kiválasztva, az összes terméket lekérjük
      getAdat("/api/termek-minden-adattal");
    } else {
      // Egy konkrét márka esetén meghívjuk a márkára vonatkozó lekérdezést
      getMarkaRuhak(marka);
    }
  };


  const handleNemValtozas = (nem) => {
    if (nem === "Összes nemű") {
      getAdat("/api/termek-minden-adattal");
    } else {
      getNemuRuhak(nem);
    }
  };

  const handleMeretValtozas = (meret) => {
    if (meret === "Összes méret") {
      getAdat("/api/termek-minden-adattal");
    } else {
      getMeretRuhak(meret);
    }
  };

  const handleSzinValtozas = (szin) => {
    if (szin === "Összes szín") {
      getAdat("/api/termek-minden-adattal");
    } else {
      getSzinuRuhak(szin);
    }
  };

  const handleArRendezes = (irany) => {
    getRendezesArSzerint(irany);
};
  

    return (
        <div className="container-fluid">
            <div className="szuroFeltetelek">
                <div className="szuroReszp d-flex flex-wrap justify-content-center">
                    <DropdownButton
                        id="dropdown-basic-button"
                        title="Rendezési szempont"
                        className="mb-3 custom-dropdown"
                        size="sm">
                        <Dropdown.Item href="#/action-1" onClick={() => handleArRendezes("novekv")} >Legalacsonyabb ár</Dropdown.Item>
                        <Dropdown.Item href="#/action-2" onClick={() => handleArRendezes("csokkeno")} >Legmagasabb ár</Dropdown.Item>
                    </DropdownButton>
                    <DropdownButton
                        id="dropdown-basic-button"
                        title="Szürési szempont"
                        className="mb-3 custom-dropdown"
                        size="sm">
                        <Dropdown.Item href="#/action-1" onClick={handleLegkedveltebb}
                        >Legnépszerűbb</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">Legújabb</Dropdown.Item>
                    </DropdownButton>
                    <DropdownButton
                        id="dropdown-basic-button"
                        title="Márka"
                        className="mb-3 custom-dropdown"
                        size="sm">
                        <Dropdown.Item href="#/every-brand" onClick={() => getAdat("/api/termek-minden-adattal")}>Minden márka</Dropdown.Item>
                        <Dropdown.Item href="#/nike-clothes" onClick={() => handleMarkaValtozas("Nike")}>Nike</Dropdown.Item>
                        <Dropdown.Item href="#/the-north-face-clothes"onClick={() => handleMarkaValtozas("The North Face")}>The North Face</Dropdown.Item>
                        <Dropdown.Item href="#/adidas-clothes" onClick={() => handleMarkaValtozas("Adidas")}>Adidas</Dropdown.Item>
                        <Dropdown.Item href="#/puma-clothes" onClick={() => handleMarkaValtozas("Puma")}>Puma</Dropdown.Item>
                        <Dropdown.Item href="#/ralph-lauren-clothes" onClick={() => handleMarkaValtozas("Ralph Lauren")}>Ralph Lauren</Dropdown.Item>
                        <Dropdown.Item href="#/tommy-hilfiger-clothes" onClick={() => handleMarkaValtozas("Tommy Hilfiger")}>Tommy Hilfiger</Dropdown.Item>
                        <Dropdown.Item href="#/calvin-klein-clothes" onClick={() => handleMarkaValtozas("Calvin Klein")}>Calvin Klein</Dropdown.Item>
                        <Dropdown.Item href="#/rebook-clothes" onClick={() => handleMarkaValtozas("Reebok")}>Reebok</Dropdown.Item>
                        <Dropdown.Item href="#/under-armour-clothes" onClick={() => handleMarkaValtozas("Under Armour")}>Under Armour</Dropdown.Item>
                        <Dropdown.Item href="#/armani-clothes" onClick={() => handleMarkaValtozas("Armani")}>Armani</Dropdown.Item>
                        <Dropdown.Item href="#/boss-clothes" onClick={() => handleMarkaValtozas("BOSS")}>BOSS</Dropdown.Item>
                        <Dropdown.Item href="#/vans-clothes" onClick={() => handleMarkaValtozas("Vans")}>Vans</Dropdown.Item>
                        <Dropdown.Item href="#/converse-clothes" onClick={() => handleMarkaValtozas("Converse")}>Converse</Dropdown.Item>
                        <Dropdown.Item href="#/levis-clothes" onClick={() => handleMarkaValtozas("Levi's")}>Levi's</Dropdown.Item>
                        <Dropdown.Item href="#/michael-kors-clothes" onClick={() => handleMarkaValtozas("Michael Kors")}>Michael Kors</Dropdown.Item>
                        <Dropdown.Item href="#/prada-clothes" onClick={() => handleMarkaValtozas("Prada")}>Prada</Dropdown.Item>
                        <Dropdown.Item href="#/chanel-clothes" onClick={() => handleMarkaValtozas("Chanel")}>Chanel</Dropdown.Item>
                        <Dropdown.Item href="#/gucci-clothes" onClick={() => handleMarkaValtozas("Gucci")}>Gucci</Dropdown.Item>
                        <Dropdown.Item href="#/louis-vuitton-clothes" onClick={() => handleMarkaValtozas("Louis Vuitton")}>Louis Vuitton</Dropdown.Item>
                    </DropdownButton>
                    <DropdownButton
                        id="dropdown-basic-button"
                        title="Nem"
                        className="mb-3 custom-dropdown"
                        size="sm">
                        <Dropdown.Item href="#/women" onClick={() => handleNemValtozas("N")} >Női</Dropdown.Item>
                        <Dropdown.Item href="#/men" onClick={() => handleNemValtozas("F")} >Férfi</Dropdown.Item>
                        <Dropdown.Item href="#/unisex" onClick={() => handleNemValtozas("U")} >Uniszex</Dropdown.Item>
                    </DropdownButton>
                    <DropdownButton
                        id="dropdown-basic-button"
                        title="Méret"
                        className="mb-3 custom-dropdown"
                        size="sm">
                        <Dropdown.Item href="#/" onClick={() => getAdat("/api/termek-minden-adattal")} >Minden méret</Dropdown.Item>
                        <Dropdown.Item href="#/size-s" onClick={() => handleMeretValtozas("S")} >S</Dropdown.Item>
                        <Dropdown.Item href="#/size-m" onClick={() => handleMeretValtozas("M")} >M</Dropdown.Item>
                        <Dropdown.Item href="#/size-l" onClick={() => handleMeretValtozas("L")} >L</Dropdown.Item>
                        <Dropdown.Item href="#/size-xl" onClick={() => handleMeretValtozas("XL")} >XL</Dropdown.Item>
                    </DropdownButton>
                    <DropdownButton
                        id="dropdown-basic-button"
                        title="Szín"
                        className="mb-3 custom-dropdown"
                        size="sm">
                        <Dropdown.Item href="#/" onClick={() => handleSzinValtozas("Összes szín")} >Minden szín</Dropdown.Item>
                        <Dropdown.Item href="#/black-clothes" onClick={() => handleSzinValtozas("Fekete")} >Fekete</Dropdown.Item>
                        <Dropdown.Item href="#/white-clothes" onClick={() => handleSzinValtozas("Fehér")} >Fehér</Dropdown.Item>
                        <Dropdown.Item href="#/grey-clothes" onClick={() => handleSzinValtozas("Szürke")} >Szürke</Dropdown.Item>
                        <Dropdown.Item href="#/brown-clothes" onClick={() => handleSzinValtozas("Barna")} >Barna</Dropdown.Item>
                        <Dropdown.Item href="#/pink-clothes" onClick={() => handleSzinValtozas("Rózsaszín")} >Rózsaszín</Dropdown.Item>
                        <Dropdown.Item href="#/red-clothes" onClick={() => handleSzinValtozas("Piros")} >Piros</Dropdown.Item>
                        <Dropdown.Item href="#/blue-clothes" onClick={() => handleSzinValtozas("Kék")} >Kék</Dropdown.Item>
                        <Dropdown.Item href="#/green-clothes" onClick={() => handleSzinValtozas("Zöld")} >Zöld</Dropdown.Item>
                        <Dropdown.Item href="#/yellow-clothes" onClick={() => handleSzinValtozas("Sárga")} >Sárga</Dropdown.Item>
                        <Dropdown.Item href="#/orange-clothes" onClick={() => handleSzinValtozas("Narancssárga")} >Narancssárga</Dropdown.Item>
                        <Dropdown.Item href="#/purple-clothes" onClick={() => handleSzinValtozas("Lila")} >Lila</Dropdown.Item>
                        <Dropdown.Item href="#/beige-clothes" onClick={() => handleSzinValtozas("Bézs")} >Bézs</Dropdown.Item>
                        <Dropdown.Item href="#/turquoise-clothes" onClick={() => handleSzinValtozas("Türkiz")} >Türkiz</Dropdown.Item>
                    </DropdownButton>
                    <Button className="szuresNelkulGomb" variant="contained" href="#/" onClick={() => getAdat("/api/termek-minden-adattal")}>Szűrés nélkül</Button>
                </div>
            </div>

            <div className="row">
                <article className="col-lg-12 py-3">
                    <Termekek />
                </article>
            </div>
        </div>
    );
}

export default Ruhazat;
