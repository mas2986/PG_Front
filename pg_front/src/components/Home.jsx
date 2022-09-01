import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import CardProduct from "./CreateProduct";
import { getProduct } from "../redux/action";
import Nav from "./Nav";
import Filters from "./Filters";
import Image from "../asset/home.png";
import Pagination from "./Pagination";
// import "../Style/Home.css";

import home from "../asset/home.png";
import h from "./Home.module.css";

export default function Home() {
  const allProducts = useSelector((state) => state.products);
  const dispatch = useDispatch();

  const pageSize = 6;
  const [pagination, setPagination] = useState({
    count: 0,
    from: 0,
    currentPage: 1,
    to: pageSize,
  });

  const products = allProducts.slice(pagination.from, pagination.to);

  useEffect(() => {
    if (allProducts.length === 0) dispatch(getProduct());
    setPagination({
      ...pagination,
      count: allProducts.length,
      from: 0,
      to: pageSize,
      currentPage: 1,
    });
    console.log(pagination.from);
    console.log(pagination.to);
  }, [dispatch, allProducts.length]);

  return (
    <>
      <Nav />
      <Box
        sx={{
          width: "100%",
          height: "auto",
          backgroundImage: `url(${Image})`,
          //borderRadius: 50
        }}
      />
      <img
        src={home}
        style={{ width: "100%", height: "100%", marginTop: "-1rem" }}
      />
      <Filters />
      <Typography
        variant="h1"
        component="h2"
        sx={{
          width: 2401,
          height: 185,
          position: "absolute",
          left: -359,
          top: 711,
          fontFamily: "Roboto",
          fontStyle: "italic",
          fontWeight: 900,
          fontSize: 140,
          lineHeight: 24,
          display: "flex",
          alignItems: "center",
          textAlign: "center",
          letterSpacing: 0.15,
          color: "#40F99B",
        }}
      >
        {/* Sports Apparel · Footwear · */}
      </Typography>
      <Pagination
        products={products}
        pagination={pagination}
        setPagination={setPagination}
      />
      <div id="scrollDiv"></div>
      <Container maxWidth="md">
        <Box
          sx={{
            margin: 1,
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
          }}
        >
          {products?.length > 0 &&
            products.map((e) => (
              <CardProduct
                key={e.id}
                title={e.title[0].toUpperCase() + e.title.substring(1)}
                sport={e.sport}
                Image={e.Image || e.image}
                id={e.id}
                price={e.price}
              />
            ))}
        </Box>
      </Container>
      
    </>
  );
}
