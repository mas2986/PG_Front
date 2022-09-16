import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { 
  Select, 
  Chip, 
  ListItemText, 
  Dialog,
  DialogTitle,
  DialogContent,
  Stack } from "@mui/material";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import DialogActions from "@mui/material/DialogActions";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { useDispatch, useSelector } from "react-redux";
import { createProduct } from "../redux/action";

function validate(input) {
  let errors = {};
  if (!input.title) errors.title = "Required Field";

  if (input.title.length > 50) errors.title = "Title very long";

  //let extensionImage = input.image.split('.')?.length
  //if(input.image.split('.')[extensionImage-1]!=='jpg') errors.image = 'Invalid image format'

  if (input.stock < 0) errors.stock = "Stock can't be smaller than 0";

  if (input.discount < 0) errors.discount = "Discount can't be smaller than 0";

  if (input.discount > 100)
    errors.discount = "Discount can't be larger than 100";

  if (input.price < 0) errors.price = "Price can't be smaller than 0";

  if (input.description.length > 250)
    errors.description = "Description very long";

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
      <Link color="inherit">
        {/* Cambiar href por nuestra URL */}
        Athens
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const theme = createTheme();

export default function FormProduct({ open, onClose, setEdit }) {
  const user = useSelector((state) => state.user);
  const allProducts = useSelector((state) => state.products);
  const [sportState,setSport] = useState([]);
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
  });

  const [errors, setErrors] = useState({});

  const genre = ["Male", "Female", "Kids", "Other"];
  const sports = [
    "Football",
    "Rugby",
    "Tennis",
    "Basketball",
    "Boxing",
    "Swimming",
    "Ciclism",
    "Paddle",
    "Hockey",
  ];
  const dispatch = useDispatch();

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

  useEffect(() => {
    const tokenJSON = JSON.parse(localStorage.getItem("userDetails"));
    if (tokenJSON) {
      const { token } = tokenJSON;
      const { rol } = tokenJSON.data.user;
      if (token && rol === "user") return history.push("/login");
    }
    if (!tokenJSON) return history.push("/login");
  }, []);

  const handleChangeSelect = (event) => {
    event.preventDefault();
    const {
      target: { value },
    } = event;
    setSport(
      typeof value === 'string' ? value.split(',') : value
    )      
  };

<<<<<<< HEAD
  const handleWidget = () =>{
    console.log('Abrir widget')
    var myWidget = window.cloudinary.createUploadWidget(
    {
      cloudName: 'athensimages', 
      uploadPreset: 'AthensImages'
    },
     (error, result) => { 
       console.log(error)
        if (!error && result && result.event === "success") { 
=======
  const handleWidget = () => {
    var myWidget = window.cloudinary.createUploadWidget(
      {
        cloudName: 'athensimages',
        uploadPreset: 'AthensImages'
      },
      (error, result) => {
        console.log(error)
        if (!error && result && result.event === "success") {
>>>>>>> 86bcbb0b5346cf9b9807c26ef57aa0c173638bf1
          console.log('Done! Here is the image info: ', result.info);
          setInput({
            ...input,
            image: result.info.url
          })
        }
      }
    );
    myWidget.open()
<<<<<<< HEAD
  };
=======
  }
>>>>>>> 86bcbb0b5346cf9b9807c26ef57aa0c173638bf1

  const handleSubmit = (event) => {
    event.preventDefault();
    onClose();
    input.sport = sportState
    dispatch(createProduct(input));
    setEdit(()=>true);
    setInput({
      title:'',
      image:'',
      stock:0,
      price:0,
      discount:0,
      brand:'',
      genre:'',
      description:''
    })
    setSport([])
  };

  return (
    <Dialog open={open}>
      <DialogTitle textAlign="center" >Create New Product</DialogTitle>
      <DialogContent>
        <Stack
          sx={{
            width: '100%',
            minWidth: { xs: '300px', sm: '360px', md: '400px' },
            gap: '1.5rem',
          }}
        >
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
                  value={input ?.title}
                  name="title"
                  error={!!errors.title}
                  helperText={errors.title}
                  onChange={handleChange}
                  type="text"
                  label="Title"
                />
              </Grid>
              <Grid item sm={12}>
<<<<<<< HEAD
              <Box sx={{display:'flex'}}>
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
                  <Button id="upload-widget"
                    className="cloudinary-button"
                    onClick = {handleWidget}
                    >Upload image</Button>
                </Box>
=======
                <Box sx={{ display: 'flex' }}>
                  <Button id="upload-widget"
                    className="cloudinary-button"
                    variant="contained"
                    fullWidth
                    onClick={handleWidget}
                    endIcon={<AddAPhotoIcon />}>
                    Add a photo
                    </Button>
                </Box>                
>>>>>>> 86bcbb0b5346cf9b9807c26ef57aa0c173638bf1
              </Grid>
              <Box
                maxWidth="sm"
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  paddingTop: "32px",
                  paddingLeft: "32px",
                }}
              >
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="stock"
                    value={input ?.stock}
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
                    value={input ?.price}
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
                    value={input ?.discount}
                    onChange={handleChange}
                    label="Discount"
                    type="number"
                    error={!!errors.discount}
                    helperText={errors.discount}
                    id="discount"
                  />
                </Grid>
              </Box>
              <Box
                maxWidth="sm"
                sx={{
                  width: "100%",
                  display: "flex",
                  paddingLeft: "32px",
                  paddingTop: "32px",
                }}
              >
                <Grid item sm={12}>
                  <TextField
                    required
                    fullWidth
                    name="brand"
                    value={input ?.brand}
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
                    select={true}
                    label="Genre"
                    name="genre"
                    value={input ?.genre}
                    onChange={handleChange}
                    id="genre"
                  >
                    {genre.map((e) => (
                      <MenuItem key={e} value={e}>
                        {e}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
              </Box>
              <Grid item sm={12}>
                <InputLabel id="demo-multiple-name-label">Sport</InputLabel>
                <Select
                  fullWidth
                  labelId="demo-multiple-name-label"
                  id="demo-multiple-name"
                  multiple
                  name="sport"
                  value={sportState}
                  onChange={handleChangeSelect}
                  input={<OutlinedInput label="Sport" />}
                  MenuProps={MenuProps}
                >
                  {sports.map((name) => (
                    <MenuItem
                      key={name}
                      value={name}
                    >
                      {name}
                    </MenuItem>
                  ))}
                </Select>
            </Grid>
              <Grid item sm={12}>
                <TextField
                  required
                  fullWidth
                  name="description"
                  value={input ?.description}
                  onChange={handleChange}
                  label="Description"
                  type="text"
                  error={!!errors.description}
                  helperText={errors.description}
                  id="description"
                />
              </Grid>
            </Grid>
            <DialogActions sx={{ p: '1.25rem' }}>
              <Button onClick={onClose}>Cancel</Button>
              <Button color="secondary" onClick={handleSubmit}
                disabled={Object.keys(errors) ?.length !== 0 ||
                  input.title === '' ||
                  input.stock === '' ||
                  input.brand === '' ||
                  input.genre === '' ||
                  input.price === '' ||
                  input.image === '' ||
                  sportState.length === 0 ||
                  input.description === ''
        }

                variant="contained">
                Create New Product
        </Button>
            </DialogActions>
          </Box>
        </Stack>

      </DialogContent>
    </Dialog>
  );
}
