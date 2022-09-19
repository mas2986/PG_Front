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
  // console.log(items);
  const user1 = useSelector((state) => state.user);
  const url = useSelector((state) => state.url);
  const dispatch = useDispatch();

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  const [texto, setTexto] = React.useState({
    name: "",
    apellido: "",
    calle: "",
    numero: "",
    provincia: "",
    localidad: "",
    telefono: "",
    email: "",
    cp: "",
  });

  let totalItems = 0;
  for (let i = 0; i < items.length; i++) {
    totalItems += items[i].qty;
    // totalPrice += items[i].price;
  }
  const productsId = items.map((p) => p.id);

  const [order, setOrder] = React.useState({
    productId: productsId,
    idProduct: productsId,
    quantity: totalItems,
    orderStatus: "created",
    totalPrice: totalPrice,
    email: user1.email,
    userId: user1.id,
  });

  // console.log(order);

  const handleButton = async (event) => {
    if (texto.name.length < 3 || texto.name.length > 10) {
      return Swal.fire({
        title: "Check the name!",
        text: "It must contain from 3 to 10 characters.",
        icon: "error",
      });
    }
    if (texto.apellido.length < 3) {
      return Swal.fire({
        title: "Check the lastname!",
        text: "The last name is required.",
        icon: "error",
      });
    }
    if (texto.calle.length < 3) {
      return Swal.fire({
        title: "Check the address!",
        text: "An address is required.",
        icon: "error",
      });
    }
    if (!texto.numero) {
      return Swal.fire({
        title: "Check the number!",
        text: "Number is required.",
        icon: "error",
      });
    }
    if (!texto.cp) {
      return Swal.fire({
        title: "Check the CP!",
        text: "Enter your zip code.",
        icon: "error",
      });
    }
    if (texto.provincia.length < 3) {
      return Swal.fire({
        title: "Check your province or state!",
        text: "Enter your province or state.",
        icon: "error",
      });
    }
    if (texto.localidad.length < 3) {
      return Swal.fire({ title: "Check your city!", icon: "error" });
    }
    if (!texto.telefono || texto.telefono.length < 5) {
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
    console.log(order);
    dispatch(createOrder(order));
    setTimeout(function () {
      console.log("Envié la or");
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
      setOrder({
        ...order,
        totalPrice: total,
      });
      // console.log("En if de useEffect", order);
    } else {
      setTotalPrice(0);
      console.log("En else de useEffect", totalPrice);
    }
  }, [items]);

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
            <h2>PURCHASE INFORMATION</h2>
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
            <div>
              <TextField
                onChange={(e) => {
                  stateInput(e);
                }}
                label="Name"
                helperText={"Máximo de caracteres 10."}
                name="name"
                type={"text"}
                value={texto.name}
              />
            </div>

            <TextField
              onChange={(e) => {
                stateInput(e);
              }}
              required
              helperText={
                errors.apellido && <p className={f.colour}>{errors.apellido}</p>
              }
              type="text"
              id="outlined-required"
              label="Last Name"
              name="apellido"
              value={texto.apellido}
              //   defaultValue="Hello World"
            />
            <TextField
              onChange={(e) => {
                stateInput(e);
              }}
              required
              helperText={
                errors.calle && <p className={f.colour}>{errors.calle}</p>
              }
              id="outlined-required"
              label="Street"
              name="calle"
              value={texto.calle}
              //   defaultValue="Hello World"
            />
            <TextField
              onChange={(e) => {
                stateInput(e);
              }}
              required
              id="outlined-required"
              label="Number"
              helperText={
                errors.numero && <p className={f.colour}>{errors.numero}</p>
              }
              name="numero"
              value={texto.numero}
              //   defaultValue="Hello World"
            />
            <TextField
              id="outlined-required"
              label="Floor"
              //   defaultValue="Hello World"
            />
            <TextField
              id="outlined-required"
              label="Apartment n°"
              type="number"
              //   defaultValue="Hello World"
            />
            <TextField
              onChange={(e) => {
                stateInput(e);
              }}
              required
              id="outlined-required"
              label="Postal Code"
              type="number"
              helperText={errors.cp && <p className={f.colour}>{errors.cp}</p>}
              name="cp"
              value={texto.cp}
              //   defaultValue="Hello World"
            />
            <TextField
              onChange={(e) => {
                stateInput(e);
              }}
              required
              id="outlined-required"
              label="Province"
              helperText={
                errors.provincia && (
                  <p className={f.colour}>{errors.provincia}</p>
                )
              }
              name="provincia"
              value={texto.provincia}
              //   defaultValue="Hello World"
            />
            <TextField
              onChange={(e) => {
                stateInput(e);
              }}
              required
              id="outlined-required"
              label="City"
              helperText={
                errors.localidad && (
                  <p className={f.colour}>{errors.localidad}</p>
                )
              }
              name="localidad"
              value={texto.localidad}
              //   defaultValue="Hello World"
            />
          </div>
          <div>
            <center>
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
                  errors.telefono && (
                    <p className={f.colour}>{errors.telefono}</p>
                  )
                }
                name="telefono"
                value={texto.telefono}
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
                    margin: "2rem 0 0 4rem",
                    // borderRadius: "50%",
                    height: "3rem",
                  }}
                >
                  HOME
                </Button>
              </Link>
            </div>
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
                      maxHeight: "10rem",
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
                      height="150"
                      image={i.image}
                      alt={i.title[0].toUpperCase() + i.title.substring(1)}
                      sx={{ position: "relative" }}
                    />

                    <CardContent sx={{ width: "30rem" }}>
                      <Typography gutterBottom variant="h5" component="div">
                        {i.title}
                      </Typography>
                      <Typography>${i.price * i.qty}.00</Typography>
                      <Typography
                        flexGrow={1}
                        variant="body2"
                        color="text.secondary"
                        sx={{ marginTop: "1.5rem" }}
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
            <Typography variant="h4" color="primary" textAlign="center">
              Total: ${totalPrice}.00
            </Typography>
          ) : (
            <Typography variant="h5" color="primary" textAlign="center">
              No Items Selected
            </Typography>
          )}
          {errors.name ||
          errors.apellido ||
          errors.calle ||
          errors.numero ||
          errors.provincia ||
          errors.localidad ||
          errors.telefono ||
          errors.email ? (
            <h3 className={f.colour}>MANDATORY FIELDS MISSING</h3>
          ) : Object.keys(user).length > 0 ? (
            <Button
              variant="contained"
              color="primary"
              className="btn-form"
              onClick={(e) => handleButton(e)}
              disableElevation
              sx={{
                width: "40rem",
                height: "3rem",
                // marginRigth: "12px",
                marginTop: "2rem",
                position: "absolute",
                zIndex: 99,
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
                  width: "40rem",
                  height: "3rem",
                  // marginRigth: "12px",
                  marginTop: "2rem",
                }}
              >
                BUY
              </Button>
            </Link>
          )}
        </Box>
      </Box>
    </div>
  );
}
