import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { detailProduct } from "../redux/action";
import Button from "@mui/material/Button";
import d from "./Detail.module.css";
import Nav2 from "./Nav2.jsx";

export default function Detail({ match }) {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(detailProduct(id));
  }, [dispatch, id]);

  const detail = useSelector((state) => state.detail);
  console.log(detail);

  return (
    <center>
      <Nav2 />
      <div>
        {console.log(detail)}
        {detail ? (
          <div>
            <h1 className={d.detailClass}>
              {detail.title && detail.title.toUpperCase()}
            </h1>
            <img
              src={detail.img ? detail.img : detail.image}
              alt="Image not found"
            />
            <p>Brand: {detail.brand && detail.brand}</p>
            <p>Price: ${detail.price && detail.price},00</p>
            <p>Sport: {detail.sport && detail.sport}</p>
            {/* <p>Gender: {detail.genre && detail.genre}</p> */}
            <p>{detail.description && detail.description}</p>
          </div>
        ) : (
          <>Loading...</>
        )}
        <Link to="/home">
          <Button
            //   href={`http://localhost:3000/home`} cambio a routing por link para que no se pierda el carrito
            variant="contained"
            color="primary"
            size="small"
          >
            BACK HOME
          </Button>
        </Link>
      </div>
    </center>
  );
}
