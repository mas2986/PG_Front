import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import Swal from "sweetalert2";
import Button from "@mui/material/Button";
import { useHistory } from "react-router-dom";
import f from "./Formulario.module.css";
import Nav2 from "./Nav2.jsx";

function validateForm(input) {
  const errors = {};
  if (!input.name) {
    errors.name = "¿Cómo es tu nombre?";
  }
  if (!input.apellido) {
    errors.apellido = "¿Cómo es tu apellido?";
  }
  if (!input.calle) {
    errors.calle = "¿Cual es tu domicilio?";
  }
  if (!input.numero) {
    errors.numero = "¿Cual es el número?";
  }
  if (!input.provincia) {
    errors.provincia = "¡Aclará tu provincia!";
  }
  if (!input.localidad) {
    errors.localidad = "¡La localidad es obligatoria!";
  }
  if (!input.telefono) {
    errors.telefono = "¿Un teléfono donde ubicarte?";
  }
  if (!input.email) {
    errors.email = "¡Tu email es importante!";
  }
  if (!input.cp) {
    errors.cp = "¡Completá tu Código Postal!";
  }

  return errors;
}

export default function FormPropsTextFields() {
  const [checked, setChecked] = React.useState(true);
  // const [leyenda, setLeyenda] = React.useState("");
  // const [errorTexto, setErrorTexto] = React.useState(false);
  const [errors, setErrors] = React.useState({});
  const history = useHistory();

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  const handleButton = (event) => {
    Swal.fire(
      "¡Your payment was successful!",
      "You will receive an email with your purchase information shortly."
    );
    history.push("/home");
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
            <h2>INFORMACIÓN DE COMPRA</h2>
          </center>
          <div>
            <div>
              <TextField
                onChange={(e) => {
                  stateInput(e);
                }}
                label="Nombre"
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
              label="Apellido"
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
              label="Calle"
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
              label="Número"
              helperText={
                errors.numero && <p className={f.colour}>{errors.numero}</p>
              }
              name="numero"
              value={texto.numero}
              //   defaultValue="Hello World"
            />
            <TextField
              id="outlined-required"
              label="Piso"
              //   defaultValue="Hello World"
            />
            <TextField
              id="outlined-required"
              label="Departamento"
              type="number"
              //   defaultValue="Hello World"
            />
            <TextField
              onChange={(e) => {
                stateInput(e);
              }}
              required
              id="outlined-required"
              label="Código Postal"
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
              label="Provincia"
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
              label="Localidad"
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
              <h2>INFORMACIÓN DE CONTACTO</h2>
            </center>
            <TextField
              onChange={(e) => {
                stateInput(e);
              }}
              required
              id="outlined-required"
              label="Teléfono"
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
              label="Correo electrónico"
              helperText={
                errors.email && <p className={f.colour}>{errors.email}</p>
              }
              name="email"
              value={texto.email}
              //      defaultValue="Hello World"
            />
            <TextField
              id="outlined-required"
              label="DNI"
              //      defaultValue="Hello World"
            />
          </div>
          <Checkbox
            defaultChecked
            color="primary"
            inputProps={{ "aria-label": "secondary checkbox" }}
          />
          {errors.name ||
          errors.apellido ||
          errors.calle ||
          errors.numero ||
          errors.provincia ||
          errors.localidad ||
          errors.telefono ||
          errors.email ? (
            <h3 className={f.colour}>FALTAN CAMPOS OBLIGATORIOS</h3>
          ) : (
            <Button
              variant="contained"
              color="primary"
              className="btn-form"
              onClick={(e) => handleButton(e)}
              disableElevation
            >
              CONTINUAR CON EL PAGO
            </Button>
          )}
        </Box>
        <div className="btn-form">
          <Button
            href="/home"
            variant="contained"
            className="btn-form"
            color="primary"
          >
            BACK HOME
          </Button>
        </div>
      </center>
    </div>
  );
}
