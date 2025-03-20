import React, { useContext } from 'react'
import { Dropdown, DropdownButton, Button } from 'react-bootstrap'
import { ApiContext } from '../contexts/ApiContext';
import Termekek from '../components/Termekek'
import './pages-css/Ruhazat.css';
import { div } from 'framer-motion/client';


function KivansagLista() {

    return (
        <div>
            <div className="row">
                <article className="col-lg-12 py-3">
                    <Termekek />
                </article>
            </div>
        </div>
    );
}

export default KivansagLista;
