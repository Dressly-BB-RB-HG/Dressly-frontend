import React from 'react'
import { Dropdown, DropdownButton } from 'react-bootstrap'
import Termekek from '../components/Termekek'
import './pages-css/Ruhazat.css';

function Ruhazat() {

    return (
        <div className="container-fluid">
            <div className="szuroFeltetelek">
                <h1 className="text-center mb-4">Szűrők</h1>
                <div className="szuroReszp d-flex flex-wrap justify-content-center">
                    <DropdownButton
                        id="dropdown-basic-button"
                        title="Speciális"
                        className="mb-3 custom-dropdown"
                        size="sm">
                        <Dropdown.Item href="#/action-1">Legnépszerűbb</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">Legújabb</Dropdown.Item>
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
