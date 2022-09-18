import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProduct,getOrderByUser, getAllOrders } from "../redux/action";
import Skeleton from "@mui/material/Skeleton";
import Nav from "./Nav";
import home from "../asset/home.png";
import Section from "./Section";
import HomePictures from "./HomePictures";
import CarouselBrands from "./CarouselBrands";
import $ from "jquery";
import style from "./Home.module.css";
import Contact from "./Contact";
import { Link, useHistory } from "react-router-dom";
import HistoryOrder from "./HistoryOrder";



window.jquery = window.$ = $;

export default function Home() {
  const allProducts = useSelector((state) => state.products);
  const user = useSelector((state) => state.user)
  const id = user.id
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
      $("h1").css("left", Math.max(45 - 0.2 * window.scrollY, -33) + "vw");
    });
  };

  useEffect(() => {
    jQueryCode();
  }, []);

  useEffect(() => {
    dispatch(getProduct());
    dispatch(getOrderByUser(id))
    dispatch(getAllOrders())
   
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

  return home && allProducts ? (
    <div>

      <Nav />
      <img
        id={"#"}
        src={home}
        style={{
          width: "100vw",
          height: "100%",
          marginTop: "-4rem",
          marginBottom: "1rem",
          borderBottomLeftRadius: "40px",
          borderBottomRightRadius: "40px",
        }}
      />
      <div>
        <Link to="/products">
          <p className={style.button}>Go Shopping</p>
        </Link>
      </div>
      <a href={"#contact"} className={style.contactButton}>
        Contact Us!
      </a>
      <div className="scrollingText">
        <h1
          className={style.homeh1}
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
        <HistoryOrder/>
      <CarouselBrands />

      <center>
        <Section />
      </center>

      <HomePictures />

      <Contact />
    </div>
  ) : (
    <Skeleton variant="rectangular" width={1300} height={1200} />
  );
}
