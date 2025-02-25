import React from 'react'
import { Dropdown, DropdownButton } from 'react-bootstrap'
import Termekek from '../components/Termekek'
import './pages-css/Ruhazat.css';

function Ruhazat() {

    return (
        <div className="container-fluid">
            <div className="szuroFeltetelek">
                <div className="szuroReszp d-flex flex-wrap justify-content-center">
                    <DropdownButton
                        id="dropdown-basic-button"
                        title="Rendezési szempont"
                        className="mb-3 custom-dropdown"
                        size="sm">
                        <Dropdown.Item href="#/action-1">Legnépszerűbb</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">Legújabb</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">Legalacsonyabb ár</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">Legmagasabb ár</Dropdown.Item>
                    </DropdownButton>
                    <DropdownButton
                        id="dropdown-basic-button"
                        title="Márka"
                        className="mb-3 custom-dropdown"
                        size="sm">
                        <Dropdown.Item href="#/action-1">Minden márka</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">Nike</Dropdown.Item>
                        <Dropdown.Item href="#/action-3">The North Face</Dropdown.Item>
                        <Dropdown.Item href="#/action-4">Adidas</Dropdown.Item>
                        <Dropdown.Item href="#/action-5">Puma</Dropdown.Item>
                        <Dropdown.Item href="#/action-5">Ralph Lauren</Dropdown.Item>
                        <Dropdown.Item href="#/action-5">Tommy Hilfiger</Dropdown.Item>
                        <Dropdown.Item href="#/action-5">Calvin Klein</Dropdown.Item>
                        <Dropdown.Item href="#/action-5">Reebok</Dropdown.Item>
                        <Dropdown.Item href="#/action-5">Under Armour</Dropdown.Item>
                        <Dropdown.Item href="#/action-5">Armani</Dropdown.Item>
                        <Dropdown.Item href="#/action-5">BOSS</Dropdown.Item>
                        <Dropdown.Item href="#/action-5">Vans</Dropdown.Item>
                        <Dropdown.Item href="#/action-5">Converse</Dropdown.Item>
                        <Dropdown.Item href="#/action-5">Levi's</Dropdown.Item>
                        <Dropdown.Item href="#/action-5">Michael Kors</Dropdown.Item>
                        <Dropdown.Item href="#/action-5">Prada</Dropdown.Item>
                        <Dropdown.Item href="#/action-5">Chanel</Dropdown.Item>
                        <Dropdown.Item href="#/action-5">Gucci</Dropdown.Item>
                        <Dropdown.Item href="#/action-5">Louis Vuitton</Dropdown.Item>
                    </DropdownButton>
                    <DropdownButton
                        id="dropdown-basic-button"
                        title="Nem"
                        className="mb-3 custom-dropdown"
                        size="sm">
                        <Dropdown.Item href="#/action-1">Női</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">Férfi</Dropdown.Item>
                        <Dropdown.Item href="#/action-3">Uniszex</Dropdown.Item>
                    </DropdownButton>
                    <DropdownButton
                        id="dropdown-basic-button"
                        title="Méret"
                        className="mb-3 custom-dropdown"
                        size="sm">
                        <Dropdown.Item href="#/action-1">Minden méret</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">S</Dropdown.Item>
                        <Dropdown.Item href="#/action-3">M</Dropdown.Item>
                        <Dropdown.Item href="#/action-4">L</Dropdown.Item>
                        <Dropdown.Item href="#/action-5">XL</Dropdown.Item>
                    </DropdownButton>
                    <DropdownButton
                        id="dropdown-basic-button"
                        title="Szín"
                        className="mb-3 custom-dropdown"
                        size="sm">
                        <Dropdown.Item href="#/action-1">Minden szín</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">Fekete</Dropdown.Item>
                        <Dropdown.Item href="#/action-3">Fehér</Dropdown.Item>
                        <Dropdown.Item href="#/action-4">Szürke</Dropdown.Item>
                        <Dropdown.Item href="#/action-5">Barna</Dropdown.Item>
                        <Dropdown.Item href="#/action-5">Rózsaszín</Dropdown.Item>
                        <Dropdown.Item href="#/action-5">Piros</Dropdown.Item>
                        <Dropdown.Item href="#/action-5">Kék</Dropdown.Item>
                        <Dropdown.Item href="#/action-5">Zöld</Dropdown.Item>
                        <Dropdown.Item href="#/action-5">Sárga</Dropdown.Item>
                        <Dropdown.Item href="#/action-5">Narancssárga</Dropdown.Item>
                        <Dropdown.Item href="#/action-5">Lila</Dropdown.Item>
                        <Dropdown.Item href="#/action-5">Bézs</Dropdown.Item>
                        <Dropdown.Item href="#/action-5">Türkiz</Dropdown.Item>
                    </DropdownButton>
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
