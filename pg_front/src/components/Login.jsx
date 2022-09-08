import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useAuth0 } from "@auth0/auth0-react"
import { useDispatch, useSelector } from "react-redux";
import { signUp } from "../redux/action";
import LoginAuth0 from "./LoginAuth0";

function validate(input) {
  let errors = {};
  console.log("En funcion validate");
  let regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  if (!regexEmail.test(input.email)) errors.email = "Invalid email";

  console.log(errors);
  return errors;
}

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Athens
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function SignUp() {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const { isAuthenticated } = useAuth0();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const history = useHistory();
  const handleChange = (e) => {
    e.preventDefault();
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    let errorsValidate = validate({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(() => errorsValidate);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    if (input.email && input.password) {
      dispatch(signUp(input));
      // if(error!==''){
      // }
      //return history.push('/')
    } else {
      Swal.fire({
        title: "Error!",
        text: "Complete password and email",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  if (user !== {}) {
    if (user.rol === "admin") return history.push("/admin");
    if (user.rol === "user") return history.push("/");
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  value={input.email}
                  name="email"
                  onChange={handleChange}
                  autoComplete="email"
                />
                {errors.email ? (
                  <Alert severity="error">{errors.email}</Alert>
                ) : null}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  value={input.password}
                  onChange={handleChange}
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
            </Grid>
            <Button
              //href = '/home'
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 2, mb: 0 }}
            >
              Login
            </Button>
            <Button
              //href = '/home'
              type="submit"
              fullWidth
              variant="contained"
              href="/user"
              sx={{ mt: 1, mb: 2 }}
            >
              Register
            </Button>
            <Box display="flex" sx={{ justifyContent: "center" }}>
            <center>{ isAuthenticated ? <LoginAuth0/> : <LoginAuth0/>  }</center>
            </Box>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
