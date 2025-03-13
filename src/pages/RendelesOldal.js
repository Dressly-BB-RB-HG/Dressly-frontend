import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthContext from '../contexts/AuthContext';
import { motion } from 'framer-motion';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Card, ListGroup, Button, Form } from 'react-bootstrap';
import axios from 'axios'; // Axios importálása
import { myAxios } from '../contexts/MyAxios';

function RendelésOldal() {
  const { user } = useAuthContext(); // A felhasználói kontextus elérése
  const navigate = useNavigate(); // A navigálás kezelése

  const [kosar, setKosar] = useState([]); // Kosár adatainak kezelése
  const [szallitasMod, setSzallitasMod] = useState(''); // Szállítási mód
  const [phone, setPhone] = useState(''); // Telefonszám kezelése

  const totalPrice = kosar.reduce((sum, item) => sum + item.ar * item.keszlet, 0); // Kosár összesített ára

  useEffect(() => {
    // Ha nincs bejelentkezve a felhasználó, navigálunk a bejelentkezési oldalra
    if (!user) {
      navigate('/bejelentkezes');
    } else {
      // Kosár adatok lekérése
      const fetchKosar = async () => {
        try {
          const response = await myAxios.get('/api/kosar-megjelen'); // API hívás a kosár adatainak lekéréséhez
          setKosar(response.data); // Kosár állapot beállítása
        } catch (error) {
          console.error('Hiba történt a kosár betöltésekor:', error);
          alert('Hiba történt a kosár betöltése közben');
        }
      };

      fetchKosar(); // Kosár adatainak lekérése
    }
  }, [user, navigate]);

  const handleSzallitasModValtozas = (e) => {
    setSzallitasMod(e.target.value); // Szállítási mód változása
  };

  const handlePhoneValtozas = (e) => {
    setPhone(e.target.value); // Telefonszám változása
  };

  const handleRendeles = async () => {
    try {
      // Ellenőrizzük, hogy a felhasználó be van jelentkezve
      if (user) {
        const emailData = {
          email: user.email,
          kosar, // A kosár adatai
          szallitasMod, // A szállítási mód
          phone, // A telefonszám // A bejelentkezett felhasználó email címe
        };

        const response = await myAxios.post('/api/email-kuldes', emailData); // API hívás a rendelés email küldésére
        console.log('Email sikeresen elküldve:', response.data);
        alert('Rendelés elküldve!');
      }
    } catch (error) {
      console.error('Hiba történt az email küldésekor:', error);
      alert('Hiba történt az email küldése közben');
    }
  };

  const udvozles = () => {
    return 'Itt tudja véglegesíteni a rendelését'; // Üdvözlő szöveg
  };

  const today = new Date().toLocaleDateString(); // Mai dátum megjelenítése

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
              {kosar.length > 0 ? (
                kosar.map((item) => (
                  <ListGroup.Item key={item.termek_id} className="d-flex justify-content-between align-items-center">
                    {/* Kosár termékek adatainak megjelenítése */}
                    <span>{item.modell}</span>
                    <span>{item.szin}</span>
                    <span>{item.meret}</span>
                    <span>{item.keszlet} db</span>
                    <span>Ár: {item.ar * item.keszlet} Ft</span>
                  </ListGroup.Item>
                ))
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
                Amennyiben változtatni szeretne a szállítási címen, azt a profil módosításnál tudja megtenni!
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

export default RendelésOldal;
