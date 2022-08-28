import React, { useEffect } from "react";
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
import "../Style/Home.css";
import Footer from "./Footer";

export default function Home() {
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   if (products.length === 0) dispatch(getProduct(products));
  // }, [dispatch]);

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
      {/* <Filters/>  */}
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
      <div id="scrollDiv"></div>
      <Pagination />
      <Container maxWidth="md" sx={{ margin: 2 }}>
        <Box
          sx={{
            margin: 1,
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
          }}
        >
          {products.length > 0 &&
            products.map((e) => (
              <CardProduct
                key={e.id}
                title={e.title}
                sport={e.sport}
                Image={e.Image || e.image}
              />
            ))}
        </Box>
      </Container>
      <Footer />
    </>
  );
}
