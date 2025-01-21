import React from 'react';
import { Link } from 'react-router-dom';
import '../Navigacio.css';

function Navigacio() {
    return (
        <nav className="navbar navbar-expand-lg">
            <div className="container-fluid">
                <div className='row'>
                    <div className='navbar-nav col-lg-2'>
                        <a className="nav-link logo" href="#">Dressly</a>
                    </div>
                    <ul className="navbar-nav col-lg-4">
                        <li className="nav-item active">
                            <Link className="nav-link" to="/">
                                Kezdőlap
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/ruhazat">
                                Ruházat
                            </Link>
                        </li>
                    </ul>
                </div>
                <div>
                    <ul className="navbar-nav">
                        <li className='nav-item'>
                            <Link className="nav-link" to="/kosar"> 🛒 </Link>
                        </li>
                        <li className='nav-item'>
                            <Link className="nav-link" to="/kivansaglista"> ❤️ </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/bejelentkezes"> 👤 </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>


    
    );
}

export default Navigacio;
