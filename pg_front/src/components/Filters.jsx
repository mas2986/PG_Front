import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { filterByGenre, filterBySport, filterByBrand } from "../redux/action";


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

    return (
        <section>
            <div >
                <h3>GENDERS</h3>
                <select className="select-detail" onChange={(e) => {handleFilteredGenres(e)}}>
                <option value="All">All genres</option>
                <option value="Male">Hen</option>
                <option value="Female">Woman</option>
                <option value="Kids">Kids</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="kids">Newly born</option>
                <option value="Adults">Adults</option>
                <option value="None">No gender</option>
                <option value="">No binario</option>
            SELECT</select>
        </div>
        <div >
           <h3>BRANDS</h3>
           <select className="select-detail" onChange={(e) => {handleFilteredBrands(e)}}>
               <option value="All">All brands</option>
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
                <option value="All">All Sports</option>
                <option value="Futbol">Football</option>
                <option value="Rugby">Rugby</option>
                <option value="Basketball">Basketball</option>
                <option value="Tennis">Tennis</option>
                <option value="Boxeo">Boxing</option>
                <option value="Paddle">Paddle</option>
                <option value="swimming">Swimming</option>
                <option value="Hockey">Hockey </option>
                <option value="Ciclism">Cycling</option>

            </select>
        </div>
        </section>
    )
}
