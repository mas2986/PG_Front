import React from 'react';
import Rating from '@mui/material/Rating';
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Popover from '@mui/material/Popover';
import Button from '@mui/material/Button';
import {useState} from 'react'
import d from "./Detail.module.css";






export default function RatingProm(props) {



  const [anchor, setAnchor] = useState(null)

  const openPopover = (e) => {
   setAnchor(e.currentTarget)
  }




   let id = props.id
  const review=props.reviews
  let quantity=0;
  let array = [];
  let comments = ""
  let user = ""
  let render =[]
  let users = props.users
  
  
  for (let i = 0; i < review.length; i++) {
      if(review[i].productId === Number(id)) {
          array.push(review[i])
          quantity += 1;
          comments = (review[i].comment + " ")
           users.forEach(element => { if(element.id === review[i].userId) user = element.name       
          });
          render[i] = {user: user,
                      comments:comments } 
        
        
          
         
      } else{
          array
      }
      
  }
  console.log(render)
  
  function promedio(array){
      let suma=0;
      let cont=0;
      if(!array.length) return 0;
      for(let i=0;i<array.length;i++){
          suma=suma+parseInt(array[i].rating);
          cont++;
      }
      return suma/cont;
  }
  
  let prom=0;
  if(quantity) prom=promedio(array);
  console.log(prom)
return (
  <div className='prom'>
    <Box component="fieldset" mb={3} borderColor="transparent">        
      <Rating name="read-only" value={prom} precision={0.5} readOnly />
      <Typography sx={{
        display: "flex",
        alignItems: "center",
        paddingLeft: "30px",
      }} component="legend">Votes: {quantity} </Typography>
      <br/>
      <br/>

       <Button variant="contained" color="primary" sx={{backgroundColor:"#61707D"}}  onClick={openPopover}>
          Comments
      </Button>
      <Popover 
      open={Boolean(anchor)}
      anchorEl={anchor}
      anchorOrigin={{
          vertical: "top",
          horizontal: "left"
      }}
      transformOrigin={{
          vertical: "bottom",
          horizontal: "left"
      }}
      onClose={() =>setAnchor(null)}>
      <Typography variant="legend"> <ul> {render.map(el => <li><div className={d.Prueba}><p>{el.user+":  "}</p><p>{el.comments}</p></div></li>)} </ul>    </Typography> 

      </Popover>
    </Box>
  </div>
);

}
