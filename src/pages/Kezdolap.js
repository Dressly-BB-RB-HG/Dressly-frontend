import React, { useEffect, useState } from "react";
import { Carousel } from "primereact/carousel";
import KezdoTermek from "../components/KezdoTermek";
import { myAxios } from "../contexts/MyAxios";
import "./Kezdolap.css";
import besetal from "../components/videok/besetal.mp4";

function Kezdolap() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchLegkedveltebb = async () => {
      try {
        const response = await myAxios.get("/api/legkedveltebb-modell");
        setProducts(response.data);
      } catch (error) {
        console.error(
          "Hiba történt a legkedveltebb termékek lekérésekor:",
          error
        );
      }
    };
    fetchLegkedveltebb();
  }, []);

  const responsiveOptions = [
    { breakpoint: "1400px", numVisible: 2, numScroll: 1 },
    { breakpoint: "1199px", numVisible: 2, numScroll: 1 },
    { breakpoint: "767px", numVisible: 1, numScroll: 1 },
    { breakpoint: "575px", numVisible: 1, numScroll: 1 },
  ];

  const productTemplate = (product) => (
    <div className="termek-container">
      <KezdoTermek adat={product} />
    </div>
  );

  return (
    <div>
      <video className="video" src={besetal} autoPlay loop muted />
      <div className="content">
        <h1 className="motto">DRESS WITH LOVE</h1>
      </div>
      <div>
        <h2 className="cim">Legnépszerűbb termékeink</h2>
        <Carousel
          value={products}
          numVisible={3}
          numScroll={1}
          responsiveOptions={responsiveOptions}
          itemTemplate={productTemplate}
          className="kezdolap-carousel"
          autoplay
          autoplayInterval={8000}
          circular
        />
      </div>
      <div className="logo-container">
        <img className="logo" src="/pipa.png" alt="Nike"></img>
        <img className="logo" src="/north.png" alt="The North Face"></img>
        <img className="logo" src="/adidas.png" alt="Adidas"></img>
        <img className="logo" src="/puma.png" alt="Puma"></img>
        <img className="logo" src="/ralph.png" alt="Ralph Lauren"></img>
        <img className="logo" src="/boss.png" alt="Boss"></img>
      </div>
      <div className="profil-container">
          <div className="profil-card">
            <img src="" alt="Bence" className="profilkep"/>
            <h1>Baksa Bence</h1>
            <p className="profil-title">CEO &amp; Fejlesztő</p>
            <p className="profil-email">aerobikszeksz@hotmél.com</p>
          </div>
          <div className="profil-card">
            <img src="/gergo.jfif" alt="Gergő" className="profilkep"/>
            <h1>Halász Gergő</h1>
            <p className="profil-title">CEO &amp; Fejlesztő</p>
            <p className="profil-email">halaszgergo22@gmail.com</p>
          </div>
          <div className="profil-card">
            <img src="/bazsi_legjobb.jpg" alt="Balázs" className="profilkep"/>
            <h1>Richter Balázs</h1>
            <p className="profil-title">CEO &amp; Fejlesztő</p>
            <p className="profil-email">richter.balazs.krisztian@gmail.com</p>
          </div>
      </div>
    </div>
  );
}

export default Kezdolap;
