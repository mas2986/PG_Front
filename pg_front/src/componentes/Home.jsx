import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@material-ui/core/Container';
import CardProduct from './CardProduct';
import {getProduct} from '../redux/action';
import Image from '../asset/home.png'
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
                    width: 1440,
                    height: 1024,
                    backgroundImage: `url(${Image})`,
                    //borderRadius: 50            
                }}            
            />        
            <Typography variant="h1" component="h2" sx={{
                width: 2401,
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
            <Container maxWidth="md" sx={{margin:2}}>
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


/*         <div className="backGround">
            <h2>Sports Apparel · Footwear · </h2>
            <div>
                {products.length>0&&products.map(e=>
                    <CardProduct 
                        key = {e.id}
                        title={e.title}
                        sport={e.sport}    
                        Image={e.Image||e.image}
                    />)}
            </div>
        </div> */
    )
}