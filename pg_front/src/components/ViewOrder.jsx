import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { viewOrder } from "../redux/action";



export default function ViewOrder() {
    
 const dispatch = useDispatch();   
 const order = useSelector(state => state.order);
 const user = useSelector(state => state.user)
 const product = useSelector(state => state.products)
 console.log(order)
 console.log(user)

 useEffect(() => {
    dispatch(viewOrder(user.id))
  }, [dispatch]);

    return (
        <>
          {
            order?.length ? (
                order.map((e) => (
                <div>
                     <p>Su importe: ${e.totalPrice}</p>
                     <h4>{e.titleProduct}</h4>
                     <p>{e.idProduct}</p>
                     <p>{e.orderStatus.toUpperCase([0])}</p>
                     { product && product.map( p => p.id === Number(user.id))}
                     {/* <img src={} alt="" /> */}
                </div>
                  
                ))
              ) : "No tiene compras realizadas"
          }
        </>
    )
}