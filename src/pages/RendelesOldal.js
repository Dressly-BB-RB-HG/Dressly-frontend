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
  const { user } = useAuthContext(); // A felhasználói kontextus elérése
  const navigate = useNavigate(); // A navigálás kezelése
  const { kosarLISTA, kosarbolTorol } = useContext(KosarContext); // KosárContext és törlés elérése

  const [szallitasMod, setSzallitasMod] = useState('');
  const [fizetesMod, setFizetesMod] = useState(''); // Szállítási mód

  // Kosár összesített ára
  const totalPrice = kosarLISTA.reduce((sum, item) => sum + item.ar * item.mennyiseg, 0);

  useEffect(() => {
    // Ha nincs bejelentkezve a felhasználó, navigálunk a bejelentkezési oldalra
    if (!user) {
      navigate('/bejelentkezes');
    }
  }, [user, navigate]);

  const handleSzallitasModValtozas = (e) => {
    setSzallitasMod(e.target.value); // Szállítási mód változása
  };

  const handleFizetesModValtozas = (e) => {
    setFizetesMod(e.target.value); // Szállítási mód változása
  };



  const handleRendeles = async () => {
    try {
      if (!user) {
        alert('Be kell jelentkezned a rendelés leadásához!');
        return;
      }
  
      if (kosarLISTA.length === 0) {
        alert('A kosár üres!');
        return;
      }
  
      console.log("Kosár tartalma:", kosarLISTA);
  
      const missingIDs = kosarLISTA.filter(item => !item.termek || !item.termek.termek_id);
      if (missingIDs.length > 0) {
        console.error("Hiányzó termék ID-k:", missingIDs);
        alert("Egy vagy több termék nem rendelkezik azonosítóval!");
        return;
      }
  
      const rendelesTetels = kosarLISTA.map(item => ({
        termek_id: item.termek.termek_id, 
        mennyiseg: item.mennyiseg,
      }));
  
      const rendelesData = {
        felhasznalo_id: user.id,
        szallitas_mod: szallitasMod,
        fizetesmod: fizetesMod,
        rendeles_tetels: rendelesTetels,
      };
  
      // 1. Rendelés mentése az adatbázisba
      const rendelesResponse = await myAxios.post('/api/rendeles-leadas', rendelesData);
  
      // 2. Rendelés száma lekérése
      const rendeles_szam = rendelesResponse.data.rendeles_szam;  // FONTOS! 
  
      console.log('Rendelés sikeresen mentve:', rendelesResponse.data);
  
      // 3. Csomag létrehozása
      const csomagData = {
        rendeles: rendeles_szam, // ITT CSERÉLVE
        szallito: szallitasMod,
        csomag_allapot: "Csomagolás alatt", // Egységesítés
        szall_datum: new Date().toISOString().split("T")[0],
      };
  
      /* await myAxios.post('/api/csomag-leadas', csomagData); */
  
      alert('Rendelés sikeresen leadva!');
  
    } catch (error) {
      console.error('Hiba történt a rendelés feldolgozása közben:', error.response?.data || error);
      alert('Hiba történt a rendelés során. Kérlek próbáld újra!');
    }
  };
  
  
  
  

  const udvozles = () => {
    return 'Itt tudja véglegesíteni a rendelését';
  };

  const today = new Date().toLocaleDateString();

  return (
    <div className="d-flex flex-column min-vh-100 bg-light">
      <Container className="my-5 flex-grow-1 d-flex flex-column">
        <Row className="g-4">
          {/* Bal oldal - Üdvözlés, Telefonszám és Szállítási mód */}
          <Col xs={12} md={5} lg={4} className="d-flex flex-column">
            <Card className="shadow-lg p-4 rounded-3 flex-grow-1">
              <Card.Body>
                <motion.div
                  className="text-center mb-4"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <h2 className="fw-bold" style={{ color: '#4CAF50' }}>
                    {udvozles()}, {user?.name}!
                  </h2>
                  <p className="text-muted">Dátum: {today}</p>
                </motion.div>

                <Form>

                  {/* Szállítási mód választás */}
                  <Form.Group controlId="formSzallitasMod" className="mt-3">
                    <Form.Label>Szállítási mód</Form.Label>
                    <div className="d-flex justify-content-start align-items-center">
                      <Form.Check
                        type="radio"
                        id="radioUtanvet"
                        label="Utánvét"
                        name="fizetesMod"
                        value="utanvet"
                        checked={fizetesMod === 'utanvet'}
                        onChange={handleFizetesModValtozas}
                        custom
                      />
                      <Form.Check
                        type="radio"
                        id="radioBankkartya"
                        label="Bankkártyás fizetés"
                        name="fizetesMod"
                        value="bankkartya"
                        checked={fizetesMod === 'bankkartya'}
                        disabled
                        custom
                        className="ms-3"
                        style={{ opacity: 0.5 }}
                      />
                    </div>
                  </Form.Group>
                  <Form.Group controlId="formSzallitasMod">
              <Form.Label>Szállítási mód</Form.Label>
              <Form.Check
                type="radio"
                id="radioMPL"
                label="MPL"
                name="szallitasMod"
                value="MPL"
                checked={szallitasMod === 'MPL'}
                onChange={handleSzallitasModValtozas}
              />
              <Form.Check
                type="radio"
                id="radioGLS"
                label="GLS"
                name="szallitasMod"
                value="GLS"
                checked={szallitasMod === 'GLS'}
                onChange={handleSzallitasModValtozas}
              />
            </Form.Group>

                  <Button
                    variant="success"
                    onClick={handleRendeles}
                    block
                    className="mt-3 py-2 fs-5 rounded-3 shadow"
                  >
                    Rendelés leadása
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>

          {/* Jobb oldal - Kosár tartalma és Szállítási cím részletek */}
          <Col xs={12} md={7} lg={8} className="d-flex flex-column">
            <Card className="shadow-lg p-4 rounded-3 flex-grow-1">
              <Card.Header as="h5" className="text-center">
                Kosár tartalma
              </Card.Header>
              <Card.Body className="d-flex flex-column justify-content-between">
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
                              style={{
                                width: '50px',
                                height: '50px',
                                objectFit: 'cover',
                              }}
                            />
                          </td>
                          <td>{adat.szin}</td>
                          <td>{adat.meret}</td>
                          <td>{adat.mennyiseg} db</td>
                          <td>{adat.ar} Ft</td>
                          <td>{adat.ar * adat.mennyiseg} Ft</td>
                          <td>
                            <Button
                              variant="danger"
                              onClick={() => kosarbolTorol(adat.termek.termek_id)}
                            >
                              🗑️
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                ) : (
                  <p>A kosár üres.</p>
                )}
              </Card.Body>
              <Card.Footer className="text-right fs-5">
                <strong>Összesen: {totalPrice} Ft</strong>
              </Card.Footer>
            </Card>

            {/* Szállítási cím részletek */}
            <Card className="shadow-lg mt-4 p-4 rounded-3">
              <Card.Header as="h5" className="text-center">
                Szállítási cím
              </Card.Header>
              <Card.Body>
                <p className="text-muted mt-3 fs-6">
                  Amennyiben változtatni szeretne a szállítási címen, azt{' '}
                  <Link to="/profil" className="text-decoration-none text-success">
                    itt tudja megtenni.
                  </Link>
                </p>
                <ListGroup>
                  <ListGroup.Item>
                    <strong>Város:</strong> {user?.varos || 'Nincs megadva'}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>Kerület:</strong> {user?.kerulet || 'Nincs megadva'}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>Utca:</strong> {user?.utca || 'Nincs megadva'}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>Házszám:</strong> {user?.hazszam || 'Nincs megadva'}
                  </ListGroup.Item>
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default RendelésOldal;
