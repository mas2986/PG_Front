import { products } from '../asset/products'
import axios from 'axios';
import Swal from 'sweetalert2'
import {SIGN_UP, SEARCH_PRODUCT} from './const';


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
        catch(e){console.log(e)}     
    }
}


export  function searchProduct(payload){
    return async function (dispatch) {
        try {
            var product = await axios.get(`${URL}/products?name=${payload}`, {})
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