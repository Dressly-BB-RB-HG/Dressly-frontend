import React from 'react';
import { Link } from 'react-router-dom';
import '../Navigacio.css';

function Navigacio() {
    return (
        <nav className="navbar navbar-expand-lg">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">Dressly</a>
                <ul className="navbar-nav">
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
                <div>
                    <ul className="navbar-nav">
                        <li className='nav-item'>
                            <a className="nav-link" href='#'>🛒</a>
                        </li>
                        <li className='nav-item'>
                            <a className="nav-link" href='#'>❤️</a>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/bejelentkezes">
                                👤
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navigacio;
