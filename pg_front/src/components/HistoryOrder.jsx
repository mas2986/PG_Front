import React from 'react';
import {getOrderByUser} from "../redux/action"
import { useDispatch, useSelector } from 'react-redux';


export default function HistoryOrder (){

    const order = useSelector((state) => state.order)
    const user = useSelector((state) => state.user)
    const products = useSelector((state) => state.products)
    const id = user.id
   
    
    const userOrder = order.filter((item) => item.userId === id) && (order.filter(item => item.orderStatus === "completed")) 

    console.log(userOrder)


}