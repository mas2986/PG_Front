import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { detailProduct } from "../redux/action";
import Button from "@mui/material/Button";

export default function Detail({ match }) {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(detailProduct(id));
  }, [dispatch, id]);

  const detail = useSelector((state) => state.detail);
  console.log(detail);

  return (
    <div>
      {console.log(detail)}
      {detail ? (
        <div>
          <h1>{detail.title && detail.title}</h1>
          <img
            src={detail.img ? detail.img : detail.image}
            alt="Image not found"
          />
          <p>Brand: {detail.brand && detail.brand}</p>
          <p>Price: {detail.price && detail.price}</p>
          <p>Sport: {detail.sport && detail.sport}</p>
          <p>Gender: {detail.genre && detail.genre}</p>
          <p>{detail.description && detail.description}</p>
        </div>
      ) : (
        <>Loading...</>
      )}

      <Button
        href={`http://localhost:3000/home`}
        variant="contained"
        size="small"
      >
        VOLVER
      </Button>
    </div>
  );
}
