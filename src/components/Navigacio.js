import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import useAuthContext from "../contexts/AuthContext";
import './Navigacio.css';

function Navigacio() {
    const { user, logout } = useAuthContext();
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
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
                    <Nav className="mx-auto">
                        <Nav.Link as={Link} to="/">Kezdőlap</Nav.Link>
                        <Nav.Link as={Link} to="/ruhazat">Termékek</Nav.Link>
                        
                    </Nav>
                    <Nav>
                        <Nav.Link as={Link} to="/kosar">
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
                                <Nav.Link onClick={() => { logout() }}>
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
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Navigacio;
