import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  filterByGenre,
  filterBySport,
  filterByBrand,
  orderBy,
  orderByPrice,
  getProduct,
} from "../redux/action";
import style from "./Filters.module.css";
import h from "./Home.module.css";
import { useHistory } from "react-router-dom";

export default function Filters() {
  const dispatch = useDispatch();
  const cleanFilter = useSelector((state) => state.boolean);
  const [genderTrail, setGenderTrail] = useState("");
  const [brandTrail, setBrandTrail] = useState("");
  const [sportsTrail, setSportsTrail] = useState("");
  const [activeFilters, setActiveFilters] = useState({
    gender: "",
    brand: "",
    sport: "",
  });

  function handleFilteredGenres(e) {
    e.preventDefault();
    dispatch(filterByGenre(e.target.value));
    if (e.target.value !== "All") {
      setGenderTrail(e.target.value);
      setActiveFilters((prev) => ({
        ...prev,
        gender: e.target.value,
      }));
    }
  }
  function handleFilteredSports(e) {
    e.preventDefault();
    dispatch(filterBySport(e.target.value));
    if (e.target.value !== "All") {
      setSportsTrail(e.target.value);
      setActiveFilters((prev) => ({
        ...prev,
        sport: e.target.value,
      }));
    }
  }
  function handleFilteredBrands(e) {
    e.preventDefault();
    dispatch(filterByBrand(e.target.value));
    if (e.target.value !== "All") {
      setBrandTrail(e.target.value);
      setActiveFilters((prev) => ({
        ...prev,
        brand: e.target.value,
      }));
    }
  }

  function handleOrderByPrice(e) {
    e.preventDefault();
    dispatch(orderByPrice(e.target.value));
  }

  function cleanFilterGenres() {
    setGenderTrail("");
    setActiveFilters({
      ...activeFilters,
      gender: "",
    });
    dispatch(getProduct());
    setTimeout(() => {
      if (activeFilters.brand != "") {
        dispatch(filterByBrand(activeFilters.brand));
      }
      if (activeFilters.sport != "")
        dispatch(filterBySport(activeFilters.sport));
    }, 500);
  }

  function cleanFilterBrands() {
    setBrandTrail("");
    setActiveFilters({
      ...activeFilters,
      brand: "",
    });
    dispatch(getProduct());
    if (activeFilters.gender != "") {
      setTimeout(() => {
        dispatch(filterByGenre(activeFilters.gender));
      }, 500);
    }
    if (activeFilters.sport != "")
      setTimeout(() => {
        dispatch(filterBySport(activeFilters.sport));
      }, 500);
  }

  function cleanFilterSport() {
    setSportsTrail("");
    setActiveFilters({
      ...activeFilters,
      sport: "",
    });
    dispatch(getProduct());
    setTimeout(() => {
      if (activeFilters.gender != "") {
        dispatch(filterByGenre(activeFilters.gender));
      }
      if (activeFilters.brand != "")
        dispatch(filterByBrand(activeFilters.brand));
    }, 500);
  }

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <section
        className={style.box}
        style={{ marginTop: "5rem", paddingBottom: "2.5rem" }}
      >
        <div>
          <h3>ORDER BY PRICE</h3>
          <select
            className={style.selectDetail}
            onChange={(e) => handleOrderByPrice(e)}
          >
            <option value="asc"> Low to High</option>
            <option value="desc"> High to Low</option>
          </select>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <h3 className="genres-section">GENDER</h3>
          <select
            value="Start"
            className={style.selectDetail}
            onChange={(e) => {
              handleFilteredGenres(e);
              if (e.target.value === "All") setGenderTrail("");
            }}
          >
            {/* RENDER FROM ARRAY  */}
            <option value="Start">Start</option>
            <option value="All">All</option>
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
          {genderTrail !== "" ? (
            <p
              style={{
                color: "#000",
                backgroundColor: "#fff",
                margin: 0,
                padding: "0.1rem 0.3rem",
                marginLeft: "2rem",
                display: "inline",
                width: "4rem",
                fontSize: "0.7rem",
                borderRadius: "50px",
                textAlign: "center",
              }}
              onClick={cleanFilterGenres}
              className={h.trails}
            >
              {genderTrail + " X"}
            </p>
          ) : (
            <div style={{ marginTop: "1rem" }}></div>
          )}
        </div>
        <div>
          <h3>BRANDS</h3>
          <select
            value="Start"
            className={style.selectDetail}
            onChange={(e) => {
              handleFilteredBrands(e);
              if (e.target.value === "All") setBrandTrail("");
            }}
          >
            <option value="Start">Start</option>
            <option value="All">All</option>
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
          {brandTrail !== "" ? (
            <p
              style={{
                color: "#000",
                backgroundColor: "#fff",
                margin: 0,
                padding: "0.2rem 0.4rem",
                marginLeft: "2rem",
                display: "inline",
                width: "4rem",
                fontSize: "0.7rem",
                borderRadius: "50px",
                textAlign: "center",
              }}
              onClick={cleanFilterBrands}
              className={h.trails}
            >
              {brandTrail + " X"}
            </p>
          ) : (
            <div style={{ marginTop: "1rem" }}></div>
          )}
        </div>
        <div>
          <h3>SPORTS</h3>
          <select
            value="Start"
            className={style.selectDetail}
            onChange={(e) => {
              handleFilteredSports(e);
              if (e.target.value === "All") setSportsTrail("");
            }}
          >
            <option value="Start">Start</option>
            <option value="All">All</option>
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
          {sportsTrail !== "" ? (
            <p
              style={{
                color: "#000",
                backgroundColor: "#fff",
                margin: 0,
                padding: "0.2rem 0.4rem",
                marginLeft: "2rem",
                display: "inline",
                width: "4rem",
                fontSize: "0.7rem",
                borderRadius: "50px",
                textAlign: "center",
              }}
              onClick={cleanFilterSport}
              className={h.trails}
            >
              {sportsTrail + " X"}
            </p>
          ) : (
            <div style={{ marginBottom: "1rem" }}></div>
          )}
        </div>
      </section>
    </div>
  );
}
