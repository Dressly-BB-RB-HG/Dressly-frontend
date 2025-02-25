import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthContext from '../contexts/AuthContext';
// import { ApiContext } from '../contexts/ApiContext';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
// import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Card, ListGroup, Button, Form } from 'react-bootstrap'; // Importáljuk a szükséges komponenseket

function RendelésOldal() {
  const { user, errors } = useAuthContext();
  const navigate = useNavigate(); // A navigate hook importálása

  const [kosar, setKosar] = useState([]);
  const [szallitasiCim, setSzallitasiCim] = useState({
    utca: '',
    iranyitoszam: '',
    varos: '',
  });

  const totalPrice = kosar.reduce((sum, item) => sum + item.ar * item.mennyiseg, 0);

  // Kosár adatainak lekérése
 /*  const fetchKosar = async () => {
    try {
      const response = await axios.get('/api/kosar');
      setKosar(response.data);
    } catch (error) {
      console.error('Hiba történt a kosár adatainak lekérésekor:', error);
      alert('Hiba történt a kosár adatainak lekérésekor.');
    }
  }; */

  useEffect(() => {
    if (!user) {
      navigate('/bejelentkezes');
    } else {
      /* setName(user.name); */
    }
   /*  fetchKosar(); */
  }, [user, navigate]);

  // Szállítási cím változása
  const handleCimValtozas = (e) => {
    const { name, value } = e.target;
    setSzallitasiCim({ ...szallitasiCim, [name]: value });
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
      <Row>
        {/* Bal oldal - Üdvözlés és Telefonszám */}
        <Col md={4}>
          <Card className="shadow p-3">
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
              <Form>
                <Form.Group controlId="formPhone">
                  <Form.Label>Telefonszám</Form.Label>
                  <Form.Control
                    type="text"
                    name="phone"
                    placeholder="Írd be a telefonszámod"
                  />
                </Form.Group>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        {/* Középső oldal - Szállítási cím */}
        <Col md={4}>
          <Card className="shadow p-3">
            <Card.Header as="h5" className="text-center">Szállítási cím</Card.Header>
            <Card.Body>
              <Form>
                <Form.Group controlId="formVaros">
                  <Form.Label>Város</Form.Label>
                  <Form.Control
                    type="text"
                    name="varos"
                    value={szallitasiCim.varos}
                    onChange={handleCimValtozas}
                    placeholder="Írd be a várost"
                  />
                </Form.Group>

                <Form.Group controlId="formUtca">
                  <Form.Label>Utca és házszám</Form.Label>
                  <Form.Control
                    type="text"
                    name="utca"
                    value={szallitasiCim.utca}
                    onChange={handleCimValtozas}
                    placeholder="Írd be az utca nevét és házszámot"
                  />
                </Form.Group>

                <Form.Group controlId="formIrsz">
                  <Form.Label>Irányítószám</Form.Label>
                  <Form.Control
                    type="text"
                    name="iranyitoszam"
                    value={szallitasiCim.iranyitoszam}
                    onChange={handleCimValtozas}
                    placeholder="Írd be az irányítószámot"
                  />
                </Form.Group>

                <Button variant="primary" onClick={handleRendeles} block>
                  Rendelés leadása
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        {/* Jobb oldal - Kosár tartalma */}
        <Col md={4}>
          <Card className="shadow p-3">
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
