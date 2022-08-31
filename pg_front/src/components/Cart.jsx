import React, { useState } from "react";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import n from "./Nav.module.css";
import { Box } from "@mui/system";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { useSelector } from "react-redux";
import { Button, Typography } from "@mui/material";
import { green } from "@mui/material/colors";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 5,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));
function Cart() {
  const items = useSelector((state) => state.cartItems);
  const [cartDisplay, setCartDisplay] = useState(false);

  function toggle() {
    setCartDisplay((prevState) => !prevState);
  }

  return (
    <>
      <div className={n["shopping-cart"]}>
        <StyledBadge badgeContent={items.length} color="error">
          <ShoppingCartOutlinedIcon
            sx={{ fontSize: "29px", color: "#888787" }}
            onClick={toggle}
          />
        </StyledBadge>
      </div>
      {cartDisplay && (
        <Box className={n["cart-container"]}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography align="left" variant="h5" color="primary">
              My Cart
            </Typography>
            <Box>
              {items.map((i) => {
                return (
                  <Box
                    sx={{
                      padding: "2rem 3rem",
                      margin: "1rem 0",
                      border: "1px solid black",
                    }}
                  >
                    <Box display="flex">
                      <Typography variant="h7" color="primary">
                        {i.title}
                      </Typography>
                      <DeleteOutlineIcon sx={{ color: "red" }} />
                    </Box>
                    <Box sx={{ display: "flex", flexDirection: "row" }}>
                      <Box>
                        <img src={i.image} width="60px" height="80px" />
                        <Typography>{i.brand}</Typography>
                        <Typography>{i.description}</Typography>
                        <select>
                          <option>1</option>
                          <option>2</option>
                          <option>3</option>
                          <option>4</option>
                          <option>5</option>
                        </select>
                      </Box>
                      <Typography sx={{ margin: "5rem 0 0 0" }}>
                        ${i.price}.00
                      </Typography>
                    </Box>
                  </Box>
                );
              })}
              <Box display="flex">
                <Typography variant="h6" color="primary" flexGrow={1}>
                  Total
                </Typography>
                <Typography variant="h6" color="primary">
                  ${items.reduce((prev, curr) => prev + curr.price, 0)}
                </Typography>
              </Box>
            </Box>
          </Box>
          {/* <Typography variant="h6" color="primary">
              Item
            </Typography>
            <Typography variant="h6" color="primary">
              Price
            </Typography>
            <ul style={{ paddingInlineStart: 0 }}>
              {items.map((i) => {
                return (
                  <Box display="flex" sx={{ flexDirection: "row" }}>
                    <li
                      style={{
                        listStyle: "none",
                        padding: "0 1rem 1rem 0",
                      }}
                    >
                      {i.title[0].toUpperCase() + i.title.substring(1)}
                    </li>
                    <Box display="flex" sx={{ flexDirection: "column" }}>
                      <button className={n["cart-btn-add"]}>+</button>
                      <button className={n["cart-btn-sub"]}>-</button>
                    </Box>
                  </Box>
                );
              })}
            </ul>
            <ul style={{ paddingInlineStart: 0 }}>
              {items.map((i) => {
                return (
                  <li style={{ listStyle: "none", padding: "0 1rem 1rem 0" }}>
                    ${i.price}.00
                  </li>
                );
              })}
            </ul>
            <Typography variant="h6" color="primary">
              Total
            </Typography>
            <Typography>
              ${items.reduce((prev, curr) => prev + curr.price, 0)}.00
            </Typography>
            <Button>Checkout</Button>*/}
        </Box>
      )}
    </>
  );
}

export default Cart;
