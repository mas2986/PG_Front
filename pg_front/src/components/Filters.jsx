import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { styled } from "@mui/material/styles";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import Stack from "@mui/material/Stack";
import {
  filterByGenre,
  filterBySport,
  filterByBrand,
  orderBy,
  orderByPrice,
  getProduct,
} from "../redux/action";
import style from "./Filters.module.css";

export default function Filters() {
  const dispatch = useDispatch();
  const [genderTrail, setGenderTrail] = useState("");

  const [input, setInput] = useState("");

  function handleFilteredGenres(e) {
    e.preventDefault();
    dispatch(filterByGenre(e.target.value));
    setGenderTrail(e.target.value);
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

  function cleanFilter() {
    setGenderTrail("");
    dispatch(getProduct());
  }
  const Android12Switch = styled(Switch)(({ theme }) => ({
    padding: 8,
    "& .MuiSwitch-track": {
      borderRadius: 22 / 2,
      "&:before, &:after": {
        content: '""',
        position: "absolute",
        top: "50%",
        transform: "translateY(-50%)",
        width: 16,
        height: 16,
      },
      "&:before": {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
          theme.palette.getContrastText(theme.palette.primary.main)
        )}" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
        left: 12,
      },
      "&:after": {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
          theme.palette.getContrastText(theme.palette.secondary.main)
        )}" d="M19,13H5V11H19V13Z" /></svg>')`,
        right: 12,
      },
    },
    "& .MuiSwitch-thumb": {
      boxShadow: "none",
      width: 16,
      height: 16,
      margin: 2,
    },
  }));

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <FormGroup sx={{ position: "fixed", top: "6rem", left: "4rem" }}>
        <FormControlLabel
          control={<Android12Switch defaultChecked />}
          label="Filters"
        />
        <Stack direction="row" spacing={1} alignItems="center"></Stack>
      </FormGroup>
      <section className={style.box} style={{ marginTop: "5rem" }}>
        {/* <div>
        <h3>ORDER</h3>
        <select onChange={(e) => handleOrderBy(e)}>
          <option value="asc"> A-Z</option>
          <option value="desc"> Z-A</option>
        </select>
      </div> */}

        <div>
          {/* <h3>ORDER BY :</h3> */}
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
                padding: 0,
                marginLeft: "2rem",
                display: "inline",
                width: "4rem",
                fontSize: "0.7rem",
                borderRadius: "50px",
                textAlign: "center",
              }}
              onClick={cleanFilter}
            >
              {genderTrail + " X"}
            </p>
          ) : (
            <div style={{ marginTop: "0.9rem" }}></div>
          )}
        </div>
        <div>
          <h3>BRANDS</h3>
          <select
            value="Start"
            className={style.selectDetail}
            onChange={(e) => {
              handleFilteredBrands(e);
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
        </div>
        <div>
          <h3>SPORTS</h3>
          <select
            value="Start"
            className={style.selectDetail}
            onChange={(e) => handleFilteredSports(e)}
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
        </div>
      </section>
    </div>
  );
}
