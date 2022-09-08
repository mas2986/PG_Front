import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  filterByGenre,
  filterBySport,
  filterByBrand,
  orderBy,
  orderByPrice,
} from "../redux/action";
import style from "./Filters.module.css";

export default function Filters() {
  const dispatch = useDispatch();

  const [input, setInput] = useState("");

  function handleFilteredGenres(e) {
    e.preventDefault();
    dispatch(filterByGenre(e.target.value));
    
  }
  function handleFilteredSports(e) {
    e.preventDefault();
    dispatch(filterBySport(e.target.value));
    
  }
  function handleFilteredBrands(e) {
    e.preventDefault();
    dispatch(filterByBrand(e.target.value));
 }

  function handleOrderBy(e) {
    e.preventDefault();
    dispatch(orderBy(e.target.value));
  }
  function handleOrderByPrice(e) {
    e.preventDefault();
    dispatch(orderByPrice(e.target.value));
}
  

  return (
    <section className={style.box}>
      {/* <div>
        <h3>ORDER</h3>
        <select onChange={(e) => handleOrderBy(e)}>
          <option value="asc"> A-Z</option>
          <option value="desc"> Z-A</option>
        </select>
      </div> */}
      <div>
        <h3>ORDER BY PRICE</h3>
        <select onChange={(e) => handleOrderByPrice(e)}>
          <option value="asc"> Low to High</option>
          <option value="desc"> High to Low</option>
        </select>
      </div>

      <div>
        <h3>GENDER</h3>
        <select value="Start" 
          className="select-detail"
          onChange={(e) => {
            handleFilteredGenres(e);
          }}
        >
          {/* RENDER FROM ARRAY  */}
          <option value="Start"  >Start</option>
          <option value="All" >All</option>
          <option value="Male">Men</option>
          <option value="Female">Women</option>
          <option value="Kids">Kids</option>
          {/* <option value="male">Male</option> */}
          {/* <option value="female">Female</option> */}
          {/* <option value="kids">Bebies</option> */}
          <option value="Adults">Adults</option>
          <option value="None">Genderless</option>
          <option value="Unisex">Unisex</option>
          SELECT
        </select>
      </div>
      <div>
        <h3>BRANDS</h3>
        <select value="Start"
          className="select-detail"
          onChange={(e) => {
            handleFilteredBrands(e);
          }}
        >
          <option value="Start"  >Start</option>
          <option value="All" >All</option>
          <option value="Nike">Nike</option>
          <option value="Adidas">Adidas</option>
          <option value="Gilbert">Gilbert</option>
          <option value="Wilson">Wilson</option>
          <option value="Head">Head</option>
          <option value="Everlast">Everlast</option>
          <option value="Speedo">Speedo</option>
          <option value="Simbra">Simbra</option>
          <option value="Giro">Giro</option>
          <option value="Troy Lee Air">Troy Lee Air</option>
        </select>
      </div>
      <div>
        <h3>SPORTS</h3>
        <select value="Start"
          className="select-detail"
          onChange={(e) => handleFilteredSports(e)}
        >
          <option value="Start"  >Start</option>
          <option value="All"  >All</option>
          <option value="Futbol">Football</option>
          <option value="Rugby">Rugby</option>
          <option value="Basketball">Basketball</option>
          <option value="Tennis">Tennis</option>
          <option value="Boxing">Boxing</option>
          <option value="Paddle">Paddle</option>
          <option value="swimming">Swimming</option>
          <option value="Hockey">Hockey </option>
          <option value="Ciclism">Cycling</option>
        </select>
      </div>
    </section>
  );
}
