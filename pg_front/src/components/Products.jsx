import { useSelector, useDispatch } from "react-redux";
import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import CardProduct from "./CreateProduct";
import { getProduct, cleanTrails } from "../redux/action";
import Nav from "./Nav";
import Filters from "./Filters";
import Pagination from "./Pagination";
import p from "./Products.module.css";

export default function Products() {
  const allProducts = useSelector((state) => state.products);
  const dispatch = useDispatch();

  const pageSize = 21;

  const [pagination, setPagination] = useState({
    count: 0,
    from: 0,
    currentPage: 1,
    to: pageSize,
  });

  const products = allProducts.slice(pagination.from, pagination.to);

  useEffect(() => {
    if(allProducts.length === 0) {
    dispatch(getProduct());
    }
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

  return (
    <div>
      <Nav />
      <Filters className={p.filters} />
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
                stock={e.stock}
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
                onClick={() => {
                  // dispatch(getProduct());
                  // dispatch(cleanTrails())
                  location.reload();
                }}
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
      <Pagination
        products={products}
        pagination={pagination}
        setPagination={setPagination}
      />
    </div>
  );
}
