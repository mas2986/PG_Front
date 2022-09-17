import React from "react";
import { useAuth0 } from "@auth0/auth0-react"
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";


export default function Profile() {

    const history = useHistory();
    const { user, isAuthenticated } = useAuth0();
    const dispatch = useDispatch();
    const userEmail = useSelector(state =>  state.user ) ;

    return (
        userEmail ? (
            <div>
                <img src={userEmail.image} name={userEmail.name}></img>
                <h1>{userEmail.name}</h1>
                <h2>{userEmail.email}</h2>
            </div> 
        ) 
        : 
        (
            <div>
                <img src={user.picture} name={user.name}></img>
                <h1>{user.name}</h1>
                <h2>{user.email}</h2>
            </div> 
        ) 
        

    )
}