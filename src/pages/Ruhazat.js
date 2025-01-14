import React from 'react'
import { Dropdown, DropdownButton, Form } from 'react-bootstrap'
import RangeSlider from 'react-bootstrap-range-slider';


function Ruhazat() {



    return (
        <div>
            <aside>
                <div className='szuroFeltetelek'>
                    <h1>Szűrő feltételek</h1>
                    <DropdownButton id="dropdown-basic-button" title="Speciális">
                        <Dropdown.Item href="#/action-1">Legnépszerűbb</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">Legújabb</Dropdown.Item>
                    </DropdownButton>

                    <DropdownButton id="dropdown-basic-button" title="Nem">
                        <Dropdown.Item href="#/action-2">Női</Dropdown.Item>
                        <Dropdown.Item href="#/action-1">Férfi</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">Uniszex</Dropdown.Item>
                    </DropdownButton>

                    <DropdownButton id="dropdown-basic-button" title="Méret">
                        <Dropdown.Item href="#/action-1">S</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">M</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">L</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">XL</Dropdown.Item>
                    </DropdownButton>

                </div>
            </aside>
        </div>
    )
}

export default Ruhazat
