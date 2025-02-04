import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import useAuthContext from "../contexts/AuthContext";
import './Navigacio.css';
import Kosar from './Kosar';

function Navigacio() {
    const { user, logout } = useAuthContext();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isKosarVisible, setIsKosarVisible] = useState(false); // Alapból legyen rejtve

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 60);
        };
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const toggleKosar = () => {
        setIsKosarVisible(prevState => !prevState);
    };

    return (
        <>
        <Navbar expand="lg" className={isScrolled ? "navbar navbar-scrolled" : "navbar"}>
            <Container>
                <Navbar.Brand>
                    <img
                        className={isScrolled ? "logo logo-small" : "logo"}
                        src="/fekete_hatternelkul.png"
                        alt="dressly_logo"
                    />
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="navbarNav" />
                
                <Navbar.Collapse id="navbarNav">
                    <div className="d-flex w-100 justify-content-between">
                        <Nav className="d-flex">
                            <Nav.Link as={Link} to="/">Kezdőlap</Nav.Link>
                            <Nav.Link as={Link} to="/ruhazat">Termékek</Nav.Link>
                        </Nav>
                        <Nav className="d-flex">
                            <Nav.Link as={Link} onClick={toggleKosar}>
                                <img className="ikon" src="/kosar.png" alt="kosar" />
                            </Nav.Link>
                            <Nav.Link as={Link} to="/kivansaglista">
                                <img className="ikon" src="/sziv.png" alt="kedvencek" />
                            </Nav.Link>
                            {user ? (
                                <>
                                    <Nav.Link as={Link} to="/profil">
                                        <img className="ikon" src="/profil.png" alt="profil" />
                                    </Nav.Link>
                                    <Nav.Link onClick={logout}>
                                        <img className="ikon" src="/kijelentkezes.png" alt="kijelentkezes" />
                                    </Nav.Link>
                                    {(user.role === 1 || user.role === 2) && (
                                        <Nav.Link as={Link} to="/admin">Adminisztrációs felület</Nav.Link>
                                    )}
                                </>
                            ) : (
                                <Nav.Link as={Link} to="/bejelentkezes">
                                    <img className="ikon" src="/profil.png" alt="profil" />
                                </Nav.Link>
                            )}
                        </Nav>
                    </div>
                </Navbar.Collapse>
            </Container>
        </Navbar>
        <Kosar isKosarVisible={isKosarVisible} />
        </>
    );
}

export default Navigacio;
