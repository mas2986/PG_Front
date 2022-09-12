import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import Swal from "sweetalert2";
import Button from "@mui/material/Button";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import f from "./Formulario.module.css";
import Nav2 from "./Nav2.jsx";
import { Link } from "react-router-dom";

function validateForm(input) {
  const errors = {};
  if (!input.name) {
    errors.name = "Please Enter Your Name";
  }
  if (!input.apellido) {
    errors.apellido = "Please Enter Your Last Name";
  }
  if (!input.calle) {
    errors.calle = "Please Enter Your Street Address";
  }
  if (!input.numero) {
    errors.numero = "Please Enter Your Street Number";
  }
  if (!input.provincia) {
    errors.provincia = "Please Enter The Province";
  }
  if (!input.localidad) {
    errors.localidad = "Please Enter The Name Of Your City";
  }
  if (!input.telefono) {
    errors.telefono = "Please Enter Your Phone Number";
  }
  if (!input.email) {
    errors.email = "Please Enter Your Email Address";
  }
  if (!input.cp) {
    errors.cp = "Please Enter Your Postal Code";
  }

  return errors;
}

export default function FormPropsTextFields() {
  const [checked, setChecked] = React.useState(true);
  // const [leyenda, setLeyenda] = React.useState("");
  // const [errorTexto, setErrorTexto] = React.useState(false);
  const [errors, setErrors] = React.useState({});
  const url = useSelector((state) => state.url);
  const history = useHistory();

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  const handleButton = (event) => {
    // Swal.fire(
    //   "¡Your payment was successful!",
    //   "You will receive an email with your purchase information shortly."
    // );
    // Swal.fire("Coming Soon!!");
    window.location.replace(url)
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

  function stateInput(e) {
    setTexto({
      //Al ser un objeto debemos pasarle el obj y no solo los inputs
      ...texto,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validateForm({
        ...texto,
        [e.target.name]: e.target.value,
      })
    );
  }

  return (
    <div>
      <Nav2 />
      <center>
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "25ch" },
            width: 500,
            maxWidth: "100%",
            borderRadius: "20px",
            outline: "solid",

            //   max-width: 400px;
            //   background-color: #b1acac;
            //   margin:  auto;
          }}
          noValidate
          autoComplete="off"
        >
          <center>
            <h2>PURCHASE INFORMATION</h2>
          </center>
          <div>
            <div>
              <TextField
                onChange={(e) => {
                  stateInput(e);
                }}
                label="Name"
                helperText={
                  errors.name && <p className={f.colour}>{errors.name}</p>
                }
                name="name"
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
            <TextField
              onChange={(e) => {
                stateInput(e);
              }}
              required
              id="outlined-required"
              label="Phone Number"
              helperText={
                errors.telefono && <p className={f.colour}>{errors.telefono}</p>
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
            <TextField
              id="outlined-required"
              label="ID"
              //      defaultValue="Hello World"
            />
          </div>
          <Checkbox
            defaultChecked
            color="primary"
            inputProps={{ "aria-label": "secondary checkbox" }}
            sx={{ visibility: "hidden" }}
          />
          {errors.name ||
          errors.apellido ||
          errors.calle ||
          errors.numero ||
          errors.provincia ||
          errors.localidad ||
          errors.telefono ||
          errors.email ? (
            <h3 className={f.colour}>MANDATORY FIELDS MISSING</h3>
          ) : (
            <Button
              variant="contained"
              color="primary"
              className="btn-form"
              onClick={(e) => handleButton(e)}
              disableElevation
            >
              PROCEED TO CHECKOUT
            </Button>
          )}
        </Box>
        <div className="btn-form">
          <Link to="/" style={{ TextDecoration: "none" }}>
            <Button
              // href="/"
              variant="contained"
              className="btn-form"
              color="primary"
            >
              HOME
            </Button>
          </Link>
        </div>
      </center>
    </div>
  );
}
