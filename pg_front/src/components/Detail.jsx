import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect, useParams } from "react-router-dom";
import { detailProduct, addToCart, removeDupsCart, addToCartDetail, mercadoPago, getReviews } from "../redux/action";
import d from "./Detail.module.css";
import Nav2 from "./Nav2.jsx";
import Button from "@mui/material/Button";
import { CircularProgress } from "@mui/material";
import plop from "../asset/plop.mp3";
import Section from "./Section";
import { useHistory } from "react-router-dom";
import RatingProm from "./RatingProm"


export default function Detail() {
  const items = useSelector((state) => state.cartItems);
  const { id } = useParams();
  const dispatch = useDispatch();
  const [qty, setQty] = useState(1);
  const history = useHistory();
  let official = 149;

  const review = useSelector((state) => state.reviews);

  useEffect(() => {
    dispatch(detailProduct(id));
    dispatch(getReviews())
  }, [dispatch, id]);

  const detail = useSelector((state) => state.detail);


  function addCart() {
    new Audio(plop).play();
    detail.qty = 1;
    dispatch(addToCartDetail(detail.id)); 
    dispatch(removeDupsCart(detail.id));
    detail.qty(qty)
  }
   
   async function handlePay(e) {
        e.preventDefault();
        dispatch(mercadoPago({price: detail.price * official}));
        history.push('/entrega')
    }

    

  

  return (
    <center>
      <Nav2 />
      <Section/>
      <div className={d.detailPage}>
        {/*console.log(detail)*/}
        {detail ? (
          <div className={d.detailCard}>
            <div className={d.bigImage}>
              <img
                src={detail.img ? detail.img : detail.image}
                alt="Image not found"
                className={d.bigImage}
              />
            </div>

            <div className={d.productDetail}>
                
              <h1 className={d.title}>
                {detail.title && detail.title.toUpperCase()}
              </h1>

              <p className={d.description}>
                {detail.description && detail.description}
              </p>
            
              <p className={d.brand}>
                Brand: {detail.brand && detail.brand}
              </p>
              
              <p className={d.sport}>
                Sport: {detail.sport && detail.sport}
              </p>
              
              {/* <p>Gender: {detail.genre && detail.genre}</p> */}

              <p className={d.price}>
                Price: ${detail.price && detail.price},00
              </p>

              <RatingProm id={id} reviews={review}/>

            <Button onClick={(e)=> handlePay(e)} variant="contained" size="small" sx={{
             padding:2
            }} className={d.buyButton}>
              BUY
            </Button>
            <Button variant="outlined" size="small" onClick={addCart} className={d.cartButton}>
              ADD TO CART
            </Button>

            <Link to="/products">
              <Button
                //   href={`http://localhost:3000/home`} cambio a routing por link para que no se pierda el carrito
                variant="contained"
                color="primary"
                size="small"
                className={d.homeButton}
              >
                GO BACK
              </Button>
            </Link>
            
            </div>

            

          </div>

        ) : (
          <CircularProgress color="success" sx={{
            marginTop:35
          }}/>
        )}
        
      </div>
    </center>
  );
}
