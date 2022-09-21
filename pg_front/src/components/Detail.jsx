import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect, useParams } from "react-router-dom";
import { detailProduct, getAllOrders, createOrder, removeDupsCart, addToCartDetail, mercadoPago, getReviews, getAllUsers, getOrderByUser } from "../redux/action";
import d from "./Detail.module.css";
import Nav2 from "./Nav2.jsx";
import Button from "@mui/material/Button";
import { CircularProgress } from "@mui/material";
import plop from "../asset/plop.mp3";
import Section from "./Section";
import { useHistory } from "react-router-dom";
import RatingProm from "./RatingProm"
import Review from "./Review";

export default function Detail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [qty, setQty] = useState(1);
  const history = useHistory();
  const [render, setRender] = useState(false);
  const order = useSelector((state) => state.order)
  const user = useSelector((state) => state.user)
  const UserId = user.id
  const cartItem = useSelector(state=>state.cartItems)
  const userOrder = order.filter((item) => item.userId === UserId) && (order.filter(item => item.orderStatus === "completed")) 
 
  console.log(userOrder)

  
  const users =  useSelector((state) => state.users);
  
  

  let official = 149;
  
  const review = useSelector((state) => state.reviews);
 

 
  
  let quantity=0;
  let array = [];
  let comments = ""
  let uservacio = ""
  let rendercomment =[]
  let ramdom = []
  
  
  for (let i = 0; i < review.length; i++) {
      if(review[i].productId === Number(id)) {
          array.push(review[i])
          quantity += 1;
          comments = (review[i].comment + " ")
           users.forEach(element => { if(element.id === review[i].userId) uservacio = element.id       
          });
          rendercomment[i] = {uservacio: uservacio,
                      comments:comments } 
        
        
          
         
      } else{
          array
      }
      
  }

  const prueba = rendercomment.filter(el => el)

  useEffect(() => {
    dispatch(detailProduct(id));
    dispatch(getReviews())
    dispatch(getOrderByUser(UserId))
    dispatch(getAllUsers())
  }, [dispatch, id]);

  const detail = useSelector((state) => state.detail);



  function addCart() {
    new Audio(plop).play();
    detail.qty = 1;
    dispatch(addToCartDetail(detail.id));
    dispatch(removeDupsCart(detail.id));
    //detail.qty(qty)
  }

  async function handlePay(e) {
    e.preventDefault();
    if (cartItem.filter((c) => c.id !== detail.id)) {
      addCart()}
    dispatch(mercadoPago({ price: detail.price * official }));
    history.push('/entrega')
  }



  console.log(detail ?.stock)

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

              {/* <p>Gender: {detail.genre && detail.genre}</p> */}

              <p className={d.price}>
                Price: ${detail.price && detail.price},00
              </p>
              <RatingProm id={id} reviews={review} users={users}/>
            {
              detail ?.stock !== 0
              ?
              <>                
            <Button onClick={(e)=> handlePay(e)} variant="contained" size="small" sx={{
              padding:2
            }} className={d.buyButton}>
              BUY
            </Button>
            <Button variant="outlined" size="small" onClick={addCart} className={d.cartButton}>
              ADD TO CART
            </Button>
            :
             <h3
                style={{ color: "red", whiteSpace: "nowrap", marginLeft: "1rem" }}
             >
              OUT OF STOCK
             </h3>
            }
            <Link to="/products">
              <Button
                //   href={`http://localhost:3000/home`} cambio a routing por link para que no se pierda el carrito
                // variant="contained"
                // color="primary"
                size="large"
                className={d.homeButton}
                >
                GO BACK
              </Button>
            </Link>
            <div className = {d.detailSection}>
              <p className={d.description}>
                {detail.description && detail.description}
              </p>
            
              <p className={d.brand}>
                Brand: {detail.brand && detail.brand}
              </p>
              
              <p className={d.sport}>
                Sport: {detail.sport && detail.sport}
              </p>
            </div>
            <div>
                  { <Review id={id}/> }
             </div>     

            </div>



          </div>

        ) : (
            <CircularProgress color="success" sx={{
              marginTop: 35
            }} />
          )}

      </div>
    </center>
  );
}
