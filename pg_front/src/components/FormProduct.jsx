import React, { useState } from "react";
import { useHistory, useParams } from 'react-router-dom';
import Swal from "sweetalert2";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Select from '@mui/material/Select';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormControl from '@mui/material/FormControl';
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
import { createProduct } from "../redux/action";

function validate(input) {
  let errors = {};
  console.log('En funcion validate')
  console.log(input);
  if (!input.title) errors.title = 'Required Field';

  if(input.title.length > 50) errors.title = 'Title very long'

  //let extensionImage = input.image.split('.')?.length
  //if(input.image.split('.')[extensionImage-1]!=='jpg') errors.image = 'Invalid image format'

  if (input.stock < 0) errors.stock = "Stock can't be smaller than 0";

  if (input.discount < 0) errors.discount = "Discount can't be smaller than 0";

  if (input.discount > 100) errors.discount = "Discount can't be larger than 100"

  if (input.price < 0) errors.price = "Price can't be smaller than 0";

  if(input.description.length > 250)errors.description = "Description very long";


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
      <Link color="inherit" href="https://mui.com/">{/* Cambiar href por nuestra URL */}
        Athens
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();



export default function FormProduct() {
   
  const allProducts = useSelector((state) => state.products);
  console.log(allProducts);
  const [input, setInput] = useState({
                              title: "",
                              brand: "",
                              image: "",
                              description: "",
                              price: 0,
                              discount: 0,
                              //status: "",
                              stock: 0,
                              genre: "",
                              sport: ""
                            })
                           
                            
  const [errors, setErrors] = useState({})

  const genre = ['Male','Female','Kids','Other'];
  const sport = ['Soccer','Rugby','Tennis','Basketball','Boxing','Swimming','Ciclism','Paddle','Hockey' ]
  const dispatch = useDispatch();
  const history = useHistory();

  console.log(input);
  const handleChange = (e) => {
    e.preventDefault();
    console.log(e.target.value);
    console.log(e.target.name);    
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    let errorsValidate = validate({ ...input, [e.target.name]: e.target.value })
    setErrors(() => errorsValidate);
  };

  const handleChangeSelect = (event: SelectChangeEvent) => {
    event.preventDefault();
    setInput({
      ...input,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();    
    dispatch(createProduct(input))
  };



  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="sm" sx={{
        boxShadow: '10px -10px 5px 0px rgba(0,0,0,0.75)',
        //-webkit-box-shadow: 10px 10px 5px 0px rgba(0,0,0,0.75)
        //-moz-box-shadow: 10px 10px 5px 0px rgba(0,0,0,0.75);
        paddingLeft: "20px"
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
          <Typography variant="h4">CREATE NEW PRODUCT</Typography>
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
                  value={input?.title}
                  name="title"
                  error={!!errors.title}
                  helperText={errors.title}
                  onChange={handleChange}
                  type="text"
                  label="Title"
                />
              </Grid>
              <Grid item sm={12}>
                <TextField
                  required
                  fullWidth
                  name="image"
                  value={input?.image}
                  onChange={handleChange}
                  label="Image"
                  type="text"
                  //error={!!errors.image}
                  //helperText={errors.image}
                  id="image"
                />
              </Grid>
              <Box maxWidth="sm" sx={{
                display: "flex",
                justifyContent: "space-between",
                paddingTop: "32px",
                paddingLeft: "32px"
              }}>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="stock"
                    value={input?.stock}
                    onChange={handleChange}
                    label="Stock"
                    type="number"
                    error={!!errors.stock}
                    helperText={errors.stock}
                    id="stock"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="price"
                    value={input?.price}
                    onChange={handleChange}
                    label="Price"
                    type="number"
                    id="price"
                    error={!!errors.price}
                    helperText={errors.price}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    name="discount"
                    value={input?.discount}
                    onChange={handleChange}
                    label="Discount"
                    type="number"
                    error={!!errors.discount}
                    helperText={errors.discount}
                    id="discount"
                  />
                </Grid>
              </Box>
              <Box maxWidth="sm"

                sx={{
                  width: "100%",
                  display: "flex",
                  paddingLeft: "32px",
                  paddingTop: "32px"
                }}
              >
                <Grid item sm={12}>
                  <TextField
                    required
                    fullWidth
                    select={true}
                    label="Genre"
                    name="genre"
                    value={input?.genre}
                    onChange={handleChangeSelect}
                    id="genre"
                  >
                    {genre.map(e=><MenuItem key = {e} value={e}>{e}</MenuItem>)}                   
                 </TextField>                  
                </Grid>
                <Grid item sm={12}>
                  <TextField
                    required
                    fullWidth
                    label="Sport"
                    name="sport"
                    select={true}
                    value={input?.sport}
                    onChange={handleChangeSelect}
                    id="sport"
                  >
                    {sport.map(e=><MenuItem key = {e} value={e}>{e}</MenuItem>)}                   
                 </TextField>                  
                </Grid>
                
                <Grid item sm={12}>
                  <TextField
                    required
                    fullWidth
                    name="brand"
                    value={input?.brand}
                    onChange={handleChange}
                    label="Brand"
                    type="text"
                    id="brand"
                  />
                </Grid>

              </Box>
              <Grid item sm={12}>
                <TextField
                  required
                  fullWidth
                  name="description"
                  value={input?.description}
                  onChange={handleChange}
                  label="Description"
                  type="text"
                  error={!!errors.description}
                  helperText={errors.description}
                  id="description"
                />
              </Grid>
              {/*               <Grid item xs={12}>
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
              </Grid> */}
            </Grid>  
            <Button
                //href = '/home'
                disabled = { Object.keys(errors)?.length!==0 ||
                  input.title === ''||
                  input.stock === ''||
                  input.brand === ''||
                  input.genre === ''||
                  input.price === ''||
                  input.sport === ''||
                  input.description === ''
                }
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