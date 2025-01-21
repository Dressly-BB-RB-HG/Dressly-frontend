import React from 'react'
import { Dropdown, DropdownButton } from 'react-bootstrap'
import Termekek from '../components/Termekek'
import './pages-css/Ruhazat.css';

function Ruhazat() {


    return (
        <div>
            <aside className='szuro'>
                <div className='szuroFeltetelek'>
                    <h1>Szűrő feltételek</h1>
                    <DropdownButton id="dropdown-basic-button" title="Speciális">
                        <Dropdown.Item href="#/action-1">Legnépszerűbb</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">Legújabb</Dropdown.Item>
                    </DropdownButton>
                    <DropdownButton id="dropdown-basic-button" title="Nem">
                        <Dropdown.Item href="#/action-1">Női</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">Férfi</Dropdown.Item>
                        <Dropdown.Item href="#/action-3">Uniszex</Dropdown.Item>
                    </DropdownButton>
                    <DropdownButton id="dropdown-basic-button" title="Méret">
                    <Dropdown.Item href="#/action-1">Minden méret</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">S</Dropdown.Item>
                        <Dropdown.Item href="#/action-3">M</Dropdown.Item>
                        <Dropdown.Item href="#/action-4">L</Dropdown.Item>
                        <Dropdown.Item href="#/action-5">XL</Dropdown.Item>
                    </DropdownButton>

                </div>
            </aside>

            <article className='termekek'>
            <Termekek />
            </article>
        </div>
    )
}

export default Ruhazat
