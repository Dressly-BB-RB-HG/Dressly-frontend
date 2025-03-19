import React, { useEffect, useState } from "react";
import { Carousel } from "primereact/carousel";
import Termek from "../components/Termek";
import { myAxios } from "../contexts/MyAxios";
import "./Kezdolap.css";

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
      <Termek adat={product} />
    </div>
  );
  

  return (

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

  );
  
}

export default Kezdolap;
