import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@material-ui/core/Container';
import CardProduct from './CardProduct';
import {getProduct} from '../redux/action';
import Image from '../asset/home.png';
import Filters from './Filters';
import '../Style/Home.css'


export default function Home(){
    const products = useSelector(state=>state.products)
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getProduct())
    })

    return(
        <>
            <Box
                sx={{
                    position:'absolute',
                    top:'10px',
                    width: '100vw',
                    height: 1024,
                    backgroundImage: `url(${Image})`,
                    borderRadius: '0px 0px 50px 50px'
                }}            
            />    
            <Filters/>    
            <Box sx={{
                display: 'flex',
                margin:'0 auto'
            }}>
                <Typography variant="h1" component="h2" sx={{
                    width: 1440,
                    height: 185,
                    position:'absolute',
                    left: -359,
                    top:711,
                    fontFamily: 'Roboto',
                    fontStyle: 'italic',
                    fontWeight: 900,
                    fontSize: 140,
                    lineHeight: 24,
                    display: 'flex',
                    alignItems: 'center',
                    textAlign: 'center',
                    letterSpacing: 0.15,
                    color: '#40F99B'
                }}>
                    Sports Apparel · Footwear ·
                </Typography>
            </Box>
            <Container component="main" maxWidth="md" sx={{
                position:'absolute',
                top:'1050px'
            }}>
                <Box
                    sx={{ 
                        margin:1,
                        display: 'grid', 
                        gridTemplateColumns: 'repeat(3, 1fr)'
                    }}
                    >
                    {products.length>0&&products.map(e=>
                        <CardProduct 
                            key = {e.id}
                            title={e.title}
                            sport={e.sport}    
                            Image={e.Image||e.image}
                    />)}
                </Box>
            </Container>
        </>
    )
}