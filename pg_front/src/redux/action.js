
import axios from 'axios';
import Swal from 'sweetalert2';
import {
    GET_PRODUCTS,
    SIGN_UP,
    SEARCH_PRODUCT,
    FILTER_SPORT,
    FILTER_GENRE,
    FILTER_BRAND,
    FILTER_NAV_GENDER,
  } from "./const";

const URL = 'http://localhost:4000';


export function signUp(body){
    return async function(dispatch){ 
        try{
            let user = await axios.post(`${URL}/api/login`,body);
            localStorage.setItem('userDetails',JSON.stringify(user.data))
            return dispatch({
                type: SIGN_UP,
                payload: user.data
            })
        }  
        catch(e){
            Swal.fire({
                title: 'Error!',
                text: e.msg,
                icon: 'error',
                confirmButtonText: 'OK'
              })
        }     
    }
}

export function getProduct(){
        return async function(dispatch){
            try{
                let products = await axios.get(`${URL}/api/products`)
                return dispatch({
                    type: GET_PRODUCTS,
                    payload:products.data
                }) 
            }
            catch(e){console.log('Sin errores')}            
        }
}

export  function searchProduct(payload){
    return async function (dispatch) {
        try {
            var product = await axios.get(`${URL}/api/products?title=${payload}`, {})
            return dispatch({
                type: SEARCH_PRODUCT,
                payload: product.data
            });
        } catch (error) {
           Swal.fire({title: '¡No se encontró tu producto!', text: 'Revisá tu búsqueda', icon:'Error', confirmButtonText: 'Volver'})
        }
    }
}

export function filterBySport(payload) {
    console.log(payload)
    return {
        type: FILTER_SPORT,
        payload, //Acá llegaría el tipo de deporte
    }
}

export function filterByGenre(payload) {
    console.log(payload)
    return {
        type: FILTER_GENRE,
        payload, //Acá llegaría el tipo de genero
    }
}

export function filterByBrand(payload) {
    console.log(payload)
    return {
        type: FILTER_BRAND,
        payload, //Acá llegaría el tipo de genero
    }
}

export function filterByGenderInNav(payload) {
    return {
      type: FILTER_NAV_GENDER,
      payload,
    };
  }