import React from "react";
import Carousel from "react-elastic-carousel";
import Adidas from "../img brands/logoadidas.png";
import Gilbert from "../img brands/gilbert.png";
import Head from "../img brands/head.png";
import Nike from "../img brands/nike2.png";
import Giro from "../img brands/giro_logo.webp";
import Speedo from "../img brands/speedo2.png";
import Wilson from "../img brands/Wilson.png";
import Troy from "../img brands/troy.png";
import Everlast from "../img brands/Everlast.png";
import { filterByCarousel, filterByBrand } from "../redux/action";
import { useDispatch } from "react-redux";
import h from "./Home.module.css";
import { useHistory } from "react-router-dom";



function CarouselBrands() {
  const imgbrands = [
    { title: "Adidas", image: Adidas },
    { title: "Gilbert", image: Gilbert },
    { title: "Head", image: Head },
    { title: "Nike", image: Nike },
    { title: "Giro", image: Giro },
    { title: "Speedo", image: Speedo },
    { title: "Wilson", image: Wilson },
    { title: "Troy Lee Air", image: Troy },
    { title: "Everlast", image: Everlast },
  ];

  const dispatch = useDispatch();
  const history = useHistory();

  function handleBrands(e) {
    e.preventDefault();
    dispatch(filterByBrand(e.target.title));
    history.push('/products')
  }
 

  return (
    <div
      className="carouselbrands"
      style={{ margin: "-4rem 2.5rem 2rem 2.5rem", paddingTop:"0" }}
    >
      <Carousel itemsToShow={4}>
        {imgbrands.map((ea, index) => (
          <div key={index}>
            <button
              onClick={(e) => handleBrands(e)}
              style={{ background: "transparent", border: "none" }}
            >
              {" "}
              <img
                src={ea.image}
                style={{ width: "120px", height: "100px" }}
                title={ea.title}
                alt="Not found"
                className={h["carousel-img"]}
              />
            </button>
          </div>
        ))}
      </Carousel>
    </div>
  );
}

export default CarouselBrands;
