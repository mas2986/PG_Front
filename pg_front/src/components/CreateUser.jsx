import React from "react";
import { Grid, TextField, Box } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PasswordIcon from "@mui/icons-material/Password";
import MailIcon from "@mui/icons-material/Mail";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import VerifiedIcon from "@mui/icons-material/Verified";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import "../styles/CreateUser.css";
import Nav from "./Nav2";
import { createUser } from "../redux/action";
import logo from "../logo.png";
import Footer from "./Footer";

export default function CreateUser() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [texto, setTexto] = React.useState({
    name: "",
    lastName: "",
    email: "",
    image: "",
    password: "",
    passConfirmation: "",
  });

  function handleInput(e) {
    setTexto({
      //Al ser un objeto debemos pasarle el obj y no solo los inputs
      ...texto,
      [e.target.name]: e.target.value,
    });    
  }

  function handleChange(e) {
    e.preventDefault();
    if (
      texto.name.length === 0 ||
      texto.lastName.length === 0 ||
      texto.email.length === 0 ||
      texto.password.length === 0 ||
      texto.passConfirmation.length === 0
    ) {
      return Swal.fire({
        title: "¡All fields are required!",
        text: "Ups! We know how cumbersome this tends to be.",
        icon: "error",
      });
    }
    if (texto.password !== texto.passConfirmation)
      return Swal.fire({
        title: "¡Password and confirmation must match!",
        text: "Both fields must be strictly the same.",
        icon: "error",
      });
    if (texto.password.length !== texto.passConfirmation.length)
      return Swal.fire({
        title: "¡Password and confirmation must match!",
        text: "Both fields must be strictly the same.",
        icon: "error",
      });
    if (!texto.email.includes("@") && texto.email.length < 8) {
      return Swal.fire({
        title: "¡There was an error in the email!",
        text: "The email should be for example: ..@mail.com.ar",
        icon: "error",
      });
    }
    // Swal.fire("¡User created successfully!", "¡Thank you for visiting our website!"),    
    dispatch(createUser(texto));
    history.push("/");
  }

  const handleWidget = () => {    
    var myWidget = window.cloudinary.createUploadWidget(
      {
        cloudName: "athensimages",
        uploadPreset: "AthensImages",
      },
      (error, result) => {        
        if (!error && result && result.event === "success") {          
          setTexto({
            ...texto,
            image: result.info.url,
          });
        }
      }
    );
    myWidget.open();
  };

  return (
    <>
      {/* <Nav></Nav> */}

      <div className="body">
        <center>
          <h1>Register and live the Athens experience.</h1>

          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, width: "35ch" },
              width: 500,
              maxWidth: "100%",
              borderRadius: "5px",
              outline: "solid",

              //   max-width: 400px;
              //   background-color: #b1acac;
              //   margin:  auto;
            }}
            noValidate
            autoComplete="off"
          >
            <Grid container className="box">
              <Grid item md={20}>
                <br />
                <AccountCircleIcon />
                <TextField
                  onChange={(e) => {
                    handleInput(e);
                  }}
                  label="Name"
                  helperText="Enter your name."
                  name="name"
                  value={texto.name}
                />
                {texto.name ? (
                  <VerifiedIcon item xs={8} className="icon" />
                ) : (
                  <VerifiedIcon item xs={8} className="iconRed" />
                )}
              </Grid>
              <Grid item md={20}>
                <AccountCircleIcon />
                <TextField
                  onChange={(e) => {
                    handleInput(e);
                  }}
                  label="Lastname"
                  helperText="Enter your lastname."
                  name="lastName"
                  value={texto.lastName}
                />
                {texto.lastName ? (
                  <VerifiedIcon item xs={8} className="icon" />
                ) : (
                  <VerifiedIcon item xs={8} className="iconRed" />
                )}
              </Grid>
              <Grid item md={20}>
                <MailIcon />
                <TextField
                  onChange={(e) => {
                    handleInput(e);
                  }}
                  label="Email"
                  helperText={"Email should be for example: @email.com.ar"}
                  name="email"
                  value={texto.email}
                />
                {texto.email.includes("@") ? (
                  <VerifiedIcon item xs={8} className="icon" />
                ) : (
                  <VerifiedIcon item xs={8} className="iconRed" />
                )}
              </Grid>
              <Grid item md={20}>
                <AddAPhotoIcon onClick={handleWidget} />
                <TextField
                  disabled
                  label="Image"
                  name="image"
                  value={texto.image}
                  //error={!!errors.image}
                  //helperText={errors.image}
                  id="image"
                />
                {texto.image ? (
                  <VerifiedIcon item xs={8} className="icon" />
                ) : (
                  <VerifiedIcon item xs={8} className="iconRed" />
                )}
              </Grid>
              <Grid item md={12}>
                <PasswordIcon />
                <TextField
                  onChange={(e) => {
                    handleInput(e);
                  }}
                  label="Password"
                  helperText={"Enter your password."}
                  name="password"
                  type="password"
                  value={texto.password}
                />
                {texto.password ? (
                  <VerifiedIcon item xs={8} className="icon" />
                ) : (
                  <VerifiedIcon item xs={8} className="iconRed" />
                )}
              </Grid>
              <Grid item md={12}>
                <PasswordIcon />
                <TextField
                  onChange={(e) => {
                    handleInput(e);
                  }}
                  label="Confirm password"
                  helperText={"Confirm your password."}
                  type="password"
                  name="passConfirmation"
                  value={texto.passConfirmation}
                />
                {texto.passConfirmation &&
                texto.password === texto.passConfirmation ? (
                  <VerifiedIcon item xs={8} className="icon" />
                ) : (
                  <VerifiedIcon item xs={8} className="iconRed" />
                )}
              </Grid>
            </Grid>
            {/* <FormGroup className='checkbox'>
        <FormControlLabel size="small" control={<Checkbox
        {...label}
        sx={{ '& .MuiSvgIcon-root': { fontSize: 18, } }}
      />} label="I accept the Privacy Policies and Terms and Conditions"/>
        <FormControlLabel size="small" control={<Checkbox
        {...label}
        sx={{ '& .MuiSvgIcon-root': { fontSize: 18, } }}
      />} label="I want to receive emails of promotions and news"/>
    </FormGroup> */}
            <br />
            <button
              type="submit"
              className="btn-user"
              variant="contained"
              color="primary"
              onClick={(e) => {
                handleChange(e);
              }}
            >
              REGISTER{" "}
            </button>
            <img src={logo} alt="logo not found" />
            <center></center>
            <br />
          </Box>
        </center>
      </div>

      <Footer />
    </>
  );
}
