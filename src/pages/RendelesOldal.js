import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthContext from '../contexts/AuthContext';
import { motion } from 'framer-motion';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Card, ListGroup, Button, Form } from 'react-bootstrap'; // Importáljuk a szükséges komponenseket

function RendelésOldal() {
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const [kosar, /* setKosar */] = useState([]);
  const [szallitasMod, setSzallitasMod] = useState(''); // A fizetési mód választás tárolása
  const [phone, setPhone] = useState(''); // Telefonszám tárolása

  const totalPrice = kosar.reduce((sum, item) => sum + item.ar * item.mennyiseg, 0);

  useEffect(() => {
    if (!user) {
      navigate('/bejelentkezes');
    }
  }, [user, navigate]);

  // Szállítási mód változása
  const handleSzallitasModValtozas = (e) => {
    setSzallitasMod(e.target.value);
  };

  // Telefonszám változása
  const handlePhoneValtozas = (e) => {
    setPhone(e.target.value);
  };

  // Rendelés elküldése
  const handleRendeles = () => {
    alert('Rendelés elküldve!');
  };

  const udvozles = () => {
    return 'Itt tudja véglegesíteni a rendelését';
  };

  const today = new Date().toLocaleDateString();

  return (
    <Container className="my-5">
      <Row className="g-4">
        {/* Bal oldal - Üdvözlés, Telefonszám és Szállítási mód */}
        <Col md={4}>
          <Card className="shadow p-4">
            <Card.Body>
              <motion.div
                className="text-center mb-4"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="fw-bold" style={{ color: "#4CAF50" }}>
                  {udvozles()}, {user?.name}!
                </h2>
                <p className="text-muted">Dátum: {today}</p>
              </motion.div>

              {/* Telefonszám */}
              <Form>
                <Form.Group controlId="formPhone">
                  <Form.Label>Telefonszám</Form.Label>
                  <Form.Control
                    type="text"
                    name="phone"
                    value={phone}
                    onChange={handlePhoneValtozas}
                    placeholder="Írd be a telefonszámod"
                  />
                </Form.Group>

                {/* Szállítási mód választás */}
                <Form.Group controlId="formSzallitasMod" className="mt-3">
                  <Form.Label>Szállítási mód</Form.Label>
                  <div className="d-flex justify-content-start align-items-center">
                    <Form.Check
                      type="radio"
                      id="radioUtanvet"
                      label="Utánvét"
                      name="szallitasMod"
                      value="utanvet"
                      checked={szallitasMod === 'utanvet'}
                      onChange={handleSzallitasModValtozas}
                      custom
                    />
                    <Form.Check
                      type="radio"
                      id="radioBankkartya"
                      label="Bankkártyás fizetés"
                      name="szallitasMod"
                      value="bankkartya"
                      checked={szallitasMod === 'bankkartya'}
                      disabled
                      custom
                      className="ms-3"
                      style={{ opacity: 0.5 }}
                    />
                  </div>
                </Form.Group>

                <Button variant="primary" onClick={handleRendeles} block className="mt-3">
                  Rendelés leadása
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        {/* Jobb oldal - Kosár tartalma */}
        <Col md={8}>
          <Card className="shadow p-4">
            <Card.Header as="h5" className="text-center">Kosár tartalma</Card.Header>
            <ListGroup variant="flush">
              {kosar.length > 0 ? (
                kosar.map((item) => (
                  <ListGroup.Item key={item.id}>
                    <Row>
                      <Col>{item.termek}</Col>
                      <Col>Mennyiség: {item.mennyiseg}</Col>
                      <Col>Ár: {item.ar * item.mennyiseg} Ft</Col>
                    </Row>
                  </ListGroup.Item>
                ))
              ) : (
                <ListGroup.Item className="text-center">
                  A kosár üres.
                </ListGroup.Item>
              )}
            </ListGroup>
            <Card.Footer className="text-right">
              <h5>Összesen: {totalPrice} Ft</h5>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default RendelésOldal;
