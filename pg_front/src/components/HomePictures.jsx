import React from "react";
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import men from "../asset/kisspng-stock-photography-running-sport-royalty-free-running-man-5ac5f14f0df399.7010111215229218070572.png"
import women from "../asset/pngwing.com.png";
import kids from "../asset/favpng_child-sport-football-game-player.png";
import Typography from '@mui/material/Typography';
import { Link } from "react-router-dom";
import { filterByGenre } from "../redux/action";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";


export default function HomePictures(){

    const dispatch = useDispatch();
    const history = useHistory();

    const handleClick = (e) => {
        e.preventDefault();
        dispatch(filterByGenre(e.target.title));
        history.push("/products#")
        console.log(e.target.title)
    }


    return(
        
        <Box 
            sx={{
                display:"flex", 
                flexDirection:"row",
                justifyContent:"space-around"  ,
                margin: "5rem"  ,
                marginBottom:"10rem",
                marginTop:"10rem",
                flexWrap:"wrap"
            }}
        >

        <div>
        <Link to="/products" onClick={(e)=>handleClick(e)}>
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
                title={"Male"}
                alt="Not found"
            />
        </Paper>
        </Link>
        <Typography align={"center"} sx={{fontSize:"3rem"}}>Men</Typography>
        
        </div>

        <div>
        <Link to="/products" onClick={(e)=>handleClick(e)}>
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
                title={"Female"}
                alt="Not found"
            />
        </Paper>
        </Link>
        <Typography align={"center"} sx={{fontSize:"3rem"}}>Women</Typography>
        </div>
        <div>
        <Link to="/products" onClick={(e)=>handleClick(e)}>
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
                title={"Kids"}
                alt="Not found"
            />
        </Paper>
        </Link>
        <Typography align={"center"} sx={{fontSize:"3rem"}}>Kids</Typography>
        </div>

        </Box>
        
    )
}