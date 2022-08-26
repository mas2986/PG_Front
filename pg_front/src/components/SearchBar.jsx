import React, { useState } from "react";
// import { useDispatch } from "react-redux";
import Button from "@mui/material/Button/Button";
import "../Style/SearchBar.css";
import lupa from "../asset/lupa.png";

export default function SearchBar() {
  const [input, setInput] = useState("");
  // const dispatch = useDispatch()

  function handleInput(e) {
    setInput(e.target.value);
    console.log(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    // dispatch(searchRecipes(recipe));
    setInput("");
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
          placeholder="Search"
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
