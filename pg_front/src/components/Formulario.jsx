import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardMedia from "@mui/material/CardMedia";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import Swal from "sweetalert2";
import Button from "@mui/material/Button";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import f from "./Formulario.module.css";
import Nav2 from "./Nav2.jsx";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import { createOrder } from "../redux/action";

import { TextsmsOutlined } from "@mui/icons-material";

import { useAuth0 } from "@auth0/auth0-react";

export default function FormPropsTextFields({ props }) {
  const [checked, setChecked] = React.useState(true);
  const userAuth0 = useAuth0().user;
  let history = useHistory();

  // const [leyenda, setLeyenda] = React.useState("");
  // const [errorTexto, setErrorTexto] = React.useState(false);
  const [errors, setErrors] = React.useState({});
  const [totalPrice, setTotalPrice] = React.useState(0);
  const user = useSelector((state) => state.user);
  let items = useSelector((state) => state.cartItems);
  console.log(items);
  const user1 = useSelector((state) => state.user);
  const url = useSelector((state) => state.url);
  const dispatch = useDispatch();
  console.log(user1);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  const [texto, setTexto] = React.useState({
    celNumber: "",
    email: "",
  });

  let totalItems = 0;
  for (let i = 0; i < items.length; i++) {
    totalItems += items[i].qty;
    // totalPrice += items[i].price;
  }
  const productsId = items.map((p) => p.id);
  console.log(productsId);

  const [order, setOrder] = React.useState({
    productId: productsId,
    idProduct: productsId,
    quantity: totalItems,
    orderStatus: "created",
    email: user1.email,
    userId: user1.id,
  });

  // console.log(order);

  const handleButton = async (event) => {
    if (!texto.celNumber || texto.celNumber.length < 5) {
      return Swal.fire({
        title: "Check your cell phone!",
        text: "It must contain at least 5 characters.",
        icon: "error",
      });
    }
    if (!texto.email || !texto.email.includes("@") || texto.email.length < 5) {
      return Swal.fire({
        title: "Check your mail!",
        text: "Enter a valid email containing at least 8 characters.",
        icon: "error",
      });
    }
    if (typeof totalPrice !== "number") order.totalPrice = totalPrice[0];
    else order.totalPrice = totalPrice;
    dispatch(createOrder(order, texto));
    setTimeout(function () {
      localStorage.removeItem(`items`);
      window.location.replace(url);
    }, 1000);
  };

  function stateInput(e) {
    setTexto({
      //Al ser un objeto debemos pasarle el obj y no solo los inputs
      ...texto,
      [e.target.name]: e.target.value,
    });
  }

  if (items.length == 0) {
    items =
      JSON.parse(localStorage.getItem("items")) == null
        ? []
        : JSON.parse(localStorage.getItem("items"));
  }

  useEffect(() => {
    if (items.length > 0) {
      let prices = [];
      let priceEach = items.map((i) => [...prices, Number(i.qty) * i.price]);
      let total = priceEach.reduce((a, b) => Number(a) + Number(b));
      setTotalPrice(total);
    } else {
      setTotalPrice(0);
    }
  }, []);

  return (
    <div className={f.form}>
      <Nav2 />
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
        }}
      >
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "25ch", height: "6ch" },
            width: "50vw",
            maxWidth: "100%",
            // border: "1px solid #000",

            //   max-width: 400px;
            //   background-color: #b1acac;
            //   margin:  auto;
          }}
          noValidate
          autoComplete="off"
        >
          <center className={f.form}>
            <h2>CONTACT INFORMATION</h2>
          </center>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "20% 20%",
              // justifyContent: "space-evenly",
              gridGap: "1rem 10rem",
              marginLeft: "3rem",
            }}
          >
            <TextField
              onChange={(e) => {
                stateInput(e);
              }}
              required
              id="outlined-required"
              label="Phone Number"
              helperText={
                errors.celNumber && (
                  <p className={f.colour}>{errors.celNumber}</p>
                )
              }
              name="celNumber"
              value={texto.celNumber}
              //      defaultValue="Hello World"
            />
            <TextField
              onChange={(e) => {
                stateInput(e);
              }}
              required
              id="outlined-required"
              label="Email"
              helperText={
                errors.email && <p className={f.colour}>{errors.email}</p>
              }
              name="email"
              value={texto.email}
              //      defaultValue="Hello World"
            />
          </div>
          {errors.celNumber || errors.email ? (
            <h3 className={f.colour}>MANDATORY FIELDS MISSING</h3>
          ) : Object.keys(user).length > 0 ? (
            <Button
              variant="contained"
              color="primary"
              className="btn-form"
              onClick={(e) => handleButton(e)}
              disableElevation
              sx={{
                width: "30rem",
                height: "3rem",
                // marginRigth: "12px",
                marginTop: "2rem",
              }}
            >
              BUY
            </Button>
          ) : (
            <Link to="/login">
              <Button
                variant="contained"
                color="primary"
                className="btn-form"
                onClick={(e) =>
                  Swal.fire({
                    title: "You are not logged in",
                    text: "Please log in or register to complete your purchase",
                  })
                }
                disableElevation
                sx={{
                  width: "34.5rem",
                  height: "4rem",
                  marginLeft: "7%",
                  marginTop: "4rem",
                }}
              >
                BUY
              </Button>
            </Link>
          )}
          {/* <TextField
              id="outlined-required"
              label="ID"
              //      defaultValue="Hello World"
            /> */}
          <div className="btn-form">
            <Link to="/">
              <Button
                // href="/"
                variant="contained"
                className="btn-form"
                color="primary"
                sx={{
                  width: "34.5rem",
                  height: "3rem",
                  marginLeft: "6%",
                  marginTop: "1.5rem",
                }}
              >
                CANCEL
              </Button>
            </Link>
          </div>

          <Checkbox
            defaultChecked
            color="primary"
            inputProps={{ "aria-label": "secondary checkbox" }}
            sx={{ visibility: "hidden" }}
          />
        </Box>
        <Box>
          <Typography
            variant="h4"
            color="primary"
            align="center"
            sx={{ marginTop: "1rem" }}
          >
            Your Order
          </Typography>
          <Box
            sx={{
              marginTop: "2rem",
              marginBottom: "1rem",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              maxHeight: "100%",
            }}
          >
            {items.map((i) => {
              return (
                <Box sx={{ marginBottom: "2rem" }}>
                  <Card
                    sx={{
                      maxHeight: "11rem",
                      display: "flex",
                      flexDirection: "row-reverse",
                      maxWidth: "35rem",
                      zIndex: "-1",
                    }}
                    onClick={() => history.push(`/detail/${i.id}`)}
                    className={f.cardMedia}
                  >
                    <CardMedia
                      component="img"
                      width="1rem"
                      height="180"
                      image={i.image}
                      alt={i.title[0].toUpperCase() + i.title.substring(1)}
                      sx={{ position: "relative" }}
                    />

                    <CardContent sx={{ width: "30rem" }}>
                      <Typography gutterBottom variant="h6" component="div">
                        {i.title}
                      </Typography>
                      <Typography>${i.price * i.qty}.00</Typography>
                      <Typography
                        flexGrow={1}
                        variant="body2"
                        color="text.secondary"
                        sx={{ marginTop: "0.5rem" }}
                      >
                        Number of items: {i.qty}
                      </Typography>
                    </CardContent>
                  </Card>
                </Box>
              );
            })}
          </Box>

          {totalPrice > 0 ? (
            <Box
              sx={{
                border: "1px solid #000",
                padding: "1rem",
                borderRadius: "3px",
                margin: "1rem 0 5rem 0",
              }}
            >
              <Typography variant="h4" color="primary" textAlign="center">
                Total: ${totalPrice}.00
              </Typography>
            </Box>
          ) : (
            <Box
              sx={{
                border: "1px solid #000",
                padding: "1rem",
                margin: "1rem 0 2rem 0",
              }}
            >
              <Typography variant="h5" color="primary" textAlign="center">
                No Items Selected
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
    </div>
  );
}
