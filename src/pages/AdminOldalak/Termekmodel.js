import React, { useState, useEffect } from "react";
import { myAxios } from "../../contexts/MyAxios";
import { Modal, Button, Form } from "react-bootstrap"; 

const Termekmodel = ({ model, closeModal, fetchModels }) => {
  const [termekData, setTermekData] = useState({
    szin: "",
    meret: "",
    keszlet: 0,
    ar: 0,
  });

  // A szerkesztés gombra kattintva hívjuk meg a terméket
  const handleEdit = async () => {
    if (model && model.modell_id) {
      try {
        const response = await myAxios.get(`/api/admin/termekek/${model.modell_id}`);
        if (response.data.termek) {
          const data = response.data.termek;
          setTermekData({
            szin: data.szin,
            meret: data.meret,
            keszlet: data.keszlet,
            ar: data.ar,
          });
        } else {
          console.log('Nem található termék az adott modellhez');
          alert('Ez a modell nem rendelkezik termékadatokkal.');
        }
      } catch (error) {
        console.error('Figyelem! Még nem lettek feltöltve termék értékek a modellhez!', error.response ? error.response.data : error.message);
        alert('Figyelem! Még nem lettek feltöltve termék értékek a modellhez!');
      }
    }
  };

  // Betöltjük a termékadatokat amikor a modell megváltozik (ha szükséges)
  useEffect(() => {
    handleEdit();
  }, [model]);

  const handleTermekSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('Termékadatok:', termekData);
      console.log('Aktuális modell:', model.modell_id);
  
      // PUT kérés az API-ra (ez automatikusan új terméket is létrehoz, ha kell)
      await myAxios.put(`/api/admin/termek-modosit/${model.modell_id}`, {
        modell: model.modell_id, 
        ...termekData,
      });
  
      alert("Termék sikeresen mentve!");
      setTermekData({ szin: "", meret: "", keszlet: "", ar: "" });
      fetchModels(); // A modellek újratöltése
      closeModal(); // Modális ablak bezárása
    } catch (error) {
      console.error("Hiba történt a termék frissítése során:", error.response ? error.response.data : error.message);
      alert("Hiba történt a termék frissítése során.");
    }
  };

  return (
    <Modal show={true} onHide={closeModal} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Termék adatok feltöltése</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          <p><strong>Aktuális Modell ID: </strong>{model.modell_id}</p>
        </div>

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
              Frissítés
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default Termekmodel;
