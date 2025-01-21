import React from 'react';
import { Link } from 'react-router-dom';
import useAuthContext from "../contexts/AuthContext"
import '../Navigacio.css';

function Navigacio() {

    const { user, logout } = useAuthContext(); 

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
                        {user ? (
                        <>
                            <li className="navbar-item">
                                <button className="nav-link" onClick={()=>{logout()}}>
                                    Kijelentkezés
                                </button>
                            </li>
                        </>
                    ) : (
                        <>
                            <li className="navbar-item">
                                <Link className="nav-link" to="/bejelentkezes">
                                    👤
                                </Link>
                            </li>
                        </>
                    )}
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navigacio;
