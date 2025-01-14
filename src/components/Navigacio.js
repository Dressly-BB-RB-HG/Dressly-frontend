import React from 'react';
import { Link } from 'react-router-dom';

function Navigacio() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">Dressly</a>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <Link className="nav-link" to="/">
                                Kezdőlap
                            </Link>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Ruházat</a>
                        </li>
                    </ul>
                    <ul className="navbar-nav ml-auto">
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
