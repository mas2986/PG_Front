import React, {useState} from "react";
import {Box, FormControl, InputLabel, OutlinedInput} from "@mui/material"
import mapsMock from "../asset/maps-mock"

export default function Contact(){

    const [name, setName] = useState();

  const handleChange = (e) => {
    setName(e.target.value);
  };

    return(

        <Box id={"contact"} sx={{
            display: "flex",
            justifyContent: "space-around"
        }}>
        
        <div style={{
            display: "flex", 
            flexDirection:"column", 
            margin:"20px", 
            width:"50%"}}>
        <h2 style={{fontSize:"30px",
                    marginTop:"-20px",
                    marginBottom:"5px", 
                    marginLeft:"25px"
                }}>
        Write to us!
        </h2>

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
        //   onChange={handleChange}
          label="Message"
          sx={{
            height: "200px"
          }}
        />
        </FormControl>
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