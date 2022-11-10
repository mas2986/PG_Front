import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import VerifiedIcon from '@mui/icons-material/Verified';
import logo from "../logo.png";
import "../styles/Password.css"
import img from "../img brands/gridiron-victoria-4584022_960_720.jpg"
import { Grid } from '@mui/material';
import Swal from 'sweetalert2';
import {Button} from '@mui/material';
import Nav from './Nav2';
import { useDispatch } from 'react-redux';
import { passwordRemember } from '../redux/action';
import { useHistory } from 'react-router-dom';

export default function Password() {

  const dispatch = useDispatch();
  const history = useHistory();


  const [texto, setTexto] = React.useState({
    email: "",
    });

  function handleInput(e) {
      setTexto({
        //Al ser un objeto debemos pasarle el obj y no solo los inputs
        ...texto,
       email: e.target.value,
      });      
    }

  function handleClick (e) {
      e.preventDefault();
      if (texto.email.length < 8  ) {
        return Swal.fire({title:'¡Email is required!', text:'Ups! We know how cumbersome this tends to be.', icon: "error"})
      }
      if (!texto.email.includes("@")) {
        return Swal.fire({title:'¡There was an error in the email!', text:"The email should be for example: ..@mail.com.ar", icon: "error"})
      }
      dispatch(passwordRemember(texto,history));
    }

  return (
    <center>
      <Nav></Nav>
        <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 3, width: '41ch', textAlign: "justify" },
      }}
      noValidate
      autoComplete="off"
    >
        <div className='DIV-Container'>
        <div className='container-img'><img className='classImg' align="center" src={img} alt="" /></div>
        <div className='container'>
        <h1 className="recover">ATHENS</h1>
        <center><img src={logo} alt="Logo not found." /></center>
        <p className="classPassword">Write your email so that we can send you an email to create a new password.</p>
        <p className="classPassword">At the time of receiving it, we recommend that you check your Junk or Spam inbox.</p>
      <div>
       <Grid>
       <TextField
          onChange={(e) => handleInput(e)}
          label="Email"
          helperText="It must contain at least 8 characters." 
        //   defaultValue="Email"
          size="small"
          className="classPassword"
          name="email"
          value={texto.email}
        />
        
        { (texto.email.includes("@") && texto.email.length > 8 ? <VerifiedIcon item xs={8} className='icon-email'/> : <VerifiedIcon item xs={8} className='icon-email-red'/>) }
       </Grid>
        
      </div>
      <Button className='btn-reset' variant="outlined" onClick={(e)=> handleClick(e)}>RESET PASSWORD</Button>
      <br />
      <br />
        </div>
        </div>
    </Box>
    </center>
  );
}
