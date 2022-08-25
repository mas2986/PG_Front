import axios from 'axios';
import {SIGN_UP} from './const';
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