import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import CardProduct from "./CreateProduct";
import { getProduct } from "../redux/action";
import Nav from "./Nav";
import Filters from "./Filters";
import Image from "../asset/home.png";
import Pagination from "./Pagination";
import home from "../asset/home.png";
import Section from "./Section";
import h from "./Home.module.css";

import CarouselBrands from "./CarouselBrands";

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
    console.log(pagination.from);
    console.log(pagination.to);
  }, [allProducts.length]);



  return (
    <div>
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
        style={{
          width: "100vw",
          height: "100%",
          marginTop: "-1rem",
          marginBottom: "1rem",
        }}
      />
      <CarouselBrands />
      <center><Section/></center>
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
          {products?.length ? (
            products.map((e) => (
              <CardProduct
                key={e.id}
                title={e.title[0].toUpperCase() + e.title.substring(1)}
                sport={e.sport}
                Image={e.Image || e.image}
                id={e.id}
                price={e.price}
              />
            ))
          ) : (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                margin: "10rem 0 10rem 2rem",
              }}
            >
              <Typography
                variant="h4"
                sx={{ whiteSpace: "nowrap", margin: "5rem 0 2rem 0" }}
              >
                No products were found matching your selection
              </Typography>{" "}
              <Button
                color="primary"
                onClick={() => dispatch(getProduct())}
                sx={{
                  display: "block",
                  margin: "5rem 0 2rem 0",
                  padding: "0.5rem 1rem",
                  fontSize: "1rem",
                  border: "1px solid #000",
                }}
              >
                Refresh
              </Button>
            </Box>
          )}
        </Box>
      </Container>
    </div>
  );
}
