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
import { resetPassword } from '../redux/action';
import { useHistory } from 'react-router-dom';


export default function ResetPassword() {

  const dispatch = useDispatch();
  const history = useHistory();


  const [texto, setTexto] = React.useState({
    password: "",
    clave: ""
    });

  function handleInput(e) {
      setTexto({
        //Al ser un objeto debemos pasarle el obj y no solo los inputs
        ...texto,
        [e.target.name]: e.target.value
      });
      console.log(e.target.value)
    }

  function handleClick (e) {
      e.preventDefault();
      if (texto.password.length === 0  ) {
        return Swal.fire({title:'Password is required!', text:'Ups! We know how cumbersome this tends to be.', icon: "error"})
      }
      if (texto.password.length <= 8  ) {
        return Swal.fire({title:'New password must contain at least 8 characters!', text:'Ups! We know how cumbersome this tends to be.', icon: "error"})
      }
      dispatch(resetPassword(texto));
      history.push('/login')
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
        <p className="classPassword">We send you a token to the email you gave us.</p>
        <p className="classPassword">Then complete the fields to acquire or update your password.</p>
      <div>
       <Grid>
       <TextField
          onChange={(e) => handleInput(e)}
          label="New password"
          helperText="It must contain at least 8 characters." 
        //   defaultValue="Email"
          size="small"
          className="classPassword"
          name="password"
          value={texto.password}
          type="password"
        />
        
        { (texto.password.length  >= 8 ? <VerifiedIcon item xs={8} className='icon-email'/> : <VerifiedIcon item xs={8} className='icon-email-red'/>) }
       </Grid>
       <Grid>
       <TextField
          onChange={(e) => handleInput(e)}
          label="Token"
          helperText="Enter your token." 
        //   defaultValue="Email"
          size="small"
          className="classPassword"
          name="clave"
          value={texto.clave}
          type="password"
        />
        
        { (texto.clave && texto.clave.length > 8 ? <VerifiedIcon item xs={8} className='icon-email'/> : <VerifiedIcon item xs={8} className='icon-email-red'/>) }
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
