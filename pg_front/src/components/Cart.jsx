import React, { useState } from "react";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import n from "./Nav.module.css";
import { Box } from "@mui/system";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { useSelector } from "react-redux";
import { Typography } from "@mui/material";

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
        <Box
          sx={{
            border: "1px solid #000",
            borderRadius: "3px",
            marginTop: "12rem",
            padding: "0 2.5rem 3rem 2.5rem",
            position: "absolute",
            background: "#fff",
          }}
        >
          <Box display="flex">
            <Typography flexGrow={1} color="primary">
              Items
            </Typography>
            <Typography color="primary">Price</Typography>
          </Box>
          {items.map((i) => {
            <ul style={{ color: "#000" }}>
              <li style={{ color: "black" }}>{i.title}HOllaaa</li>
            </ul>;
          })}
        </Box>
        // <Box className={n["cart-container"]}>
        //   {items.length > 0 &&
        //     items.map((i) => {
        //       <Box sx={{ position: "relative", top: "50%" }}>
        //         <ul>
        //           <li>{i.title}</li>
        //           <li>{i.price}</li>
        //         </ul>
        //       </Box>;
        //     })}
        // </Box>
      )}
    </>
  );
}

export default Cart;
