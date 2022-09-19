import React, {useState} from "react";
import {Box, FormControl, InputLabel, OutlinedInput} from "@mui/material"
import mapsMock from "../asset/maps-mock"
import Button from "@mui/material/Button";
import Swal from "sweetalert2";
import emailjs from "emailjs-com";

export default function Contact(){

  const SERVICE_ID="service_hhrzemm";
  const TEMPLATE_ID="template_tfwbmr9";
  const USER_ID="4DsQ07NDajgU8ymNP";

  const [contact, setContact] = useState({
    email: "",
    name: "",
    message:"",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, e.target, USER_ID)
      .then((result) => {
        console.log(result.text);
        Swal.fire({
          icon: "success",
          title:  "Message Sent Successfully"
        })
      }, (error) => {
        console.log(error.text);
        Swal.fire({
          icon: "error",
          title: "Ooops, something went wrong",
          text: error.text,
        })
      });
    e.target.reset()
  };

  function stateInput(e){
    setContact({
      ...contact,
      [e.target.name]: e.target.value,
    });
  }

    return(

        <Box  sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-evenly",
            alignItems:"center",
            flexWrap:"wrap",
        }}>
        
        <div id="contact">
          <h2  style={{
          
            fontSize:"30px",
            marginBottom:"5px", 
            marginLeft:"25px"
            
          }}>
          Write to us!
          </h2>


          <form onSubmit={handleSubmit} style={{
          display: "inline-flex", 
          justifyContent:"space-evenly",
          alignItems:"stretch",
          flexDirection:"column",
          width:"35rem", 
        }}>
            <FormControl sx={{
                margin: "20px"
            }}>
              <InputLabel htmlFor="component-outlined">
                  Email
              </InputLabel>
              
              <OutlinedInput
                fullWidth
                id="component-outlined"
                label="E-mail"
                onChange={(e)=>{stateInput(e);}}
                value={contact.email}
                name="email"
              />
            </FormControl>

            <FormControl sx={{
                margin: "20px"
            }}>
              <InputLabel htmlFor="component-outlined">
                  Name
              </InputLabel>
              
              <OutlinedInput
                id="component-outlined"
                value={contact.name}
                onChange={(e)=>{stateInput(e);}}
                label="Name"
                name="name"
              />
            </FormControl>

            <FormControl sx={{
                margin: "20px",
            }}>
              <InputLabel htmlFor="component-outlined">
                  Message
              </InputLabel>
              
              <OutlinedInput
                id="component-outlined"
                label="Message"
                name="message"
                value={contact.message}
                multiline
                sx={{
                  height: "200px"
                }}
                onChange={(e)=>{stateInput(e);}}
              />
            </FormControl>
            <Button type="submit" variant="contained" sx={{
              alignSelf:"flex-end",
              width: "200px",
              margin: "20px"}}> Submit </Button>
          </form>
        </div>

        <img
            src={mapsMock}
            alt="image not found."
            style={{
                height: "500px",
                width: "500px"
            }}
        />

        </Box>

    )

}