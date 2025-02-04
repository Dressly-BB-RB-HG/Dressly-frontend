import React, { useState, useEffect } from "react";
import { myAxios } from "../../contexts/MyAxios";
import { Modal, Button, Form } from "react-bootstrap"; // React Bootstrap importálása

const Termekmodel = ({ model, closeModal, fetchModels }) => {
  const [termekData, setTermekData] = useState({
    szin: "",
    meret: "",
    keszlet: 0,
    ar: 0,
  });

  // Termék adatok betöltése a modell ID alapján
  useEffect(() => {
    const fetchTermekData = async () => {
      try {
        const response = await myAxios.get(`/api/admin/termek/${model.modell_id}`);
        const data = response.data.termek;
        setTermekData({
          szin: data.szin,
          meret: data.meret,
          keszlet: data.keszlet,
          ar: data.ar,
        });
      } catch (error) {
        console.error("Hiba történt a termék adatainak betöltése során:", error);
      }
    };

    if (model.modell_id) {
      fetchTermekData();
    }
  }, [model.modell_id]);

  const handleTermekSubmit = async (e) => {
    e.preventDefault();
    try {
      await myAxios.post(`/api/admin/termek`, {
        modell_id: model.modell_id,  // A modell_id-t is át kell adni a requestben
        ...termekData,
      });
      alert("Termék sikeresen feltöltve!");
      setTermekData({ szin: "", meret: "", keszlet: "", ar: "" });
      fetchModels();
      closeModal();
    } catch (error) {
      console.error("Hiba történt a termék feltöltése során:", error);
      alert("Hiba történt a termék feltöltése során.");
    }
  };

  return (
    <Modal show={true} onHide={closeModal} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Termék kiegészítése</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleTermekSubmit}>
          <Form.Group className="mb-3" controlId="szin">
            <Form.Label>Szín</Form.Label>
            <Form.Control
              type="text"
              value={termekData.szin}
              onChange={(e) =>
                setTermekData({ ...termekData, szin: e.target.value })
              }
              placeholder="Add meg a színt"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="meret">
            <Form.Label>Méret</Form.Label>
            <Form.Control
              type="text"
              maxLength={3}
              value={termekData.meret}
              onChange={(e) =>
                setTermekData({ ...termekData, meret: e.target.value })
              }
              placeholder="Add meg a méretet"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="keszlet">
            <Form.Label>Készlet</Form.Label>
            <Form.Control
              type="number"
              value={termekData.keszlet}
              onChange={(e) =>
                setTermekData({ ...termekData, keszlet: e.target.value })
              }
              placeholder="Add meg a készletet"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="ar">
            <Form.Label>Ár</Form.Label>
            <Form.Control
              type="number"
              value={termekData.ar}
              onChange={(e) =>
                setTermekData({ ...termekData, ar: e.target.value })
              }
              placeholder="Add meg az árat"
              required
            />
          </Form.Group>

          <div className="d-flex justify-content-center">
            <Button variant="success" type="submit" size="lg">
              Feltöltés
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default Termekmodel;
