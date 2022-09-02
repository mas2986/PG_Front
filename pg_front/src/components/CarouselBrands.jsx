import React from 'react';
import Carousel from 'react-elastic-carousel';
import Adidas from '../img brands/logoadidas.png';
import Gilbert from '../img brands/gilbert.png';
import Head from '../img brands/head.png';
import Nike from '../img brands/nike2.png';
import Giro from '../img brands/giro_logo.webp';
import Speedo from '../img brands/speedo.png';
import Wilson from '../img brands/Wilson.png';
import Troy from '../img brands/troy.png';
import Everlast from '../img brands/Everlast.png';
import {filterByBrand} from "../redux/action"
import { useDispatch } from "react-redux";



function CarouselBrands(){
    const imgbrands = [{title:"Adidas", image:Adidas},
                       {title:"Gilbert", image:Gilbert},
                       {title:"Head", image:Head},
                       {title:"Nike", image:Nike},
                       {title:"Giro", image:Giro},
                       {title:"Speedo", image:Speedo},
                       {title:"Wilson", image:Wilson},
                       {title:"Troy Lee Air", image:Troy},
                       {title:"Everlast", image:Everlast}]
                    
                       const dispatch = useDispatch();
    
                       function handleBrands(e) {
                        e.preventDefault();
                        dispatch(filterByBrand(e.target.title));
                       console.log(e)
                      }
                      

    return (
        <div className="carouselbrands">
            
            <Carousel itemsToShow={3}>
            {
                    
          imgbrands.map((ea, index, ) => (
                <div key={index}>
       <button  onClick={(e)=>handleBrands(e)}>  <img src={ea.image} style={{width: "220px", height: "200px"}} title={ea.title} alt="Not found" />
                   </button>
                        </div>
                        )
                    ) 
                }
            </Carousel>
            
        </div>
    )
}

export default CarouselBrands