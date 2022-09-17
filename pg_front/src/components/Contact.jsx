import React, {useState} from "react";
import {Box, FormControl, InputLabel, OutlinedInput} from "@mui/material"
import mapsMock from "../asset/maps-mock"
import Button from "@mui/material/Button";

export default function Contact(){

  const [name, setName] = useState();

  const handleChange = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault()
  }
    return(

        <Box id={"contact"} sx={{
            display: "flex",
            justifyContent: "space-around",
            flexWrap:"wrap",
        }}>
        
        <div style={{
            
          display: "flex", 
          justifyContent:"center",
          alignItems:"center",
          flexDirection:"column", 
          margin:"20px", 
          width:"50%"
            
        }}>
          <h2 style={{
            
            fontSize:"30px",
            marginTop:"-20px",
            marginBottom:"5px", 
            marginLeft:"25px"
            
          }}>
          Write to us!
          </h2>
          <form onSubmit={handleSubmit} style={{
            
          
          }}>
            <FormControl sx={{
                margin: "20px"
            }}>
              <InputLabel htmlFor="component-outlined">
                  Email
              </InputLabel>
              
              <OutlinedInput
                id="component-outlined"
                label="E-mail"
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
                value={name}
                onChange={handleChange}
                label="Name"
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
                sx={{
                  height: "200px"
                }}
              />
            </FormControl>
            <Button type="submit" variant="contained" sx={{ width: "200px"}}> Submit </Button>
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