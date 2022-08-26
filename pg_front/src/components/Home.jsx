import React from 'react';
import imgHome from '../asset/home.png';
import SearchBar from './SearchBar';
import '../Style/Home.css'
import Filters from './Filters';

export default function Home(){
    return(
        <div className="backGround">
            {/* <Nav/> */}
            <h3>Soy el home</h3>
            <SearchBar/>
            <Filters/>
            <h2>Sports Apparel · Footwear · </h2>
            <img className="imgHome" src={imgHome} alt=""/>
        </div>
    )
}