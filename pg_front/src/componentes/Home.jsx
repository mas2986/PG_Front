import React from 'react';
import Nav from './Nav'
import imgHome from '../asset/home.png';
import SearchBar from './SearchBar';
import '../Style/Home.css'

export default function Home(){
    return(
        <div className="backGround">
            {/* <Nav/> */}
            <h3>Soy el home</h3>
            <SearchBar/>
            <h2>Sports Apparel · Footwear · </h2>
            <img className="imgHome" src={imgHome} alt=""/>
        </div>
    )
}