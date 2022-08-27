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
        <section style={{display: "flex",margin:"0 auto"}}>
            <div >
                <h3>GÉNEROS</h3>
                <select className="select-detail" onChange={(e) => {handleFilteredGenres(e)}}>
                <option value="All">Todos</option>
                <option value="Male">Hombre</option>
                <option value="Female">Mujer</option>
                <option value="Kids">Niños</option>
                <option value="male">Masculino</option>
                <option value="female">Femenino</option>
                <option value="kids">Bebés</option>
                <option value="Adults">Adultos</option>
                <option value="None">Sin género</option>
                <option value="">No binario</option>
            SELECT</select>
        </div>
        <div >
           <h3>MARCAS</h3>
           <select className="select-detail" onChange={(e) => {handleFilteredBrands(e)}}>
               <option value="All">Todas</option>
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
                <h3>DEPORTES</h3>
                <select className="select-detail" onChange={(e) => handleFilteredSports(e)}>
                <option value="All">Todos</option>
                <option value="Futbol">Fútbol</option>
                <option value="Rugby">Rugby</option>
                <option value="Basketball">Basquet</option>
                <option value="Tennis">Tenis</option>
                <option value="Boxeo">Boxeo</option>
                <option value="Paddle">Paddle</option>
                <option value="swimming">Natación</option>
                <option value="Hockey">Hockey </option>
                <option value="Ciclism">Ciclismo</option>

            </select>
        </div>
        </section>
    )
}