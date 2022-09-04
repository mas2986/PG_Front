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
  DETAIL_PRODUCT,
  ADD_TO_CART,
  DELETE_FROM_CART,
  DELETE_ALL_FROM_CART,
  UPDATE_ITEM_NUM,
  REMOVE_DUPLICATES_CART,
} from "./const";

const URL = "http://localhost:4000";

export function signUp(body) {
  return async function (dispatch) {
    try {
      let user = await axios.post(`${URL}/api/login`, body);
      //user.data.expire = new(new Date().getTime() + user.data.expire)
      localStorage.setItem(`userDetails`, JSON.stringify(user.data));
      return dispatch({
        type: SIGN_UP,
        payload: user.data.data,
      });
    } catch (e) {
      // Swal.fire({
      //   title: "Error!",
      //   text: "Email or password invalid",
      //   icon: "error",
      //   confirmButtonText: "GO HOME",
      // });
      Swal.fire(
        "¡User created successfully!",
        "¡Thank you for visiting our website!"
      );
    }
  };
}

export function getProduct() {
  return async function (dispatch) {
    try {
      let res = await axios.get(`${URL}/api/products`);
      console.log("Products", res.data);
      return dispatch({
        type: GET_PRODUCTS,
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
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

export function createProduct(body) {
  body.price = parseInt(body.price);
  body.discount = parseInt(body.discount);
  body.stock = parseInt(body.stock);
  return async function (dispatch) {
    try {
      let newProduct = await axios.post(`${URL}/api/product`, body);
      console.log(newProduct.data);
      return dispatch({
        type: CREATE_PRODUCT,
        payload: newProduct.data,
      });
    } catch (e) {
      console.log(e);
      Swal.fire({
        title: "Error creating product!",
        text: "Please try again",
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

export function detailProduct(id) {
  console.log(id);
  return async function (dispatch) {
    try {
      var product = await axios.get(`${URL}/api/product/${id}`);
      console.log(product);
      return dispatch({
        type: DETAIL_PRODUCT,
        payload: product.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

//CHECK LOGIN ACTION CREATOR
export function checkLogin(token, id) {
  return async function (dispatch) {
    try {
      let user = await axios.get(`${URL}/api/user/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return dispatch({
        type: CHECK_LOGIN,
        payload: user.data,
      });
    } catch (e) {
      console.log(e);
    }
  };
}

export function addToCart(payload) {
  return {
    type: ADD_TO_CART,
    payload,
  };
}

export function deleteFromCart(payload) {
  return {
    type: DELETE_FROM_CART,
    payload,
  };
}

export function deleteAllFromCart() {
  return {
    type: DELETE_ALL_FROM_CART,
  };
}

export function updateItemNum(payload) {
  return {
    type: UPDATE_ITEM_NUM,
    payload,
  };
}

export function removeDupsCart(payload) {
  return {
    type: REMOVE_DUPLICATES_CART,
    payload,
  };
}

export function sendItemNum(payload) {
  return {
    type: UPDATE_ITEM_NUM,
    payload,
  };
}
