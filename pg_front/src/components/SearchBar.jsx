import React, { useState } from "react";
import { searchProduct } from "../redux/action";
import { useDispatch } from "react-redux";
import Button from "@mui/material/Button/Button";
import s from "./SearchBar.module.css";
import lupa from "../lupa.png";
import SearchIcon from "@mui/icons-material/Search";
import { Tooltip } from "@mui/material";
import { useHistory } from "react-router-dom";

export default function SearchBar() {
  const [input, setInput] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();

  function handleInput(e) {
    setInput(e.target.value);
    console.log(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(searchProduct(input));
    setInput("");
    history.push("/products");
  }

  return (
    <div>
      <section className={s["search-container"]}>
        <form onSubmit={(e) => handleSubmit(e)}>
          <input
            className={s["input-detail"]}
            type="text"
            placeholder="Search..."
            value={input}
            onChange={(e) => handleInput(e)}
          ></input>
          <Tooltip title={"Search item"}>
            <Button
              className={s["input-btn"]}
              size="small"
              onClick={(e) => {
                handleSubmit(e);
              }}
              style={{ background: "transparent" }}
            >
              <SearchIcon fontSize="large" className={s["search-icon"]} />
            </Button>
          </Tooltip>
        </form>
      </section>
    </div>
  );
}
