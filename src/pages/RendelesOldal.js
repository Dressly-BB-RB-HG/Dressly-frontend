import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthContext from '../contexts/AuthContext';
import { motion } from 'framer-motion';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Card, ListGroup, Button, Form, Table } from 'react-bootstrap';
import { KosarContext } from '../contexts/KosarContext'; // KosárContext importálása
import { myAxios } from '../contexts/MyAxios';
import { Link } from 'react-router-dom';


function RendelésOldal() {
  const { user } = useAuthContext(); 
  const navigate = useNavigate(); 
  const { kosarLISTA, kosarbolTorol } = useContext(KosarContext); 

  const [szallitasMod, setSzallitasMod] = useState(''); // Szállítási mód
  const [phone, setPhone] = useState(''); // Telefonszám kezelése

  // Kosár összesített ára
  const totalPrice = kosarLISTA.reduce((sum, item) => sum + item.ar * item.mennyiseg, 0); 

  useEffect(() => {
    
    if (!user) {
      navigate('/bejelentkezes');
    }
  }, [user, navigate]);

  const handleSzallitasModValtozas = (e) => {
    setSzallitasMod(e.target.value); 
  };

  const handlePhoneValtozas = (e) => {
    setPhone(e.target.value); 
  };

  const handleRendeles = async () => {
    try {
      
      if (user) {
        const emailData = {
          email: user.email,
          kosar: kosarLISTA, 
          szallitasMod, 
          phone, 
        };

        const response = await myAxios.post('/api/email-kuldes', emailData); 
        console.log('Email sikeresen elküldve:', response.data);
        alert('Rendelés elküldve!');
      }
    } catch (error) {
      console.error('Hiba történt az email küldésekor:', error);
      alert('Hiba történt az email küldése közben');
    }
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
          <Card className="shadow-lg p-4 rounded-3">
            <Card.Body>
              <motion.div
                className="text-center mb-4"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="fw-bold" style={{ color: "#4CAF50" }} >
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
                    className="shadow-sm"
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

                <Button variant="success" onClick={handleRendeles} block className="mt-3 py-2 fs-5 rounded-3 shadow">
                  Rendelés leadása
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        {/* Jobb oldal - Kosár tartalma és Szállítási cím részletek */}
        <Col md={8}>
          <Card className="shadow-lg p-4 rounded-3">
            <Card.Header as="h5" className="text-center">Kosár tartalma</Card.Header>
            <ListGroup variant="flush">
            {kosarLISTA.length > 0 ? (
                <Table striped bordered hover responsive>
                  <thead>
                    <tr>
                      <th>Termék</th>
                      <th>Szín</th>
                      <th>Méret</th>
                      <th>Mennyiség</th>
                      <th>Ár</th>
                      <th>Összeg</th>
                      <th>Akció</th>
                    </tr>
                  </thead>
                  <tbody>
                    {kosarLISTA.map((adat) => (
                      <tr key={adat.termek_id}>
                        <td>
                          <img 
                            src={adat.termek.modell.kep} 
                            alt={adat.termek.modell.gyarto} 
                            style={{ width: '80px', height: '80px', objectFit: 'cover' }} 
                          />
                        </td>
                        <td>{adat.szin}</td>
                        <td>{adat.meret}</td>
                        <td>{adat.mennyiseg} db</td>
                        <td>{adat.ar} Ft</td>
                        <td>{adat.ar * adat.mennyiseg} Ft</td>
                        <td>
                          <Button variant="danger" onClick={() => kosarbolTorol(adat.termek.termek_id)}>
                            🗑️
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              ) : (
                <ListGroup.Item className="text-center">
                  A kosár üres.
                </ListGroup.Item>
              )}
            </ListGroup>
            <Card.Footer className="text-right fs-5">
              <strong>Összesen: {totalPrice} Ft</strong>
            </Card.Footer>
          </Card>

          {/* Szállítási cím részletek */}
          <Card className="shadow-lg mt-4 p-4 rounded-3">
          <Card.Header as="h5" className="text-center">Szállítási cím</Card.Header>
          <Card.Body>
            <p className="text-muted mt-3 fs-6">
            Amennyiben változtatni szeretne a szállítási címen, azt{' '}
          <Link to="/profil" className="text-decoration-none text-success">
            itt tudja megtenni.
          </Link>

            </p>
              <ListGroup>
                <ListGroup.Item><strong>Város:</strong> {user?.varos || 'Nincs megadva'}</ListGroup.Item>
                <ListGroup.Item><strong>Kerület:</strong> {user?.kerulet || 'Nincs megadva'}</ListGroup.Item>
                <ListGroup.Item><strong>Utca:</strong> {user?.utca || 'Nincs megadva'}</ListGroup.Item>
                <ListGroup.Item><strong>Házszám:</strong> {user?.hazszam || 'Nincs megadva'}</ListGroup.Item>
              </ListGroup>             
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

//
export default RendelésOldal;
