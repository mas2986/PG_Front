// import { products } from "../asset/products";
import axios from "axios";
import Swal from "sweetalert2";
import {
  GET_PRODUCTS,
  GET_PAGINATED_PRODUCTS,
  SIGN_UP,
  SEARCH_PRODUCT,
  FILTER_SPORT,
  FILTER_GENRE,
  FILTER_BRAND,
  FILTER_NAV_GENDER,
  CHECK_LOGIN,
  ORDER_BY,
  ORDER_BY_PRICE,
} from "./const";

const URL = "http://localhost:4000";

export function signUp(body) {
  return async function (dispatch) {
    try {
      let user = await axios.post(`${URL}/api/login,body`);
      //user.data.expire = new(new Date().getTime() + user.data.expire)
      localStorage.setItem("userDetails", JSON.stringify(user.data));
      return dispatch({
        type: SIGN_UP,
        payload: user.data,
      });
    } catch (e) {
      Swal.fire({
        title: "Error!",
        text: "Error /e.msg/",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };
}

export function getProduct() {
  return async function (dispatch) {
    try {
      let res = await axios.get(`${URL}/api/products`);
      console.log('Products',res.data)
      return dispatch({
        type: GET_PRODUCTS,
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getPaginatedProduct({ from, to }) {  
  return{
    type: GET_PAGINATED_PRODUCTS,
    payload: {from, to}
  }
} 

export function searchProduct(payload) {
  return async function (dispatch) {
    try {
      var product = await axios.get(`${URL}/api/products?title=${payload}`, {});
      return dispatch({
        type: SEARCH_PRODUCT,
        payload: product.data,
      });
    } catch (error) {
      Swal.fire({
        title: "Product not found!",
        text: "Please try with another product",
        icon: "Error",
        confirmButtonText: "Back",
      });
    }
  };
}

export function filterBySport(payload) {
  console.log(payload);
  return {
    type: FILTER_SPORT,
    payload, //Acá llegaría el tipo de deporte
  };
}

export function filterByGenre(payload) {
  console.log(payload);
  return {
    type: FILTER_GENRE,
    payload, //Acá llegaría el tipo de genero
  };
}

export function filterByBrand(payload) {
  console.log(payload);
  return {
    type: FILTER_BRAND,
    payload, //Acá llegaría el tipo de genero
  };
}

export function filterByGenderInNav(payload) {
  return {
    type: FILTER_NAV_GENDER,
    payload,
  };
}

export function orderBy(payload) {
  return {
    type: ORDER_BY,
    payload: payload, // Deberia llegar el array con los obj para ordenar.
  };
}

export function orderByPrice(payload) {
  return {
    type: ORDER_BY_PRICE,
    payload: payload, // Deberia llegar el array con los obj para ordenar.
  };
}

//CHECK LOGIN ACTION CREATOR
export function checkLogin(payload) {
  return {
    type: CHECK_LOGIN,
    payload,
  };
}
