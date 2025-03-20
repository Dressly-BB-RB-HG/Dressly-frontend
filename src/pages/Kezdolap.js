import React, { useEffect, useState } from "react";
import { Carousel } from "primereact/carousel";
import KezdoTermek from "../components/KezdoTermek";
import { myAxios } from "../contexts/MyAxios";
import "./Kezdolap.css";
import besetal from "../components/videok/besetal.mp4";
import { div } from "framer-motion/client";
import "@fontsource/playfair-display";

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
        <img className="logo" src="/pipa.png"></img>
        <img className="logo" src="/north.png"></img>
        <img className="logo" src="/adidas.png"></img>
        <img className="logo" src="/puma.png"></img>
        <img className="logo" src="/ralph.png"></img>
        <img className="logo" src="/boss.png"></img>
      </div>
      <div>
        
      </div>
    </div>
  );
}

export default Kezdolap;
