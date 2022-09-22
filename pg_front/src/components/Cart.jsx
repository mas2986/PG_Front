import React, { useEffect, useState, useRef } from "react";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import n from "./Nav.module.css";
import { Box } from "@mui/system";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { useDispatch, useSelector } from "react-redux";
import { Button, Typography } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import FormPropsTextFields from "./Formulario";
import { Link, useHistory } from "react-router-dom";
import OutsideClickHandler from "react-outside-click-handler";
import {
  deleteFromCart,
  deleteAllFromCart,
  sendItemNum,
  mercadoPago,
  removeDupsCart,
  fetchCartItems,
} from "../redux/action";

//custom style for shopping cart icon
const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 5,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));

function Cart() {
  //local state for toggling cart items list
  const [cartDisplay, setCartDisplay] = useState(false);
  //local state for forcing a re-render of the price
  const [qty, setQty] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  let official = 149;

  //bring in the global state.cartItems
  let items = useSelector((state) => state.cartItems); // [{},{}]

  let detail = useSelector((state) => state.detail);
  //if global state is empty, look for any saved items local storage, if there're none, set items as an empty string

  if (items.length == 0) {
    items =
      JSON.parse(localStorage.getItem("items")) == null
        ? []
        : JSON.parse(localStorage.getItem("items"));
  }

  let totalPrice = 0;
  for (let i = 0; i < items.length; i++) {
    totalPrice += items[i].price;
  }

  function handlePay(e) {
    e.preventDefault();
    dispatch(mercadoPago({ price: totalPrice * official }));

    history.push("/entrega");
    localStorage.setItem("itemsForm", JSON.stringify(items));
  }

  function toggle() {
    setCartDisplay((prevState) => !prevState);
  }

  //keep cart visible while mouse is hovering over it
  // function keepIn() {
  //   setCartDisplay(true);
  // }

  //deleting an item from a specific index of the items array. An action is dispatched to the reducer and logic is setup there.
  function deleteItem(idxRemoval) {
    dispatch(deleteFromCart(idxRemoval));
    if (items.length == 1) {
      localStorage.removeItem("items");
    }
  }

  //setting the items array as an empty array (removing all items from cart).
  function deleteAll() {
    dispatch(deleteAllFromCart());
    localStorage.removeItem("items");
  }

  //saving items in local storage
  useEffect(() => {
    if (items.length) {
      localStorage.setItem("items", JSON.stringify(items));
    }
  }, [items]);

  return (
    <>
      <div className={n["shopping-cart"]}>
        <StyledBadge badgeContent={items.length} color="error">
          <ShoppingCartOutlinedIcon
            sx={{ fontSize: "29px", color: "#888787" }}
            // onMouseEnter={keepIn}
            // onMouseOut={toggle}
            onClick={toggle}
            // ref={ref}
          />
        </StyledBadge>
      </div>
      <OutsideClickHandler
        onOutsideClick={() => {
          setCartDisplay(false);
        }}
      >
        {cartDisplay && (
          <Box
            className={n["cart-container"]}
            // onMouseEnter={keepIn}
            // onMouseLeave={toggle}
            sx={{ position: "absolute", top: "1rem", right: "2rem" }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              {items.length ? (
                <Box
                  display="flex"
                  sx={{ alignItems: "center", minWidth: "20rem" }}
                >
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
                      maxHeight: "22rem",
                      overflowY: "scroll",
                      overflowX: "hidden",
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
                            height: "16.5rem",
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
                                sx={{
                                  fontStyle: "italic",
                                  overflow: "hidden",
                                  whiteSpace: "nowrap",
                                  textOverflow: "ellipsis",
                                }}
                              >
                                {i.description}
                              </Typography>
                              <select
                                value={i.qty}
                                //declaring the handler fn here as i need to use the map method current item (i)
                                onChange={(e) => {
                                  i.qty = e.target.value;
                                  dispatch(sendItemNum(e.target.value));
                                  //changing state to force re render of price
                                  setQty((prev) => prev + 1);
                                  //saving item with updated qty
                                  localStorage.setItem(
                                    "items",
                                    JSON.stringify(items)
                                  );
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
                              sx={{
                                margin: "5rem 3rem 0 0",
                                fontSize: "1.2rem",
                              }}
                            >
                              ${i.price * i.qty || detail?.price}.00
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
                      ) ||
                        items.reduce(
                          (prev, curr) => prev + detail?.price * curr.qty,
                          0
                        )}
                      .00
                    </Typography>
                  </Box>
                  <Box display="flex" sx={{ justifyContent: "center" }}>
                    <Button
                      onClick={(e) => handlePay(e)}
                      sx={{
                        margin: "0.5rem",
                        border: "1px solid #000",
                      }}
                    >
                      Proceed to checkout
                    </Button>
                  </Box>
                </Box>
              ) : (
                <Typography
                  sx={{
                    whiteSpace: "nowrap",
                    width: "12rem",
                    marginRight: "5rem",
                    marginTop: "1rem",
                  }}
                >
                  There are no items in the cart
                </Typography>
              )}
            </Box>
          </Box>
        )}
      </OutsideClickHandler>
    </>
  );
}

export default Cart;
