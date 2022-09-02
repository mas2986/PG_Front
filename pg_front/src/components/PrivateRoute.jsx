import React from 'react';
import {Route, Redirect} from 'react-router-dom';



let auth
const tokenJSON = JSON.parse(localStorage.getItem("userDetails"));
let { token } = tokenJSON;
let { rol } = tokenJSON.data.user;

if(token&&rol==="admin") auth = true;
else auth = null; 
export default function PrivateRoute({component:Component,...rest}){
    return(
        <Route {...rest}>{auth?<Component/>:<Redirect to="/login"/>}</Route>
    )

}
