import React, { useEffect, useState } from "react";
import { Carousel } from "primereact/carousel";
import KezdoTermek from "../components/KezdoTermek";
import { myAxios } from "../contexts/MyAxios";
import "./Kezdolap.css";
import besetal from "../components/videok/besetal.mp4";
import { div } from "framer-motion/client";

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
      <div >
        <video className="video" src={besetal} autoPlay loop muted/>
      </div>

      <div>
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
    </div>
  );
}

export default Kezdolap;
