import React, { useState } from "react";
import { useHistory } from 'react-router-dom';
import Swal from "sweetalert2";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Alert from '@mui/material/Alert';
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Select from '@mui/material/Select';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { useDispatch, useSelector } from "react-redux";
import { signUp } from "../redux/action";

function validate(input){
    let errors = {};
    console.log('En funcion validate')
    console.log(input);
    let regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
    if (!regexEmail.test(input.email)) errors.email = 'Invalid email'

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
    title: "",
    brand:"",
    image:"",
    description:"",
    price:"",
    discount:"",
    status:"",
    stock:"",
    genre:"",
    sport:""
  });
  const [errors,setErrors] = useState({})

  const dispatch = useDispatch();
  const error = useSelector((state)=>state.errorLogin);
  const history = useHistory();

  const handleChange = (e) => {
    e.preventDefault();
    console.log(e.target.value);
    console.log(e.target.name);
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    let errorsValidate = validate({...input,[e.target.name]:e.target.value})
    setErrors(()=>errorsValidate);
  };
  const handleSubmit = (event) => {
    event.preventDefault();  
    Swal.fire({
      title: "Error!",
      text: "Complete password and email",
      icon: "error",
      confirmButtonText: "OK",
    });
  };



  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="sm" sx={{
          boxShadow: '2px 2px 2px -1px rgba(0, 0, 0, 0.2), 2px 2px 2px rgba(0, 0, 0, 0.14), 2px 2px 3px rgba(0, 0, 0, 0.12)'
      }}>
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
            {/* <LockOutlinedIcon /> */}
          </Avatar>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={4}>
              <Grid item xs={12}>
                <TextField
                  required                  
                  fullWidth
                  value={input.title}
                  name="title"
                  onChange={handleChange}
                  type="text"
                  label="Title"                  
                />
              </Grid>
                <Grid item xs={12}>
                    <TextField
                    required
                    fullWidth
                    name="stock"
                    value={input.stock}
                    onChange={handleChange}
                    label="Stock"
                    type="number"
                    id="stock"
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                    required
                    fullWidth
                    name="price"
                    value={input.price}
                    onChange={handleChange}
                    label="Price"
                    type="number"
                    id="price"
                    />
                </Grid>   
                <Grid item xs={12}>
                    <TextField
                    fullWidth
                    name="discount"
                    value={input.discount}
                    onChange={handleChange}
                    label="Discount"
                    type="number"
                    id="discount"
                    />
                </Grid>
              <Grid item sm={12}>
                <Select
                  required
                  fullWidth
                  label="Genre"
                  name="genre"
                  value = {input.genre}                  
                  onChange={handleChange}
                  id="genre"
                >
                <MenuItem value={input.genre}>Male</MenuItem>
                <MenuItem value={input.genre}>Female</MenuItem>
                <MenuItem value={input.genre}>Kids</MenuItem>
                <MenuItem value={input.genre}>Accesorios</MenuItem>
                </Select>
              </Grid>
              <Grid item sm={12}>
                <TextField
                  required
                  fullWidth
                  name="brand"
                  value={input.brand}
                  onChange={handleChange}
                  label="Brand"
                  type="text"
                  id="brand"
                />
              </Grid>
              <Grid item sm={12}>
                <TextField
                  required
                  fullWidth
                  name="sport"
                  value={input.sport}
                  onChange={handleChange}
                  label="Sport"
                  type="text"
                  id="sport"
                />
              </Grid>
              <Grid item sm={12}>
                <TextField
                  required
                  fullWidth
                  name="image"
                  value={input.image}
                  onChange={handleChange}
                  label="Image"
                  type="text"
                  id="image"
                />
              </Grid>
              <Grid item sm={12}>
                <TextField
                  required
                  fullWidth
                  name="description"
                  value={input.description}
                  onChange={handleChange}
                  label="Description"
                  type="text"
                  id="description"
                />
              </Grid>                         
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="status"
                  value={input.status}
                  onChange={handleChange}
                  label="Status"
                  type="text"
                  id="status"
                />
              </Grid>
            </Grid>
              <Button
                //href = '/home'
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Create Product
              </Button>            
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}