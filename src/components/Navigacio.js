import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import useAuthContext from "../contexts/AuthContext";
import '../Navigacio.css';

function Navigacio() {
    const { user, logout } = useAuthContext();

    return (
        <Navbar expand="lg">
            <Container>
                <Navbar.Brand href="#">
                    <img className="logo" src="/fekete_hatternelkul.png" alt="dressly_logo" />
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="navbarNav" />

                <Navbar.Collapse id="navbarNav">
                    <Nav className="mx-auto">
                        <Nav.Link as={Link} to="/">Kezdőlap</Nav.Link>
                        <Nav.Link as={Link} to="/ruhazat">Termékek</Nav.Link>
                    </Nav>

                    <Nav>
                        <Nav.Link as={Link} to="/kosar"> 🛒 </Nav.Link>
                        <Nav.Link as={Link} to="/kivansaglista"> ❤️ </Nav.Link>
                        {user ? (
                            <Nav.Link onClick={() => { logout() }}>🚷</Nav.Link>
                        ) : (
                            <Nav.Link as={Link} to="/bejelentkezes">👤</Nav.Link>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Navigacio;
