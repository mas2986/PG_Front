import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { filterByGenre, filterBySport, filterByBrand, orderBy, orderByPrice } from "../redux/action";


export default function Filters() {



const dispatch = useDispatch();
    
const [input, setInput] = useState('')

function handleFilteredGenres(e){
    e.preventDefault()
    dispatch(filterByGenre(e.target.value));        
}
function handleFilteredSports(e){
    e.preventDefault()
    dispatch(filterBySport(e.target.value));        
}
function handleFilteredBrands(e){
    e.preventDefault()
    dispatch(filterByBrand(e.target.value));    
      
}
function handleOrderBy(e){
    e.preventDefault();
    dispatch(orderBy(e.target.value));
    
}
function handleOrderByPrice(e){
    e.preventDefault();
    dispatch(orderByPrice(e.target.value));
    
}

    return (
        <section>
            <div>
            <h3>ORDER</h3>
            <select onChange={(e) => handleOrderBy(e)}>
            <option value="asc"> A-Z</option>
            <option value="desc"> Z-A</option>
             </select>
            </div>
            <div>
            <h3>ORDER BY PRICE</h3>
            <select onChange={(e) => handleOrderByPrice(e)}>
            <option value="asc"> Low to High</option>
            <option value="desc"> High to Low</option>
             </select>
            </div>
            <div >
                <h3>GENRES</h3>
                <select className="select-detail" onChange={(e) => {handleFilteredGenres(e)}}>
                <option value="All">All</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Kids">Kids</option>
                <option value="male">Masculino</option>
                <option value="female">Femenino</option>
                <option value="kids">Bebés</option>
                <option value="Adults">Adultos</option>
                <option value="None">Sin género</option>
                <option value="">No binario</option>
            SELECT</select>
        </div>

        <div >
           <h3>BRANDS</h3>
           <select className="select-detail" onChange={(e) => {handleFilteredBrands(e)}}>
               <option value="All">All</option>
               <option value="Nike">Nike</option>
               <option value="Adidas">Adidas</option>
               <option value="Gilbert">Gilbert</option>
               <option value="Wilson">Wilson</option>
               <option value="Head">Head</option>
               <option value="Everlast">Everlast</option>
               <option value="Speedo">Speedo</option>
               <option value="Simbra">Simbra</option>
               <option value="Giro">Giro</option>
               <option value="Troy Lee Air">Troy Lee Air</option>

                 </select>
            </div>
            <div>
                <h3>SPORTS</h3>
                <select className="select-detail" onChange={(e) => handleFilteredSports(e)}>
                <option value="All">All</option>
                <option value="Futbol">Soccer</option>
                <option value="Rugby">Rugby</option>
                <option value="Basketball">Basketball</option>
                <option value="Tennis">Tenis</option>
                <option value="Boxeo">Boxeo</option>
                <option value="Paddle">Paddle</option>
                <option value="swimming">Natación</option>
                <option value="Hockey">Hockey </option>
                <option value="Ciclism">Ciclism</option>

            </select>
        </div>
        </section>
    )
}