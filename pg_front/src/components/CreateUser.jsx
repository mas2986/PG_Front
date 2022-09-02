import React from 'react';
import FormControl from '@mui/material/FormControl';
import { InputLabel, Input, FormHelperText, Grid, Button, Checkbox, FormGroup, FormControlLabel } from '@mui/material';
import "../styles/CreateUser.css"
import Nav from './Nav2';
const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

export default function CreateUser() {

  return (
     <>
     <Nav></Nav>
     <div className='body'>
     <center>
        <form className='formDetail'>
        <Grid container className='box'>
         <Grid item md={20}>
         <FormControl>
            <InputLabel htmlFor="my-input"></InputLabel>
            <Input id="my-input" aria-describedby="my-helper-text" />
            <FormHelperText id="my-helper-text">User</FormHelperText>
        </FormControl>
         </Grid>
         <Grid item md={20}>
        <FormControl>
            <InputLabel htmlFor="email"></InputLabel>
            <Input id="email" type="email" aria-describedby="email-helper" />
            <FormHelperText id="password-helper">Email</FormHelperText>
        </FormControl>
        </Grid>
        <Grid item md={12}>
        <FormControl>
            <InputLabel htmlFor="pwd"></InputLabel>
            <Input id="pwd" type="password" aria-describedby="password-helper" />
            <FormHelperText id="password-helper">Password</FormHelperText>
        </FormControl>
        </Grid>
        <Grid item md={12}>
        <FormControl>
            <InputLabel htmlFor="pwd"></InputLabel>
            <Input id="pwd" type="password" aria-describedby="password-helper" />
            <FormHelperText id="password-helper">Confirm password</FormHelperText>
        </FormControl>
        </Grid>
        <Grid item md={12}>
        <FormControl>
            <InputLabel htmlFor="number"></InputLabel>
            <Input id="my-input" type="number" aria-describedby="my-helper-text" />
            <FormHelperText id="my-helper-text">DNI</FormHelperText>
        </FormControl>
        </Grid>
     </Grid>
     <br />
     <FormGroup className='checkbox'>
        <FormControlLabel size="small" control={<Checkbox
        {...label}
        sx={{ '& .MuiSvgIcon-root': { fontSize: 18, } }}
      />} label="I accept the Privacy Policies and Terms and Conditions"/>
        <FormControlLabel size="small" control={<Checkbox
        {...label}
        sx={{ '& .MuiSvgIcon-root': { fontSize: 18, } }}
      />} label="I want to receive emails of promotions and news"/>
    </FormGroup>
    <Button className='btn-form' variant="contained" color="primary" href='/home'>¡Register!</Button>
     <center></center>
        </form>
     <br />

     </center>

     </div>
    
    
   </>
     
  );
}
