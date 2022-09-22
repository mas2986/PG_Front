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
  GET_ALL_USERS,
  CHANGE_ROLE_USER,
  DELETE_USER,
  CREATE_PRODUCT,
  EDIT_PRODUCT,
  DELETE_PRODUCT,
  FETCH_SAVED_ITEMS,
  ADD_TO_CART_DETAIL,
  FILTER_BRAND_CAROUSEL,
  REMEMBER_PASSWORD,
  RESET_PASSWORD,
  ORDER_MERCADOPAGO,
  GET_ALL_ORDERS,
  CHANGE_STATUS_ORDER,
  GET_ORDER_BY_ID,
  GET_REVIEWS,
  CREATE_ORDER,
  GET_ORDER_BY_USER,
  CREATE_REVIEW,
  DUPLICATE_REVIEW,
  CREATE_BILL,
  VIEW_ORDER,
  CLEAN_DETAIL,
} from "./const";
//const URL = "https://pg-athen.herokuapp.com"
//const URL = "https://localhost:3001"

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

export function mercadoPago(body) {
  return async function (dispatch) {
    try {
      console.log("En funcion MP")
      let order = await axios.post(`/api/crear-orden`,body);
      console.log(order.data);
      return dispatch({
        type: ORDER_MERCADOPAGO,
        payload: order.data.url,
      });
    } catch (e) {
      console.log(e);
    }
  };
}

export function createOrder(body, texto) {
  return async function (dispatch) {
    try {
      const bill = {};
      let order = await axios.post(`/api/order`, body);
      const { id } = order.data;
      bill.orderId = id;  
      bill.totalAmount = body.totalPrice;      
      bill.celNumber = texto.celNumber;
      bill.email = texto.email;
      localStorage.setItem(`billDetails`, JSON.stringify(bill));
      return dispatch({
        type: CREATE_ORDER,
        payload: order,
      });
    } catch (e) {
      console.log(e);
    }
  };
}

export function viewOrder(id) {
  return async function (dispatch) {
    try {
      let json = await axios(`/api/order/user/${id}`);
      console.log(json.data);
      return dispatch({
        type: VIEW_ORDER,
        payload: json.data,
      });
    } catch (e) {
      console.log(e);
    }
  };
}

export function createReview(id, body) {
  console.log(body);
  return async function (dispatch) {
    try {
      let { review } = await axios.post(`/api/product/review/${id}`, body);
      console.log(review.data);
      return dispatch({
        type: CREATE_REVIEW,
        payload: review.data,
      });
    } catch (e) {
      return dispatch({
        type: DUPLICATE_REVIEW,
        payload: "You have post in this product",
      });
    }
  };
}

export function getOrderById(id) {
  return async function (dispatch) {
    try {
      let orderId = await axios.get(`/api/order/${id}`);

      return dispatch({
        type: GET_ORDER_BY_ID,
        payload: orderId.data,
      });
    } catch (e) {
      console.log(e);
    }
  };
}

export function getOrderByUser(id) {
  return async function (dispatch) {
    try {
      let orderUser = await axios.get(`/api/order/user/${id}`);
      // console.log(orderUser)
      return dispatch({
        type: GET_ORDER_BY_USER,
        payload: orderUser.data,
      });
    } catch (e) {
      console.log(e);
    }
  };
}

export function changeOrderStatus(id, orderStatus, email) {
  let body = { orderStatus, email };
  console.log(body);
  return async function (dispatch) {
    try {
      let statusOrder = await axios.put(`/api/order/${id}`, body);
      Swal.fire({
        title: "Changed status!",
        text: `Order number ${id} is now ${orderStatus}`,
        icon: "success",
        confirmButtonText: "ACCEPT",
      });
      return dispatch({
        type: CHANGE_STATUS_ORDER,
      });
    } catch (e) {
      Swal.fire({
        title: "Error changing status!",
        text: `There was a trouble changing order status. Please try again`,
        icon: "error",
        confirmButtonText: "ACCEPT",
      });
    }
  };
}

export function passwordRemember(body) {
  return async function (dispatch) {
    try {
      console.log(body);
      let password = await axios.post(`/api/olvide-password`, body);
      //user.data.expire = new(new Date().getTime() + user.data.expire)
      // localStorage.setItem(`userDetails`, JSON.stringify(user.data));
      console.log(password);
      return dispatch({
        type: REMEMBER_PASSWORD,
        payload: password,
      });
    } catch (e) {
      console.log(e);
    }
  };
}

export function resetPassword(body) {
  return async function (dispatch) {
    try {
      let newPassword = await axios.post(`/api/olvide-passwords`, body);
      //user.data.expire = new(new Date().getTime() + user.data.expire)
      // localStorage.setItem(`userDetails`, JSON.stringify(user.data));
      console.log(newPassword);

      return (
        dispatch({
          type: RESET_PASSWORD,
          payload: newPassword,
        }),
        Swal.fire({
          title: "User password reset!",
          text: `The user was asked to change password`,
          icon: "success",
          confirmButtonText: "ACCEPT",
        })
      );
    } catch (e) {
      Swal.fire({
        title: "Error resetting user's password!",
        text: `There was a trouble resetting user's password Please try again`,
        icon: "error",
        confirmButtonText: "ACCEPT",
      });
    }
  };
}

export function createUser(body) {
  return async function (dispatch) {
    try {
      let user = await axios.post(`/api/user`, body);
      console.log(user.data.data.user);

      return (
        dispatch({
          type: CREATE_USER,
          payload: user.data.data.user,
        }),
        Swal.fire({
          title: "User created!",
          text: `Your user was created successfully`,
          icon: "success",
          confirmButtonText: "ACCEPT",
        })
      );
    } catch (e) {
      Swal.fire({
        title: "Error creating user!",
        text: `There was a trouble creating your user.Please try again`,
        icon: "error",
        confirmButtonText: "ACCEPT",
      });
    }
  };
}

export function getAllUsers(body) {
  return async function (dispatch) {
    try {
      // const tokenJSON = JSON.parse(localStorage.getItem("userDetails"));
      // const { token } = tokenJSON;
      let users = await axios.get(`/api/user`, {
        headers: {
          Authorization: `Bearer 23k4!jhisd&jhf8*asfdasdf$dsf45%&`,
        },
      });

      //user.data.expire = new(new Date().getTime() + user.data.expire)
      // localStorage.setItem(`userDetails`, JSON.stringify(user.data));
      //console.log(user.data.data.user);
      return dispatch({
        type: GET_ALL_USERS,
        payload: users.data,
      });
    } catch (e) {
      console.log(e);
    }
  };
}

export function changeRoleUser(id, body) {
  return async function (dispatch) {
    try {
      const tokenJSON = JSON.parse(localStorage.getItem("userDetails"));
      const { token } = tokenJSON;
      let userChange = await axios.put(`/api/user/${id}`, body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      //user.data.expire = new(new Date().getTime() + user.data.expire)
      // localStorage.setItem(`userDetails`, JSON.stringify(user.data));
      //console.log(user.data.data.user);
      Swal.fire({
        title: "Role changed!",
        text: `${body.name} now is ${body.rol}`,
        icon: "success",
        confirmButtonText: "ACCEPT",
      });
      return dispatch({
        type: CHANGE_ROLE_USER,
        payload: userChange.data,
      });
    } catch (e) {
      Swal.fire({
        title: "Error changing user's role!",
        text: `There was a trouble changing user's role. Please try again`,
        icon: "error",
        confirmButtonText: "ACCEPT",
      });
    }
  };
}

export function deleteUser(id, name) {
  return async function (dispatch) {
    try {
      const tokenJSON = JSON.parse(localStorage.getItem("userDetails"));
      const { token } = tokenJSON;
      let userDelete = await axios.delete(`/api/user/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      //user.data.expire = new(new Date().getTime() + user.data.expire)
      // localStorage.setItem(`userDetails`, JSON.stringify(user.data));
      //console.log(user.data.data.user);
      Swal.fire({
        title: "User deleted!",
        text: `${name} was deleted`,
        icon: "success",
        confirmButtonText: "ACCEPT",
      });
      return dispatch({
        type: DELETE_USER,
        payload: userDelete.data,
      });
    } catch (e) {
      Swal.fire({
        title: "Error deleting user!",
        text: `The user ${name} could not deleted. Please try again`,
        icon: "error",
        confirmButtonText: "ACCEPT",
      });
    }
  };
}

export function createProduct(body) {
  body.price = parseInt(body.price);
  body.discount = parseInt(body.discount);
  body.stock = parseInt(body.stock);
  body.sport = body.sport.join();
  console.log("body", body);
  return async function (dispatch) {
    try {
      const tokenJSON = JSON.parse(localStorage.getItem("userDetails"));
      const { token } = tokenJSON;
      let newProduct = await axios.post(`/api/product`, body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
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
        icon: "error",
        confirmButtonText: "Back",
      });
    }
  };
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
        icon: "error",
        confirmButtonText: "Back",
      });
    }
  };
}

export function deleteProduct(id, title) {
  return async function (dispatch) {
    try {
      const tokenJSON = JSON.parse(localStorage.getItem("userDetails"));
      const { token } = tokenJSON;
      let deleteProduct = await axios.delete(`/api/product/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      Swal.fire({
        title: "Deleted product!",
        text: `${title} was deleted`,
        icon: "success",
        confirmButtonText: "ACCEPT",
      });
      return dispatch({
        type: DELETE_PRODUCT,
        payload: id,
      });
    } catch (e) {
      Swal.fire({
        title: "Error deleting product!",
        text: e.msg,
        icon: "error",
        confirmButtonText: "Back",
      });
    }
  };
}

export function getProduct() {
  return async function (dispatch) {
    try {
      let res = await axios.get(`/api/products`);
      // console.log("Products", res.data);
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
      setTimeout(() => {
        return dispatch({
          type: SEARCH_PRODUCT,
          payload: product.data,
        });
      }, 290);
    } catch (error) {
      Swal.fire({
        title: "Product not found!",
        text: "Please try with another product",
        icon: "error",
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
  return async function (dispatch) {
    try {
      var product = await axios.get(`/api/product/${id}`);
      return dispatch({
        type: DETAIL_PRODUCT,
        payload: product.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function logout(history) {
  history.push("/");
  console.log("En action logout");
  return {
    type: LOGOUT,
  };
}

//CHECK LOGIN ACTION CREATOR
export function checkLogin(id, token) {
  // console.log(id);
  return async function (dispatch) {
    let user = await axios.get(`/api/user/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return dispatch({
      type: CHECK_LOGIN,
      payload: user.data,
    });
  };
}
export function addToCart(payload) {
  return {
    type: ADD_TO_CART,
    payload,
  };
}

export function addToCartDetail(payload) {
  return {
    type: ADD_TO_CART_DETAIL,
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
  return {
    type: FILTER_BRAND_CAROUSEL,
    payload, //Acá llegaría el tipo de genero
  };
}

export function getAllOrders() {
  return async function (dispatch) {
    try {
      let order = await axios.get(`/api/order`);
      return dispatch({
        type: GET_ALL_ORDERS,
        payload: order.data,
      });
    } catch (e) {
      console.log(e);
    }
  };
}

export function getReviews() {
  return async function (dispatch) {
    const resp = await axios.get(`/api/review`);
    const data = resp.data;
    console.log(resp);
    if (resp) {
      return dispatch({ type: GET_REVIEWS, payload: data });
    }
  };
}

export function createBill(body) {
  return async function (dispatch) {
    try {
      let bill = await axios.post(`/api/bill`, body);
      return dispatch({
        type: CREATE_BILL,
        payload: bill.data,
      });
    } catch (e) {
      console.log(e);
    }
  };
}

export function cleanDetail() {
  return async function (dispatch) {
    return dispatch({
      type: CLEAN_DETAIL,
    });
  };
}
