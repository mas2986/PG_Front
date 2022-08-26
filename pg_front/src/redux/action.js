import axios from 'axios';
import Swal from 'sweetalert2';
import {SIGN_UP, GET_PRODUCTS} from './const';
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
                let products = await axios.get(`${URL}/api/products`)
                return dispatch({
                    type: GET_PRODUCTS,
                    payload:products.data
                }) 
            }
            catch(e){console.log('Sin errores')}            
        }
}