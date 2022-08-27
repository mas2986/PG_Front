import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Button from "@mui/material/Button/Button"
import "../Style/SearchBar.css"
import { searchProduct } from "../redux/action";



export default function SearchBar() {
  const [input, setInput] = useState("");
  const dispatch = useDispatch()




  function handleInput(e) {

    setInput(e.target.value);
    console.log(e.target.value);
  }


    function handleSubmit(e) {
    e.preventDefault()
    dispatch(searchProduct(input));
    setInput('')
}
 
  return (
    <div>
      <section>
        {/* <a onClick={(e) => {
            handleSubmit(e);}}>
          <img src={lupa} className="mag-glass" />
        </a> */}
        <input
          className="input-detail"
          type="text"
          placeholder="¿Buscás un producto?"
          onChange={(e) => handleInput(e)}
        ></input>

        <Button
          className="input-button"
          variant="contained"
          size="small"
          onClick={(e) => {
            handleSubmit(e);
          }}
        >
          Click
        </Button>
      </section>
    </div>
  );

}
