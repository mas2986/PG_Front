import axios from 'axios';
import Swal from 'sweetalert2'
import {DETAIL_PRODUCT,GET_PAGINATED_PRODUCTS, GET_PRODUCTS, SIGN_UP, SEARCH_PRODUCT, FILTER_SPORT, FILTER_GENRE, FILTER_BRAND} from './const';
const URL = 'http://localhost:4000';


export function signUp(body){
    return async function(dispatch){ 
        try{
            let res = await axios.post(`${URL}/api/login`,body);
            return dispatch({
                type: SIGN_UP,
                payload: res.data
            })
        }  
        catch(e){
            Swal.fire({
                title: 'Error!',
                text: 'Error'/*e.msg*/,
                icon: 'error',
                confirmButtonText: 'OK'
              })
        }     
    }
}

export function getProduct(){
    return async function(dispatch){
        try{
            let products = await axios.get(`${URL}/api/product`)
            return dispatch({
                type: GET_PRODUCTS,
                payload:products.data
            }) 
        }
        catch(e){console.log('Sin errores')}            
    }

    // return async function (dispatch) {
    //     try {
    //         return dispatch({
    //             type: GET_PRODUCTS,
    //             payload: products
    //         })
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }
}


export  function searchProduct(payload){
    return async function (dispatch) {
        try {
            var product = await axios.get(`${URL}/api/products?title=${payload}`, {})
            console.log(product)
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

export function detailProduct(id){
    console.log(id)
    return async function (dispatch) {
        try {
            var product = await axios.get(`${URL}/api/product/${id}`);
            console.log(product)
            return dispatch({
                type: DETAIL_PRODUCT,
                payload: product.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export function getPaginatedProduct({from,to}) {

  const data = products.slice(from,to)

  return async function (dispatch) {
    try {
      return dispatch({
        type: GET_PAGINATED_PRODUCTS,
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}
