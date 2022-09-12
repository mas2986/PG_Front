import React from "react";
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import men from "../asset/kisspng-stock-photography-running-sport-royalty-free-running-man-5ac5f14f0df399.7010111215229218070572.png"
import women from "../asset/pngwing.com.png";
import kids from "../asset/favpng_child-sport-football-game-player.png";
import Typography from '@mui/material/Typography';
import { Link } from "react-router-dom";

export default function HomePictures(){

    return(
        
        <Box 
            sx={{
                display:"flex", 
                flexDirection:"row",
                justifyContent:"space-around"  ,
                margin: "5rem"  ,
                flexWrap:"wrap"
            }}
        >

        <div>
     
        <Paper 
            className='card1' 
            elevation={3}
            sx={{
                backgroundColor:"#61707D", 
                height:"400px", 
                width:"350px",
                display:"flex", 
                justifyContent:"center",
                paddingTop:"1.5rem" 
            }}
        > 
            <img
                src={men}
                style={{  height: "350px" }}
                title={"men"}
                alt="Not found"
            />
        </Paper>
        <Typography align={"center"} sx={{fontSize:"3rem"}}>Men</Typography>
      
        </div>

        <div>
        <Paper 
            className='card2' 
            elevation={3}
            sx={{
                backgroundColor:"#40F99B", 
                height:"400px", 
                width:"350px",
                display:"flex", 
                justifyContent:"center",
                paddingTop:"1.5rem" }}
        >
            <img
                src={women}
                style={{  height: "350px" }}
                title={"women"}
                alt="Not found"
            />
        </Paper>
        <Typography align={"center"} sx={{fontSize:"3rem"}}>Women</Typography>
        </div>
        <div>
        <Paper 
            className='card3' 
            elevation={3}
            sx={{
                backgroundColor:"#DE6B48", 
                height:"400px", 
                width:"350px",
                display:"flex", 
                justifyContent:"center",
                paddingTop:"1.5rem" }}
        >
            <img
                src={kids}
                style={{  height: "350px" }}
                title={"kids"}
                alt="Not found"
            />
        </Paper>
        <Typography align={"center"} sx={{fontSize:"3rem"}}>Kids</Typography>
        </div>

        </Box>
        
    )
}