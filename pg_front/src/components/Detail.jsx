import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { detailProduct } from "../redux/action";
import Button from "@mui/material/Button";
import d from "./Detail.module.css";

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

        <Button
          href={`http://localhost:3000/home`}
          variant="contained"
          color="primary"
          size="small"
        >
          BACK HOME
        </Button>
      </div>
    </center>
  );
}
