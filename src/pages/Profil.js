import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuthContext from "../contexts/AuthContext";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";

function Profil() {
  const { user } = useAuthContext();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPasswordConfirmation] = useState("");
  const navigate = useNavigate();

  const { update, errors } = useAuthContext();

  // Felhasználó adatainak inicializálása
  useEffect(() => {
    if (user) {
      setName(user.name); // Felhasználónév beállítása
      setPassword(user.password); // Vezeték név beállítása
      setPassword(user.password_confirmation);
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const adat = {
      name: name,
      password: password,
      password_confirmation: password_confirmation,
    };

    // Az adatokat a backend felé küldjük a "/modify" útvonalra
    update(adat, "/update-password");

    alert("A profil sikeresen frissítve!");
  };

  return (
    <main className="d-flex justify-content-center align-items-start vh-100">
      <Container>
        <Row className="justify-content-center mt-5">
          <Col md={8} lg={6}>
            <Card className="text-center">
              <Card.Body>
                <h3>Profil szerkesztése</h3>
                <p>
                  {user === null
                    ? "Nem vagy bejelentkezve!"
                    : `Üdvözöljük, ${user.name}`}
                </p>
                {/* Form hozzáadása a felhasználó adatainak szerkesztésére */}
                {user !== null && (
                  <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formname">
                      <Form.Label>Felhasználónév</Form.Label>
                      <Form.Control
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)} // Felhasználónév frissítése
                        placeholder="Ide írja be az új felhasználónevét"
                      />
                    </Form.Group>

                    <Form.Group controlId="formPassword">
                      <Form.Label>Új jelszó</Form.Label>
                      <Form.Control
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} // Jelszó frissítése
                        placeholder="Ide írja be az új jelszót"
                      />
                    </Form.Group>

                    <Form.Group controlId="formPasswordConfirmation">
                      <Form.Label>Jelszó megerősítése</Form.Label>
                      <Form.Control
                        type="password"
                        value={password_confirmation}
                        onChange={(e) => setPasswordConfirmation(e.target.value)} // Jelszó megerősítése frissítése
                        placeholder="Írja be újra a jelszót"
                      />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                      Mentés
                    </Button>
                  </Form>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </main>
  );
}

export default Profil;