import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import { getProduct } from "../redux/action";
import Nav from "./Nav";
import home from "../asset/home.png";
import Section from "./Section";
import HomePictures from "./HomePictures";
import CarouselBrands from "./CarouselBrands";
import $ from "jquery";
import h from "./Home.module.css";
import { useHistory } from "react-router-dom";
window.jquery = window.$ = $;

export default function Home() {
  const allProducts = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const history = useHistory();
  const pageSize = 12;
  const [pagination, setPagination] = useState({
    count: 0,
    from: 0,
    currentPage: 1,
    to: pageSize,
  });

  const products = allProducts.slice(pagination.from, pagination.to);

  const jQueryCode = () => {
    $(document).on("scroll", function () {
      $("h1").css("left", Math.max(40 - 0.2 * window.scrollY, -53) + "vw");
    });
  };

  useEffect(() => {
    jQueryCode();
  }, []);

  useEffect(() => {
    dispatch(getProduct());
  }, [dispatch]);

  useEffect(() => {
    setPagination({
      ...pagination,
      count: allProducts.length,
      from: 0,
      to: pageSize,
      currentPage: 1,
    });
  }, [allProducts.length]);

  const handleButtonClick = () => {
    history.push("/products");
  };
  return (
    <div>
      <Nav />
      <img
        src={home}
        style={{
          width: "100vw",
          height: "100%",
          marginTop: "-2.5rem",
          marginBottom: "1rem",
          borderBottomLeftRadius: "40px",
          borderBottomRightRadius: "40px",
        }}
      />
      <button className={h.button} onClick={handleButtonClick}>
        Start Shopping
      </button>
      <div className="scrollingText">
        <h1
        // style={{
        //   width: 2401,
        //   height: 185,
        //   position: "absolute",

        //   top: 511,
        //   fontFamily: "Roboto",
        //   fontStyle: "italic",
        //   fontWeight: 900,
        //   fontSize: 120,
        //   lineHeight: 24,
        //   display: "flex",
        //   alignItems: "center",
        //   textAlign: "center",
        //   letterSpacing: 0.15,
        //   ,

        // }}
        >
          Sports Apparel · Footwear · Accesories
        </h1>
      </div>

      <CarouselBrands />

      <center>
        <Section />
      </center>

      <HomePictures />
    </div>
  );
}
