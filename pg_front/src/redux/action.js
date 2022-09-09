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
  LOGOUT,
  ORDER_BY,
  ORDER_BY_PRICE,
  DETAIL_PRODUCT,
  ADD_TO_CART,
  DELETE_FROM_CART,
  DELETE_ALL_FROM_CART,
  UPDATE_ITEM_NUM,
  REMOVE_DUPLICATES_CART,
  CREATE_USER,
  CREATE_PRODUCT,
  EDIT_PRODUCT,
  DELETE_PRODUCT,
  FETCH_SAVED_ITEMS,
  ADD_TO_CART_DETAIL,
  FILTER_BRAND_CAROUSEL
} from "./const";


export function signUp(body) {
  return async function (dispatch) {
    try {
      let user = await axios.post(`/api/login`, body);
      //user.data.expire = new(new Date().getTime() + user.data.expire)
      localStorage.setItem(`userDetails`, JSON.stringify(user.data));
      return dispatch({
        type: SIGN_UP,
        payload: user.data.data,
      });
    } catch (e) {
      Swal.fire({
        title: "Error!",
        text: "Email or password invalid",
        icon: "error",
        confirmButtonText: "GO HOME",
      });
      // Swal.fire(
      //   "¡User created successfully!",
      //   "¡Thank you for visiting our website!"
      // );
      // console.log(e)
    }
  };
} 

export function createUser(body) {
  return async function (dispatch) {
    try {
      let user = await axios.post(`/api/user`, body);
      //user.data.expire = new(new Date().getTime() + user.data.expire)
      // localStorage.setItem(`userDetails`, JSON.stringify(user.data));
      console.log(user.data.data.user);
      return dispatch({
        type: CREATE_USER,
        payload: user.data.data.user,
      });
    } catch (e) {
      console.log(e);
    }
  };
}

export function createProduct(body) {
  body.price = parseInt(body.price);
  body.discount = parseInt(body.discount);
  body.stock = parseInt(body.stock);
  return async function(dispatch){
    try{
      console.log(CREATE_PRODUCT)
      const tokenJSON = JSON.parse(localStorage.getItem("userDetails"));
      const { token } = tokenJSON; 
      let newProduct = await axios.post(`/api/product`,body,{
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })
      console.log(newProduct.data);
      return dispatch({
        type:CREATE_PRODUCT,
        payload:newProduct.data
      })
    }
    catch(e){ 
      console.log(e)
    Swal.fire({
      title: "Error creating product!",
      text: "Please try again",
      icon: "Error",
      confirmButtonText: "Back",
    });
  }
} 
}

export function editProduct(id, body) {
  return async function (dispatch) {
    try {
      const tokenJSON = JSON.parse(localStorage.getItem("userDetails"));
      const { token } = tokenJSON;
      console.log(body);
      let putProduct = await axios.put(`/api/product/${id}`, body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(putProduct.data);
      return dispatch({
        type: EDIT_PRODUCT,
        payload: putProduct.data,
      });
    } catch (e) {
      Swal.fire({
        title: "Error updating product!",
        text: e.msg,
        icon: "Error",
        confirmButtonText: "Back",
      });
    }
  };
}

export function deleteProduct(id) {
  return async function (dispatch) {
    try {
      const tokenJSON = JSON.parse(localStorage.getItem("userDetails"));
      const { token } = tokenJSON;
      let deleteProduct = await axios.delete(`/api/product/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(deleteProduct.data);
      return dispatch({
        type: DELETE_PRODUCT,
        payload: id,
      });
    } catch (e) {
      Swal.fire({
        title: "Error deleting product!",
        text: e.msg,
        icon: "Error",
        confirmButtonText: "Back",
      });
    }
  };
}

export function getProduct() {
  return async function (dispatch) {
    try {
      let res = await axios.get(`/api/products`);
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
      var product = await axios.get(`/api/products?title=${payload}`, {});
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
      var product = await axios.get(`/api/product/${id}`);
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

export function logout(history){
  history.push('/login')
  return{
    type:LOGOUT,
    
  }
}

//CHECK LOGIN ACTION CREATOR
export function checkLogin(id,token) {
  console.log(id);
  return async function(dispatch){
    let user = await axios.get(`/api/user/${id}`,{
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
    return dispatch({
      type:CHECK_LOGIN,
      payload: user.data,
    })
} 
}
export function addToCart(payload) {
  return {
    type: ADD_TO_CART,
    payload,
  };
}

export function addToCartDetail(payload){
  return {
    type: ADD_TO_CART_DETAIL,
    payload
  }
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

export function fetchCartItems(payload) {
  return {
    type: FETCH_SAVED_ITEMS,
    payload,
  };
}

export function filterByCarousel(payload) {
  console.log(payload);
  return {
    type: FILTER_BRAND_CAROUSEL,
    payload, //Acá llegaría el tipo de genero
  };
}