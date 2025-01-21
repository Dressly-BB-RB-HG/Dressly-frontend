import React from "react";
import useAuthContext from "../contexts/AuthContext";
import { Container, Row, Col, Card } from "react-bootstrap";

function Profil() {
  const { user } = useAuthContext();

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
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </main>
  );
}

export default Profil;