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
import { createBill } from "../redux/action";

import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import { TextsmsOutlined } from "@mui/icons-material";

export default function Purchase() {
    const history = useHistory();
    const [checked, setChecked] = React.useState(true);
    const [errors, setErrors] = React.useState({});
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    var bill = JSON.parse(localStorage.getItem('billDetails'));    


    const [texto, setTexto] = React.useState({
        name: "",
        lastName: "",
        calle: "",
        numero: "",
        apartament:"",
        floor:"",
        provincia: "",
        city: "",        
        zip: "",
        observations: ""
    });



    function stateInput(e) {
        setTexto({
            //Al ser un objeto debemos pasarle el obj y no solo los inputs
            ...texto,
            [e.target.name]: e.target.value,
        });
    }

    const handleChange = (event) => {
        setChecked(event.target.checked);
      };

    const handleButton = async (event) => {
        if (texto.name.length < 3 || texto.name.length > 25) {
            return Swal.fire({
                title: "Check the name!",
                text: "It must contain from 3 to 25 characters.",
                icon: "error",
            });
        }
        if (texto.lastName.length < 3) {
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
        if (!texto.zip) {
            return Swal.fire({
                title: "Check the ZIP!",
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
        if (texto.city.length < 3) {
            return Swal.fire({ title: "Check your city!", icon: "error" });
        }
/*         if (!texto.celNumber || texto.celNumber.length < 5) {
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
        } */
        texto.address = `${texto.calle} ${texto.numero} ${texto.floor} ${texto.apartament}`
        texto.totalAmount = bill.totalAmount;
        texto.orderId = bill.orderId;
        texto.zip = Number(texto.zip)
        texto.celNumber = bill.celNumber;    
        texto.email = bill.email;    
        delete texto.calle;
        delete texto.numero;
        delete texto.apartament;
        delete texto.floor;        
        localStorage.removeItem("billDetails");
        dispatch(createBill(texto));
        history.push("/")    
    };

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
                                errors.lastName && <p className={f.colour}>{errors.lastName}</p>
                            }
                            type="text"
                            id="outlined-required"
                            label="Last Name"
                            name="lastName"
                            value={texto.lastName}
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
                            onChange={(e) => {
                                stateInput(e);
                            }}
                            id="outlined-required"
                            label="Floor"
                            name="floor"
                            value={texto.floor}
                        //   defaultValue="Hello World"
                        />
                        <TextField
                            onChange={(e) => {
                                stateInput(e);
                            }}
                            id="outlined-required"
                            label="Apartment n°"                            
                            name="apartament"
                            value={texto.apartament}
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
                            helperText={errors.zip && <p className={f.colour}>{errors.zip}</p>}
                            name="zip"
                            value={texto.zip}
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
                                errors.city && (
                                    <p className={f.colour}>{errors.city}</p>
                                )
                            }
                            name="city"
                            value={texto.city}
                        //   defaultValue="Hello World"
                        />
                    </div>
                    {/* <TextField
                            id="outlined-required"
                            label="ID"
                            defaultValue="Hello World"
                        /> 
                    */}                                            
                    <div className="btn-form">
                    {
                        errors.name ||
                        errors.lastName ||
                        errors.calle ||
                        errors.numero ||
                        errors.provincia ||
                        errors.city ||
                        errors.celNumber ||
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
                                    SEND
                                </Button>
                        ) : (
                            <p></p>
                            )
                        }
                    </div>
                        {/*
                        <Link to="/">
                                <Button
                                    href="/"
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
                    */}
                    <Checkbox
                        defaultChecked
                        color="primary"
                        inputProps={{ "aria-label": "secondary checkbox" }}
                        sx={{ visibility: "hidden" }}
                    />
                </Box>
                           </Box>
        </div >
    )
}