import React, { useEffect, useState } from "react";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import n from "./Nav.module.css";
import { Box } from "@mui/system";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { useDispatch, useSelector } from "react-redux";
import { Button, Typography } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Link } from "react-router-dom";
import {
  deleteFromCart,
  deleteAllFromCart,
  sendItemNum,
  removeDupsCart,
} from "../redux/action";

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
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();

  function toggle() {
    setCartDisplay((prevState) => !prevState);
  }

  function keepIn() {
    setCartDisplay(true);
  }

  function deleteItem(idxRemoval) {
    console.log(idxRemoval);
    dispatch(deleteFromCart(idxRemoval));
  }

  function deleteAll() {
    dispatch(deleteAllFromCart());
  }

  return (
    <>
      <div className={n["shopping-cart"]}>
        <StyledBadge badgeContent={items.length} color="error">
          <ShoppingCartOutlinedIcon
            sx={{ fontSize: "29px", color: "#888787" }}
            onMouseEnter={keepIn}
            // onMouseOut={toggle}
          />
        </StyledBadge>
      </div>
      {cartDisplay && (
        <Box
          className={n["cart-container"]}
          onMouseEnter={keepIn}
          onMouseLeave={toggle}
          sx={{ marginRight: "4rem" }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            {items.length ? (
              <Box display="flex" sx={{ alignItems: "center" }}>
                <Typography
                  align="left"
                  variant="h5"
                  color="primary"
                  flexGrow={1}
                  // sx={{ marginBottom: "0.5rem" }}
                >
                  My Cart
                </Typography>
                <DeleteForeverIcon
                  sx={{ color: "#a52a2a", fontSize: "3rem" }}
                  className={n["cart-delete-all-icon"]}
                  onClick={deleteAll}
                />
              </Box>
            ) : (
              <Typography
                align="left"
                variant="h5"
                color="primary"
                flexGrow={1}
                // sx={{ marginBottom: "0.5rem" }}
              >
                My Cart
              </Typography>
            )}
            {items.length ? (
              <Box>
                <Box
                  sx={{
                    maxHeight: "30rem",
                    overflowY: "scroll",
                    marginBottom: "0.5rem",
                  }}
                >
                  {items.map((i, idx) => {
                    return (
                      <Box
                        key={idx}
                        sx={{
                          padding: "1rem",
                          width: "20rem",
                          height: "14.5rem",
                          margin: "1rem 0",
                          border: "1px solid black",
                          borderRadius: "3px",
                          background: "#fff",
                        }}
                      >
                        <Box display="flex">
                          <Typography
                            variant="h7"
                            color="primary"
                            flexGrow={1}
                            sx={{ fontWeight: 700, marginBottom: "0.5rem" }}
                          >
                            {i.title[0].toUpperCase() + i.title.substring(1)}
                          </Typography>
                          <DeleteOutlineIcon
                            sx={{ color: "#a52a2a" }}
                            className={n["cart-delete-icon"]}
                            onClick={() => deleteItem(idx)}
                          />
                        </Box>
                        <Box sx={{ display: "flex", flexDirection: "row" }}>
                          <Box flexGrow={1}>
                            <Link to={`/detail/${i.id}`}>
                              <img
                                src={i.image}
                                width="100px"
                                height="80px"
                                style={{ marginBottom: "0.5rem" }}
                              />
                            </Link>
                            <Typography sx={{ textDecoration: "underline" }}>
                              {i.brand}
                            </Typography>
                            <Typography
                              sx={{ fontStyle: "italic", whiteSpace: "nowrap" }}
                            >
                              {i.description}
                            </Typography>
                            <select
                              value={i.qty}
                              onChange={(e) => {
                                i.qty = e.target.value;
                                dispatch(sendItemNum(e.target.value));
                                setQty((prev) => prev + 1);
                              }}
                            >
                              <option value={1}>1</option>
                              <option value={2}>2</option>
                              <option value={3}>3</option>
                              <option value={4}>4</option>
                              <option value={5}>5</option>
                            </select>
                          </Box>
                          <Typography
                            sx={{ margin: "5rem 3rem 0 0", fontSize: "1.2rem" }}
                          >
                            ${i.price * i.qty}.00
                          </Typography>
                        </Box>
                      </Box>
                    );
                  })}
                </Box>
                <Box display="flex">
                  <Typography variant="h6" color="primary" flexGrow={1}>
                    Total
                  </Typography>
                  <Typography variant="h6" color="primary">
                    $
                    {items.reduce(
                      (prev, curr) => prev + curr.price * curr.qty,
                      0
                    )}
                    .00
                  </Typography>
                </Box>
                <Box display="flex" sx={{ justifyContent: "center" }}>
                  <Button
                    // href="/entrega"
                    sx={{ margin: "0.5rem", border: "1px solid #000" }}
                  >
                    Checkout
                  </Button>
                </Box>
              </Box>
            ) : (
              <Typography>There are no items in the cart</Typography>
            )}
          </Box>
        </Box>
      )}
    </>
  );
}

export default Cart;
