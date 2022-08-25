import React, { useState } from "react";
// import { useDispatch } from "react-redux";
import Button from "@mui/material/Button/Button"
import "../components/SearchBar.css"


export default function SearchBar() {

const [input, setInput] = useState('')
const dispatch = useDispatch()

function handleInput (e){
    setInput(e.target.value);
    console.log(e.target.value)
        
}

function handleSubmit(e) {
    e.preventDefault()
    // dispatch(searchRecipes(recipe));
    setInput('')
}
    return (
        <div>
            <section>
                <input className="input-detail"
                       type="text" 
                       placeholder="¿Buscás un producto?"
                       onChange={(e) => handleInput(e)}>
                </input>
                <Button variant="contained"
                        size="small" 
                        onClick={(e) => {handleSubmit(e)}}>Click</Button>
            </section>
        </div>
    )
}