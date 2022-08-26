import products from '../asset/JSON'
import axios from 'axios';
import Swal from 'sweetalert2';
import {SIGN_UP, GET_PRODUCTS} from './const';
const URL_LOGIN = 'http://localhost:4000';
//const URL_DATA = 'https://apimocha.com/gimasioapi/post'

export function signUp(body){
    return async function(dispatch){ 
        try{
            let res = await axios.post(`${URL_LOGIN}/api/login`,body);
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
        console.log('action',products)
        return{
            type:GET_PRODUCTS,
            payload: products
        }
/*      return async function(dispatch){
         try{
              let products = await axios.get(`${URL_DATA}`)
             return dispatch({
                 type: GET_PRODUCTS,
                 payload:products.data
             }) 
         }
         catch(e){console.log('Sin errores')}            
     } */
}